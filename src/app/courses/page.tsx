import type { Metadata } from 'next';
import { Reveal } from '@/components/motion/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { CtaSection } from '@/components/ui/CtaSection';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CURRICULA, GRADE_LEVELS, SUBJECT_GROUPS } from '@/content/curricula';
import { COUNTRY_GROUPS } from '@/content/site';
import { cn } from '@/lib/cn';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Courses & curricula — CBSE, ICSE, IGCSE, Kerala Board, IB and American',
  description:
    'One-on-one online tuition for CBSE, ICSE/ISC, IGCSE, Kerala Board, IB and American curricula, from LKG to Grade 12, for families across the Gulf and around the world.',
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
        <GroupedList groups={SUBJECT_GROUPS} className="lg:col-span-7 lg:col-start-6" />
      </Section>

      <Section id="where-we-teach" className="grid gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="Where we teach" title="Families across the world" intro="Classes are scheduled around your local time zone." />
        </div>
        <GroupedList
          groups={COUNTRY_GROUPS.map((group) => ({ name: group.name, items: group.items.map((country) => country.short ?? country.name) }))}
          className="lg:col-span-7 lg:col-start-6"
        />
      </Section>

      <CtaSection />
    </>
  );
}

// Rows of items under small group labels, separated by thin rules: a light way
// to list many subjects or countries (label above the items on phones).
function GroupedList({ groups, className }: { groups: readonly { name: string; items: readonly string[] }[]; className?: string }) {
  return (
    <dl className={cn('border-b border-line', className)}>
      {groups.map((group) => (
        <div key={group.name} className="grid gap-1.5 border-t border-line py-4 sm:grid-cols-[11rem_1fr] sm:gap-6 md:py-5">
          <dt className="text-sm text-muted sm:pt-0.5">{group.name}</dt>
          {/* Each item has a dot before it; the list is shifted left and clipped, so
              the dot of whichever item starts a line is hidden. */}
          <dd className="overflow-hidden">
            <ul className="-ml-6 flex flex-wrap gap-y-1 text-[1.0625rem] leading-relaxed font-semibold">
              {group.items.map((item) => (
                <li key={item} className="before:inline-block before:w-6 before:text-center before:font-normal before:text-line-strong before:content-['·']">
                  {item}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}
