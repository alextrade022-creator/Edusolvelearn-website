// Site-wide constants.

export const SITE_URL = 'https://edusolvelearn.com';
export const SITE_NAME = 'EduSolve';

// EmailJS (form delivery). These are PUBLIC values by design: they only let the
// site trigger our own email templates, whose recipient addresses are fixed in
// the EmailJS dashboard, and they are visible in the browser bundle anyway. So
// they live in source rather than in .env. The EmailJS *Private Key* is a real
// secret: it must never be added here or anywhere in this repository.
export const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';
export const EMAILJS_SERVICE_ID = 'service_bnfg0ae';
export const EMAILJS_PUBLIC_KEY = 'tZm-l89DAqd2xk8lo';
/** One template per form; each one's "To Email" is set in the EmailJS dashboard. */
export const EMAILJS_TEMPLATES = {
  demoBooking: 'template_mtcpoz6',
  teacherApplication: 'template_ritb71q',
} as const;

export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=co.diy4.wprgh&hl=en_IN';
