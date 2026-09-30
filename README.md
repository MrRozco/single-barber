# Sharp Line — barber website

A sleek, mobile-first site for **one independent barber**: home funnel, filterable portfolio, About page, and an embedded booking widget. Vite + React 19 + TypeScript + React Router.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Type-check (`tsc -b`) + production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | oxlint |
| `npm run format` | Prettier over `src/` |

Requires Node 20.19+ or 22.12+.

## Set up a new client (edit one file)

Everything a client changes lives in **`src/content/site.ts`**. Search it for `TODO`:

1. **Barber:** `brandName`, phone, address, map link, hours, socials, tagline.
2. **Booking:** paste the scheduler's embed URL into `booking.embedSrc` (e.g. `https://calendly.com/<handle>/haircut`) and set `provider`. Calendly is auto-themed to the site's colours; for Square, Acuity, Booksy or Vagaro, set colours in their dashboard. Leave it empty and a placeholder calendar shows.
3. **Cuts:** one entry per cut with `type` (`straight | wavy | curly | coily`) and `length` (`shaved | short | medium | long`). Put photos (4:5 portrait, WebP, ~1200px tall) in `public/cuts/` and set `image: "/cuts/skin-fade.webp"`. Mark 4 as `featured` for the home page.
4. **Reviews + rating:** real reviews only, verbatim, first name + last initial.
5. **About:** headline, bio, 3 facts, timeline, approach, and a portrait in `public/about/`.
6. **SEO:** `seo.siteUrl`, city and region (used for canonical URLs and the `BarberShop` structured data). Update the default `<title>`/description in `index.html` too.

## Structure

```
src/
  content/       site.ts (all copy + data) · types.ts
  components/    one file per section (Hero, PortfolioCards, Testimonials, BookingCTA,
                 Footer, StickyBookBar, SiteHeader, FilterChips, PortfolioGallery,
                 CutSheet, CutMedia, AboutIntro, Timeline, Approach, Reveal, Button, icons)
  pages/         Home · Portfolio · About · NotFound · shared.ts (footer/booking props)
  hooks/         motion.ts (useInView, useScrolledPast, prefersReducedMotion)
  lib/           seo.ts (per-page meta + JSON-LD) · cx.ts
  styles/        tokens.css (generated from design-system/tokens.json) · components.css · base.css
design-system/   tokens.json + brand-book.md: the source of truth for colours, type, spacing, voice
```

- **Theme:** dark by default. Set `<html data-theme="light">` in `index.html` for the light theme.
- **Styling:** plain CSS with design tokens (`var(--brass)`, `var(--space-4)`…). Class prefix `sl-`. Breakpoints: 640px (tablet) and 1024px (desktop).
- **Motion:** every animation respects `prefers-reduced-motion`.
- **Routing:** `/`, `/portfolio` (filters sync to `?type=&length=` for shareable links), `/about`. Links like `/#book` scroll to the section across pages.

## Deploy

It's a static SPA (`dist/`). SPA fallbacks are included for **Vercel** (`vercel.json`) and **Netlify** (`public/_redirects`). On other hosts, rewrite all paths to `/index.html`.

## Before launch

- [ ] Replace every `TODO` in `src/content/site.ts`
- [ ] Real photos for every cut + the portrait (the texture/monogram placeholders must not ship)
- [ ] Real booking embed URL, tested on a phone and inside Instagram's in-app browser
- [ ] Hours and address match the Google Business Profile exactly
- [ ] Replace `public/favicon.svg` if the barber has a logo
