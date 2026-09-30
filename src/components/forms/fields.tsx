import type { ReactNode } from 'react';
import { CheckIcon } from '@/components/icons';
import { cn } from '@/lib/cn';

export const inputClass =
  'w-full rounded-xl border-[1.5px] border-line bg-white px-4 py-3.5 text-base text-ink outline-none transition-colors placeholder:text-[#72777c] focus:border-ink aria-[invalid=true]:border-red';

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
