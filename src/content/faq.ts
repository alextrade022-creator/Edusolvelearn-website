// Full FAQ, grouped. Also used for the FAQPage structured data.

import type { Faq } from './home';

export interface FaqGroup {
  title: string;
  items: readonly Faq[];
}

export const FAQ_GROUPS: readonly FaqGroup[] = [
  {
    title: 'Getting started',
    items: [
      { q: 'Is the first demo class really free?', a: 'Yes — completely free. Your child meets the tutor, experiences a real one-on-one class, and you decide afterwards. No payment details are needed to book it.' },
      { q: 'How do I book a demo?', a: 'Just fill in the form on our Contact page or message us on WhatsApp with your child’s grade, board and subjects. We’ll arrange a convenient time.' },
      { q: 'What does my child need for online classes?', a: 'A laptop, tablet or phone, a stable internet connection, headphones (recommended), and their notebook and textbooks. That’s it.' },
    ],
  },
  {
    title: 'Tutors',
    items: [
      { q: 'How are your tutors selected?', a: 'Every tutor goes through application screening, a subject-knowledge test, an interview and a live demo evaluation before they teach. We also monitor quality through ongoing parent feedback.' },
      { q: 'Can we change tutors if it’s not the right fit?', a: 'Absolutely. If the match doesn’t feel right, tell us and we’ll happily re-match your child with another tutor at no extra cost.' },
      { q: 'Will my child have the same tutor each class?', a: 'Yes — consistency matters. Your child works with the same dedicated tutor so a real teaching relationship can grow.' },
    ],
  },
  {
    title: 'Pricing & payment',
    items: [
      { q: 'How much do classes cost?', a: 'Fees depend on your child’s grade, curriculum, subjects and the number of classes per week. After your free demo we’ll share a clear, personalised plan — with no hidden charges. Message us on WhatsApp for a quote.' },
      { q: 'Are there any long-term contracts?', a: 'No lock-in contracts. We earn your continued trust class by class. Most families choose flexible monthly plans.' },
      { q: 'How do I make payments from the Gulf?', a: 'We support convenient payment options for Gulf-based families. Our team will guide you through the simplest method for your country.' },
    ],
  },
  {
    title: 'Curricula & subjects',
    items: [
      { q: 'Which curricula do you cover?', a: 'CBSE, ICSE/ISC, IGCSE, IB and the American curriculum, from LKG through Grade 12.' },
      { q: 'Which subjects can my child learn?', a: 'All core subjects including Maths, Physics, Chemistry, Biology, English, languages, Computer Science, Accountancy, Economics and more. Ask us about any specific subject.' },
      { q: 'Do you help with board exam preparation?', a: 'Yes. Our tutors provide focused revision, past-paper practice and exam strategy for Class 10 and 12 boards, IGCSE and IB assessments.' },
    ],
  },
  {
    title: 'Scheduling',
    items: [
      { q: 'What are the class timings?', a: 'We schedule around Gulf time zones with flexible evening and weekend slots to suit the UAE, Qatar, Saudi Arabia, Bahrain, Kuwait and Oman.' },
      { q: 'What if my child misses a class?', a: 'Let us know in advance and we’ll do our best to reschedule. We keep things flexible around your family’s needs.' },
      { q: 'How many classes per week do you recommend?', a: 'It depends on your child’s goals and subjects. Two to three classes per subject each week works well for most — we’ll advise after the demo.' },
    ],
  },
];
