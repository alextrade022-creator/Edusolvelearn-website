import Image from 'next-image-export-optimizer';
import Link from 'next/link';
import type { ComponentType } from 'react';
import { FacebookIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from '@/components/icons';
import { CONTACT, COUNTRIES_SERVED, FOOTER_EXPLORE, FOOTER_TAGLINE, LEGAL_LINKS, SOCIAL_LINKS, type SocialLink } from '@/content/site';

const SOCIAL_ICONS: Record<SocialLink['icon'], ComponentType<{ size?: number }>> = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  whatsapp: WhatsAppIcon,
};

// Rendered at build time, so the year is the year of the latest deploy.
const YEAR = new Date().getFullYear();

const headingClass = 'text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-white';
const linkClass = 'text-footer-text transition-colors hover:text-white';

export function Footer() {
  return (
    <footer className="bg-footer text-footer-text">
      <div className="container-site grid gap-12 pt-14 pb-10 md:grid-cols-12 md:gap-6 md:pt-[4.5rem]">
        <div className="flex flex-col gap-5 md:col-span-12 lg:col-span-4">
          <Link href="/" aria-label="EduSolve home" className="self-start rounded-xl bg-white px-3.5 py-2.5">
            <Image src="/images/edusolve-logo.png" alt="EduSolve" width={66} height={36} sizes="66px" placeholder="empty" className="h-9 w-auto" />
          </Link>
          <p className="max-w-xs text-[0.9375rem] leading-relaxed">{FOOTER_TAGLINE}</p>
          <ul className="flex gap-2.5" aria-label="Social media">
            {SOCIAL_LINKS.map(({ label, href, icon }) => {
              const Icon = SOCIAL_ICONS[icon];
              return (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-footer-line text-footer-text transition-colors hover:border-white hover:text-white"
                  >
                    <Icon size={18} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3.5 text-[0.9375rem] md:col-span-4 lg:col-span-3 lg:col-start-6">
          <h2 className={headingClass}>Explore</h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
            {FOOTER_EXPLORE.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3.5 text-[0.9375rem] md:col-span-4 lg:col-span-2">
          <h2 className={headingClass}>Get in touch</h2>
          <a href={CONTACT.phoneHref} className={linkClass}>{CONTACT.phone}</a>
          <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>WhatsApp us</a>
          <a href={CONTACT.emailHref} className={linkClass}>{CONTACT.email}</a>
          <p>{CONTACT.location}</p>
        </div>

        <div className="flex flex-col gap-3.5 text-[0.9375rem] md:col-span-4 lg:col-span-2">
          <h2 className={headingClass}>We serve</h2>
          <ul className="flex flex-col gap-3">
            {COUNTRIES_SERVED.map((country) => (
              <li key={country}>{country}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-site">
        <div className="flex flex-col gap-4 border-t border-footer-line py-7 text-sm text-faint md:flex-row md:items-center md:justify-between">
          <p>© {YEAR} EduSolve. All rights reserved.</p>
          <ul className="flex gap-6">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
