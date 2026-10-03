import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { MotionProviders } from '@/components/motion/MotionProviders';
import { JsonLd } from '@/components/seo/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/structuredData';
import { SITE_NAME, SITE_URL } from '@/config';
import { cn } from '@/lib/cn';
import { fraunces, manrope } from './fonts';
import './globals.css';

const DESCRIPTION =
  'Warm, one-on-one online tuition for Gulf-based Indian families across CBSE, ICSE, IGCSE, IB and American curricula, LKG to Grade 12.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — One-on-One Online Tuition for Gulf Families`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  // Share images come from the opengraph-image file conventions.
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_IN',
    title: `${SITE_NAME} — One-on-One Online Tuition for Gulf Families`,
    description: DESCRIPTION,
  },
  twitter: { card: 'summary_large_image' },
  alternates: { types: { 'application/rss+xml': [{ url: '/blog/rss.xml', title: 'EduSolve blog' }] } },
  // Square versions of the logo (the full logo is wide; tabs would squeeze it).
  // /favicon.ico at the root is what browsers and Google look for first; the
  // PNG sizes are multiples of 48px, as Google asks for its search results.
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/images/edusolve-icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/images/edusolve-icon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/images/edusolve-icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/images/edusolve-apple-icon.png',
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#fafaf8',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={cn(fraunces.variable, manrope.variable)}>
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[60] rounded-lg bg-ink px-4 py-3 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <MotionProviders>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </MotionProviders>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
