'use client';

import Link from 'next/link';
import Image from 'next-image-export-optimizer';
import { m, useMotionValue, useTransform, type MotionStyle, type MotionValue } from 'motion/react';
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { usePinProgress } from '@/components/motion/PinnedScroll';
import type { LifeChapter, LifeItem } from '@/content/life';

interface LifeChaptersProps {
  /** The section heading (hidden while the chapters play on laptops, then faded in). */
  heading: ReactNode;
  items: readonly LifeItem[];
  /** In playing order: each pairs one of `items` with a phrase of the heading. */
  chapters: readonly LifeChapter[];
}

const FOCUS_Y = { top: 0, center: 50, bottom: 100 } as const;

// Timings, as fractions of the pinned scroll.
const WIPE_AT = [0, 0.19, 0.4] as const; // each chapter's photo wipes in from here…
const WIPE_LENGTH = 0.14; // …over this long
const SETTLE_AT = 0.61; // photos start shrinking into the grid…
const SETTLE_LENGTH = 0.24; // …each taking this long…
const SETTLE_STAGGER = 0.04; // …and starting this much after the one to its left
const LATE_AT = 0.84; // heading, labels and the remaining tile fade in
const LATE_LENGTH = 0.12;
// The large photo is never taller than this shape (width ÷ height), so the wide
// photos aren't cut down to a narrow slice on phones and tablets.
const MIN_BIG_RATIO = 1.25;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const smooth = (value: number) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};
// Slow start, slow landing: used for the shrink so the photos ease into place.
const easeInOut = (value: number) => {
  const t = clamp01(value);
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
};
const settleAt = (progress: number, rank: number) => easeInOut((progress - SETTLE_AT - rank * SETTLE_STAGGER) / SETTLE_LENGTH);
const wipe = (progress: number, index: number) => (index === 0 ? 1 : smooth((progress - (WIPE_AT[index] ?? 0)) / WIPE_LENGTH));

