#!/usr/bin/env node
// ui-check: render a page at desktop 1440, phone 390 and dark, save screenshots, run code checks.
// Usage: node ui-check.mjs <path-or-url> [outDir] [--state=empty,loading,error]
//   <path-or-url>  an .html file, a folder with index.html, or an http(s) URL.
//   outDir         where screenshots and report.json go. Default: <tmp>/ui-check/<page name>.
//   --state=a,b    also shoot <url>?state=a etc. The page must read the state query param.
// Exit code: 0 when no FAIL, 1 when any FAIL, 2 when the page or Playwright could not load.
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const flags = Object.fromEntries(args.filter((a) => a.startsWith('--')).map((a) => { const [k, v = 'true'] = a.slice(2).split('='); return [k, v]; }));
const [target, outArg] = args.filter((a) => !a.startsWith('--'));
if (!target) { console.error('Usage: node ui-check.mjs <path-or-url> [outDir] [--state=empty,error]'); process.exit(2); }

// Resolve the page URL.
let url, pageDir = process.cwd();
if (/^https?:\/\//i.test(target) || target.startsWith('file:')) url = target;
else {
  let p = resolve(target);
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
  if (!existsSync(p)) { console.error(`Not found: ${p}`); process.exit(2); }
  url = pathToFileURL(p).href; pageDir = dirname(p);
}
const pageName = (basename(pageDir) || 'page').replace(/[^\w.-]/g, '_');
const outDir = resolve(outArg ?? join(tmpdir(), 'ui-check', pageName));
mkdirSync(outDir, { recursive: true });

// Find Playwright: the page's project, the current project, next to this script, then the global npm root.
const bases = [join(pageDir, 'x.js'), join(process.cwd(), 'x.js'), fileURLToPath(import.meta.url)];
try { bases.push(join(execSync('npm root -g', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(), 'x.js')); } catch { /* no npm on PATH */ }
// Optional: axe-core, if installed anywhere Playwright could be.
let axeSource = null;
for (const base of bases) { try { axeSource = readFileSync(createRequire(base).resolve('axe-core/axe.min.js'), 'utf8'); break; } catch { /* not here */ } }
async function loadChromium() {
  for (const base of bases) for (const name of ['playwright', 'playwright-core', '@playwright/test']) {
    try {
      const mod = await import(pathToFileURL(createRequire(base).resolve(name)).href);
      const chromium = mod.chromium ?? mod.default?.chromium;
      if (chromium) return chromium;
    } catch { /* try the next location */ }
  }
  return null;
}
const chromium = await loadChromium();
if (!chromium) {
  console.error('Playwright not found. Install it in the project, then rerun:\n  npm i -D playwright && npx playwright install chromium\nOr globally:\n  npm i -g playwright && npx playwright install chromium');
  process.exit(2);
}
// Browser order: Playwright's own Chromium, then installed Google Chrome, then Microsoft Edge.
let browser, browserName;
for (const [name, opts] of [['Playwright Chromium', {}], ['Google Chrome', { channel: 'chrome' }], ['Microsoft Edge', { channel: 'msedge' }]]) {
  try { browser = await chromium.launch(opts); browserName = name; break; } catch { /* try the next browser */ }
}
if (!browser) { console.error('Playwright is installed but no browser launched. Run:\n  npx playwright install chromium'); process.exit(2); }

const VIEWS = {
  desktop: { viewport: { width: 1440, height: 900 }, colorScheme: 'light' },
  phone: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, colorScheme: 'light' },
  dark: { viewport: { width: 1440, height: 900 }, colorScheme: 'dark' },
};
const MAX_HEIGHT = 4000;
const results = [];
const add = (level, id, msg, examples = []) => results.push({ level, id, msg, examples });
const shots = [];

async function openView(name, pageUrl, errors) {
  const context = await browser.newContext(VIEWS[name]);
  const page = await context.newPage();
  if (errors) {
    page.on('pageerror', (e) => errors.push(`JS error: ${e.message.split('\n')[0]}`));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(`console.error: ${m.text().slice(0, 140)}`); });
    page.on('requestfailed', (r) => errors.push(`request failed: ...${r.url().slice(-90)}`));
  }
  try { await page.goto(pageUrl, { waitUntil: 'networkidle', timeout: 30000 }); }
  catch (e) { add('WARN', 'load', `Page did not settle in 30 s: ${e.message.split('\n')[0]}`); }
  await page.evaluate(() => document.fonts?.ready).catch(() => {});
  await page.waitForTimeout(400);
  return { context, page };
}

async function shoot(page, name, fold = true) {
  const vp = page.viewportSize();
  if (fold) { await page.screenshot({ path: join(outDir, `${name}-fold.png`) }); shots.push(`${name}-fold.png`); }
  const h = await page.evaluate((max) => Math.min(max, Math.max(document.documentElement.scrollHeight, innerHeight)), MAX_HEIGHT);
  await page.screenshot({ path: join(outDir, `${name}-full.png`), fullPage: true, clip: { x: 0, y: 0, width: vp.width, height: h } });
  shots.push(`${name}-full.png`);
}

