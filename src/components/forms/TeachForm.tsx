'use client';

import { dialCodeFor } from '@/content/countries';
import { ENGLISH_PROFICIENCY_OPTIONS } from '@/content/forms';
import { minLengthError, nameError, requiredError, submitToWeb3Forms } from '@/lib/forms';
import { CountryPicker } from './CountryPicker';
import { Field, FormCard, FormSuccess, SubmitButton, inputClass } from './fields';
import { useFormState } from './useFormState';

type Key = 'name' | 'country' | 'phone' | 'subjects' | 'englishProficiency' | 'qualification';

const INITIAL: Record<Key, string> = { name: '', country: '', phone: '', subjects: '', englishProficiency: '', qualification: '' };

// Tutor application. Sent to Web3Forms only on submit.
export function TeachForm() {
  const form = useFormState<Key>(INITIAL, {
    name: (v) => nameError(v),
    country: (v) => requiredError(v, 'Country'),
    phone: (v) => (v.trim().length < 6 ? (v.trim() ? 'Enter a valid phone number.' : 'Phone number is required.') : ''),
    subjects: (v) => minLengthError(v, 'Subjects you teach'),
    englishProficiency: (v) => requiredError(v, 'English proficiency'),
    qualification: (v) => minLengthError(v, 'Qualification'),
  });

  if (form.submitted) {
    return (
      <FormCard>
        <FormSuccess title="Application received!">
          Thank you for your interest in teaching with EduSolve. We’ll review your details and get in touch if there is a fit.
        </FormSuccess>
      </FormCard>
    );
  }

  const describe = (key: Key) => (form.errorFor(key) ? `${key}-error` : undefined);
  const code = dialCodeFor(form.values.country);

  return (
    <FormCard>
      <form
        noValidate
        onSubmit={form.handleSubmit((values) =>
          submitToWeb3Forms(
            {
              form_type: 'Teacher application',
              teacher_name: values.name.trim(),
              phone_number: `${code} ${values.phone}`.trim(),
              country: values.country,
              subjects_offered: values.subjects.trim(),
              english_proficiency: values.englishProficiency,
              qualification: values.qualification.trim(),
            },
            'New Teacher Application — EduSolve',
          ),
        )}
        className="flex flex-col gap-5"
      >
        <h2 className="font-serif text-[1.625rem] font-medium md:text-[1.875rem]">Apply to teach</h2>

        <Field label="Name *" htmlFor="name" error={form.errorFor('name')}>
          <input id="name" autoComplete="name" className={inputClass} value={form.values.name} onChange={(e) => form.setValue('name', e.target.value)} onBlur={() => form.touch('name')} aria-invalid={Boolean(form.errorFor('name'))} aria-describedby={describe('name')} placeholder="Your full name" />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Country *" htmlFor="country" error={form.errorFor('country')}>
            <CountryPicker id="country" value={form.values.country} onChange={(country) => form.setValue('country', country)} invalid={Boolean(form.errorFor('country'))} describedBy={describe('country')} />
          </Field>
          <Field label="Phone number *" htmlFor="phone" error={form.errorFor('phone')}>
            <div className="flex overflow-hidden rounded-xl border-[1.5px] border-line bg-white focus-within:border-ink has-[[aria-invalid=true]]:border-red">
              <span className="flex items-center border-r border-line px-3 text-sm whitespace-nowrap text-body">{code || 'Code'}</span>
              <input id="phone" type="tel" inputMode="numeric" autoComplete="tel-national" className="min-w-0 flex-1 px-3 py-3.5 text-base outline-none" value={form.values.phone} onChange={(e) => form.setValue('phone', e.target.value.replace(/\D/g, ''))} onBlur={() => form.touch('phone')} aria-invalid={Boolean(form.errorFor('phone'))} aria-describedby={describe('phone')} placeholder="Phone number" />
            </div>
          </Field>
        </div>

        <Field label="Subjects you teach *" htmlFor="subjects" error={form.errorFor('subjects')}>
          <input id="subjects" className={inputClass} value={form.values.subjects} onChange={(e) => form.setValue('subjects', e.target.value)} onBlur={() => form.touch('subjects')} aria-invalid={Boolean(form.errorFor('subjects'))} aria-describedby={describe('subjects')} placeholder="e.g. Mathematics, Physics" />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="English proficiency *" htmlFor="englishProficiency" error={form.errorFor('englishProficiency')}>
            <select id="englishProficiency" className={inputClass} value={form.values.englishProficiency} onChange={(e) => form.setValue('englishProficiency', e.target.value)} onBlur={() => form.touch('englishProficiency')} aria-invalid={Boolean(form.errorFor('englishProficiency'))} aria-describedby={describe('englishProficiency')}>
              <option value="">Select proficiency</option>
              {ENGLISH_PROFICIENCY_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>
          <Field label="Qualification *" htmlFor="qualification" error={form.errorFor('qualification')}>
            <input id="qualification" className={inputClass} value={form.values.qualification} onChange={(e) => form.setValue('qualification', e.target.value)} onBlur={() => form.touch('qualification')} aria-invalid={Boolean(form.errorFor('qualification'))} aria-describedby={describe('qualification')} placeholder="e.g. B.Ed., M.Sc. Mathematics" />
          </Field>
        </div>

        <SubmitButton sending={form.sending} sendingLabel="Sending application…">
          Apply to teach
        </SubmitButton>
        {form.submitError ? (
          <p role="alert" className="text-sm font-semibold text-red">
            {form.submitError}
          </p>
        ) : null}
      </form>
    </FormCard>
  );
}
