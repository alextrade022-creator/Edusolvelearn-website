import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { CtaSection } from '@/components/ui/CtaSection';
import { PageHero } from '@/components/ui/PageHero';
import { Pill } from '@/components/ui/Pill';
import { Section } from '@/components/ui/Section';
import { cn } from '@/lib/cn';
import { formatDate } from '@/lib/date';
import { BLOG_CATEGORIES, getPosts, toMeta, type BlogCategory, type Post } from '@/lib/posts';
import { PostCard } from './PostCard';
import { PostCover } from './PostCover';
import { ShowMorePosts } from './ShowMorePosts';

interface BlogIndexProps {
  /** Posts in scope (all posts, or one category), newest first. */
  posts: readonly Post[];
  category?: BlogCategory;
}

// A blog listing page (all posts or one category). Every variant is its own
// static page, so filters are plain links: shareable URLs, and each category
// page can rank on its own. "All" opens with a large featured post — the one
// marked `featured: true`, else the first in order — labelled "Latest" when it
// is the newest and "Featured" otherwise. Cards follow the posts' `order`. The rest are cards, six at
// a time with "Show more articles".
export function BlogIndex({ posts, category }: BlogIndexProps) {
  const featured = category ? undefined : (posts.find((post) => post.featured) ?? posts[0]);
  const listed = posts.filter((post) => post !== featured);
  const isNewest = featured ? posts.every((post) => post.date <= featured.date) : false;
  const available = new Set(getPosts().map((post) => post.category));
  const chips = BLOG_CATEGORIES.filter((item) => available.has(item.name));

  return (
    <>
      <PageHero
        eyebrow="The EduSolve blog"
        title={category ? category.name : 'News, updates and guides for parents'}
        intro={category ? category.description : 'EduSolve news, curriculum announcements from CBSE, NCERT and other boards, and practical study guides.'}
      />
      <Section spaced={false} className="flex flex-col gap-8 pt-12 md:pt-16 lg:gap-10">
        {chips.length ? (
          <nav aria-label="Blog categories">
            <ul className="flex flex-wrap gap-2">
              {[{ name: 'All', slug: '' }, ...chips].map((item) => {
                const active = category ? item.slug === category.slug : item.slug === '';
                return (
                  <li key={item.name} className="shrink-0">
                    <Link
                      href={item.slug ? `/blog/category/${item.slug}/` : '/blog/'}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold md:px-4.5 whitespace-nowrap transition-colors',
                        active ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink hover:border-ink',
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}

        {featured ? (
          <Link
            href={`/blog/${featured.slug}/`}
            className="group grid items-center gap-6 rounded-panel border border-line bg-white p-3.5 pb-7 md:p-5 lg:grid-cols-12 lg:gap-12 lg:pb-5"
          >
            <PostCover
              title={featured.title}
              category={featured.category}
              cover={featured.cover}
              sizes="(min-width: 1024px) 680px, 100vw"
              priority
              className="aspect-[16/10] rounded-2xl lg:col-span-7"
            />
            <span className="flex flex-col gap-4 px-2 lg:col-span-5 lg:pr-7">
              <span className="flex flex-wrap gap-2">
                <Pill tone="dark">{isNewest ? 'Latest' : 'Featured'}</Pill>
                <Pill>{featured.category}</Pill>
              </span>
              <span className="font-serif text-[1.75rem] leading-tight font-medium tracking-[-0.02em] transition-colors group-hover:text-red md:text-[2.375rem]">
                {featured.title}
              </span>
              <span className="text-lead text-body">{featured.description}</span>
              <span className="text-sm text-muted">
                {featured.author} · <time dateTime={featured.date}>{formatDate(featured.date)}</time> · {featured.readingMinutes} min read
              </span>
            </span>
          </Link>
        ) : null}

        {listed.length ? (
          <ShowMorePosts
            items={listed.map((post, index) => ({
              key: post.slug,
              card: (
                <Reveal delay={(index % 3) * 0.08}>
                  <PostCard post={toMeta(post)} />
                </Reveal>
              ),
            }))}
          />
        ) : null}

        {!posts.length ? (
          <div className="rounded-panel border border-dashed border-line-strong px-6 py-16 text-center">
            <p className="font-serif text-[1.75rem] font-medium">Articles are on their way</p>
            <p className="mt-2 text-body">New posts will appear here soon.</p>
          </div>
        ) : null}
      </Section>
      <CtaSection title="Need help with a subject?" text="Book a free one-on-one demo class with a tutor who knows your child’s board." />
    </>
  );
}
