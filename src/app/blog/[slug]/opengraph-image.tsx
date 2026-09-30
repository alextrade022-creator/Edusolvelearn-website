import { getPost, getPosts } from '@/lib/posts';
import { OG_SIZE, ogCard } from '@/lib/ogImage';

// Per-post sharing image: the post's cover and title (the hero image when a post
// has no cover yet).
export const alt = 'EduSolve blog post';
export const size = OG_SIZE;
// Re-encoded to JPEG after the build (scripts/postbuild.mjs).
export const contentType = 'image/jpeg';
export const dynamic = 'force-static';

export function generateStaticParams() {
  const posts = getPosts();
  return posts.length ? posts.map((post) => ({ slug: post.slug })) : [{ slug: 'coming-soon' }];
}

export default async function PostOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  return ogCard({
    eyebrow: post ? post.category : 'The EduSolve blog',
    title: post ? post.title : 'News, updates and guides for parents',
    image: post?.cover ?? '/hero_section_image.png',
  });
}
