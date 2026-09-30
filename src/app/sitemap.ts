import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config';
import { BLOG_CATEGORIES, getPosts, pageCount, postsInCategory } from '@/lib/posts';

export const dynamic = 'force-static';

// Generated at build time. Lists only pages meant for search results: no
// drafts, empty categories or duplicate "page 1" listings.
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE_URL}${path}`;
  const posts = getPosts().filter((post) => !post.draft);
  const latest = posts[0]?.date;

  const pages: MetadataRoute.Sitemap = [
    { url: url('/'), changeFrequency: 'weekly', priority: 1 },
    { url: url('/courses/'), changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/how-it-works/'), changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/teachers/'), changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/testimonials/'), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/about/'), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/contact/'), changeFrequency: 'yearly', priority: 0.9 },
    { url: url('/life-at-edusolve/'), changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/faq/'), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/teach/'), changeFrequency: 'yearly', priority: 0.4 },
    { url: url('/privacy/'), changeFrequency: 'yearly', priority: 0.2 },
    { url: url('/terms/'), changeFrequency: 'yearly', priority: 0.2 },
  ];

  if (posts.length) {
    pages.push({ url: url('/blog/'), lastModified: latest, changeFrequency: 'weekly', priority: 0.7 });
    for (let page = 2; page <= pageCount(posts.length); page += 1) {
      pages.push({ url: url(`/blog/page/${page}/`), changeFrequency: 'weekly', priority: 0.4 });
    }
    for (const category of BLOG_CATEGORIES) {
      const inCategory = postsInCategory(category.slug).filter((post) => !post.draft);
      if (!inCategory.length) continue;
      pages.push({ url: url(`/blog/category/${category.slug}/`), lastModified: inCategory[0]?.date, changeFrequency: 'weekly', priority: 0.5 });
      for (let page = 2; page <= pageCount(inCategory.length); page += 1) {
        pages.push({ url: url(`/blog/category/${category.slug}/page/${page}/`), changeFrequency: 'weekly', priority: 0.3 });
      }
    }
    for (const post of posts) {
      pages.push({ url: url(`/blog/${post.slug}/`), lastModified: post.date, changeFrequency: 'monthly', priority: 0.6 });
    }
  }

  return pages;
}
