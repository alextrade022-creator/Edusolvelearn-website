'use client';

import Image from 'next-image-export-optimizer';
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import type { Benefit } from '@/content/home';
import { cn } from '@/lib/cn';
import { useMediaQuery } from '@/lib/useMediaQuery';

/** How long each reason shows before moving on. */
const STEP_MS = 5000;
/** A pause resumes by itself after this long (restarted by choosing another label). */
const PAUSE_MS = 15000;

// The six reasons as auto-playing tabs: short labels (a 3 + 3 grid of pills on
// phones) above one large card. It moves to the next reason every 5 seconds,
// with a thin progress line under the active label; tap, click or arrow-key to
// any label to jump (its 5 seconds start again from zero).
// A pause/play button in the card's top-right corner stops and resumes it; a
// pause lifts by itself after 15 seconds (counted again from any label chosen). Autoplay runs
// only while the section is on screen and the browser tab is visible; with
// "reduce motion" there's no autoplay at all.
// All panels share one grid cell, so the card is as tall as the tallest reason
// and the page never jumps when it changes.
export function WhyTabs({ benefits }: { benefits: readonly Benefit[] }) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const resumeTimer = useRef<number | undefined>(undefined);

  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0); // restarts the progress line
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false); // the pause button
  const [pageHidden, setPageHidden] = useState(false);
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const autoplay = !reduceMotion;
  const running = autoplay && inView && !paused && !pageHidden;
  // Progress line under the active label.
  const progressStyle = {
    animation: `why-tab-progress ${STEP_MS}ms linear forwards`,
    animationPlayState: running ? 'running' : 'paused',
  } as const;
  const progressKey = `${active}-${cycle}`;

  // Only play while the section is on screen.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), { threshold: 0.35 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setPageHidden(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => () => window.clearTimeout(resumeTimer.current), []);

  /** (Re)start the 15-second countdown after which a pause lifts by itself. */
  const startResumeCountdown = () => {
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), PAUSE_MS);
  };

  const togglePause = () => {
    if (paused) {
      window.clearTimeout(resumeTimer.current);
      setPaused(false);
    } else {
      setPaused(true);
      startResumeCountdown();
    }
  };

  const select = (index: number) => {
    setActive(index);
    setCycle((value) => value + 1);
  };

  const next = () => select((active + 1) % benefits.length);

  // Choosing a label shows it with a fresh 5 seconds; while paused, it restarts
  // the 15-second countdown instead (they're still browsing).
  const choose = (index: number) => {
    select(index);
    if (paused) startResumeCountdown();
  };

  // Arrow keys move between tabs (standard tab behaviour).
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = benefits.length - 1;
    const keys: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    const target = keys[event.key];
    if (target === undefined) return;
    event.preventDefault();
    choose(target);
    tabRefs.current[target]?.focus();
  };

  return (
    <div ref={rootRef} className="flex flex-col gap-6 md:gap-8">
      <div
        role="tablist"
        aria-label="Why families choose EduSolve"
        onKeyDown={onKeyDown}
        // Phones: an even 3 + 3 grid, all six visible; tablets and up: one row of six.
        className="grid grid-cols-3 gap-x-2 gap-y-5 pb-2 md:grid-cols-6 md:gap-4 md:pb-0 lg:gap-6"
      >
        {benefits.map((benefit, index) => {
          const on = index === active;
          return (
            <button
              key={benefit.title}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${index}`}
              aria-selected={on}
              aria-controls={`${id}-panel-${index}`}
              tabIndex={on ? 0 : -1}
              onClick={() => choose(index)}
              className={cn(
                'group relative min-h-10 rounded-full border px-2 text-[0.8125rem] leading-tight font-semibold transition-colors duration-300',
                'md:flex md:min-h-0 md:items-baseline md:gap-2.5 md:rounded-none md:border-0 md:bg-transparent md:px-0 md:pt-1 md:pb-4 md:text-left md:text-[0.9375rem] lg:text-base lg:whitespace-nowrap',
                on ? 'border-ink bg-ink text-white md:text-ink' : 'border-line bg-white text-body hover:border-ink md:text-muted md:hover:text-ink',
              )}
            >
              {/* Index number (laptops), matching the red numbers on the card. */}
              <span
                aria-hidden="true"
                className={cn(
                  'hidden text-xs font-bold tabular-nums transition-colors duration-300 lg:inline',
                  on ? 'text-red' : 'text-muted group-hover:text-body',
                )}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              {benefit.short}
              {/* Progress track: under the active pill on phones, under every label from tablets up. */}
              <span
                aria-hidden="true"
                className={cn(
                  'absolute inset-x-4 -bottom-2.5 h-0.5 overflow-hidden rounded-full transition-colors duration-300 md:inset-x-0 md:bottom-0 md:block',
                  // The active track is darker, so the selected tab shows even while paused.
                  on ? 'block bg-ink/20' : 'hidden bg-line md:group-hover:bg-line-strong',
                )}
              >
                {on ? (
                  autoplay ? (
                    <span key={progressKey} onAnimationEnd={next} style={progressStyle} className="block h-full origin-left bg-ink" />
                  ) : (
                    <span className="block h-full bg-ink" />
                  )
                ) : null}
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative grid rounded-panel border border-line bg-white p-3.5 md:p-4 lg:p-5">
        {/* Pause/play, in the card's top-right corner: on the white text side on
            laptops (outlined), over the illustration on smaller screens (translucent). */}
        {autoplay ? (
          <button
            type="button"
            onClick={togglePause}
            aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
            className="absolute top-6 right-6 z-10 inline-flex size-9 items-center justify-center rounded-full border border-line/70 bg-white/85 text-ink backdrop-blur-sm transition-[background-color,border-color,color,scale] duration-300 ease-[var(--ease-out-soft)] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink active:scale-95 md:top-7 md:right-7 lg:top-5 lg:right-5 lg:border-line-strong lg:bg-white lg:backdrop-blur-none lg:hover:border-ink lg:hover:bg-ink lg:hover:text-white"
          >
            {paused ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="6" y="4" width="4" height="16" rx="1.2" />
                <rect x="14" y="4" width="4" height="16" rx="1.2" />
              </svg>
            )}
          </button>
        ) : null}
        {benefits.map((benefit, index) => {
          const on = index === active;
          const number = String(index + 1).padStart(2, '0');
          return (
            <div
              key={benefit.title}
              role="tabpanel"
              id={`${id}-panel-${index}`}
              aria-labelledby={`${id}-tab-${index}`}
              aria-hidden={!on}
              inert={!on}
              className={cn(
                'grid content-start items-center gap-6 transition-[opacity,visibility] duration-500 ease-[var(--ease-out-soft)] [grid-area:1/1] motion-reduce:transition-none lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:content-center lg:gap-12',
                on ? 'visible opacity-100' : 'invisible opacity-0',
              )}
            >
              <div className="relative aspect-[1100/820] overflow-hidden rounded-2xl bg-panel">
                <Image src={benefit.image} alt={benefit.imageAlt} fill sizes="(min-width: 1280px) 600px, (min-width: 1024px) 52vw, 92vw" className="object-cover" />
              </div>
              <div className="flex flex-col gap-3 px-1.5 pb-2 lg:gap-4 lg:px-0 lg:pr-8 lg:pb-0">
                <p className="text-[0.8125rem] font-bold text-red">{number}</p>
                <h3 className="font-serif text-[1.625rem] leading-tight font-medium tracking-[-0.015em] md:text-[2rem] lg:text-[2.5rem]">{benefit.title}</h3>
                <p className="text-base leading-relaxed text-body lg:text-lg">{benefit.text}</p>
                {index === benefits.length - 1 ? (
                  <ButtonLink href="/contact/" className="mt-2 self-start">
                    Book a free demo
                  </ButtonLink>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
