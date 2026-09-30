import Link from 'next/link';
import { HeaderNav } from './HeaderNav';
import { Logo } from './Logo';

// Sticky, frosted header. Static markup; only the nav (active state + mobile
// menu) is a client component.
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-page/85 backdrop-blur-md supports-[backdrop-filter]:bg-page/75">
      <div className="container-site flex h-16 items-center justify-between gap-6 md:h-[4.75rem]">
        <Logo />
        <div className="flex items-center gap-3 xl:contents">
          <HeaderNav />
          <Link
            href="/contact/"
            className="order-first hidden min-h-11 items-center rounded-xl bg-red px-5 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-red-dark sm:inline-flex xl:order-last"
          >
            Book a free demo
          </Link>
        </div>
      </div>
    </header>
  );
}
