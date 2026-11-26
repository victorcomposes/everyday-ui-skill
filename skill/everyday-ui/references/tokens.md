# Tokens

One token system per screen. Every colour, size, space, radius, shadow and duration in the code comes from it.

## 1. Adopt the project's tokens first

Look in this order and stop at the first real source:
1. CSS custom properties in a global stylesheet (`globals.css`, `index.css`, `theme.css`, `:root { --... }`).
2. `tailwind.config.*` `theme.extend`, or `@theme` in Tailwind v4 CSS.
3. A theme object: MUI `createTheme`, Chakra `extendTheme`, Mantine `createTheme`, styled-components `ThemeProvider`.
4. shadcn/ui variables: `--background`, `--foreground`, `--muted-foreground`, `--primary`, `--border`, `--ring`, `--radius`.
5. Token JSON (Style Dictionary, Figma tokens), SCSS `$variables`.

Map what you find to the roles below. Write the mapping in your notes, for example `muted = --muted-foreground`.

- A role the project lacks: derive it from the project's own ramp (a lighter or darker step of a colour it already uses). Never add a new hue.
- No dark theme in the project: do not add one unless the task asks.
- Project values that fail contrast: use the nearest passing step from the same ramp and say so in your report.
- Do not restyle house components. Use their variants (`variant="secondary"`, `size="sm"`).

## 2. Default tokens for a new page

Copy this block as is. It passes WCAG AA in both themes (table in section 8). Change only the brand lines (accent, accent-hover, accent-subtle, frame, brand-deep, on-deep-muted, in both themes) with a kit from `brand.md`, and set `--font` and `--font-display` from its pairing table.

```css
:root {
  color-scheme: light dark;
  /* neutrals */
  --bg: #ffffff;            /* page */
  --bg-subtle: #f6f7f9;     /* sidebar, table header, hover row, code */
  --surface: #ffffff;       /* panels, menus, dialogs */
  --border: #e2e4e9;        /* dividers and panel edges, decorative only */
  --border-strong: #838995; /* input, checkbox and select edges: 3.5:1 */
  --text: #16181d;
  --text-muted: #5b616e;    /* secondary text, help text, table meta: 6.2:1 */
  /* accent */
  --accent: #2754c5;
  --accent-hover: #1f45a6;
  --accent-subtle: #eef3fd; /* selected row, active nav item */
  --on-accent: #ffffff;
  /* status: text colour, then a tint for the background */
  --success: #157a46;  --success-subtle: #ecf8f1;
  --warning: #9a5b00;  --warning-subtle: #fdf5e6;
  --danger:  #c4302b;  --danger-subtle:  #fdf0ef;
  --focus: var(--accent);
  --placeholder: #6b717d;   /* 4.9:1 on bg, 4.6:1 on bg-subtle */
  /* brand frame: Harbour kit. Swap all six brand values per brand.md */
  --frame: #f4f7fd;         /* sidebar or top bar tint */
  --brand-deep: #14285a;    /* sign-in and onboarding brand panel */
  --on-deep: #ffffff; --on-deep-muted: #b9c8ee;
  --accent-on-deep: #7a9cff; /* accent used on the brand panel: 5.4:1 on brand-deep */
  /* type */
  --font: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-display: var(--font); /* set from the pairing in brand.md */
  --font-mono: ui-monospace, "SF Mono", "Cascadia Mono", Consolas, monospace;
  --text-xs: 12px;  --lh-xs: 16px;
  --text-sm: 14px;  --lh-sm: 20px;
  --text-md: 16px;  --lh-md: 24px;
  --text-lg: 18px;  --lh-lg: 28px;
  --text-xl: 20px;  --lh-xl: 28px;
  --text-2xl: 24px; --lh-2xl: 32px;
  --text-3xl: 30px; --lh-3xl: 36px;
  /* space: 4px base */
  --s-1: 4px; --s-2: 8px; --s-3: 12px; --s-4: 16px; --s-5: 20px; --s-6: 24px;
  --s-8: 32px; --s-10: 40px; --s-12: 48px; --s-16: 64px;
  /* vertical rhythm: use these four the same way on every page */
  --rhythm-title: 12px;    /* page title (28px+) to its subtitle */
  --rhythm-tight: 8px;     /* section title to its intro; label to field */
  --rhythm-content: 24px;  /* page header block to content; section header block to section body */
  --rhythm-group: 40px;    /* between sections and groups */
  /* shape */
  --r-sm: 4px;   /* badges, checkboxes, tags */
  --r-md: 6px;   /* buttons, inputs, selects */
  --r-lg: 8px;   /* panels, menus, popovers */
  --r-xl: 12px;  /* dialogs, sheets */
  --r-full: 999px;
  --control-h: 36px;     /* desktop buttons and inputs */
  --control-h-sm: 32px;  /* dense toolbars and table actions */
  --control-h-touch: 44px;
  /* sizes: layout widths, rows, charts */
  --w-sidebar: 248px; --w-rail: 360px; --w-form: 600px; --w-content: 1200px;
  --w-dialog-sm: 400px; --w-dialog: 560px; --w-auth: 400px;
  --h-topbar: 56px; --h-row: 48px; --h-row-compact: 40px;
  --h-chart: 240px; --h-chart-sm: 160px;
  /* elevation: only for layers that float */
  --shadow-pop: 0 4px 16px rgb(16 24 40 / 0.12), 0 1px 3px rgb(16 24 40 / 0.08);
  --shadow-dialog: 0 16px 48px rgb(16 24 40 / 0.18);
  /* motion */
  --ease: cubic-bezier(0.2, 0, 0, 1);
  --t-fast: 120ms; --t-base: 160ms; --t-slow: 200ms;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #111318; --bg-subtle: #171a20; --surface: #1b1e25;
    --border: #2b2f38; --border-strong: #6f7685;
    --text: #e9ebef; --text-muted: #a0a6b2;
    --accent: #7a9cff; --accent-hover: #9bb5ff; --accent-subtle: #1c2540; --on-accent: #0b1020;
    --success: #4cc38a; --success-subtle: #13261d;
    --warning: #e6a23c; --warning-subtle: #2a2112;
    --danger: #ff7a72;  --danger-subtle: #2d1715;
    --placeholder: #8b919d;
    --frame: #131a2b; --brand-deep: #0e1a38; --on-deep: #e9ebef; --on-deep-muted: #a9bbef; --accent-on-deep: #7a9cff;
    --shadow-pop: 0 4px 16px rgb(0 0 0 / 0.5); --shadow-dialog: 0 16px 48px rgb(0 0 0 / 0.6);
  }
}
/* A manual theme toggle: repeat the dark values under :root[data-theme="dark"]. */
@media (max-width: 640px), (pointer: coarse) {
  :root { --control-h: 44px; --control-h-sm: 44px; }
}
```

