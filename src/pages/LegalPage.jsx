import { CONTACT } from '../data/site';

// Shared layout for the Privacy Policy and Terms & Conditions pages — both are
// a titled hero, a placeholder notice, numbered sections, and a contact line.
export default function LegalPage({ title, sections }) {
  return (
    <>
      <section
        className="px-6 pt-14 pb-10"
        style={{
          background:
            'radial-gradient(900px 420px at 90% -10%, rgba(167,201,87,.20), transparent 60%), #ffffff',
        }}
      >
        <div className="max-w-[820px] mx-auto">
          <h1 className="font-heading font-extrabold text-3xl sm:text-[44px] leading-[1.12] tracking-[-0.02em] mb-3">
            {title}
          </h1>
          <p className="text-[15px] text-muted">
            Last updated: [DATE] · This is placeholder text — please have it reviewed by a legal
            professional before publishing.
          </p>
        </div>
      </section>

      <section className="px-6 pt-5 pb-[76px] bg-white">
        <div className="max-w-[820px] mx-auto">
          <div className="bg-[#fef7e6] border border-[#f5d98a] rounded-2xl px-5 py-4 mb-9 text-[14.5px] leading-relaxed text-[#7a5a15]">
            ⚠️ <strong>Placeholder notice:</strong> The text below is a general template to be
            edited. It is not legal advice — replace the bracketed fields and confirm compliance
            with applicable laws before going live.
          </div>

          {sections.map((section) => (
            <div key={section.h} className="mb-8">
              <h2 className="font-heading font-bold text-[22px] mb-3 text-brand-ink">{section.h}</h2>
              {section.body.map((paragraph, i) => (
                <p key={i} className="text-base leading-[1.75] text-body mb-3">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          <div className="border-t border-[#eceee9] pt-6 text-[15.5px] leading-[1.7] text-body">
            Questions?{' '}
            <a href={CONTACT.emailHref} className="font-semibold no-underline text-brand-red">
              {CONTACT.email}
            </a>{' '}
            or on{' '}
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold no-underline text-brand-red"
            >
              WhatsApp
            </a>
            .
          </div>
        </div>
      </section>
    </>
  );
}
