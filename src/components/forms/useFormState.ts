'use client';

import { useState, type FormEvent } from 'react';

type Values<K extends string> = Record<K, string>;
type Validators<K extends string> = Partial<Record<K, (value: string, values: Values<K>) => string>>;

// Small form helper: values, "touched" tracking, validation and submit state.
export function useFormState<K extends string>(initial: Values<K>, validators: Validators<K>) {
  const [values, setValues] = useState(initial);
  const [touched, setTouched] = useState<Partial<Record<K, boolean>>>({});
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const errors = Object.fromEntries(
    (Object.keys(initial) as K[]).map((key) => [key, validators[key]?.(values[key], values) ?? '']),
  ) as Record<K, string>;

  const setValue = (key: K, value: string) => {
    setValues((previous) => ({ ...previous, [key]: value }));
    setTouched((previous) => ({ ...previous, [key]: true }));
    setSubmitError('');
  };

  const touch = (key: K) => setTouched((previous) => ({ ...previous, [key]: true }));
  const errorFor = (key: K) => (touched[key] ? errors[key] : '');

  const handleSubmit = (send: (values: Values<K>) => Promise<void>) => async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(Object.fromEntries((Object.keys(initial) as K[]).map((key) => [key, true])) as Record<K, boolean>);
    const firstInvalid = (Object.keys(initial) as K[]).find((key) => errors[key]);
    if (firstInvalid) {
      document.getElementById(String(firstInvalid))?.focus();
      return;
    }
    setSending(true);
    setSubmitError('');
    try {
      await send(values);
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return { values, setValue, touch, errorFor, sending, submitted, submitError, handleSubmit };
}
