'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@/components/icons';
import { YouTubeThumbnail } from '@/components/ui/YouTubeFacade';
import { cn } from '@/lib/cn';

/** At most this many faces in the mosaic (2 columns × 3 rows). */
const MAX_TILES = 6;

// The last card in the home page's video row: a mosaic of the covers of the
// videos that aren't in the row (up to six), fading into a dark band with
// "More student stories" and how many more videos there are. Same size as a
// video card; the whole card links to the Stories page. Tiles and count follow
// the video list by themselves. With no extra videos it's a plain dark card.
export function StoriesEndCard({ ids }: { ids: readonly string[] }) {
  const tiles = ids.slice(0, MAX_TILES);
  const rows = Math.ceil(tiles.length / 2);
  const count = ids.length;

  return (
    <Link href="/testimonials/" className="group relative block aspect-[9/14] overflow-hidden rounded-2xl bg-ink">
      {tiles.length ? (
        <span aria-hidden="true" className="absolute inset-1.5 grid grid-cols-2 gap-1" style={{ gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}>
          {tiles.map((id, index) => (
            <span key={id} className={cn('relative overflow-hidden rounded-lg bg-[#2a2d30]', tiles.length % 2 === 1 && index === tiles.length - 1 && 'col-span-2')}>
              <YouTubeThumbnail
                id={id}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.06] motion-reduce:transition-none"
              />
            </span>
          ))}
        </span>
      ) : null}
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-b from-ink/0 via-ink/85 to-ink/95" />
      <span className="absolute inset-x-4 bottom-4 flex flex-col gap-3 text-white lg:inset-x-5 lg:bottom-5 lg:gap-4">
        <span className="font-serif text-[1.375rem] leading-tight font-medium tracking-[-0.015em] lg:text-[1.75rem]">More student stories</span>
        <span className="flex items-center justify-between gap-3">
          <span className="text-sm text-white/80">{count > 0 ? `${count} more ${count === 1 ? 'video' : 'videos'}` : 'Hear it from our students'}</span>
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:translate-x-1 lg:size-12">
            <ArrowRightIcon size={20} />
          </span>
        </span>
      </span>
    </Link>
  );
}
