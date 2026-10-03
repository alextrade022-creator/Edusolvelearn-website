'use client';

import { ArrowLink } from '@/components/ui/Button';
import { VideoCarousel } from '@/components/ui/VideoCarousel';
import { StoriesEndCard } from './StoriesEndCard';

/** How many videos the home page shows; the end card links to the rest. */
const HOME_VIDEOS = 4;

// Home page video stories: the same carousel as the Stories page on every
// screen — drag, fling, swipe, elastic ends — with four videos and a "More
// student stories" end card made from the other videos' covers. The ← →
// buttons (tablets and up) sit beside the text link under the row. Once per
// page load it glides slowly to the end card as it comes into view (`intro`).
export function StoriesVideoRow({ ids }: { ids: readonly string[] }) {
  return (
    <VideoCarousel
      intro
      ids={ids.slice(0, HOME_VIDEOS)}
      endCard={<StoriesEndCard ids={ids.slice(HOME_VIDEOS)} />}
      footer={<ArrowLink href="/testimonials/">More student stories</ArrowLink>}
    />
  );
}
