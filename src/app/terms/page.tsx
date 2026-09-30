import type { Metadata } from 'next';
import { LegalPage } from '@/components/ui/LegalPage';
import { TERMS_SECTIONS } from '@/content/legal';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Terms & conditions',
  description:
    'The terms that apply to EduSolve’s website and one-on-one online tuition services.',
  path: '/terms/',
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & conditions"
      intro="The terms that apply when you use our website and tuition services."
      sections={TERMS_SECTIONS}
      updated="[Date]"
    />
  );
}
