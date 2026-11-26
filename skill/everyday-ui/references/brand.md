# Brand and character

A product screen needs character, not decoration. Grey nothing loses to a branded product as surely as slop does.

The rule: **restraint in the working surface, character in the frame.**
- The frame is the logo, the sidebar or top bar, page titles, key numbers, sign-in and onboarding panels, empty states, upgrade moments.
- The working surface is tables, forms, charts and data. It stays neutral, dense and exact.

In an existing product, its brand is the brand. Use its logo, font and colours, and skip to section 4 to place brand moments with what it already has. Never invent a second brand inside someone's product.

## 1. Name the world

Add three lines to the brief:
```
Product: <name; invent a short, plausible one if the task gives none: "Kestrel Billing">
Feel: <one word: precise, calm, warm, sturdy, quick, friendly>
Domain detail: <one thing that belongs only to this domain, see section 5>
```

## 2. Pick a kit

Each kit is an accent, tints and a deep brand colour, checked for WCAG AA in both themes. Paste the kit's values over the matching lines of the token block in `tokens.md`.

| Kit | Domains | Light: accent / hover / subtle / frame / deep / on-deep muted | Dark: accent / hover / subtle / frame / deep / on-deep muted |
|---|---|---|---|
| Harbour | finance, banking, B2B, admin, legal, dev tools | `#2754c5` `#1f45a6` `#eef3fd` `#f4f7fd` `#14285a` `#b9c8ee` | `#7a9cff` `#9bb5ff` `#1c2540` `#131a2b` `#0e1a38` `#a9bbef` |
| Fern | health, care, operations, logistics, infrastructure | `#0b7671` `#085f5b` `#e6f4f3` `#f1f8f7` `#0b3a37` `#a6d8d2` | `#4fc7bd` `#7dd8d0` `#0f2e2c` `#111d1c` `#0a2a28` `#9fd3cd` |
| Ember | commerce, food, travel, consumer, marketplaces | `#c2410c` `#9a3412` `#fdeee5` `#f7f7f8` `#1c1f26` `#b4b9c4` | `#ff9a5c` `#ffb88a` `#36210f` `#17191d` `#0f1115` `#a0a6b2` |
| Crimson | media, events, education, HR, community | `#b42346` `#921c39` `#fcebef` `#fcf5f7` `#40101e` `#f1b8c7` | `#ff7d9a` `#ffa3b8` `#37141e` `#1c1417` `#2c0e17` `#eeb1c0` |

