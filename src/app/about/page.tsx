import type { Metadata } from 'next';
import Image from 'next-image-export-optimizer';
import { CheckIcon } from '@/components/icons';
import { Reveal } from '@/components/motion/Reveal';
import { ZoomIn } from '@/components/motion/ZoomIn';
import { ArrowLink } from '@/components/ui/Button';
import { CtaSection } from '@/components/ui/CtaSection';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ABOUT_FOUNDERS, ABOUT_TRUST } from '@/content/pages';
import { pageMetadata } from '@/lib/seo';

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
  { label: 'Families served', value: 'Across 6 Gulf countries' },
] as const;

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0] ?? '')
    .join('')
    .slice(0, 2);

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About EduSolve"
        title="Built by teachers, for families far from home"
        intro="EduSolve began in Kozhikode, Kerala, with one belief — that distance should never decide the quality of a child’s education."
      />

      <Section>
        <dl className="grid grid-cols-2 border-y border-line lg:grid-cols-4">
          {FACTS.map((fact, index) => (
            <div
              key={fact.label}
              className={`flex flex-col-reverse gap-1.5 px-4 py-6 md:py-8 ${index % 2 === 1 ? 'border-l border-line' : ''} ${index < 2 ? 'border-b border-line lg:border-b-0' : ''} ${index === 2 ? 'lg:border-l' : ''}`}
            >
              <dt className="text-[0.8125rem] font-semibold text-muted">{fact.label}</dt>
              <dd className="font-serif text-[1.375rem] leading-tight font-medium md:text-[1.75rem]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section className="grid gap-10 lg:grid-cols-12 lg:gap-6">
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
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-panel text-green">
                <CheckIcon size={18} />
              </span>
              <h3 className="text-title font-bold">{item.title}</h3>
              <p className="leading-relaxed text-body">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="flex flex-col gap-10 lg:gap-12">
        <SectionHeading eyebrow="Leadership" title="The people behind EduSolve" />
        <div className="grid gap-6 md:grid-cols-2">
          {ABOUT_FOUNDERS.map((person) => (
            <article key={person.name} className="flex flex-col gap-6 rounded-panel border border-line bg-white p-4 pb-8 md:p-5 md:pb-9">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-panel">
                {person.photo ? (
                  <ZoomIn className="absolute inset-0">
                    <Image
                      src={person.photo}
                      alt={`${person.name}, ${person.role}`}
                      fill
                      sizes="(min-width: 768px) 560px, 100vw"
                      className="object-cover object-bottom"
                    />
                  </ZoomIn>
                ) : (
                  <div className="flex h-full items-end justify-center pb-8" aria-hidden="true">
                    <span className="font-serif text-[5rem] font-medium text-[#85817a]">{initials(person.name)}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 px-2">
                <h3 className="font-serif text-[1.75rem] font-medium tracking-[-0.015em]">{person.name}</h3>
                <p className="text-sm font-bold tracking-[0.04em] text-red uppercase">{person.role}</p>
                <p className="mt-1 leading-relaxed text-body">{person.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
