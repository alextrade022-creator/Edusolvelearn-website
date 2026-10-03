import type { Metadata } from 'next';
import { StepsTimeline } from '@/components/home/StepsTimeline';
import { TutorApprovalCard } from '@/components/home/TutorApprovalCard';
import { CheckIcon } from '@/components/icons';
import { Reveal } from '@/components/motion/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { CtaSection } from '@/components/ui/CtaSection';
import { PageHero } from '@/components/ui/PageHero';
import { QuoteCards } from '@/components/ui/QuoteCards';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TUTOR_CHECKS, TUTOR_QUALITIES } from '@/content/home';
import { TUTOR_QUOTES, TUTOR_SELECTION_STAGES, TUTOR_STATS } from '@/content/pages';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Our tutors — how we select them',
  description:
    'Every EduSolve tutor passes screening, a subject test, an interview and a live demo lesson before teaching — and is reviewed through ongoing parent feedback.',
  path: '/teachers/',
});

export default function TeachersPage() {
  return (
    <>
      <PageHero
        eyebrow="Our tutors"
        title="Only the right tutors reach your child"
        intro="We don’t show a catalogue of faces. Instead, every tutor passes the same careful selection — so whoever is matched with your child meets the same high bar."
      />

      {/* Same stats strip and spacing as the Stories page. */}
      <Section spaced={false} className="pt-[3.625rem] md:pt-[4.625rem] xl:pt-[5.875rem]">
        <dl className="grid grid-cols-2 border-y border-line md:grid-cols-4 md:py-10">
          {TUTOR_STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col-reverse items-center gap-2 px-3 py-6 text-center md:py-0 ${index % 2 === 1 ? 'border-l border-line' : ''} ${index < 2 ? 'border-b border-line md:border-b-0' : ''} ${index === 2 ? 'md:border-l md:border-line' : ''}`}
            >
              <dt className="text-sm text-muted">{stat.label}</dt>
              <dd className="font-serif text-[2.25rem] leading-none font-medium tracking-[-0.03em] md:text-[3rem]">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section spaced={false} className="grid items-start gap-12 pt-[3.625rem] md:pt-[4.625rem] lg:grid-cols-12 lg:gap-6 xl:pt-[5.875rem]">
        <div className="flex flex-col gap-10 lg:col-span-6">
          <SectionHeading eyebrow="Our selection process" title="Four stages before the first class" />
          <StepsTimeline steps={TUTOR_SELECTION_STAGES} vertical />
        </div>
        <div className="flex justify-center rounded-panel border border-line bg-panel px-4 py-10 sm:px-10 lg:sticky lg:top-28 lg:col-span-5 lg:col-start-8 lg:py-14">
          <TutorApprovalCard checks={TUTOR_CHECKS} subject="Mathematics · CBSE & IGCSE" />
        </div>
      </Section>

      {/* A touch less space above than the standard gap. */}
      <Section spaced={false} className="flex flex-col gap-10 pt-[5rem] md:pt-[6.25rem] lg:gap-12 xl:pt-[8rem]">
        <SectionHeading eyebrow="What we look for" title="Qualities every EduSolve tutor shares" />
        <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
          {TUTOR_QUALITIES.map((quality, index) => (
            <Reveal as="li" key={quality.strong} delay={index * 0.08} className="flex flex-col gap-3 rounded-card border border-line bg-white p-6 md:p-7">
              <CheckIcon size={22} className="text-green" />
              <p className="text-title font-bold">{quality.strong}</p>
              <p className="leading-relaxed text-body">{quality.rest.replace(/^—\s*/, '').replace(/^./, (c) => c.toUpperCase())}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* The invitation to teach comes before the tutor quotes, so it never ends up far down the page as quotes are added. */}
      <Section spaced={false} className="pt-[3.75rem] md:pt-[5.5rem] xl:pt-[6.875rem]">
        <Reveal className="flex flex-col gap-6 rounded-panel bg-ink px-6 py-10 text-white md:flex-row md:items-center md:justify-between md:px-14 md:py-14">
          <div className="flex flex-col gap-3">
            <p className="text-[0.8125rem] font-bold tracking-[0.08em] text-footer-text uppercase">Teach with us</p>
            <h2 className="max-w-xl font-serif text-h3 font-medium">Love teaching one child at a time?</h2>
            <p className="max-w-lg text-footer-text">Tell us about yourself and the subjects you teach. We’ll be in touch if there’s a fit.</p>
          </div>
          <ButtonLink href="/teach/" variant="primary" withArrow className="self-start md:self-auto">
            Apply to teach
          </ButtonLink>
        </Reveal>
      </Section>

      {/* PLACEHOLDER quotes (see TUTOR_QUOTES): what teaching here is like. */}
      {/* A touch less space above than the standard gap. */}
      <Section spaced={false} className="flex flex-col gap-10 pt-[4.5rem] md:pt-[5.75rem] lg:gap-12 xl:pt-[7.25rem]">
        <SectionHeading eyebrow="From our tutors" title="What teaching at EduSolve is like" />
        <QuoteCards quotes={TUTOR_QUOTES} quoteLines={4} />
      </Section>

      <CtaSection />
    </>
  );
}
