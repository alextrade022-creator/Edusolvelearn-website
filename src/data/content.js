// Page content data. Keeping copy out of the JSX keeps the page components
// focused on layout and makes future edits (new tutor, new FAQ) trivial.

// ---- Shared ----
export const CURRICULA_CHIPS = ['CBSE', 'ICSE', 'IGCSE', 'IB', 'American'];

export const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi',
  'Malayalam', 'Arabic', 'Computer Science', 'Accountancy', 'Economics',
  'Business Studies', 'Social Science', 'EVS', 'French',
];

// YouTube Shorts / testimonial video ids reused on Home + Testimonials.
export const TESTIMONIAL_VIDEO_IDS = [
  'h08gxtANy9I', '1MthGrF7qso', 'eXrrdrb1acc', 'cNBHwtQ25NY', 'GYZ49Moa_Wk',
];

// ---- Home ----
export const HOME_STATS = [
  { key: 'hours', target: 100000, suffix: '+', label: 'Class hours taught' },
  { key: 'tutors', target: 1000, suffix: '+', label: 'Expert tutors' },
  { key: 'countries', target: 12, suffix: '+', label: 'Countries served' },
  { key: 'years', target: 5, suffix: '+', label: 'Years of trust' },
];

export const HOME_CURRICULA = [
  { abbr: 'CBSE', name: 'CBSE', note: 'India’s most-followed board, taught with care.', tone: 'blush' },
  { abbr: 'ICSE', name: 'ICSE / ISC', note: 'Detailed, concept-first English-medium learning.', tone: 'leaf' },
  { abbr: 'IG', name: 'IGCSE', note: 'Cambridge & Edexcel specialists for Grades 9–10.', tone: 'blush' },
  { abbr: 'IB', name: 'IB', note: 'PYP, MYP & DP tutors who know the framework.', tone: 'leaf' },
  { abbr: 'US', name: 'American', note: 'Common Core & AP support for US-curriculum schools.', tone: 'blush' },
];

export const HOME_BENEFITS = [
  { title: 'Undivided 1-on-1 attention', text: 'One student, one teacher. Every lesson moves at your child’s pace — never rushed, never left behind.' },
  { title: 'Hand-picked expert tutors', text: 'Every tutor is interviewed, subject-tested and demo-vetted before they ever teach your child.' },
  { title: 'Gulf-friendly timings', text: 'Evening and weekend slots that fit UAE, Qatar, Saudi, Bahrain, Kuwait & Oman schedules.' },
  { title: 'Real progress tracking', text: 'Regular reports and parent updates so you always know exactly how your child is doing.' },
  { title: 'Curriculum-aligned', text: 'Lessons mapped to your child’s exact board and school syllabus — not generic content.' },
  { title: 'Start with a free demo', text: 'Meet the tutor and try a real class before you commit. No card, no pressure.' },
];

export const HOME_STEPS = [
  { n: '1', title: 'Enquire', text: 'Tell us your child’s grade, board and goals — by form or a quick WhatsApp message.' },
  { n: '2', title: 'Free Demo', text: 'Sit in on a live one-on-one demo class and see the teaching style for yourself.' },
  { n: '3', title: 'Matched Tutor', text: 'We pair your child with the tutor who fits best — subject, board and personality.' },
  { n: '4', title: 'Progress Tracking', text: 'Ongoing lessons with regular reports, feedback and parent check-ins.' },
];

// Home page shows a preview of the first few real tutors — see TEACHERS_TUTORS
// (imported directly in Home.jsx) as the single source of truth.

export const HOME_FAQS = [
  { q: 'Is the first demo class really free?', a: 'Yes — completely free. You meet the tutor, watch a real one-on-one class, and only decide afterwards. No payment details needed to book it.' },
  { q: 'Which curricula and grades do you cover?', a: 'CBSE, ICSE/ISC, IGCSE, IB and the American curriculum, from LKG right through to Grade 12.' },
  { q: 'What are the class timings for Gulf families?', a: 'We schedule around Gulf time zones with flexible evening and weekend slots for the UAE, Qatar, Saudi Arabia, Bahrain, Kuwait and Oman.' },
  { q: 'How are your tutors selected?', a: 'Every tutor goes through subject tests, interviews and a demo evaluation. We match your child based on board, subject and learning style.' },
];

