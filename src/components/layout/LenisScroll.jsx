import { useEffect } from 'react';
import Lenis from 'lenis';

// A single document-level Lenis instance keeps browser scrolling, anchor links,
// and fixed/sticky elements intact while adding smooth wheel inertia.
export default function LenisScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.35,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      anchors: true,
      allowNestedScroll: true,
      respectReducedMotion: true,
    });

    let frameId;
    const raf = (time) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return children;
}
