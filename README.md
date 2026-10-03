# EduSolve website

The marketing site for [EduSolve](https://edusolvelearn.com): one-on-one online tuition, mainly
for Gulf-based Indian families, with students in 20+ countries — CBSE, ICSE, IGCSE, Kerala Board,
IB and American curricula, LKG to Grade 12.

It is a fast, static site: every page is built ahead of time into plain HTML, CSS and optimised
images, so it runs on simple hosting (Hostinger) with no server.

## Tech

- **Next.js 16** (static export), **React 19**, **TypeScript**, **Tailwind CSS 4**
- **Motion** and **Lenis** for the home page's scroll effects and smooth scrolling
- **next-image-export-optimizer** — makes small WebP copies of every image at build time
- **EmailJS** — delivers the demo booking and "Teach with us" forms by email

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # development server at http://localhost:3000 (shows draft blog posts too)
npm run build      # build the live site into out/
npm run preview    # serve out/ locally, exactly as it will be hosted
npm run typecheck  # TypeScript check
npm run lint       # ESLint
```

Run `typecheck`, `lint` and `build` before publishing a change, then check it with `preview`
on both a phone-sized and a laptop-sized window.

## Publishing

Every push to `main` publishes the site: a GitHub Action builds it and puts the result on the
`deploy` branch, which Hostinger serves. Do day-to-day work on a separate branch and merge into
`main` when it's ready to go live.

## Making changes

Almost all text and data live in `src/content/` — no component changes needed:

| To change… | Edit |
| --- | --- |
| Page text, stats, FAQs, centres, curricula, subjects | `src/content/*.ts` |
| Life at EduSolve photos | add the photo to `public/Life_at_Edusolve_Images/<folder>/` and an entry to `src/content/life.ts` |
| Blog posts | add a Markdown file to `src/content/posts/` (cover image in `public/blog_images/`) |
| Student story videos | YouTube Shorts ids in `TESTIMONIAL_VIDEO_IDS`, `src/content/home.ts` |
| Parent and tutor quotes | `src/content/home.ts` and `src/content/pages.ts` |
| Contact details, links, countries | `src/content/site.ts` |
| Search titles and descriptions | `pageMetadata` in each `src/app/<page>/page.tsx` |

`CLAUDE.md` has the full guide: step-by-step instructions for each kind of change, the design
rules (colours, type, spacing, card styles) and the performance rules that keep the site fast.
Please follow it so new content stays in tune with the rest of the site.

### Images

- Use web-safe file names: letters, numbers, `_` and `-` only (no spaces, brackets or `%`).
- Large originals are fine — the build makes small WebP versions automatically.
- Replacing an image but keeping the same file name: delete that folder's
  `nextImageExportOptimizer/` and its lines in `public/next-image-export-optimizer-hashes.json`,
  then build again.

### Forms

The demo booking and "Teach with us" forms send emails through EmailJS. The service and
template IDs and the public key are in `src/config.ts` — they are public by design. Which inbox
receives each form is set per template in the EmailJS dashboard. Never add the EmailJS Private
Key to the code. The free plan allows 200 emails a month.

### Blog posts

Each post is a Markdown file with front matter (`title`, `description`, `category`, `date`,
`author`, `cover`, `draft`, and optionally `order` and `featured`). Posts with `draft: true` only
appear in `npm run dev`; change it to `draft: false` to publish.

## Project structure

```
src/
├── app/          # pages (one folder per route), sitemap, robots, share images
├── components/   # ui, layout, home, about, life, blog, forms, motion, seo
├── content/      # all copy and data, plus blog posts (content/posts/*.md)
├── lib/          # helpers: blog loader, SEO, structured data, dates, forms
└── config.ts     # site URL, EmailJS IDs, Play Store link
public/           # images, icons, .htaccess (Hostinger config)
scripts/          # post-build step (link prefetch files, share image compression)
```