// ---- Courses ----
export const COURSES_CURRICULA = [
  { abbr: 'CBSE', name: 'CBSE', grades: 'LKG – Grade 12', tone: 'blush', text: 'India’s most widely followed board. Our tutors know the NCERT syllabus inside out and prepare students thoroughly for Class 10 and 12 board exams.', tags: ['All subjects', 'Board exam prep', 'NCERT-aligned'] },
  { abbr: 'ICSE', name: 'ICSE / ISC', grades: 'LKG – Grade 12', tone: 'leaf', text: 'A detailed, English-first curriculum that rewards depth. We help students master its wide syllabus with strong concept-building and writing skills.', tags: ['Concept-first', 'English medium', 'ISC support'] },
  { abbr: 'IG', name: 'IGCSE', grades: 'Grade 1 – 10', tone: 'blush', text: 'Cambridge and Edexcel specialists guide students through coursework and exams, building the analytical skills the IGCSE demands.', tags: ['Cambridge', 'Edexcel', 'Grades 9–10 focus'] },
  { abbr: 'IB', name: 'IB', grades: 'PYP · MYP · DP', tone: 'leaf', text: 'Tutors familiar with the IB framework support inquiry-based learning, internal assessments and the demands of the Diploma Programme.', tags: ['PYP', 'MYP', 'Diploma'] },
  { abbr: 'US', name: 'American Curriculum', grades: 'Grade 1 – 12', tone: 'blush', text: 'Common Core aligned support plus AP subject tutoring for students in US-curriculum schools across the Gulf.', tags: ['Common Core', 'AP support', 'GPA focus'] },
];

export const COURSES_LEVELS = [
  { range: 'LKG – GRADE 5', title: 'Early Years & Primary', text: 'Playful, patient teaching that builds strong reading, writing and number foundations — and a genuine love for learning.' },
  { range: 'GRADE 6 – 10', title: 'Middle & Secondary', text: 'Concept clarity, homework and doubt support, and structured preparation for crucial board and IGCSE exams.' },
  { range: 'GRADE 11 – 12', title: 'Senior Secondary', text: 'Focused subject mastery, exam strategy and stream-specific coaching for the years that shape university options.' },
];

export const COURSES_COUNTRIES = [
  { flag: '🇦🇪', name: 'UAE' },
  { flag: '🇶🇦', name: 'Qatar' },
  { flag: '🇸🇦', name: 'Saudi Arabia' },
  { flag: '🇧🇭', name: 'Bahrain' },
  { flag: '🇰🇼', name: 'Kuwait' },
  { flag: '🇴🇲', name: 'Oman' },
];

// ---- How It Works ----
export const HIW_STEPS = [
  { n: '1', icon: '📝', title: 'Enquire', time: '2 minutes', text: 'Send us your child’s grade, board and the subjects they need help with — through our quick form or a simple WhatsApp message. Tell us their goals and any struggles, and we’ll take it from there.' },
  { n: '2', icon: '🎥', title: 'Free Demo Class', time: 'No payment', text: 'We arrange a live, one-on-one demo class so you and your child can experience the teaching first-hand. See the tutor’s style, ask questions, and decide with zero pressure — no card details needed.' },
  { n: '3', icon: '🤝', title: 'Matched with the Right Tutor', time: 'Within days', text: 'Based on your child’s board, subject and personality, we pair them with the tutor who fits best. Not happy? We’ll happily re-match until it feels right.' },
  { n: '4', icon: '📈', title: 'Regular Classes & Progress Tracking', time: 'Ongoing', text: 'Lessons run on a schedule that suits your family, with regular progress reports and parent check-ins so you always know exactly how your child is improving.' },
];

export const HIW_FEATURES = [
  { icon: '👤', title: 'Truly one-on-one', text: 'The tutor’s full attention stays on your child for the entire class.' },
  { icon: '🎯', title: 'Curriculum-aligned', text: 'Lessons mapped to your child’s exact board and school syllabus.' },
  { icon: '🗓️', title: 'Flexible scheduling', text: 'Evening and weekend slots that suit Gulf time zones.' },
  { icon: '📚', title: 'Homework & doubt support', text: 'Tutors help with school homework and clear doubts as they come up.' },
  { icon: '📝', title: 'Exam preparation', text: 'Focused revision and practice ahead of school and board exams.' },
  { icon: '💬', title: 'Parent communication', text: 'Regular updates so you’re never left guessing about progress.' },
];

