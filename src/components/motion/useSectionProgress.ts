'use client';

import { useScroll } from 'motion/react';
import type { RefObject } from 'react';

type Edge = 'start' | 'center' | 'end';
type Offset = `${Edge} ${Edge}`;

// Scroll progress (0 → 1) of an element moving through the viewport. By default
// it starts when the element's top reaches the bottom of the screen and ends
// when its centre reaches the centre. Used by the scroll-linked effects.
export function useSectionProgress(
  target: RefObject<HTMLElement | null>,
  offset: readonly [Offset, Offset] = ['start end', 'center center'],
) {
  const { scrollYProgress } = useScroll({ target, offset: [...offset] });
  return scrollYProgress;
}
