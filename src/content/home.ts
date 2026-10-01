// Home page content (sections in page order).

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const HOME_STATS: readonly Stat[] = [
  { value: 100000, suffix: '+', label: 'Class hours taught' },
  { value: 1000, suffix: '+', label: 'Expert tutors' },
  { value: 12, suffix: '+', label: 'Countries served' },
  { value: 5, suffix: '+', label: 'Years of trust' },
];

export interface Step {
  title: string;
  text: string;
}

export const HOME_STEPS: readonly Step[] = [
  { title: 'Enquire', text: 'Share your child’s grade, board and goals by form or a quick WhatsApp message.' },
  { title: 'Free demo class', text: 'Sit in on a live one-on-one class and see the teaching style for yourself.' },
  { title: 'Matched tutor', text: 'We pair your child with the tutor who fits their subject, board and personality.' },
  { title: 'Progress tracking', text: 'Regular lessons with reports, feedback and parent check-ins.' },
];

export interface Benefit {
  title: string;
  text: string;
  image: string;
  imageAlt: string;
}

// Images live in public/why_edu_images/1–6.png.
export const HOME_BENEFITS: readonly Benefit[] = [
  { title: 'Undivided 1-on-1 attention', text: 'One student, one teacher. Every lesson moves at your child’s pace — never rushed, never left behind.', image: '/why_edu_images/1.png', imageAlt: 'A tutor giving one student full attention' },
  { title: 'Hand-picked expert tutors', text: 'Every tutor is interviewed, subject-tested and demo-vetted before they ever teach your child.', image: '/why_edu_images/2.png', imageAlt: 'An approved tutor profile' },
  { title: 'Gulf-friendly timings', text: 'Evening and weekend slots that fit UAE, Qatar, Saudi, Bahrain, Kuwait and Oman schedules.', image: '/why_edu_images/3.png', imageAlt: 'A clock showing an evening class time' },
  { title: 'Real progress tracking', text: 'Regular reports and parent updates, so you always know exactly how your child is doing.', image: '/why_edu_images/4.png', imageAlt: 'A progress chart trending upward' },
  { title: 'Curriculum-aligned', text: 'Lessons mapped to your child’s exact board and school syllabus — not generic content.', image: '/why_edu_images/5.png', imageAlt: 'A checklist of curricula' },
  { title: 'Start with a free demo', text: 'Meet the tutor and try a real class before you commit. No card, no pressure.', image: '/why_edu_images/6.png', imageAlt: 'A calendar with a free demo date circled' },
];

export interface SelectionCheck {
  label: string;
  meta: string;
}

// PLACEHOLDER: replace with the client's real hiring process.
export const TUTOR_CHECKS: readonly SelectionCheck[] = [
  { label: 'Degree verified', meta: 'Qualification checked' },
  { label: 'Subject test passed', meta: 'Deep command of the subject' },
  { label: 'English fluency assessed', meta: 'Clear communication' },
  { label: 'Live demo approved', meta: 'Clarity and warmth' },
  { label: 'Background checked', meta: 'Safety first' },
];

export const TUTOR_QUALITIES: readonly { strong: string; rest: string }[] = [
  { strong: 'Qualified graduates and postgraduates', rest: 'with deep command of their subject.' },
  { strong: 'Fluent in your child’s syllabus', rest: '— CBSE, ICSE, IGCSE, IB or American.' },
  { strong: 'Patient and encouraging', rest: '— they build confidence, not just cover chapters.' },
];

export const FOUNDER = {
  name: 'Munavar Ali',
  role: 'Founder & CEO, EduSolve',
  photo: '/images/founder-munavar-ali.jpg',
  quote:
    'We started EduSolve because every parent overseas deserves to know their child is truly cared for. Not a crowded class — one teacher who knows your child by name.',
} as const;

export interface Centre {
  id: string;
  /** Locality shown as the centre's name. */
  name: string;
  city: string;
  street: string;
  locality: string;
  postalCode: string;
  phone: string;
  phoneHref: string;
  mapsUrl: string;
}

// Offline learning centres (both in Kozhikode / Calicut).
export const CENTRES: readonly Centre[] = [
  {
    id: 'puthoormadam',
    name: 'Puthoormadam',
    city: 'Kozhikode',
    street: 'First floor, Ali Complex, Puthoormadam Junction',
    locality: 'Kozhikode',
    postalCode: '673019',
    phone: '+91 73567 41944',
    phoneHref: 'tel:+917356741944',
    mapsUrl:
      'https://www.google.com/maps/place/Edusolve+learning+institute/@11.2379638,75.8678407,1446m/data=!3m1!1e3!4m6!3m5!1s0x20263c260170b4e5:0x74e3b610ae23458!8m2!3d11.2375998!4d75.8705072!16s%2Fg%2F11v3hb2sf8',
  },
  {
    id: 'nadakkavu',
    name: 'Nadakkavu',
    city: 'Kozhikode',
    street: 'First floor, Kidson Building, East Nadakkavu',
    locality: 'Kozhikode',
    postalCode: '673006',
    phone: '+91 94970 85892',
    phoneHref: 'tel:+919497085892',
    mapsUrl:
      'https://www.google.com/maps/place/Skill+fly/@11.2720452,75.7755549,950m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3ba65f86e8990321:0x18bff510bd1168ce!8m2!3d11.2720452!4d75.7781298!16s%2Fg%2F11xnd2cv7g',
  },
];

export interface FeaturedQuote {
  text: string;
  name: string;
  meta: string;
  initial: string;
}

export const HOME_QUOTE: FeaturedQuote = {
  text: 'My son actually looks forward to his maths class now. The tutor is patient and explains until he truly understands.',
  name: 'Parent of a Grade 8 student',
  meta: 'Dubai, UAE',
  initial: 'A',
};

// YouTube testimonial video ids, shared with the Stories page.
export const TESTIMONIAL_VIDEO_IDS: readonly string[] = [
  'h08gxtANy9I', '1MthGrF7qso', 'eXrrdrb1acc', 'cNBHwtQ25NY', 'GYZ49Moa_Wk',
];

export const APP_FEATURES: readonly Step[] = [
  { title: 'Academic classes', text: 'Chapter-wise recorded lessons' },
  { title: 'Chat with experts', text: 'Ask a doubt, get an answer' },
  { title: 'Study materials', text: 'Easy-to-understand notes' },
  { title: 'Question bank', text: 'Practise and test yourself' },
];

export const APP_SCREENS = [
  { src: '/mobile_app_images/mobileimage1.png', alt: 'EduSolve app showing a recorded biology class' },
  { src: '/mobile_app_images/mobileimage2.png', alt: 'EduSolve app showing a question bank quiz' },
] as const;

export interface Faq {
  q: string;
  a: string;
}

export const HOME_FAQS: readonly Faq[] = [
  { q: 'Is the first demo class really free?', a: 'Yes — completely free. You meet the tutor, watch a real one-on-one class, and decide afterwards. No payment details needed.' },
  { q: 'Which curricula and grades do you cover?', a: 'CBSE, ICSE/ISC, IGCSE, IB and the American curriculum, from LKG right through to Grade 12.' },
  { q: 'What are the class timings for Gulf families?', a: 'We schedule around Gulf time zones with flexible evening and weekend slots for the UAE, Qatar, Saudi Arabia, Bahrain, Kuwait and Oman.' },
  { q: 'How are your tutors selected?', a: 'Every tutor goes through subject tests, interviews and a demo evaluation. We match your child based on board, subject and learning style.' },
];
