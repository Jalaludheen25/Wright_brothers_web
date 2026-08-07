# Wright Brothers

Marketing site for **Wright Brothers** — a residential design-and-build studio
in Dubai, UAE.

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, Motion and
Lenis. Every page is statically prerendered; only the two form endpoints run on
demand.

---

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

| Script                   | What it does                                     |
| ------------------------ | ------------------------------------------------ |
| `npm run dev`            | Development server                               |
| `npm run build`          | Production build                                 |
| `npm run start`          | Serve the production build                       |
| `npm run lint`           | ESLint, zero-warnings                            |
| `npm run typecheck`      | `tsc --noEmit`                                   |
| `npm run check:contrast` | WCAG AA contrast guard (see below)               |
| `npm run check`          | All three — run this before pushing              |

---

## ⚠️ This is demonstration content

Every factual claim on this site is **invented to exercise the design**, not
supplied by a real business:

| What | File |
| --- | --- |
| 8 case studies with plot sizes, dates and performance figures | `lib/content/projects.ts` |
| 9 client testimonials attributed to named people | `lib/content/testimonials.ts` |
| 6 award wins and certifications | `lib/content/stats.ts` |
| Performance stats (240+ residences, 98% on programme, 16 years) | `lib/content/stats.ts` |
| 6 named staff with biographies | `lib/content/team.ts` |
| Address, phone, email, trade licence | `lib/site.ts` |

**Do not publish any of it against a real company.** Fabricated testimonials
are fake reviews, and invented award wins are checkable false claims — both
carry real legal and reputational exposure. Replace every item above with
verified content before the site goes anywhere near a live domain.

---

## Going live — checklist

Work top to bottom. The first two items are the ones that will bite.

### 1. Wire up form delivery ⚠️

`/api/contact` and `/api/newsletter` validate submissions and then hand them to
`src/lib/notify.ts`, which needs **one** of:

- `RESEND_API_KEY` + `CONTACT_TO_EMAIL` — sends a transactional email, or
- `FORM_WEBHOOK_URL` — POSTs the submission as JSON anywhere you like.

**If neither is set, both endpoints return HTTP 503** and show the visitor the
studio's phone number and email instead. That is intentional: a contact form
that quietly discards enquiries is worse than one that admits it is down. Set
one of these before launch and submit a test enquiry to confirm it arrives.

### 2. Replace the photography

`public/images/` holds 38 photographs sourced under the
[Unsplash License](https://unsplash.com/license) (free for commercial use, no
attribution required). They illustrate the *character* of the work — no image
is captioned as a job this company carried out, and `/terms` says so.

To swap them for your own:

1. Drop replacements into `public/images/` using the **same filenames**.
2. Regenerate `src/lib/images.ts` so dimensions and blur placeholders match —
   it stores `width`, `height` and a base64 LQIP per image, and `next/image`
   relies on all three.

Keys are semantic (`int-bath-luxe`, `craft-site`, `int-kitchen-modern`), so
content files referencing them keep working. Remove the disclosure paragraph in
`src/app/terms/page.tsx` once real photography is in.

### 3. Business details — partly real, partly still placeholder

Client-supplied and **live on the site**:

| Detail | Value |
| --- | --- |
| Address | 301, RAG Tower Business Centre, Al Barsha First, Dubai, UAE |
| Phone | +971 52 898 5055 |
| Email | info@wbtechuae.com |

Still **placeholder** in `src/lib/site.ts` — confirm each before launch:

- **WhatsApp number** — assumed to be the same mobile (+971 52 898 5055).
- **Map pin** (`CONTACT.geo`) — approximate Al Barsha First coordinates. Take the exact ones from the Google Business Profile.
- **Opening hours** — Sun–Thu 09:00–18:00, assumed.
- **Trade licence number** — currently `000000`.
- **Legal name** — currently "Wright Brothers Design & Build LLC".
- **Canonical domain** — `SITE.url` still defaults to `wrightbrothers.ae`, but the email domain is `wbtechuae.com`. Set `NEXT_PUBLIC_SITE_URL` to whichever is correct; every canonical tag, the sitemap and the OG URLs derive from it.
- **Social profiles** (`SOCIAL`) — placeholder handles.

