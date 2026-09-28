import { useEffect, useRef, useState } from 'react';
import { COUNTRIES } from '../../data/countries';

const inputClass = 'w-full box-border border-[1.5px] border-[#e2e5df] rounded-xl px-[15px] py-[13px] font-sans text-[15.5px] text-brand-ink bg-white outline-none transition-colors focus:border-brand-green';

export default function CountryPicker({ id, value, onChange, error }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const container = useRef(null);
  const results = COUNTRIES.filter(({ name }) => name.toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(() => {
    const close = (event) => {
      if (!container.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const select = (country) => {
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
        onClick={() => setOpen((current) => !current)}
        className={`${inputClass} text-left flex items-center justify-between ${error ? 'border-brand-red' : ''}`}
      >
        <span className={value ? '' : 'text-muted'}>{value || 'Select country'}</span>
        <span aria-hidden="true" className="ml-3">⌄</span>
      </button>
      {open && (
        <div className="absolute z-20 mt-2 w-full min-w-[250px] overflow-hidden rounded-xl border border-[#e2e5df] bg-white shadow-[0_10px_26px_rgba(22,26,29,.15)]">
          <div className="p-2 border-b border-[#eceee9]">
            <input autoFocus type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search countries" className={`${inputClass} py-2.5`} />
          </div>
          <ul role="listbox" className="max-h-56 overflow-y-auto py-1">
            {results.length ? results.map((country) => (
              <li key={country.name} role="option" aria-selected={value === country.name}>
                <button type="button" onClick={() => select(country)} className="w-full px-4 py-2.5 text-left text-sm text-brand-ink hover:bg-surface-leaf">
                  {country.name} <span className="text-muted">{country.dialCode}</span>
                </button>
              </li>
            )) : <li className="px-4 py-4 text-sm text-muted">No matching country found.</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
