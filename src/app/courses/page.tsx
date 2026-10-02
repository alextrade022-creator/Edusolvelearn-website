import type { Metadata } from 'next';
import { Reveal } from '@/components/motion/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { CtaSection } from '@/components/ui/CtaSection';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CURRICULA, GRADE_LEVELS, SUBJECTS } from '@/content/curricula';
import { COUNTRIES_SERVED } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Courses & curricula — CBSE, ICSE, IGCSE, IB and American',
  description:
    'One-on-one online tuition for CBSE, ICSE/ISC, IGCSE, IB and American curricula, from LKG to Grade 12, for families across the UAE, Qatar, Saudi Arabia, Bahrain, Kuwait and Oman.',
  path: '/courses/',
});

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Courses & curricula"
        title="Every major curriculum, taught one-on-one"
        intro="Whichever board your child’s school follows, we match them with a tutor who teaches it every day — from the early years right through to Grade 12 board exams."
      >
        <ButtonLink href="/contact/">Book a free demo class</ButtonLink>
      </PageHero>

      {/* One editorial block per curriculum; ids match the home page links (#cbse …).
          A touch tighter than the shared tight spacing (about 35% less than standard). */}
      <Section spaced={false} className="flex flex-col pt-[3.625rem] md:pt-[4.625rem] xl:pt-[5.875rem]">
        <ol className="border-t border-line">
          {CURRICULA.map((curriculum, index) => (
            <li key={curriculum.id} id={curriculum.id} className="scroll-mt-24 border-b border-line py-8 md:py-11">
              <Reveal className="grid gap-6 lg:grid-cols-12 lg:gap-6">
                <div className="flex flex-col gap-3 lg:col-span-4">
                  <p className="text-sm font-bold text-red">{String(index + 1).padStart(2, '0')}</p>
                  <h2 className="font-serif text-[2.5rem] leading-none font-medium tracking-[-0.03em] md:text-[3.5rem]">{curriculum.name}</h2>
                  <p className="text-[0.9375rem] font-semibold text-muted">{curriculum.grades}</p>
                </div>
                <div className="flex flex-col gap-5 lg:col-span-7 lg:col-start-6">
                  <p className="text-lead text-body">{curriculum.detail}</p>
                  <ul className="flex flex-wrap gap-2">
                    {curriculum.tags.map((tag) => (
                      <li key={tag} className="rounded-full bg-panel px-3.5 py-1.5 text-[0.8125rem] font-semibold text-body">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="flex flex-col gap-10 lg:gap-12">
        <SectionHeading eyebrow="Grade levels" title="Support that grows with your child" />
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {GRADE_LEVELS.map((level, index) => (
            <Reveal key={level.title} delay={index * 0.08} className="flex flex-col gap-3 rounded-card border border-line bg-white p-6 md:p-8">
              <p className="text-xs font-bold tracking-[0.08em] text-muted uppercase">{level.range}</p>
              <h3 className="font-serif text-[1.625rem] font-medium tracking-[-0.015em]">{level.title}</h3>
              <p className="leading-relaxed text-body">{level.text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="grid gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="Subjects" title="Support in every subject" intro="Ask us about any subject that isn’t listed." />
        </div>
        <ul className="flex flex-wrap content-start gap-2.5 lg:col-span-7 lg:col-start-6">
          {SUBJECTS.map((subject) => (
            <li key={subject} className="rounded-full border border-line bg-white px-4 py-2.5 text-[0.9375rem] font-semibold">
              {subject}
            </li>
          ))}
        </ul>
      </Section>

      <Section className="grid gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="Where we teach" title="Families across the Gulf" intro="Classes are scheduled around your local time zone." />
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
          {COUNTRIES_SERVED.map((country) => (
            <li key={country} className="rounded-2xl border border-line bg-white px-5 py-4 font-semibold">
              {country}
            </li>
          ))}
        </ul>
      </Section>

      <CtaSection />
    </>
  );
}
