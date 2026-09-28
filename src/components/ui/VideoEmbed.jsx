import { useState } from 'react';

// Vertical (9:16) testimonial player. The YouTube iframe is created only once
// the visitor asks to play it, avoiding third-party player work on page load.
export default function VideoEmbed({ id, className = '' }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className={`rounded-[20px] overflow-hidden bg-black shadow-[0_14px_34px_rgba(22,26,29,.14)] aspect-[9/16] ${className}`}
    >
      {isPlaying ? (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          title="EduSolve student testimonial"
          className="w-full h-full border-0 block"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="group relative w-full h-full overflow-hidden border-0 cursor-pointer bg-brand-ink text-white"
          aria-label="Play student testimonial video"
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-brand-ink/25 transition-colors group-hover:bg-brand-ink/35" />
          <span className="relative mx-auto flex w-[68px] h-[68px] items-center justify-center rounded-full bg-brand-red pl-1 shadow-[0_10px_24px_rgba(210,3,33,.45)] transition-transform duration-150 group-hover:scale-110">
            <span className="w-0 h-0 border-y-[11px] border-y-transparent border-l-[17px] border-l-white" />
          </span>
          <span className="absolute inset-x-5 bottom-6 text-center font-heading text-sm font-bold leading-snug">
            Watch student story
          </span>
        </button>
      )}
    </div>
  );
}