// Home "Life at EduSolve": three chapters, then the usual grid.
// While the section is pinned (PinnedScroll), one large photo fills the stage
// with a phrase of the heading under it — "Real classrooms.", "Real people.",
// "Real milestones." — each new photo wiping up over the last. Then the three
// photos shrink into their tiles, and the heading, labels and the remaining
// tile fade in. Scrolling back plays it in reverse.
//
// The HTML is always the finished grid. Each chapter's tile is stretched out
// of its square with CSS (see `.life-chapters` in globals.css) and shows the
// chapter's wide photo on top, which fades into the tile's own photo as it
// shrinks. This component measures where the tiles sit and feeds the
// scroll progress in as CSS variables, so nothing re-renders while scrolling.
// Without a pin (reduced motion) it is simply the grid.
export function LifeChapters({ heading, items, chapters }: LifeChaptersProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pin = usePinProgress();
  const idle = useMotionValue(1);
  const progress = pin ?? idle;

  const wipe1 = useTransform(progress, (value) => wipe(value, 1));
  const wipe2 = useTransform(progress, (value) => wipe(value, 2));
  // One per chapter tile, left to right, so they land one after another.
  const settle0 = useTransform(progress, (value) => settleAt(value, 0));
  const settle1 = useTransform(progress, (value) => settleAt(value, 1));
  const settle2 = useTransform(progress, (value) => settleAt(value, 2));
  const late = useTransform(progress, (value) => clamp01((value - LATE_AT) / LATE_LENGTH));

  // Measure the stage and where each chapter's tile sits in it.
  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!pin || !root || !stage) return;
    const block = root.parentElement; // PinnedScroll marks how it pins here

    const measure = () => {
      // 'block': the whole section is pinned, so the stage runs from the top of
      // the heading to the bottom of the grid. 'focus' (phones, tablets, short
      // laptop screens): only the grid is pinned, so the stage is the grid.
      const mode = block?.dataset.pinMode === 'focus' ? 'focus' : 'block';
      root.dataset.chapters = mode;
      const box = stage.getBoundingClientRect();
      const above = mode === 'block' ? box.top - root.getBoundingClientRect().top : 0;
      const stageHeight = above + box.height;
      const phraseHeight = stage.querySelector<HTMLElement>('.life-phrase')?.offsetHeight ?? 0;
      const gap = box.width >= 900 ? 28 : 18;
      // A very wide, short stage would crop the photos to a thin band: there,
      // the photo keeps a sensible shape and the phrase sits beside it instead.
      const beside = box.width / (stageHeight - phraseHeight - gap) > 2.7;
      const bigWidth = beside ? Math.min(box.width * 0.6, stageHeight * 1.9) : box.width;
      const room = beside ? stageHeight : stageHeight - phraseHeight - gap;
      const bigHeight = beside ? room : Math.min(room, bigWidth / MIN_BIG_RATIO);
      const inset = (room - bigHeight) / 2; // photo and phrase centred in the stage

      stage.style.setProperty('--big-w', `${bigWidth}px`);
      stage.style.setProperty('--big-h', `${bigHeight}px`);
      stage.style.setProperty('--phrase-x', `${beside ? bigWidth + 48 : 0}px`);
      stage.style.setProperty('--phrase-y', `${beside ? (stageHeight - phraseHeight) / 2 - above : inset + bigHeight + gap - above}px`);
      for (const frame of stage.querySelectorAll<HTMLElement>('[data-chapter-frame]')) {
        const rect = frame.getBoundingClientRect();
        frame.style.setProperty('--dx', `${box.left - rect.left}px`);
        frame.style.setProperty('--dy', `${box.top - above + inset - rect.top}px`);
      }
    };

    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    const resize = new ResizeObserver(schedule);
    resize.observe(root);
    resize.observe(stage);
    const pinMode = new MutationObserver(schedule);
    if (block) pinMode.observe(block, { attributes: true, attributeFilter: ['data-pin-mode'] });
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      pinMode.disconnect();
      delete root.dataset.chapters;
    };
  }, [pin]);

  const style = { '--settle-0': settle0, '--settle-1': settle1, '--settle-2': settle2, '--wipe-1': wipe1, '--wipe-2': wipe2, '--late': late } as MotionStyle;
  const chapterItems = items.filter((item) => chapters.some((chapter) => chapter.id === item.id));

  return (
    <m.div ref={rootRef} style={style} className="life-chapters flex flex-col gap-10 lg:gap-12">
      <div className="life-heading">{heading}</div>
      <div ref={stageRef} data-pin-focus className="relative">
        <ul className="grid grid-cols-2 gap-x-3.5 gap-y-6 lg:grid-cols-4 lg:gap-6">
          {items.map((item) => {
            const order = chapters.findIndex((chapter) => chapter.id === item.id);
            const chapter = chapters[order];
            const photoStyle = {
              '--focus-y': FOCUS_Y[item.focus ?? 'center'],
              '--wide-y': chapter?.focus ?? 50,
              ...(chapter ? { '--settle': `var(--settle-${chapterItems.indexOf(item)})` } : null),
              ...(order > 0 ? { '--wipe': `var(--wipe-${order})` } : null),
              ...(chapter ? { zIndex: order + 1 } : null),
            } as CSSProperties;
            return (
              <li key={item.id} className={chapter ? undefined : 'life-late'}>
                <Link href="/life-at-edusolve/" className="group flex flex-col gap-3 lg:gap-4">
                  <span data-chapter-frame={chapter ? '' : undefined} className="life-frame relative block aspect-square rounded-[0.875rem] bg-panel lg:rounded-2xl">
                    <span className="life-photo rounded-[0.875rem] lg:rounded-2xl" style={photoStyle}>
                      <Image
                        src={item.photo}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1024px) 285px, 46vw"
                        className="object-cover transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.04] motion-reduce:transition-none"
                      />
                      {chapter ? (
                        <span className="life-wide">
                          <Image src={chapter.photo} alt="" fill sizes="(min-width: 1024px) 1200px, 100vw" className="object-cover" />
                        </span>
                      ) : null}
                    </span>
                  </span>
                  <span className="life-late flex flex-col gap-1.5">
                    <span className="text-[0.6875rem] font-bold tracking-[0.06em] text-muted uppercase lg:text-xs">{item.category}</span>
                    <span className="text-[0.9375rem] leading-snug font-bold lg:text-[1.0625rem]">{item.title}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        {pin ? chapters.map((chapter, index) => <Phrase key={chapter.id} progress={pin} index={index} last={index === chapters.length - 1} text={chapter.phrase} />) : null}
      </div>
    </m.div>
  );
}

// One phrase of the heading, shown under (or beside) its chapter's photo: it
// rises in with the photo's wipe and leaves as the next chapter arrives.
function Phrase({ progress, index, last, text }: { progress: MotionValue<number>; index: number; last: boolean; text: string }) {
  const enter = (value: number) => wipe(value, index);
  const leave = (value: number) => (last ? clamp01((value - SETTLE_AT) / 0.08) : clamp01((value - (WIPE_AT[index + 1] ?? 1)) / 0.1));
  const opacity = useTransform(progress, (value) => enter(value) * (1 - leave(value)));
  const y = useTransform(progress, (value) => (1 - enter(value)) * 18 - leave(value) * 14);
  return (
    <m.p aria-hidden="true" style={{ opacity, y }} className="life-phrase font-serif text-h2 font-medium whitespace-nowrap text-ink">
      {text}
    </m.p>
  );
}
