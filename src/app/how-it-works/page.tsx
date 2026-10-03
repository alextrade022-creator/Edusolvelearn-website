import type { Metadata } from 'next';
import { StepsTimeline } from '@/components/home/StepsTimeline';
import { BookIcon, CheckIcon, ClipboardCheckIcon, ClockIcon, MessagesIcon, QuestionChatIcon, UserIcon } from '@/components/icons';
import { Reveal } from '@/components/motion/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { CtaSection } from '@/components/ui/CtaSection';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { HIW_FEATURES, HIW_NEEDS, HIW_STEPS } from '@/content/pages';
import { pageMetadata } from '@/lib/seo';

// One meaningful icon per "What your child gets" card (by title).
const FEATURE_ICONS: Record<string, typeof CheckIcon> = {
  'Truly one-on-one': UserIcon,
  'Curriculum-aligned': BookIcon,
  'Flexible scheduling': ClockIcon,
  'Homework & doubt support': QuestionChatIcon,
  'Exam preparation': ClipboardCheckIcon,
  'Parent communication': MessagesIcon,
};

export const metadata: Metadata = pageMetadata({
  title: 'How it works',
  description:
    'From a quick enquiry to a free demo class, a matched tutor and regular progress updates — how EduSolve’s one-on-one online tuition works.',
  path: '/how-it-works/',
});

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="From first hello to steady progress"
        intro="Getting started takes minutes, and the first class is free. Here’s exactly what happens."
      >
        <ButtonLink href="/contact/">Book a free demo class</ButtonLink>
      </PageHero>

      <Section spaced="tight">
        <div className="max-w-[62rem]">
          <StepsTimeline steps={HIW_STEPS} vertical />
        </div>
      </Section>

      <Section className="flex flex-col gap-10 lg:gap-12">
        <SectionHeading eyebrow="In every class" title="What your child gets" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {HIW_FEATURES.map((feature, index) => (
            <Reveal key={feature.title} delay={(index % 3) * 0.08} className="flex flex-col gap-3 rounded-card border border-line bg-white p-6 md:p-7">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-panel text-ink">
                {(() => {
                  const Icon = FEATURE_ICONS[feature.title] ?? CheckIcon;
                  return <Icon size={20} />;
                })()}
              </span>
              <h3 className="text-title font-bold">{feature.title}</h3>
              <p className="leading-relaxed text-body">{feature.text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="grid items-start gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Getting ready"
            title="What your child will need"
            intro="Nothing special — most families already have everything at home."
          />
        </div>
        <ul className="grid gap-3 rounded-panel border border-line bg-panel p-5 sm:grid-cols-2 md:p-8 lg:col-span-6 lg:col-start-7">
          {HIW_NEEDS.map((need) => (
            <li key={need} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 font-semibold">
              <CheckIcon size={18} className="shrink-0 text-green" />
              {need}
            </li>
          ))}
        </ul>
      </Section>

      <CtaSection />
    </>
  );
}
