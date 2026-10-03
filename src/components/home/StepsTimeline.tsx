'use client';

import { useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { usePinProgress } from '@/components/motion/PinnedScroll';
import type { Step } from '@/content/home';
import { cn } from '@/lib/cn';

type TimelineStep = Step & { time?: string };

interface StepsTimelineProps {
  steps: readonly TimelineStep[];
  /** Always vertical (detailed steps on inner pages). Default: across on laptop. */
  vertical?: boolean;
}

// Steps joined by a line that draws as you scroll: across on laptop, down on
// phones/tablets (or always down when `vertical`). Each number fills in as the
// line reaches it. Inside a PinnedScroll (home page) it follows the pin's
// progress instead, so the drawing only starts once the section is pinned.
export function StepsTimeline({ steps, vertical = false }: StepsTimelineProps) {
  const ref = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: vertical ? ['start 0.75', 'end 0.6'] : ['start 0.85', 'end 0.55'] });
  // When pinned, follow the pin's progress, finishing a little before the pin
  // ends so the result can be seen.
  const pin = usePinProgress();
  const source = pin ?? scrollYProgress;
  const toLine = (value: number) => (pin ? Math.min(1, Math.max(0, value / 0.85)) : value);
  const [reached, setReached] = useState(1);
  const lastCount = useRef(1);
  const frame = useRef<number | null>(null);

  // The line's length (--p) is written straight onto the list, and the lit
  // step count is React state. Both are applied on every change and once on
  // mount — so after a refresh further down the page the timeline shows its
  // finished state at once instead of waiting for the next scroll. The state
  // update is deferred to the next frame (and made only when the count
  // changes): updating it synchronously here can clash with a render.
  const apply = (raw: number) => {
    const value = toLine(raw);
    ref.current?.style.setProperty('--p', String(value));
    const count = Math.max(1, Math.min(steps.length, Math.floor(value * (steps.length - 1) + 1.02)));
    if (count === lastCount.current) return;
    lastCount.current = count;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      setReached(lastCount.current);
    });
  };
  useMotionValueEvent(source, 'change', apply);

  useEffect(() => {
    if (!reduceMotion) apply(source.get());
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
    // Once on mount (and if the source changes); `apply` only reads refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source, reduceMotion]);

  const activeCount = reduceMotion ? steps.length : reached;
  const lineStyle = { '--p': reduceMotion ? 1 : 0 } as CSSProperties;
  const across = !vertical;

  const trackBase = 'absolute top-5 bottom-14 left-5 w-px';
  const trackAcross = 'lg:top-[1.375rem] lg:right-[1.375rem] lg:bottom-auto lg:left-[1.375rem] lg:h-px lg:w-auto';

  return (
    <ol ref={ref} style={lineStyle} className={cn('relative grid', vertical ? 'gap-10 md:gap-12' : 'gap-7 lg:grid-cols-4 lg:gap-10')}>
      <span aria-hidden="true" className={cn(trackBase, 'bg-line-strong', across && trackAcross)} />
      <span
        aria-hidden="true"
        className={cn(
          trackBase,
          'origin-top bg-ink [scale:1_var(--p)]',
          across && trackAcross,
          across && 'lg:origin-left lg:[scale:var(--p)_1]',
        )}
      />
      {steps.map((step, index) => {
        const active = index < activeCount;
        return (
          <li key={step.title} className={cn('relative flex gap-4.5', across && 'lg:flex-col lg:gap-3.5', vertical && 'md:gap-8')}>
            <span
              className={cn(
                'relative inline-flex size-10 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-colors duration-500',
                across && 'lg:size-11 lg:text-[0.9375rem]',
                active ? 'border-ink bg-ink text-white' : 'border-line-strong bg-page text-ink',
              )}
            >
              {index + 1}
            </span>
            <div className={cn('flex flex-col gap-1 pt-2', across && 'lg:gap-3.5 lg:pt-3', vertical && 'max-w-[40rem] gap-2 md:pt-1.5')}>
              {step.time ? <p className="text-xs font-bold tracking-[0.06em] text-muted uppercase">{step.time}</p> : null}
              <h3 className={cn('font-bold', vertical ? 'font-serif text-h3 font-medium' : 'text-[1.0625rem] lg:text-[1.1875rem]')}>
                {step.title}
              </h3>
              <p className={cn('leading-relaxed text-body', vertical && 'text-[1.0625rem]')}>{step.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
