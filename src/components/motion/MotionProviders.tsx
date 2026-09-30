'use client';

import { ReactLenis } from 'lenis/react';
import { LazyMotion, MotionConfig, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

const loadFeatures = () => import('./features').then((mod) => mod.default);

// Site-wide motion setup:
// - Lenis smooth scrolling (~1s), skipped entirely for "reduce motion" users.
// - Motion loads its animation features lazily; `strict` forces the small `m`
//   components everywhere; reducedMotion="user" turns animations off when the
//   visitor asks for less motion.
export function MotionProviders({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  const content = (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );

  if (reduceMotion) return content;

  return (
    <ReactLenis root options={{ duration: 1, anchors: true, allowNestedScroll: true, autoRaf: true }}>
      {content}
    </ReactLenis>
  );
}
