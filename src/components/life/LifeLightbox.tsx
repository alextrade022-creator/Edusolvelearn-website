'use client';

import { useLenis } from 'lenis/react';
import Image from 'next-image-export-optimizer';
import { useEffect, useRef, type CSSProperties, type MouseEvent } from 'react';
import { lifeCategories, type LifeItem } from '@/content/life';
import type { ImageSize } from '@/lib/imageSize';

interface LifeLightboxProps {
  /** The photo to show, or null when closed. */
  item: LifeItem | null;
  /** The photo's own pixel size, so it's shown uncropped in its real shape. */
  size?: ImageSize;
  onClose: () => void;
}

// A photo opened large: the page behind is dimmed and blurred, the photo keeps
// its own shape (no square crop) and a short note sits underneath.
// Built on the native <dialog>: Escape closes it, focus stays inside while it's
// open and returns to the card afterwards. A click outside the card closes it too.
export function LifeLightbox({ item, size, onClose }: LifeLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !item) return;
    if (!dialog.open) dialog.showModal();
    // Keep the page behind still. The gutter keeps the scrollbar's space, so
    // the page doesn't shift sideways on desktop.
    lenis?.stop();
    const root = document.documentElement;
    const { overflow, scrollbarGutter } = root.style;
    root.style.overflow = 'hidden';
    root.style.scrollbarGutter = 'stable';
    return () => {
      if (dialog.open) dialog.close();
      lenis?.start();
      root.style.overflow = overflow;
      root.style.scrollbarGutter = scrollbarGutter;
    };
  }, [item, lenis]);

  // Only a click on the dialog itself (the area around the card) closes it.
  const onBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  const ratio = size ? size.width / size.height : 1;
  const text = item?.description ?? item?.summary;
  // As wide as the screen allows, but never so wide that the photo plus its
  // note is taller than the screen.
  const cardStyle = { width: `min(100%, max(17rem, min(60rem, calc((100svh - 18rem) * ${ratio.toFixed(4)}))))` } as CSSProperties;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="life-lightbox-title"
      data-lenis-prevent=""
      onClose={onClose}
      onClick={onBackdropClick}
      className="lightbox fixed inset-0 m-0 h-full max-h-none w-full max-w-none place-items-center overflow-y-auto overscroll-contain border-0 bg-transparent p-4 backdrop:bg-ink/55 backdrop:backdrop-blur-md open:grid md:p-8"
    >
      {item ? (
        <div className="lightbox-card rounded-panel bg-white p-2.5 shadow-card md:p-3" style={cardStyle}>
          <div className="relative overflow-hidden rounded-2xl bg-white" style={{ aspectRatio: ratio }}>
            <Image key={item.id} src={item.photo} alt={item.alt} fill sizes="(min-width: 1024px) 960px, 92vw" className="object-contain" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-2.5 right-2.5 grid size-11 place-items-center rounded-full bg-white/95 text-ink shadow-float transition-colors hover:bg-ink hover:text-white md:top-3 md:right-3"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-start gap-2.5 px-2.5 pt-4 pb-3 md:px-3.5 md:pt-5 md:pb-4">
            <span className="flex flex-wrap gap-1.5">
              {lifeCategories(item).map((category) => (
                  <span key={category} className="rounded-full bg-panel px-3 py-1 text-xs font-bold text-body">
                    {category}
                  </span>
                ))}
            </span>
            <h2 id="life-lightbox-title" className="font-serif text-[1.375rem] leading-tight font-medium tracking-[-0.01em] md:text-[1.625rem]">
              {item.title}
            </h2>
            {text ? <p className="max-w-[62ch] text-body">{text}</p> : null}
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
