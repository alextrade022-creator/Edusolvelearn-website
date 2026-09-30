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
  /** Adds the standard top spacing between sections. */
  spaced?: boolean;
  labelledBy?: string;
}

export function Section({ children, className, id, spaced = true, labelledBy }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn(spaced && 'section-space')}>
      <Container className={className}>{children}</Container>
    </section>
  );
}
