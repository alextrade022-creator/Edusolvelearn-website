// Content for the inner pages: How it works, About, Our tutors and Stories.

import type { FeaturedQuote, Step } from './home';

export interface DetailedStep extends Step {
  time: string;
}

export const HIW_STEPS: readonly DetailedStep[] = [
  { title: 'Enquire', time: '2 minutes', text: 'Send us your child’s grade, board and the subjects they need help with — through our quick form or a simple WhatsApp message. Tell us their goals and any struggles, and we’ll take it from there.' },
  { title: 'Free demo class', time: 'No payment', text: 'We arrange a live, one-on-one demo class so you and your child can experience the teaching first-hand. See the tutor’s style, ask questions, and decide with zero pressure — no card details needed.' },
  { title: 'Matched with the right tutor', time: 'Within days', text: 'Based on your child’s board, subject and personality, we pair them with the tutor who fits best. Not happy? We’ll happily re-match until it feels right.' },
  { title: 'Regular classes & progress tracking', time: 'Ongoing', text: 'Lessons run on a schedule that suits your family, with regular progress reports and parent check-ins so you always know exactly how your child is improving.' },
];

export const HIW_FEATURES: readonly Step[] = [
  { title: 'Truly one-on-one', text: 'The tutor’s full attention stays on your child for the entire class.' },
  { title: 'Curriculum-aligned', text: 'Lessons mapped to your child’s exact board and school syllabus.' },
  { title: 'Flexible scheduling', text: 'Evening and weekend slots that suit Gulf time zones.' },
  { title: 'Homework & doubt support', text: 'Tutors help with school homework and clear doubts as they come up.' },
  { title: 'Exam preparation', text: 'Focused revision and practice ahead of school and board exams.' },
  { title: 'Parent communication', text: 'Regular updates so you’re never left guessing about progress.' },
];

export const HIW_NEEDS: readonly string[] = [
  'A laptop, tablet or phone',
  'A stable internet connection',
  'Headphones (recommended)',
  'A notebook and their textbooks',
];

export const ABOUT_TRUST: readonly Step[] = [
  { title: 'One-on-one, always', text: 'Never a crowded batch. Every class is your child and their tutor.' },
  { title: 'Vetted tutors', text: 'Interviewed, subject-tested and demo-approved before they teach.' },
  { title: 'Gulf-friendly timings', text: 'Evening and weekend slots that fit life across six Gulf countries.' },
  { title: 'Transparent progress', text: 'Regular reports and parent updates — you always know where things stand.' },
];

export interface Person {
  name: string;
  role: string;
  bio: string;
  photo: string | null;
}

export const ABOUT_FOUNDERS: readonly Person[] = [
  { name: 'Munavar Ali', role: 'Founder & CEO', bio: 'Leads EduSolve’s vision and teaching standards, driven by a belief that every child deserves personal attention.', photo: '/images/founder-munavar-ali.jpg' },
  { name: 'Muhammed Jifri', role: 'Co-founder & CCO', bio: 'Heads growth and family relationships, making sure every parent’s experience with EduSolve feels warm and effortless.', photo: null },
];

export const TUTOR_SELECTION_STAGES: readonly Step[] = [
  { title: 'Application & screening', text: 'We review qualifications, teaching experience and curriculum expertise before anyone moves forward.' },
  { title: 'Subject test & interview', text: 'A subject-knowledge test plus an interview to gauge communication, patience and teaching approach.' },
  { title: 'Live demo evaluation', text: 'Candidates teach a live demo lesson that our team assesses for clarity, warmth and engagement.' },
  { title: 'Onboarding & ongoing review', text: 'Selected tutors are onboarded to our standards, then reviewed continuously through parent feedback.' },
];

// Confirmed by the client (carried over from the previous site).
export const TESTIMONIAL_STATS: readonly { value: string; label: string }[] = [
  { value: '4.9/5', label: 'Average parent rating' },
  { value: '1000+', label: 'Expert tutors' },
  { value: '12+', label: 'Countries served' },
  { value: '95%', label: 'Families who continue' },
];

export const TESTIMONIAL_QUOTES: readonly FeaturedQuote[] = [
  { text: 'My son actually looks forward to his maths class now. The tutor is patient and explains until he truly understands. Best decision we made this year.', name: 'Parent of Grade 8 student', meta: 'Dubai, UAE', initial: 'A' },
  { text: 'Being in Qatar, we worried about finding quality tuition. EduSolve matched us with a wonderful teacher who knows the CBSE syllabus perfectly.', name: 'Parent of Grade 10 student', meta: 'Doha, Qatar', initial: 'S' },
  { text: 'The one-on-one attention changed everything. My daughter’s confidence in physics has grown so much before her board exams.', name: 'Parent of Grade 12 student', meta: 'Riyadh, Saudi Arabia', initial: 'R' },
  { text: 'Flexible timings that actually work with our schedule, and regular updates so I always know how she’s doing. Truly hassle-free.', name: 'Parent of Grade 6 student', meta: 'Manama, Bahrain', initial: 'F' },
  { text: 'The free demo sold us instantly. No pressure, just a great teacher who connected with my son from the very first class.', name: 'Parent of Grade 9 student', meta: 'Kuwait City, Kuwait', initial: 'M' },
  { text: 'IGCSE prep felt overwhelming until we found EduSolve. The tutor broke everything down and kept my daughter calm and prepared.', name: 'Parent of Grade 10 student', meta: 'Muscat, Oman', initial: 'H' },
];
