import type { Metadata } from 'next';
import { LifeGallery } from '@/components/life/LifeGallery';
import { CtaSection } from '@/components/ui/CtaSection';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { LIFE_CATEGORIES, LIFE_ITEMS } from '@/content/life';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Life at EduSolve',
  description:
    'Our team, our learning centres in Kerala, our students’ achievements and milestones — a look inside EduSolve.',
  path: '/life-at-edusolve/',
});

// Answers the question families often ask on the phone: "Do you really exist?"
const FACTS = [
  { label: 'Founded', value: '2021' },
  { label: 'Head office', value: 'Kozhikode, Kerala' },
  { label: 'Learning centres', value: '2 in Kerala' },
  { label: 'Led by', value: 'Munavar Ali, CEO' },
] as const;

export default function LifeAtEduSolvePage() {
  return (
    <>
      <PageHero
        eyebrow="Life at EduSolve"
        title="The people, places and moments behind every lesson"
        intro="Our team, our centres in Kerala, our students’ achievements and five years of milestones — a look inside EduSolve."
      />
      <Section spaced={false} className="pt-12 md:pt-14">
        <dl className="grid grid-cols-2 border-y border-line lg:grid-cols-4">
          {FACTS.map((fact, index) => (
            <div
              key={fact.label}
              className={`flex flex-col-reverse gap-1.5 px-4 py-5 md:py-7 ${index % 2 === 1 ? 'border-l border-line' : ''} ${index < 2 ? 'border-b border-line lg:border-b-0' : ''} ${index === 2 ? 'lg:border-l' : ''}`}
            >
              <dt className="text-[0.8125rem] font-semibold text-muted">{fact.label}</dt>
              <dd className="font-serif text-[1.375rem] leading-tight font-medium md:text-[1.875rem]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <Section spaced={false} className="pt-12 md:pt-16">
        <LifeGallery items={LIFE_ITEMS} categories={LIFE_CATEGORIES} />
      </Section>
      <CtaSection
        title="Want to meet the team?"
        text="Talk to us on WhatsApp, visit a centre, or book a free demo class."
      />
    </>
  );
}
