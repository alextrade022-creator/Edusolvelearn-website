'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/** How far from the top the visitor must scroll before the header may hide. */
const HIDE_AFTER = 96;
/** Ignore sub-pixel jitter (trackpads, smooth scrolling). */
const JITTER = 2;

const getHeader = () => document.querySelector<HTMLElement>('[data-site-header]');

// Only touches the attribute when the state actually changes: even re-setting
// the same value makes the browser recheck the header's styles mid-scroll.
// Keyboard focus inside the header (Tab), not focus left behind by a click: a
// clicked nav link or the menu button keeps focus after the page changes, and
// counting that would keep the header showing for good.
const hasKeyboardFocus = (header: HTMLElement) => header.querySelector(':focus-visible') !== null;

const setHidden = (header: HTMLElement, hidden: boolean) => {
  if (header.hasAttribute('data-hidden') === hidden) return;
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

    // Page height, measured when sizes change rather than on every scroll
    // (reading it mid-scroll can force a layout recalculation).
    let maxY = 0;
    const measure = () => {
      maxY = document.documentElement.scrollHeight - window.innerHeight;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener('resize', measure);

    const onScroll = () => {
      const y = window.scrollY;
      // The mobile menu is open: keep the header showing whatever scrolls behind it.
      if (header.hasAttribute('data-menu-open')) {
        setHidden(header, false);
        lastY.current = y;
        return;
      }
      // Overscroll bounce (iOS) at either end shouldn't flip the header.
      if (y < 0 || y > maxY) return;
      const delta = y - lastY.current;
      if (Math.abs(delta) < JITTER) return;
      lastY.current = y;
      if (y <= HIDE_AFTER) setHidden(header, false);
      // Keep it visible while something in it has keyboard focus.
      else setHidden(header, delta > 0 && !hasKeyboardFocus(header));
    };

    const onFocusIn = () => {
      if (hasKeyboardFocus(header)) setHidden(header, false);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    header.addEventListener('focusin', onFocusIn);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', onScroll);
      header.removeEventListener('focusin', onFocusIn);
      setHidden(header, false);
    };
  }, []);

  return null;
}
