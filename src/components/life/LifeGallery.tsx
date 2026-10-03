'use client';

import Image from 'next-image-export-optimizer';
import { useState } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { lifeCategories, type LifeCategory, type LifeItem } from '@/content/life';
import { ExpandChip } from '@/components/ui/ExpandChip';
import { cn } from '@/lib/cn';
import type { ImageSize } from '@/lib/imageSize';
import { LifeLightbox } from './LifeLightbox';

const PAGE_SIZE = 6;
type Filter = 'All' | LifeCategory;

const FOCUS = { center: 'object-center', top: 'object-top', bottom: 'object-bottom' } as const;

const PHOTO_HOVER = 'transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.04] motion-reduce:transition-none';
// The button's hit area is stretched over its whole card; so is its focus ring.
const OPEN_BUTTON = 'text-left outline-none after:absolute after:inset-0 after:rounded-[inherit] focus-visible:after:outline-2 focus-visible:after:outline-offset-3 focus-visible:after:outline-ink';

interface LifeGalleryProps {
  items: readonly LifeItem[];
  categories: readonly LifeCategory[];
  /** Each photo's own pixel size, by path (for the enlarged view). */
  sizes: Readonly<Record<string, ImageSize>>;
}

// Category filter chips, a featured story and a card grid with "Show more".
// Card photos are cropped to a square (posters are square; `focus` says which
// part of a taller photo to keep). A category with no photos shows a short note.
// Any card opens its photo large, uncropped, with a short note (LifeLightbox).
export function LifeGallery({ items, categories, sizes }: LifeGalleryProps) {
  const [filter, setFilter] = useState<Filter>('All');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [opened, setOpened] = useState<LifeItem | null>(null);

  const featured = filter === 'All' ? items.find((item) => item.featured) : undefined;
  const filtered = items.filter((item) => item !== featured && (filter === 'All' || lifeCategories(item).includes(filter)));
  const shown = filtered.slice(0, visible);

  const choose = (next: Filter) => {
    setFilter(next);
    setVisible(PAGE_SIZE);
  };

  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        {(['All', ...categories] as const).map((option) => {
          const active = option === filter;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => choose(option)}
              className={cn(
                'min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition-colors md:px-4.5',
                active ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink hover:border-ink',
              )}
            >
              {option}
            </button>
          );
        })}
      </div>

      {featured ? (
        <Reveal className="group relative grid items-center gap-6 rounded-panel border border-line bg-white p-3.5 pb-7 transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-float md:p-5 lg:grid-cols-12 lg:gap-12 lg:pb-5">
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-panel lg:col-span-7">
            <Image src={featured.photo} alt={featured.alt} fill sizes="(min-width: 1024px) 660px, 100vw" className={cn('object-cover', PHOTO_HOVER, FOCUS[featured.focus ?? 'center'])} />
            <ExpandChip onClick={() => setOpened(featured)} className="absolute right-2.5 bottom-2.5 z-10 sm:right-3.5 sm:bottom-3.5" />
          </div>
          <div className="flex flex-col gap-4 px-2 lg:col-span-5 lg:pr-7">
            <p className="flex flex-wrap gap-1.5">
              {lifeCategories(featured).map((category) => (
                  <span key={category} className="rounded-full bg-panel px-3 py-1 text-xs font-bold text-body">
                    {category}
                  </span>
                ))}
            </p>
            <h2 className="font-serif text-[1.75rem] leading-tight font-medium tracking-[-0.02em] md:text-[2.5rem]">
              <button type="button" aria-haspopup="dialog" onClick={() => setOpened(featured)} className={OPEN_BUTTON}>
                {featured.title}
              </button>
            </h2>
            {featured.summary ? <p className="text-lead text-body">{featured.summary}</p> : null}
          </div>
        </Reveal>
      ) : null}

      {shown.length ? (
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-6">
          {shown.map((item, index) => (
            <Reveal as="li" key={item.id} delay={(index % 3) * 0.08} className="group relative flex flex-col gap-3 rounded-2xl border border-line bg-white p-2 pb-4 transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-float sm:gap-4 sm:rounded-card sm:p-3.5 sm:pb-6 lg:p-4 lg:pb-7">
              <div className="relative aspect-square overflow-hidden rounded-[0.625rem] bg-panel sm:rounded-[0.875rem]">
                <Image
                  src={item.photo}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 768px) 30vw, 46vw"
                  className={cn('object-cover', PHOTO_HOVER, FOCUS[item.focus ?? 'center'])}
                />
                <ExpandChip onClick={() => setOpened(item)} className="absolute right-1.5 bottom-1.5 z-10 sm:right-2.5 sm:bottom-2.5" />
              </div>
              <div className="flex flex-col items-start gap-2 px-0.5 sm:px-2">
                {/* Phones: badges stay on one row (only a second badge may shorten with "…"), so cards with two badges are as tall as the rest. */}
                <span className="flex w-full gap-[0.1875rem] max-sm:flex-nowrap sm:flex-wrap sm:gap-1.5">
                  {lifeCategories(item).map((category, index) => (
                    <span key={category} className={cn('truncate rounded-full bg-panel px-[0.3rem] py-0.5 text-[0.65rem] font-bold text-body sm:px-3 sm:py-1 sm:text-xs', index === 0 ? 'shrink-0' : 'min-w-0')}>
                      {category}
                    </span>
                  ))}
                </span>
                {/* One line, ending in "…" when longer (the full title is in the enlarged view). */}
                <h3 className="w-full text-[0.9375rem] leading-snug font-bold sm:text-title">
                  <button type="button" aria-haspopup="dialog" onClick={() => setOpened(item)} className={cn(OPEN_BUTTON, 'block w-full')}>
                    <span className="block truncate">{item.title}</span>
                  </button>
                </h3>
              </div>
            </Reveal>
          ))}
        </ul>
      ) : (
        <p className="rounded-card border border-dashed border-line-strong p-10 text-center text-body">
          No photos here yet. We’ll add {filter === 'All' ? 'moments' : filter.toLowerCase()} as they happen, so check back soon.
        </p>
      )}

      {filtered.length > visible ? (
        <button
          type="button"
          onClick={() => setVisible((count) => count + PAGE_SIZE)}
          className="mx-auto inline-flex min-h-12 items-center rounded-xl border-[1.5px] border-ink px-6 font-semibold transition-colors hover:bg-ink hover:text-white"
        >
          Show more moments
        </button>
      ) : null}

      <LifeLightbox item={opened} size={opened ? sizes[opened.photo] : undefined} onClose={() => setOpened(null)} />
    </div>
  );
}
