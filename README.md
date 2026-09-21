# EduSolve — React + Tailwind

A React rebuild of the EduSolve marketing site (1-on-1 online tuition for Gulf-based Indian
families). Migrated from the original static "DC" HTML build to a componentised, fully responsive
single-page app.

## Tech stack

- **React 18** with **React Router 6** (client-side routing)
- **Vite 5** (dev server + build)
- **Tailwind CSS 3** (utility-first styling with a small custom design-token layer)

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Project structure

```
src/
├── main.jsx                 # App entry, mounts the router
├── App.jsx                  # Route table
├── index.css                # Tailwind layers + a few keyframes
├── data/                    # All copy/content, kept out of the JSX
│   ├── site.js              # Nav, contact details, social links
│   ├── content.js           # Per-page content (curricula, FAQs, tutors…)
│   └── tones.js             # Semantic colour-tone → class mapping
├── hooks/
│   └── useCountUp.js         # Scroll-triggered stat counter animation
├── components/
│   ├── layout/              # Header, Footer, Layout shell, ScrollToTop
│   ├── ui/                  # Reusable building blocks (Button, SectionHeading…)
│   └── icons/               # Inline SVG icon set
└── pages/                   # One component per route
```

## Design tokens

Brand colours and fonts live in [`tailwind.config.js`](./tailwind.config.js):

- `brand.red` `#d20321` · `brand.green` `#a7c957` · `brand.ink` `#161a1d`
- Headings: **Poppins** · Body: **Manrope** (loaded from Google Fonts in `index.html`)

## Responsiveness

Every page is fluid from ~320px phones up to large desktops. Layout grids collapse at Tailwind
breakpoints (plus a couple of custom `min-[…px]` breakpoints that mirror the original design), the
header nav folds into a burger menu under 1130px, and the footer/CTA/stat grids re-flow to fewer
columns on smaller screens.

## Notes

- Tutor photos and the hero image use a styled placeholder component
  (`ImagePlaceholder`) — swap them for real `<img>` tags when assets are ready.
- The contact form is client-side only (shows a thank-you state on submit), matching the original.
  Wire it to a backend / form service before going live.
- Legal pages (Privacy, Terms) carry the original placeholder text — have them reviewed by a legal
  professional before publishing.
```
