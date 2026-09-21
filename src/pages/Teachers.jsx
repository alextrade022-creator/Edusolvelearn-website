import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import CtaSection from '../components/ui/CtaSection';
import ImagePlaceholder from '../components/ui/ImagePlaceholder';
import Button from '../components/ui/Button';
import { TEACHERS_VETTING, TEACHERS_QUALITIES, TEACHERS_TUTORS } from '../data/content';

export default function Teachers() {
  return (
    <>
      <PageHero badge="Our teachers" title="The tutor makes all the difference">
        Great tuition is only as good as the person delivering it. That’s why every EduSolve tutor
        is carefully selected, thoroughly vetted, and chosen as much for their warmth as their
        subject mastery.
      </PageHero>

      {/* Vetting */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-[1160px] mx-auto">
          <SectionHeading
            eyebrow="How we select tutors"
            title="A rigorous 4-step vetting process"
            size="md"
            className="mb-11"
          />
          <div className="grid gap-5 grid-cols-1 min-[600px]:grid-cols-2 min-[900px]:grid-cols-4">
            {TEACHERS_VETTING.map((step) => (
              <div
                key={step.n}
                className="border border-[#eceee9] rounded-[18px] px-[22px] py-[26px] bg-white shadow-card"
              >
                <div className="w-11 h-11 rounded-[11px] bg-brand-red text-white flex items-center justify-center font-heading font-extrabold text-lg mb-3.5">
                  {step.n}
                </div>
                <h3 className="font-heading font-bold text-[17px] mb-2">{step.title}</h3>
                <p className="text-sm leading-relaxed text-body">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualities */}
      <section className="px-6 py-[70px] bg-surface-mint">
        <div className="max-w-[1100px] mx-auto">
          <SectionHeading
            eyebrow="What every tutor brings"
            title="Qualified minds, caring hearts"
            size="md"
            className="mb-11"
          />
          <div className="grid gap-[22px] grid-cols-1 min-[900px]:grid-cols-3">
            {TEACHERS_QUALITIES.map((quality) => (
              <div key={quality.title} className="bg-white rounded-[20px] px-7 py-[30px] shadow-card">
                <div className="w-[50px] h-[50px] rounded-[14px] bg-surface-leaf flex items-center justify-center text-2xl mb-4">
                  {quality.icon}
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{quality.title}</h3>
                <p className="text-[14.5px] leading-relaxed text-body">{quality.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tutor cards */}
      <section className="px-6 py-[70px] bg-white">
        <div className="max-w-[1160px] mx-auto">
          <SectionHeading
            eyebrow="Meet a few of our tutors"
            title="Familiar faces, exceptional teaching"
            subtitle="A snapshot of the team — drop in your real tutor photos and details anytime."
            size="md"
            className="mb-11"
          />
          <div className="grid gap-[26px] grid-cols-1 min-[600px]:grid-cols-2 min-[900px]:grid-cols-3">
            {TEACHERS_TUTORS.map((tutor, i) => (
              <div
                key={i}
                className="border border-[#eceee9] rounded-[20px] overflow-hidden bg-white shadow-card"
              >
                <div className="aspect-square bg-[#eef0ec]">
                  <ImagePlaceholder label="Tutor photo" />
                </div>
                <div className="px-6 py-[22px]">
                  <div className="flex items-center justify-between gap-2.5 mb-1">
                    <h3 className="font-heading font-bold text-lg">{tutor.name}</h3>
                    <span className="text-[13px] font-bold text-[#f5a623]">★ {tutor.rating}</span>
                  </div>
                  <div className="text-sm text-brand-green-dark font-bold mb-2.5">{tutor.subject}</div>
                  <p className="text-sm leading-relaxed text-body mb-3.5">{tutor.bio}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {tutor.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11.5px] font-semibold text-brand-ink bg-[#f2f3f0] px-2.5 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a tutor */}
      <section className="px-6 py-[70px] bg-brand-ink">
        <div className="max-w-[820px] mx-auto text-center text-white">
          <div className="eyebrow mb-3.5">Teach with us</div>
          <h2 className="section-title text-[28px] sm:text-[32px] text-white mb-3.5">
            Are you a passionate teacher?
          </h2>
          <p className="text-[17px] leading-relaxed text-[#c6cbce] max-w-[560px] mx-auto mb-7">
            We’re always looking for caring, expert tutors to join EduSolve. If you love teaching
            one-on-one and want flexible online hours, we’d love to hear from you.
          </p>
          <Button to="/contact" variant="green">
            Apply to teach →
          </Button>
        </div>
      </section>

      <CtaSection
        title="Meet your child's tutor in a free demo"
        subtitle="Experience the teaching before you decide — no payment, no pressure."
      />
    </>
  );
}
