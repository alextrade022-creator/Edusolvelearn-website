import { SITE_URL } from '@/config';
import { getPosts } from '@/lib/posts';

export const dynamic = 'force-static';

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

// RSS feed of published posts, generated at build time as /blog/rss.xml.
export function GET() {
  const posts = getPosts().filter((post) => !post.draft);
  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}/`;
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(post.description)}</description>
      <category>${escape(post.category)}</category>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>EduSolve blog</title>
    <link>${SITE_URL}/blog/</link>
    <description>News, curriculum updates and study guides for parents.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
