'use client';

import { m } from 'motion/react';
import type { ReactNode } from 'react';

// Content eases from slightly zoomed-in to normal inside its (clipping) frame
// when it scrolls into view. Used for the founder photo.
export function ZoomIn({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div
      className={className}
      initial={{ scale: 1.08 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
