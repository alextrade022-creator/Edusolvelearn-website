'use client';

import Image from 'next-image-export-optimizer';
import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef } from 'react';
import type { Benefit } from '@/content/home';
import { useMediaQuery } from '@/lib/useMediaQuery';

// Six portrait cards. Laptop: the top row slides in from the left and the
// bottom row from the right, tied to scroll (it reverses when scrolling up).
// Phones/tablets: each card slides in from alternating sides as it appears.
export function WhyCards({ benefits }: { benefits: readonly Benefit[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isLaptop = useMediaQuery('(min-width: 1024px)');
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.3'] });
  const fromLeft = useTransform(scrollYProgress, [0, 1], [-260, 0]);
  const fromRight = useTransform(scrollYProgress, [0, 1], [260, 0]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [0.35, 1]);

  const scrollLinked = isLaptop && !reduceMotion;

  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {benefits.map((benefit, index) => (
        <Card
          key={benefit.title}
          benefit={benefit}
          index={index}
          x={scrollLinked ? (index < 3 ? fromLeft : fromRight) : undefined}
          opacity={scrollLinked ? fade : undefined}
          revealFrom={!scrollLinked && !reduceMotion ? (index % 2 === 0 ? -40 : 40) : 0}
        />
      ))}
    </div>
  );
}

interface CardProps {
  benefit: Benefit;
  index: number;
  x?: MotionValue<number>;
  opacity?: MotionValue<number>;
  revealFrom: number;
}

function Card({ benefit, index, x, opacity, revealFrom }: CardProps) {
  const number = String(index + 1).padStart(2, '0');
  const scrollStyle = x && opacity ? { x, opacity } : undefined;
  return (
    <m.article
      style={scrollStyle}
      initial={scrollStyle || revealFrom === 0 ? undefined : { opacity: 0, x: revealFrom }}
      whileInView={scrollStyle || revealFrom === 0 ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-5 rounded-card border border-line bg-white p-4 pb-6 lg:gap-6 lg:p-[1.375rem] lg:pb-7"
    >
      <div className="relative aspect-[1100/820] overflow-hidden rounded-[0.875rem] bg-panel">
        <Image
          src={benefit.image}
          alt={benefit.imageAlt}
          fill
          sizes="(min-width: 1280px) 340px, (min-width: 1024px) 28vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 px-1.5">
        <p className="text-xs font-bold text-red lg:text-[0.8125rem]">{number}</p>
        <h3 className="text-[1.125rem] font-bold tracking-[-0.01em] lg:text-xl">{benefit.title}</h3>
        <p className="text-[0.9375rem] leading-relaxed text-body lg:text-[0.97rem]">{benefit.text}</p>
      </div>
    </m.article>
  );
}
