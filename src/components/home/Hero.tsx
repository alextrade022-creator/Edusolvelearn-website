import Image from 'next-image-export-optimizer';
import { ParallaxY } from '@/components/motion/ParallaxY';
import { ButtonLink, TextLink } from '@/components/ui/Button';
import { Dot } from '@/components/ui/Pill';
import { CURRICULUM_NAMES } from '@/content/curricula';
import { CONTACT } from '@/content/site';

// Hero. The text entrance is plain CSS (no JavaScript needed); the image drifts
// with a gentle parallax. The image is the LCP element, so it is preloaded at high priority.
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden pt-10 pb-14 md:pt-16 lg:pt-20 lg:pb-[5.5rem]">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-[4.5rem]">
        <div className="flex flex-col gap-6 md:gap-7">
          <p className="hero-rise flex items-center gap-2.5 text-[0.8125rem] font-semibold text-body md:text-sm">
            <Dot /> Live one-on-one online tuition for Gulf families
          </p>
          <h1 id="hero-title" className="hero-rise font-serif text-display font-medium [animation-delay:80ms]">
            The personal tutor your child <span className="text-red">deserves</span>, live from home.
          </h1>
          <p className="hero-rise max-w-[32rem] text-lead text-body [animation-delay:160ms]">
            One student, one teacher, full attention. Carefully selected tutors for CBSE, ICSE, IGCSE, IB and American
            curricula, from LKG to Grade 12.
          </p>
          <div className="hero-rise mt-1 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-7 [animation-delay:240ms]">
            <ButtonLink href="/contact/">Book a free demo class</ButtonLink>
            <TextLink href={CONTACT.whatsappUrl} external className="self-center sm:self-auto">
              Or chat on WhatsApp
            </TextLink>
          </div>
          <div className="hero-rise flex flex-col gap-3 [animation-delay:320ms] max-sm:items-center">
            <p className="text-sm font-semibold text-body">Loved by 1000s of parents</p>
            <ul className="flex flex-wrap gap-2 max-sm:justify-center" aria-label="Curricula we teach">
              {CURRICULUM_NAMES.map((name) => (
                <li key={name} className="rounded-full border border-line bg-white px-3 py-1.5 text-[0.78rem] font-bold text-body">
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[35rem] lg:aspect-auto lg:h-[35rem] lg:max-w-none">
          <ParallaxY className="h-full w-full" distance={50}>
            <div className="relative h-full w-full">
              <Image
                src="/hero_section_image.png"
                alt="Watercolour illustration of a girl at home smiling at her tutor on a laptop screen during a live online class"
                fill
                preload
                fetchPriority="high"
                loading="eager"
                sizes="(min-width: 1280px) 564px, (min-width: 1024px) 45vw, (min-width: 640px) 560px, 100vw"
                className="object-cover [mask-image:radial-gradient(ellipse_72%_70%_at_50%_50%,#000_58%,transparent_100%)]"
              />
            </div>
          </ParallaxY>
          <p className="hero-chip absolute inset-x-0 bottom-3 mx-auto flex w-fit items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-[0.8125rem] font-bold whitespace-nowrap shadow-[var(--shadow-float)] md:bottom-10">
            <Dot className="size-[7px]" /> Live one-on-one, online
          </p>
        </div>
      </div>
    </section>
  );
}
