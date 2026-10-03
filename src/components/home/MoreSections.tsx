import { PostCard } from '@/components/blog/PostCard';
import { BookIcon, ChatIcon, ListCheckIcon, VideoIcon } from '@/components/icons';
import { Reveal } from '@/components/motion/Reveal';
import { Avatar } from '@/components/ui/Avatar';
import { ArrowLink } from '@/components/ui/Button';
import { FaqList } from '@/components/ui/FaqList';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PLAY_STORE_URL } from '@/config';
import { APP_FEATURES, APP_SCREENS, HOME_FAQS, HOME_QUOTE, TESTIMONIAL_VIDEO_IDS } from '@/content/home';
import { getPosts, toMeta } from '@/lib/posts';
import { AppPhones } from './AppPhones';
import { StoriesVideoRow } from './StoriesVideoRow';

export function StoriesSection() {
  return (
    <Section labelledBy="stories-title" className="flex flex-col gap-10 overflow-x-clip lg:gap-16">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-6">
        <div className="flex flex-col gap-4 lg:col-span-3 lg:pt-3">
          <h2 id="stories-title" className="eyebrow">
            Stories
          </h2>
          <p className="hidden text-[0.9375rem] leading-relaxed text-body lg:block">Real families across the Gulf, in their own words.</p>
        </div>
        <Reveal className="lg:col-span-9">
          <figure className="flex flex-col gap-6 lg:gap-7">
            <blockquote className="font-serif text-[1.625rem] leading-[1.3] tracking-[-0.01em] md:text-[2rem] lg:text-[2.5rem] lg:leading-[1.25]">
              “{HOME_QUOTE.text}”
            </blockquote>
            <figcaption className="flex items-center gap-3.5">
              <Avatar photo={HOME_QUOTE.photo} alt={HOME_QUOTE.name} className="size-11 rounded-full border border-line" sizes="44px" />
              <span className="flex flex-col">
                <span className="font-bold">{HOME_QUOTE.name}</span>
                <span className="text-sm text-muted">{HOME_QUOTE.meta}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
      {/* Carousel with a "More student stories" end card, text link and arrows. */}
      <StoriesVideoRow ids={TESTIMONIAL_VIDEO_IDS} />
    </Section>
  );
}

const APP_ICONS = [VideoIcon, ChatIcon, BookIcon, ListCheckIcon] as const;

