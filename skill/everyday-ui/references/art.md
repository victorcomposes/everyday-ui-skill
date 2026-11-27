# Art: product imagery in inline SVG

Read this when the screen shows things that have a look: food, products, clothes, groceries, homes, rooms, vehicles, people, places. Most consumer screens do.

Why: in proof2, every judge called the skill's search results "placeholders" because each recipe had the same small pot icon on a pink tile. The winning pages drew a different dish for each recipe, at a real size, with one big featured image. Pictures of the actual things are the largest single difference a judge sees.

## Rules

- **Draw the thing, not an icon of it.** A dish is a bowl with food in it. A shoe is a side view of a shoe. An order is the groceries in it. Icons are for actions and navigation only.
- **Every item looks different.** Vary the palette and the shape per item. Never show the same picture 3 times in one view. `ui-check` warns on repeated art.
- **Real sizes.** Thumbnails in lists 72 to 96px. Cards 160 to 240px tall. One hero or featured image 280px or taller on desktop. On the phone the hero is at most 40% of the first screen, so the job still shows.
- **One art style per page.** Flat fills, 3 to 5 colours per picture, a soft shadow ellipse below, light from the top left, no outlines except a 1px darker tone. Tile backgrounds are pale tints that sit well with the kit.
- **The object fills its tile.** 70 to 85% of the tile height. A small object in a big tile reads as an icon again.
- **Fixed box.** `aspect-ratio` on every picture, so nothing jumps. Rounded corners nest inside their card. In a square box add `preserveAspectRatio="xMidYMid slice"`: the recipes keep the object in the middle 120 by 120, so a square crop keeps it whole, except the shoe and the van, which need 4:3.
- **Accessible.** A picture that names an item gets `role="img"` and `aria-label` ("Coconut chickpea curry"). A decorative one gets `aria-hidden="true"`.
- **Dark mode.** Darken the tile tints, keep the object colours. Never leave a bright white tile on a dark page.

## The art kit technique

Define each shape once as a `<symbol>`. Colour its parts with classes that read CSS custom properties. Each `<svg><use></svg>` sets its own palette, so one shape gives many different pictures.

```html
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
  <!-- symbols from the recipes below -->
</defs></svg>

<svg class="art p3" viewBox="0 0 160 120" role="img" aria-label="Chana masala"><use href="#art-bowl"/></svg>
```
```css
.art { display: block; width: 100%; height: auto; aspect-ratio: 4 / 3; border-radius: var(--r-lg); }
/* Plain class selectors: elements inside <use> do not match ".art .a-t". Custom properties still inherit. */
.a-t { fill: var(--a-tile); } .a-m { fill: var(--a-main); } .a-2 { fill: var(--a-2); }
.a-3 { fill: var(--a-3); } .a-k { fill: var(--a-ink); } .a-s { fill: var(--a-skin, #d9a27a); } .a-sh { fill: #000; opacity: .1; }
.a-ln { fill: none; stroke: var(--a-ink); stroke-width: 3; stroke-linecap: round; }
.a-st { fill: none; stroke: var(--a-3); stroke-width: 6; stroke-linecap: round; }
/* Six palettes. Give item i the class p(i % 6 + 1), then shuffle shapes too. */
.p1 { --a-tile: #f4dfae; --a-main: #d9861c; --a-2: #fffaf0; --a-3: #f7e7bd; --a-ink: #3f7a46; }
.p2 { --a-tile: #f3d3c6; --a-main: #c2412b; --a-2: #fff7f2; --a-3: #f4c9a0; --a-ink: #45773e; }
.p3 { --a-tile: #dde7cf; --a-main: #6f9b3c; --a-2: #fbfaf2; --a-3: #e9d27a; --a-ink: #2f5130; }
.p4 { --a-tile: #e8dccb; --a-main: #8a5a35; --a-2: #fdf8f0; --a-3: #d9b98b; --a-ink: #4b3424; }
.p5 { --a-tile: #d6e2ea; --a-main: #2f5f8a; --a-2: #f8fbfd; --a-3: #e8eef3; --a-ink: #1f3448; }
.p6 { --a-tile: #ead5df; --a-main: #9a3c62; --a-2: #fdf6f9; --a-3: #f0c3d3; --a-ink: #4a2233; }
@media (prefers-color-scheme: dark) {
  .p1 { --a-tile: #3a3020; } .p2 { --a-tile: #3b2722; } .p3 { --a-tile: #2b3424; }
  .p4 { --a-tile: #342b22; } .p5 { --a-tile: #233039; } .p6 { --a-tile: #36252d; }
}
```
Tune the six palettes to the domain: warm food tones, clean product colours, muted home tones. Keep `--a-tile` pale and `--a-main` saturated, so the object stands out from its tile.

## Recipes

All use `viewBox="0 0 160 120"` unless noted. Copy, then vary: move the pieces, add or drop one part, swap palettes.

