import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import { DemoForm } from '@/components/forms/DemoForm';
import { ClockIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from '@/components/icons';
import { PageHero } from '@/components/ui/PageHero';
import { CONTACT } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Book a free demo class',
  description:
    'Book a free one-on-one demo class with an EduSolve tutor, or reach us on WhatsApp, phone or email. We teach families across the UAE, Qatar, Saudi Arabia, Bahrain, Kuwait and Oman.',
  path: '/contact/',
});

interface ContactCard {
  title: string;
  value: string;
  href: string | null;
  external?: boolean;
  Icon: ComponentType<{ size?: number }>;
}

const CARDS: readonly ContactCard[] = [
  { title: 'WhatsApp', value: CONTACT.phone, href: CONTACT.whatsappUrl, external: true, Icon: WhatsAppIcon },
  { title: 'Call us', value: CONTACT.phone, href: CONTACT.phoneHref, Icon: PhoneIcon },
  { title: 'Email', value: CONTACT.email, href: CONTACT.emailHref, Icon: MailIcon },
  { title: 'Head office', value: CONTACT.location, href: null, Icon: PinIcon },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a free demo"
        title="Let’s find the right tutor for your child"
        intro="Fill in a few details and we’ll arrange a free one-on-one demo class. Prefer to chat? Reach us on WhatsApp anytime."
      />
      <section className="pt-10 pb-24 md:pt-14 md:pb-32">
        <div className="container-site grid items-start gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <DemoForm />
          </div>
          <aside className="flex flex-col gap-6 lg:col-span-4 lg:col-start-9" aria-label="Other ways to reach us">
            <h2 className="font-serif text-[1.625rem] font-medium">Or reach us directly</h2>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {CARDS.map(({ title, value, href, external, Icon }) => {
                const inner = (
                  <>
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-panel text-ink">
                      <Icon size={20} />
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-[0.9375rem] font-bold">{title}</span>
                      <span className="truncate text-sm text-body">{value}</span>
                    </span>
                  </>
                );
                const cardClass = 'flex items-center gap-4 rounded-2xl border border-line bg-white p-4';
                return (
                  <li key={title}>
                    {href ? (
                      <a href={href} className={`${cardClass} transition-shadow hover:shadow-[var(--shadow-float)]`} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                        {inner}
                      </a>
                    ) : (
                      <div className={cardClass}>{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="flex flex-col gap-3 rounded-2xl bg-ink p-6 text-white">
              <p className="flex items-center gap-2.5 font-bold">
                <ClockIcon size={18} /> Class timings
              </p>
              <p className="text-[0.9375rem] leading-relaxed text-footer-text">
                Evening and weekend slots across Gulf time zones — UAE, Qatar, Saudi Arabia, Bahrain, Kuwait and Oman. We’ll find a time that suits your family.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
