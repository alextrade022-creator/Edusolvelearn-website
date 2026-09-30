import type { LegalSection } from '@/content/legal';
import { PageHero } from './PageHero';

// Long-form reading layout for the Privacy and Terms pages.
export function LegalPage({ title, intro, sections, updated }: { title: string; intro: string; sections: readonly LegalSection[]; updated: string }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} intro={intro} />
      <section className="pt-10 pb-24 md:pt-14 md:pb-32">
        <div className="container-site">
          <article className="mx-auto flex max-w-[45rem] flex-col gap-9 border-t border-line pt-10">
            <p className="text-sm text-muted">Last updated: {updated}</p>
            {sections.map((section) => (
              <section key={section.heading} className="flex flex-col gap-3">
                <h2 className="font-serif text-[1.5rem] leading-snug font-medium md:text-[1.75rem]">{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-[1.0625rem] leading-[1.75] text-body">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
