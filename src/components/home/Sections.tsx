import Link from 'next/link';
import Image from 'next-image-export-optimizer';
import { CheckIcon, ClockIcon, PinIcon } from '@/components/icons';
import { Reveal } from '@/components/motion/Reveal';
import { ZoomIn } from '@/components/motion/ZoomIn';
import { ArrowLink, ButtonLink } from '@/components/ui/Button';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CURRICULA } from '@/content/curricula';
import { CENTRES, FOUNDER, HOME_BENEFITS, HOME_STEPS, TUTOR_CHECKS, TUTOR_QUALITIES } from '@/content/home';
import { LIFE_PREVIEW } from '@/content/life';
import { CONTACT } from '@/content/site';
import { CurriculaPanels } from './CurriculaPanels';
import { StepsTimeline } from './StepsTimeline';
import { TutorApprovalCard } from './TutorApprovalCard';
import { WhyCards } from './WhyCards';

export function CurriculaSection() {
  return (
    <Section labelledBy="curricula-title" className="flex flex-col gap-10 lg:gap-12">
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
    <Section labelledBy="how-title" className="flex flex-col gap-10 lg:gap-16">
      <SectionHeading
        id="how-title"
        eyebrow="How it works"
        title="From first hello to steady progress"
        action={<ArrowLink href="/how-it-works/">See the full process</ArrowLink>}
      />
      <StepsTimeline steps={HOME_STEPS} />
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
      <WhyCards benefits={HOME_BENEFITS} />
    </Section>
  );
}

export function TutorsSection() {
  return (
    <Section labelledBy="tutors-title" className="grid items-center gap-10 lg:grid-cols-2 lg:gap-[5.5rem]">
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
      <div className="flex justify-center rounded-panel border border-line bg-panel px-4 py-8 sm:px-10 sm:py-12 lg:min-h-[35rem] lg:items-center">
        <TutorApprovalCard checks={TUTOR_CHECKS} subject="Mathematics · CBSE & IGCSE" />
      </div>
    </Section>
  );
}

export function FounderSection() {
  return (
    <Section labelledBy="founder-title" className="grid items-center gap-8 lg:grid-cols-12 lg:gap-6">
      <div className="relative aspect-[4/5] overflow-hidden rounded-panel bg-placeholder sm:aspect-[4/3] lg:col-span-5 lg:aspect-auto lg:h-[37.5rem]">
        <ZoomIn className="absolute inset-0">
          <Image
            src={FOUNDER.photo}
            alt={`${FOUNDER.name}, ${FOUNDER.role}`}
            fill
            sizes="(min-width: 1024px) 480px, 100vw"
            className="object-cover object-top"
          />
        </ZoomIn>
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
        eyebrow="Our centres in Kerala"
        title="Moving back home? Learn with us in person."
        intro="EduSolve runs two learning centres in Kerala. If your family moves back, your child can keep learning with us — in a classroom."
        action={
          <ButtonLink href={CONTACT.whatsappUrl} external variant="outline" withArrow className="w-full md:w-auto">
            Talk to us about moving back
          </ButtonLink>
        }
      />
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {CENTRES.map((centre, index) => (
          <Reveal key={centre.id} delay={index * 0.1} className="flex flex-col gap-5 rounded-card border border-line bg-white p-3.5 pb-6 xl:flex-row xl:items-stretch xl:gap-6 xl:p-4">
            <ImagePlaceholder label="Photo of the centre" className="h-48 shrink-0 rounded-xl md:h-56 xl:h-60 xl:w-[16.25rem]" />
            <div className="flex grow flex-col justify-between gap-5 px-2 xl:py-2.5 xl:pr-2 xl:pl-0">
              <div className="flex flex-col gap-3.5">
                <p className="text-[0.8125rem] font-bold text-red">Centre {String(index + 1).padStart(2, '0')}</p>
                <h3 className="font-serif text-[1.625rem] font-medium tracking-[-0.02em] lg:text-[1.875rem]">{centre.town}</h3>
                <p className="flex items-start gap-2.5 text-[0.9375rem] leading-normal text-body">
                  <PinIcon size={18} className="mt-0.5 shrink-0" /> {centre.address}
                </p>
                <p className="flex items-start gap-2.5 text-[0.9375rem] leading-normal text-body">
                  <ClockIcon size={18} className="mt-0.5 shrink-0" /> {centre.timings}
                </p>
              </div>
              <ArrowLink href={centre.mapsUrl} external className="self-start">
                Get directions
              </ArrowLink>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function LifePreviewSection() {
  return (
    <Section labelledBy="life-title" className="flex flex-col gap-10 lg:gap-12">
      <SectionHeading
        id="life-title"
        eyebrow="Life at EduSolve"
        title="Real people. Real classrooms. Real milestones."
        action={<ArrowLink href="/life-at-edusolve/">See life at EduSolve</ArrowLink>}
      />
      <ul className="grid grid-cols-2 gap-x-3.5 gap-y-6 lg:grid-cols-4 lg:gap-6">
        {LIFE_PREVIEW.map((item, index) => (
          <Reveal as="li" key={item.id} delay={index * 0.08}>
            <Link href="/life-at-edusolve/" className="group flex flex-col gap-3 lg:gap-4">
              <ImagePlaceholder label="Photo" className="h-48 rounded-[0.875rem] transition-transform duration-300 group-hover:-translate-y-1 sm:h-64 lg:h-[21.25rem] lg:rounded-2xl" />
              <span className="flex flex-col gap-1.5">
                <span className="text-[0.6875rem] font-bold tracking-[0.06em] text-muted uppercase lg:text-xs">{item.category}</span>
                <span className="text-[0.9375rem] leading-snug font-bold lg:text-[1.0625rem]">{item.title}</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
