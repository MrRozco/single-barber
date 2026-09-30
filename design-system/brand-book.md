A sleek, mobile-first system for **one independent barber's** website — not a shop. Every page is a funnel: each section moves a visitor one step closer to **booking with that barber**.

## Pages

**Home (`/`)** — in this order, every CTA pointing at `#book` unless noted:

1. **Hero** — animated barber pole + snipping scissors, one headline, `Book a cut` (primary → `#book`) and `See my work` (secondary → `#cuts`).
2. **PortfolioCards** — swipeable signature cuts; `See all my cuts` → `/portfolio`.
3. **Testimonials** — real reviews with a rating summary.
4. **BookingCTA** (`id="book"`) — the barber's booking widget embedded, with prices and policies beside it.
5. **Footer** — where to find them, hours, links, socials.

**Portfolio (`/portfolio`)** — SiteHeader → PortfolioGallery (`stickyTop={64}`) → BookingCTA → Footer. Every cut's detail sheet ends in **Book this cut**.

**About (`/about`)** — SiteHeader → AboutIntro → Timeline → Approach → Testimonials → BookingCTA → Footer.

Add **StickyBookBar** to every page on phones and tablets so booking is always one tap away. Never add a second competing goal (newsletter pop-ups, merch) above the BookingCTA.

## One barber, not a shop

- Write in the barber's own voice: **"I"** and **"my"** for the barber, **"you"** for the client. Never "we", "our team", "our barbers" or "the shop".
- The brand is the barber: pass their name (or personal brand) as `brandName`. It appears in the hero, header and footer.
- Never ask the client to "pick a barber" or list barbers per cut; there is only one. Cut details show time, price and length instead.
- Say where they work in their own words ("my private suite", "Suite 4, 123 Main St"). Most solo barbers are **by appointment only**. Don't promise walk-ins unless the barber takes them.
- Trust comes from the person: years cutting, licences, their story (the About page), and reviews that name them.

## Booking embed

- The BookingCTA is designed around the barber's scheduler (Calendly, Square Appointments, Acuity, Booksy, Vagaro, Setmore…). Pass its embed URL as `embedSrc`, or pass a script-based widget as `children`.
- The widget only loads when it scrolls near view; until then, and while it loads, a skeleton calendar holds its space so the page doesn't jump. Set `embedHeight` to the widget's real height (Calendly ≈ 700–760px on phones).
- For Calendly, the page automatically sets the widget's background, text and button colours to `surface-raised`, `ink` and `brass`. For other tools, set those colours in the tool's own settings.
- Always keep the **Open in new tab** link (`openHref`) and a `phone` fallback: some widgets block embedding or break in in-app browsers such as Instagram's.
- Put price-from, typical length, deposit and cancellation terms in `details`; answering them next to the calendar removes the last reasons to hesitate.

## Content fundamentals

- Voice: confident, short, personal. First person singular. No emoji.
- Headlines are uppercase in `display-*` and under six words: "Fresh fades. Clean lines.", "Book your cut", "The path".
- CTA labels are verbs: "Book a cut", "Book with me", "See my work", "Book this cut". Never "Submit" or "Click here".
- Always show price or duration next to a cut ("45 min · from $35"). Uncertainty kills bookings.
- Reviews are real, verbatim, first name + last initial, and may name the barber. The sample copy in previews is placeholder.

## Visual foundations

- **Color.** Dark is the default theme: `surface` near-black, `ink` bone-white. `brass` is the only accent: primary buttons, the highlight word, stars, eyebrows, timeline. Put label text on brass in `on-brass`, never literal white or black. `pole-red`, `pole-white`, `pole-blue` belong to the barber pole and its stripes only, never text or a status. The light theme is for barbers who want a daytime look; every pair is checked in both.
- **Type.** `display-*` (Big Shoulders Display, condensed, uppercase) for headlines, card titles and the barber's name; `title`, `body`, `body-sm` (Manrope) for copy; `eyebrow` (DM Mono, uppercase, 0.16em tracking) for labels, times and prices. Body text never below 16px on inputs.
- **Spacing.** Gutters are `space-4` on phones and `space-6` from 640px; section padding `space-10` (`space-12` ≥1024px); title-to-content `space-6`; card gaps `space-4`–`space-5`.
- **Radii.** `radius-md` buttons and chips, `radius-lg` cards, the embed frame and photos, `radius-pill` rating pill, filter pill and pole.
- **Borders & shadows.** `line` for decorative hairlines, `line-strong` for any control's border. Cards and the embed use `shadow-card`; sticky bars `shadow-bar`.
- **Focus.** A solid 2px `ink` ring, 3px offset: ≥15:1 on every surface in both themes.
- **Motion.** The hero spins, snips and rises; the About portrait curtain-reveals; the timeline line draws as you scroll; sections below the fold rise in once (`Reveal`); the portfolio grid glides between filter states. Hover and press feedback stays ≤0.2s. All of it stops under `prefers-reduced-motion`.
- **Imagery.** The barber's own photos of their own cuts, portrait 4:5, natural light, one subject. A real portrait of the barber on About. No stock photos, no filters over faces.

## Responsive rules

Design at 390px first, then check every page at 768px and 1440px.

| Width | Tier | What changes |
| --- | --- | --- |
| < 640px | Phone | Single column; rails swipe with a peeking card; hero fills `100svh` with CTAs in the bottom third; sheets slide up from the bottom. |
| 640–1023px | Tablet | `space-6` gutters; CTAs sit side by side; home cuts become a 2×2 grid; reviews stay a swipe rail (58% cards); booking info splits into two columns above a full-width embed; About portrait sits beside the bio; header nav appears at 768px. |
| ≥ 1024px | Desktop | Content maxes out at 1120px and every section, the header and the hero share the same left edge; hero art moves to the right half; 4-up cut grids; booking info is sticky beside the embed (5:7); the cut sheet becomes a centred modal; the sticky book bar hides. |

- Tap targets ≥44px (`Button size="sm"` is the floor), at every width.
- Use `100svh`, not `100vh`, so iOS toolbars don't hide the CTA.
- Rails never auto-advance.

## Iconography

Inline stroke icons at 2.2px, `currentColor`, rounded caps (→ arrows, ✓ checks, the lock on the booking frame). Stars are the ★ glyph in `brass`. No icon font, no emoji.

## Using the components

Load React 18, `tokens.css`, `components/bundle.css` (it imports the Google Fonts), then `components/bundle.js`; components are on `window.SharpLine`. Each section carries its own `sl` scope and background.
