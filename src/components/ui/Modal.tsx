'use client';

import { useLenis } from 'lenis/react';
import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import { CloseIcon } from '@/components/icons';
import { cn } from '@/lib/cn';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Id of the element that names the dialog (usually its heading). */
  labelledBy: string;
  children: ReactNode;
  /** Classes for the white card (width, padding, layout). */
  className?: string;
}

// An enlarged view over the page: the page behind is dimmed and blurred and
// stays still; the card fades and rises in (see `.lightbox` in globals.css).
// Built on the native <dialog>: Escape closes it, focus stays inside while
// it's open and returns afterwards. A click outside the card closes it too.
export function Modal({ open, onClose, labelledBy, children, className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;
    if (!dialog.open) dialog.showModal();
    // The gutter keeps the scrollbar's space, so the page doesn't shift sideways.
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
  }, [open, lenis]);

  const onBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      data-lenis-prevent=""
      onClose={onClose}
      onClick={onBackdropClick}
      className="lightbox fixed inset-0 m-0 h-full max-h-none w-full max-w-none place-items-center overflow-y-auto overscroll-contain border-0 bg-transparent p-4 backdrop:bg-ink/55 backdrop:backdrop-blur-md open:grid md:p-8"
    >
      {open ? (
        <div className={cn('lightbox-card relative w-full rounded-panel bg-white shadow-card', className)}>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 z-10 grid size-11 place-items-center rounded-full border border-line bg-white/95 text-ink shadow-float transition-colors hover:border-ink hover:bg-ink hover:text-white md:top-4 md:right-4"
          >
            <CloseIcon size={20} />
          </button>
          {children}
        </div>
      ) : null}
    </dialog>
  );
}
