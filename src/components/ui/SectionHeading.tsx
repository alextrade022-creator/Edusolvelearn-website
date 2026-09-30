import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  id?: string;
  intro?: ReactNode;
  /** Right-aligned link or button on wider screens (below the heading on phones). */
  action?: ReactNode;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  id,
  intro,
  action,
  align = 'left',
  as: Heading = 'h2',
  className,
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        !centered && Boolean(action) && 'md:flex-row md:items-end md:justify-between md:gap-12',
        centered && 'items-center text-center',
        className,
      )}
    >
      <div className={cn('flex flex-col gap-4', centered && 'items-center')}>
        <p className="eyebrow">{eyebrow}</p>
        <Heading
          id={id}
          className={cn(
            'font-serif font-medium text-ink',
            Heading === 'h1' ? 'text-h1' : 'text-h2',
            'max-w-[42rem]',
          )}
        >
          {title}
        </Heading>
        {intro ? <p className="max-w-[38rem] text-lead text-body">{intro}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
