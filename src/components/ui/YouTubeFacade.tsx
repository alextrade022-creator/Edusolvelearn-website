'use client';

import { useState } from 'react';
import { PlayIcon } from '@/components/icons';
import { cn } from '@/lib/cn';

interface YouTubeFacadeProps {
  id: string;
  title: string;
  className?: string;
}

// Shows only a thumbnail until clicked, then loads the privacy-friendly
// youtube-nocookie player. Saves ~1 MB of YouTube code per video on page load.
export function YouTubeFacade({ id, title, className }: YouTubeFacadeProps) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${id}/hq720.jpg`);

  return (
    <div className={cn('relative overflow-hidden bg-[#e4e1da]', className)}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 flex h-full w-full items-center justify-center"
        >
          {/* Remote thumbnail: plain <img> keeps it lazy and avoids a build-time download. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt=""
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
            onError={() => setThumb(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/35" />
          <span className="relative inline-flex size-14 items-center justify-center rounded-full bg-white/95 text-ink shadow-[var(--shadow-float)] transition-transform duration-300 group-hover:scale-105 lg:size-15">
            <PlayIcon size={22} />
          </span>
        </button>
      )}
    </div>
  );
}