### 4. Check the content

All copy lives in `src/lib/content/`, as typed TypeScript — no CMS:

```
projects.ts            8 case studies + the before/after pairs
services.ts            6 design-and-build services
technical-services.ts  the 8 trades, offered standalone
capabilities.ts  the 4 "drawn, then built" showcase cards
testimonials.ts  9 client quotes
insights.ts      6 long-form articles
process.ts       the 7 stages
faqs.ts          15 questions
team.ts          6 people + the studio values
stats.ts         counters, awards, credentials
```

Project figures, award claims and testimonials are illustrative and written to
demonstrate the design. **Have the client verify every factual claim** —
particularly the statistics on the home page, the awards on `/about`, and the
attributed quotes.

### 5. Verify the deployment

```bash
npm run check && npm run build
```

Then confirm: `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` and
`/opengraph-image` all respond, and that `NEXT_PUBLIC_SITE_URL` matches the
live origin (every canonical URL is derived from it).

---

## Architecture

```
src/
  app/                    routes; one folder per page, all statically rendered
    api/                  contact + newsletter endpoints
    layout.tsx            fonts, metadata, chrome, JSON-LD
    template.tsx          page-transition wrapper (remounts per navigation)
  components/
    layout/               header, footer, cursor, smooth scroll, WhatsApp FAB
    sections/             page-level composed sections
    ui/                   primitives: Reveal, AnimatedText, Button, Accordion…
  lib/
    content/              all editorial content
    site.ts               brand, contact, navigation
    seo.ts                metadata builder + JSON-LD schemas
    images.ts             generated image manifest (dimensions + LQIP)
    hooks.ts              hydration-safe media-query hooks
    notify.ts             form delivery
scripts/
  check-contrast.mjs      WCAG guard, reads the palette from globals.css
```

### Brand assets

The logo is a horizontal lockup (monogram + wordmark), 2892×652 PNG, supplied
in two inks:

```
public/logo/Black_logo.png   dark ink, for light surfaces
public/logo/white_logo.png   white ink, for dark surfaces
```

`components/ui/Logo.tsx` renders them. `tone="dark"` / `tone="light"` picks one;
`tone="auto"` stacks both and crossfades on the `--logo-dark` / `--logo-light`
custom properties, which is how the header moves between its transparent and
solid states without the logo popping.

`src/app/icon.png` (512²) and `src/app/apple-icon.png` (180²) are generated
from the monogram — cropped from the lockup at x 0–604, set in white on the ink
background so they read on both light and dark browser chrome. Regenerate them
if the logo changes.

### Design system

Tokens live in the `@theme` block of `src/app/globals.css` — colours, the fluid
type scale, easing curves and layout containers. Utilities worth knowing:

- `.display` — Cormorant, tight leading, for headings
- `.label` — letterspaced uppercase micro-type
- `.container-wide` / `.container-x` / `.container-prose` — the three widths
- `.grain`, `.glass`, `.link-underline`, `.kenburns`, `.marquee-track`

### The capabilities showcase

`src/components/sections/capabilities/` holds the pinned horizontal section on
the home page ("Every house exists twice — once in drawing, once in stone").

```
CapabilitiesShowcase.tsx   orchestrator: measurement, scrub, seek, heading
CapabilityCard.tsx         3D cursor tilt, brass glare, drawing/built toggle
BlueprintLayer.tsx         authored SVG plan / elevation / axonometric / detail
TrackProgress.tsx          "01 / 04" counter and seekable rail
EnquiryModal.tsx           lead capture for the unlaunched discipline
```

Content is in `src/lib/content/capabilities.ts`. Three things about it are
load-bearing:

