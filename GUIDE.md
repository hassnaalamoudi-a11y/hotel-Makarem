# فندق إيجاد — Agied Hotel · Client Guide

A prototype built so you can judge the look and feel. Everything you may want to change
lives in **one file**: `src/lib/hotel-data.ts`. No layout code needs touching.

---

## 1 · Run it

```bash
npm install     # once
npm run dev     # development → http://localhost:3000
npm run build && npm start   # production
```

## 2 · The central data file — `src/lib/hotel-data.ts`

Each export is a plain array/object. The whole site renders from it.

| Export          | Feeds                                              |
| --------------- | -------------------------------------------------- |
| `hotel`         | Name, phone, WhatsApp, email, address, map, hours  |
| `heroSlides`    | Home hero slider (image, eyebrow, headline, CTA)   |
| `features`      | The 2×2 icon grid in "About Agied"                 |
| `rooms`         | Room cards, filters, and each room's detail page   |
| `amenities`     | The 4 white cards in the beige "Amenities" band    |
| `stats`         | Animated counters (rooms, years, guests, rating)   |
| `offers`        | Numbered offer rows (home) + Offers page cards     |
| `testimonials`  | The testimonial slider                             |
| `news`          | The 3 news / travel-tip cards                      |
| `navLinks`      | Navbar links                                       |

### Editing rules (the only 3 things to know)

1. **Every text is bilingual** — one object, two keys:
   ```ts
   title: { ar: "نص عربي", en: "English text" }
   ```
   Fill both; the language switcher picks the right one and mirrors the layout automatically.
2. **Numbers stay plain numbers** — `price: 420`, `size: 28`, `rating: 4.8`. No quotes.
3. **Images are paths** — drop a photo into `public/images/` and reference it as
   `"/images/my-photo.jpg"`.

### Adding a room — copy one object in `rooms`, change the fields, done:

```ts
{
  slug: "new-suite",            // becomes /rooms/new-suite
  type: "suite",                // single | double | suite | family  → drives the filter tabs
  name: { ar: "…", en: "…" },
  price: 750,                   // per night, SAR
  size: 40, capacity: 4,        // m² and guests
  images: ["/images/…"],        // first image is the card image; the rest build the gallery
  amenities: ["wifi", "ac", …], // see the icon key list at the top of the file
  featured: true,               // shows it on the home page
}
```

### Adding a seasonal offer — the recipe you asked for:

```ts
{
  slug: "national-day",
  tag: "seasonal",                       // seasonal | weekend | longstay
  title: { ar: "عرض اليوم الوطني", en: "National Day Offer" },
  subtitle: { ar: "…", en: "…" },
  description: { ar: "…", en: "…" },
  image: "/images/umrah-family.jpg",
  validUntil: { ar: "حتى ٣٠ سبتمبر", en: "Until Sep 30" },
  deadline: "2027-09-30T23:59:00",       // ← starts the countdown + "Limited Time" badge
  oldPrice: 800, newPrice: 599,          // optional — omit both for package offers
  perks: { ar: ["…", "…"], en: ["…", "…"] },
  featured: true,                        // pin it in the home offers list
}
```

A `deadline` automatically renders the countdown timer and the "Limited Time" badge —
nothing else to configure.

## 3 · Replacing placeholder photos

All images in `public/images/` are **placeholders** (23 files). Swap them with real hotel
photos keeping the same file name, or update the path in the data file. Key ones:

| Placeholder        | Should become                         |
| ------------------ | ------------------------------------- |
| `exterior-dusk.png`| Real façade (hero slide 1)            |
| `lobby.jpg` / `lobby-warm.jpg` | Lobby / reception         |
| `deluxe-queen.jpg` etc.        | Each room type            |
| `haram-view.jpg`   | Real view of the Haram                |
| `iftar.jpg`        | Ramadan buffet                        |
| `umrah-family.jpg` | Seasonal-offer banner                 |

Use JPG/WebP, ≥ 1600 px wide for hero/banners, ≈ 800 px for cards. Markers in code:
search `// TODO(photo)` comments in `hotel-data.ts` for spots awaiting real photography.

## 4 · Design decisions (short notes)

- **Elevate reference, hotelized**: cream `#FAF6F1` background, beige `#EBDCCB` section
  bands, espresso `#3B2F2A` text/buttons, muted gold accent, white rounded cards,
  pill buttons/tabs, 24–32 px radii, dark footer — all as CSS variables in
  `src/app/globals.css` (`[data-theme="light"]` / `[data-theme="dark"]`).
- **Fonts**: Plus Jakarta Sans (Latin) + Tajawal (Arabic) — geometric, warm, excellent Arabic weights.
- **Dark mode**: espresso/charcoal surfaces (never pure black), gold accents, dimmed
  imagery. Saved in `localStorage` (`agied-theme`), first visit respects the OS setting,
  a blocking inline script prevents any flash. Toggle uses the View Transitions API for a
  circular reveal (graceful fallback elsewhere).
- **Animations**: IntersectionObserver + CSS/WAAPI only (no animation library) —
  reveals at `cubic-bezier(0.22, 1, 0.36, 1)`, staggered cards, counter count-ups,
  scroll progress bar, hover lifts. `prefers-reduced-motion` disables all of it.
- **RTL-first**: Arabic is the default; the layout mirrors via `dir` and logical CSS
  properties, so English flips cleanly with no duplicated styles.
- **Mobile**: sticky bottom "Book Now" bar, floating WhatsApp button, 44 px+ tap targets,
  stacked offer cards replacing the numbered rows below `md`.
- **SEO**: per-page metadata + Open Graph, Hotel JSON-LD injected in `layout.tsx`.

## 5 · Structure

```
src/
  app/            layout.tsx · page.tsx (home) · rooms/ · offers/ · contact/
  components/     Navbar, Footer, RoomCard, SectionHeading, PageHero, Countdown,
                  Testimonials, VideoTour, ScrollProgress, motion.tsx (Reveal/Stagger), …
  lib/
    hotel-data.ts ← ALL editable content
    i18n.tsx      ← language + theme providers
```

## 6 · Known prototype limits (3-day scope)

- Booking / newsletter / contact forms validate and confirm but don't yet post to a
  backend — connect them to your PMS or CRM in phase 2.
- The video tour plays a placeholder MP4; swap `src` in `hotel-data.ts` (`tourVideo`).
- Map is an embedded OpenStreetMap iframe; swap to Google Maps Embed if preferred.
