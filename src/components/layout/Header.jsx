import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { WhatsAppIcon } from '../icons';
import Button from '../ui/Button';
import { NAV_LINKS, CONTACT } from '../../data/site';
import logo from '/images/edusolve-logo.png';

// Sticky top navigation. Desktop nav collapses into a burger menu below 1130px.
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const desktopLinkClass = ({ isActive }) =>
    `font-sans font-semibold text-[15px] px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap hover:text-brand-red ${
      isActive ? 'text-brand-red' : 'text-brand-ink'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block font-sans font-semibold text-base py-3.5 px-1.5 border-b border-brand-ink/[.06] ${
      isActive ? 'text-brand-red' : 'text-brand-ink'
    }`;

  return (
    <header className="sticky top-0 z-[100] bg-white font-sans shadow-[0_1px_0_rgba(22,26,29,.06),0_6px_20px_rgba(22,26,29,.05)]">
      <div className="max-w-container mx-auto px-6 h-[74px] flex items-center gap-5">
        <Link to="/" className="flex items-center flex-none mr-auto" aria-label="EduSolve home">
          <img src={logo} alt="EduSolve — We Find & Solve It" className="h-[46px] w-auto block" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden min-[1130px]:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={desktopLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 flex-none">
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
            className="w-[42px] h-[42px] rounded-full flex items-center justify-center bg-brand-green text-brand-ink flex-none transition-transform hover:scale-110"
          >
            <WhatsAppIcon size={22} />
          </a>

          <Button to="/contact" size="sm" className="hidden min-[560px]:inline-flex shadow-[0_6px_16px_rgba(210,3,33,.28)]">
            Book a Free Demo
          </Button>

          {/* Burger */}
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
            className="min-[1130px]:hidden flex flex-col gap-[5px] items-center justify-center w-11 h-11 bg-transparent border-none cursor-pointer p-0"
          >
            <span className="w-6 h-[2.5px] bg-brand-ink rounded-sm block" />
            <span className="w-6 h-[2.5px] bg-brand-ink rounded-sm block" />
            <span className="w-6 h-[2.5px] bg-brand-ink rounded-sm block" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="min-[1130px]:hidden border-t border-brand-ink/[.08] bg-white px-6 pt-2.5 pb-4">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={mobileLinkClass}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Button to="/contact" className="w-full mt-3 !rounded-xl" onClick={() => setMobileOpen(false)}>
            Book a Free Demo
          </Button>
        </div>
      )}
    </header>
  );
}
