'use client';

import { useLenis } from 'lenis/react';
import { useReducedMotion } from 'motion/react';

// Footer "Back to top ↑": glides to the top of the page with the site's smooth
// scrolling (an instant jump for visitors who ask for reduced motion).
export function BackToTop({ className }: { className?: string }) {
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();

  const toTop = () => {
    if (reduceMotion || !lenis) window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' });
    else lenis.scrollTo(0, { duration: 1.2 });
  };

  return (
    <button type="button" onClick={toTop} className={className}>
      Back to top <span aria-hidden="true">↑</span>
    </button>
  );
}
