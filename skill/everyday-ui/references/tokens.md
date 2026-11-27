# Tokens

One token system per screen. Every colour, size, space, radius, shadow and duration comes from it.

## 1. In an existing product

Find its tokens first: CSS custom properties in a global stylesheet, `tailwind.config.*` or `@theme`, a theme object (MUI, Chakra, Mantine), shadcn variables (`--background`, `--foreground`, `--primary`, `--border`, `--ring`, `--radius`), token JSON or SCSS variables. Map them to the roles below in your notes, for example `text-muted = --muted-foreground`. A missing role comes from a step of the project's own ramp, never a new hue. Do not add dark mode the project lacks. Use house components and their variants. Fix a failing contrast pair with the nearest passing step and say so.

With Tailwind, point the theme at the CSS variables (`colors: { bg: 'var(--bg)', surface: 'var(--surface)', fg: 'var(--text)', muted: 'var(--text-muted)', accent: 'var(--accent)' }`) and use `min-h-dvh`.

## 2. The block for a new page

Copy this block. Replace the two colour sections with the kit's two lines from `look.md`, and set `--font-display` from its pairing table. The status colours pass AA on every kit's page, surface and subtle tint.

```css
:root {
  color-scheme: light dark;
  /* colour: paste the kit's light line here (Harbour shown) */
  --bg:#f3f5f8; --bg-subtle:#eaeef3; --surface:#ffffff; --border:#dfe3ea; --border-strong:#838995; --text:#16181d; --text-muted:#5b616e; --accent:#2754c5; --accent-hover:#1f45a6; --accent-subtle:#e8eefc; --on-accent:#ffffff; --deep:#14285a;
  --success:#126c3e; --success-subtle:#e8f5ee; --warning:#8a5100; --warning-subtle:#fbf1df; --danger:#b3261f; --danger-subtle:#fcecea;
  --placeholder:#6b6760; --focus:var(--accent);
  /* type */
  --font: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-display: var(--font); /* the kit's display stack from look.md */
  --font-mono: ui-monospace, "SF Mono", "Cascadia Mono", Consolas, monospace;
  /* space: 4px base, and a rhythm used the same way on every page */
  --s-1:4px; --s-2:8px; --s-3:12px; --s-4:16px; --s-5:20px; --s-6:24px; --s-8:32px; --s-10:40px; --s-12:48px; --s-16:64px;
  --rhythm-title:12px; --rhythm-tight:8px; --rhythm-content:24px; --rhythm-group:40px;
  /* shape: crisp 2/4/6/8, standard 4/6/8/12 (here), soft 6/10/14/18 */
  --r-sm:4px; --r-md:6px; --r-lg:8px; --r-xl:12px; --r-full:999px;
  --control-h:40px; --control-h-sm:32px; --control-h-touch:44px;
  --w-sidebar:248px; --w-rail:360px; --w-form:600px; --w-content:1200px; --h-topbar:64px;
  --shadow-card:0 1px 2px rgb(40 30 20 / .05);
  --shadow-pop:0 6px 20px rgb(40 30 20 / .12), 0 1px 3px rgb(40 30 20 / .08);
  --ease:cubic-bezier(.2,0,0,1); --t-fast:120ms; --t-base:160ms;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    /* paste the kit's dark line here (Harbour shown) */
    --bg:#111318; --bg-subtle:#20242c; --surface:#1b1e25; --border:#2b2f38; --border-strong:#6f7685; --text:#e9ebef; --text-muted:#a0a6b2; --accent:#7a9cff; --accent-hover:#9bb5ff; --accent-subtle:#1c2540; --on-accent:#0b1020; --deep:#0e1a38;
    --success:#4cc38a; --success-subtle:#13261d; --warning:#e6a23c; --warning-subtle:#2a2112; --danger:#ff7a72; --danger-subtle:#2d1715;
    --placeholder:#8d8a83;
    --shadow-card:none; --shadow-pop:0 6px 20px rgb(0 0 0 / .5);
  }
}
@media (max-width: 640px), (pointer: coarse) { :root { --control-h:44px; --control-h-sm:44px; } }
```

## 3. Base CSS

```css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; min-height: 100dvh; background: var(--bg); color: var(--text);
  font: 400 15px/1.5 var(--font); -webkit-font-smoothing: antialiased; }
button, input, select, textarea { font: inherit; color: inherit; }
[hidden] { display: none !important; }
a { color: inherit; text-decoration: none; }  /* titles, rows, nav and logo links: no underline */
.prose a, .link { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; }  /* only links inside sentences */
:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
::placeholder { color: var(--placeholder); opacity: 1; }
h1 { font: 600 34px/1.12 var(--font-display); letter-spacing: -0.01em; margin: 0; text-wrap: balance; }
h2 { font: 600 20px/1.3 var(--font-display); letter-spacing: -0.01em; margin: 0; }
@media (max-width: 640px) { h1 { font-size: 28px; } }
.num { font-variant-numeric: tabular-nums; }
.card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--r-xl); box-shadow: var(--shadow-card); }
.badge { display: inline-flex; align-items: center; white-space: nowrap; flex-shrink: 0; }
/* The parent of an .sr-only element needs position: relative, or the 1px box escapes and widens the page. */
.sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; border: 0; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; }
.skip-link { position: absolute; left: 8px; top: 8px; display: inline-flex; align-items: center; min-height: 44px; padding: 0 16px;
  background: var(--surface); border-radius: var(--r-md); transform: translateY(-200%); }
.skip-link:focus { transform: none; }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition-duration: .01ms !important; animation-duration: .01ms !important; } }
```

Body text is 15 to 16px on consumer screens and every phone layout, 14px in dense work tools. Set the h1 to the kit's size and weight from `look.md`.

## 4. Status and elevation

- Status colour is for state only, always with a text label: a badge reads "Out of stock", not a red dot alone. Badge: `--*-subtle` background, `--*` text, 12 to 13px, weight 600, 2px by 8px padding.
- Red is for errors and destructive actions. A negative but normal number gets a minus sign, not red.
- Cards carry `--shadow-card` at most. `--shadow-pop` only for layers that float: menus, popovers, dialogs, sticky bars.
- Radii nest: a child's radius is never larger than its parent's.
- If you change a colour, recompute contrast: text 4.5:1, text of 24px or 18.66px bold 3:1, field edges and focus rings 3:1.
