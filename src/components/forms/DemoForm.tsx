'use client';

import { CURRICULUM_OPTIONS, GRADE_OPTIONS, TIME_OPTIONS } from '@/content/forms';
import { dialCodeFor } from '@/content/countries';
import { minLengthError, nameError, requiredError, sendForm } from '@/lib/forms';
import { CountryPicker } from './CountryPicker';
import { Field, FormCard, FormSuccess, inputClass, SegmentedChoice, Select, SubmitButton } from './fields';
import { useFormState } from './useFormState';

type Key = 'bookingAs' | 'name' | 'country' | 'phone' | 'grade' | 'curriculum' | 'subject' | 'time';

// Who is filling in the form. Most visitors are parents, so that's preselected.
const BOOKING_AS = [
  { value: 'Parent', label: 'A parent' },
  { value: 'Student', label: 'A student' },
] as const;

const INITIAL: Record<Key, string> = { bookingAs: 'Parent', name: '', country: '', phone: '', grade: '', curriculum: '', subject: '', time: '' };

// Free demo class booking. Sent through EmailJS only on submit.
export function DemoForm() {
  const form = useFormState<Key>(INITIAL, {
    name: (v) => nameError(v, 'Name'),
    country: (v) => requiredError(v, 'Country'),
    phone: (v) => (v.trim().length < 6 ? (v.trim() ? 'Enter a valid WhatsApp number.' : 'WhatsApp number is required.') : ''),
    grade: (v) => requiredError(v, 'Class / grade'),
    curriculum: (v) => requiredError(v, 'Curriculum'),
    subject: (v) => minLengthError(v, 'Subjects needed'),
  });

  const isStudent = form.values.bookingAs === 'Student';

  if (form.submitted) {
    return (
      <FormCard>
        <FormSuccess title="Demo request received!">
          Thank you. Our team will message you on WhatsApp shortly to arrange {isStudent ? 'your' : 'your child’s'} free one-on-one demo class.
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
          sendForm(
            'demoBooking',
            {
              booked_by: values.bookingAs,
              parent_student_name: values.name.trim(),
              whatsapp_number: `${code} ${values.phone}`.trim(),
              country: values.country,
              grade: values.grade,
              curriculum: values.curriculum,
              subjects: values.subject.trim(),
              preferred_time: values.time || 'No preference',
            },
            'New Free Demo Booking — EduSolve',
          ),
        )}
        className="flex flex-col gap-5"
      >
        <h2 className="font-serif text-[1.625rem] font-medium md:text-[1.875rem]">Book your free demo class</h2>

        <SegmentedChoice
          legend="I’m booking as"
          name="bookingAs"
          options={BOOKING_AS}
          value={isStudent ? 'Student' : 'Parent'}
          onChange={(value) => form.setValue('bookingAs', value)}
        />

        <Field label="Your name *" htmlFor="name" error={form.errorFor('name')}>
          <input id="name" autoComplete="name" className={inputClass} value={form.values.name} onChange={(e) => form.setValue('name', e.target.value)} onBlur={() => form.touch('name')} aria-invalid={Boolean(form.errorFor('name'))} aria-describedby={describe('name')} placeholder="Your full name" />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Country *" htmlFor="country" error={form.errorFor('country')}>
            <CountryPicker id="country" value={form.values.country} onChange={(country) => form.setValue('country', country)} onBlur={() => form.touch('country')} invalid={Boolean(form.errorFor('country'))} describedBy={describe('country')} />
          </Field>
          <Field label="WhatsApp number *" htmlFor="phone" error={form.errorFor('phone')}>
            <div className="flex overflow-hidden rounded-xl border-[1.5px] border-line bg-white focus-within:border-ink has-[[aria-invalid=true]]:border-red">
              <span className="flex items-center border-r border-line px-3 text-sm whitespace-nowrap text-body">{code || 'Code'}</span>
              <input id="phone" type="tel" inputMode="numeric" autoComplete="tel-national" className="min-w-0 flex-1 px-3 py-3.5 text-base outline-none" value={form.values.phone} onChange={(e) => form.setValue('phone', e.target.value.replace(/\D/g, ''))} onBlur={() => form.touch('phone')} aria-invalid={Boolean(form.errorFor('phone'))} aria-describedby={describe('phone')} placeholder="Phone number" />
            </div>
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Class / grade *" htmlFor="grade" error={form.errorFor('grade')}>
            <Select id="grade" value={form.values.grade} onChange={(e) => form.setValue('grade', e.target.value)} onBlur={() => form.touch('grade')} aria-invalid={Boolean(form.errorFor('grade'))} aria-describedby={describe('grade')}>
              <option value="">Select grade</option>
              {GRADE_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </Select>
          </Field>
          <Field label="Curriculum *" htmlFor="curriculum" error={form.errorFor('curriculum')}>
            <Select id="curriculum" value={form.values.curriculum} onChange={(e) => form.setValue('curriculum', e.target.value)} onBlur={() => form.touch('curriculum')} aria-invalid={Boolean(form.errorFor('curriculum'))} aria-describedby={describe('curriculum')}>
              <option value="">Select curriculum</option>
              {CURRICULUM_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </Select>
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Subjects needed *" htmlFor="subject" error={form.errorFor('subject')}>
            <input id="subject" className={inputClass} value={form.values.subject} onChange={(e) => form.setValue('subject', e.target.value)} onBlur={() => form.touch('subject')} aria-invalid={Boolean(form.errorFor('subject'))} aria-describedby={describe('subject')} placeholder="e.g. Maths, Physics" />
          </Field>
          <Field label="Preferred time" htmlFor="time">
            <Select id="time" value={form.values.time} onChange={(e) => form.setValue('time', e.target.value)}>
              <option value="">Select preferred time</option>
              {TIME_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </Select>
          </Field>
        </div>

        <SubmitButton sending={form.sending} sendingLabel="Sending your request…">
          Book my free demo class
        </SubmitButton>
        {form.submitError ? (
          <p role="alert" className="text-sm font-semibold text-red">
            {form.submitError}
          </p>
        ) : null}
        <p className="text-center text-[0.8125rem] text-muted">Free first class · No payment details needed</p>
      </form>
    </FormCard>
  );
}
