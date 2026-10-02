'use client';

import {
  animate,
  LazyMotion,
  m,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
} from 'motion/react';
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { ArrowRightIcon } from '@/components/icons';
import { YouTubeFacade } from '@/components/ui/YouTubeFacade';
import { cn } from '@/lib/cn';

// Drag gestures need Motion's larger feature set; load it only here.
const loadDragFeatures = () => import('@/components/motion/features-drag').then((mod) => mod.default);

interface VideoCarouselProps {
  ids: readonly string[];
  /** Section heading, shown with the arrow buttons beside it. */
  heading?: ReactNode;
  /** Shown below the row with the arrow buttons beside it (used when there's no heading). */
  footer?: ReactNode;
  /** A final card after the videos (e.g. a link to more stories), sized like a video card. */
  endCard?: ReactNode;
  /** Show the ← → buttons (tablet and up). Default true. */
  showArrows?: boolean;
}

/** Overscroll (px) at which the edge glow is fully lit. */
const GLOW_AT = 45;
/** Distance (px) from an end that still counts as being at it, for the arrows. */
const EDGE_SLACK = 24;
/** The most the row can ever be stretched past either end (px), however hard it's pulled or flung. */
const MAX_STRETCH = 56;
/** Rubber band: follows small pulls closely, then flattens out at MAX_STRETCH. */
const rubber = (overshoot: number) => MAX_STRETCH * (1 - Math.exp(-overshoot / (MAX_STRETCH * 1.6)));
const SPRING = { type: 'spring', stiffness: 210, damping: 30, mass: 0.9 } as const;

// A single row of video cards you can grab and fling, like spinning a wheel.
// Motion's drag handles mouse and touch: it follows the pointer, measures the
// release speed and coasts on with friction — a slow drag moves a little, a
// hard fling spins through several cards — then lands on the nearest card.
// Past either end it stretches elastically (with a soft edge glow) and springs
// back. The ← → buttons glide one card and bump at the ends. Trackpad sideways
// scrolling works too. A drag never starts a video; a plain click does.
export function VideoCarousel(props: VideoCarouselProps) {
  return (
    <LazyMotion features={loadDragFeatures}>
      <Carousel {...props} />
    </LazyMotion>
  );
}

