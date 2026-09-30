import type { Metadata } from 'next';
import { ArrowLink, ButtonLink } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[60vh] flex-col items-start justify-center gap-6 py-24">
      <p className="eyebrow">404</p>
      <h1 className="max-w-2xl font-serif text-h1 font-medium">We couldn’t find that page</h1>
      <p className="max-w-xl text-lead text-body">
        The link may be old or mistyped. Try the home page, or book a free demo class and we’ll help from there.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
        <ButtonLink href="/">Back to the home page</ButtonLink>
        <ArrowLink href="/contact/">Book a free demo class</ArrowLink>
      </div>
    </section>
  );
}
