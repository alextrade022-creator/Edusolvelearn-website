import Link from 'next/link';
import Image from 'next-image-export-optimizer';
import { ArrowRightIcon, CheckIcon } from '@/components/icons';
import { PinnedScroll } from '@/components/motion/PinnedScroll';
import { Reveal } from '@/components/motion/Reveal';
import { JsonLd } from '@/components/seo/JsonLd';
import { ArrowLink, ButtonLink } from '@/components/ui/Button';
import { PhoneLink } from '@/components/ui/PhoneLink';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CURRICULA } from '@/content/curricula';
import { CENTRES, FOUNDER, HOME_BENEFITS, HOME_STEPS, TUTOR_CHECKS, TUTOR_QUALITIES } from '@/content/home';
import { LIFE_PREVIEW } from '@/content/life';
import { CONTACT } from '@/content/site';
import { cn } from '@/lib/cn';
import { centreSchema } from '@/lib/structuredData';
import { CurriculaPanels } from './CurriculaPanels';
import { StepsTimeline } from './StepsTimeline';
import { TutorApprovalCard } from './TutorApprovalCard';
import { WhyTabs } from './WhyTabs';

export function CurriculaSection() {
  return (
    // A touch less space above than other sections: the stats band ends in a rule.
    <Section labelledBy="curricula-title" spaced={false} className="flex flex-col gap-10 pt-[4.125rem] md:pt-[5.25rem] lg:gap-12 xl:pt-[6.75rem]">
      <SectionHeading
        id="curricula-title"
        eyebrow="Curricula"
        title="Every major curriculum, taught one-on-one"
        action={<ArrowLink href="/courses/">Explore all courses</ArrowLink>}
      />
      <CurriculaPanels curricula={CURRICULA} />
    </Section>
  );
}

export function HowItWorksSection() {
  return (
    <Section labelledBy="how-title">
      {/* Home only: pinned while the line draws through the steps. */}
      <PinnedScroll distance={100} className="flex flex-col gap-10 lg:gap-16">
        <SectionHeading
          id="how-title"
          eyebrow="How it works"
          title="From first hello to steady progress"
          action={<ArrowLink href="/how-it-works/">See the full process</ArrowLink>}
        />
        <div data-pin-focus>
          <StepsTimeline steps={HOME_STEPS} />
        </div>
      </PinnedScroll>
    </Section>
  );
}

export function WhySection() {
  return (
    <Section labelledBy="why-title" className="flex flex-col gap-10 lg:gap-14">
      <SectionHeading
        id="why-title"
        eyebrow="Why EduSolve"
        title="A classroom of one is a world of difference"
        action={<p className="max-w-[22.5rem] text-lead text-body">Six reasons Gulf families choose one-on-one tuition with EduSolve.</p>}
      />
      <WhyTabs benefits={HOME_BENEFITS} />
    </Section>
  );
}

export function TutorsSection() {
  return (
    <Section labelledBy="tutors-title">
      {/* Home only: pinned while the checks tick through and the seal stamps on. */}
      <PinnedScroll distance={110}>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-[5.5rem]">
          <div className="flex flex-col gap-8 lg:gap-9">
            <SectionHeading
              id="tutors-title"
              eyebrow="Our tutors"
              title="Only the right tutors reach your child"
              intro="Every EduSolve tutor passes the same careful selection before they teach, so whoever is matched with your child meets the same high bar."
            />
            <ul className="flex flex-col gap-4.5">
              {TUTOR_QUALITIES.map((quality) => (
                <li key={quality.strong} className="flex items-start gap-3.5 leading-relaxed">
                  <CheckIcon size={22} className="mt-0.5 shrink-0 text-green" />
                  <span>
                    <strong className="font-bold">{quality.strong}</strong> <span className="text-body">{quality.rest}</span>
                  </span>
                </li>
              ))}
            </ul>
            <ArrowLink href="/teachers/" className="self-start">
              How we select tutors
            </ArrowLink>
          </div>
          <div
            data-pin-focus
            className="flex justify-center rounded-panel border border-line bg-panel px-4 py-8 sm:px-10 sm:py-12 lg:min-h-[35rem] lg:items-center"
          >
            <TutorApprovalCard checks={TUTOR_CHECKS} subject="Mathematics · CBSE & IGCSE" />
          </div>
        </div>
      </PinnedScroll>
    </Section>
  );
}

