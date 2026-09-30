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
    default: `${SITE_NAME} — One-on-one online tuition for Gulf families`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  // Share images come from the opengraph-image file conventions.
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_IN',
    title: `${SITE_NAME} — One-on-one online tuition for Gulf families`,
    description: DESCRIPTION,
  },
  twitter: { card: 'summary_large_image' },
  alternates: { types: { 'application/rss+xml': [{ url: '/blog/rss.xml', title: 'EduSolve blog' }] } },
  icons: { icon: '/images/edusolve-logo.png', apple: '/images/edusolve-logo.png' },
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
