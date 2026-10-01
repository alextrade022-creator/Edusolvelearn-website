import type { Metadata } from 'next';
import { ArrowLink, ButtonLink } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    // Fills the screen below the header, so the footer only appears on scroll.
    <section className="container-site flex min-h-[calc(100svh-var(--header-h))] flex-col items-center justify-center gap-6 py-20 text-center">
      <p className="eyebrow">404</p>
      <h1 className="max-w-2xl font-serif text-h1 font-medium text-balance">We couldn’t find that page</h1>
      <p className="max-w-xl text-lead text-pretty text-body">
        The link may be old or mistyped. Try the home page, or book a free demo class and we’ll help from there.
      </p>
      <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row sm:gap-7">
        <ButtonLink href="/">Back to the home page</ButtonLink>
        <ArrowLink href="/contact/">Book a free demo class</ArrowLink>
      </div>
    </section>
  );
}
