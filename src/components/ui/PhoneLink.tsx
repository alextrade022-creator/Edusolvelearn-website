'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { cn } from '@/lib/cn';

interface PhoneLinkProps {
  /** Number as shown, e.g. "+91 73567 41944". */
  phone: string;
  /** tel: link, e.g. "tel:+917356741944". */
  href: string;
  className?: string;
}

/** How long the "Copied" note stays up. */
const NOTE_MS = 2000;

/** Copy text: Clipboard API first, then the legacy copy command. */
async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand('copy');
    field.remove();
    return ok;
  }
}

// A phone number that copies itself when clicked or tapped, on every screen,
// and shows a small "Copied" note. The tel: href stays for semantics (and works
// if JavaScript is off). Uses the Clipboard API, falling back to the older copy
// command where that isn't available.
export function PhoneLink({ phone, href, className }: PhoneLinkProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onClick = async (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (!(await copyText(phone))) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), NOTE_MS);
  };

  return (
    <a href={href} onClick={onClick} title="Copy number" className={cn('relative', className)}>
      {phone}
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 rounded-md bg-ink px-2 py-1 text-xs font-semibold whitespace-nowrap text-white transition-[opacity,translate] duration-200',
          copied ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0',
        )}
      >
        Copied
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Phone number copied' : ''}
      </span>
    </a>
  );
}
