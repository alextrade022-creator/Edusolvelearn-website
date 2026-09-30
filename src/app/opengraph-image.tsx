import { OG_SIZE, ogCard } from '@/lib/ogImage';

// Default sharing image for every page without its own.
export const alt = 'EduSolve — one-on-one online tuition for Gulf families';
export const size = OG_SIZE;
// Re-encoded to JPEG after the build (scripts/postbuild.mjs).
export const contentType = 'image/jpeg';
export const dynamic = 'force-static';

export default function OpengraphImage() {
  return ogCard({
    eyebrow: 'One-on-one online tuition',
    title: 'The personal tutor your child deserves, live from home.',
    image: '/hero_section_image.png',
  });
}