export const HIW_NEEDS = [
  { icon: '💻', label: 'A laptop, tablet or phone' },
  { icon: '📶', label: 'A stable internet connection' },
  { icon: '🎧', label: 'Headphones (recommended)' },
  { icon: '📓', label: 'A notebook & their textbooks' },
];

// ---- About ----
export const ABOUT_TRUST = [
  { icon: '👨‍🏫', title: 'One-on-one, always', text: 'Never a crowded batch. Every class is your child and their tutor.' },
  { icon: '✅', title: 'Vetted tutors', text: 'Interviewed, subject-tested and demo-approved before they teach.' },
  { icon: '🕌', title: 'Gulf-friendly timings', text: 'Evening and weekend slots that fit life across six Gulf countries.' },
  { icon: '📊', title: 'Transparent progress', text: 'Regular reports and parent updates — you always know where things stand.' },
];

export const ABOUT_FOUNDERS = [
  { name: 'Munavar Ali', role: 'Founder & CEO', bio: 'Leads EduSolve’s vision and teaching standards, driven by a belief that every child deserves personal attention.', photo: '/images/founder-munavar-ali.jpg' },
  { name: 'Muhammed Jifri', role: 'Co-founder & CCO', bio: 'Heads growth and family relationships, making sure every parent’s experience with EduSolve feels warm and effortless.', photo: null },
];

// ---- Teachers ----
export const TEACHERS_VETTING = [
  { n: '1', title: 'Application & screening', text: 'We review qualifications, teaching experience and curriculum expertise before anyone moves forward.' },
  { n: '2', title: 'Subject & interview', text: 'A subject-knowledge test plus an interview to gauge communication, patience and teaching approach.' },
  { n: '3', title: 'Demo evaluation', text: 'Candidates teach a live demo lesson that our team assesses for clarity, warmth and engagement.' },
  { n: '4', title: 'Onboarding & monitoring', text: 'Selected tutors are onboarded to our standards, then reviewed continuously through parent feedback.' },
];

export const TEACHERS_QUALITIES = [
  { icon: '🎓', title: 'Subject expertise', text: 'Qualified graduates and postgraduates with deep command of the boards they teach.' },
  { icon: '❤️', title: 'Genuine care', text: 'Patient, encouraging teachers who build confidence, not just cover chapters.' },
  { icon: '🌐', title: 'Curriculum fluency', text: 'Day-to-day experience with CBSE, ICSE, IGCSE, IB and American syllabi.' },
];

// Real EduSolve tutors. Each teacher lists the subject(s) they teach; the
// photo lives in /public/images/teachers/.
export const TEACHERS_TUTORS = [
  { name: 'Aleena', photo: '/images/teachers/aleena.jpeg', subjects: ['Science'] },
  { name: 'Fabeena', photo: '/images/teachers/fabeena.jpeg', subjects: ['Mathematics'] },
  { name: 'Suseela', photo: '/images/teachers/suseela.jpeg', subjects: ['Hindi'] },
  { name: 'Asthami', photo: '/images/teachers/asthami.jpeg', subjects: ['Science'] },
  { name: 'Afeefa', photo: '/images/teachers/afeefa.jpeg', subjects: ['Mathematics'] },
  { name: 'Arwa Jasmin', photo: '/images/teachers/arwa-jasmin.jpeg', subjects: ['English', 'Mathematics', 'EVS'] },
];

// ---- Testimonials ----
export const TESTIMONIAL_STATS = [
  { value: '4.9/5', label: 'Average parent rating' },
  { value: '1000+', label: 'Expert tutors' },
  { value: '12+', label: 'Countries served' },
  { value: '95%', label: 'Families who continue' },
];