export function FounderSection() {
  return (
    <Section labelledBy="founder-title" className="grid items-center gap-8 lg:grid-cols-12 lg:gap-6">
      <div className="founder-frame relative aspect-[4/5] overflow-hidden rounded-panel bg-placeholder sm:aspect-[4/3] lg:col-span-5 lg:aspect-auto lg:h-[37.5rem]">
        {/* Zoom settle tied to the scroll (see .founder-zoom in globals.css). */}
        <div className="founder-zoom absolute inset-0">
          <Image
            src={FOUNDER.photo}
            alt={`${FOUNDER.name}, ${FOUNDER.role}`}
            fill
            sizes="(min-width: 1024px) 480px, 100vw"
            className="object-cover object-top"
          />
        </div>
      </div>
      <Reveal className="lg:col-span-6 lg:col-start-7">
        <figure className="flex flex-col gap-7 lg:gap-8">
          <p id="founder-title" className="eyebrow">
            A note from our founder
          </p>
          <blockquote className="font-serif text-[1.5625rem] leading-[1.32] tracking-[-0.01em] md:text-[2rem] lg:text-[2.375rem] lg:leading-[1.28]">
            “{FOUNDER.quote}”
          </blockquote>
          <figcaption className="flex flex-col gap-5 lg:gap-6">
            <span aria-hidden="true" className="block h-0.5 w-12 bg-red" />
            <span className="flex flex-col gap-1">
              <span className="text-lg font-bold">{FOUNDER.name}</span>
              <span className="text-[0.9375rem] text-muted">{FOUNDER.role}</span>
            </span>
            <ArrowLink href="/about/" className="self-start">
              Read our story
            </ArrowLink>
          </figcaption>
        </figure>
      </Reveal>
    </Section>
  );
}

export function CentresSection() {
  return (
    <Section labelledBy="centres-title" className="flex flex-col gap-10 lg:gap-12">
      <SectionHeading
        id="centres-title"
        eyebrow="Our centres"
        title="Online first, with roots in Kozhikode"
        intro="Behind every online class is a team based in Kozhikode, Kerala, where EduSolve also runs two learning centres. Classes at the centres have their own batches and enrolment."
        action={
          <ButtonLink href={CONTACT.whatsappUrl} external variant="outline" withArrow className="w-full md:w-auto">
            Ask about our centres
          </ButtonLink>
        }
      />
      {CENTRES.map((centre) => (
        <JsonLd key={centre.id} data={centreSchema(centre)} />
      ))}
      {/* Divider lines draw in and each row's content fades up as it scrolls into
          view; rows get a light hover on laptops. See .centre-row in globals.css. */}
      <ol>
        {CENTRES.map((centre, index) => (
          <li
            key={centre.id}
            className="centre-row group/row grid gap-x-6 gap-y-3 py-7 transition-colors duration-300 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.3fr)] md:py-9 lg:-mx-4 lg:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.4fr)_auto_auto] lg:items-baseline lg:gap-x-10 lg:rounded-xl lg:px-4 lg:hover:bg-panel/60"
          >
            <span className="centre-fade text-[0.8125rem] font-bold tracking-[0.06em] text-muted tabular-nums md:pt-2 lg:pt-0">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="centre-fade flex flex-col gap-1">
              <h3 className="font-serif text-[1.875rem] leading-tight font-medium tracking-[-0.02em] transition-transform duration-300 ease-[var(--ease-out-soft)] lg:text-[2.25rem] lg:group-hover/row:translate-x-1">
                {centre.name}
              </h3>
              <p className="text-xs font-bold tracking-[0.08em] text-muted uppercase">{centre.city}, Kerala</p>
            </div>
            <address className="centre-fade leading-relaxed text-body not-italic md:col-start-3 md:row-start-1 lg:col-start-auto lg:row-start-auto">
              {centre.street}, {centre.locality} {centre.postalCode}
            </address>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-1 md:col-start-3 lg:contents">
              <PhoneLink
                phone={centre.phone}
                href={centre.phoneHref}
                className="centre-fade inline-flex min-h-11 items-center font-semibold whitespace-nowrap tabular-nums transition-colors hover:text-red"
              />
              <a
                href={centre.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="centre-fade group inline-flex min-h-11 items-center gap-2 font-semibold whitespace-nowrap text-red transition-colors hover:text-red-dark"
              >
                Directions
                <span className="sr-only"> to EduSolve {centre.name} (opens Google Maps)</span>
                <ArrowRightIcon size={18} className="transition-transform duration-300 group-hover:translate-x-1 lg:group-hover/row:translate-x-1" />
              </a>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function LifePreviewSection() {
  return (
    <Section labelledBy="life-title" className="flex flex-col gap-10 lg:gap-12">
      <SectionHeading
        id="life-title"
        eyebrow="Life at EduSolve"
        title="Real classes. Real people. Real milestones."
        action={<ArrowLink href="/life-at-edusolve/">See life at EduSolve</ArrowLink>}
      />
      <ul className="grid grid-cols-2 gap-x-3.5 gap-y-6 lg:grid-cols-4 lg:gap-6">
        {LIFE_PREVIEW.map((item, index) => (
          <Reveal as="li" key={item.id} delay={index * 0.08}>
            <Link href="/life-at-edusolve/" className="group flex flex-col gap-3 lg:gap-4">
              <span className="relative block aspect-square overflow-hidden rounded-[0.875rem] bg-panel lg:rounded-2xl">
                <Image
                  src={item.photo}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 285px, 46vw"
                  className={cn(
                    'object-cover transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.04] motion-reduce:transition-none',
                    item.focus === 'bottom' ? 'object-bottom' : item.focus === 'top' ? 'object-top' : 'object-center',
                  )}
                />
              </span>
              <span className="flex flex-col gap-1.5">
                <span className="text-[0.6875rem] font-bold tracking-[0.06em] text-muted uppercase lg:text-xs">{item.category}</span>
                <span className="truncate text-[0.9375rem] leading-snug font-bold lg:text-[1.0625rem]">{item.title}</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
