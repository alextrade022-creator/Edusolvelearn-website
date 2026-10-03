import type { Metadata } from 'next';
import { CtaSection } from '@/components/ui/CtaSection';
import { Avatar } from '@/components/ui/Avatar';
import { PageHero } from '@/components/ui/PageHero';
import { QuoteCards } from '@/components/ui/QuoteCards';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { VideoCarousel } from '@/components/ui/VideoCarousel';
import { STORIES_PAGE_VIDEO_IDS, TESTIMONIAL_QUOTES, TESTIMONIAL_STATS } from '@/content/pages';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Parent stories',
  description:
    'What families across the UAE, Qatar, Saudi Arabia, Bahrain, Kuwait and Oman say about one-on-one tuition with EduSolve.',
  path: '/testimonials/',
});

export default function TestimonialsPage() {
  const [featured, ...quotes] = TESTIMONIAL_QUOTES;
  return (
    <>
      <PageHero
        eyebrow="Parent stories"
        title="Real families, in their own words"
        intro="Parents and students across the Gulf on what one-on-one tuition changed for them."
      />

      {/* A little tighter than the shared tight spacing above and below the stats (about 35% less than between other sections). */}
      <Section spaced={false} className="pt-[3.625rem] md:pt-[4.625rem] xl:pt-[5.875rem]">
        <dl className="grid grid-cols-2 border-y border-line md:grid-cols-4 md:py-10">
          {TESTIMONIAL_STATS.map((stat, index) => (
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

      {featured ? (
        <Section spaced={false} className="pt-[3.625rem] md:pt-[4.625rem] xl:pt-[5.875rem]">
          <figure className="flex max-w-[56rem] flex-col gap-7">
            <blockquote className="font-serif text-[1.625rem] leading-[1.3] tracking-[-0.01em] md:text-[2.5rem] md:leading-[1.25]">
              “{featured.text}”
            </blockquote>
            <figcaption className="flex items-center gap-3.5">
              <Avatar photo={featured.photo} alt={featured.name} className="size-11 rounded-full border border-line" sizes="44px" />
              <span className="flex flex-col">
                <span className="font-bold">{featured.name}</span>
                <span className="text-sm text-muted">{featured.meta}</span>
              </span>
            </figcaption>
          </figure>
        </Section>
      ) : null}

      {/* A little less space above and below the videos than the standard gap. */}
      <Section spaced={false} className="pt-[5rem] md:pt-[6.25rem] xl:pt-[8rem]">
        <VideoCarousel ids={STORIES_PAGE_VIDEO_IDS} heading={<SectionHeading eyebrow="Video stories" title="Hear it from our students" />} />
      </Section>

      <Section spaced={false} className="flex flex-col gap-10 pt-[5rem] md:pt-[6.25rem] lg:gap-12 xl:pt-[8rem]">
        <SectionHeading eyebrow="From parents" title="What families tell us" />
        <QuoteCards quotes={quotes} />
      </Section>

      <CtaSection />
    </>
  );
}
