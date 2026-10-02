'use client';

import { useLenis } from 'lenis/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon, MenuIcon, WhatsAppIcon } from '@/components/icons';
import { CONTACT, NAV_LINKS } from '@/content/site';
import { cn } from '@/lib/cn';

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(href);

// Desktop links (with the current page highlighted) and the phone/tablet menu.
// This is the only interactive part of the header.
export function HeaderNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const lenis = useLenis();

  // Close the menu after navigating.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Lock page scroll while the menu is open, and close it with Escape. The
  // header is marked so it stays in view (HeaderAutoHide skips it).
  // The lock goes on <html>, not <body>: with <body> clipped as well, the body
  // becomes its own scroll box and the sticky header sticks to the top of the
  // page instead of the screen — off-screen once you've scrolled down.
  useEffect(() => {
    if (!open) return;
    const header = document.querySelector<HTMLElement>('[data-site-header]');
    header?.setAttribute('data-menu-open', '');
    header?.removeAttribute('data-hidden');
    lenis?.stop();
    const root = document.documentElement;
    const { overflow } = root.style;
    root.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      header?.removeAttribute('data-menu-open');
      lenis?.start();
      root.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, lenis]);

  return (
    <>
      <nav aria-label="Main" className="hidden items-center gap-7 xl:flex">
        {NAV_LINKS.map((link) => {
          const active = isActive(pathname, link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'inline-grid text-[0.9375rem] transition-colors hover:text-ink',
                active ? 'font-semibold text-ink' : 'font-medium text-body',
              )}
            >
              {/* An invisible semibold copy reserves the wider width, so the
                  active link's heavier weight never nudges the other links. */}
              <span aria-hidden="true" className="invisible font-semibold [grid-area:1/1]">
                {link.label}
              </span>
              <span className="[grid-area:1/1]">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 items-center justify-center rounded-xl border border-line text-ink xl:hidden"
      >
        {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
      </button>

      {/* Portalled to <body>: the header's backdrop-filter would otherwise trap
          this position:fixed panel inside the header's own box. */}
      {open ? createPortal(<MobileMenu id={menuId} pathname={pathname} />, document.body) : null}
    </>
  );
}

function MobileMenu({ id, pathname }: { id: string; pathname: string }) {
  const rowClass = 'flex min-h-14 items-center border-b border-line-soft font-serif text-2xl font-medium text-ink';
  return (
    <div
      id={id}
      className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto overscroll-contain border-t border-line bg-page md:top-[4.75rem] xl:hidden"
    >
      <nav aria-label="Mobile" className="container-site flex flex-col py-6">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive(pathname, link.href) ? 'page' : undefined}
            className={rowClass}
          >
            {link.label}
          </Link>
        ))}
        <Link href="/contact/" className={rowClass}>
          Contact
        </Link>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/contact/"
            className="inline-flex min-h-13 items-center justify-center rounded-xl bg-red px-6 text-base font-semibold text-white"
          >
            Book a free demo class
          </Link>
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border-[1.5px] border-ink px-6 text-base font-semibold text-ink"
          >
            <WhatsAppIcon size={20} /> Chat on WhatsApp
          </a>
        </div>
      </nav>
    </div>
  );
}
