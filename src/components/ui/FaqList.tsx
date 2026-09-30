import { MinusIcon, PlusIcon } from '@/components/icons';
import type { Faq } from '@/content/home';

// Accordion built on native <details>/<summary>: keyboard and screen-reader
// friendly with zero JavaScript. Opening is animated in CSS where supported.
export function FaqList({ items, openFirst = true }: { items: readonly Faq[]; openFirst?: boolean }) {
  return (
    <div className="border-t border-line">
      {items.map((item, index) => (
        <details key={item.q} className="faq-item group border-b border-line" open={openFirst && index === 0}>
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.0625rem] leading-snug font-bold marker:hidden md:py-6.5 md:text-[1.1875rem] [&::-webkit-details-marker]:hidden">
            {item.q}
            <span aria-hidden="true" className="shrink-0 text-ink">
              <PlusIcon size={20} className="group-open:hidden" />
              <MinusIcon size={20} className="hidden group-open:block" />
            </span>
          </summary>
          <p className="max-w-[35rem] pb-6 leading-relaxed text-body md:pb-7">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
