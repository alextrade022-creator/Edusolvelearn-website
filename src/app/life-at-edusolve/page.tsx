import type { Metadata } from 'next';
import { LifeGallery } from '@/components/life/LifeGallery';
import { CtaSection } from '@/components/ui/CtaSection';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { LIFE_CATEGORIES, LIFE_ITEMS } from '@/content/life';
import { publicImageSize } from '@/lib/imageSize';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Life at EduSolve',
  description:
    'Our team, our learning centres in Kerala, our students’ achievements and milestones — a look inside EduSolve.',
  path: '/life-at-edusolve/',
});

// Answers the question families often ask on the phone: "Do you really exist?"
const FACTS = [
  { label: 'Head office', value: 'Kozhikode, Kerala' },
  { label: 'Founded', value: '2021' },
  { label: 'Learning centres', value: '2 in Kerala' },
] as const;

export default async function LifeAtEduSolvePage() {
  // Measured once at build time, so enlarged photos open in their real shape.
  const sizes = Object.fromEntries(await Promise.all(LIFE_ITEMS.map(async (item) => [item.photo, await publicImageSize(item.photo)] as const)));

  return (
    <>
      <PageHero
        eyebrow="Life at EduSolve"
        title="The people, places and moments behind every lesson"
        intro="Our team, our centres in Kerala, our students’ achievements and five years of milestones — a look inside EduSolve."
      />
      <Section spaced={false} className="pt-14 md:pt-16 lg:pt-20">
        {/* Open lines like the stats bands: dividers float between the rules. */}
        <dl className="grid grid-cols-3 border-y border-line py-6 md:py-10">
          {FACTS.map((fact, index) => (
            <div key={fact.label} className={`flex flex-col-reverse items-center gap-1.5 px-2 text-center md:px-4 ${index > 0 ? 'border-l border-line' : ''}`}>
              <dt className="text-[0.8125rem] font-semibold text-muted md:text-sm">{fact.label}</dt>
              <dd className="font-serif text-[1.125rem] leading-tight font-medium text-balance md:text-[1.875rem]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <Section spaced={false} className="pt-14 md:pt-20">
        <LifeGallery items={LIFE_ITEMS} categories={LIFE_CATEGORIES} sizes={sizes} />
      </Section>
      <CtaSection
        title="Want to meet the team?"
        text="Talk to us on WhatsApp, visit a centre, or book a free demo class."
      />
    </>
  );
}
