import type { ComponentProps, ReactNode } from 'react';
import { CheckIcon, ChevronDownIcon } from '@/components/icons';
import { cn } from '@/lib/cn';

export const inputClass =
  'w-full rounded-xl border-[1.5px] border-line bg-white px-4 py-3.5 text-base text-ink outline-none transition-colors placeholder:text-[#72777c] focus:border-ink aria-[invalid=true]:border-red';

// A dropdown that matches the other fields: same padding, the site's thin
// chevron (as on the country picker) instead of the browser's arrow, and grey
// "Select …" text until a real option is chosen.
export function Select({ className, value, children, ...props }: ComponentProps<'select'>) {
  return (
    <div className="relative">
      <select
        {...props}
        value={value}
        data-empty={value === '' ? 'true' : undefined}
        className={cn(inputClass, 'appearance-none pr-11 data-[empty=true]:text-[#72777c] [&>option]:text-ink', className)}
      >
        {children}
      </select>
      <ChevronDownIcon size={18} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted" />
    </div>
  );
}

export function Field({ label, htmlFor, error, children, hint }: { label: string; htmlFor: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {hint && !error ? <p className="text-[0.8125rem] text-muted">{hint}</p> : null}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="text-[0.8125rem] font-semibold text-red">
          {error}
        </p>
      ) : null}
    </div>
  );
}

// A choice between a few short options, shown side by side in one rounded box
// the same height as the text fields: a soft beige track, with the chosen
// option as a raised white pill (quiet, so it never competes with the submit
// button). Built on native radio buttons, so arrow keys and screen readers
// work as expected.
export function SegmentedChoice<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-sm font-semibold text-ink">{legend}</legend>
      <div className="grid auto-cols-fr grid-flow-col gap-1 rounded-xl border-[1.5px] border-line bg-panel p-1">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex min-h-11 cursor-pointer items-center justify-center rounded-lg px-3 text-[0.9375rem] font-semibold text-muted transition-[color,background-color,box-shadow] duration-200 hover:text-ink has-[:checked]:bg-white has-[:checked]:text-ink has-[:checked]:shadow-[0_1px_2px_rgba(22,24,26,0.08),0_0_0_1px_rgba(22,24,26,0.04)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function SubmitButton({ sending, children, sendingLabel }: { sending: boolean; children: ReactNode; sendingLabel: string }) {
  return (
    <button
      type="submit"
      disabled={sending}
      className="inline-flex min-h-13 w-full items-center justify-center rounded-xl bg-red px-6 text-base font-semibold text-white transition-colors hover:bg-red-dark disabled:cursor-wait disabled:opacity-70"
    >
      {sending ? sendingLabel : children}
    </button>
  );
}

export function FormSuccess({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div role="status" className="flex flex-col items-center gap-4 px-2 py-10 text-center">
      <span className="inline-flex size-16 items-center justify-center rounded-full bg-panel text-green">
        <CheckIcon size={30} />
      </span>
      <h2 className="font-serif text-[1.75rem] font-medium">{title}</h2>
      <p className="max-w-sm leading-relaxed text-body">{children}</p>
    </div>
  );
}

export function FormCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-panel border border-line bg-white p-5 shadow-[var(--shadow-card)] sm:p-8 md:p-10', className)}>{children}</div>
  );
}
