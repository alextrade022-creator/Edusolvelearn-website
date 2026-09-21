import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/ui/PageHero';
import { CheckIcon, WhatsAppIcon, PhoneIcon, MailIcon, PinIcon } from '../components/icons';
import { CONTACT } from '../data/site';
import { CONTACT_FORM_OPTIONS } from '../data/content';

const EMPTY_FORM = {
  name: '',
  phone: '',
  country: '',
  grade: '',
  curriculum: '',
  subject: '',
  time: '',
  notes: '',
};

const inputClass =
  'w-full box-border border-[1.5px] border-[#e2e5df] rounded-xl px-[15px] py-[13px] font-sans text-[15.5px] text-brand-ink bg-white outline-none transition-colors focus:border-brand-green';
const labelClass = 'block font-heading font-semibold text-[13.5px] text-[#2c3338] mb-[7px]';

// Contact cards on the right-hand side, kept as data to avoid repetition.
const CONTACT_CARDS = [
  { key: 'wa', href: CONTACT.whatsappUrl, external: true, Icon: WhatsAppIcon, iconBg: 'bg-whatsapp', title: 'WhatsApp', value: CONTACT.phone },
  { key: 'call', href: CONTACT.phoneHref, external: false, Icon: PhoneIcon, iconBg: 'bg-brand-red', title: 'Call us', value: CONTACT.phone },
  { key: 'mail', href: CONTACT.emailHref, external: false, Icon: MailIcon, iconBg: 'bg-brand-ink', title: 'Email', value: CONTACT.email },
  { key: 'loc', href: null, external: false, Icon: PinIcon, iconBg: 'bg-brand-green', iconColor: 'text-brand-ink', title: 'Based in', value: CONTACT.location },
];

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const update = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.country) {
      setError(true);
      return;
    }
    // No backend in this rebuild — the original simply showed a thank-you state.
    setSubmitted(true);
  };

  return (
    <>
      <PageHero badge="Book a free demo" title="Let's find the right tutor for your child">
        Fill in a few details and we’ll arrange a free one-on-one demo class. Prefer to chat? Reach
        us on WhatsApp anytime.
      </PageHero>

      <section className="px-6 pt-5 pb-20 bg-white">
        <div className="max-w-[1120px] mx-auto grid gap-9 min-[900px]:gap-12 grid-cols-1 min-[900px]:grid-cols-[1.05fr_0.95fr] items-start">
          {/* Form card */}
          <div className="bg-white border border-[#eceee9] rounded-3xl px-8 py-[34px] shadow-[0_10px_34px_rgba(22,26,29,.07)]">
            {submitted ? (
              <div className="text-center px-2.5 py-[30px]">
                <div className="w-[72px] h-[72px] rounded-full bg-surface-leaf flex items-center justify-center mx-auto mb-5 text-brand-green-dark">
                  <CheckIcon size={38} />
                </div>
                <h2 className="font-heading font-extrabold text-[26px] mb-3">Thank you! 🎉</h2>
                <p className="text-base leading-relaxed text-body mb-6 max-w-[380px] mx-auto">
                  We’ve received your request and will reach out on WhatsApp shortly to schedule your
                  child’s free demo class.
                </p>
                <a
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-brand-green text-brand-ink text-[15px] px-6 py-3.5"
                >
                  Message us now on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="font-heading font-extrabold text-[23px] mb-[22px]">
                  Book your free demo class
                </h2>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className={labelClass} htmlFor="name">
                      Parent / Student Name *
                    </label>
                    <input
                      id="name"
                      className={inputClass}
                      type="text"
                      value={form.name}
                      onChange={update('name')}
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="grid gap-4 grid-cols-1 min-[520px]:grid-cols-2">
                    <div>
                      <label className={labelClass} htmlFor="phone">
                        WhatsApp Number *
                      </label>
                      <input
                        id="phone"
                        className={inputClass}
                        type="tel"
                        value={form.phone}
                        onChange={update('phone')}
                        placeholder="+971 5X XXX XXXX"
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="country">
                        Country *
                      </label>
                      <select id="country" className={inputClass} value={form.country} onChange={update('country')}>
                        {CONTACT_FORM_OPTIONS.countries.map((c) => (
                          <option key={c} value={c === 'Select country' ? '' : c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 grid-cols-1 min-[520px]:grid-cols-2">
                    <div>
                      <label className={labelClass} htmlFor="grade">
                        Grade / Class *
                      </label>
                      <select id="grade" className={inputClass} value={form.grade} onChange={update('grade')}>
                        {CONTACT_FORM_OPTIONS.grades.map((g) => (
                          <option key={g} value={g === 'Select grade' ? '' : g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="curriculum">
                        Curriculum *
                      </label>
                      <select id="curriculum" className={inputClass} value={form.curriculum} onChange={update('curriculum')}>
                        {CONTACT_FORM_OPTIONS.curricula.map((c) => (
                          <option key={c} value={c === 'Select curriculum' ? '' : c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 grid-cols-1 min-[520px]:grid-cols-2">
                    <div>
                      <label className={labelClass} htmlFor="subject">
                        Subject(s) needed
                      </label>
                      <input
                        id="subject"
                        className={inputClass}
                        type="text"
                        value={form.subject}
                        onChange={update('subject')}
                        placeholder="e.g. Maths, Physics"
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="time">
                        Preferred Time
                      </label>
                      <select id="time" className={inputClass} value={form.time} onChange={update('time')}>
                        {CONTACT_FORM_OPTIONS.times.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="notes">
                      Anything else we should know?
                    </label>
                    <textarea
                      id="notes"
                      className={`${inputClass} resize-y`}
                      rows="3"
                      value={form.notes}
                      onChange={update('notes')}
                      placeholder="Tell us about your child's goals or any specific needs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-red text-white border-none cursor-pointer font-heading font-bold text-[16.5px] py-4 rounded-xl shadow-[0_10px_24px_rgba(210,3,33,.28)] transition-transform hover:-translate-y-0.5"
                  >
                    Request My Free Demo
                  </button>

                  {error && (
                    <div className="text-sm text-brand-red font-semibold text-center">
                      Please fill in your name, WhatsApp number and country.
                    </div>
                  )}

                  <p className="text-[12.5px] text-muted text-center leading-normal">
                    By submitting, you agree to be contacted about your demo. We respect your privacy
                    — see our{' '}
                    <Link to="/privacy" className="font-semibold no-underline text-brand-red">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Contact side */}
          <div>
            <h2 className="font-heading font-extrabold text-[23px] mb-[18px]">Or reach us directly</h2>
            <div className="grid gap-4 grid-cols-1 min-[520px]:grid-cols-2 mb-[26px]">
              {CONTACT_CARDS.map((card) => {
                const inner = (
                  <>
                    <div
                      className={`w-11 h-11 rounded-xl ${card.iconBg} ${card.iconColor ?? 'text-white'} flex items-center justify-center mb-3`}
                    >
                      <card.Icon size={22} />
                    </div>
                    <div className="font-heading font-bold text-[15px] text-brand-ink">{card.title}</div>
                    <div className="text-[13.5px] text-body mt-0.5">{card.value}</div>
                  </>
                );
                const cardClass =
                  'bg-surface-mint border border-[#e6e9df] rounded-2xl px-5 py-[22px] block transition-colors hover:border-brand-green no-underline';
                return card.href ? (
                  <a
                    key={card.key}
                    href={card.href}
                    {...(card.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={cardClass}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={card.key} className={cardClass}>
                    {inner}
                  </div>
                );
              })}
            </div>

            <div className="bg-brand-ink rounded-[18px] px-6 py-[26px] text-white">
              <h3 className="font-heading font-bold text-[17px] mb-3">Class timings</h3>
              <p className="text-[14.5px] leading-relaxed text-[#c6cbce] mb-3.5">
                We schedule around Gulf time zones with flexible evening and weekend slots to suit
                your family.
              </p>
              <div className="flex items-center gap-2.5 text-sm text-brand-green font-semibold">
                <span className="w-2 h-2 rounded-full bg-brand-green inline-block" />
                Typically replies within a few hours
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
