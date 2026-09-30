import type { ReactNode } from 'react';
import { CONTACT } from '@/content/site';
import { ButtonLink, TextLink } from './Button';

interface CtaSectionProps {
  title?: ReactNode;
  text?: ReactNode;
  primaryLabel?: string;
  primaryHref?: string;
  showWhatsApp?: boolean;
}

// Closing call-to-action panel used at the end of most pages.
export function CtaSection({
  title = 'Book your child’s free demo class',
  text = 'Meet a tutor, try a real one-on-one class, and decide with no pressure.',
  primaryLabel = 'Book a free demo class',
  primaryHref = '/contact/',
  showWhatsApp = true,
}: CtaSectionProps) {
  return (
    <section aria-labelledby="cta-title" className="pt-16 pb-14 md:pt-24 md:pb-20 xl:pt-[7.5rem] xl:pb-24">
      <div className="container-site">
        <div className="flex flex-col items-center gap-5 rounded-panel border border-line bg-panel px-6 py-12 text-center md:px-16 md:py-[4.5rem]">
          <h2 id="cta-title" className="max-w-2xl font-serif text-h2 font-medium">
            {title}
          </h2>
          <p className="max-w-lg text-lead text-body">{text}</p>
          <div className="mt-2 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:gap-7">
            <ButtonLink href={primaryHref} className="w-full sm:w-auto">
              {primaryLabel}
            </ButtonLink>
            {showWhatsApp ? (
              <TextLink href={CONTACT.whatsappUrl} external>
                Or chat on WhatsApp
              </TextLink>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
