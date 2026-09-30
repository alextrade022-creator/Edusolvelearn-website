// Build-time blog loader. Posts are Markdown files in src/content/posts/ with a
// simple front-matter block. This module runs only on the server during the
// static build (it uses the file system), so `marked` never reaches visitors.
//
// Posts are written by the EduSolve team, so their HTML is trusted as-is.

import 'server-only';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { Marked, type Tokens } from 'marked';

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string; // ISO yyyy-mm-dd
  author: string;
  cover: string | null;
  draft: boolean;
  readingMinutes: number;
}

export interface TocEntry {
  id: string;
  text: string;
}

export interface Post extends PostMeta {
  html: string;
  toc: TocEntry[];
}

const POSTS_DIR = path.join(process.cwd(), 'src', 'content', 'posts');
const INCLUDE_DRAFTS = process.env.NODE_ENV !== 'production';

export interface BlogCategory {
  name: string;
  slug: string;
  description: string;
}

// Each category has its own static page at /blog/category/<slug>/.
export const BLOG_CATEGORIES: readonly BlogCategory[] = [
  { name: 'EduSolve news', slug: 'edusolve-news', description: 'Milestones, announcements and stories from the EduSolve team.' },
  { name: 'Curriculum updates', slug: 'curriculum-updates', description: 'Board announcements and syllabus changes that matter to families.' },
  { name: 'CBSE', slug: 'cbse', description: 'Guides for parents of CBSE students, from primary to Class 12 boards.' },
  { name: 'NCERT', slug: 'ncert', description: 'Getting the most out of NCERT textbooks and exercises.' },
  { name: 'IGCSE & IB', slug: 'igcse-ib', description: 'Guidance for families on international curricula in the Gulf.' },
  { name: 'Study tips', slug: 'study-tips', description: 'Practical routines and advice to help your child learn well.' },
];

export const POSTS_PER_PAGE = 12;

export const categoryBySlug = (slug: string) => BLOG_CATEGORIES.find((category) => category.slug === slug);
export const categorySlug = (name: string) => BLOG_CATEGORIES.find((category) => category.name === name)?.slug ?? null;

/** Number of listing pages for a set of posts (always at least one). */
export const pageCount = (total: number) => Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

export function postsInCategory(slug: string): Post[] {
  const category = categoryBySlug(slug);
  return category ? getPosts().filter((post) => post.category === category.name) : [];
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

// Minimal front-matter parser: `key: value` lines between --- fences.
function parseFrontMatter(source: string): { data: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);
  if (!match) return { data: {}, body: source };
  const data: Record<string, string> = {};
  for (const line of (match[1] ?? '').split(/\r?\n/)) {
    const separator = line.indexOf(':');
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^["']|["']$/g, '');
    if (key) data[key] = value;
  }
  return { data, body: source.slice(match[0].length) };
}

function required(data: Record<string, string>, key: string, file: string): string {
  const value = data[key];
  if (!value) throw new Error(`Blog post ${file} is missing "${key}" in its front matter.`);
  return value;
}

function readPost(file: string): Post {
  const { data, body } = parseFrontMatter(readFileSync(path.join(POSTS_DIR, file), 'utf8'));
  const toc: TocEntry[] = [];

  // Give h2/h3 headings ids for the table of contents and deep links.
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth, text }: Tokens.Heading) {
        const id = slugify(text);
        if (depth === 2) toc.push({ id, text });
        return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
      },
    },
  });
  const html = marked.parse(body, { async: false });
  const words = body.split(/\s+/).filter(Boolean).length;

  return {
    slug: file.replace(/\.md$/, ''),
    title: required(data, 'title', file),
    description: required(data, 'description', file),
    category: required(data, 'category', file),
    date: required(data, 'date', file),
    author: data.author ?? 'EduSolve Academic Team',
    cover: data.cover ?? null,
    draft: data.draft === 'true',
    readingMinutes: Math.max(1, Math.round(words / 220)),
    html,
    toc,
  };
}

let cache: Post[] | null = null;

/** All posts (drafts only while developing), newest first. */
export function getPosts(): Post[] {
  cache ??= readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.md'))
    .map(readPost)
    .toSorted((a, b) => b.date.localeCompare(a.date));
  return cache.filter((post) => INCLUDE_DRAFTS || !post.draft);
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

// Card data only (drops the rendered HTML and contents list).
export const toMeta = (post: Post): PostMeta => ({
  slug: post.slug,
  title: post.title,
  description: post.description,
  category: post.category,
  date: post.date,
  author: post.author,
  cover: post.cover,
  draft: post.draft,
  readingMinutes: post.readingMinutes,
});
