import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PostCard } from '@/components/blog/PostCard';
import { PostCover } from '@/components/blog/PostCover';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { ChevronDownIcon } from '@/components/icons';
import { ButtonLink } from '@/components/ui/Button';
import { SITE_URL } from '@/config';
import { formatDate } from '@/lib/date';
import { getPost, getPosts, toMeta } from '@/lib/posts';
import { JsonLd } from '@/components/seo/JsonLd';
import { articleSchema, breadcrumbSchema } from '@/lib/structuredData';

interface Params {
  slug: string;
}

// Every post is generated at build time; unknown slugs are a 404.
export const dynamicParams = false;

// Static export needs at least one generated page. Until the first real post is
// published, a single placeholder URL is generated that renders the 404 page
// (marked noindex). It disappears automatically once posts exist.
const NO_POSTS_PLACEHOLDER = 'coming-soon';

export function generateStaticParams(): Params[] {
  const posts = getPosts();
  return posts.length ? posts.map((post) => ({ slug: post.slug })) : [{ slug: NO_POSTS_PLACEHOLDER }];
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}/` },
    robots: post.draft ? { index: false } : undefined,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}/`,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getPosts()
    .filter((other) => other.slug !== post.slug)
    .toSorted((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3)
    .map(toMeta);
  const url = `${SITE_URL}/blog/${post.slug}/`;

  const toc = post.toc.length ? (
    <ul className="flex flex-col gap-1">
      {post.toc.map((entry) => (
        <li key={entry.id}>
          <a href={`#${entry.id}`} className="flex min-h-10 items-center border-l-2 border-line py-1.5 pl-3.5 text-sm text-body transition-colors hover:border-ink hover:text-ink">
            {entry.text}
          </a>
        </li>
      ))}
    </ul>
  ) : null;

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Blog', path: '/blog/' },
          { name: post.title, path: `/blog/${post.slug}/` },
        ])}
      />
      <article>
        <header className="container-site flex flex-col items-start gap-5 pt-10 md:items-center md:pt-16 md:text-center lg:pt-20">
          <nav aria-label="Breadcrumb" className="hero-rise text-sm text-muted">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/blog/" className="hover:text-ink">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>{post.category}</li>
            </ol>
          </nav>
          <h1 className="hero-rise max-w-[56rem] font-serif text-[2.125rem] leading-[1.1] font-medium tracking-[-0.02em] [animation-delay:80ms] md:text-[3.5rem] md:leading-[1.08]">
            {post.title}
          </h1>
          <p className="hero-rise max-w-[42rem] text-lead text-body [animation-delay:160ms]">{post.description}</p>
          <p className="hero-rise flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-muted [animation-delay:240ms] md:justify-center">
            <span className="font-semibold text-ink">{post.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
          </p>
        </header>

        <div className="container-site pt-8 md:pt-12">
          <PostCover
            title={post.title}
            category={post.category}
            cover={post.cover}
            priority
            sizes="(min-width: 1024px) 880px, 100vw"
            className="mx-auto aspect-[16/10] max-w-[55rem] rounded-2xl md:aspect-[16/9] md:rounded-panel"
          />
        </div>

        <div className="container-site grid gap-8 pt-10 md:pt-16 lg:grid-cols-12 lg:gap-6">
          <aside className="lg:col-span-3" aria-label="On this page">
            {toc ? (
              <>
                <details className="group rounded-xl border border-line bg-white lg:hidden">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 text-sm font-bold [&::-webkit-details-marker]:hidden">
                    On this page
                    <ChevronDownIcon size={18} className="transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-4 pb-4">{toc}</div>
                </details>
                <div className="sticky top-28 hidden flex-col gap-4 lg:flex">
                  <p className="eyebrow">On this page</p>
                  {toc}
                  <div className="mt-4 flex flex-col gap-3 border-t border-line pt-5">
                    <p className="eyebrow">Share</p>
                    <ShareButtons url={url} title={post.title} />
                  </div>
                </div>
              </>
            ) : null}
          </aside>

          <div className="lg:col-span-7 lg:col-start-5">
            <div className="prose-edu" dangerouslySetInnerHTML={{ __html: post.html }} />

            <div className="mt-12 flex flex-col gap-5 rounded-card border border-line bg-white p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div className="flex flex-col gap-1.5">
                <p className="font-serif text-[1.5rem] leading-tight font-medium">Want one-on-one help?</p>
                <p className="text-[0.9375rem] text-body">Try a free class with a tutor who knows your child’s board.</p>
              </div>
              <ButtonLink href="/contact/" className="shrink-0">
                Book a free demo
              </ButtonLink>
            </div>

            <div className="mt-8 flex items-center gap-3 lg:hidden">
              <span className="text-sm font-semibold text-muted">Share</span>
              <ShareButtons url={url} title={post.title} />
            </div>
          </div>
        </div>
      </article>

      {related.length ? (
        <section aria-labelledby="related-title" className="section-space pb-24 md:pb-32">
          <div className="container-site flex flex-col gap-8 md:gap-10">
            <h2 id="related-title" className="font-serif text-h3 font-medium">
              Keep reading
            </h2>
            <ul className="grid gap-3.5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {related.map((other) => (
                <li key={other.slug}>
                  <PostCard post={other} showExcerpt={false} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
