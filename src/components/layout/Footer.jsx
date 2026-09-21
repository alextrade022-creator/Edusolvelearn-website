import { Link } from 'react-router-dom';
import { SOCIAL_ICONS } from '../icons';
import {
  CONTACT,
  FOOTER_LINKS,
  SOCIAL_LINKS,
  COUNTRIES_SERVED,
  FOOTER_TAGLINE,
} from '../../data/site';
import logo from '/images/edusolve-logo.png';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-brand-ink text-[#e7e9ea] font-sans">
      <div className="max-w-container mx-auto px-6 pt-[60px] pb-8">
        <div className="grid gap-11 grid-cols-1 min-[520px]:grid-cols-2 min-[860px]:grid-cols-[1.5fr_1fr_1.1fr_1fr]">
          {/* Brand + socials */}
          <div>
            <div className="inline-flex bg-white px-[18px] py-3.5 rounded-2xl mb-[18px]">
              <img src={logo} alt="EduSolve" className="h-[52px] w-auto block" />
            </div>
            <p className="mb-5 max-w-[280px] text-[15px] leading-relaxed text-[#aeb4b8]">
              {FOOTER_TAGLINE}
            </p>
            <div className="flex gap-2.5">
              {SOCIAL_LINKS.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/[.08] flex items-center justify-center text-white transition-colors hover:bg-brand-green hover:text-brand-ink"
                  >
                    <Icon size={19} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Explore links */}
          <div>
            <h3 className="font-heading text-sm font-bold tracking-[0.04em] uppercase text-brand-green mb-[18px]">
              Explore
            </h3>
            <div className="flex flex-col gap-[11px]">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-[#c6cbce] no-underline text-[15px] hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-sm font-bold tracking-[0.04em] uppercase text-brand-green mb-[18px]">
              Get in Touch
            </h3>
            <div className="flex flex-col gap-3 text-[15px] text-[#c6cbce]">
              <a href={CONTACT.phoneHref} className="text-[#c6cbce] no-underline hover:text-white">
                📞 {CONTACT.phone}
              </a>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[#c6cbce] no-underline hover:text-white">
                💬 WhatsApp us
              </a>
              <a href={CONTACT.emailHref} className="text-[#c6cbce] no-underline hover:text-white">
                ✉️ {CONTACT.email}
              </a>
              <span className="text-[#8b9298] leading-normal">{CONTACT.location}</span>
            </div>
          </div>

          {/* Countries */}
          <div>
            <h3 className="font-heading text-sm font-bold tracking-[0.04em] uppercase text-brand-green mb-[18px]">
              Countries Served
            </h3>
            <div className="flex flex-col gap-[11px] text-[15px] text-[#c6cbce]">
              {COUNTRIES_SERVED.map((country) => (
                <span key={country}>{country}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-wrap gap-2.5 justify-between items-center text-[13.5px] text-[#8b9298]">
          <span>© {year} EduSolve. All rights reserved.</span>
          <span>We Find &amp; Solve It</span>
        </div>
      </div>
    </footer>
  );
}
