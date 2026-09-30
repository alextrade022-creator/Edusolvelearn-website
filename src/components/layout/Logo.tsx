import Image from 'next-image-export-optimizer';
import Link from 'next/link';
import { cn } from '@/lib/cn';

// The logo file is 713×387; it is shown at a fixed height.
export function Logo({ className, height = 40 }: { className?: string; height?: number }) {
  const width = Math.round((713 / 387) * height);
  return (
    <Link href="/" aria-label="EduSolve home" className={cn('inline-flex shrink-0 items-center', className)}>
      <Image
        src="/images/edusolve-logo.png"
        alt="EduSolve — We Find & Solve It"
        width={width}
        height={height}
        sizes={`${width}px`}
        loading="eager"
        placeholder="empty"
        className="h-[34px] w-auto md:h-10"
      />
    </Link>
  );
}
