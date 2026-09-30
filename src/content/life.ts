// Life at EduSolve items. PLACEHOLDER: real photos, dates and captions pending
// from the client (plus written parental consent for any student photos).

export type LifeCategory = 'Milestones' | 'Achievements' | 'Trips & events' | 'Our centres' | 'Team';

export interface LifeItem {
  id: string;
  category: LifeCategory;
  title: string;
  summary?: string;
  photoLabel: string;
  photo: string | null;
  photoCount: number;
  date: string | null;
  featured?: boolean;
}

export const LIFE_CATEGORIES: readonly LifeCategory[] = ['Milestones', 'Achievements', 'Trips & events', 'Our centres', 'Team'];

export const LIFE_ITEMS: readonly LifeItem[] = [
  { id: 'five-years', category: 'Milestones', title: 'Five years of EduSolve', summary: '[Short story of the anniversary: who was there, what was celebrated and what’s next.]', photoLabel: 'Photo: fifth anniversary celebration', photo: null, photoCount: 20, date: null, featured: true },
  { id: 'board-toppers', category: 'Achievements', title: '[Student] scores [result] in the Class 10 board exams', photoLabel: 'Photo: student with certificate', photo: null, photoCount: 6, date: null },
  { id: 'field-trip', category: 'Trips & events', title: 'Field trip to [place] with students and staff', photoLabel: 'Photo: group on the trip', photo: null, photoCount: 18, date: null },
  { id: 'centre-inside', category: 'Our centres', title: 'Inside our learning centre in [Town]', photoLabel: 'Photo: classroom', photo: null, photoCount: 9, date: null },
  { id: 'academic-team', category: 'Team', title: 'Meet the academic team behind every lesson', photoLabel: 'Photo: team', photo: null, photoCount: 7, date: null },
  { id: 'awards-day', category: 'Achievements', title: 'Annual awards day: celebrating our top performers', photoLabel: 'Photo: awards on stage', photo: null, photoCount: 24, date: null },
  { id: 'second-centre', category: 'Milestones', title: 'Opening our second centre in Kerala', photoLabel: 'Photo: centre opening', photo: null, photoCount: 12, date: null },
];

// Home page preview: the four latest items.
export const LIFE_PREVIEW: readonly LifeItem[] = LIFE_ITEMS.slice(0, 4);