// Everything below runs inside the page. It must stay self-contained.
function pageChecks(mode) {
  const out = [];
  const add = (level, id, msg, examples = []) => out.push({ level, id, msg, examples: examples.slice(0, 6) });
  const cv = document.createElement('canvas'); cv.width = cv.height = 1;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  const cache = new Map();
  const rgba = (c) => { // any CSS colour to [r,g,b,a 0..1]
    if (cache.has(c)) return cache.get(c);
    cx.clearRect(0, 0, 1, 1); cx.fillStyle = '#000'; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1);
    const d = cx.getImageData(0, 0, 1, 1).data; const v = [d[0], d[1], d[2], d[3] / 255];
    cache.set(c, v); return v;
  };
  const lum = ([r, g, b]) => { const f = (x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  const over = (top, under) => [0, 1, 2].map((i) => top[i] * top[3] + under[i] * (1 - top[3])).concat(1);
  const dark = matchMedia('(prefers-color-scheme: dark)').matches;
  const rootScheme = getComputedStyle(document.documentElement).colorScheme || 'normal';
  const canvasColor = dark && /dark/.test(rootScheme) ? [18, 18, 18, 1] : [255, 255, 255, 1];
  const visible = (el) => el.checkVisibility?.({ checkVisibilityCSS: true, opacityProperty: true }) !== false && el.getClientRects().length > 0;
  const label = (el) => {
    const t = (el.innerText || el.value || el.getAttribute('aria-label') || el.getAttribute('placeholder') || '').trim().replace(/\s+/g, ' ').slice(0, 32);
    return `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : el.classList[0] ? '.' + el.classList[0] : ''}${t ? ` "${t}"` : ''}`;
  };
  // Composite background behind an element. Returns null when an image or gradient is in the way.
  const bgOf = (el) => {
    const layers = [];
    for (let e = el; e; e = e.parentElement) {
      const s = getComputedStyle(e);
      if (s.backgroundImage && s.backgroundImage !== 'none') return null;
      const c = rgba(s.backgroundColor);
      if (c[3] > 0) { layers.push(c); if (c[3] >= 1) break; }
    }
    return layers.reverse().reduce((acc, l) => over(l, acc), canvasColor);
  };
  // Visually hidden (.sr-only and friends): a 1-2px clipped box, clip-path inset, or clip rect, on the element or an ancestor.
  const hiddenVisually = (el) => {
    for (let e = el; e && e !== document.body; e = e.parentElement) {
      const s = getComputedStyle(e); if (s.display === 'contents') continue; // no box of its own
      const r = e.getBoundingClientRect();
      if (r.width <= 2 && r.height <= 2 && /hidden|clip/.test(s.overflow)) return true;
      if (/inset\(\s*50%/.test(s.clipPath) || /rect\(\s*0/.test(s.clip)) return true;
    }
    return false;
  };
  // Off screen: fully left or right of the viewport, or above the top of the document.
  const offscreen = (el, W = innerWidth) => { if (getComputedStyle(el).display === 'contents') return false; const r = el.getBoundingClientRect(); return r.right <= 0 || r.left >= W || r.bottom + scrollY <= 0; };
  // Rendered lines of an element's own text nodes: distinct line tops of their rects.
  const linesOf = (el) => { const tops = new Set(); for (const n of el.childNodes) { if (n.nodeType !== 3 || !n.textContent.trim()) continue; const rg = document.createRange(); rg.selectNodeContents(n); for (const q of rg.getClientRects()) if (q.width > 1) tops.add(Math.round(q.top)); } return tops.size; };
  // Short text (a name, a label) squeezed into 3 or more lines.
  const squeezed = (els) => els.filter((el) => {
    const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim();
    if (!own || own.length > 60 || hiddenVisually(el) || offscreen(el)) return false;
    if (own.split(/\s+/).length < 3) return false;
    return linesOf(el) >= 3;
  }).map((el) => `${label(el)} ${Math.round(el.getBoundingClientRect().width)}px wide`);
  // Badge-like: short text, small type, a fill or border, rounded. Wrapped when its text spans more than one line.
  const badgeWraps = () => [...document.querySelectorAll('body *')].filter((el) => {
    const txt = [...el.childNodes].filter((n) => n.nodeType === 3);
    const own = txt.map((n) => n.textContent).join('').trim();
    if (!own || own.length > 24 || !visible(el) || hiddenVisually(el)) return false;
    const s = getComputedStyle(el);
    if (parseFloat(s.fontSize) > 14 || parseFloat(s.borderTopLeftRadius) < 3) return false;
    if (!(rgba(s.backgroundColor)[3] > 0.05 || parseFloat(s.borderTopWidth) > 0)) return false;
    const tops = new Set(); for (const n of txt) { const rg = document.createRange(); rg.selectNodeContents(n); for (const r of rg.getClientRects()) if (r.width > 0) tops.add(Math.round(r.top)); }
    return tops.size > 1;
  }).map(label);
  const opacityOf = (el) => { let o = 1; for (let e = el; e; e = e.parentElement) o *= parseFloat(getComputedStyle(e).opacity); return o; };
  const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'SVG', 'TITLE']);
  const textEls = [...document.body.querySelectorAll('*')].filter((el) => !SKIP.has(el.tagName.toUpperCase()) && visible(el) &&
    [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()));
  const controls = [...document.querySelectorAll('input:not([type=hidden]):not([type=checkbox]):not([type=radio]):not([type=range]):not([type=color]),select,textarea')].filter(visible);

  if (mode === 'phone') return phoneChecks();
  if (mode === 'dark' && lum(bgOf(document.body) ?? canvasColor) > 0.4) {
    add('INFO', 'dark-theme', 'The page ignores prefers-color-scheme: dark. Fine if the product has no dark theme; otherwise add one through tokens.');
    return out;
  }
  // Contrast of text, in this colour scheme.
  const bad = []; let unknown = 0;
  for (const el of [...textEls, ...controls]) {
    const r = el.getBoundingClientRect(); if (r.width <= 1 || r.height <= 1) continue;
    if (el.closest(':disabled,[aria-disabled="true"],[inert]')) continue;
    const s = getComputedStyle(el), bg = bgOf(el);
    if (!bg) { unknown++; continue; }
    const fg = rgba(s.color); const fgc = over([fg[0], fg[1], fg[2], fg[3] * opacityOf(el)], bg);
    const px = parseFloat(s.fontSize), large = px >= 24 || (px >= 18.66 && parseInt(s.fontWeight) >= 700);
    const need = large ? 3 : 4.5, got = ratio(fgc, bg);
    if (got < need) bad.push(`${label(el)} ${got.toFixed(2)}:1, needs ${need}`);
  }
  const scheme = dark ? 'dark' : 'light';
  if (bad.length) add('FAIL', `contrast-${scheme}`, `${bad.length} text element(s) below WCAG AA in ${scheme} mode`, bad);
  if (unknown) add('INFO', `contrast-${scheme}-unknown`, `${unknown} text element(s) sit on an image or gradient. Check them by eye.`);
  // Placeholder contrast.
  const ph = controls.filter((el) => el.placeholder && !el.value).map((el) => {
    const bg = bgOf(el); if (!bg) return null;
    const c = rgba(getComputedStyle(el, '::placeholder').color); const got = ratio(over(c, bg), bg);
    return got < 4.5 ? `${label(el)} placeholder ${got.toFixed(2)}:1` : null;
  }).filter(Boolean);
  if (ph.length) add('WARN', `placeholder-contrast-${scheme}`, 'Placeholder text below 4.5:1. Keep hints in visible text, not placeholders.', ph);
  // Field boundary contrast (WCAG 1.4.11) when the border is the only edge.
  const edges = controls.map((el) => {
    const s = getComputedStyle(el); if (parseFloat(s.borderBottomWidth) === 0) return null;
    const outer = el.parentElement ? bgOf(el.parentElement) : canvasColor, inner = bgOf(el); if (!outer || !inner) return null;
    if (ratio(inner, outer) >= 1.3) return null;
    const got = ratio(over(rgba(s.borderBottomColor), outer), outer);
    return got < 3 ? `${label(el)} border ${got.toFixed(2)}:1` : null;
  }).filter(Boolean);
  if (edges.length) add('WARN', `field-edge-${scheme}`, 'Input borders below 3:1 against the background, so fields are hard to see.', edges);

  if (mode === 'dark') {
    if (!/dark/.test(rootScheme)) add('WARN', 'color-scheme', 'Dark page without color-scheme: dark on :root, so native controls and scrollbars stay light.');
    const islands = [...document.querySelectorAll('body *')].filter((el) => {
      if (!visible(el)) return false; const r = el.getBoundingClientRect(); if (r.width * r.height < 40000) return false;
      const c = rgba(getComputedStyle(el).backgroundColor); return c[3] > 0.9 && lum(c) > 0.6;
    }).map(label);
    if (islands.length) add('WARN', 'dark-islands', 'Large light surfaces left in dark mode.', islands);
    return out;
  }

  function phoneChecks() {
    const inFixed = (el) => { for (let e = el; e && e !== document.body; e = e.parentElement) if (getComputedStyle(e).position === 'fixed') return true; return false; };
    const W = 390, H = 844, over_ = document.documentElement.scrollWidth - W; // not innerWidth: mobile emulation widens it to fit overflow
    if (over_ > 0) {
      const clipped = (el) => { for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) { if (/(auto|scroll|hidden|clip)/.test(getComputedStyle(e).overflowX)) return true; } return false; };
      const all = [...document.body.querySelectorAll('*')].filter((el) => el.getClientRects().length && el.getBoundingClientRect().right > W + 1 && !inFixed(el)); // fixed bars stretch with the widened viewport: effects, not causes
      let wide = all.filter((el) => visible(el) && !clipped(el)), note = '';
      // Fallback: an absolutely positioned element can escape an overflow parent that is not its containing block.
      if (!wide.length) { wide = all; note = ' (escapes its clipped parent)'; }
      const outer = wide.filter((el) => !wide.includes(el.parentElement));
      // Cause: an absolutely positioned element whose overflow container is not its containing block escapes it.
      const escapes = (el) => {
        if (getComputedStyle(el).position !== 'absolute') return '';
        for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
          const s = getComputedStyle(p);
          if (s.position !== 'static') return '';
          if (s.overflowX !== 'visible') return ` [absolutely positioned inside ${label(p)}, which has overflow but no position: relative, so it escapes: add position: relative to it]`;
        }
        return ' [absolutely positioned with no positioned parent: give its container position: relative]';
      };
      add('FAIL', 'overflow-phone', `Page scrolls sideways by ${over_}px at ${W}px wide. Culprits:`, outer.map((el) => `${label(el)}${hiddenVisually(el) ? ' [visually hidden]' : ''} in ${el.parentElement ? label(el.parentElement) : 'html'}, right edge ${Math.round(el.getBoundingClientRect().right)}px${note}${escapes(el)}`));
    }
    // Tables: reflow, or scroll inside their own container with a cue. Never widen or clip.
    for (const t of document.querySelectorAll('table')) {
      if (!visible(t) || hiddenVisually(t)) continue;
      let box = null, kind = null;
      for (let p = t.parentElement; p && p !== document.body; p = p.parentElement) {
        const ox = getComputedStyle(p).overflowX;
        if (/auto|scroll/.test(ox)) { box = p; kind = 'scroll'; break; }
        if (/hidden|clip/.test(ox)) { box = p; kind = 'clip'; break; }
      }
      const r = t.getBoundingClientRect();
      if (kind === 'clip' && r.right > box.getBoundingClientRect().right + 1) add('FAIL', 'table-clipped', 'A table is wider than a parent with overflow hidden, so columns are cut off. Reflow it to stacked rows under 640px.', [label(t)]);
      else if (kind === 'scroll' && box.scrollWidth > box.clientWidth + 1) add('WARN', 'table-scroll', 'A table scrolls sideways inside its container on the phone. Fine only with a visible cue (sticky first column, next column cut off). Prefer stacked rows.', [label(t)]);
      else if (r.right > W + 1) add('FAIL', 'table-overflow', 'A table is wider than the phone. Reflow it to stacked rows under 640px, or scroll it inside its own container.', [label(t)]);
      else if (getComputedStyle(t).display === 'table') {
        const thin = [...t.querySelectorAll('th,td')].filter((c) => visible(c) && c.innerText.trim().length > 3 && c.getBoundingClientRect().width < 56);
        if (thin.length) add('WARN', 'table-squeezed', `${thin.length} table cell(s) under 56px wide on the phone. Reflow the table to stacked rows.`, thin.map(label));
      }
    }
    const SEL = 'a[href],button,input:not([type=hidden]),select,textarea,summary,[role=button],[role=link],[role=tab],[role=checkbox],[role=switch],[role=menuitem],[tabindex]:not([tabindex="-1"])';
    const small = [], away = [];
    for (const el of document.querySelectorAll(SEL)) {
      if (el.disabled || !visible(el)) continue;
      if (el.tagName === 'A' && getComputedStyle(el).display === 'inline') continue; // links inside running text are exempt
      const box = (['checkbox', 'radio'].includes(el.type) && el.closest('label')) || el;
      const r = box.getBoundingClientRect(), tooSmall = r.width < 44 || r.height < 44;
      const isSkip = /skip/i.test(el.textContent) && (el.getAttribute('href') || '').startsWith('#');
      if (!isSkip && (offscreen(box, W) || hiddenVisually(box))) { away.push(`${label(el)} ${Math.round(r.width)}x${Math.round(r.height)}`); continue; }
      if (tooSmall) small.push(`${label(el)} ${Math.round(r.width)}x${Math.round(r.height)}`);
    }
    if (small.length) add('FAIL', 'tap-targets', `${small.length} tap target(s) under 44x44 px on the phone. Links too: inline-flex with min-height 44px. Wrap checkboxes in their label.`, small);
    if (away.length) add('WARN', 'offscreen-focusable', `${away.length} focusable control(s) are off screen or visually hidden (a closed drawer?). Hide closed drawers with hidden or inert so focus and tap checks skip them.`, away);
    const tiny = controls.filter((el) => parseFloat(getComputedStyle(el).fontSize) < 16 && !offscreen(el, W)).map(label);
    if (tiny.length) add('FAIL', 'input-zoom', 'Inputs under 16px on the phone: iOS zooms the page on focus.', tiny);
    const cut = textEls.filter((el) => { if (hiddenVisually(el) || offscreen(el, W)) return false; const s = getComputedStyle(el); return /(hidden|clip)/.test(s.overflowX) && el.scrollWidth > el.clientWidth + 1 && s.textOverflow !== 'ellipsis'; }).map(label);
    if (cut.length) add('WARN', 'text-cut', 'Text cut off without an ellipsis on the phone.', cut);
    const sq = squeezed(textEls);
    if (sq.length) add('WARN', 'squeezed-text-phone', 'Short text wraps to 3 or more lines on the phone. Widen its column, stack the layout, or truncate.', sq);
    // Labels and chips that touch: siblings in a flex or grid row less than 4px apart.
    const touching = [];
    for (const c of document.querySelectorAll('body *')) {
      if (!/flex|grid/.test(getComputedStyle(c).display) || !visible(c)) continue;
      if (/^(tablist|radiogroup|group|toolbar|menubar|navigation)$/.test(c.getAttribute('role') || '') || c.tagName === 'NAV') continue; // segmented controls, tab bars
      if ([...c.children].length > 1 && [...c.children].every((k) => k.matches('button,a,label,input,[role=tab],[role=radio]'))) continue;
      if ([...c.children].some((k) => { const s = getComputedStyle(k); return parseFloat(s.borderLeftWidth) > 0 || parseFloat(s.borderRightWidth) > 0; })) continue; // divided rows
      const kids = [...c.children].filter((k) => visible(k) && k.innerText?.trim() && !hiddenVisually(k) && !offscreen(k, W));
      for (let i = 1; i < kids.length; i++) {
        const a = kids[i - 1].getBoundingClientRect(), b = kids[i].getBoundingClientRect();
        const sameRow = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > Math.min(a.height, b.height) / 2;
        const gap = b.left - a.right;
        if (sameRow && gap > -1 && gap < 4) touching.push(`${label(kids[i - 1])} | ${label(kids[i])} gap ${Math.round(gap)}px`);
      }
    }
    if (touching.length) add('WARN', 'touching-phone', 'Adjacent labels or values touch on the phone. Keep a gap of 8px or more and let them wrap.', touching);
    const pinned = [...document.querySelectorAll('body *')].filter((el) => /fixed|sticky/.test(getComputedStyle(el).position) && visible(el) && !offscreen(el, W) && !hiddenVisually(el));
    const pinnedH = pinned.filter((el) => !pinned.some((p) => p !== el && p.contains(el))).reduce((h, el) => { const r = el.getBoundingClientRect(); return h + Math.max(0, Math.min(r.bottom, H) - Math.max(r.top, 0)); }, 0);
    if (pinnedH > H * 0.3) add('WARN', 'pinned-bars', `Fixed or sticky bars cover ${Math.round(pinnedH)}px of the ${H}px phone screen.`);
    const tallBars = pinned.filter((el) => !pinned.some((p) => p !== el && p.contains(el))).filter((el) => {
      const r = el.getBoundingClientRect(); // own height: mobile emulation can push a bottom bar below 844px
      return r.bottom > 0 && r.top < innerHeight && r.height > H * 0.12 && r.height < H * 0.6;
    }).map((el) => `${label(el)} ${Math.round(el.getBoundingClientRect().height)}px`);
    if (tallBars.length) add('WARN', 'sticky-bar-tall', `A sticky or fixed bar is taller than 12% of the phone screen (${Math.round(H * 0.12)}px). Keep one line plus the button; move footnotes into the page.`, tallBars);
    const bw = badgeWraps();
    if (bw.length) add('WARN', 'badge-wrap', 'Badges or pills wrap onto two lines on the phone. Use white-space: nowrap and give them room.', bw);
    return out;
  }

  // Desktop, light: layout bugs judges see in full-page screenshots.
  const docH = document.documentElement.scrollHeight;
  if (docH > innerHeight + 40) {
    const pageBg = bgOf(document.body) ?? canvasColor;
    const short = [...document.querySelectorAll('body *')].filter((el) => {
      if (!visible(el)) return false;
      const r = el.getBoundingClientRect(), s = getComputedStyle(el);
      if (r.width < 40 || r.width > innerWidth * 0.6 || Math.abs(r.bottom - innerHeight) > 2 || r.top > innerHeight * 0.25 || r.height < innerHeight * 0.5) return false;
      const c = rgba(s.backgroundColor);
      const paints = (c[3] > 0.05 && ratio(over(c, pageBg), pageBg) > 1.02) || ['Left', 'Right'].some((d) => parseFloat(s[`border${d}Width`]) > 0 && rgba(s[`border${d}Color`])[3] > 0);
      if (!paints) return false;
      for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) { // a parent that paints the same and keeps going covers it
        if (p.getBoundingClientRect().bottom > innerHeight + 40 && rgba(getComputedStyle(p).backgroundColor).join() === c.join()) return false;
      }
      return true;
    });
    const outerShort = short.filter((el) => !short.some((p) => p !== el && p.contains(el)));
    if (outerShort.length) add('FAIL', 'short-background', `A column background or border stops at the first screen (${innerHeight}px) while the page is ${docH}px tall: the 100vh sidebar bug. Put the background on the full-height grid column; make only the inner nav sticky with height: 100dvh.`, outerShort.map(label));
  }
  const placed = [...textEls, ...controls].filter((el) => !hiddenVisually(el) && !offscreen(el)).map((el) => el.getBoundingClientRect());
  if (placed.length) {
    const span = Math.max(...placed.map((r) => r.right)) - Math.min(...placed.map((r) => r.left));
    if (span / innerWidth < 0.45) add('WARN', 'empty-canvas', `All content sits in a ${Math.round(span)}px band of the ${innerWidth}px page. Compose the canvas: a split layout with a brand panel, or the app shell. Fine for a phone-only screen on a neutral frame.`);
  }
  const sqd = squeezed(textEls);
  if (sqd.length) add('WARN', 'squeezed-text', 'Short text wraps to 3 or more lines on desktop. Size the column for its content.', sqd);
  const probe = (txt) => { const s = document.createElement('span'); s.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font-size:20px;font-variant-numeric:tabular-nums'; s.style.fontFamily = getComputedStyle(document.body).fontFamily; s.textContent = txt; document.body.appendChild(s); const w = s.getBoundingClientRect().width; s.remove(); return w; };
  if (Math.abs(probe('1111111111') - probe('0000000000')) > 1) add('WARN', 'no-tabular-figures', `The body font (${getComputedStyle(document.body).fontFamily.split(',')[0]}) has no tabular figures, so numbers will not line up. Pick a body face from brand.md.`);

  // Desktop, light: structure and style counts.
  const styles = textEls.map((el) => getComputedStyle(el));
  const families = [...new Set([...styles, ...controls.map((c) => getComputedStyle(c))].map((s) => s.fontFamily.split(',')[0].trim().replace(/["']/g, '').toLowerCase()))];
  if (families.length > 2) add('WARN', 'font-families', `${families.length} font families. Use a body face and at most one display face (a mono only for code). Set font: inherit on inputs and buttons.`, families);
  const sizes = [...new Set(styles.map((s) => Math.round(parseFloat(s.fontSize))))].sort((a, b) => a - b);
  const bodySizes = sizes.filter((s) => s <= 20);
  if (bodySizes.length > 6 || sizes.length > 8) add('WARN', 'font-sizes', `${bodySizes.length} text sizes of 20px or less and ${sizes.length} in total (${sizes.join(', ')}). Keep to 6 sizes of 20px or less and 8 in all.`);
  // Hierarchy: the title clearly above body text, tight and heavy.
  const h1 = [...document.querySelectorAll('h1')].find((h) => visible(h) && !hiddenVisually(h));
  const appBar = h1 && (h1.closest('header,[role=banner]')?.getBoundingClientRect().height ?? 999) <= 64;
  const phoneColumn = h1 && (h1.closest('main') ?? h1.parentElement).getBoundingClientRect().width <= 480;
  if (h1 && !appBar && !phoneColumn) {
    const weightOf = {}; for (const el of textEls) { const fs = Math.round(parseFloat(getComputedStyle(el).fontSize)); weightOf[fs] = (weightOf[fs] ?? 0) + [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join('').length; }
    const body = +Object.entries(weightOf).sort((a, b) => b[1] - a[1])[0][0]; // the size carrying the most text
    const hs = getComputedStyle(h1), size = parseFloat(hs.fontSize), track = hs.letterSpacing === 'normal' ? 0 : parseFloat(hs.letterSpacing);
    const issues = [];
    if (size / body < 1.8) issues.push(`title ${size}px is ${(size / body).toFixed(1)}x the ${body}px body text; aim for 2x (28-32px on 14-15px)`);
    if (size >= 24 && track >= 0) issues.push(`title tracking ${hs.letterSpacing}; use -0.02em`);
    if (parseInt(hs.fontWeight) < 600) issues.push(`title weight ${hs.fontWeight}; use 600 or 700`);
    if (issues.length) add('WARN', 'type-hierarchy', 'The page title does not lead the hierarchy.', issues);
  }
  const minPx = Math.min(...sizes);
  if (minPx < 11) add('FAIL', 'min-font', `Smallest text is ${minPx}px. Keep 12px or more.`);
  else if (minPx < 12) add('WARN', 'min-font', `Smallest text is ${minPx}px. Keep 12px or more.`);
  const colors = new Set(styles.map((s) => rgba(s.color).join(',')));
  if (colors.size > 8) add('WARN', 'text-colors', `${colors.size} distinct text colours. Use the token roles: text, muted, accent, on-accent and status.`);
  const emojiRe = /\p{Emoji_Presentation}|\p{Extended_Pictographic}️/gu, emoji = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) if (!SKIP.has(n.parentElement?.tagName.toUpperCase())) emoji.push(...(n.textContent.match(emojiRe) ?? []));
  if (emoji.length) add('WARN', 'emoji', `${emoji.length} emoji in the page. Use SVG icons from one set. Keep emoji only inside user content.`, [...new Set(emoji)]);
  const noAlt = [...document.querySelectorAll('img:not([alt])')].map(label);
  if (noAlt.length) add('FAIL', 'img-alt', 'Images without alt. Use alt="" for decoration.', noAlt);
  const named = (el) => (el.labels?.length && [...el.labels].some((l) => l.textContent.trim())) || el.getAttribute('aria-label')?.trim() || el.getAttribute('aria-labelledby') || el.title;
  const unnamed = [...document.querySelectorAll('input:not([type=hidden]):not([type=submit]):not([type=button]),select,textarea')].filter((el) => visible(el) && !named(el));
  if (unnamed.length) add('FAIL', 'labels', 'Fields without a label. A placeholder is not a label.', unnamed.map(label));
  const emptyBtn = [...document.querySelectorAll('button,a[href],[role=button]')].filter((el) => visible(el) && !el.textContent.trim() && !el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby') && !el.title && !el.querySelector('img[alt]:not([alt=""])'));
  if (emptyBtn.length) add('FAIL', 'button-names', 'Icon buttons or links with no accessible name. Add aria-label.', emptyBtn.map((el) => el.outerHTML.slice(0, 60)));
  const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(visible).map((h) => +h.tagName[1]);
  if (!hs.includes(1)) add('WARN', 'h1', 'No visible h1. Give the page one title.');
  const skips = hs.filter((l, i) => i && l > hs[i - 1] + 1);
  if (skips.length) add('WARN', 'heading-order', `Heading levels skip (${hs.join(' ')}).`);
  if (!document.documentElement.lang) add('WARN', 'lang', 'No lang attribute on <html>.');
  const vp = document.querySelector('meta[name=viewport]')?.content ?? '';
  if (!vp) add('FAIL', 'viewport-meta', 'No <meta name="viewport" content="width=device-width, initial-scale=1">. Phones render it at 980px.');
  else if (/user-scalable\s*=\s*(no|0)|maximum-scale\s*=\s*1(\.0)?\b/.test(vp)) add('FAIL', 'zoom-blocked', 'The viewport meta blocks zoom. Remove user-scalable=no and maximum-scale.');

  // Stylesheet scan: 100vh and transition: all.
  const vh = [], tAll = [];
  const scan = (rules) => { for (const r of rules) {
    if (r.cssRules) scan(r.cssRules);
    if (!r.style) continue;
    for (const p of ['height', 'min-height', 'max-height']) if (/(^|[^dsl])\b\d*\.?\d+vh\b/.test(r.style.getPropertyValue(p))) vh.push(`${r.selectorText} { ${p}: ${r.style.getPropertyValue(p)} }`);
    if (/\ball\b/.test(r.style.getPropertyValue('transition-property')) && r.style.getPropertyValue('transition-duration') !== '0s') tAll.push(r.selectorText);
  } };
  let crossOrigin = 0;
  for (const sh of document.styleSheets) { try { scan(sh.cssRules); } catch { crossOrigin++; } }
  for (const el of document.querySelectorAll('[style*="vh"]')) if (/height:\s*\d+vh/.test(el.getAttribute('style'))) vh.push(`${label(el)} inline style`);
  if (vh.length) add('WARN', '100vh', 'vh heights jump on mobile browsers. Use 100dvh (min-height: 100dvh).', vh);
  if (tAll.length) add('WARN', 'transition-all', 'transition: all animates layout and colour together. Name the properties.', tAll);
  if (crossOrigin) add('INFO', 'css-unscanned', `${crossOrigin} cross-origin stylesheet(s) not scanned.`);

  // Banned patterns that code can see.
  const gradText = [...document.querySelectorAll('body *')].filter((el) => visible(el) && /text/.test(getComputedStyle(el).backgroundClip || getComputedStyle(el).webkitBackgroundClip)).map(label);
  if (gradText.length) add('WARN', 'gradient-text', 'Gradient or clipped text. Use a solid token colour.', gradText);
  const isCard = (el) => {
    if (/^(INPUT|TEXTAREA|SELECT|BUTTON|IMG|svg|A|LABEL|TD|TH|TR)$/i.test(el.tagName)) return false;
    const s = getComputedStyle(el), r = el.getBoundingClientRect();
    const edged = (['Top', 'Right', 'Bottom', 'Left'].every((d) => parseFloat(s[`border${d}Width`]) > 0)) || s.boxShadow !== 'none';
    return edged && parseFloat(s.borderTopLeftRadius) > 4 && r.width >= 120 && r.height >= 60 && parseFloat(s.paddingTop) >= 8;
  };
  const cards = [...document.querySelectorAll('body *')].filter((el) => visible(el) && isCard(el));
  const nested = cards.filter((c) => cards.some((p) => p !== c && p.contains(c)));
  if (nested.length) add('WARN', 'nested-cards', `${nested.length} card(s) inside another card. Flatten to one surface with dividers or spacing.`, nested.map(label));
  const pageBg = bgOf(document.body) ?? canvasColor;
  const filled = [...document.querySelectorAll('button,a[href],input[type=submit],[role=button]')].filter((el) => {
    if (/(apple|google|samsung|shop)[ ]*pay|paypal|continue with|sign in with/i.test(`${el.textContent} ${el.getAttribute('aria-label') ?? ''}`) || el.closest('[data-third-party]')) return false;
    if (!visible(el) || el.getAttribute('aria-pressed') === 'true' || el.getAttribute('aria-selected') === 'true' || el.getAttribute('aria-current')) return false;
    const r = el.getBoundingClientRect(); if (r.top > innerHeight || r.bottom < 0) return false;
    const c = rgba(getComputedStyle(el).backgroundColor); return c[3] >= 0.9 && ratio(c, pageBg) >= 3;
  });
  if (filled.length > 1) add('WARN', 'primary-buttons', `${filled.length} filled buttons in the first screen. Keep one primary per view; make the rest secondary.`, filled.map(label));
  const blocks = [...document.querySelectorAll('h1,h2,h3,p')].filter(visible);
  const centred = blocks.filter((el) => getComputedStyle(el).textAlign === 'center');
  if (blocks.length >= 4 && centred.length / blocks.length > 0.5) add('WARN', 'centred', `${centred.length} of ${blocks.length} headings and paragraphs are centred. Align product UI to the left edge.`);
  const numRe = /^[(+\-−]?[$€£¥]?\s?\d{1,3}([,.\s ]\d{3})*([.,]\d+)?\s?(%|[kKMB]|USD|EUR|GBP)?\)?$/;
  const numCells = [...document.querySelectorAll('td,th[scope=row]')].filter((td) => visible(td) && !td.closest('[data-matrix]') && numRe.test(td.innerText.trim())); // data-matrix: comparison grids opt out
  const leftNums = numCells.filter((td) => !/right|end/.test(getComputedStyle(td).textAlign)).map(label);
  const propNums = numCells.filter((td) => { const s = getComputedStyle(td); return !/tabular-nums/.test(s.fontVariantNumeric) && !/tnum/.test(s.fontFeatureSettings); }).map(label);
  if (leftNums.length) add('WARN', 'numbers-align', 'Numeric table cells not right-aligned. Right-align numbers and their headers.', leftNums);
  if (propNums.length) add('WARN', 'numbers-tabular', 'Numeric cells without tabular figures. Add font-variant-numeric: tabular-nums.', propNums);
  return out;
}

// Focus: Tab through the first controls and compare each one's ring with its resting style.
async function focusCheck(page) {
  await page.evaluate(() => {
    const ring = (el) => { const s = getComputedStyle(el); return `${s.outlineStyle}|${s.outlineWidth}|${s.outlineColor}|${s.boxShadow}`; };
    window.__ring = ring;
    window.__rest = new Map([...document.querySelectorAll('a[href],button,input:not([type=hidden]),select,textarea,summary,[tabindex]:not([tabindex="-1"])')].slice(0, 80).map((el) => [el, ring(el)]));
  });
  const missing = [];
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    const r = await page.evaluate(() => {
      const el = document.activeElement; if (!el || el === document.body || !window.__rest.has(el)) return null;
      const s = getComputedStyle(el), now = window.__ring(el);
      const shows = (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || s.boxShadow !== 'none';
      return { ok: shows && now !== window.__rest.get(el), name: `${el.tagName.toLowerCase()} "${(el.innerText || el.getAttribute('aria-label') || el.name || '').trim().slice(0, 24)}"` };
    });
    if (r && !r.ok && !missing.includes(r.name)) missing.push(r.name);
  }
  if (missing.length) add('FAIL', 'focus-ring', `${missing.length} control(s) show no focus ring on Tab. Use :focus-visible with a 2px outline.`, missing);
}

// axe-core rules, minus the ones this script already checks, so each fault counts once.
const AXE_DUPES = ['color-contrast', 'button-name', 'link-name', 'image-alt', 'html-has-lang', 'label', 'page-has-heading-one', 'meta-viewport'];
async function axeCheck(page) {
  try {
    await page.addScriptTag({ content: axeSource });
    const v = await page.evaluate(async (skip) => (await axe.run(document, { resultTypes: ['violations'] })).violations
      .filter((x) => !skip.includes(x.id)).map((x) => ({ id: x.id, impact: x.impact, help: x.help, n: x.nodes.length, target: String(x.nodes[0]?.target ?? '') })), AXE_DUPES);
    for (const x of v) add(/critical|serious/.test(x.impact) ? 'FAIL' : 'WARN', `axe-${x.id}`, `${x.help} (${x.impact}, ${x.n} node${x.n > 1 ? 's' : ''})`, [x.target]);
  } catch (e) { add('INFO', 'axe', `axe-core did not run: ${e.message.split('\n')[0]}`); }
}

const runChecks = (page, name) => page.evaluate(pageChecks, name).catch((e) => [{ level: 'WARN', id: `checks-${name}`, msg: `Checks crashed: ${e.message.split('\n')[0]}`, examples: [] }]);
const errors = [];
for (const name of ['desktop', 'phone', 'dark']) {
  const { context, page } = await openView(name, url, name === 'desktop' ? errors : null);
  await shoot(page, name);
  results.push(...await runChecks(page, name));
  if (name === 'desktop' && axeSource) await axeCheck(page);
  if (name === 'desktop') {
    await focusCheck(page);
    // Arm's-length view: a blurred fold. Title, key number and primary action should read first.
    await page.keyboard.press('Escape'); await page.evaluate(() => { document.activeElement?.blur?.(); scrollTo(0, 0); });
    await page.addStyleTag({ content: 'html{filter:blur(5px)}' });
    await page.screenshot({ path: join(outDir, 'desktop-squint.png') }); shots.push('desktop-squint.png');
  }
  await context.close();
}
if (errors.length) add('FAIL', 'errors', `${errors.length} error(s) while loading.`, [...new Set(errors)].slice(0, 6));
for (const r of results) r.state ??= 'default';

// States: screenshots plus desktop and phone checks. Issues already reported for the default view are not repeated.
const seen = new Set(results.map((r) => r.id));
for (const state of (flags.state ?? '').split(',').filter(Boolean)) {
  const u = new URL(url); u.searchParams.set('state', state);
  for (const name of ['desktop', 'phone']) {
    const { context, page } = await openView(name, u.href);
    await shoot(page, `${state}-${name}`, false);
    for (const r of await runChecks(page, name)) if (r.level !== 'INFO' && !seen.has(r.id)) results.push({ ...r, state });
    await context.close();
  }
}
await browser.close();

const order = { FAIL: 0, WARN: 1, INFO: 2 };
results.sort((a, b) => order[a.level] - order[b.level]);
const fails = results.filter((r) => r.level === 'FAIL').length, warns = results.filter((r) => r.level === 'WARN').length;
writeFileSync(join(outDir, 'report.json'), JSON.stringify({ url, fails, warns, results, shots }, null, 2));
console.log(`ui-check ${url}\nBrowser: ${browserName}\nScreenshots in ${outDir}:\n  ${shots.join('\n  ')}\n`);
for (const r of results) {
  console.log(`${r.level.padEnd(4)} [${r.state}] ${r.id}: ${r.msg}`);
  for (const e of r.examples) console.log(`       - ${e}`);
}
const checked = ['contrast-light', 'contrast-dark', 'overflow-phone', 'short-background', 'table-overflow', 'table-clipped', 'tap-targets', 'input-zoom', 'focus-ring', 'labels', 'button-names', 'img-alt', 'viewport-meta', 'errors'];
const passed = checked.filter((id) => !results.some((r) => r.id === id));
if (passed.length) console.log(`PASS [all views] ${passed.join(', ')}`);
if (!axeSource) console.log('INFO axe-core not found, so axe rules were skipped. Optional: npm i -D axe-core');
console.log(`\nScore: ${fails} FAIL, ${warns} WARN. Now open the screenshots and run the critique checklist.`);
process.exit(fails ? 1 : 0);
