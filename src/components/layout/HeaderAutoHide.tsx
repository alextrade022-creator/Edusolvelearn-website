'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/** How far from the top the visitor must scroll before the header may hide. */
const HIDE_AFTER = 96;
/** Ignore sub-pixel jitter (trackpads, smooth scrolling). */
const JITTER = 2;

const getHeader = () => document.querySelector<HTMLElement>('[data-site-header]');

const setHidden = (header: HTMLElement, hidden: boolean) => {
  if (hidden) header.setAttribute('data-hidden', '');
  else header.removeAttribute('data-hidden');
};

// Slides the header away while scrolling down and back while scrolling up, on
// every page. Near the top it always stays; past HIDE_AFTER it follows the
// scroll direction immediately. Toggles a data attribute only — no React
// re-renders; the slide itself is a CSS transition on the header.
export function HeaderAutoHide() {
  const pathname = usePathname();
  const lastY = useRef(0);

  // A new page always opens with the header showing (navigating doesn't
  // necessarily fire a scroll event, e.g. from a footer link while hidden).
  useEffect(() => {
    const header = getHeader();
    if (header) setHidden(header, false);
    lastY.current = window.scrollY;
  }, [pathname]);

  useEffect(() => {
    const header = getHeader();
    if (!header) return;
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      // Overscroll bounce (iOS) at either end shouldn't flip the header.
      if (y < 0 || y > maxY) return;
      const delta = y - lastY.current;
      if (Math.abs(delta) < JITTER) return;
      lastY.current = y;
      if (y <= HIDE_AFTER) setHidden(header, false);
      // Keep it visible while something in it has keyboard focus.
      else setHidden(header, delta > 0 && !header.contains(document.activeElement));
    };

    const onFocusIn = () => setHidden(header, false);

    window.addEventListener('scroll', onScroll, { passive: true });
    header.addEventListener('focusin', onFocusIn);
    return () => {
      window.removeEventListener('scroll', onScroll);
      header.removeEventListener('focusin', onFocusIn);
      setHidden(header, false);
    };
  }, []);

  return null;
}
