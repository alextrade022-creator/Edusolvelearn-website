'use client';

import { useState } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import type { FeaturedQuote } from '@/content/home';
import { Avatar } from './Avatar';
import { ExpandChip } from './ExpandChip';
import { Modal } from './Modal';

// Quote text stops after this many lines with "…" (the card opens the full quote).
const QUOTE_CLAMP = { 4: 'line-clamp-4', 5: 'line-clamp-5' } as const;

// A grid of quote cards (parents on Stories, tutors on Our tutors). Each card
// lifts gently on hover; the mark beside the name shows it opens larger. The
// quote stops after 5 lines (4 for tutors), name and place after one. A click
// opens a larger view: the person's photo — or a placeholder figure until we
// have one — beside the full quote.
export function QuoteCards({ quotes, quoteLines = 5 }: { quotes: readonly FeaturedQuote[]; quoteLines?: keyof typeof QUOTE_CLAMP }) {
  const [opened, setOpened] = useState<FeaturedQuote | null>(null);

  return (
    <>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {quotes.map((quote, index) => (
          <Reveal as="li" key={quote.text} delay={(index % 3) * 0.08} className="h-full">
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => setOpened(quote)}
              className="group relative flex h-full w-full flex-col justify-between gap-6 rounded-card border border-line bg-white p-6 text-left transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-float motion-reduce:transition-none md:p-7"
            >
              <span className={`font-serif text-[1.25rem] leading-snug ${QUOTE_CLAMP[quoteLines]}`}>“{quote.text}”</span>
              <span className="flex items-center gap-3">
                <Avatar photo={quote.photo} alt={quote.name} className="size-10 rounded-full" sizes="40px" />
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-[0.9375rem] font-bold">{quote.name}</span>
                  <span className="truncate text-[0.8125rem] text-muted">{quote.meta}</span>
                </span>
                <ExpandChip className="shrink-0" />
              </span>
            </button>
          </Reveal>
        ))}
      </ul>

      <Modal open={opened !== null} onClose={() => setOpened(null)} labelledBy="quote-dialog-name" className="max-w-[56rem] p-3 md:p-4">
        {opened ? (
          <figure className="grid gap-6 md:grid-cols-[minmax(0,17rem)_1fr] md:gap-10">
            <Avatar
              photo={opened.photo}
              alt={opened.name}
              className="aspect-[4/5] w-full max-w-[13rem] rounded-2xl max-md:mx-auto max-md:max-w-[9rem] md:max-w-none"
              sizes="(min-width: 768px) 272px, 144px"
            />
            <div className="flex flex-col justify-center gap-7 px-3 pb-6 md:py-8 md:pr-14 md:pl-0">
              <span aria-hidden="true" className="font-serif text-[4rem] leading-[0.6] text-red">“</span>
              <blockquote className="font-serif text-[1.5rem] leading-[1.3] tracking-[-0.01em] md:text-[2rem]">{opened.text}</blockquote>
              <figcaption className="flex flex-col gap-0.5 border-t border-line pt-5">
                <span id="quote-dialog-name" className="font-bold">
                  {opened.name}
                </span>
                <span className="text-sm text-muted">{opened.meta}</span>
              </figcaption>
            </div>
          </figure>
        ) : null}
      </Modal>
    </>
  );
}
