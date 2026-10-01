import Link from 'next/link';
import { HeaderAutoHide } from './HeaderAutoHide';
import { HeaderNav } from './HeaderNav';
import { Logo } from './Logo';

// Sticky, frosted header. Static markup; only the nav (active state + mobile
// menu) and the hide-on-scroll-down behaviour are client components.
export function Header() {
  return (
    <header
      data-site-header
      className="sticky top-0 z-50 border-b border-line bg-page/85 backdrop-blur-md transition-transform duration-300 ease-[var(--ease-out-soft)] supports-[backdrop-filter]:bg-page/75 data-[hidden]:-translate-y-full motion-reduce:transition-none"
    >
      <HeaderAutoHide />
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
