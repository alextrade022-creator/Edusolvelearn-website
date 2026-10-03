import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogIndex } from '@/components/blog/BlogIndex';
import { BLOG_CATEGORIES, categoryBySlug, postsInCategory } from '@/lib/posts';

interface Params {
  category: string;
}

export const dynamicParams = false;

// One static page per category (/blog/category/cbse/ …). Empty categories are
// still built, but kept out of search results until they have posts.
export function generateStaticParams(): Params[] {
  return BLOG_CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const slug = (await params).category;
  const category = categoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} — EduSolve blog`,
    description: category.description,
    alternates: { canonical: `/blog/category/${slug}/` },
    robots: postsInCategory(slug).length ? undefined : { index: false },
  };
}

export default async function BlogCategoryPage({ params }: { params: Promise<Params> }) {
  const slug = (await params).category;
  const category = categoryBySlug(slug);
  if (!category) notFound();
  return <BlogIndex posts={postsInCategory(slug)} category={category} />;
}
