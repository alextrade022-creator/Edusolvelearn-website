'use client';

import { m, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { CheckIcon } from '@/components/icons';
import type { SelectionCheck } from '@/content/home';
import { cn } from '@/lib/cn';
import { ApprovalSeal } from './ApprovalSeal';

const STEP_MS = 420;

// "Tutor application" card: when it scrolls into view, the green line grows down
// and each check fills in turn (grey → green outline → solid green). After the
// last one, the Approved-to-teach seal stamps on. Plays once.
export function TutorApprovalCard({ checks, subject }: { checks: readonly SelectionCheck[]; subject: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0); // number of completed checks

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const timers = checks.map((_, index) => window.setTimeout(() => setProgress(index + 1), 350 + index * STEP_MS));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [inView, reduceMotion, checks]);

  const done = reduceMotion ? checks.length : progress;
  const complete = done === checks.length;
  const lineFill = checks.length > 1 ? Math.max(0, done - 1) / (checks.length - 1) : 1;

  return (
    <div
      ref={ref}
      className="relative w-full max-w-[26.25rem] rounded-[1.125rem] border border-line bg-white px-5 py-6 shadow-[var(--shadow-card)] md:px-7.5 md:py-7"
    >
      <div className="flex flex-col gap-1">
        <p className="text-xs font-bold tracking-[0.08em] text-muted uppercase">Tutor application</p>
        <p className="text-lg font-bold">{subject}</p>
      </div>
      <div className="my-5 h-px bg-line-soft" />

      <ol className="relative flex flex-col gap-4.5" aria-label="Selection checks">
        <span aria-hidden="true" className="absolute top-3 bottom-3 left-3 w-0.5 bg-[#e4e1da]" />
        <span
          aria-hidden="true"
          className="absolute top-3 bottom-3 left-3 w-0.5 origin-top bg-green transition-transform duration-500 ease-[var(--ease-out-soft)]"
          style={{ transform: `scaleY(${lineFill})` }}
        />
        {checks.map((check, index) => {
          const state = index < done ? 'done' : index === done ? 'active' : 'pending';
          return (
            <li key={check.label} className="relative flex items-center gap-4">
              <span
                className={cn(
                  'inline-flex size-6.5 shrink-0 items-center justify-center rounded-full border-[1.5px] text-white transition-colors duration-300',
                  state === 'done' && 'border-green bg-green',
                  state === 'active' && 'border-green bg-white',
                  state === 'pending' && 'border-[#d6d3cc] bg-white',
                )}
              >
                {state === 'done' ? <CheckIcon size={14} strokeWidth={2.8} /> : null}
              </span>
              <span className="flex flex-col">
                <span className={cn('text-[0.9375rem] font-bold transition-colors', state === 'pending' ? 'text-muted' : 'text-ink')}>
                  {check.label}
                  <span className="sr-only">{state === 'done' ? ' — passed' : ' — pending'}</span>
                </span>
                <span className="text-[0.8125rem] text-muted">{check.meta}</span>
              </span>
            </li>
          );
        })}
      </ol>

      <div className="my-5 h-px bg-line-soft" />
      <p className={cn('text-[0.8125rem] font-semibold', complete ? 'text-green' : 'text-muted')} aria-live="polite">
        {complete
          ? `All ${checks.length} checks complete · ready to be matched with your child`
          : `${done} of ${checks.length} checks complete`}
      </p>

      {complete ? (
        <m.div
          className="pointer-events-none absolute right-2 top-[11.5rem] w-[4.9rem] md:top-[11.7rem] md:w-[8.1rem]"
          initial={reduceMotion ? false : { scale: 1.3, opacity: 0, rotate: -4 }}
          animate={{ scale: 1, opacity: 1, rotate: -12 }}
          transition={{ type: 'spring', stiffness: 380, damping: 18 }}
        >
          <ApprovalSeal className="h-auto w-full drop-shadow-[0_8px_16px_rgba(22,24,26,0.14)]" />
        </m.div>
      ) : null}
    </div>
  );
}
