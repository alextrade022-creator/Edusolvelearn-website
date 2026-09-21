// Global site constants: contact details, navigation, and social links.
// Centralised so a phone number or nav label only ever changes in one place.

export const CONTACT = {
  phone: '+91 85470 39895',
  phoneHref: 'tel:+918547039895',
  whatsappNumber: '918547039895',
  whatsappUrl: 'https://wa.me/918547039895',
  email: 'hello@edusolve.in',
  emailHref: 'mailto:hello@edusolve.in',
  location: 'Kozhikode, Kerala, India',
};

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Courses', to: '/courses' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'About Us', to: '/about' },
  { label: 'Teachers', to: '/teachers' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Contact', to: '/contact' },
];

export const FOOTER_LINKS = [
  { label: 'About Us', to: '/about' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Teachers', to: '/teachers' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Contact', to: '/contact' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms & Conditions', to: '/terms' },
];

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/edusolvelearn/', icon: 'linkedin' },
  { label: 'Instagram', href: 'https://www.instagram.com/edusolvelearn/', icon: 'instagram' },
  { label: 'Facebook', href: 'https://www.facebook.com/edusolvelearn/', icon: 'facebook' },
  { label: 'WhatsApp', href: CONTACT.whatsappUrl, icon: 'whatsapp' },
];

export const COUNTRIES_SERVED = [
  'United Arab Emirates',
  'Qatar',
  'Saudi Arabia',
  'Bahrain',
  'Kuwait',
  'Oman',
];

export const FOOTER_TAGLINE =
  'Warm, one-on-one online tuition for Gulf-based Indian families — CBSE, ICSE, IGCSE, IB & American, LKG to Grade 12.';
