import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import CtaSection from '../components/ui/CtaSection';
import { HIW_STEPS, HIW_FEATURES, HIW_NEEDS } from '../data/content';

export default function HowItWorks() {
  return (
    <>
      <PageHero badge="How EduSolve works" title="From first hello to steady progress">
        Getting started is simple and pressure-free. Here’s exactly what happens from the moment you
        reach out — to the day you’re watching your child thrive.
      </PageHero>

      {/* Timeline */}
      <section className="px-6 pt-16 pb-10 bg-white">
        <div className="max-w-[860px] mx-auto relative">
          {/* Vertical rail (desktop only) */}
          <div className="hidden min-[760px]:block absolute left-8 top-5 bottom-5 w-[3px] bg-[#eceee9] rounded-sm overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full h-0 bg-gradient-to-b from-brand-green to-brand-red"
              style={{ animation: 'es-fill 2.4s ease-out .2s forwards' }}
            />
          </div>

          <div className="flex flex-col gap-[38px] relative">
            {HIW_STEPS.map((step) => (
              <div
                key={step.n}
                className="grid gap-4 min-[760px]:gap-[34px] grid-cols-1 min-[760px]:grid-cols-[auto_1fr]"
              >
                <div className="w-[66px] h-[66px] flex-none rounded-full flex items-center justify-center font-heading font-extrabold text-2xl bg-brand-red text-white shadow-[0_10px_22px_rgba(210,3,33,.28)] relative z-[1]">
                  {step.n}
                </div>
                <div className="bg-white border border-[#eceee9] rounded-[20px] px-7 py-[26px] shadow-[0_2px_12px_rgba(22,26,29,.05)]">
                  <div className="flex items-center gap-3 mb-2.5 flex-wrap">
                    <div className="w-10 h-10 rounded-xl bg-surface-leaf flex items-center justify-center text-xl">
                      {step.icon}
                    </div>
                    <h3 className="font-heading font-extrabold text-[22px]">{step.title}</h3>
                    <span className="text-[12.5px] font-bold text-brand-green-dark bg-surface-leaf px-2.5 py-1 rounded-full">
                      {step.time}
                    </span>
                  </div>
                  <p className="text-base leading-[1.7] text-body">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What makes a class work */}
      <section className="px-6 py-[70px] bg-surface-mint">
        <div className="max-w-[1100px] mx-auto">
          <SectionHeading
            eyebrow="Inside every class"
            title="What makes an EduSolve class work"
            size="md"
            className="mb-11"
          />
          <div className="grid gap-[22px] grid-cols-1 min-[760px]:grid-cols-3">
            {HIW_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-[18px] px-6 py-[26px] shadow-card"
              >
                <div className="w-[46px] h-[46px] rounded-xl bg-surface-blush flex items-center justify-center text-[22px] mb-3.5">
                  {feature.icon}
                </div>
                <h3 className="font-heading font-bold text-[17px] mb-2">{feature.title}</h3>
                <p className="text-[14.5px] leading-relaxed text-body">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you need */}
      <section className="px-6 py-[70px] bg-white">
        <div className="max-w-[900px] mx-auto text-center">
          <SectionHeading
            eyebrow="Simple setup"
            title="All your child needs to start"
            size="md"
            className="mb-7"
          />
          <div className="flex flex-wrap gap-3.5 justify-center">
            {HIW_NEEDS.map((need) => (
              <span
                key={need.label}
                className="inline-flex items-center gap-2.5 bg-surface-mint border border-[#e6e9df] rounded-full px-5 py-3 text-[15px] font-semibold"
              >
                <span className="text-lg">{need.icon}</span>
                {need.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Ready for step one?"
        subtitle="Book a free demo and watch your child’s first one-on-one class."
      />
    </>
  );
}
