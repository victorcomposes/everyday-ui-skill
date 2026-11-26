# Brand and character

A product screen needs character, not decoration. Grey nothing loses to a branded product as surely as slop does.

The rule: **restraint in the working surface, character in the frame.**
- The frame is the logo, the sidebar or top bar, page titles, sign-in and onboarding panels, empty states, upgrade moments.
- The working surface is tables, forms, charts and data. It stays neutral, dense and exact.

In an existing product, its brand is the brand. Use its logo, font and colours, and skip to section 4 to place brand moments with what it already has. Never invent a second brand inside someone's product.

## 1. Name the world

Add three lines to the brief:
```
Product: <name; invent a short, plausible one if the task gives none: "Ledgerly" is weak, "Kestrel Billing" is fine>
Feel: <one word: precise, calm, warm, sturdy, quick, clinical, friendly>
Domain detail: <one thing that belongs only to this domain, see section 5>
```

## 2. Pick a kit

Each kit is an accent, tints and a deep brand colour, checked for WCAG AA in both themes. Paste the kit's lines over the matching lines of the default token block in `tokens.md`.

| Kit | Domains | Light: accent / hover / subtle / frame / deep / on-deep muted | Dark: accent / hover / subtle / frame / deep / on-deep muted |
|---|---|---|---|
| Harbour | finance, B2B, admin, legal, insurance | `#2754c5` `#1f45a6` `#eef3fd` `#f4f7fd` `#14285a` `#b9c8ee` | `#7a9cff` `#9bb5ff` `#1c2540` `#131a2b` `#0e1a38` `#a9bbef` |
| Fern | health, care, operations, logistics, sustainability | `#0b7671` `#085f5b` `#e6f4f3` `#f1f8f7` `#0b3a37` `#a6d8d2` | `#4fc7bd` `#7dd8d0` `#0f2e2c` `#111d1c` `#0a2a28` `#9fd3cd` |
| Ember | commerce, food, travel, consumer, marketplaces | `#c2410c` `#9a3412` `#fdeee5` `#fcf6f1` `#42190a` `#f3c3a6` | `#ff9a5c` `#ffb88a` `#36210f` `#1b1613` `#2c150a` `#f0bc9c` |
| Crimson | media, events, education, HR, community | `#b42346` `#921c39` `#fcebef` `#fcf5f7` `#40101e` `#f1b8c7` | `#ff7d9a` `#ffa3b8` `#37141e` `#1c1417` `#2c0e17` `#eeb1c0` |
| Ink | developer tools, infrastructure, security, analytics | `#1c1f25` `#000000` `#eceef2` `#f6f7f9` `#16181d` `#a0a6b2` | `#e9ebef` `#ffffff` `#262a33` `#15171c` `#0b0c0f` `#a0a6b2` |

Token names: `--accent`, `--accent-hover`, `--accent-subtle`, `--frame`, `--brand-deep`, `--on-deep-muted`. Text on `--brand-deep` is `#ffffff` in light and `--text` in dark. `--on-accent` stays as in `tokens.md`.

Contrast proof (worst case per kit): `--text-muted` on `--frame` 5.8:1, on `--accent-subtle` 5.3:1. Accent on frame 4.8:1 or more. White on deep 12.5:1 or more. Dark accent on dark frame 6.6:1 or more. Recompute if you change a value.

Ember sits near `--danger`. Never place an orange primary beside a red destructive button.

## 3. Pick a type pairing

A display face gives the product its voice. A body face does the work. Two families at most.

| Feel | Display (h1, wordmark, panel headline, empty-state titles) | Body (everything else, all numbers) | Mono (code and IDs only) |
|---|---|---|---|
| Precise, institutional (finance, legal, insurance) | Source Serif 4, 600 | Source Sans 3 | Source Code Pro |
| Technical, quick (dev tools, infra, analytics) | Geist, 600, -0.02em | Geist | Geist Mono |
| Sturdy, operational (logistics, field ops, manufacturing) | IBM Plex Sans Condensed, 600 | IBM Plex Sans | IBM Plex Mono |
| Calm, friendly (health, care, education) | Manrope, 700, -0.01em | Manrope | none |
| Warm, lively (commerce, food, travel, events) | Bricolage Grotesque, 600, -0.02em | Inter | none |
| Clear, public (government, forms-heavy services) | Public Sans, 700 | Public Sans | none |