**Dish, top down** (recipes, restaurants, meal kits). Variants: a dark pan with a handle (`a-k` circle plus a handle rect), a wide plate with rice beside the main.
```html
<symbol id="art-bowl" viewBox="0 0 160 120">
  <rect class="a-t" width="160" height="120"/>
  <circle class="a-sh" cx="85" cy="65" r="46"/>
  <circle class="a-2" cx="80" cy="60" r="46"/>
  <circle class="a-m" cx="80" cy="60" r="34"/>
  <g class="a-3"><circle cx="68" cy="50" r="5"/><circle cx="86" cy="46" r="4.5"/><circle cx="96" cy="60" r="5"/>
    <circle cx="74" cy="68" r="5"/><circle cx="90" cy="74" r="4.5"/><circle cx="62" cy="62" r="4"/><circle cx="80" cy="58" r="4"/></g>
  <g class="a-k"><ellipse cx="78" cy="44" rx="4" ry="2" transform="rotate(30 78 44)"/><ellipse cx="100" cy="70" rx="4" ry="2" transform="rotate(-40 100 70)"/>
    <ellipse cx="66" cy="76" rx="4" ry="2" transform="rotate(70 66 76)"/></g>
</symbol>
```

**Grocery items** (supermarkets, pantry, order contents). Use 2 or 3 together, overlapping, to picture a whole order.
```html
<symbol id="art-carton" viewBox="0 0 160 120"><rect class="a-t" width="160" height="120"/>
  <ellipse class="a-sh" cx="84" cy="106" rx="34" ry="5"/>
  <path class="a-2" d="M56 40 L80 16 L104 40 V104 H56 Z"/><path class="a-m" d="M56 56 H104 V86 H56 Z"/>
  <path class="a-3" d="M56 40 L80 16 L104 40 Z"/></symbol>
<symbol id="art-fruit" viewBox="0 0 160 120"><rect class="a-t" width="160" height="120"/>
  <ellipse class="a-sh" cx="82" cy="104" rx="38" ry="6"/>
  <circle class="a-m" cx="80" cy="66" r="38"/><ellipse class="a-2" cx="66" cy="50" rx="9" ry="5" opacity=".5"/>
  <path class="a-ln" d="M80 30 q2 -8 7 -14"/><ellipse class="a-k" cx="94" cy="24" rx="11" ry="5" transform="rotate(-25 94 24)"/></symbol>
<symbol id="art-loaf" viewBox="0 0 160 120"><rect class="a-t" width="160" height="120"/>
  <ellipse class="a-sh" cx="82" cy="94" rx="40" ry="5"/>
  <rect class="a-m" x="40" y="50" width="80" height="42" rx="21"/>
  <path class="a-ln" d="M58 58 l8 12 M76 56 l8 12 M94 56 l8 12" style="stroke:var(--a-3)"/></symbol>
<symbol id="art-bottle" viewBox="0 0 160 120"><rect class="a-t" width="160" height="120"/>
  <ellipse class="a-sh" cx="82" cy="108" rx="26" ry="4"/>
  <path class="a-m" d="M73 16 h14 v18 q15 7 15 24 v44 q0 6 -6 6 h-32 q-6 0 -6 -6 v-44 q0 -17 15 -24 z"/>
  <rect class="a-2" x="64" y="62" width="32" height="26" rx="2"/><rect class="a-k" x="72" y="9" width="16" height="9" rx="2"/></symbol>
```

**Shoe, side view** (fashion, sport, marketplaces). Colourways come from the palette: `a-m` upper, `a-2` sole, `a-3` stripe.
```html
<symbol id="art-shoe" viewBox="0 0 160 120"><rect class="a-t" width="160" height="120"/>
  <ellipse class="a-sh" cx="84" cy="94" rx="64" ry="5"/>
  <path class="a-m" d="M22 84 L24 50 C24 43 30 41 36 43 L52 50 C58 52 62 49 64 43 L72 34 C78 29 87 31 91 38 C100 52 116 60 136 66 C147 69 150 77 148 84 Z"/>
  <path class="a-k" d="M24 50 C24 43 30 41 36 43 L40 45 L34 60 L24 60 Z" opacity=".35"/>
  <rect class="a-2" x="16" y="82" width="136" height="11" rx="5.5"/>
  <path class="a-st" d="M44 72 C70 62 100 64 132 76"/>
  <path class="a-ln" d="M70 42 l9 8 M78 37 l9 8 M86 34 l8 9" style="stroke:var(--a-2)"/></symbol>
```

