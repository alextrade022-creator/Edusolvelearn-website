import { COUNTRIES } from '../data/countries';
import { WEB3FORMS_KEY } from '../config';

export const nameError = (value, label = 'Name') => {
  const name = value.trim();
  if (!name) return `${label} is required.`;
  if (name.length < 3) return `${label} must be at least 3 characters.`;
  if (!/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/.test(name)) return `${label} can contain only letters and spaces.`;
  return '';
};

export const requiredError = (value, label) => value.trim() ? '' : `${label} is required.`;
export const countryCode = (country) => COUNTRIES.find((item) => item.name === country)?.dialCode || '';

export async function submitToWeb3Forms(fields, subject) {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ access_key: WEB3FORMS_KEY, from_name: 'EduSolve', subject, ...fields }),
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.message || 'Unable to send your request.');
}
