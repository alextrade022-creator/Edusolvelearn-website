'use client';

import { useEffect, useRef, useState } from 'react';
import { PlayIcon } from '@/components/icons';
import { cn } from '@/lib/cn';

interface YouTubeFacadeProps {
  id: string;
  title: string;
  className?: string;
}

// The videos are Shorts, so it asks for YouTube's portrait thumbnail first
// (fills the tall cards), then falls back to the wide ones.
const THUMBNAILS = ['oardefault.jpg', 'hq720.jpg', 'hqdefault.jpg'] as const;

/** A video's YouTube cover as a lazy <img>, falling back through the sizes YouTube offers. */
export function YouTubeThumbnail({ id, className }: { id: string; className?: string }) {
  const [index, setIndex] = useState(0);
  return (
    // Remote thumbnail: plain <img> keeps it lazy and avoids a build-time download.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://i.ytimg.com/vi/${id}/${THUMBNAILS[index]}`}
      alt=""
      width={720}
      height={1280}
      loading="lazy"
      decoding="async"
      onError={() => setIndex((current) => Math.min(current + 1, THUMBNAILS.length - 1))}
      className={className}
    />
  );
}

// YouTube player states (IFrame API).
const PLAYING = 1;

// Pause functions of every player on the page, so starting one pauses the rest.
const players = new Set<() => void>();

// Shows only a thumbnail until clicked, then loads the privacy-friendly
// youtube-nocookie player. Saves ~1 MB of YouTube code per video on page load.
//
// Once a video is playing, a transparent layer sits over it (all but the
// player's control bar at the bottom). A carousel can't feel a drag that
// lands inside YouTube's frame, so without the layer a playing video would
// stop the row from being swiped. With it, dragging still moves the row and a
// plain tap pauses or resumes the video. The layer only appears after playback
// has really started: phones that block autoplay need the first tap to reach
// YouTube's own play button. Talks to the player with postMessage (the IFrame
// API protocol), without loading YouTube's API script.
export function YouTubeFacade({ id, title, className }: YouTubeFacadeProps) {
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const state = useRef(-1);

  const send = (message: object) => frameRef.current?.contentWindow?.postMessage(JSON.stringify(message), '*');
  const command = (func: 'playVideo' | 'pauseVideo') => send({ event: 'command', func, args: [] });

  useEffect(() => {
    if (!playing) return;
    const pause = () => command('pauseVideo');
    players.add(pause);

    // Ask the player to report its state; it starts answering once it's ready.
    let tries = 0;
    let heard = false;
    const listen = () => send({ event: 'listening', id, channel: 'widget' });
    const timer = window.setInterval(() => {
      if (heard || ++tries > 40) window.clearInterval(timer);
      else listen();
    }, 250);

    const onMessage = (event: MessageEvent) => {
      if (event.source !== frameRef.current?.contentWindow || typeof event.data !== 'string') return;
      let data: { event?: string; info?: { playerState?: number } | number } | null = null;
      try {
        data = JSON.parse(event.data);
      } catch {
        return;
      }
      heard = true;
      const info = data?.info;
      const next = typeof info === 'number' ? (data?.event === 'onStateChange' ? info : undefined) : info?.playerState;
      if (typeof next !== 'number') return;
      state.current = next;
      if (next === PLAYING) {
        setStarted(true);
        for (const other of players) if (other !== pause) other();
      }
    };
    window.addEventListener('message', onMessage);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('message', onMessage);
      players.delete(pause);
    };
    // send/command only read the ref; re-running would re-handshake for nothing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, id]);

  return (
    <div className={cn('relative overflow-hidden bg-[#e4e1da]', className)}>
      {playing ? (
        <>
          <iframe
            ref={frameRef}
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
          {started ? (
            <div
              aria-hidden="true"
              onClick={() => command(state.current === PLAYING ? 'pauseVideo' : 'playVideo')}
              className="absolute inset-x-0 top-0 bottom-14 cursor-pointer"
            />
          ) : null}
        </>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 flex h-full w-full items-center justify-center"
        >
          <YouTubeThumbnail
            id={id}
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
