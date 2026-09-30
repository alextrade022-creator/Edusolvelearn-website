'use client';

import { useState } from 'react';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import type { LifeCategory, LifeItem } from '@/content/life';
import { cn } from '@/lib/cn';
import { formatDate } from '@/lib/date';

const PAGE_SIZE = 6;
type Filter = 'All' | LifeCategory;

// Category filter chips, a featured story and a card grid with "Show more".
export function LifeGallery({ items, categories }: { items: readonly LifeItem[]; categories: readonly LifeCategory[] }) {
  const [filter, setFilter] = useState<Filter>('All');
  const [visible, setVisible] = useState(PAGE_SIZE);

  const featured = filter === 'All' ? items.find((item) => item.featured) : undefined;
  const filtered = items.filter((item) => item !== featured && (filter === 'All' || item.category === filter));
  const shown = filtered.slice(0, visible);

  const choose = (next: Filter) => {
    setFilter(next);
    setVisible(PAGE_SIZE);
  };

  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      <div role="group" aria-label="Filter by category" className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
        {(['All', ...categories] as const).map((option) => {
          const active = option === filter;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => choose(option)}
              className={cn(
                'min-h-11 shrink-0 rounded-full border px-4.5 text-sm font-semibold whitespace-nowrap transition-colors',
                active ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink hover:border-ink',
              )}
            >
              {option}
            </button>
          );
        })}
      </div>

      {featured ? (
        <article className="grid items-center gap-6 rounded-panel border border-line bg-white p-3.5 pb-7 md:p-5 lg:grid-cols-12 lg:gap-12 lg:pb-5">
          <ImagePlaceholder label={featured.photoLabel} className="h-60 rounded-2xl md:h-[26rem] lg:col-span-7 lg:h-[28.75rem]" />
          <div className="flex flex-col gap-4 px-2 lg:col-span-5 lg:pr-7">
            <p className="flex items-center gap-3">
              <span className="rounded-full bg-panel px-3 py-1 text-xs font-bold text-body">{featured.category}</span>
              <span className="text-sm text-muted">{featured.date ? formatDate(featured.date) : '[Date]'}</span>
            </p>
            <h2 className="font-serif text-[1.75rem] leading-tight font-medium tracking-[-0.02em] md:text-[2.5rem]">{featured.title}</h2>
            {featured.summary ? <p className="text-lead text-body">{featured.summary}</p> : null}
            <p className="text-sm font-semibold text-muted">{featured.photoCount} photos</p>
          </div>
        </article>
      ) : null}

      {shown.length ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {shown.map((item) => (
            <li key={item.id} className="flex flex-col gap-4 rounded-card border border-line bg-white p-3.5 pb-6 md:p-4 md:pb-7">
              <div className="relative">
                <ImagePlaceholder label={item.photoLabel} className="h-56 rounded-[0.875rem] md:h-[17.5rem]" />
                <span className="absolute right-3 bottom-3 rounded-full bg-ink/75 px-2.5 py-1 text-xs font-bold text-white">{item.photoCount} photos</span>
              </div>
              <div className="flex flex-col gap-2 px-2">
                <p className="flex items-center gap-2.5">
                  <span className="rounded-full bg-panel px-3 py-1 text-xs font-bold text-body">{item.category}</span>
                  <span className="text-[0.8125rem] text-muted">{item.date ? formatDate(item.date) : '[Date]'}</span>
                </p>
                <h3 className="text-title font-bold">{item.title}</h3>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-card border border-dashed border-line-strong p-10 text-center text-body">Nothing here yet — check back soon.</p>
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
    </div>
  );
}
