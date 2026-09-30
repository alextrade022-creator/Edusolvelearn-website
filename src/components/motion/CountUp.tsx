'use client';

import { animate, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';

const format = new Intl.NumberFormat('en-US');

interface CountUpProps {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

// Counts from 0 to `value` once when visible. The server HTML shows the final
// number, so search engines and no-JS visitors see the real figure.
export function CountUp({ value, suffix = '', className, duration = 1.6 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = `${format.format(Math.round(latest))}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {format.format(value)}
      {suffix}
    </span>
  );
}
