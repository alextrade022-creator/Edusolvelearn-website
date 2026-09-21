import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import VideoEmbed from '../components/ui/VideoEmbed';
import CtaSection from '../components/ui/CtaSection';
import { toneClass } from '../data/tones';
import {
  TESTIMONIAL_VIDEO_IDS,
  TESTIMONIAL_STATS,
  TESTIMONIAL_QUOTES,
} from '../data/content';

export default function Testimonials() {
  return (
    <>
      <PageHero badge="Success stories" title="Real students. Real results.">
        The best measure of our teaching is the confidence on a child’s face. Hear it straight from
        EduSolve students and the families who trust us.
      </PageHero>

      {/* Video testimonials */}
      <section className="px-6 py-14 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading
            eyebrow="Watch their stories"
            title="Video testimonials"
            size="md"
            className="mb-10"
            maxWidth="max-w-xl"
          />
          <div className="grid gap-5 grid-cols-2 min-[900px]:grid-cols-5">
            {TESTIMONIAL_VIDEO_IDS.map((id) => (
              <VideoEmbed key={id} id={id} />
            ))}
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <section className="px-6 pt-5 pb-[60px] bg-white">
        <div className="max-w-[1000px] mx-auto bg-brand-ink rounded-3xl px-8 py-11 grid gap-6 grid-cols-2 min-[900px]:grid-cols-4">
          {TESTIMONIAL_STATS.map((stat) => (
            <div key={stat.label} className="text-center text-white">
              <div className="font-heading font-extrabold text-[38px] leading-none text-brand-green">
                {stat.value}
              </div>
              <div className="text-sm text-[#c6cbce] mt-2 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Written quotes */}
      <section className="px-6 py-[70px] bg-surface-mint">
        <div className="max-w-[1160px] mx-auto">
          <SectionHeading
            eyebrow="What parents say"
            title="Words from families across the Gulf"
            size="md"
            className="mb-11"
            maxWidth="max-w-xl"
          />
          <div className="grid gap-6 grid-cols-1 min-[900px]:grid-cols-3">
            {TESTIMONIAL_QUOTES.map((quote) => (
              <div
                key={quote.name + quote.meta}
                className="bg-white rounded-[20px] px-7 py-[30px] shadow-[0_2px_12px_rgba(22,26,29,.05)] flex flex-col"
              >
                <div className="text-[#f5a623] text-base tracking-[2px] mb-3.5">★★★★★</div>
                <p className="text-[15.5px] leading-[1.7] text-[#2c3338] mb-5 flex-1">“{quote.text}”</p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-[46px] h-[46px] rounded-full flex-none flex items-center justify-center font-heading font-extrabold text-[17px] ${toneClass(quote.tone)}`}
                  >
                    {quote.initial}
                  </div>
                  <div>
                    <div className="font-heading font-bold text-[15px]">{quote.name}</div>
                    <div className="text-[13px] text-body">{quote.meta}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Your child's success story starts here"
        subtitle="Book a free demo class and see the difference one-on-one makes."
      />
    </>
  );
}
