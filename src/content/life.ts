// Life at EduSolve items. Photos live in public/Life_at_Edusolve_Images/<folder>/,
// one folder per category. To add a photo: drop it in its folder (web-safe file
// name: letters, numbers, hyphens) and add an entry below.
// Student photos need written parental consent before publishing.

export type LifeCategory = 'Milestones' | 'Achievements' | 'Trips & events' | 'Our centres' | 'Team';

export interface LifeItem {
  id: string;
  category: LifeCategory;
  /** Other categories this item also belongs to (it shows under those filters too). */
  alsoIn?: readonly LifeCategory[];
  title: string;
  /** Longer text, shown on the featured item. */
  summary?: string;
  /** A line or two shown under the enlarged photo (falls back to `summary`). */
  description?: string;
  /** Path under public/. */
  photo: string;
  alt: string;
  /** Which part of the photo to keep when it's cropped to a square. */
  focus?: 'center' | 'top' | 'bottom';
  featured?: boolean;
}

export const LIFE_CATEGORIES: readonly LifeCategory[] = ['Milestones', 'Achievements', 'Trips & events', 'Our centres', 'Team'];

const DIR = '/Life_at_Edusolve_Images';

// Achievement posters: name and CBSE 2026 score as printed on each poster.
const achievement = (id: string, name: string, score: string): LifeItem => ({
  id: `achievement-${id}`,
  category: 'Achievements',
  title: `${name}: ${score} in CBSE 2026`,
  description: `${name} scored ${score} in CBSE 2026. Congratulations from all of us at EduSolve.`,
  photo: `${DIR}/achievement_images/${id}.jpg`,
  alt: `EduSolve proud achiever poster: ${name}, ${score} in CBSE 2026`,
});

// Order = the order shown under "All" (the featured item sits on top; the next
// six show before "Show more"). Milestones run newest first; Achievements from
// the highest score down.
export const LIFE_ITEMS: readonly LifeItem[] = [
  {
    id: 'five-years',
    category: 'Milestones',
    title: 'Five years of EduSolve',
    summary:
      'Founded in Kozhikode in 2021, EduSolve marks five years of one-on-one teaching. Thank you to every family, student and tutor who has been part of it.',
    photo: `${DIR}/milestone_images/edusolve_turns5_org_img.png`,
    alt: 'A hand holding an EduSolve fifth anniversary gift box in front of the EduSolve sign',
    featured: true,
  },
  {
    id: 'nadakkavu-centre-opening',
    category: 'Milestones',
    alsoIn: ['Our centres'],
    title: 'Our Nadakkavu centre opens',
    description:
      'Our learning centre at East Nadakkave, Kozhikode, opened its doors before EduSolve turned five. You’ll find it on the first floor of the Kidson building.',
    photo: `${DIR}/milestone_images/new_center_Nadakkavu1.png`,
    alt: 'The reception desk at the EduSolve Nadakkavu centre, decorated with red and white balloons for its opening',
  },
  {
    id: 'centre-one-on-one',
    category: 'Our centres',
    title: 'One-on-one teaching at our learning centre',
    description: 'A tutor and a student working through a lesson together at one of our learning centres in Kozhikode.',
    photo: `${DIR}/our_center_images/edusolve_1on1class.jpeg`,
    alt: 'A tutor working one-on-one with a student at an EduSolve centre',
    focus: 'bottom',
  },
  achievement('elsa-maria', 'Elsa Maria', '95.6%'),
  {
    id: 'team-academic',
    category: 'Team',
    title: 'The academic team',
    description: 'The EduSolve academic team, together around the meeting table.',
    photo: `${DIR}/team_images/academic_team.jpg`,
    alt: 'The EduSolve academic team around a meeting table',
    focus: 'bottom',
  },
  achievement('aysha', 'Aysha', '93.2%'),
  {
    id: 'centre-classroom-1',
    category: 'Our centres',
    title: 'A class in session at our centre',
    description: 'Students at their desks during a class at one of our learning centres in Kozhikode.',
    photo: `${DIR}/our_center_images/edusolve_classroom1.jpeg`,
    alt: 'A teacher with students at their desks in an EduSolve classroom',
    focus: 'bottom',
  },
  achievement('adwaith-shabarish', 'Adwaith Shabarish', '91%'),
  {
    id: 'team-at-work',
    category: 'Team',
    title: 'The EduSolve team at work',
    description: 'A working day at EduSolve, with the team at their laptops.',
    photo: `${DIR}/team_images/edusolve_staff_photo.jpg`,
    alt: 'EduSolve staff working at laptops in the office',
    focus: 'bottom',
  },
  achievement('joshitha', 'Joshitha', '89%'),
  {
    id: 'centre-classroom-2',
    category: 'Our centres',
    title: 'Classroom teaching at our centre',
    description: 'A teacher at the whiteboard during a class at one of our learning centres in Kozhikode.',
    photo: `${DIR}/our_center_images/edusolve_classroom2.jpeg`,
    alt: 'A teacher writing on a whiteboard in front of a class at an EduSolve centre',
  },
  achievement('abhishankar', 'Abhishankar', '83.3%'),
  achievement('rhan-jamsheer', 'Rhan Jamsheer', '82.2%'),
  achievement('sara', 'Sara', '73%'),
];

/** Every category an item belongs to, its main one first. */
export const lifeCategories = (item: LifeItem): readonly LifeCategory[] => [item.category, ...(item.alsoIn ?? [])];

/** A step of the home page's pinned Life section: one photo with one phrase of the heading. */
export interface LifeChapter {
  /** The id of an item in LIFE_PREVIEW. */
  id: string;
  phrase: string;
  /** The wide photo shown large while this chapter plays (path under public/); the tile keeps the item's own photo. */
  photo: string;
  /** Which part of the wide photo to keep when its top and bottom are trimmed: 0 (top) to 100 (bottom). */
  focus: number;
}

const byId = (id: string): LifeItem[] => LIFE_ITEMS.filter((item) => item.id === id);

// Home page preview: one item from each category that has photos.
export const LIFE_PREVIEW: readonly LifeItem[] = [
  ...byId('five-years'),
  ...byId('achievement-elsa-maria'),
  ...byId('centre-one-on-one'),
  ...byId('team-academic'),
];

// Played in this order; together the phrases make up the section heading.
// The wide (16:9) photos live in public/homepage_life_at_edusolve_section_images/.
const CHAPTER_DIR = '/homepage_life_at_edusolve_section_images';

export const LIFE_CHAPTERS: readonly LifeChapter[] = [
  { id: 'centre-one-on-one', phrase: 'Real classrooms.', photo: `${CHAPTER_DIR}/real_classrooms_initialimage1.png`, focus: 55 },
  { id: 'team-academic', phrase: 'Real people.', photo: `${CHAPTER_DIR}/real_people_initialimage.png`, focus: 60 },
  { id: 'five-years', phrase: 'Real milestones.', photo: `${CHAPTER_DIR}/real_milestones_initialimage.png`, focus: 45 },
];
