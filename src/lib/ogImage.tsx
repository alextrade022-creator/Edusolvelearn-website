// Shared builder for the 1200×630 social-sharing images (WhatsApp, Facebook,
// LinkedIn, X). Rendered once at build time by the opengraph-image routes.

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 } as const;

const publicFile = (file: string) => path.join(process.cwd(), 'public', file.replace(/^\//, ''));

/** Reads an image from /public as a data URL so it can be embedded in the card. */
export function publicImage(file: string): string {
  const ext = path.extname(file).slice(1).toLowerCase();
  const mime = ext === 'jpg' ? 'jpeg' : ext;
  return `data:image/${mime};base64,${readFileSync(publicFile(file)).toString('base64')}`;
}

interface OgCardInput {
  eyebrow: string;
  title: string;
  image: string; // path in /public
}

export function ogCard({ eyebrow, title, image }: OgCardInput): ImageResponse {
  const logo = publicImage('/images/edusolve-logo.png');
  const picture = publicImage(image);
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#FAFAF8', color: '#16181A' }}>
        <div style={{ width: 640, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 56px 56px 72px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered to a PNG, not the page */}
          <img src={logo} width={147} height={80} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#D20321' }}>{eyebrow}</div>
            <div style={{ fontSize: title.length > 60 ? 46 : 56, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1 }}>{title}</div>
          </div>
          <div style={{ fontSize: 22, color: '#4A4F54' }}>edusolvelearn.com</div>
        </div>
        <div style={{ width: 560, height: '100%', display: 'flex', background: '#F1EFEA' }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered to a PNG, not the page */}
          <img src={picture} width={560} height={630} alt="" style={{ width: 560, height: 630, objectFit: 'cover' }} />
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
