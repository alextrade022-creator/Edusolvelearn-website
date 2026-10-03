// Curricula taught, shared by the home page panels and the Courses page.

export interface Curriculum {
  id: string;
  name: string;
  short: string;
  grades: string;
  summary: string;
  detail: string;
  tags: readonly string[];
}

export const CURRICULA: readonly Curriculum[] = [
  {
    id: 'cbse',
    name: 'CBSE',
    short: 'CBSE',
    grades: 'LKG – Grade 12',
    summary: 'India’s most widely followed board. NCERT-aligned teaching and focused board-exam preparation.',
    detail:
      'India’s most widely followed board. Our tutors know the NCERT syllabus inside out and prepare students thoroughly for Class 10 and 12 board exams.',
    tags: ['All subjects', 'Board exam prep', 'NCERT-aligned'],
  },
  {
    id: 'icse',
    name: 'ICSE / ISC',
    short: 'ICSE',
    grades: 'LKG – Grade 12',
    summary: 'A detailed, English-first curriculum. We build strong concepts and confident writing skills.',
    detail:
      'A detailed, English-first curriculum that rewards depth. We help students master its wide syllabus with strong concept-building and writing skills.',
    tags: ['Concept-first', 'English medium', 'ISC support'],
  },
  {
    id: 'igcse',
    name: 'IGCSE',
    short: 'IGCSE',
    grades: 'Grade 1 – 10',
    summary: 'Cambridge and Edexcel specialists who guide students through coursework and exams.',
    detail:
      'Cambridge and Edexcel specialists guide students through coursework and exams, building the analytical skills the IGCSE demands.',
    tags: ['Cambridge', 'Edexcel', 'Grades 9–10 focus'],
  },
  {
    // PLACEHOLDER copy for the client to confirm (grades covered, wording).
    id: 'kerala',
    name: 'Kerala Board',
    short: 'Kerala',
    grades: 'Class 1 – 12',
    summary: 'Kerala State syllabus support, from primary classes to the SSLC and Plus Two exams.',
    detail:
      'Tutors who know the Kerala State (SCERT) syllabus support students through their school years, the SSLC exam in Class 10 and the Higher Secondary Plus One and Plus Two years.',
    tags: ['SCERT syllabus', 'SSLC', 'Plus One & Plus Two'],
  },
  {
    id: 'ib',
    name: 'IB',
    short: 'IB',
    grades: 'PYP · MYP · DP',
    summary: 'Tutors fluent in inquiry-based learning, internal assessments and the Diploma Programme.',
    detail:
      'Tutors familiar with the IB framework support inquiry-based learning, internal assessments and the demands of the Diploma Programme.',
    tags: ['PYP', 'MYP', 'Diploma'],
  },
  {
    id: 'american',
    name: 'American',
    short: 'American',
    grades: 'Grade 1 – 12',
    summary: 'Common Core aligned support, plus AP subject tutoring for US-curriculum schools.',
    detail: 'Common Core aligned support plus AP subject tutoring for students in US-curriculum schools across the Gulf.',
    tags: ['Common Core', 'AP support', 'GPA focus'],
  },
];

export const CURRICULUM_NAMES = ['CBSE', 'ICSE', 'IGCSE', 'IB', 'American'] as const;

// Subjects on the Courses page, in groups. Add a subject to its group; the
// "Subjects we teach" count on Our tutors follows by itself.
export const SUBJECT_GROUPS: readonly { name: string; items: readonly string[] }[] = [
  { name: 'Maths and sciences', items: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'] },
  { name: 'Languages', items: ['English', 'Hindi', 'Malayalam', 'Arabic', 'French'] },
  { name: 'Commerce and humanities', items: ['Accountancy', 'Economics', 'Business Studies', 'Social Science', 'Psychology'] },
  { name: 'Early years and skills', items: ['EVS', 'Abacus', 'Physical Education'] },
];

export const SUBJECTS: readonly string[] = SUBJECT_GROUPS.flatMap((group) => group.items);

export interface GradeLevel {
  range: string;
  title: string;
  text: string;
}

export const GRADE_LEVELS: readonly GradeLevel[] = [
  { range: 'LKG – Grade 5', title: 'Early years & primary', text: 'Playful, patient teaching that builds strong reading, writing and number foundations — and a genuine love for learning.' },
  { range: 'Grade 6 – 10', title: 'Middle & secondary', text: 'Concept clarity, homework and doubt support, and structured preparation for crucial board and IGCSE exams.' },
  { range: 'Grade 11 – 12', title: 'Senior secondary', text: 'Focused subject mastery, exam strategy and stream-specific coaching for the years that shape university options.' },
];
