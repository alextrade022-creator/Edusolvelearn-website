import Image from 'next-image-export-optimizer';
import { cn } from '@/lib/cn';

interface PostCoverProps {
  title: string;
  category: string;
  cover: string | null;
  sizes: string;
  className?: string;
  /** The page's main image: preload it at high priority. */
  priority?: boolean;
  /** Smaller text for thumbnails. */
  compact?: boolean;
}

// A post's cover photo, or — when a post has no cover yet — a branded fallback
// (serif title on the warm panel), so cards never look broken.
export function PostCover({ title, category, cover, sizes, className, priority, compact }: PostCoverProps) {
  if (cover) {
    return (
      <div className={cn('relative overflow-hidden bg-panel', className)}>
        <Image src={cover} alt="" fill sizes={sizes} preload={priority} fetchPriority={priority ? 'high' : undefined} loading={priority ? 'eager' : 'lazy'} className="object-cover object-[center_40%]" />
      </div>
    );
  }
  return (
    <div aria-hidden="true" className={cn('relative flex flex-col justify-between overflow-hidden bg-panel p-4 sm:p-6', className)}>
      <span className={cn('font-bold tracking-[0.08em] text-red uppercase', compact ? 'text-[0.5625rem]' : 'text-[0.6875rem]')}>{category}</span>
      <span className={cn('font-serif leading-tight font-medium text-ink', compact ? 'line-clamp-3 text-[0.8125rem]' : 'line-clamp-3 text-[1.375rem] sm:text-[1.625rem]')}>{title}</span>
      <span className={cn('font-bold text-muted', compact ? 'text-[0.5625rem]' : 'text-xs')}>EduSolve</span>
    </div>
  );
}