Rules:
- Numbers always use the body face with `tabular-nums`. `ui-check` warns when the body face has no tabular figures.
- Display sizes: h1 28 to 32px on app pages, 36 to 44px on brand panels. Line-height 1.15 to 1.2.
- Load from Google Fonts only when the output contract allows network:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,600&family=Source+Sans+3:wght@400;500;600&display=swap">
  ```
  Then `--font-display: "Source Serif 4", Georgia, serif; --font: "Source Sans 3", system-ui, sans-serif;`.
- With no network: keep the system stack, and carry the voice with weight (700 titles), tight tracking (-0.02em), the mark and the kit.

## 4. Brand moments

Pick 3, at most 4. Each one sits in the frame, never on data.

1. **Logo.** A 28px mark plus the wordmark in the display face, 16 to 18px, top left of the sidebar or top bar, and on the sign-in panel.
2. **Tinted frame.** Sidebar or top bar on `--frame` with a 1px `--border` edge. The active nav item on `--accent-subtle` with `--accent` icon.
3. **Display titles.** Every h1 in the display face.
4. **Brand panel.** On sign-in, sign-up, onboarding and upgrade screens: a `--brand-deep` panel with the logo, a concrete headline in the display face ("Get paid 9 days sooner"), one line in `--on-deep-muted`, and a product glimpse.
5. **Product glimpse.** A small, real piece of the product built from your own components and fixture data: an invoice row turning "Paid", a shipment with three stops, next week's appointments. Never a screenshot, a stock photo, fake logos or a testimonial.
6. **Empty-state art.** 120 to 160px, drawn from the product's own shapes (two ghost table rows, a mini card, a calendar block) in `--accent-subtle`, `--border` and one `--accent` detail. Not a stock illustration.
7. **Entity marks.** Customers, products and projects get a 24 to 32px tile with the initial on `--accent-subtle` in `--accent`, or a meaningful domain glyph (file type, carrier, category). Never a generic image placeholder icon.

## 5. One domain detail

Choose one thing that only this product would have. Use it once or twice, where it carries information.

| Domain | Detail |
|---|---|
| Invoicing, accounting | Invoice IDs as small mono chips; a "days overdue" count beside the due date |
| Logistics | A route line with stops and the current stop filled |
| Health, booking | Appointment blocks on a day strip; the next free slot called out |
| Commerce | Item thumbnails as tinted initial tiles; delivery date promise in the summary |
| Dev tools | Commit-style short hashes; environment badges (Production, Staging) |
| HR, people | Team avatars stacked with a "+4"; time-off as a small calendar strip |
| Education | Progress per module as a thin bar with "3 of 8 lessons" |
| Security | A coloured severity pip with the word; "last scanned" time |

## 6. The mark

Build it in inline SVG, 28 by 28, `aria-hidden="true"`, next to the product name in text.

Recipe A, monogram:
```html
<svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true"><rect width="28" height="28" rx="7" fill="var(--accent)"/><text x="14" y="19" text-anchor="middle" font-family="var(--font-display)" font-weight="700" font-size="15" fill="var(--on-accent)">K</text></svg>
```
Recipe B, domain glyph from 2 or 3 primitives in `--on-accent` on the accent tile: stacked bars (finance), a chevron path (logistics), a rounded plus (health), a 2x2 grid (scheduling), a bracket pair (dev tools).

Recipe C, open glyph: the glyph alone in `--accent`, no tile, stroke 2.5 to 3. Use this when the sidebar already has a tint.

## 7. Check

- [ ] The logo, the tinted frame and display titles are visible in the desktop fold.
- [ ] Brand colour never fills table cells, chart backgrounds or form fields.
- [ ] One accent, no gradients, no second hue.
- [ ] The brand panel and empty-state art carry product content, not decoration only.
- [ ] Dark mode uses the kit's dark column.
