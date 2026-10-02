import Link from 'next/link';
import { ArrowRightIcon } from '@/components/icons';

// The last card in the home page's video row: same size as a video card, but
// quieter, and the whole card links to the Stories page. Gives the row a clear end.
export function StoriesEndCard() {
  return (
    <Link
      href="/testimonials/"
      className="group flex aspect-[9/14] flex-col justify-between rounded-2xl border border-line bg-panel p-5 transition-colors duration-300 hover:border-line-strong hover:bg-[#ebe8e2] lg:p-6"
    >
      <span className="eyebrow">Parent stories</span>
      <span className="flex flex-col gap-5">
        <span className="font-serif text-[1.5rem] leading-tight font-medium tracking-[-0.015em] lg:text-[1.875rem]">More parent stories</span>
        <span className="text-sm leading-relaxed text-body">Videos and words from families across the Gulf.</span>
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:translate-x-1">
          <ArrowRightIcon size={20} />
        </span>
      </span>
    </Link>
  );
}
