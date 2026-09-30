import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Small stagger, in seconds (shifts when the fade starts while scrolling). */
  delay?: number;
  /** Distance to rise from, in px. */
  y?: number;
  as?: 'div' | 'li' | 'section';
}

// Fades and lifts its content as it scrolls into view — in pure CSS, using a
// scroll-driven animation (see `.reveal` in globals.css). Content is always
// visible in the HTML: no JavaScript, no waiting for hydration, no LCP delay.
// Browsers without scroll-driven animations simply show it without the fade.
export function Reveal({ children, className, delay = 0, y = 16, as: Component = 'div' }: RevealProps) {
  const style = { '--reveal-y': `${y}px`, '--reveal-shift': `${Math.round(delay * 40)}%` } as CSSProperties;
  return (
    <Component className={cn('reveal', className)} style={style}>
      {children}
    </Component>
  );
}
