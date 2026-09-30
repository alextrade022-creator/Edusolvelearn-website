'use client';

import { m, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef, type ReactNode } from 'react';

// Moves its content slightly slower than the page while it passes through the
// viewport (gentle parallax). `distance` is the total travel in px.
export function ParallaxY({ children, className, distance = 60 }: { children: ReactNode; className?: string; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-distance / 2, distance / 2]);

  return (
    <div ref={ref} className={className}>
      <m.div style={reduceMotion ? undefined : { y }} className="h-full w-full">
        {children}
      </m.div>
    </div>
  );
}
