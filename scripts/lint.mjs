// Usage: node scripts/lint.mjs <runDir>
// Measures each page in a real browser. Writes lint.json beside the screenshots and <runDir>/lint-summary.md.
// Desktop (1440x900) checks: axe, fonts, colors, font size, emoji, img alt, focus. Mobile (390x844) checks: overflow, tap targets.
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, resolve } from 'node:path';
import { listPages, launch, open, desktopContext, mobileContext, MOBILE } from './lib.mjs';

const runDir = process.argv[2];
if (!runDir) { console.error('Usage: node scripts/lint.mjs <runDir>'); process.exit(1); }
const axeSource = readFileSync(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8');

/** Runs in the page at 1440 px. */
function desktopChecks() {
  const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE']);
  const textEls = [...document.body.querySelectorAll('*')].filter((el) =>
    !SKIP.has(el.tagName) && el.checkVisibility({ checkVisibilityCSS: true }) &&
    [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()));
  const styles = textEls.map((el) => getComputedStyle(el));
  const families = new Set(styles.map((s) => s.fontFamily.split(',')[0].trim().replace(/["']/g, '').toLowerCase())); // first family of each text element
  const colors = new Set(styles.map((s) => s.color)); // computed rgb()/rgba() string of each text element
  const minFont = Math.min(...styles.map((s) => parseFloat(s.fontSize))); // px, text-bearing elements only
  // Emoji presentation, or a pictograph forced to emoji with U+FE0F. Plain symbols such as arrows, © and ™ do not count.
  const emojiRe = /\p{Emoji_Presentation}|\p{Extended_Pictographic}️/gu;
  const emoji = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (SKIP.has(n.parentElement?.tagName)) continue;
    emoji.push(...(n.textContent.match(emojiRe) ?? []));
  }
  const imgNoAlt = [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length; // alt="" is allowed (decorative)
  return {
    fontFamilies: [...families].sort(),
    textColors: colors.size,
    minFontPx: Number.isFinite(minFont) ? minFont : null,
    emoji: { count: emoji.length, distinct: [...new Set(emoji)] },
    imgNoAlt,
  };
}

const FOCUSABLE = 'a[href],button,input:not([type=hidden]),select,textarea,summary,[tabindex]:not([tabindex="-1"])';

/** Snapshots the ring of the first focusable elements before any focus. */
function focusBefore(selector) {
  const ringOf = (el) => { const s = getComputedStyle(el); return { outline: `${s.outlineStyle} ${s.outlineWidth} ${s.outlineColor}`, outlineVisible: s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0, boxShadow: s.boxShadow }; };
  window.__ringOf = ringOf;
  window.__focusables = [...document.querySelectorAll(selector)].filter((el) => !el.disabled && el.checkVisibility({ checkVisibilityCSS: true })).slice(0, 10);
  return window.__focusables.map(ringOf);
}
/** After Tab: did the focused element gain a different outline or box-shadow? */
function focusAfter(before) {
  const i = window.__focusables.indexOf(document.activeElement);
  if (i < 0) return { checked: false };
  const after = window.__ringOf(document.activeElement), b = before[i];
  const visible = (after.outlineVisible && after.outline !== b.outline) || (after.boxShadow !== 'none' && after.boxShadow !== b.boxShadow);
  return { checked: true, visible, element: document.activeElement.tagName.toLowerCase(), before: b, after };
}

/** Runs in the page at 390 px. Interactive = links, buttons, form controls, summary, ARIA widget roles, tabindex. */
function mobileChecks(width) {
  const SEL = 'a[href],button,input:not([type=hidden]),select,textarea,summary,[role=button],[role=link],[role=tab],[role=checkbox],[role=switch],[role=menuitem],[tabindex]:not([tabindex="-1"])';
  const small = [];
  for (const el of document.querySelectorAll(SEL)) {
    if (el.disabled || !el.checkVisibility({ checkVisibilityCSS: true })) continue;
    if (el.tagName === 'A' && getComputedStyle(el).display === 'inline') continue; // inline links in running text are exempt (WCAG 2.5.8)
    const box = (['checkbox', 'radio'].includes(el.type) && el.closest('label')) || el; // a checkbox's label is its tap target
    const r = box.getBoundingClientRect();
    if (r.width < 44 || r.height < 44) small.push({ tag: el.tagName.toLowerCase(), text: (el.innerText || el.value || el.getAttribute('aria-label') || '').trim().slice(0, 30), w: Math.round(r.width), h: Math.round(r.height) });
  }
  const overflowPx = Math.max(0, document.documentElement.scrollWidth - width);
  return { overflow: { yes: overflowPx > 0, px: overflowPx }, smallTapTargets: { count: small.length, examples: small.slice(0, 8) } };
}

async function lintPage(browser, dir) {
  const d = await open(browser, dir, desktopContext);
  await d.page.addScriptTag({ content: axeSource });
  const axeRaw = await d.page.evaluate(() => axe.run(document, { resultTypes: ['violations'] }));
  const axe = { rules: {}, byImpact: {} };
  for (const v of axeRaw.violations) {
    axe.rules[v.id] = { impact: v.impact, nodes: v.nodes.length };
    const b = (axe.byImpact[v.impact] ??= { rules: 0, nodes: 0 });
    b.rules++; b.nodes += v.nodes.length;
  }
  axe.contrastFailures = axe.rules['color-contrast']?.nodes ?? 0;
  const desktop = await d.page.evaluate(desktopChecks);
  const before = await d.page.evaluate(focusBefore, FOCUSABLE);
  await d.page.keyboard.press('Tab');
  const focus = await d.page.evaluate(focusAfter, before);
  await d.context.close();

  const m = await open(browser, dir, mobileContext);
  const mobile = await m.page.evaluate(mobileChecks, MOBILE.width);
  await m.context.close();
  return { axe, ...desktop, focus, ...mobile };
}

const pages = listPages(runDir);
if (!pages.length) { console.error(`No <condition>/<task>/index.html found in ${runDir}`); process.exit(1); }
const browser = await launch();
const rows = [];
for (const { condition, task, dir } of pages) {
  let result;
  try { result = await lintPage(browser, dir); } catch (e) { result = { error: e.message }; console.warn(`  error: ${condition}/${task}: ${e.message}`); }
  writeFileSync(join(dir, 'lint.json'), JSON.stringify(result, null, 2));
  rows.push({ condition, task, r: result });
  console.log(`lint ${condition}/${task}`);
}
await browser.close();

const n = (r, level) => r.axe.byImpact[level]?.nodes ?? 0;
const head = ['condition', 'task', 'axe critical', 'axe serious', 'axe other', 'contrast', 'overflow 390', 'taps <44', 'fonts', 'colors', 'min px', 'emoji', 'img no alt', 'focus ring'];
const lines = [`# Lint summary: ${resolve(runDir).split(/[\\/]/).pop()}`, '', 'Axe columns count failing nodes. Other = moderate + minor.', '',
  `| ${head.join(' | ')} |`, `|${head.map(() => '---').join('|')}|`];
for (const { condition, task, r } of rows) {
  if (r.error) { lines.push(`| ${condition} | ${task} | error: ${r.error.replace(/\|/g, '/')} |` + ' |'.repeat(head.length - 3)); continue; }
  lines.push(`| ${[condition, task, n(r, 'critical'), n(r, 'serious'), n(r, 'moderate') + n(r, 'minor'), r.axe.contrastFailures,
    r.overflow.yes ? `yes ${r.overflow.px}px` : 'no', r.smallTapTargets.count, r.fontFamilies.length, r.textColors, r.minFontPx,
    r.emoji.count, r.imgNoAlt, r.focus.checked ? (r.focus.visible ? 'yes' : 'NO') : 'n/a'].join(' | ')} |`);
}
writeFileSync(join(runDir, 'lint-summary.md'), lines.join('\n') + '\n');
console.log(`\n${lines.slice(4).join('\n')}`);
