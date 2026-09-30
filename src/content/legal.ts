// Legal page copy. Placeholder text in [brackets] must be reviewed by a legal
// professional before launch.

export interface LegalSection {
  heading: string;
  body: readonly string[];
}

export const PRIVACY_SECTIONS: readonly LegalSection[] = [
  {
    heading: '1. Introduction',
    body: [
      'EduSolve ("we", "us", "our") provides online one-on-one tuition services to families, primarily those based in the Gulf region. This Privacy Policy explains how we collect, use, store and protect your personal information when you use our website and services.',
      'By using our website or booking a class, you agree to the practices described in this policy.',
    ],
  },
  {
    heading: '2. Information We Collect',
    body: [
      'We may collect the parent or guardian’s name, the student’s name and grade, contact details (WhatsApp number, phone, email), country of residence, curriculum and subject preferences, and any information you share when booking a demo or communicating with us.',
      'We may also collect limited technical data such as device and browser information to improve our website.',
    ],
  },
  {
    heading: '3. How We Use Your Information',
    body: [
      'We use your information to arrange demo classes, match your child with a suitable tutor, schedule and deliver lessons, share progress updates, process payments, and respond to your enquiries. We may also use it to send service-related updates.',
    ],
  },
  {
    heading: '4. Sharing of Information',
    body: [
      'We share necessary details with the assigned tutor solely to deliver lessons. We do not sell your personal information. We may share data with trusted service providers (such as payment or communication tools) only as needed to operate our service, and where required by law.',
    ],
  },
  {
    heading: '5. Data Security',
    body: [
      'We take reasonable measures to protect your information against unauthorised access, loss or misuse. However, no method of transmission over the internet is completely secure.',
    ],
  },
  {
    heading: '6. Children’s Privacy',
    body: [
      'Our services are arranged by parents or guardians on behalf of students. We rely on parents to provide consent for their child’s participation and information.',
    ],
  },
  {
    heading: '7. Your Rights',
    body: [
      'You may request access to, correction of, or deletion of your personal information at any time by contacting us. You may also opt out of non-essential communications.',
    ],
  },
  {
    heading: '8. Changes to This Policy',
    body: [
      'We may update this policy from time to time. Any changes will be posted on this page with a revised "last updated" date.',
    ],
  },
];

export const TERMS_SECTIONS: readonly LegalSection[] = [
  {
    heading: '1. Acceptance of Terms',
    body: [
      'By accessing our website or using EduSolve’s tuition services, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services.',
    ],
  },
  {
    heading: '2. Our Services',
    body: [
      'EduSolve provides online one-on-one tuition across various curricula and grade levels. We arrange demo classes, match students with tutors, and deliver scheduled lessons. A free demo class is offered before any paid engagement.',
    ],
  },
  {
    heading: '3. Bookings & Demo Classes',
    body: [
      'Demo classes are offered free of charge and without obligation. Continued classes are subject to a plan agreed between you and EduSolve.',
    ],
  },
  {
    heading: '4. Fees & Payment',
    body: [
      'Fees are communicated based on grade, curriculum, subjects and class frequency. Payment terms will be shared before classes begin. All fees are payable in advance unless otherwise agreed. [Insert your specific fee, currency and payment terms here.]',
    ],
  },
  {
    heading: '5. Rescheduling & Cancellations',
    body: [
      'We ask for reasonable advance notice to reschedule a class. Our cancellation and refund terms will be shared at the time of enrolment. [Insert your specific cancellation and refund policy here.]',
    ],
  },
  {
    heading: '6. Conduct & Responsibilities',
    body: [
      'Students and parents agree to attend scheduled classes on time, maintain a respectful learning environment, and ensure a suitable device and internet connection. EduSolve tutors commit to professionalism, punctuality and care.',
    ],
  },
  {
    heading: '7. Intellectual Property',
    body: [
      'All teaching materials, content and branding provided by EduSolve remain our property or that of our licensors and may not be reproduced or redistributed without permission.',
    ],
  },
  {
    heading: '8. Limitation of Liability',
    body: [
      'EduSolve strives to deliver high-quality tuition but does not guarantee specific academic outcomes. To the extent permitted by law, our liability is limited to the fees paid for the affected services.',
    ],
  },
  {
    heading: '9. Governing Law & Changes',
    body: [
      'These terms are governed by the applicable laws of [JURISDICTION]. We may update these terms from time to time, with changes posted on this page.',
    ],
  },
];
