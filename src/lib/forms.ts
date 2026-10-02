// Shared form validation and EmailJS submission. EmailJS is called with a plain
// POST only when a form is submitted; no third-party script or SDK is loaded.

import { EMAILJS_ENDPOINT, EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATES } from '@/config';

export const nameError = (value: string, label = 'Name'): string => {
  const name = value.trim();
  if (!name) return `${label} is required.`;
  if (name.length < 3) return `${label} must be at least 3 characters.`;
  if (!/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/.test(name)) return `${label} can contain only letters and spaces.`;
  return '';
};

export const requiredError = (value: string, label: string): string =>
  value.trim() ? '' : `${label} is required.`;

export const minLengthError = (value: string, label: string, min = 3): string => {
  const text = value.trim();
  if (!text) return `${label} is required.`;
  if (text.length < min) return `${label} must be at least ${min} characters.`;
  return '';
};

export type FormTemplate = keyof typeof EMAILJS_TEMPLATES;

// Sends one form entry through EmailJS's REST API. The field names are the
// {{variables}} used in that form's EmailJS template; `subject` fills the
// template's Subject line. Where the email goes is decided in the EmailJS
// dashboard (the template's "To Email"), not here.
export async function sendForm(template: FormTemplate, fields: Record<string, string>, subject: string): Promise<void> {
  const response = await fetch(EMAILJS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATES[template],
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: { subject, ...fields },
    }),
  });
  // EmailJS answers 200 "OK" on success, and a plain-text reason otherwise.
  if (!response.ok) {
    console.error('Form delivery failed:', response.status, await response.text().catch(() => ''));
    throw new Error('Unable to send your request. Please try again, or message us on WhatsApp.');
  }
}
