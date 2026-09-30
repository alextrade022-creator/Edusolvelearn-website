'use client';

import { useState } from 'react';
import { LinkIcon, WhatsAppIcon } from '@/components/icons';

// Share on WhatsApp (the channel parents use most) or copy the link.
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const circle = 'inline-flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-ink';

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy this link:', url);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className={circle}
      >
        <WhatsAppIcon size={18} />
      </a>
      <button type="button" onClick={copy} aria-label="Copy link" className={circle}>
        <LinkIcon size={17} />
      </button>
      <span role="status" className="text-[0.8125rem] font-semibold text-green">
        {copied ? 'Link copied' : ''}
      </span>
    </div>
  );
}
