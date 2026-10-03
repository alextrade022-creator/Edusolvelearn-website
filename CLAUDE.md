# EduSolve website — project notes

Marketing site for EduSolve: one-on-one online tuition, mainly for Gulf-based Indian families,
with students in 20+ countries (CBSE, ICSE, IGCSE, Kerala Board, IB, American; LKG–Grade 12).
Founded 2021, Kozhikode, Kerala. Domain: https://edusolvelearn.com

These notes are for whoever (or whichever agent) maintains the site. Most future work is small:
new photos, new blog posts, text changes, a new video. Keep every change in tune with the existing
design — calm, minimal, premium — and with the performance rules below.

## Working agreements

- **Every push to `main` goes live** (see "Deploying"). Run git commands (commit, push, merge) only
  when the person you're working with asks for it, and never push unfinished work to `main`.
- **Ask before design changes.** Content changes (text, photos, posts, videos) are fine; new
  sections, new colours, new animations or layout changes need the owner's go-ahead first.
- **Never invent facts, stats, dates, names or quotes.** Placeholder content is marked with
  `[brackets]` or a `PLACEHOLDER` comment until the real content arrives.
- Before saying a change is done, run `npm run typecheck`, `npm run lint` and `npm run build`,
  and check the page at phone (390px) and laptop (1280px+) widths with `npm run preview`.

## Stack and hosting constraints

- Next.js 16 (App Router, Turbopack), React 19, TypeScript 6 strict, Tailwind CSS 4, ESLint 9.
- **Hostinger Premium = static files only.** `output: 'export'` + `trailingSlash: true`.
  No server, no ISR, no API routes, no middleware, no request-time rendering. Every route must be
  statically generated; dynamic routes need `generateStaticParams` returning **at least one** param.
- `npm run build` = `next build` → `next-image-export-optimizer` → `node scripts/postbuild.mjs`.
  Output in `out/`. `npm run preview` serves it locally.
- `public/.htaccess` handles clean URLs, 404, caching, compression, security headers and
  content types (share images, favicon).

## Deploying

`.github/workflows/deploy.yml`: on every push to `main`, GitHub Actions runs `npm run build` and
publishes `out/` to the `deploy` branch; Hostinger's Git deployment serves the `deploy` branch.

## Performance rules

- Server components by default; `'use client'` only on small interactive leaves.
- Images: `next-image-export-optimizer` (`import Image from 'next-image-export-optimizer'`),
  always with `sizes`. Only the page's main image gets `preload` + `fetchPriority="high"`
  (`priority` is deprecated in Next 16). Large photos are fine as sources (the build makes small
  WebP copies), but use web-safe file names: letters, numbers, `_` and `-` only.
- Fonts via `next/font` (Fraunces 400/500 for headings, Manrope variable for body) in `src/app/fonts.ts`.
- Internal links always `next/link`. Dates via `Intl.DateTimeFormat` (`src/lib/date.ts`) — no moment.
- No third-party scripts. Forms go through EmailJS with a plain POST on submit (public IDs in
  `src/config.ts`; recipients are set per template in the EmailJS dashboard; never add the Private Key).
  YouTube uses a thumbnail facade (`YouTubeFacade`), loading `youtube-nocookie` only on click.
- Motion (`motion/react`) is loaded via `LazyMotion strict` → use `m.*`, not `motion.*`.
  Never call React `setState` synchronously inside motion value events — defer to rAF.
  For scroll-linked visuals, write values straight onto elements (`el.style.setProperty`) on every
  change **and once on mount**, as `StepsTimeline` does: values bound through `m.*` styles can
  stay stale after a refresh further down the page.
- CSS is inlined (`experimental.inlineCss`). Respect `prefers-reduced-motion` everywhere.

## Post-build step (`scripts/postbuild.mjs`)

1. **Prefetch file copies** — the export writes route prefetch data in nested folders
   (`__next.blog/…/__PAGE__.txt`) but the client requests dotted names
   (`__next.blog.….__PAGE__.txt`); the script adds flat copies so link prefetching works.
2. **Share images** — re-encodes generated `opengraph-image` files from PNG to JPEG (~700 KB → ~55 KB)
   because WhatsApp drops previews over ~300 KB.

## Design system (keep to it)

- Colours (tokens in `src/app/globals.css`): page `#FAFAF8`, panel `#F1EFEA`, border `#E7E5E0`,
  ink `#16181A`, body `#4A4F54`, muted `#61666B` (keep ≥4.5:1 contrast), red `#D20321`
  (CTAs/highlights only), deep green `#3F6B14` (checks, approval seal), lime `#A7C957` (tiny dots only).
  Don't add new colours; icons are thin line icons in ink (`src/components/icons.tsx`).
- Serif (Fraunces, weight 500) headings; Manrope body ≥16px. Fluid type scale: `text-display`,
  `text-h1`, `text-h2`, `text-h3`, `text-lead`, `eyebrow` utility. Headings in sentence case.
- Layout: `container-site` (1200px, gutters 20/40/120), `section-space` (88/112/144px),
  radius 16–24px, thin 1px borders, soft shadows only.
