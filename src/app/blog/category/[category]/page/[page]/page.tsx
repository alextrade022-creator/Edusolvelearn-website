import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogIndex } from '@/components/blog/BlogIndex';
import { BLOG_CATEGORIES, categoryBySlug, pageCount, postsInCategory } from '@/lib/posts';

interface Params {
  category: string;
  page: string;
}

export const dynamicParams = false;

// /blog/category/cbse/page/2/ … Page 1 of each category is always generated
// (static export needs at least one page); it points back to the category root.
export function generateStaticParams(): Params[] {
  return BLOG_CATEGORIES.flatMap((category) =>
    Array.from({ length: pageCount(postsInCategory(category.slug).length) }, (_, index) => ({
      category: category.slug,
      page: String(index + 1),
    })),
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category: slug, page: pageParam } = await params;
  const category = categoryBySlug(slug);
  const page = Number(pageParam);
  if (!category) return {};
  return {
    title: `${category.name} — EduSolve blog, page ${page}`,
    alternates: { canonical: page <= 1 ? `/blog/category/${slug}/` : `/blog/category/${slug}/page/${page}/` },
    robots: page <= 1 ? { index: false } : undefined,
  };
}

export default async function BlogCategoryListPage({ params }: { params: Promise<Params> }) {
  const { category: slug, page: pageParam } = await params;
  const category = categoryBySlug(slug);
  const page = Number(pageParam);
  const posts = postsInCategory(slug);
  if (!category || !Number.isInteger(page) || page < 1 || page > pageCount(posts.length)) notFound();
  return <BlogIndex posts={posts} page={page} category={category} />;
}
