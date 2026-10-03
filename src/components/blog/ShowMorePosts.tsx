'use client';

import { useState, type ReactNode } from 'react';

interface ShowMorePostsProps {
  /** Post cards in order; every one is in the HTML, later ones start hidden. */
  items: readonly { key: string; card: ReactNode }[];
  /** Cards shown at first, and how many each click adds. */
  step?: number;
}

// The blog's card grid with a "Show more articles" button. All cards are in
// the page's HTML (search engines and no-JavaScript visitors still find every
// post); the ones past the first `step` are hidden until asked for.
export function ShowMorePosts({ items, step = 6 }: ShowMorePostsProps) {
  const [visible, setVisible] = useState(step);
  return (
    <>
      <ul className="grid gap-3.5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {items.map((item, index) => (
          <li key={item.key} hidden={index >= visible}>
            {item.card}
          </li>
        ))}
      </ul>
      {items.length > visible ? (
        <button
          type="button"
          onClick={() => setVisible((count) => count + step)}
          className="mx-auto inline-flex min-h-12 items-center rounded-xl border-[1.5px] border-ink px-6 font-semibold transition-colors hover:bg-ink hover:text-white"
        >
          Show more articles
        </button>
      ) : null}
    </>
  );
}
