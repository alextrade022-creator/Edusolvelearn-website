import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import Eyebrow from '../components/ui/Eyebrow';
import CtaSection from '../components/ui/CtaSection';
import AccordionItem from '../components/ui/AccordionItem';
import ImagePlaceholder from '../components/ui/ImagePlaceholder';
import VideoEmbed from '../components/ui/VideoEmbed';
import { WhatsAppIcon, CheckIcon } from '../components/icons';
import useCountUp from '../hooks/useCountUp';
import { toneClass } from '../data/tones';
import { CONTACT } from '../data/site';
import {
  HOME_STATS,
  HOME_CURRICULA,
  HOME_BENEFITS,
  HOME_STEPS,
  SUBJECTS,
  HOME_TUTORS,
  HOME_FAQS,
  CURRICULA_CHIPS,
  TESTIMONIAL_VIDEO_IDS,
} from '../data/content';

const formatIN = (n) => n.toLocaleString('en-IN');

export default function Home() {
  const [statsRef, statValues] = useCountUp(HOME_STATS.map((s) => s.target));
  const [openFaq, setOpenFaq] = useState(0);

  // The testimonial marquee needs a duplicated list to loop seamlessly.
  const marqueeVideos = [...TESTIMONIAL_VIDEO_IDS, ...TESTIMONIAL_VIDEO_IDS];

  return (
    <>
      {/* HERO */}
      <section
        className="relative px-6 pt-[74px] pb-[84px]"
        style={{
          background:
            'radial-gradient(1100px 480px at 88% -8%, rgba(167,201,87,.20), transparent 60%), #ffffff',
        }}
      >
        <div className="max-w-container mx-auto grid gap-9 min-[960px]:gap-14 grid-cols-1 min-[960px]:grid-cols-[1.05fr_0.95fr] items-center">
          <div>
            <div className="inline-flex items-center gap-2.5 bg-surface-leaf border border-brand-green/50 px-4 py-1.5 rounded-full text-[13.5px] font-bold text-[#5a6b2f] mb-[22px]">
              <span className="w-2 h-2 rounded-full bg-brand-green inline-block" />
              Live 3-on-3 online tuition · Trusted by Gulf families
            </div>
            <h1 className="font-heading font-extrabold text-[38px] sm:text-[52px] leading-[1.08] tracking-[-0.02em] mb-5">
              The personal tutor your child <span className="text-brand-red">deserves</span> — live,
              from home.
            </h1>
            <p className="text-[19px] leading-relaxed text-body max-w-[520px] mb-[30px]">
              One student, one teacher, full attention. EduSolve connects Gulf-based Indian families
              with hand-picked tutors across <strong>CBSE, ICSE, IGCSE, IB &amp; American</strong>{' '}
              curricula — LKG to Grade 12.
            </p>
            <div className="flex flex-wrap gap-3.5 mb-[30px]">
              <Button to="/contact" size="lg">
                Book a Free Demo Class
              </Button>
              <Button href={CONTACT.whatsappUrl} variant="outline" size="lg" className="text-brand-green-dark">
                <WhatsAppIcon size={20} className="text-brand-green-dark" />
                <span className="text-brand-ink">Chat on WhatsApp</span>
              </Button>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="text-[#f5a623] text-lg tracking-[2px]">★★★★★</span>
                <span className="text-[14.5px] text-body font-semibold">Loved by 1000s of parents</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {CURRICULA_CHIPS.map((chip) => (
                  <span
                    key={chip}
                    className="text-[12.5px] font-bold text-brand-ink bg-[#f2f3f0] px-2.5 py-1.5 rounded-lg"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-[26px] overflow-hidden shadow-[0_30px_60px_rgba(22,26,29,.16)] aspect-[4/5] bg-[#eef0ec]">
              <ImagePlaceholder label="Hero photo — student learning online / happy tutor" />
            </div>
          </div>
        </div>
      </section>

      {/* STAT STRIP */}
      <section ref={statsRef} className="bg-brand-ink px-6 py-[52px]">
        <div className="max-w-container mx-auto grid gap-6 grid-cols-2 min-[600px]:grid-cols-4">
          {HOME_STATS.map((stat, i) => (
            <div key={stat.key} className="text-center text-white">
              <div className="font-heading font-extrabold text-[44px] leading-none text-brand-green">
                {formatIN(statValues[i])}
                {stat.suffix}
              </div>
              <div className="text-[15px] text-[#c6cbce] mt-2.5 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CURRICULA */}
      <section className="px-6 py-[88px] bg-white">
        <div className="max-w-container mx-auto">
          <SectionHeading
            eyebrow="Curricula we cover"
            title="Every major curriculum, one trusted tutor"
            subtitle="Whichever board your child follows, we match them with a specialist who teaches it every day."
            className="mb-11"
          />
          <div className="grid gap-5 grid-cols-1 min-[600px]:grid-cols-2 min-[960px]:grid-cols-5">
            {HOME_CURRICULA.map((c) => (
              <div
                key={c.name}
                className="border border-[#eceee9] rounded-[18px] px-[22px] py-[26px] text-center bg-white transition-all duration-200 hover:-translate-y-1.5 hover:shadow-card-lg"
              >
                <div
                  className={`w-14 h-14 rounded-[14px] mx-auto mb-4 flex items-center justify-center font-heading font-extrabold text-[17px] ${toneClass(c.tone)}`}
                >
                  {c.abbr}
                </div>
                <div className="font-heading font-bold text-[17px] mb-1.5">{c.name}</div>
                <div className="text-[13.5px] text-body leading-normal">{c.note}</div>
              </div>
            ))}
          </div>
          <p className="text-center mt-[34px] text-[15px] text-body">
            Serving families across the UAE, Qatar, Saudi Arabia, Bahrain, Kuwait &amp; Oman.{' '}
            <Link to="/courses" className="font-bold no-underline text-brand-red">
              See all courses →
            </Link>
          </p>
        </div>
      </section>

      {/* WHY EDUSOLVE */}
      <section className="px-6 py-[88px] bg-surface-mint">
        <div className="max-w-container mx-auto">
          <SectionHeading
            eyebrow="Why one-to-one · Why EduSolve"
            title="A classroom of one is a world of difference"
            className="mb-11"
          />
          <div className="grid gap-[22px] grid-cols-1 min-[600px]:grid-cols-2 min-[960px]:grid-cols-3">
            {HOME_BENEFITS.map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-[18px] px-6 py-7 shadow-card">
                <div className="w-11 h-11 rounded-xl bg-surface-leaf flex items-center justify-center mb-4 text-brand-green-dark">
                  <CheckIcon size={24} />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-[15px] leading-relaxed text-body">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-[88px] bg-white">
        <div className="max-w-container mx-auto">
          <SectionHeading
            eyebrow="How it works"
            title="From first hello to steady progress — in four simple steps"
            className="mb-12"
          />
          <div className="grid gap-[18px] grid-cols-1 min-[600px]:grid-cols-2 min-[960px]:grid-cols-4 relative">
            {/* Animated connector line (desktop only) */}
            <div className="hidden min-[960px]:block absolute top-[33px] left-[12.5%] right-[12.5%] h-[3px] z-0 pointer-events-none">
              <div
                className="absolute inset-0 rounded-sm opacity-[.65]"
                style={{
                  background:
                    'repeating-linear-gradient(90deg,#a7c957 0 11px,transparent 11px 22px)',
                  backgroundSize: '22px 3px',
                  animation: 'es-flow 1.1s linear infinite',
                }}
              />
              <div
                className="absolute top-1/2 left-0 w-[15px] h-[15px] rounded-full bg-brand-red -translate-x-1/2 -translate-y-1/2 shadow-[0_0_0_6px_rgba(210,3,33,.16)]"
                style={{ animation: 'es-travel 5.5s ease-in-out infinite' }}
              />
            </div>
            {HOME_STEPS.map((step) => (
              <div key={step.n} className="text-center px-2 relative z-[1]">
                <div className="w-[66px] h-[66px] rounded-full mx-auto mb-[18px] flex items-center justify-center font-heading font-extrabold text-2xl bg-brand-red text-white shadow-[0_10px_22px_rgba(210,3,33,.28)]">
                  {step.n}
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-[14.5px] leading-relaxed text-body">{step.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-[42px]">
            <Button to="/how-it-works" variant="dark">
              See the full process →
            </Button>
          </div>
        </div>
      </section>

      {/* SUBJECTS */}
      <section className="px-6 py-20 bg-surface-mint">
        <div className="max-w-[1100px] mx-auto text-center">
          <SectionHeading
            eyebrow="Subjects"
            title="Support in every subject that matters"
            className="mb-7"
          />
          <div className="flex flex-wrap gap-3 justify-center">
            {SUBJECTS.map((subject) => (
              <span
                key={subject}
                className="bg-white border border-[#e6e9df] rounded-full px-5 py-3 text-[15px] font-semibold transition-colors hover:border-brand-green hover:text-brand-green-dark"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TEACHERS PREVIEW */}
      <section className="px-6 py-[88px] bg-white">
        <div className="max-w-container mx-auto">
          <div className="flex justify-between items-end flex-wrap gap-4 mb-10">
            <div className="max-w-[560px]">
              <Eyebrow>Our teachers</Eyebrow>
              <h2 className="section-title text-3xl sm:text-[38px]">
                Hand-picked, vetted, and genuinely caring
              </h2>
            </div>
            <Link to="/teachers" className="font-heading font-bold text-[15px] no-underline text-brand-red whitespace-nowrap">
              Meet our teachers →
            </Link>
          </div>
          <div className="grid gap-6 grid-cols-1 min-[960px]:grid-cols-3">
            {HOME_TUTORS.map((tutor, i) => (
              <div
                key={i}
                className="border border-[#eceee9] rounded-[20px] overflow-hidden bg-white shadow-card"
              >
                <div className="aspect-[4/3] bg-[#eef0ec]">
                  <ImagePlaceholder label="Tutor photo" />
                </div>
                <div className="px-[22px] py-5">
                  <div className="flex items-center justify-between gap-2.5 mb-1">
                    <h3 className="font-heading font-bold text-lg">{tutor.name}</h3>
                    <span className="text-[13px] font-bold text-[#f5a623]">★ {tutor.rating}</span>
                  </div>
                  <div className="text-sm text-brand-green-dark font-bold mb-2">{tutor.subject}</div>
                  <p className="text-sm leading-snug text-body">{tutor.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER MESSAGE */}
      <section className="px-6 bg-brand-ink">
        <div className="max-w-container mx-auto grid gap-9 min-[960px]:gap-12 grid-cols-1 min-[960px]:grid-cols-2 items-center">
          <div className="py-[70px]">
            <Eyebrow className="!mb-[18px]">A message from our founder</Eyebrow>
            <p className="font-heading font-semibold text-[25px] leading-[1.45] text-white mb-6">
              “We started EduSolve because every parent overseas deserves to know their child is
              truly cared for. Not a crowded class — one teacher who knows your child by name.”
            </p>
            <div className="text-white">
              <div className="font-heading font-bold text-[17px]">Munavar Ali</div>
              <div className="text-sm text-brand-green">Founder &amp; CEO, EduSolve</div>
            </div>
            <Button to="/about" variant="light-outline" className="mt-7 border-white/[.28]">
              Read our story →
            </Button>
          </div>
          <div className="self-stretch min-h-[420px] relative">
            <img
              src="/images/founder-munavar-ali.jpg"
              alt="Munavar Ali, Founder & CEO of EduSolve"
              className="absolute inset-0 w-full h-full object-cover object-[center_22%]"
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS MARQUEE */}
      <section className="py-[88px] bg-white overflow-hidden">
        <div className="max-w-container mx-auto px-6 text-center mb-11">
          <SectionHeading
            eyebrow="Student stories"
            title="Hear it straight from our students"
            subtitle="Real students, real results — a few of our favourite moments."
          />
        </div>
        <div className="group w-full">
          <div className="flex gap-5 w-max px-2.5 animate-marquee group-hover:[animation-play-state:paused]">
            {marqueeVideos.map((id, i) => (
              <div key={`${id}-${i}`} className="w-[224px] flex-none">
                <VideoEmbed id={id} />
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-11">
          <Button to="/testimonials" variant="dark">
            See all success stories →
          </Button>
        </div>
      </section>

      {/* FAQ PREVIEW */}
      <section className="px-6 py-[88px] bg-surface-mint">
        <div className="max-w-[820px] mx-auto">
          <SectionHeading eyebrow="FAQ" title="Questions parents ask us" className="mb-10" />
          <div className="flex flex-col gap-3.5">
            {HOME_FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                question={faq.q}
                answer={faq.a}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq((prev) => (prev === i ? -1 : i))}
              />
            ))}
          </div>
          <p className="text-center mt-[34px] text-[15px] text-body">
            More questions?{' '}
            <Link to="/faq" className="font-bold no-underline text-brand-red">
              Visit our full FAQ →
            </Link>
          </p>
        </div>
      </section>

      <CtaSection
        title="Book your child's free demo class today"
        subtitle="No payment, no pressure — just meet a tutor and see the difference one-on-one makes."
      />
    </>
  );
}