Base rules that go with it:
```css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; min-height: 100dvh; background: var(--bg); color: var(--text);
  font: 400 var(--text-sm)/var(--lh-sm) var(--font); -webkit-font-smoothing: antialiased; }
button, input, select, textarea { font: inherit; color: inherit; }
[hidden] { display: none !important; }  /* a display: flex class must never re-show hidden content */
a { color: inherit; text-decoration: none; }  /* nav, logo, row links */
.link, p a, td a.link { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; }  /* links in text */
:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
::placeholder { color: var(--placeholder); opacity: 1; }
h1 { font: 600 30px/1.15 var(--font-display); letter-spacing: -0.02em; margin: 0; }
h2 { font: 600 var(--text-xl)/1.3 var(--font-display); letter-spacing: -0.01em; margin: 0; }
@media (max-width: 640px) { h1 { font-size: 26px; } }
.badge { display: inline-flex; align-items: center; white-space: nowrap; flex-shrink: 0; }
/* The parent of any .sr-only element needs position: relative (cells, scroll containers), or the 1px box escapes it and widens the page. */
.sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; border: 0; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; }
.skip-link { position: absolute; left: var(--s-2); top: var(--s-2); display: inline-flex; align-items: center; min-height: 44px; padding: 0 var(--s-4);
  background: var(--surface); border-radius: var(--r-md); transform: translateY(-200%); }
.skip-link:focus { transform: none; }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; } }
```

Body text is 14px in dense tools (tables, admin, dashboards) and 16px for forms, sign-in, checkout, onboarding and every phone layout.

## 3. Type

- One body family, plus one display family from the pairing in `brand.md`. Add a mono only for code, IDs people copy, and keys.
- Weights: 400 body, 500 labels and table headers, 600 titles and buttons, 700 for a display face that needs it. No 300.
- At most 5 text sizes of 20px or less, and 8 sizes in total with display sizes (logo, title, key numbers). A typical product screen uses 12, 14, 16, 20, plus 30 for the title and 32 for a key number. `--text-lg` (18/28) is for dialog titles and lead lines.
- The full role scale (title, key number, section, body, label, meta) is in `brand.md` section 3. The title is at least twice the body size.
- Headings: line-height 1.15 to 1.3, `letter-spacing` -0.01em to -0.02em from 20px up. Body: 1.4 to 1.6. Never track out small text.
- Vertical rhythm: the four `--rhythm-*` tokens, applied the same way on every page. A page title and its subtitle sit 12px apart, a section title and its intro 8px, a label and its hint 4px. The header block sits 24px above content. Groups sit 40px apart. Never a subtitle glued to its heading, never a random big gap.
- Line length 45 to 75 characters for paragraphs: `max-width: 65ch`.
- Font choice: the project's font always wins. Otherwise use the pairing table in `brand.md`, loaded from Google Fonts when the contract allows network, and the system stack in the token block when it does not.

