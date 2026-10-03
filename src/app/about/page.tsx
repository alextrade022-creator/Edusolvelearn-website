import type { Metadata } from 'next';
import { FounderCards } from '@/components/about/FounderCards';
import { CheckIcon, ClockIcon, ShieldCheckIcon, TrendUpIcon, UserIcon } from '@/components/icons';
import { Reveal } from '@/components/motion/Reveal';
import { ArrowLink } from '@/components/ui/Button';
import { CtaSection } from '@/components/ui/CtaSection';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { COUNTRY_COUNT } from '@/content/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ABOUT_FOUNDERS, ABOUT_TRUST } from '@/content/pages';
import { pageMetadata } from '@/lib/seo';

// One meaningful icon per "Why families trust EduSolve" card (by title).
const TRUST_ICONS: Record<string, typeof CheckIcon> = {
  'One-on-one, always': UserIcon,
  'Vetted tutors': ShieldCheckIcon,
  'Gulf-friendly timings': ClockIcon,
  'Transparent progress': TrendUpIcon,
};

export const metadata: Metadata = pageMetadata({
  title: 'About us',
  description:
    'EduSolve began in Kozhikode, Kerala, to give Gulf-based Indian families one-on-one tuition with tutors who teach one child at a time, with genuine care.',
  path: '/about/',
});

const FACTS = [
  { label: 'Founded', value: '2021' },
  { label: 'Head office', value: 'Kozhikode, Kerala' },
  { label: 'Learning centres', value: '2 in Kerala' },
  { label: 'Families served', value: `${COUNTRY_COUNT}+ countries` },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About EduSolve"
        title="Built by teachers, for families far from home"
        intro="EduSolve began in Kozhikode, Kerala, with one belief — that distance should never decide the quality of a child’s education."
      />

      {/* Tight spacing above and below the facts strip, as with the Stories stats. */}
      <Section spaced="tight">
        {/* Same open-line style as the Stories stats: dividers float between the rules. */}
        <dl className="grid grid-cols-2 border-y border-line md:grid-cols-4 md:py-10">
          {FACTS.map((fact, index) => (
            <div
              key={fact.label}
              className={`flex flex-col-reverse items-center gap-2 px-3 py-6 text-center md:py-0 ${index % 2 === 1 ? 'border-l border-line' : ''} ${index < 2 ? 'border-b border-line md:border-b-0' : ''} ${index === 2 ? 'md:border-l md:border-line' : ''}`}
            >
              <dt className="text-sm text-muted">{fact.label}</dt>
              <dd className="font-serif text-[1.25rem] leading-tight font-medium tracking-[-0.015em] text-balance md:text-[1.375rem] lg:text-[1.75rem]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section spaced="tight" className="grid gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Our story" title="A small idea in Kerala, now trusted across the Gulf" />
        </div>
        <Reveal className="flex flex-col gap-5 text-lead text-body lg:col-span-6 lg:col-start-7">
          <p>
            We kept hearing the same story from parents in the UAE, Qatar and Saudi Arabia: crowded online classes where
            their child was just another name on a screen. Homework unchecked. Doubts unanswered. Progress a mystery.
          </p>
          <p>
            So we built the opposite — truly personal, one-on-one tuition, matched to each child’s board, subject and pace.
            No batches, no guesswork. Just a caring tutor who knows exactly where your child needs help.
          </p>
          <ArrowLink href="/life-at-edusolve/" className="self-start">
            See life at EduSolve
          </ArrowLink>
        </Reveal>
      </Section>

      <Section className="flex flex-col gap-10 lg:gap-12">
        <SectionHeading eyebrow="What we stand for" title="Why families trust EduSolve" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {ABOUT_TRUST.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08} className="flex flex-col gap-3 rounded-card border border-line bg-white p-6">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-panel text-ink">
                {(() => {
                  const Icon = TRUST_ICONS[item.title] ?? CheckIcon;
                  return <Icon size={20} />;
                })()}
              </span>
              <h3 className="text-title font-bold">{item.title}</h3>
              <p className="leading-relaxed text-body">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="flex flex-col gap-10 lg:gap-12">
        <SectionHeading eyebrow="Leadership" title="The people behind EduSolve" />
        <FounderCards people={ABOUT_FOUNDERS} />
      </Section>

      <CtaSection />
    </>
  );
}
