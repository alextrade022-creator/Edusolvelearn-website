'use client';

import Image from 'next-image-export-optimizer';
import { useState } from 'react';
import { ZoomIn } from '@/components/motion/ZoomIn';
import { ExpandChip } from '@/components/ui/ExpandChip';
import { Modal } from '@/components/ui/Modal';
import type { Person } from '@/content/pages';

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2);

// A founder's photo, or their initials on the warm panel until a photo arrives.
function Portrait({ person, sizes, zoom = false }: { person: Person; sizes: string; zoom?: boolean }) {
  if (!person.photo) {
    return (
      <div className="flex h-full items-center justify-center" aria-hidden="true">
        <span className="font-serif text-[5rem] font-medium text-[#85817a]">{initials(person.name)}</span>
      </div>
    );
  }
  const image = <Image src={person.photo} alt={`${person.name}, ${person.role}`} fill sizes={sizes} className="object-cover object-bottom" />;
  return zoom ? <ZoomIn className="absolute inset-0">{image}</ZoomIn> : image;
}

// About page leadership cards. Hovering shades the card and zooms the photo a
// touch (no lift); the corner mark shows it opens larger.
// Clicking opens a larger view with the photo beside the name, role and bio.
export function FounderCards({ people }: { people: readonly Person[] }) {
  const [opened, setOpened] = useState<Person | null>(null);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {people.map((person) => (
          <button
            key={person.name}
            type="button"
            aria-haspopup="dialog"
            onClick={() => setOpened(person)}
            className="group flex flex-col gap-6 rounded-panel border border-line bg-white p-4 pb-8 text-left transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-float motion-reduce:transition-none md:p-5 md:pb-9"
          >
            <span className="relative block aspect-[4/3] overflow-hidden rounded-2xl bg-panel">
              <span className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03] motion-reduce:transition-none">
                <Portrait person={person} sizes="(min-width: 768px) 560px, 100vw" zoom />
              </span>
              <ExpandChip className="absolute right-4 bottom-4" />
            </span>
            <span className="flex flex-col gap-2 px-2">
              <span className="font-serif text-[1.75rem] font-medium tracking-[-0.015em]">{person.name}</span>
              <span className="text-sm font-bold tracking-[0.04em] text-red uppercase">{person.role}</span>
              <span className="mt-1 leading-relaxed text-body">{person.bio}</span>
            </span>
          </button>
        ))}
      </div>

      <Modal open={opened !== null} onClose={() => setOpened(null)} labelledBy="founder-dialog-name" className="max-w-[60rem] p-3 md:p-4">
        {opened ? (
          <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_1fr] md:gap-10">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-panel max-md:aspect-[4/3]">
              <Portrait person={opened} sizes="(min-width: 768px) 520px, 92vw" />
            </div>
            <div className="flex flex-col justify-center gap-3 px-3 pb-6 md:py-10 md:pr-14 md:pl-0">
              <p className="text-sm font-bold tracking-[0.04em] text-red uppercase">{opened.role}</p>
              <h2 id="founder-dialog-name" className="font-serif text-[2.25rem] leading-tight font-medium tracking-[-0.02em] md:text-[3rem]">
                {opened.name}
              </h2>
              <p className="mt-2 text-lead text-body">{opened.bio}</p>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
