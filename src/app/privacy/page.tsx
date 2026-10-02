import type { Metadata } from 'next';
import { LegalPage } from '@/components/ui/LegalPage';
import { PRIVACY_SECTIONS } from '@/content/legal';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy policy',
  description:
    'How EduSolve collects, uses and protects the personal information of families and students.',
  path: '/privacy/',
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro="How we collect, use and protect your family’s information."
      sections={PRIVACY_SECTIONS}
      updated="2 October 2026"
    />
  );
}
