import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogIndex } from '@/components/blog/BlogIndex';
import { getPosts, pageCount } from '@/lib/posts';

interface Params {
  page: string;
}

export const dynamicParams = false;

// /blog/page/2/, /blog/page/3/ … Page 1 is always generated too (static export
// needs at least one page); it points search engines back to /blog/.
export function generateStaticParams(): Params[] {
  return Array.from({ length: pageCount(getPosts().length) }, (_, index) => ({ page: String(index + 1) }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const page = Number((await params).page);
  return {
    title: `Blog — page ${page}`,
    alternates: { canonical: page <= 1 ? '/blog/' : `/blog/page/${page}/` },
    robots: page <= 1 ? { index: false } : undefined,
  };
}

export default async function BlogListPage({ params }: { params: Promise<Params> }) {
  const page = Number((await params).page);
  const posts = getPosts();
  if (!Number.isInteger(page) || page < 1 || page > pageCount(posts.length)) notFound();
  return <BlogIndex posts={posts} page={page} />;
}
