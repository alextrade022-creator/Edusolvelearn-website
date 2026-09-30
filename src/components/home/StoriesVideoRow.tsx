'use client';

import { m, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { YouTubeFacade } from '@/components/ui/YouTubeFacade';
import { useMediaQuery } from '@/lib/useMediaQuery';

// Laptop: the row of video cards drifts sideways as the page scrolls.
// Phones/tablets: a native swipeable row with snap points.
export function StoriesVideoRow({ ids }: { ids: readonly string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isLaptop = useMediaQuery('(min-width: 1024px)');
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], [80, -220]);
  const drift = isLaptop && !reduceMotion;

  return (
    <div ref={ref} className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] md:-mx-10 md:px-10 lg:mx-0 lg:overflow-visible lg:px-0">
      <m.ul style={drift ? { x } : undefined} className="flex snap-x snap-mandatory gap-3.5 lg:snap-none lg:gap-6">
        {ids.map((id, index) => (
          <li key={id} className="flex w-[12.5rem] shrink-0 snap-start flex-col gap-3 md:w-[15rem] lg:w-[17.5rem]">
            <YouTubeFacade id={id} title={`EduSolve student story ${index + 1}`} className="aspect-[9/14] rounded-[0.875rem] lg:rounded-2xl" />
            <div className="flex flex-col gap-0.5">
              <p className="text-[0.9375rem] font-bold lg:text-base">Student story</p>
              <p className="text-[0.8125rem] text-muted lg:text-sm">EduSolve family</p>
            </div>
          </li>
        ))}
      </m.ul>
    </div>
  );
}
