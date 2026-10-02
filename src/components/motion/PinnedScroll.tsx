'use client';

import { useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, type MotionValue } from 'motion/react';
import { createContext, useCallback, useContext, useLayoutEffect, useRef, type ReactNode } from 'react';

// Scroll progress (0 → 1) of the active pin, or null when content isn't pinned.
const PinProgressContext = createContext<MotionValue<number> | null>(null);

/** Read the surrounding pin's progress (null outside a PinnedScroll, or with reduced motion). */
export const usePinProgress = () => useContext(PinProgressContext);

interface PinnedScrollProps {
  children: ReactNode;
  /** Extra scroll distance while pinned, in % of the viewport height (how long the interaction lasts). */
  distance?: number;
  /** A different distance on phones (under 768px wide), where long holds mean a lot of thumb-scrolling. */
  distanceSmall?: number;
  className?: string;
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

// Pins content in the viewport while the visitor scrolls through `distance`,
// and exposes that progress to children (usePinProgress) so effects follow the
// scroll — and reverse when scrolling back. Interaction only starts once pinned.
//
// - Whole block fits on screen (laptops, most tablets): the whole block pins,
//   centred in the visible area below the header.
// - It doesn't (phones): only the element marked `data-pin-focus` pins,
//   centred; headings and other text scroll away above it as normal.
//
// Built on CSS `position: sticky`, so scrolling itself is never hijacked.
// Heights use the "small viewport" so mobile address bars don't cause jumps.
// With "reduce motion" nothing is pinned and children show their final state.
export function PinnedScroll({ children, distance = 90, distanceSmall, className }: PinnedScrollProps) {
  const blockRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);
  const geometry = useRef({ start: 0, length: 1 });

  const reduceMotion = useReducedMotion();
  const progress = useMotionValue(0);
  const { scrollY } = useScroll();

  const update = useCallback(
    (y: number) => progress.set(clamp01((y - geometry.current.start) / geometry.current.length)),
    [progress],
  );

  useMotionValueEvent(scrollY, 'change', update);

  // Measure: what to pin, where to stick it so it's centred, and the scroll range.
  useLayoutEffect(() => {
    if (reduceMotion) return;
    const block = blockRef.current;
    const spacer = spacerRef.current;
    const probe = probeRef.current;
    if (!block || !spacer || !probe) return;
    const focus = block.querySelector<HTMLElement>('[data-pin-focus]');

    // Un-stick only: clearing position/top never changes the page's height.
    const unstick = () => {
      for (const element of [block, focus]) {
        element?.style.removeProperty('position');
        element?.style.removeProperty('top');
      }
    };
    const clearFocusRoom = () => {
      focus?.parentElement?.removeAttribute('data-pin-room');
      focus?.parentElement?.style.removeProperty('--pin-room');
    };
    // The block's own height, without the focus room (an ::after spacer plus
    // the gap before it) that may still be inside it from the phone layout.
    // Otherwise, after resizing from a phone to a laptop, the block would look a
    // screen taller than it is, "not fit", and stay in phone mode.
    const naturalBlockHeight = () => {
      const parent = focus?.parentElement;
      if (!parent?.hasAttribute('data-pin-room')) return block.offsetHeight;
      const room = parseFloat(getComputedStyle(parent, '::after').height) || 0;
      const gap = parseFloat(getComputedStyle(parent).rowGap) || 0;
      return block.offsetHeight - room - gap;
    };
    // Full teardown (unmount only).
    const reset = () => {
      unstick();
      clearFocusRoom();
      spacer.style.removeProperty('height');
      block.removeAttribute('data-pin-mode');
    };

    const measure = () => {
      // Read the natural (unpinned) layout. The scroll room (spacer / pin-room)
      // stays in place while measuring: removing it, even for an instant, would
      // shorten the page and the browser would clamp the scroll position — e.g.
      // opening an FAQ answer near the bottom would jump the page to the footer.
      unstick();
      const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 64;
      const viewport = probe.getBoundingClientRect().height; // 100svh
      const available = viewport - headerHeight;
      const percent = distanceSmall !== undefined && window.innerWidth < 768 ? distanceSmall : distance;
      const length = Math.max(1, Math.round((viewport * percent) / 100));
      const blockHeight = naturalBlockHeight();
      const pinned = !focus || blockHeight <= available - 32 ? block : focus;
      const top = Math.round(headerHeight + (available - (pinned === block ? blockHeight : pinned.offsetHeight)) / 2);
      const naturalTop = pinned.getBoundingClientRect().top + window.scrollY;

      pinned.style.position = 'sticky';
      pinned.style.top = `${top}px`;
      // Lets children adapt to what is pinned (see LifeChapters).
      block.dataset.pinMode = pinned === block ? 'block' : 'focus';
      // Room to stay pinned: a spacer after the block, or (a sticky element
      // never leaves its parent's content box) an ::after spacer in the focus
      // element's parent — see [data-pin-room] in globals.css.
      if (pinned === block) {
        clearFocusRoom();
        spacer.style.height = `${length}px`;
      } else if (pinned.parentElement) {
        spacer.style.removeProperty('height');
        pinned.parentElement.setAttribute('data-pin-room', '');
        pinned.parentElement.style.setProperty('--pin-room', `${length}px`);
      }

      geometry.current = { start: naturalTop - top, length };
      update(window.scrollY);
    };

    measure();
    const remeasure = () => window.requestAnimationFrame(measure);
    const observer = new ResizeObserver(remeasure);
    observer.observe(probe);
    observer.observe(document.body); // content above changing height moves the pin
    window.addEventListener('resize', remeasure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', remeasure);
      reset();
    };
  }, [reduceMotion, distance, distanceSmall, update]);

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <div>
      <div ref={blockRef} className={className}>
        <PinProgressContext.Provider value={progress}>{children}</PinProgressContext.Provider>
      </div>
      <div ref={spacerRef} aria-hidden="true" />
      <div ref={probeRef} aria-hidden="true" className="pointer-events-none invisible fixed top-0 left-0 h-svh w-px" />
    </div>
  );
}
