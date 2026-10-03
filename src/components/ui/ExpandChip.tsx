import type { MouseEventHandler } from 'react';
import { cn } from '@/lib/cn';

interface ExpandChipProps {
  className?: string;
  /** Only when the mark sits outside its card's button (it then opens the view itself). */
  onClick?: MouseEventHandler<HTMLSpanElement>;
}

// The round "opens larger" mark on clickable cards (Life at EduSolve, About
// founders, quote cards). Always visible and always the same size: it never
// moves or grows under a passing pointer. Decorative — the card's own button
// carries the accessible name.
export function ExpandChip({ className, onClick }: ExpandChipProps) {
  return (
    <span
      aria-hidden="true"
      onClick={onClick}
      className={cn('grid size-8 place-items-center rounded-full border border-line bg-white/95 text-ink shadow-float sm:size-9', onClick && 'cursor-pointer', className)}
    >
      <svg viewBox="0 0 24 24" className="size-3.5 sm:size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7" />
      </svg>
    </span>
  );
}