**Person** (team members, staff, dentists, drivers). `viewBox="0 0 64 64"`, shown as a 40 to 56px circle. The palette gives the tile, the clothes (`--a-main`) and the hair (`--a-ink`). Set the skin tone per person with `--a-skin`: `#f1c7a5`, `#d9a27a`, `#a8714e`, `#6e4630`. For a second hair style, add a bun (`<circle class="a-k" cx="32" cy="9" r="7"/>`) before the hair path, or long hair (`<path class="a-k" d="M17 30 c-2 -15 6 -21 15 -21 s17 6 15 21 v16 h-30 z"/>`) before the neck.
```html
<symbol id="art-person" viewBox="0 0 64 64"><rect class="a-t" width="64" height="64"/>
  <path class="a-m" d="M8 64 c2 -14 12 -20 24 -20 s22 6 24 20 z"/>
  <rect class="a-s" x="27" y="35" width="10" height="11" rx="3"/>
  <circle class="a-s" cx="32" cy="27" r="13"/>
  <path class="a-k" d="M19 27 c-1 -11 5 -17 13 -17 s14 6 13 17 c-3 -5 -8 -8 -13 -8 s-10 3 -13 8 z"/></symbol>
```
Initials stay fine in dense admin tables. Wherever people are the subject (choose your dentist, meet the team), draw them.

**Home or building** (property, bookings, addresses). **Delivery van** (orders, logistics).
```html
<symbol id="art-home" viewBox="0 0 160 120"><rect class="a-t" width="160" height="120"/>
  <rect class="a-3" y="94" width="160" height="26"/>
  <path class="a-2" d="M46 58 L80 32 L114 58 V96 H46 Z"/><path class="a-m" d="M38 62 L80 28 L122 62 L116 66 L80 38 L44 66 Z"/>
  <rect class="a-k" x="72" y="72" width="16" height="24" rx="2"/><rect class="a-m" x="54" y="66" width="12" height="12" rx="1"/></symbol>
<symbol id="art-van" viewBox="0 0 160 120"><rect class="a-t" width="160" height="120"/>
  <ellipse class="a-sh" cx="82" cy="98" rx="60" ry="5"/>
  <rect class="a-2" x="22" y="44" width="80" height="46" rx="4"/><path class="a-m" d="M102 54 h22 l16 18 v18 H102 Z"/>
  <path class="a-3" d="M108 59 h14 l10 12 h-24 Z"/><rect class="a-m" x="22" y="66" width="80" height="7"/>
  <circle class="a-k" cx="50" cy="92" r="9"/><circle class="a-k" cx="120" cy="92" r="9"/>
  <circle class="a-2" cx="50" cy="92" r="3.5"/><circle class="a-2" cx="120" cy="92" r="3.5"/></symbol>
```

**Map tile** (tracking, addresses, store pickers). Draw it inline, not as a symbol, so the route can change: a land fill, 3 or 4 roads as wide pale strokes, one park blob, the route as an accent polyline, a filled pin at the end and a ring at the start. In dark mode set `--map-land: #2a2b27; --map-road: #3b3c37; --map-park: #2d3a2c`. Keep the route, pins and vehicle inside the middle 60% of the width, so a `slice` crop on a narrow phone card keeps them. A map is a hero only when it carries the answer (where the driver is, how far): give it the ETA as an overlay chip, and keep it under 240px tall on the phone.
```html
<svg class="map" viewBox="0 0 320 180" role="img" aria-label="Route from the store to your address, 2.4 km">
  <rect width="320" height="180" fill="var(--map-land, #ece8df)"/>
  <rect x="196" y="14" width="96" height="58" rx="22" fill="var(--map-park, #d5e3c8)"/>
  <g fill="none" stroke="var(--map-road, #ffffff)" stroke-width="10" stroke-linecap="round">
    <path d="M-10 120 L330 96"/><path d="M90 -10 L120 190"/><path d="M220 -10 L200 190"/></g>
  <path d="M60 140 L112 124 L118 70 L208 62" fill="none" stroke="var(--accent)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="60" cy="140" r="7" fill="var(--surface)" stroke="var(--accent)" stroke-width="3"/>
  <path d="M208 62 c-8 -9 -13 -15 -13 -22 a13 13 0 0 1 26 0 c0 7 -5 13 -13 22 z" fill="var(--accent)"/>
  <circle cx="208" cy="40" r="5" fill="var(--surface)"/>
</svg>
```

## Composites

- **An order or basket**: 3 item tiles in a row with a 6px gap (56 to 72px on desktop, 48 to 56px on the phone), then "+4" in a muted chip. It tells the customer what the order was at a glance. Never overlap square tiles: the overlap hides the objects. Overlap only round 32 to 40px tiles, by 8px, with a 2px ring in the surface colour.
- **A featured item**: the art large on the left half of a card, the title in the display face, one line of description, the key facts, one action.
- **Empty states**: draw the product's own object, faded (`opacity: .5`) on its tile, 120 to 160px. Not a generic box or a magnifier.

## Check

- [ ] Every item that has a look has its own picture. No picture repeats 3 times in a view.
- [ ] The featured item has the largest picture on the page.
- [ ] Tiles are tinted, objects are saturated, shadows are soft, one style throughout.
- [ ] Dark mode: tiles darkened, no bright white tile.
