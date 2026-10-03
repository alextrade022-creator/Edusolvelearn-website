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

// Headline counts, used wherever the site quotes them (home stats, Stories,
// Our tutors, About), so they always agree. Shown with a "+".
export const TUTOR_COUNT = 2000;
export const COUNTRY_COUNT = 20;

export interface ServedCountry {
  name: string;
  /** Shorter label for tight lists (UAE, USA). */
  short?: string;
}

// Every country EduSolve teaches in, by region (Gulf first: our core families).
// Shown on the Courses page; the Gulf is also listed in the footer, and all of
// them go into the structured data.
export const COUNTRY_GROUPS: readonly { name: string; items: readonly ServedCountry[] }[] = [
  {
    name: 'The Gulf',
    items: [{ name: 'Saudi Arabia' }, { name: 'United Arab Emirates', short: 'UAE' }, { name: 'Kuwait' }, { name: 'Qatar' }, { name: 'Bahrain' }, { name: 'Oman' }],
  },
  { name: 'Asia', items: [{ name: 'Malaysia' }, { name: 'India' }, { name: 'Japan' }, { name: 'Pakistan' }, { name: 'Uzbekistan' }] },
  {
    name: 'Europe',
    items: [{ name: 'Germany' }, { name: 'Switzerland' }, { name: 'France' }, { name: 'Russia' }, { name: 'Sweden' }, { name: 'United Kingdom' }],
  },
  { name: 'North America', items: [{ name: 'United States', short: 'USA' }, { name: 'Mexico' }, { name: 'Canada' }] },
  { name: 'Africa and Australia', items: [{ name: 'Egypt' }, { name: 'Australia' }] },
];

export const ALL_COUNTRIES_SERVED: readonly ServedCountry[] = COUNTRY_GROUPS.flatMap((group) => group.items);

/** The Gulf countries (footer). */
export const COUNTRIES_SERVED: readonly string[] = (COUNTRY_GROUPS[0]?.items ?? []).map((country) => country.name);

export const FOOTER_TAGLINE =
  'Warm, one-on-one online tuition for Gulf-based Indian families — LKG to Grade 12.';
