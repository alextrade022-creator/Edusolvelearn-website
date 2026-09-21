import { useEffect, useRef, useState } from 'react';

// Animates a set of numbers from 0 to their targets once the returned ref
// scrolls into view. Returns [ref, values] where values mirrors `targets`.
// Falls back to final values immediately when IntersectionObserver is absent.
export default function useCountUp(targets, { duration = 1700, threshold = 0.35 } = {}) {
  const ref = useRef(null);
  const [values, setValues] = useState(() => targets.map(() => 0));
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setValues(targets);
      return undefined;
    }

    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setValues(targets.map((t) => Math.round(t * eased)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            run();
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // targets is a stable module-level constant per page; intentionally run once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, values];
}
