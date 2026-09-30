# EduSolve website — project notes

Marketing site for EduSolve: one-on-one online tuition for Gulf-based Indian families
(CBSE, ICSE, IGCSE, IB, American; LKG–Grade 12). Founded 2021, Kozhikode, Kerala.
Domain: https://edusolvelearn.com

## Working agreements

- **The owner runs all git commands** (branch, add, commit, push, merge). Suggest commands; never run them.
- Work happens on the `redesign/nextjs` branch. `main` deploys to the live site on every push.
- `implementation.txt` (git-ignored) is the phase tracker: tick tasks `[x]` as they are completed.
  Never mention it in the README.
- Ask before big design changes; the redesign was agreed section by section on a design canvas.
- Placeholder content is marked with `[brackets]` or `PLACEHOLDER` comments — never invent facts,
  stats, dates or names.

## Stack and hosting constraints

- Next.js 16 (App Router, Turbopack), React 19, TypeScript 6 strict, Tailwind CSS 4, ESLint 9.
- **Hostinger Premium = static files only.** `output: 'export'` + `trailingSlash: true`.
  No server, no ISR, no API routes, no middleware, no request-time rendering. Every route must be
  statically generated; dynamic routes need `generateStaticParams` returning **at least one** param.
- `npm run build` = `next build` → `next-image-export-optimizer` → `node scripts/postbuild.mjs`.
  Output in `out/`. `npm run preview` serves it locally.
- `public/.htaccess` handles clean URLs, 404, caching, compression, security headers and
  content types for extension-less share images.

## Performance rules

- Server components by default; `'use client'` only on small interactive leaves.
- Images: `next-image-export-optimizer` (`import Image from 'next-image-export-optimizer'`),
  always with `sizes`. Only the page's main image gets `preload` + `fetchPriority="high"`
  (`priority` is deprecated in Next 16).
- Fonts via `next/font` (Fraunces 400/500 for headings, Manrope variable for body) in `src/app/fonts.ts`.
- Internal links always `next/link`. Dates via `Intl.DateTimeFormat` (`src/lib/date.ts`) — no moment.
- No third-party scripts. Web3Forms is a plain POST on submit (public key in `src/config.ts`).
  YouTube uses a thumbnail facade (`YouTubeFacade`), loading `youtube-nocookie` only on click.
- Motion (`motion/react`) is loaded via `LazyMotion strict` → use `m.*`, not `motion.*`.
  Never call React `setState` synchronously inside motion value events — defer to rAF.
- CSS is inlined (`experimental.inlineCss`). Respect `prefers-reduced-motion` everywhere.

## Post-build step (`scripts/postbuild.mjs`)

1. **Prefetch file copies** — the export writes route prefetch data in nested folders
   (`__next.blog/…/__PAGE__.txt`) but the client requests dotted names
   (`__next.blog.….__PAGE__.txt`); the script adds flat copies so link prefetching works.
2. **Share images** — re-encodes generated `opengraph-image` files from PNG to JPEG (~700 KB → ~55 KB)
   because WhatsApp drops previews over ~300 KB.

## Design system (from the agreed canvas)

- Colours (tokens in `src/app/globals.css`): page `#FAFAF8`, panel `#F1EFEA`, border `#E7E5E0`,
  ink `#16181A`, body `#4A4F54`, muted `#61666B` (keep ≥4.5:1 contrast), red `#D20321`
  (CTAs/highlights only), deep green `#3F6B14` (checks, approval seal), lime `#A7C957` (tiny dots only).
- Serif (Fraunces, weight 500) headings; Manrope body ≥16px. Fluid type scale: `text-display`,
  `text-h1`, `text-h2`, `text-h3`, `text-lead`, `eyebrow` utility.
- Layout: `container-site` (1200px, gutters 20/40/120), `section-space` (88/112/144px),
  radius 16–24px, thin 1px borders, soft shadows only.
- Motion: home page has signature effects (hero parallax, count-up stats, curricula expanding
  panels, steps line-draw, Why-cards rows sliding in from opposite sides, tutor checks + stamped
  seal, founder zoom, stories drift, app phones fanning out). Inner pages stay calm: CSS
  scroll-driven `Reveal` fade-ins only.

## Where things live

- `src/app/` — routes. Blog: `/blog/`, `/blog/page/[page]/`, `/blog/category/[category]/`
  (+ `/page/[page]/`), `/blog/[slug]/`, `/blog/rss.xml`. SEO: `sitemap.ts`, `robots.ts`,
  `opengraph-image.tsx`, `src/lib/seo.ts` (`pageMetadata`), `src/lib/structuredData.ts`.
- `src/content/` — all copy and data (site, home, curricula, pages, faq, legal, life, forms, countries).
- `src/content/posts/*.md` — blog posts (front matter: title, description, category, date, author,
  cover, draft). `draft: true` posts only show in `npm run dev`; the home blog preview appears once
  ≥3 posts are published. Categories/slugs are defined in `src/lib/posts.ts`.
- `src/components/` — `ui/`, `layout/`, `home/`, `motion/`, `forms/`, `blog/`, `life/`, `seo/`.
- Images in `public/`: `hero_section_image.png`, `why_edu_images/1–6.png`, `mobile_app_images/`,
  `blog_images/`, `images/` (logo, founder photo). Replacing an image with the same name: clear
  `public/<folder>/nextImageExportOptimizer` and its entries in
  `public/next-image-export-optimizer-hashes.json`, then rebuild.

## Open items (waiting on the client)

- Real tutor hiring process (the 5 checks in `src/content/home.ts` are placeholders).
- Centres: towns, addresses, timings, photos (+ LocalBusiness structured data).
- Life at EduSolve photos and captions; parental consent for student photos.
- Blog: team review, then `draft: false`; CBSE post facts marked `[verify]`; IGCSE post needs a
  teacher read-through.
- Official Google Play badge artwork; Privacy/Terms `[bracketed]` placeholders and dates.
- At merge time: switch the GitHub deploy workflow from `dist/` to `out/`.
