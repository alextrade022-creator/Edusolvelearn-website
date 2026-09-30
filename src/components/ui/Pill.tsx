import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Tone = 'soft' | 'outline' | 'dark';

const TONES: Record<Tone, string> = {
  soft: 'bg-panel text-body',
  outline: 'border border-line bg-white text-body',
  dark: 'bg-ink text-white',
};

export function Pill({ children, tone = 'soft', className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span className={cn('inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold', TONES[tone], className)}>
      {children}
    </span>
  );
}

// Small lime dot used before short labels.
export function Dot({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn('block size-2 shrink-0 rounded-full bg-lime', className)} />;
}
