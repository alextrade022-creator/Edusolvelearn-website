import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
}

// Opening block for inner pages: eyebrow, serif H1, intro and optional actions.
// Uses the same CSS-only entrance as the home hero.
export function PageHero({ eyebrow, title, intro, children, className }: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" className={cn('pt-12 md:pt-20 lg:pt-24', className)}>
      <div className="container-site flex flex-col gap-5 md:gap-6">
        <p className="hero-rise eyebrow">{eyebrow}</p>
        <h1 id="page-title" className="hero-rise max-w-[56rem] font-serif text-h1 font-medium [animation-delay:80ms]">
          {title}
        </h1>
        {intro ? <p className="hero-rise max-w-[44rem] text-lead text-body [animation-delay:160ms]">{intro}</p> : null}
        {children ? <div className="hero-rise mt-2 [animation-delay:240ms]">{children}</div> : null}
      </div>
    </section>
  );
}
