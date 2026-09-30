import { ImageIcon } from '@/components/icons';
import { cn } from '@/lib/cn';

// Neutral stand-in until real photos arrive. Announced as an image so the page
// structure stays the same when the photo is swapped in.
export function ImagePlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn('flex flex-col items-center justify-center gap-2 bg-placeholder text-muted', className)}
    >
      <ImageIcon size={28} />
      <span className="px-4 text-center text-xs font-semibold">[{label}]</span>
    </div>
  );
}