export const TESTIMONIAL_QUOTES = [
  { text: 'My son actually looks forward to his maths class now. The tutor is patient and explains until he truly understands. Best decision we made this year.', name: 'Parent of Grade 8 student', meta: 'Dubai, UAE', initial: 'A', tone: 'blush' },
  { text: 'Being in Qatar, we worried about finding quality tuition. EduSolve matched us with a wonderful teacher who knows the CBSE syllabus perfectly.', name: 'Parent of Grade 10 student', meta: 'Doha, Qatar', initial: 'S', tone: 'leaf' },
  { text: 'The one-on-one attention changed everything. My daughter’s confidence in physics has grown so much before her board exams.', name: 'Parent of Grade 12 student', meta: 'Riyadh, Saudi Arabia', initial: 'R', tone: 'blush' },
  { text: 'Flexible timings that actually work with our schedule, and regular updates so I always know how she’s doing. Truly hassle-free.', name: 'Parent of Grade 6 student', meta: 'Manama, Bahrain', initial: 'F', tone: 'leaf' },
  { text: 'The free demo sold us instantly. No pressure, just a great teacher who connected with my son from the very first class.', name: 'Parent of Grade 9 student', meta: 'Kuwait City, Kuwait', initial: 'M', tone: 'blush' },
  { text: 'IGCSE prep felt overwhelming until we found EduSolve. The tutor broke everything down and kept my daughter calm and prepared.', name: 'Parent of Grade 10 student', meta: 'Muscat, Oman', initial: 'H', tone: 'leaf' },
];

// ---- Contact form option lists ----
export const CONTACT_FORM_OPTIONS = {
  countries: ['Select country', 'United Arab Emirates', 'Qatar', 'Saudi Arabia', 'Bahrain', 'Kuwait', 'Oman', 'Other'],
  grades: ['Select grade', 'LKG – UKG', 'Grade 1 – 5', 'Grade 6 – 8', 'Grade 9 – 10', 'Grade 11 – 12'],
  curricula: ['Select curriculum', 'CBSE', 'ICSE / ISC', 'IGCSE', 'IB', 'American', 'Other'],
  times: ['No preference', 'Weekday evening', 'Weekend morning', 'Weekend evening', 'Flexible'],
};

// ---- FAQ ----
export const FAQ_GROUPS = [
  {
    icon: '🚀', title: 'Getting Started', items: [
      { q: 'Is the first demo class really free?', a: 'Yes — completely free. Your child meets the tutor, experiences a real one-on-one class, and you decide afterwards. No payment details are needed to book it.' },
      { q: 'How do I book a demo?', a: 'Just fill in the form on our Contact page or message us on WhatsApp with your child’s grade, board and subjects. We’ll arrange a convenient time.' },
      { q: 'What does my child need for online classes?', a: 'A laptop, tablet or phone, a stable internet connection, headphones (recommended), and their notebook and textbooks. That’s it.' },
    ],
  },
  {
    icon: '👨‍🏫', title: 'Tutors', items: [
      { q: 'How are your tutors selected?', a: 'Every tutor goes through application screening, a subject-knowledge test, an interview and a live demo evaluation before they teach. We also monitor quality through ongoing parent feedback.' },
      { q: 'Can we change tutors if it’s not the right fit?', a: 'Absolutely. If the match doesn’t feel right, tell us and we’ll happily re-match your child with another tutor at no extra cost.' },
      { q: 'Will my child have the same tutor each class?', a: 'Yes — consistency matters. Your child works with the same dedicated tutor so a real teaching relationship can grow.' },
    ],
  },
  {
    icon: '💳', title: 'Pricing & Payment', items: [
      { q: 'How much do classes cost?', a: 'Fees depend on your child’s grade, curriculum, subjects and the number of classes per week. After your free demo we’ll share a clear, personalised plan — with no hidden charges. Message us on WhatsApp for a quote.' },
      { q: 'Are there any long-term contracts?', a: 'No lock-in contracts. We earn your continued trust class by class. Most families choose flexible monthly plans.' },
      { q: 'How do I make payments from the Gulf?', a: 'We support convenient payment options for Gulf-based families. Our team will guide you through the simplest method for your country.' },
    ],
  },
  {
    icon: '📚', title: 'Curricula & Subjects', items: [
      { q: 'Which curricula do you cover?', a: 'CBSE, ICSE/ISC, IGCSE, IB and the American curriculum, from LKG through Grade 12.' },
      { q: 'Which subjects can my child learn?', a: 'All core subjects including Maths, Physics, Chemistry, Biology, English, languages, Computer Science, Accountancy, Economics and more. Ask us about any specific subject.' },
      { q: 'Do you help with board exam preparation?', a: 'Yes. Our tutors provide focused revision, past-paper practice and exam strategy for Class 10 and 12 boards, IGCSE and IB assessments.' },
    ],
  },
  {
    icon: '🗓️', title: 'Scheduling', items: [
      { q: 'What are the class timings?', a: 'We schedule around Gulf time zones with flexible evening and weekend slots to suit the UAE, Qatar, Saudi Arabia, Bahrain, Kuwait and Oman.' },
      { q: 'What if my child misses a class?', a: 'Let us know in advance and we’ll do our best to reschedule. We keep things flexible around your family’s needs.' },
      { q: 'How many classes per week do you recommend?', a: 'It depends on your child’s goals and subjects. Two to three classes per subject each week works well for most — we’ll advise after the demo.' },
    ],
  },
];

