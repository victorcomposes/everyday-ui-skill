// Usage: node scripts/peek.mjs <dir>     (<dir> holds index.html: a generator's self-check)
// Writes beside index.html: peek-desktop.png (1440x900 viewport), peek-mobile.png (390x844 @2x viewport),
// peek-desktop-full.png and peek-mobile-full.png (full page, 4000 px cap, scroll containers grown).
// Prints console errors and sideways overflow at 390 px. blind.mjs and lint.mjs never read peek-*.png.
import { join } from 'node:path';
import { launch, open, desktopContext, mobileContext, fullPageShot, MOBILE } from './lib.mjs';

const dir = process.argv[2];
if (!dir) { console.error('Usage: node scripts/peek.mjs <dir>'); process.exit(1); }

const errors = [];
const watch = (view) => (page) => {
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`${view}: console error: ${m.text()}`); });
  page.on('pageerror', (e) => errors.push(`${view}: page error: ${e.message}`));
};

const browser = await launch();
let overflowPx = 0;
for (const [view, options] of [['desktop', desktopContext], ['mobile', mobileContext]]) {
  const { context, page } = await open(browser, dir, options, watch(view));
  await page.screenshot({ path: join(dir, `peek-${view}.png`) }); // fold first: the full-page shot changes the page
  if (view === 'mobile') overflowPx = await page.evaluate((w) => Math.max(0, document.documentElement.scrollWidth - w), MOBILE.width);
  await fullPageShot(page, join(dir, `peek-${view}-full.png`), options.viewport.width);
  await context.close();
}
await browser.close();

console.log(`Wrote peek-desktop.png, peek-mobile.png, peek-desktop-full.png, peek-mobile-full.png in ${dir}`);
console.log(errors.length ? `Console errors (${errors.length}):\n${errors.map((e) => `  ${e}`).join('\n')}` : 'Console errors: none');
console.log(overflowPx ? `Sideways overflow at 390 px: yes, ${overflowPx}px` : 'Sideways overflow at 390 px: no');
