'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDownIcon } from '@/components/icons';
import { COUNTRIES, type Country } from '@/content/countries';
import { cn } from '@/lib/cn';
import { inputClass } from './fields';

interface CountryPickerProps {
  id: string;
  value: string;
  onChange: (country: string) => void;
  invalid?: boolean;
  describedBy?: string;
}

// Searchable country list (kept local, no external service).
export function CountryPicker({ id, value, onChange, invalid, describedBy }: CountryPickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const container = useRef<HTMLDivElement>(null);
  const listId = useId();
  const results = COUNTRIES.filter(({ name }) => name.toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (event.target instanceof Node && !container.current?.contains(event.target)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const select = (country: Country) => {
    onChange(country.name);
    setQuery('');
    setOpen(false);
  };

  return (
    <div ref={container} className="relative">
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-describedby={describedBy}
        onClick={() => setOpen((current) => !current)}
        className={cn(inputClass, 'flex items-center justify-between text-left', invalid && 'border-red')}
      >
        <span className={value ? '' : 'text-[#72777c]'}>{value || 'Select country'}</span>
        <ChevronDownIcon size={18} className="ml-3 shrink-0 text-muted" />
      </button>
      {open ? (
        <div className="absolute z-30 mt-2 w-full min-w-64 overflow-hidden rounded-xl border border-line bg-white shadow-[var(--shadow-card)]">
          <div className="border-b border-line-soft p-2">
            <input autoFocus type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search countries" aria-label="Search countries" className={cn(inputClass, 'py-2.5')} />
          </div>
          <ul id={listId} role="listbox" aria-label="Countries" className="max-h-60 overflow-y-auto py-1" data-lenis-prevent>
            {results.length ? (
              results.map((country) => (
                <li key={country.name} role="option" aria-selected={value === country.name}>
                  <button type="button" onClick={() => select(country)} className="flex w-full justify-between gap-3 px-4 py-2.5 text-left text-[0.9375rem] hover:bg-panel">
                    {country.name} <span className="text-muted">{country.dialCode}</span>
                  </button>
                </li>
              ))
            ) : (
              <li className="px-4 py-4 text-sm text-muted">No matching country found.</li>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
