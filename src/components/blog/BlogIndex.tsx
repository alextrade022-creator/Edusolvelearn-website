import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { CtaSection } from '@/components/ui/CtaSection';
import { PageHero } from '@/components/ui/PageHero';
import { Pill } from '@/components/ui/Pill';
import { Section } from '@/components/ui/Section';
import { cn } from '@/lib/cn';
import { formatDate } from '@/lib/date';
import { BLOG_CATEGORIES, getPosts, pageCount, POSTS_PER_PAGE, toMeta, type BlogCategory, type Post } from '@/lib/posts';
import { PostCard } from './PostCard';
import { PostCover } from './PostCover';

interface BlogIndexProps {
  /** Posts in scope (all posts, or one category), newest first. */
  posts: readonly Post[];
  page: number;
  category?: BlogCategory;
}

const listPath = (category: BlogCategory | undefined, page: number) => {
  const base = category ? `/blog/category/${category.slug}/` : '/blog/';
  return page <= 1 ? base : `${base}page/${page}/`;
};

// A blog listing page (all posts or one category, one page of results). Every
// variant is its own static page, so filters and page numbers are plain links:
// no JavaScript, shareable URLs, and each category page can rank on its own.
export function BlogIndex({ posts, page, category }: BlogIndexProps) {
  const total = pageCount(posts.length);
  const showFeatured = !category && page === 1 && posts.length > 0;
  const [first, ...rest] = posts;
  const featured = showFeatured ? first : undefined;
  const listed = (showFeatured ? rest : posts).slice(showFeatured ? 0 : (page - 1) * POSTS_PER_PAGE, showFeatured ? POSTS_PER_PAGE - 1 : page * POSTS_PER_PAGE);
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
                <Pill tone="dark">Latest</Pill>
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
          <ul className="grid gap-3.5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {listed.map((post, index) => (
              <Reveal as="li" key={post.slug} delay={(index % 3) * 0.08}>
                <PostCard post={toMeta(post)} />
              </Reveal>
            ))}
          </ul>
        ) : null}

        {!posts.length ? (
          <div className="rounded-panel border border-dashed border-line-strong px-6 py-16 text-center">
            <p className="font-serif text-[1.75rem] font-medium">Articles are on their way</p>
            <p className="mt-2 text-body">New posts will appear here soon.</p>
          </div>
        ) : null}

        {total > 1 ? (
          <nav aria-label="Pagination" className="flex items-center justify-center gap-2 pt-4">
            {page > 1 ? (
              <Link href={listPath(category, page - 1)} rel="prev" className="inline-flex min-h-11 items-center px-3 text-[0.9375rem] font-semibold">
                ← Newer
              </Link>
            ) : null}
            {Array.from({ length: total }, (_, index) => index + 1).map((number) => (
              <Link
                key={number}
                href={listPath(category, number)}
                aria-current={number === page ? 'page' : undefined}
                className={cn(
                  'inline-flex size-11 items-center justify-center rounded-xl border text-sm font-bold',
                  number === page ? 'border-ink bg-ink text-white' : 'border-line bg-white',
                )}
              >
                {number}
              </Link>
            ))}
            {page < total ? (
              <Link href={listPath(category, page + 1)} rel="next" className="inline-flex min-h-11 items-center px-3 text-[0.9375rem] font-semibold">
                Older →
              </Link>
            ) : null}
          </nav>
        ) : null}
      </Section>
      <CtaSection title="Need help with a subject?" text="Book a free one-on-one demo class with a tutor who knows your child’s board." />
    </>
  );
}
