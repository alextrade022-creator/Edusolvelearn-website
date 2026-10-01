// Contact details, navigation and social links. Centralised so a phone number or
// nav label only ever changes in one place.

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink extends NavLink {
  icon: 'linkedin' | 'instagram' | 'facebook' | 'whatsapp';
}

export const CONTACT = {
  phone: '+91 85470 39895',
  phoneHref: 'tel:+918547039895',
  whatsappNumber: '918547039895',
  whatsappUrl: 'https://wa.me/918547039895',
  email: 'hello@edusolve.in',
  emailHref: 'mailto:hello@edusolve.in',
  location: 'Kozhikode, Kerala, India',
} as const;

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Courses', href: '/courses/' },
  { label: 'How it works', href: '/how-it-works/' },
  { label: 'Our tutors', href: '/teachers/' },
  { label: 'Stories', href: '/testimonials/' },
  { label: 'Life at EduSolve', href: '/life-at-edusolve/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'About', href: '/about/' },
];

// Footer link columns, kept to 5 links each so the columns stay even.
export const FOOTER_GROUPS: readonly { title: string; links: readonly NavLink[] }[] = [
  {
    title: 'Explore',
    links: [
      { label: 'Courses', href: '/courses/' },
      { label: 'How it works', href: '/how-it-works/' },
      { label: 'Our tutors', href: '/teachers/' },
      { label: 'Stories', href: '/testimonials/' },
      { label: 'FAQ', href: '/faq/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about/' },
      { label: 'Life at EduSolve', href: '/life-at-edusolve/' },
      { label: 'Blog', href: '/blog/' },
      { label: 'Teach with us', href: '/teach/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
];

export const LEGAL_LINKS: readonly NavLink[] = [
  { label: 'Privacy', href: '/privacy/' },
  { label: 'Terms', href: '/terms/' },
];

export const SOCIAL_LINKS: readonly SocialLink[] = [
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
] as const;

export const FOOTER_TAGLINE =
  'Warm, one-on-one online tuition for Gulf-based Indian families — LKG to Grade 12.';
