# Look: world, colour, type and hierarchy

What a picky designer sees first, in order: whether the page has a world of its own, whether one thing leads, and whether the things on it look real. This file covers the first two. `art.md` covers the third.

In an existing product, its brand wins. Use its logo, fonts and colours, and apply only sections 4 and 5 here.

## 1. Pick the world

Write one line in the brief: `World: <kit> / <type pairing> / <art: yes or no> / <hero: what leads>`.

Evidence from proof2: the two arms that beat the skill put the page on a tinted paper colour (prompt 24 of 24 pages, anthropic at least 22 of 24), used a serif display face on 21 of 48 pages, and drew the products. The skill used a white page and the system font on all 24 pages, and lost all 24 groups.

## 2. Kits

Each kit sets every colour token. Paste its two lines over the colour lines of the token block in `tokens.md`. All pairs pass WCAG AA: muted text at least 5.3:1 on page, surface and subtle tints, accent at least 5.2:1, field edges at least 3.2:1.

| Kit | For |
|---|---|
| Pantry | food, recipes, groceries, restaurants, cafes, hospitality |
| Atelier | fashion, shoes, beauty, furniture, retail, marketplaces |
| Harbour | finance, banking, B2B, admin, legal, dev tools, analytics |
| Clinic | health, booking, care, wellness, fitness, HR |
| Depot | logistics, inventory, field work, manufacturing, property |
| Studio | media, events, education, creators, community, freelancing |

```css
/* Pantry */
--bg:#f7f3ec; --bg-subtle:#efe9df; --surface:#ffffff; --border:#e6dfd3; --border-strong:#8a8378; --text:#1d1b18; --text-muted:#5f5a52; --accent:#1f5c45; --accent-hover:#174a37; --accent-subtle:#e3eee7; --on-accent:#ffffff; --deep:#163d2f;
/* dark */ --bg:#141412; --bg-subtle:#22221e; --surface:#1c1c19; --border:#302f2a; --border-strong:#78746a; --text:#ecebe6; --text-muted:#a9a59b; --accent:#7cc4a2; --accent-hover:#9dd5bb; --accent-subtle:#1b2e25; --on-accent:#0d1a14; --deep:#10261e;
/* Atelier: ink primary, the product art carries the colour */
--bg:#f4f1ec; --bg-subtle:#ece7df; --surface:#ffffff; --border:#e3ddd4; --border-strong:#87827a; --text:#1c1b19; --text-muted:#5e5a54; --accent:#1c1b19; --accent-hover:#3a3834; --accent-subtle:#ebe5dc; --on-accent:#ffffff; --deep:#1c1b19;
/* dark */ --bg:#131312; --bg-subtle:#232220; --surface:#1c1b1a; --border:#2f2d2a; --border-strong:#7a766f; --text:#eeece8; --text-muted:#aaa69f; --accent:#f2efe9; --accent-hover:#ffffff; --accent-subtle:#2a2825; --on-accent:#1c1b19; --deep:#0e0e0d;
/* Harbour */
--bg:#f3f5f8; --bg-subtle:#eaeef3; --surface:#ffffff; --border:#dfe3ea; --border-strong:#838995; --text:#16181d; --text-muted:#5b616e; --accent:#2754c5; --accent-hover:#1f45a6; --accent-subtle:#e8eefc; --on-accent:#ffffff; --deep:#14285a;
/* dark */ --bg:#111318; --bg-subtle:#20242c; --surface:#1b1e25; --border:#2b2f38; --border-strong:#6f7685; --text:#e9ebef; --text-muted:#a0a6b2; --accent:#7a9cff; --accent-hover:#9bb5ff; --accent-subtle:#1c2540; --on-accent:#0b1020; --deep:#0e1a38;
/* Clinic */
--bg:#f1f4f2; --bg-subtle:#e7ece9; --surface:#ffffff; --border:#dce3df; --border-strong:#7f8a85; --text:#151b19; --text-muted:#56605c; --accent:#0b6b5f; --accent-hover:#08564c; --accent-subtle:#e0f0ec; --on-accent:#ffffff; --deep:#0b3a35;
/* dark */ --bg:#111614; --bg-subtle:#1f2724; --surface:#19201d; --border:#2a3430; --border-strong:#6d7d77; --text:#e7edea; --text-muted:#9fb0a9; --accent:#5ccbb8; --accent-hover:#86dacb; --accent-subtle:#123029; --on-accent:#06201b; --deep:#0a2622;
/* Depot */
--bg:#f3f3f0; --bg-subtle:#e9e9e4; --surface:#ffffff; --border:#e0e0da; --border-strong:#85878a; --text:#191a1c; --text-muted:#5a5c60; --accent:#9a4a0c; --accent-hover:#7d3c09; --accent-subtle:#f6e9dc; --on-accent:#ffffff; --deep:#2a2620;
/* dark */ --bg:#131414; --bg-subtle:#232425; --surface:#1c1d1e; --border:#2e3031; --border-strong:#75787b; --text:#ebebea; --text-muted:#a5a7aa; --accent:#f2a65e; --accent-hover:#f6bf8a; --accent-subtle:#33230f; --on-accent:#1f1206; --deep:#1a1713;
/* Studio */
--bg:#f6f3f1; --bg-subtle:#eee8e5; --surface:#ffffff; --border:#e6dfdc; --border-strong:#8a8284; --text:#1d1a1b; --text-muted:#605a5c; --accent:#a3285f; --accent-hover:#84204c; --accent-subtle:#f8e6ee; --on-accent:#ffffff; --deep:#40101e;
/* dark */ --bg:#151213; --bg-subtle:#252023; --surface:#1e1a1c; --border:#332c2f; --border-strong:#7d7377; --text:#eee9eb; --text-muted:#aea4a8; --accent:#f08ab5; --accent-hover:#f5aacb; --accent-subtle:#3a1a29; --on-accent:#24060f; --deep:#2c0e17;
```

