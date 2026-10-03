import type { Metadata } from 'next';
import { BlogIndex } from '@/components/blog/BlogIndex';
import { getPosts } from '@/lib/posts';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Blog — news, curriculum updates and study guides',
  description:
    'EduSolve news, CBSE and NCERT announcements, IGCSE and IB guidance, and practical study tips for parents of students in the Gulf.',
  path: '/blog/',
});

export default function BlogPage() {
  return <BlogIndex posts={getPosts()} />;
}
