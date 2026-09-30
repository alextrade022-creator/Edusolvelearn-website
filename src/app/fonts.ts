import { Fraunces, Manrope } from 'next/font/google';

// Downloaded at build time and served from our own domain: no request to
// Google at runtime, and fallback metrics are adjusted so text doesn't jump.

// Headings: only the two weights the design uses.
export const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-fraunces',
});

// Body: one variable font file covers weights 400–800.
export const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});
