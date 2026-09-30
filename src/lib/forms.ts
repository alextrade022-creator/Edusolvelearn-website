// Shared form validation and Web3Forms submission. Web3Forms is a plain POST
// made only when a form is submitted; no third-party script is loaded.

import { WEB3FORMS_ENDPOINT, WEB3FORMS_KEY } from '@/config';

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

interface Web3FormsResponse {
  success: boolean;
  message?: string;
}

const isWeb3FormsResponse = (value: unknown): value is Web3FormsResponse =>
  typeof value === 'object' && value !== null && 'success' in value;

export async function submitToWeb3Forms(fields: Record<string, string>, subject: string): Promise<void> {
  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ access_key: WEB3FORMS_KEY, from_name: 'EduSolve', subject, ...fields }),
  });
  const data: unknown = await response.json();
  if (!isWeb3FormsResponse(data) || !data.success) {
    const message = isWeb3FormsResponse(data) && data.message ? data.message : 'Unable to send your request.';
    throw new Error(message);
  }
}