Token names: `--accent`, `--accent-hover`, `--accent-subtle`, `--frame`, `--brand-deep`, `--on-deep-muted`, and `--accent-on-deep` (the kit's dark-mode accent). Text on `--brand-deep` is `#ffffff` in light and `--text` in dark.

- Ember keeps a neutral frame and a graphite brand panel, so orange is the only warm note. It is not the banned cream-and-terracotta look: no cream page, no serif display, no clay accent on a beige ground. Never place an orange primary beside a red destructive button.
- On the brand panel, use `--accent-on-deep` (5.4:1 or more on the deep colour) for links and filled buttons, with `#0b1020` text on those buttons. Panel text uses `--on-deep` and `--on-deep-muted`.
- Contrast proof (worst case): `--text-muted` on `--frame` 5.8:1, on `--accent-subtle` 5.3:1. Accent on frame 4.8:1. White on deep 12.5:1. Dark accent on dark frame 6.6:1. Recompute if you change a value.

Colour needs a job and enough presence. Use the accent on the primary button, the active nav item, links, selection, focus, the mark and the first chart series. Use status colours on badges and deltas. Use one tinted surface (the frame). A page whose only colour is one blue button reads as grey.

### Make it this product's own

Two products must never look like siblings. Choose three levers on purpose and write them in the brief's Signature line:

| Lever | Options |
|---|---|
| Hue | The kit's default accent, or its variant below |
| Shape | Crisp: radii 2/4/6/8. Standard: 4/6/8/12 (token default). Soft: 6/10/12/16 |
| Type | Pairing A or B for the feel in section 3 |

| Kit | Variant | Light accent / hover | Dark accent / hover |
|---|---|---|---|
| Harbour | Steel | `#1f5f9e` / `#174b7d` | `#7fb0e6` / `#a6c8ee` |
| Fern | Ocean | `#0e6a87` / `#0a546b` | `#5ec2de` / `#8ad3e8` |
| Ember | Copper | `#a84a12` / `#86390c` | `#f0a060` / `#f5bb88` |
| Crimson | Berry | `#a3285f` / `#84204c` | `#f08ab5` / `#f5aacb` |

All variants pass AA in both themes and stay clear of the status colours. Keep the kit's tints with a variant. If you build more than one product in a session, change at least two levers between them.

## 3. Type

Product and finance UI use one sans family, or a sans display with a sans body. A serif display is only for editorial, craft or education brands, where reading is the product.

| Feel | Pairing A | Pairing B |
|---|---|---|
| Precise (finance, banking, legal, B2B) | IBM Plex Sans, 600 titles | Schibsted Grotesk 700 + Inter |
| Technical (dev tools, infra, analytics) | Geist, 600 titles | Inter Tight 600 + Inter |
| Sturdy (logistics, field ops, manufacturing) | IBM Plex Sans Condensed 600 + IBM Plex Sans | Barlow Semi Condensed 600 + Inter |
| Calm, friendly (health, care, HR) | Manrope, 700 titles | Plus Jakarta Sans 700 + Inter |
| Warm, lively (commerce, food, travel, events) | Bricolage Grotesque 600 + Inter | Sora 600 + Inter |
| Editorial, craft, education, media | Fraunces 600 + Inter | Source Serif 4 600 + Source Sans 3 |
| Public services, long forms | Public Sans, 700 titles | Source Sans 3, 700 titles |

Mono (IBM Plex Mono, Geist Mono) only for codes people copy.

### The type scale

| Role | Size | Face and weight | Tracking | Line-height |
|---|---|---|---|---|
| Page title (h1, desktop) | 28 to 32px | display, 600 to 700 | -0.02em | 1.15 |
| Phone app bar title | 17 to 20px | display or body, 600 | -0.01em | 1.3 |
| Key number (balance, KPI, price, total) | 28 to 40px | display or body, 600, `tabular-nums` | -0.02em | 1.1 |
| Section title (h2) | 18 to 20px | display or body, 600 | -0.01em | 1.3 |
| Body and table text | 14 to 15px dense, 16px forms | body, 400 | 0 | 1.45 to 1.55 |
| Labels, table headers | 13 to 14px | body, 500, `--text-muted` | 0 | 1.4 |
| Meta, captions | 12 to 13px | body, 400, `--text-muted` | 0 | 1.35 |

Rules:
- The desktop page title is about twice the body size (28 on 14). `ui-check` warns below 1.8 times. Phone app bar titles are exempt.
- Two weights carry the contrast: 400 for reading, 600 or 700 for titles and key numbers. 500 only for labels and nav.
- The display face goes on titles, the wordmark, the brand panel headline and one or two key numbers. Never on body, labels or table cells.
- Numbers in tables and lists use the body face with `tabular-nums`. `ui-check` warns when the body face has no tabular figures.
- Brand panel headline: 36 to 44px, display, -0.025em.
- Arm's-length test: in `desktop-squint.png` the title, the key number and the primary action read first, in that order.
- Load from Google Fonts only when the output contract allows network:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap">
  ```
  Then `--font: "IBM Plex Sans", system-ui, sans-serif; --font-display: var(--font);`.
- With no network: keep the system stack, and carry the voice with weight (700 titles), tight tracking (-0.02em), the mark and the kit.

## 4. Brand moments

Pick 3, at most 4. Each one sits in the frame, never on data.

1. **Logo.** A 28px mark plus the wordmark, 16 to 18px, weight 600 to 700, top left of the sidebar or top bar, and on the sign-in panel.
2. **Tinted frame.** Sidebar or top bar on `--frame` with a 1px `--border` edge. The active nav item on `--accent-subtle` with an `--accent` icon.
3. **Confident titles and key numbers.** Every h1 and the key number on the type scale above.
4. **Brand panel.** On sign-in, sign-up, onboarding and upgrade screens: a `--brand-deep` panel with the logo, a concrete headline ("Get paid 9 days sooner"), one line in `--on-deep-muted`, and a product glimpse.
5. **Product glimpse.** A small, real piece of the product built from your own components and fixture data: an invoice row turning "Paid", a shipment with three stops. Never a screenshot, a stock photo, fake logos or a testimonial.
6. **Empty-state art.** 120 to 160px, drawn from the product's own shapes (two ghost rows, a mini card) in `--accent-subtle`, `--border` and one `--accent` detail.
7. **Entity marks.** Initials only for people (circle) and merchants (rounded square), on `--accent-subtle` in `--accent`. Tasks and notes get an icon. Products get a product glyph or a thumbnail-like tile. Never a generic image placeholder.

## 5. One domain detail

Choose one thing that only this product would have. Use it once or twice, where it carries information.

| Domain | Detail |
|---|---|
| Invoicing, accounting | "12 days overdue" beside the due date; a paid-progress bar on part-paid invoices |
| Banking | Spent this month against your usual, as one bar with a marker |
| Logistics | A route line with stops and the current stop filled |
| Health, booking | Appointment blocks on a day strip; the next free slot called out |
| Commerce | Product glyph tiles; the delivery date promise in the summary |
| Dev tools | Environment badges (Production, Staging); a deploy timeline with the live build marked |
| HR, people | Stacked team avatars with "+4"; time off as a small calendar strip |
| Education | Progress per module as a thin bar with "3 of 8 lessons" |

## 6. The mark

Inline SVG, 28 by 28, `aria-hidden="true"`, next to the product name in text.

- Monogram: `<svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true"><rect width="28" height="28" rx="7" fill="var(--accent)"/><text x="14" y="19" text-anchor="middle" font-family="var(--font-display)" font-weight="700" font-size="15" fill="var(--on-accent)">K</text></svg>`
- Domain glyph: 2 or 3 primitives in `--on-accent` on the accent tile: stacked bars (finance), a chevron (logistics), a rounded plus (health), a 2x2 grid (scheduling).
- Open glyph: the glyph alone in `--accent`, stroke 2.5 to 3, when the sidebar already has a tint.

## 7. Check

- [ ] The logo, the tinted frame and a confident title are visible in the desktop fold.
- [ ] Brand colour never fills table cells, chart backgrounds or form fields.
- [ ] One accent, no gradients, no second hue. The accent appears in at least four roles (primary, active nav, links or selection, mark).
- [ ] Dark mode uses the kit's dark column.
