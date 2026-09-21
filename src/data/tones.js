// Maps a semantic "tone" to the paired background/foreground classes used by
// curriculum badges and testimonial avatars, so colours stay consistent.
export const TONE_CLASSES = {
  blush: 'bg-surface-blush text-brand-red',
  leaf: 'bg-surface-leaf text-brand-green-dark',
};

export const toneClass = (tone) => TONE_CLASSES[tone] ?? TONE_CLASSES.blush;