export function AppSection() {
  const [front, back] = APP_SCREENS;
  return (
    <Section labelledBy="app-title" className="grid items-center gap-10 overflow-x-clip lg:grid-cols-2 lg:gap-[5.5rem]">
      <div className="flex flex-col gap-8 lg:gap-9">
        <SectionHeading
          id="app-title"
          eyebrow="The EduSolve app"
          title="Keep learning between classes"
          intro="Recorded lessons, study notes and a question bank in your child’s pocket — plus a chat with our experts whenever a doubt comes up."
        />
        <ul className="grid grid-cols-2 gap-x-4 gap-y-5 lg:gap-x-7 lg:gap-y-6">
          {APP_FEATURES.map((feature, index) => {
            const Icon = APP_ICONS[index] ?? VideoIcon;
            return (
              <Reveal as="li" key={feature.title} delay={index * 0.08} className="flex flex-col gap-2 sm:flex-row sm:gap-3.5">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-white">
                  <Icon size={20} />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[0.9375rem] font-bold sm:text-base">{feature.title}</span>
                  <span className="text-[0.8125rem] leading-normal text-body sm:text-sm">{feature.text}</span>
                </span>
              </Reveal>
            );
          })}
        </ul>
        <div className="flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center sm:gap-3">
          {/* TODO(launch): swap for Google's official "Get it on Google Play" badge artwork. */}
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex min-h-14 items-center justify-center gap-3 overflow-hidden rounded-xl bg-ink px-5 py-2.5 text-white"
          >
            {/* Hover: a band of light sweeps across once (it snaps back unseen on leave). */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-[120%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-[260%] group-hover:transition-transform group-hover:duration-700 group-hover:ease-[var(--ease-out-soft)] motion-reduce:hidden"
            />
            <svg
              width="24"
              height="26"
              viewBox="0 0 26 28"
              aria-hidden="true"
              className="transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-[3px] motion-reduce:transition-none"
            >
              <path d="M2 2l13 12L2 26z" fill="#fff" />
              <path d="M2 2l17 10-4 2z" fill="#fff" opacity="0.75" />
              <path d="M2 26l17-10-4-2z" fill="#fff" opacity="0.55" />
              <path d="M19 12l5 2-5 2-4-2z" fill="#fff" opacity="0.9" />
            </svg>
            <span className="flex flex-col text-left">
              <span className="text-[0.625rem] font-semibold tracking-[0.06em]">GET IT ON </span>
              <span className="text-lg leading-none font-bold">Google Play</span>
              <span className="sr-only"> — the EduSolve app</span>
            </span>
          </a>
          {/* PLACEHOLDER until the iOS app launches; then use Apple's official "Download on the App Store" badge. */}
          <span
            title="Coming soon to iPhone"
            className="group inline-flex min-h-14 cursor-default items-center justify-center gap-3 rounded-xl border-[1.5px] border-line-strong px-5 py-2.5 text-ink"
          >
            <svg
              width="22"
              height="26"
              viewBox="4.4 3.2 14.6 18.2"
              fill="currentColor"
              aria-hidden="true"
              className="origin-bottom transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-rotate-[8deg] motion-reduce:transition-none"
            >
              <path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.72-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.86-.76-1.47.02-2.83.86-3.59 2.18-1.53 2.66-.39 6.6 1.1 8.75.73 1.05 1.6 2.24 2.73 2.2 1.1-.04 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.4 1.2-2.46-.03-.01-2.3-.88-2.3-3.53zM14.2 6.13c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.31-.56.65-1.05 1.68-.92 2.68.97.07 1.96-.49 2.56-1.23z" />
            </svg>
            <span className="flex flex-col text-left">
              <span className="text-[0.625rem] font-semibold tracking-[0.06em] text-muted">COMING SOON</span>
              <span className="text-lg leading-none font-bold">
                <span className="sr-only">to the </span>App Store
              </span>
            </span>
          </span>
        </div>
      </div>
      {front && back ? <AppPhones front={front} back={back} /> : null}
    </Section>
  );
}

// Shows the three latest posts, but only once at least three real (non-draft)
// posts exist. Sample posts are drafts, so this stays hidden on the live site.
const MIN_POSTS_FOR_PREVIEW = 3;

export function BlogPreviewSection() {
  const posts = getPosts().slice(0, 3).map(toMeta);
  if (posts.length < MIN_POSTS_FOR_PREVIEW) return null;
  return (
    <Section labelledBy="blog-title" className="flex flex-col gap-10 lg:gap-12">
      <SectionHeading
        id="blog-title"
        eyebrow="From the blog"
        title="News, updates and guides for parents"
        action={<ArrowLink href="/blog/">Read the blog</ArrowLink>}
      />
      <ul className="grid gap-3.5 sm:grid-cols-3 sm:gap-6">
        {posts.map((post, index) => (
          <Reveal as="li" key={post.slug} delay={index * 0.08}>
            <PostCard post={post} showExcerpt={false} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

export function HomeFaqSection() {
  return (
    <Section labelledBy="faq-title" className="grid gap-8 lg:grid-cols-12 lg:gap-6">
      <div className="flex flex-col gap-4 lg:col-span-4">
        <p className="eyebrow">FAQ</p>
        <h2 id="faq-title" className="font-serif text-h2 font-medium">
          Questions parents ask
        </h2>
        <ArrowLink href="/faq/" className="mt-1 hidden self-start lg:inline-flex">
          Read the full FAQ
        </ArrowLink>
      </div>
      <div className="lg:col-span-7 lg:col-start-6">
        <FaqList items={HOME_FAQS} />
        <ArrowLink href="/faq/" className="mt-4 lg:hidden">
          Read the full FAQ
        </ArrowLink>
      </div>
    </Section>
  );
}
