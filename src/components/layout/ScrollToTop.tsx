'use client';

import { useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

// Every page opens at the top when you navigate to it by a link or button.
// (Next.js only scrolls when the new page's top is out of view, and Lenis keeps
// its own scroll position, so pages could otherwise open part-way down.)
// Left alone: browser back/forward (restores where you were reading) and links
// to a section (#id), which scroll to that section instead.
export function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();
  const lastPath = useRef(pathname);
  // Page a back/forward step went to (popstate fires before the route updates).
  const historyPath = useRef<string | null>(null);

  useEffect(() => {
    const onPopState = () => {
      historyPath.current = window.location.pathname;
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Next.js runs its own "bring the new page into view" step during the
  // navigation, and it can land part-way down. So the reset runs once now and
  // again on the next task, after Next.js has finished, to have the final say.
  useEffect(() => {
    if (lastPath.current === pathname) return; // first load (and Strict Mode re-runs)
    lastPath.current = pathname;
    const fromHistory = historyPath.current === pathname;
    historyPath.current = null;
    if (fromHistory || window.location.hash) return;
    // Scroll natively, then sync Lenis: Lenis skips a scrollTo when its own
    // (possibly stale) position already says 0, so it can't be relied on alone.
    const toTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      lenis?.scrollTo(0, { immediate: true, force: true });
    };
    toTop();
    const timer = window.setTimeout(toTop, 0);
    return () => window.clearTimeout(timer);
    // Only on page changes — not when Lenis itself becomes available.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
