import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRightIcon } from '@/components/icons';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'outline' | 'dark';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-red text-white hover:bg-red-dark',
  outline: 'border-[1.5px] border-ink text-ink hover:bg-ink hover:text-white',
  dark: 'bg-ink text-white hover:bg-black',
};

const BASE =
  'inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-[0.9375rem] font-semibold transition-colors duration-200 sm:text-base';

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Opens in a new tab (WhatsApp, Play Store, maps). */
  external?: boolean;
  withArrow?: boolean;
  ariaLabel?: string;
}

const isInternal = (href: string) => href.startsWith('/');

// Internal links use next/link so pages are prefetched and switch instantly.
export function ButtonLink({ href, children, variant = 'primary', className, external, withArrow, ariaLabel }: ButtonLinkProps) {
  const classes = cn(BASE, VARIANTS[variant], className);
  const content = (
    <>
      {children}
      {withArrow ? <ArrowRightIcon size={18} /> : null}
    </>
  );
  if (isInternal(href) && !external) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} aria-label={ariaLabel} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {content}
    </a>
  );
}

interface TextLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}

// Quiet underlined link, e.g. "Or chat on WhatsApp".
export function TextLink({ href, children, className, external }: TextLinkProps) {
  const classes = cn(
    'inline-flex min-h-11 items-center font-semibold text-ink underline decoration-line-strong decoration-[1.5px] underline-offset-[6px] transition-colors hover:decoration-ink',
    className,
  );
  if (isInternal(href) && !external) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  );
}

// "See all →" style link used in section headers.
export function ArrowLink({ href, children, className, external }: TextLinkProps) {
  const classes = cn(
    'group inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-semibold text-ink',
    className,
  );
  const content = (
    <>
      {children}
      <ArrowRightIcon size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
    </>
  );
  if (isInternal(href) && !external) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {content}
    </a>
  );
}
