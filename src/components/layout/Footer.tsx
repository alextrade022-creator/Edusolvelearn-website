import Image from 'next-image-export-optimizer';
import Link from 'next/link';
import type { ComponentType, ReactNode } from 'react';
import { FacebookIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from '@/components/icons';
import { ALL_COUNTRIES_SERVED, CONTACT, COUNTRIES_SERVED, FOOTER_GROUPS, FOOTER_TAGLINE, LEGAL_LINKS, SOCIAL_LINKS, type SocialLink } from '@/content/site';
import { BackToTop } from './BackToTop';

const SOCIAL_ICONS: Record<SocialLink['icon'], ComponentType<{ size?: number }>> = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  whatsapp: WhatsAppIcon,
};

// Rendered at build time, so the year is the year of the latest deploy.
const YEAR = new Date().getFullYear();

const linkClass = 'inline-block py-1 text-footer-text transition-colors hover:text-white';

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[0.8125rem] font-bold tracking-[0.08em] text-white uppercase">{title}</h2>
      <ul className="flex flex-col gap-2 text-[0.9375rem]">{children}</ul>
    </div>
  );
}

// Brand block on the left; four equal columns (5–6 short items each) on the
// right, so they end at roughly the same height. Phones: 2×2 grid.
export function Footer() {
  return (
    <footer className="bg-footer text-footer-text">
      <div className="container-site grid gap-12 pt-16 pb-12 md:pt-20 lg:grid-cols-12 lg:gap-6 lg:pt-24">
        <div className="flex flex-col gap-6 lg:col-span-4">
          <Link href="/" aria-label="EduSolve home" className="self-start rounded-xl bg-white px-3.5 py-2.5">
            <Image src="/images/edusolve-logo.png" alt="EduSolve" width={66} height={36} sizes="66px" placeholder="empty" className="h-9 w-auto" />
          </Link>
          <p className="max-w-[20rem] text-[0.9375rem] leading-relaxed">{FOOTER_TAGLINE}</p>
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

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 lg:col-span-8">
          {FOOTER_GROUPS.map((group) => (
            <Column key={group.title} title={group.title}>
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </Column>
          ))}

          <Column title="Get in touch">
            <li>
              <a href={CONTACT.phoneHref} className={linkClass}>
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                WhatsApp us
              </a>
            </li>
            <li>
              <a href={CONTACT.emailHref} className={`${linkClass} break-all`}>
                {CONTACT.email}
              </a>
            </li>
            <li className="py-1">{CONTACT.location}</li>
          </Column>

          <Column title="We serve">
            {COUNTRIES_SERVED.map((country) => (
              <li key={country} className="py-1">
                {country}
              </li>
            ))}
            <li>
              <Link href="/courses/#where-we-teach" className={linkClass}>
                and {ALL_COUNTRIES_SERVED.length - COUNTRIES_SERVED.length} more countries
              </Link>
            </li>
          </Column>
        </nav>
      </div>

      <div className="container-site">
        <div className="flex flex-col gap-4 border-t border-footer-line py-7 text-sm text-faint md:flex-row md:items-center md:justify-between">
          <p>© {YEAR} EduSolve. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <BackToTop className="cursor-pointer transition-colors hover:text-white" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