// ---- Legal pages ----
export const PRIVACY_SECTIONS = [
  { h: '1. Introduction', body: ['EduSolve ("we", "us", "our") provides online one-on-one tuition services to families, primarily those based in the Gulf region. This Privacy Policy explains how we collect, use, store and protect your personal information when you use our website and services.', 'By using our website or booking a class, you agree to the practices described in this policy.'] },
  { h: '2. Information We Collect', body: ['We may collect the parent or guardian’s name, the student’s name and grade, contact details (WhatsApp number, phone, email), country of residence, curriculum and subject preferences, and any information you share when booking a demo or communicating with us.', 'We may also collect limited technical data such as device and browser information to improve our website.'] },
  { h: '3. How We Use Your Information', body: ['We use your information to arrange demo classes, match your child with a suitable tutor, schedule and deliver lessons, share progress updates, process payments, and respond to your enquiries. We may also use it to send service-related updates.'] },
  { h: '4. Sharing of Information', body: ['We share necessary details with the assigned tutor solely to deliver lessons. We do not sell your personal information. We may share data with trusted service providers (such as payment or communication tools) only as needed to operate our service, and where required by law.'] },
  { h: '5. Data Security', body: ['We take reasonable measures to protect your information against unauthorised access, loss or misuse. However, no method of transmission over the internet is completely secure.'] },
  { h: '6. Children’s Privacy', body: ['Our services are arranged by parents or guardians on behalf of students. We rely on parents to provide consent for their child’s participation and information.'] },
  { h: '7. Your Rights', body: ['You may request access to, correction of, or deletion of your personal information at any time by contacting us. You may also opt out of non-essential communications.'] },
  { h: '8. Changes to This Policy', body: ['We may update this policy from time to time. Any changes will be posted on this page with a revised "last updated" date.'] },
];

export const TERMS_SECTIONS = [
  { h: '1. Acceptance of Terms', body: ['By accessing our website or using EduSolve’s tuition services, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services.'] },
  { h: '2. Our Services', body: ['EduSolve provides online one-on-one tuition across various curricula and grade levels. We arrange demo classes, match students with tutors, and deliver scheduled lessons. A free demo class is offered before any paid engagement.'] },
  { h: '3. Bookings & Demo Classes', body: ['Demo classes are offered free of charge and without obligation. Continued classes are subject to a plan agreed between you and EduSolve.'] },
  { h: '4. Fees & Payment', body: ['Fees are communicated based on grade, curriculum, subjects and class frequency. Payment terms will be shared before classes begin. All fees are payable in advance unless otherwise agreed. [Insert your specific fee, currency and payment terms here.]'] },
  { h: '5. Rescheduling & Cancellations', body: ['We ask for reasonable advance notice to reschedule a class. Our cancellation and refund terms will be shared at the time of enrolment. [Insert your specific cancellation and refund policy here.]'] },
  { h: '6. Conduct & Responsibilities', body: ['Students and parents agree to attend scheduled classes on time, maintain a respectful learning environment, and ensure a suitable device and internet connection. EduSolve tutors commit to professionalism, punctuality and care.'] },
  { h: '7. Intellectual Property', body: ['All teaching materials, content and branding provided by EduSolve remain our property or that of our licensors and may not be reproduced or redistributed without permission.'] },
  { h: '8. Limitation of Liability', body: ['EduSolve strives to deliver high-quality tuition but does not guarantee specific academic outcomes. To the extent permitted by law, our liability is limited to the fees paid for the affected services.'] },
  { h: '9. Governing Law & Changes', body: ['These terms are governed by the applicable laws of [JURISDICTION]. We may update these terms from time to time, with changes posted on this page.'] },
];
