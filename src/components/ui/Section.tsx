import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

// Centred 1200px content column with responsive side gutters.
export function Container({ children, className }: ContainerProps) {
  return <div className={cn('container-site', className)}>{children}</div>;
}

interface SectionProps extends ContainerProps {
  id?: string;
  /**
   * Top spacing: the standard gap between sections (default), `'tight'` for the
   * first section under a short page hero, or `false` for none.
   */
  spaced?: boolean | 'tight';
  labelledBy?: string;
}

export function Section({ children, className, id, spaced = true, labelledBy }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn(spaced === 'tight' ? 'section-space-tight' : spaced && 'section-space')}>
      <Container className={className}>{children}</Container>
    </section>
  );
}