How to use the colour:
- The page sits on `--bg`. Objects sit on `--surface` cards with a 1px `--border`: each list item, the featured item, the summary. The top bar or sidebar sits on `--surface` with a 1px edge.
- Commit to the accent: the primary button, the active nav item, links, selection, the mark, the featured badge, the first chart series, the route on a map. A page whose only colour is one button reads as grey.
- `--deep` is for one dark moment at most: a sign-in brand panel, a promo strip, or the "today" card that leads the page. White text on it, muted text at `rgb(255 255 255 / .72)`.
- Art tiles bring the other colours (`art.md`). Never a gradient, glass, or a second accent hue.

## 3. Type with no web font

The output contract usually bans web fonts. These stacks need none and render on Windows, macOS and Android.

| Face | Stack |
|---|---|
| Serif display | `"Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif` |
| Humanist display | `"Avenir Next", "Segoe UI Variable Display", "Segoe UI", system-ui, sans-serif` |
| Condensed display | `Bahnschrift, "DIN Alternate", "Roboto Condensed", "Arial Narrow", sans-serif` |
| Body (always) | `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| Mono (codes people copy) | `ui-monospace, "SF Mono", "Cascadia Mono", Consolas, monospace` |

| Kit | Display | Title weight and size |
|---|---|---|
| Pantry, Studio | Serif display | 600, 34 to 40px, -0.01em |
| Atelier | Body face, heavy | 800, 30 to 36px, -0.03em |
| Harbour | Body face | 650 to 700, 28 to 32px, -0.02em |
| Clinic | Humanist display | 700, 30 to 36px, -0.02em |
| Depot | Condensed display | 600, 30 to 36px, 0 |

Rules:
- The display face goes on the h1, the featured item's title, the wordmark and the one key number. Section titles may use it too. Never on body, labels, buttons or table cells.
- Contrast comes from size and weight together: title 2 to 2.6 times the body, section titles 20 to 22px, body 15 to 16px (14px in dense tools), labels 13px muted, meta 12 to 13px muted. Two weights carry the page: 400 and 600 or 700.
- Keep to six sizes of 20px or less, for example 12, 13, 15, 16, 18, 20, plus the display sizes (title, featured title, key number). `ui-check` warns above six.
- One quoted term in a title may take the display face in italic and the accent colour: the search query, the customer's name. Only one, only in the h1.
- Numbers that line up use the body face with `font-variant-numeric: tabular-nums`.
- Set the stacks as `--font` and `--font-display` in the token block.

## 4. Hierarchy: one thing leads

- **A hero or featured item** wherever the domain has one: the best match in search results, today's delivery in an order list, the next appointment, the item that needs action, the product image on a product page. It is the largest thing after the title, with the largest art, on a surface card. On the phone it shrinks to at most 40% of the first screen.
- **Fewer, larger items in the first screen.** Consumer lists: after the featured item, 2 to 5 items in the desktop fold, each with art, a title, 1 or 2 facts and one action. Work tools: rows 56 to 64px with a two-line first cell (name, then muted meta). At most 6 columns: fold category, supplier and IDs into the second line.
- **A summary strip fills its width.** 3 or 4 items, each a number and a short sentence ("2 out of stock: mussels and double cream"). Never 2 numbers with two thirds of the strip empty.
- **No dead gaps.** 24 to 40px between groups, 8 to 16px inside. No region taller than its content, no column that ends while its neighbour runs on.
- **One action per row at most**, quiet (text button or icon). The one primary action of the page is the only filled accent button in view.

## 5. The frame

Pick 3 or 4 brand moments. They sit in the frame, never on data cells.
1. **Logo**: a 28px mark plus the wordmark, 17 to 19px, 700, in the display face. The mark is 2 or 3 primitives from the domain (a bowl, a shoe sole, a route line, a tooth, a box) in the accent on a tile, or a monogram.
2. **Display title** on the scale above.
3. **Art** for the products and a featured item (`art.md`).
4. **One domain detail** that only this product would have, used where it carries information: the delivery slot promise, a route line with the current stop, "12 days overdue", the next free slot called out, a par marker on stock bars.
5. **A `--deep` moment** (section 2), at most one.

## 6. Check

- [ ] Page on `--bg`, objects on `--surface`, kit lines pasted in both themes.
- [ ] The h1 uses the display face at the kit's weight and size.
- [ ] The accent appears in at least four roles.
- [ ] One hero or featured item leads, where the domain has one.
- [ ] Rows are two-line where a table would need more than 6 columns.
