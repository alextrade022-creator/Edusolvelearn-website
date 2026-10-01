'use client';

import { AnimatePresence, m, useInView, useMotionValueEvent, useMotionValue, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { CheckIcon } from '@/components/icons';
import { usePinProgress } from '@/components/motion/PinnedScroll';
import type { SelectionCheck } from '@/content/home';
import { cn } from '@/lib/cn';
import { ApprovalSeal } from './ApprovalSeal';

const STEP_MS = 420;
/** Pin progress at which every check is done (the rest is time to see the seal). */
const PIN_COMPLETE_AT = 0.8;

// "Tutor application" card: the green line grows down and each check fills in
// turn (grey → green outline → solid green); after the last one, the
// Approved-to-teach seal stamps on.
// - Inside a PinnedScroll (home page): driven by scroll while pinned, and fully
//   reversible — scrolling back un-ticks the checks and lifts the seal.
// - Elsewhere: plays once, on a timer, when the card scrolls into view.
export function TutorApprovalCard({ checks, subject }: { checks: readonly SelectionCheck[]; subject: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const reduceMotion = useReducedMotion();
  const pin = usePinProgress();
  const idle = useMotionValue(0);
  const [progress, setProgress] = useState(0); // number of completed checks
  const frame = useRef<number | null>(null);
  const lastDone = useRef(0);

  // Timed mode (not pinned).
  useEffect(() => {
    if (pin || !inView || reduceMotion) return;
    const timers = checks.map((_, index) => window.setTimeout(() => setProgress(index + 1), 350 + index * STEP_MS));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [pin, inView, reduceMotion, checks]);

  // Scroll-driven mode (pinned). State updates are deferred to the next frame:
  // motion values can change while React is rendering.
  useMotionValueEvent(pin ?? idle, 'change', (value) => {
    if (!pin) return;
    const doneNow = Math.min(checks.length, Math.floor((value / PIN_COMPLETE_AT) * checks.length + 0.001));
    if (doneNow === lastDone.current) return;
    lastDone.current = doneNow;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      setProgress(lastDone.current);
    });
  });

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

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
      <p className={cn('flex items-center gap-1.5 text-[0.8125rem] font-semibold', complete ? 'text-green' : 'text-muted')} aria-live="polite">
        {complete ? (
          <>
            <CheckIcon size={16} strokeWidth={2.6} className="shrink-0" />
            All {checks.length} checks complete
          </>
        ) : (
          `${done} of ${checks.length} checks complete`
        )}
      </p>

      <AnimatePresence>
        {complete ? (
          <m.div
            key="seal"
            className="pointer-events-none absolute top-1/2 right-2 w-[4.9rem] -translate-y-1/2 md:w-[8.1rem]"
            initial={reduceMotion ? false : { scale: 1.3, opacity: 0, rotate: -4 }}
            animate={{ scale: 1, opacity: 1, rotate: -12 }}
            exit={{ scale: 1.15, opacity: 0, rotate: -6, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 380, damping: 18 }}
          >
            <ApprovalSeal className="h-auto w-full drop-shadow-[0_8px_16px_rgba(22,24,26,0.14)]" />
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
