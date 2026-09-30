'use client';

import Image from 'next-image-export-optimizer';
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

interface Screen {
  src: string;
  alt: string;
}

// Two phones that start stacked (straight, centred) and fan out to their tilted
// positions as the section scrolls in. The back phone moves a little slower, so
// they feel layered. Tied to scroll: scrolling back up stacks them again.
export function AppPhones({ front, back }: { front: Screen; back: Screen }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center 0.55'] });

  // Offsets are percentages of each phone's own width, so the fan scales with screen size.
  const frontX = useTransform(scrollYProgress, [0, 1], ['38%', '0%']);
  const frontRotate = useTransform(scrollYProgress, [0, 1], [0, -4]);
  const backX = useTransform(scrollYProgress, [0.15, 1], ['-38%', '0%']);
  const backRotate = useTransform(scrollYProgress, [0.15, 1], [0, 5]);
  const backY = useTransform(scrollYProgress, [0.15, 1], ['4%', '-3%']);

  const still = reduceMotion ?? false;

  return (
    <div ref={ref} role="img" aria-label="Two phones showing the EduSolve app: a recorded class and a question bank" className="relative mx-auto h-[25rem] w-full max-w-[22rem] sm:h-[30rem] sm:max-w-[28rem] lg:h-[36rem] lg:max-w-none">
      <m.div
        style={still ? { rotate: 5 } : { x: backX, rotate: backRotate, y: backY }}
        className="absolute top-2 right-0 w-[52%] lg:right-[4%] lg:w-[46%]"
      >
        <Image src={back.src} alt="" width={971} height={1620} sizes="(min-width: 1024px) 260px, 50vw" className="h-auto w-full drop-shadow-[0_24px_40px_rgba(22,24,26,0.18)]" />
      </m.div>
      <m.div
        style={still ? { rotate: -4 } : { x: frontX, rotate: frontRotate }}
        className="absolute top-8 left-0 w-[54%] lg:left-[4%] lg:w-[48%]"
      >
        <Image src={front.src} alt="" width={994} height={1583} sizes="(min-width: 1024px) 270px, 52vw" className="h-auto w-full drop-shadow-[0_28px_48px_rgba(22,24,26,0.22)]" />
      </m.div>
    </div>
  );
}