function Carousel({ ids, heading, footer, endCard, showArrows = true }: VideoCarouselProps) {
  const listId = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const reduceMotion = useReducedMotion();
  const bounds = useRef({ min: 0 }); // x runs from min (end) to 0 (start)

  // `x` is the row's physical position (drag, fling, arrows). What's drawn is
  // `shownX`: the same, but with any stretch past an end squeezed by the rubber band.
  const x = useMotionValue(0);
  const shownX = useTransform(x, (value) => {
    const { min } = bounds.current;
    return value > 0 ? rubber(value) : value < min ? min - rubber(min - value) : value;
  });
  const overscroll = useMotionValue(0); // < 0 past the start, > 0 past the end
  const startGlow = useTransform(overscroll, [-GLOW_AT, 0], [1, 0]);
  const endGlow = useTransform(overscroll, [0, GLOW_AT], [0, 1]);

  const snaps = useRef<number[]>([0]);
  const controls = useRef<AnimationPlaybackControls | null>(null);
  const arrowTarget = useRef<number | null>(null); // where an arrow glide is heading
  const holdEdges = useRef(false); // keep the arrows' dimmed state steady during an edge bump
  const dragged = useRef(false); // a drag happened: swallow the click that ends it
  const wheelTimer = useRef<number | undefined>(undefined);
  const frame = useRef<number | null>(null);
  // Arrows show from the first paint (no pop-in) and hide only if nothing overflows.
  const [edges, setEdges] = useState({ start: true, end: false, scrollable: true });
  const [minX, setMinX] = useState(0);

  const clamp = useCallback((value: number) => Math.min(0, Math.max(bounds.current.min, value)), []);
  const nearest = useCallback(
    (value: number) => snaps.current.reduce((best, snap) => (Math.abs(snap - value) < Math.abs(best - value) ? snap : best), 0),
    [],
  );

  // Measure the row: how far it can move, and where each card lines up.
  useEffect(() => {
    const viewport = viewportRef.current;
    const list = listRef.current;
    if (!viewport || !list) return;
    const measure = () => {
      const padStart = parseFloat(getComputedStyle(list).paddingLeft) || 0;
      const min = Math.min(0, viewport.clientWidth - list.scrollWidth);
      bounds.current = { min };
      const points = Array.from(list.children, (child) => Math.max(min, -((child as HTMLElement).offsetLeft - padStart)));
      snaps.current = [...new Set([...points, min])];
      x.set(clamp(x.get()));
      setMinX(min);
      setEdges((prev) => (prev.scrollable === min < 0 ? prev : { ...prev, scrollable: min < 0 }));
    };
    const observer = new ResizeObserver(measure); // runs once on observe, then on resize
    observer.observe(viewport);
    observer.observe(list);
    return () => observer.disconnect();
  }, [x, clamp]);

  // Overscroll amount (for the glow) and which ends we're at (for the arrows).
  // React state is updated on the next frame, never during a motion update.
  useMotionValueEvent(x, 'change', (value) => {
    const { min } = bounds.current;
    overscroll.set(value > 0 ? -value : value < min ? min - value : 0);
    if (holdEdges.current) return;
    // Within EDGE_SLACK of an end still counts as at it: springing back from a
    // stretch overshoots slightly into the row, which would flash the dimmed arrow.
    const start = value >= -EDGE_SLACK;
    const end = value <= min + EDGE_SLACK;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      setEdges((prev) => (prev.start === start && prev.end === end ? prev : { ...prev, start, end }));
    });
  });

  useEffect(
    () => () => {
      controls.current?.stop();
      window.clearTimeout(wheelTimer.current);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  /** Start an animation, stopping whatever was running. */
  const run = useCallback((next: AnimationPlaybackControls) => {
    controls.current?.stop();
    holdEdges.current = false;
    controls.current = next;
  }, []);

  /** Take over from any running animation (the visitor is moving it now). */
  const interrupt = useCallback(() => {
    controls.current?.stop();
    holdEdges.current = false;
    arrowTarget.current = null;
  }, []);

  const go = (direction: 1 | -1) => {
    const { min } = bounds.current;
    // Step from where a previous click is heading, so quick clicks add up.
    const from = arrowTarget.current ?? nearest(clamp(x.get()));
    const atEdge = direction === 1 ? from <= min + 2 : from >= -2;
    if (atEdge) {
      // Nothing further: a small elastic bump against the edge.
      arrowTarget.current = null;
      if (reduceMotion) return;
      const bump = animate(x, from, { ...SPRING, stiffness: 420, damping: 18, velocity: -direction * 900 });
      run(bump);
      holdEdges.current = true; // its overshoot briefly re-enters the row; don't relight the arrow
      void bump.then(() => {
        if (controls.current === bump) holdEdges.current = false;
      });
      return;
    }
    const index = snaps.current.indexOf(from);
    const target = snaps.current[Math.min(snaps.current.length - 1, Math.max(0, index + direction))] ?? from;
    arrowTarget.current = target;
    if (reduceMotion) {
      x.set(target);
      arrowTarget.current = null;
      return;
    }
    const glide = animate(x, target, SPRING);
    run(glide);
    void glide.then(() => {
      if (arrowTarget.current === target) arrowTarget.current = null;
    });
  };

  // Trackpad / horizontal wheel: move directly, settle on a card when it stops.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return; // vertical: page scroll
      event.preventDefault();
      interrupt();
      x.set(clamp(x.get() - event.deltaX));
      window.clearTimeout(wheelTimer.current);
      wheelTimer.current = window.setTimeout(() => {
        const target = nearest(x.get());
        if (reduceMotion) x.set(target);
        else run(animate(x, target, SPRING));
      }, 140);
    };
    viewport.addEventListener('wheel', onWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', onWheel);
  }, [x, clamp, nearest, interrupt, run, reduceMotion]);

  // Swallow the click that ends a drag, so it doesn't start a video.
  const onClickCapture = (event: React.MouseEvent) => {
    if (!dragged.current) return;
    event.preventDefault();
    event.stopPropagation();
    dragged.current = false;
  };

  // Keyboard only: slide a card into view when its play button gets focus.
  // (A mouse press also focuses it; sliding then would fight the drag.)
  const onFocusCapture = (event: React.FocusEvent<HTMLDivElement>) => {
    const viewport = event.currentTarget;
    viewport.scrollLeft = 0; // focus can nudge an overflow:hidden box; keep it still
    const focused = event.target as HTMLElement;
    if (!focused.matches(':focus-visible')) return;
    const card = focused.closest('li');
    if (!card) return;
    const left = card.offsetLeft + x.get();
    if (left >= 0 && left + card.offsetWidth <= viewport.clientWidth) return;
    interrupt();
    const target = nearest(clamp(left < 0 ? -card.offsetLeft : viewport.clientWidth - card.offsetLeft - card.offsetWidth));
    if (reduceMotion) x.set(target);
    else run(animate(x, target, SPRING));
  };

  const arrowClass =
    'inline-flex size-12 items-center justify-center rounded-full border border-line-strong bg-page text-ink transition-[opacity,background-color,border-color] duration-200 hover:border-ink hover:bg-white aria-disabled:opacity-35 aria-disabled:hover:border-line-strong aria-disabled:hover:bg-page';
  const glowClass = 'pointer-events-none absolute inset-y-[4%] z-10 w-16';

  const arrows = showArrows && (
    <div className={cn('hidden shrink-0 gap-3', edges.scrollable && 'md:flex')}>
      <button type="button" aria-label="Previous videos" aria-controls={listId} aria-disabled={edges.start} onClick={() => go(-1)} className={arrowClass}>
        <ArrowRightIcon size={20} className="rotate-180" />
      </button>
      <button type="button" aria-label="Next videos" aria-controls={listId} aria-disabled={edges.end} onClick={() => go(1)} className={arrowClass}>
        <ArrowRightIcon size={20} />
      </button>
    </div>
  );

  return (
    <div className={cn('flex flex-col', heading ? 'gap-10 lg:gap-12' : 'gap-6 md:gap-8')}>
      {heading ? (
        <div className="flex items-end justify-between gap-6">
          {heading}
          {arrows}
        </div>
      ) : null}

      <div
        ref={viewportRef}
        onClickCapture={onClickCapture}
        onFocusCapture={onFocusCapture}
        onDragStartCapture={(event) => event.preventDefault()} // no native image/link dragging
        className="relative -mx-5 overflow-hidden select-none md:-mx-10 lg:mx-0"
      >
        <m.span
          aria-hidden="true"
          style={{ opacity: startGlow }}
          className={cn(glowClass, 'left-0 bg-[radial-gradient(ellipse_at_left,rgb(22_24_26/0.18),transparent_70%)]')}
        />
        <m.span
          aria-hidden="true"
          style={{ opacity: endGlow }}
          className={cn(glowClass, 'right-0 bg-[radial-gradient(ellipse_at_right,rgb(22_24_26/0.18),transparent_70%)]')}
        />
        <m.ul
          id={listId}
          ref={listRef}
          aria-label="Video stories"
          style={{ x: shownX }}
          _dragX={x}
          drag="x"
          dragConstraints={{ left: minX, right: 0 }}
          dragElastic={0.5}
          dragMomentum={!reduceMotion}
          dragTransition={{
            // Friction: higher power = further coast; timeConstant = how long it glides.
            power: 0.5,
            timeConstant: 450,
            bounceStiffness: 300,
            bounceDamping: 26,
            // Land exactly on a card; past the ends keep the target so it overshoots and bounces.
            modifyTarget: (target) => (target > 0 || target < minX ? target : nearest(target)),
          }}
          onPointerDown={() => {
            interrupt();
            dragged.current = false;
          }}
          onDragStart={() => {
            dragged.current = true;
          }}
          onDragEnd={() => {
            if (reduceMotion) x.set(nearest(clamp(x.get())));
          }}
          whileDrag={{ cursor: 'grabbing' }}
          className="flex w-max gap-3.5 px-5 md:px-10 lg:gap-6 lg:px-0"
        >
          {ids.map((id, index) => (
            <li key={`${id}-${index}`} className="w-[12.5rem] shrink-0 md:w-[15rem] lg:w-[17.5rem]">
              <YouTubeFacade id={id} title={`EduSolve student story ${index + 1}`} className="aspect-[9/14] rounded-2xl" />
            </li>
          ))}
          {endCard ? <li className="w-[12.5rem] shrink-0 md:w-[15rem] lg:w-[17.5rem]">{endCard}</li> : null}
        </m.ul>
      </div>

      {heading ? null : (
        <div className="flex items-center justify-between gap-6">
          {footer}
          {arrows}
        </div>
      )}
    </div>
  );
}
