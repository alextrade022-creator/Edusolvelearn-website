import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { AppSection, BlogPreviewSection, HomeFaqSection, StoriesSection } from '@/components/home/MoreSections';
import {
  CentresSection,
  CurriculaSection,
  FounderSection,
  HowItWorksSection,
  LifePreviewSection,
  TutorsSection,
  WhySection,
} from '@/components/home/Sections';
import { StatsBand } from '@/components/home/StatsBand';
import { CtaSection } from '@/components/ui/CtaSection';
import { pageMetadata } from '@/lib/seo';

const HOME_TITLE = 'EduSolve — One-on-One Online Tuition for Gulf Families';

export const metadata: Metadata = {
  ...pageMetadata({
    title: HOME_TITLE,
    description:
      'Warm, one-on-one online tuition for Gulf-based Indian families across CBSE, ICSE, IGCSE, IB and American curricula, LKG to Grade 12. Book a free demo class.',
    path: '/',
  }),
  title: { absolute: HOME_TITLE },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <CurriculaSection />
      <HowItWorksSection />
      <WhySection />
      <TutorsSection />
      <FounderSection />
      <CentresSection />
      <LifePreviewSection />
      <StoriesSection />
      <AppSection />
      <BlogPreviewSection />
      <HomeFaqSection />
      <CtaSection />
    </>
  );
}
