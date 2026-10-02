'use client';

import { useRef, useState } from 'react';
import { PlusIcon } from '@/components/icons';
import { ArrowLink } from '@/components/ui/Button';
import type { Curriculum } from '@/content/curricula';
import { cn } from '@/lib/cn';

interface CurriculaPanelsProps {
  curricula: readonly Curriculum[];
}

// Laptop (lg+): a row of panels; the open one is wide, the rest are slim strips
// with vertical names. Opening animates with a CSS flex-grow transition. The
// open panel's content is laid out at its final width from the start (so the
// tags never wrap and unwrap while the panel grows) and fades in as it opens.
// Phones/tablets: the same markup becomes a vertical accordion.
export function CurriculaPanels({ curricula }: CurriculaPanelsProps) {
  const [openIndex, setOpenIndex] = useState(0);
  const hoverTimer = useRef<number | null>(null);

  // On mouse devices a strip opens after a short hover, so passing over the row
  // doesn't make the panels jump.
  const hoverOpen = (index: number) => {
    if (!window.matchMedia('(hover: hover) and (min-width: 1024px)').matches) return;
    if (hoverTimer.current !== null) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpenIndex(index), 160);
  };
  const cancelHover = () => {
    if (hoverTimer.current !== null) window.clearTimeout(hoverTimer.current);
  };

  return (
    <div
      className="@container flex flex-col gap-2.5 lg:h-[28.75rem] lg:flex-row lg:gap-3"
      style={{ ['--strips' as string]: curricula.length - 1 }}
    >
      {curricula.map((curriculum, index) => {
        const open = index === openIndex;
        const number = String(index + 1).padStart(2, '0');
        return (
          <div
            key={curriculum.id}
            onMouseEnter={() => hoverOpen(index)}
            onMouseLeave={cancelHover}
            className={cn(
              'overflow-hidden rounded-card border border-line transition-[flex-grow,background-color,box-shadow] duration-500 ease-[var(--ease-out-soft)] lg:basis-24',
              open ? 'bg-white shadow-[var(--shadow-card)] lg:grow' : 'bg-panel lg:grow-0 lg:shrink-0',
            )}
          >
            {open ? (
              // Final open width = row width − the slim strips (6rem each + 0.75rem gap) − borders.
              <div className="flex h-full animate-[panel-content-in_520ms_var(--ease-out-soft)_120ms_both] flex-col justify-between gap-6 p-6 motion-reduce:animate-none md:p-8 lg:w-[calc(100cqw-var(--strips)*6.75rem-2px)] lg:p-12">
                <div className="flex flex-col gap-4 lg:gap-5">
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span className="text-red">{number}</span>
                    <span className="font-semibold text-muted">{curriculum.grades}</span>
                  </div>
                  <h3 className="font-serif text-[2.5rem] leading-none font-medium tracking-[-0.03em] lg:text-[4rem]">
                    {curriculum.name}
                  </h3>
                  <p className="max-w-[32.5rem] text-base leading-relaxed text-body lg:text-lg">{curriculum.summary}</p>
                </div>
                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                  <ul className="flex flex-wrap gap-2">
                    {curriculum.tags.map((tag) => (
                      <li key={tag} className="rounded-full bg-panel px-3.5 py-1.5 text-[0.8125rem] font-semibold text-body">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <ArrowLink href={`/courses/#${curriculum.id}`} className="shrink-0">
                    Explore {curriculum.short}
                  </ArrowLink>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-expanded={false}
                className="flex h-full w-full items-center gap-3.5 px-4.5 py-4 text-left lg:flex-col lg:justify-between lg:px-0 lg:py-7"
              >
                <span className="text-xs font-bold text-muted lg:text-[0.8125rem]">{number}</span>
                <span className="grow font-serif text-[1.375rem] font-medium tracking-[-0.01em] text-ink lg:grow-0 lg:rotate-180 lg:text-[1.75rem] lg:[writing-mode:vertical-rl]">
                  {curriculum.name}
                </span>
                <span className="inline-flex size-8 items-center justify-center rounded-full border border-line-strong text-ink lg:size-9">
                  <PlusIcon size={15} />
                  <span className="sr-only">Show {curriculum.name}</span>
                </span>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
