import type { Metadata } from 'next';
import { TeachForm } from '@/components/forms/TeachForm';
import { PageHero } from '@/components/ui/PageHero';
import { TUTOR_SELECTION_STAGES } from '@/content/pages';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Teach with us',
  description:
    'Apply to teach one-on-one online with EduSolve. Tell us about your subjects, qualification and English proficiency.',
  path: '/teach/',
});

export default function TeachPage() {
  return (
    <>
      <PageHero
        eyebrow="Teach with us"
        title="Help students thrive, one lesson at a time"
        intro="Tell us a little about yourself and the subjects you love to teach. We’ll be in touch if there is a suitable opportunity."
      />
      <section className="pt-10 pb-24 md:pt-14 md:pb-32">
        <div className="container-site grid items-start gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <TeachForm />
          </div>
          <aside className="flex flex-col gap-5 rounded-panel border border-line bg-panel p-6 md:p-8 lg:col-span-4 lg:col-start-9" aria-labelledby="after-title">
            <h2 id="after-title" className="font-serif text-[1.5rem] font-medium">What happens next</h2>
            <ol className="flex flex-col gap-4">
              {TUTOR_SELECTION_STAGES.map((stage, index) => (
                <li key={stage.title} className="flex gap-3">
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-[0.8125rem] font-bold">{index + 1}</span>
                  <span className="flex flex-col gap-0.5">
                    <span className="font-bold">{stage.title}</span>
                    <span className="text-[0.9375rem] leading-relaxed text-body">{stage.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>
    </>
  );
}
