import { COUNTRIES } from '../data/countries';

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
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) throw new Error('Form email delivery has not been configured yet.');
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ access_key: accessKey, from_name: 'EduSolve', subject, ...fields }),
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.message || 'Unable to send your request.');
}