- Reuse what exists: `Section`, `SectionHeading`, `Reveal` (fade-in), `Pill`, `ArrowLink`/`ButtonLink`,
  `Modal` (enlarged view), `QuoteCards`, `Avatar` (photo or placeholder figure), `ExpandChip`
  (the round "opens larger" icon), the stats strip on Stories/Our tutors, `GroupedList` on Courses.
- Card conventions: photo cards shade + zoom the photo on hover; quote cards also lift; only blog
  card titles turn red on hover. Text caps: blog card title and description 2 lines, Life card
  titles 1 line, quote cards 5 lines (tutor quotes 4), names and places 1 line.
- Motion: the home page has signature effects (hero parallax, count-up stats, curricula expanding
  panels, steps line-draw, Why EduSolve auto-playing tabs, tutor checks + stamped seal, founder
  zoom, stories carousel that glides once to its end card, app phones fanning out). Inner pages
  stay calm: CSS scroll-driven `Reveal` fade-ins only.

## Common content changes

All copy and data live in `src/content/`; components rarely need touching.

- **Text on a page** — find it in `src/content/` (`home.ts`, `pages.ts`, `curricula.ts`, `site.ts`,
  `faq.ts`, `legal.ts`, `life.ts`, `forms.ts`). Page titles/descriptions for search are in each
  `src/app/<page>/page.tsx` (`pageMetadata`).
- **Life at EduSolve photo** — put the image in `public/Life_at_Edusolve_Images/<category folder>/`
  and add an entry to `LIFE_ITEMS` in `src/content/life.ts` (category, title, `description` shown
  in the enlarged view, `alt`, optional `focus`, optional `alsoIn` for a second category). The
  array order is the page order. The home page shows `LIFE_PREVIEW` (four items, home only).
  Student photos need written parental consent.
- **Blog post** — add `src/content/posts/<slug>.md` with front matter: `title`, `description`,
  `category` (one of the categories in `src/lib/posts.ts`), `date`, `author`, `cover`
  (`/blog_images/…`), `draft`, optional `order` (position in listings, 1 first) and `featured: true`
  (pins it to the top of "All"; ask the owner which post should be featured). `draft: true` posts
  only show in `npm run dev`; set `draft: false` to publish. The home blog preview appears once
  three posts are published.
- **Student story video** — add the YouTube Shorts id to `TESTIMONIAL_VIDEO_IDS` in
  `src/content/home.ts`. The home row shows the first four; the end card shows the rest
  automatically; the Stories page shows all.
- **Quotes** — parents: `TESTIMONIAL_QUOTES` (Stories) and `HOME_QUOTE`; tutors: `TUTOR_QUOTES`
  (Our tutors), all in `src/content/`. Add `photo: '/images/…'` to replace the placeholder figure.
- **Founders** — `ABOUT_FOUNDERS` in `src/content/pages.ts` (`photo: null` shows initials).
- **Subjects / countries** — `SUBJECT_GROUPS` (`curricula.ts`) and `COUNTRY_GROUPS` (`site.ts`);
  the Our tutors subject count and footer "more countries" count update themselves.
  Headline counts: `TUTOR_COUNT` and `COUNTRY_COUNT` in `site.ts` (used on every page).
- **Curricula** — `CURRICULA` in `curricula.ts` (Courses page and home panels); also the demo
  form's `CURRICULUM_OPTIONS` in `forms.ts`.
- **Centres** — `CENTRES` in `home.ts` (also feeds the structured data for search).
- **Replacing an image with the same file name** — delete that folder's `nextImageExportOptimizer/`
  and its entries in `public/next-image-export-optimizer-hashes.json`, then rebuild.
- **Forms** — EmailJS: template recipients are changed in the EmailJS dashboard, not in code.
  Free plan: 200 emails a month; free accounts inactive for over a year can be deleted.

## Where things live

- `src/app/` — routes. Blog: `/blog/`, `/blog/category/[category]/`, `/blog/[slug]/`, `/blog/rss.xml`
  (cards six at a time with "Show more articles"). SEO: `sitemap.ts`, `robots.ts`,
  `opengraph-image.tsx`, `src/lib/seo.ts` (`pageMetadata`), `src/lib/structuredData.ts`.
  Site icons: `public/favicon.ico` and `public/images/edusolve-icon*.png` (set in `src/app/layout.tsx`).
- `src/components/` — `ui/`, `layout/`, `home/`, `motion/`, `forms/`, `blog/`, `life/`, `about/`, `seo/`.
- Images in `public/`: `hero_section_image.png`, `why_edu_images/1–6.png`, `mobile_app_images/`,
  `blog_images/`, `images/` (logo, icons, founder photo), `Life_at_Edusolve_Images/<category folder>/`.

## Open items (waiting on the client)

- Real tutor quotes and photos (`TUTOR_QUOTES` are samples); parent quote photos when available.
- Kerala Board copy (grades covered, wording) in `src/content/curricula.ts` is a placeholder.
- Confirm Stories stats ("4.9/5", "95% families who continue").
- Blog: all posts are published; EduSolve's teaching team is reviewing them for accuracy.
- Privacy/Terms `[bracketed]` placeholders (kept for now, pending legal review).
- Centre timings (not shown yet); Life at EduSolve "Trips & events" photos; parental consent for
  student photos (achievement posters, classroom photos).
- Official Google Play badge artwork; App Store badge once the iOS app launches.
