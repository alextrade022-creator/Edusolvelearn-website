import type { Metadata } from 'next';
import { CtaSection } from '@/components/ui/CtaSection';
import { FaqList } from '@/components/ui/FaqList';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { FAQ_GROUPS } from '@/content/faq';
import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema } from '@/lib/structuredData';

export const metadata: Metadata = pageMetadata({
  title: 'Frequently asked questions',
  description:
    'Answers for parents about EduSolve’s free demo class, tutors, fees, curricula, subjects and class timings for Gulf families.',
  path: '/faq/',
});

const slug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQ_GROUPS)} />
      <PageHero
        eyebrow="FAQ"
        title="Questions parents ask"
        intro="Everything families usually want to know before booking a free demo class. Can’t find your answer? Message us on WhatsApp."
      />
      <Section className="grid gap-10 lg:grid-cols-12 lg:gap-6">
        <nav aria-label="FAQ topics" className="lg:col-span-3">
          <ul className="flex flex-wrap gap-2 lg:sticky lg:top-28 lg:flex-col lg:gap-1">
            {FAQ_GROUPS.map((group) => (
              <li key={group.title}>
                <a
                  href={`#${slug(group.title)}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm font-semibold text-body transition-colors hover:text-ink lg:rounded-none lg:border-0 lg:border-l-2 lg:bg-transparent lg:px-4 lg:hover:border-ink"
                >
                  {group.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-14 lg:col-span-8 lg:col-start-5">
          {FAQ_GROUPS.map((group) => (
            <section key={group.title} id={slug(group.title)} aria-labelledby={`${slug(group.title)}-title`} className="scroll-mt-28">
              <h2 id={`${slug(group.title)}-title`} className="mb-4 font-serif text-h3 font-medium">
                {group.title}
              </h2>
              <FaqList items={group.items} openFirst={false} />
            </section>
          ))}
        </div>
      </Section>
      <CtaSection title="Still have a question?" text="Talk to our team on WhatsApp, or book a free demo class and ask the tutor directly." />
    </>
  );
}