**The travel distance is measured, not guessed.** A `ResizeObserver` watches
the track and its shell and computes the exact pixel overflow; the section's
height becomes `100svh + overflow`, so the scrub finishes precisely as the pin
releases. A hard-coded `-65%` would over- or under-scroll at most widths.

**Three layout modes, chosen by measurement.** Below 1024px the track is a
vertical stack. On desktop where the four cards genuinely overflow, it pins and
scrubs. Where they fit — a very wide display, or any width under
`prefers-reduced-motion` — pinning is skipped and the row becomes a native
scroll-snap container, so the last card stays reachable without animation.

**Cards are sized off viewport height** (`lg:h-[clamp(21rem,54svh,32rem)]`,
width from the 3:4 ratio), which is what keeps the whole pinned frame inside
`100svh` on short laptop screens instead of cropping the bottom row.

### A few decisions worth knowing about

**Contrast is enforced, not eyeballed.** `npm run check:contrast` parses the
palette out of `globals.css`, scans the components for every
`text-<token>/<alpha>` in use, and fails the build if any pair drops below WCAG
AA. `brass` is a display-only accent held to the 3:1 large-text threshold;
`brass-deep` is its small-text counterpart on light surfaces, and
`brass-light` the equivalent on dark ones. Changing a colour without running
this is how the palette silently regresses.

**Reduced motion is honoured properly.** `usePrefersReducedMotion` in
`lib/hooks.ts` is built on `useSyncExternalStore` rather than motion's own
hook, because motion's version reads `matchMedia` during the first client
render and any component branching on it then hydrates differently than it
rendered on the server. `<MotionConfig reducedMotion="user">` in the root
layout covers the one frame in between. Lenis is not initialised at all for
these users — native scrolling is left completely alone.

**Position utilities are props, not classNames.** `ParallaxImage` and
`StaticImage` take a `fill` prop instead of accepting `className="absolute
inset-0"`. Passing a second position utility leaves Tailwind's stylesheet
order — not the class list order — to decide the winner, which is exactly the
kind of bug that renders a background image at zero height. The same reasoning
is why `Button`'s ghost variants own their text colour.

**The site is fully static.** `/projects` reads its `?area=` filter through
`useSearchParams` inside a Suspense boundary rather than via the server's
`searchParams`, which keeps the page prerendered while still supporting the
footer's community links.

---

## Accessibility

Verified across every route at 1440px and 360px via
`scripts/audit-a11y.mjs` (see the header of that file to run it):

- One `h1` per page, no skipped heading levels
- Every image carries an `alt` (empty where decorative)
- Every link, button and form control has an accessible name
- No duplicate `id`s, no horizontal overflow
- Skip link, visible focus rings, full keyboard operation

Interactive components carry real semantics rather than approximations: the
before/after comparison is an ARIA `slider` (arrow keys, Home/End), the FAQ is
a disclosure pattern with `aria-expanded`/`aria-controls`, the testimonial
carousel pauses on hover and focus and announces changes politely, the filter
chips report state via `aria-pressed` with a live result count, and the teaser
dialog traps focus while open and restores it to the trigger on close.

Nothing in the capabilities showcase is hover-only: every card carries an
explicit `aria-pressed` toggle for the drawing/built state, so the interaction
is available to touch and keyboard users, not just to a mouse.

---

## Performance

- All 38 images pre-optimised, served as AVIF/WebP by `next/image` with a
  base64 LQIP behind each one
- Fonts self-hosted through `next/font` with `display: swap` and preload
- No UI framework, no icon library — icons are inline SVG
- Marquee, grain and hover states are CSS-only
- One-year immutable cache headers on `/images` and `/fonts`
- Security headers (HSTS, nosniff, frame options, referrer, permissions) in
  `next.config.ts`

---

## Licence

Copyright © Wright Brothers Design & Build LLC. Photography under the Unsplash
License pending replacement — see "Going live" above.
