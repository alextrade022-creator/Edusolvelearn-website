import { Link } from 'react-router-dom';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import CtaSection from '../components/ui/CtaSection';
import { toneClass } from '../data/tones';
import { COURSES_CURRICULA, COURSES_LEVELS, SUBJECTS, COURSES_COUNTRIES } from '../data/content';

export default function Courses() {
  return (
    <>
      <PageHero badge="Courses & Curricula" title="Every major curriculum, taught one-on-one">
        Whichever board your child’s school follows, we match them with a tutor who teaches it every
        day — from the early years right through to Grade 12 board exams.
      </PageHero>

      {/* Curriculum cards */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-[1160px] mx-auto">
          <div className="grid gap-[26px] grid-cols-1 min-[900px]:grid-cols-2">
            {COURSES_CURRICULA.map((c) => (
              <div
                key={c.name}
                className="border border-[#eceee9] rounded-[22px] px-[30px] py-8 bg-white shadow-[0_2px_12px_rgba(22,26,29,.05)] transition-transform duration-200 hover:-translate-y-1.5 hover:shadow-card-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-[60px] h-[60px] flex-none rounded-[15px] flex items-center justify-center font-heading font-extrabold text-[17px] ${toneClass(c.tone)}`}
                  >
                    {c.abbr}
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-[22px] mb-0.5">{c.name}</h3>
                    <div className="text-[13.5px] text-brand-green-dark font-bold">{c.grades}</div>
                  </div>
                </div>
                <p className="text-[15.5px] leading-relaxed text-body mb-4">{c.text}</p>
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[12.5px] font-semibold text-brand-ink bg-[#f2f3f0] px-3 py-1.5 rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grade levels */}
      <section className="px-6 py-[70px] bg-surface-mint">
        <div className="max-w-[1100px] mx-auto">
          <SectionHeading
            eyebrow="Grade levels"
            title="Support at every stage, LKG to Grade 12"
            size="md"
            className="mb-11"
          />
          <div className="grid gap-[22px] grid-cols-1 min-[900px]:grid-cols-3">
            {COURSES_LEVELS.map((level) => (
              <div key={level.title} className="bg-white rounded-[20px] px-[26px] py-7 shadow-card">
                <div className="font-heading font-extrabold text-[15px] text-brand-red tracking-[0.03em] mb-1.5">
                  {level.range}
                </div>
                <h3 className="font-heading font-bold text-[19px] mb-2.5">{level.title}</h3>
                <p className="text-[14.5px] leading-relaxed text-body">{level.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="px-6 py-[70px] bg-white">
        <div className="max-w-[1000px] mx-auto text-center">
          <SectionHeading eyebrow="Subjects" title="Subjects we tutor" className="mb-7" />
          <div className="flex flex-wrap gap-3 justify-center">
            {SUBJECTS.map((subject) => (
              <span
                key={subject}
                className="bg-surface-mint border border-[#e6e9df] rounded-full px-5 py-3 text-[15px] font-semibold transition-colors hover:border-brand-green hover:text-brand-green-dark"
              >
                {subject}
              </span>
            ))}
          </div>
          <p className="mt-8 text-[15px] text-body">
            Don’t see a subject?{' '}
            <Link to="/contact" className="font-bold no-underline text-brand-red">
              Ask us →
            </Link>{' '}
            — chances are we have a specialist for it.
          </p>
        </div>
      </section>

      {/* Countries */}
      <section className="px-6 py-[70px] bg-brand-ink">
        <div className="max-w-[1000px] mx-auto text-center">
          <SectionHeading
            eyebrow="Where we teach"
            title="Serving Indian families across the Gulf"
            subtitle="Timings tuned to your time zone, so classes fit neatly around school and family life."
            light
            size="md"
            className="mb-9"
          />
          <div className="grid gap-4 grid-cols-2 min-[600px]:grid-cols-3 min-[900px]:grid-cols-6">
            {COURSES_COUNTRIES.map((country) => (
              <div
                key={country.name}
                className="bg-white/[.06] border border-white/10 rounded-2xl px-3 py-[22px]"
              >
                <div className="text-[30px] mb-2">{country.flag}</div>
                <div className="text-[14.5px] font-bold text-white">{country.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Find the right tutor for your child's board"
        subtitle="Tell us the curriculum and grade — we’ll arrange a free demo with a specialist."
      />
    </>
  );
}
