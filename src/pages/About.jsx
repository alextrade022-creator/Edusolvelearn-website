import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import CtaSection from '../components/ui/CtaSection';
import ImagePlaceholder from '../components/ui/ImagePlaceholder';
import { ABOUT_TRUST, ABOUT_FOUNDERS } from '../data/content';
import founderPhoto from '/images/founder-munavar-ali.jpg';

export default function About() {
  return (
    <>
      <PageHero badge="About EduSolve" title="Built by teachers, for families far from home">
        EduSolve began in Kozhikode, Kerala with one belief — that distance should never decide the
        quality of a child’s education. Today we connect Gulf-based Indian families with tutors who
        teach one child at a time, with genuine care.
      </PageHero>

      {/* Story */}
      <section className="px-6 py-[70px] bg-white">
        <div className="max-w-container mx-auto grid gap-9 min-[960px]:gap-14 grid-cols-1 min-[960px]:grid-cols-2 items-center">
          <div className="rounded-3xl overflow-hidden shadow-[0_24px_50px_rgba(22,26,29,.14)] aspect-[4/3] bg-[#eef0ec]">
            <ImagePlaceholder label="Team / classroom / a student learning" />
          </div>
          <div>
            <SectionHeading
              eyebrow="Our story"
              title="A small idea in Kerala, now trusted across the Gulf"
              size="md"
              maxWidth="max-w-none"
              className="!text-left"
            />
            <p className="mt-4 text-[16.5px] leading-[1.7] text-body mb-4">
              We kept hearing the same worry from parents in the UAE, Qatar and Saudi Arabia:
              crowded online classes where their child was just another name on a screen. Homework
              unchecked. Doubts unanswered. Progress a mystery.
            </p>
            <p className="text-[16.5px] leading-[1.7] text-body">
              So we built the opposite — truly personal, one-on-one tuition, matched to each child’s
              board, subject and pace. No packed batches, no guesswork. Just a caring teacher who
              knows exactly where your child needs help.
            </p>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="px-6 py-[70px] bg-surface-mint">
        <div className="max-w-[1100px] mx-auto grid gap-6 grid-cols-1 min-[960px]:grid-cols-2">
          <div className="bg-white rounded-[20px] px-[34px] py-9 shadow-[0_2px_12px_rgba(22,26,29,.05)]">
            <div className="w-[52px] h-[52px] rounded-[14px] bg-surface-blush flex items-center justify-center text-2xl mb-[18px]">
              🎯
            </div>
            <h3 className="font-heading font-extrabold text-[23px] mb-3">Our Mission</h3>
            <p className="text-base leading-[1.7] text-body">
              To give every Gulf-based Indian child access to a caring, expert tutor — the kind of
              focused, one-on-one attention that turns anxiety into confidence and marks into
              mastery.
            </p>
          </div>
          <div className="bg-white rounded-[20px] px-[34px] py-9 shadow-[0_2px_12px_rgba(22,26,29,.05)]">
            <div className="w-[52px] h-[52px] rounded-[14px] bg-surface-leaf flex items-center justify-center text-2xl mb-[18px]">
              🌍
            </div>
            <h3 className="font-heading font-extrabold text-[23px] mb-3">Our Vision</h3>
            <p className="text-base leading-[1.7] text-body">
              To become the most trusted name in personalised online learning for expat families —
              where any parent, anywhere in the Gulf, knows their child is genuinely looked after.
            </p>
          </div>
        </div>
      </section>

      {/* Founder message */}
      <section className="px-6 bg-brand-ink">
        <div className="max-w-container mx-auto grid gap-9 min-[960px]:gap-14 grid-cols-1 min-[960px]:grid-cols-2 items-center">
          <div className="py-[70px]">
            <div className="eyebrow mb-[18px]">A message from our founder</div>
            <p className="font-heading font-semibold text-2xl leading-[1.5] text-white mb-6">
              “I’ve spoken to hundreds of parents raising children away from home. What they want
              isn’t complicated — someone who treats their child like their own. That’s the standard
              we hold every EduSolve tutor to.”
            </p>
            <div className="text-white">
              <div className="font-heading font-bold text-[17px]">Munavar Ali</div>
              <div className="text-sm text-brand-green">Founder &amp; CEO, EduSolve</div>
            </div>
          </div>
          <div className="self-stretch min-h-[440px] relative">
            <img
              src={founderPhoto}
              alt="Munavar Ali, Founder & CEO of EduSolve"
              className="absolute inset-0 w-full h-full object-cover object-[center_22%]"
            />
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <SectionHeading
            eyebrow="Why Gulf families trust EduSolve"
            title="Care you can feel, results you can see"
            size="md"
            className="mb-11"
          />
          <div className="grid gap-[22px] grid-cols-1 min-[600px]:grid-cols-2 min-[960px]:grid-cols-4">
            {ABOUT_TRUST.map((item) => (
              <div key={item.title} className="text-center px-2">
                <div className="w-14 h-14 rounded-2xl mx-auto mb-4 bg-surface-leaf flex items-center justify-center text-[26px]">
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-[17px] mb-2">{item.title}</h3>
                <p className="text-[14.5px] leading-relaxed text-body">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 py-20 bg-surface-mint">
        <div className="max-w-[1000px] mx-auto">
          <SectionHeading
            eyebrow="The team"
            title="The people behind EduSolve"
            size="md"
            className="mb-11"
          />
          <div className="grid gap-7 grid-cols-1 min-[960px]:grid-cols-2">
            {ABOUT_FOUNDERS.map((founder) => (
              <div
                key={founder.name}
                className="bg-white rounded-[22px] overflow-hidden shadow-[0_2px_12px_rgba(22,26,29,.06)] flex flex-col"
              >
                <div className="aspect-square bg-[#eef0ec] relative">
                  {founder.photo ? (
                    <img
                      src={founder.photo}
                      alt={`${founder.name}, ${founder.role} of EduSolve`}
                      className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
                    />
                  ) : (
                    <ImagePlaceholder label={`${founder.name}'s photo`} />
                  )}
                </div>
                <div className="px-[26px] py-6">
                  <h3 className="font-heading font-extrabold text-[21px] mb-1">{founder.name}</h3>
                  <div className="text-[14.5px] text-brand-green-dark font-bold mb-3">
                    {founder.role}
                  </div>
                  <p className="text-[15px] leading-relaxed text-body">{founder.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="See the EduSolve difference for yourself"
        subtitle="Meet a tutor in a free demo class — no payment, no pressure."
      />
    </>
  );
}
