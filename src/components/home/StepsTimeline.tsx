'use client';

import { m, useMotionValueEvent, useReducedMotion, useScroll, type MotionStyle } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
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
// line reaches it.
export function StepsTimeline({ steps, vertical = false }: StepsTimelineProps) {
  const ref = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: vertical ? ['start 0.75', 'end 0.6'] : ['start 0.85', 'end 0.55'] });
  const [reached, setReached] = useState(1);
  const lastCount = useRef(1);
  const frame = useRef<number | null>(null);

  // Motion can emit progress changes while it is rendering <m.ol>, so the React
  // state update is deferred to the next animation frame (and only made when the
  // number of lit steps actually changes). Updating state synchronously here
  // triggers React's "cannot update a component while rendering" error.
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const count = Math.max(1, Math.min(steps.length, Math.floor(value * (steps.length - 1) + 1.02)));
    if (count === lastCount.current) return;
    lastCount.current = count;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      setReached(lastCount.current);
    });
  });

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const activeCount = reduceMotion ? steps.length : reached;
  const lineStyle: MotionStyle = { ['--p' as string]: reduceMotion ? 1 : scrollYProgress };
  const across = !vertical;

  const trackBase = 'absolute top-5 bottom-14 left-5 w-px';
  const trackAcross = 'lg:top-[1.375rem] lg:right-[1.375rem] lg:bottom-auto lg:left-[1.375rem] lg:h-px lg:w-auto';

  return (
    <m.ol ref={ref} style={lineStyle} className={cn('relative grid', vertical ? 'gap-10 md:gap-12' : 'gap-7 lg:grid-cols-4 lg:gap-10')}>
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
    </m.ol>
  );
}