## 4. Accent

Pick a kit from `brand.md`. The token block above holds the Harbour kit. Use the accent for the primary button, links, focus, selection, the active nav item and the mark. Use its tints for the frame and selected states. Never use it on data cells, as a gradient, or as a second hue.

## 5. Status colours

- Status colour is for state only: success, warning, danger, plus neutral and accent for info.
- Always pair colour with text or an icon: a badge reads "Overdue", not a red dot alone.
- Badge: `--*-subtle` background, `--*` text, `--r-sm`, 12px, weight 500, 2px by 8px padding.
- Banner: `--*-subtle` background, a 1px border in the status colour at 30% alpha, an icon, a title, one action.
- Red is for errors and destructive actions only. Do not paint negative but normal numbers red in a table; use a minus sign.

## 6. Layout sizes

The size tokens in the block cover these. One-off component sizes may be literals.

| Thing | Size |
|---|---|
| Top bar | 56px high (48px in dense tools) |
| Sidebar | 240 to 264px, collapses below 1024px |
| App content | max 1200 to 1280px, 24 to 32px side padding, 16px on phones |
| Form column | max 560 to 640px |
| Reading text | max 65ch |
| Settings | 200px section nav + content max 720px |
| Dialog | 400px (confirm), 560px (form), 720px (complex) |
| Table row | 40px compact, 48px regular, 56px with two lines |
| Breakpoints | 640, 768, 1024, 1280 |

## 7. Elevation and borders

- Flat by default. Panels use `--border`, or no edge at all and space alone.
- Shadows only on layers that float above the page: menus, popovers, dialogs, toasts, sticky bars when scrolled.
- Radii nest: a child's radius is never larger than its parent's. Inner radius = outer radius minus padding, floor 2px.
- Dividers are 1px `--border`. Never stack a border and a divider on the same edge.

## 8. Contrast proof (WCAG 2.2)

Computed for the default block.

| Pair | Light | Dark |
|---|---|---|
| text on bg / bg-subtle / surface | 17.8 / 16.6 / 17.8 | 15.6 / 14.6 / 14.0 |
| text-muted on bg / bg-subtle / surface | 6.2 / 5.8 / 6.2 | 7.6 / 7.1 / 6.8 |
| accent on bg | 6.6 | 7.1 |
| on-accent on accent / accent-hover | 6.6 / 8.5 | 7.2 / 9.4 |
| success, warning, danger on bg | 5.4, 5.4, 5.5 | 8.4, 8.5, 7.3 |
| success, warning, danger on their subtle tint | 4.9, 5.0, 5.0 | 7.2, 7.3, 6.7 |
| border-strong on bg / bg-subtle (WCAG 1.4.11, needs 3) | 3.5 / 3.3 | 4.1 / 3.8 |
| border on bg (decorative, no minimum) | 1.3 | 1.4 |
| placeholder on bg / bg-subtle (and surface in dark) | 4.9 / 4.6 | 5.9 / 5.5 / 5.3 |
| brand kits | see `brand.md` section 2 | |

If you change a value, recompute. Text needs 4.5:1, text of 24px or 18.66px bold needs 3:1, field edges and focus rings need 3:1.

## 9. Tailwind

With Tailwind, keep the CSS variables and point the theme at them, so dark mode is one place:

```js
tailwind.config = { theme: { extend: {
  colors: { bg: 'var(--bg)', subtle: 'var(--bg-subtle)', surface: 'var(--surface)', border: 'var(--border)',
    'border-strong': 'var(--border-strong)', fg: 'var(--text)', muted: 'var(--text-muted)',
    accent: { DEFAULT: 'var(--accent)', hover: 'var(--accent-hover)', subtle: 'var(--accent-subtle)', fg: 'var(--on-accent)' },
    success: 'var(--success)', warning: 'var(--warning)', danger: 'var(--danger)' },
  borderRadius: { sm: '4px', md: '6px', lg: '8px', xl: '12px' },
} } };
```

Then use `bg-surface text-fg border-border`, never `bg-white text-gray-900` or arbitrary hex classes. Use `min-h-dvh`, not `min-h-screen`.
