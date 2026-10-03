import Image from 'next-image-export-optimizer';
import { cn } from '@/lib/cn';

interface AvatarProps {
  /** Photo path under public/; without one a neutral head-and-shoulders figure shows. */
  photo?: string | null;
  /** Describes the photo (ignored for the placeholder, which is decorative). */
  alt?: string;
  /** Size and shape classes, e.g. "size-10 rounded-full". */
  className?: string;
  sizes?: string;
}

// A person's picture: their photo when we have one, otherwise a quiet
// silhouette (never initials), ready to be swapped for a real photo later.
export function Avatar({ photo, alt = '', className, sizes = '96px' }: AvatarProps) {
  return (
    <span className={cn('relative block shrink-0 overflow-hidden bg-panel', className)} aria-hidden={photo ? undefined : true}>
      {photo ? (
        <Image src={photo} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <svg viewBox="0 0 64 64" className="absolute inset-0 size-full text-[#c9c5bd]" fill="currentColor" aria-hidden="true">
          <circle cx="32" cy="25" r="11" />
          <path d="M10 64c0-13.3 9.9-22 22-22s22 8.7 22 22z" />
        </svg>
      )}
    </span>
  );
}
