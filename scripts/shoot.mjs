// Usage: node scripts/shoot.mjs <runDir>
// Writes beside each <runDir>/<condition>/<task>/index.html:
//   desktop.png (1440x900 viewport, full page) and desktop-fold.png (viewport only),
//   mobile.png (390x844 @2x, full page) and mobile-fold.png (viewport only),
//   dark.png (desktop, prefers-color-scheme dark, full page).
// The fold shots show what a user sees first: full-page shots put fixed or sticky bars mid-page.
import { join } from 'node:path';
import { listPages, launch, open, desktopContext, mobileContext, MAX_PAGE_HEIGHT } from './lib.mjs';

const runDir = process.argv[2];
if (!runDir) { console.error('Usage: node scripts/shoot.mjs <runDir>'); process.exit(1); }

// [full file, fold file or null, context options]
const views = [
  ['desktop.png', 'desktop-fold.png', desktopContext],
  ['mobile.png', 'mobile-fold.png', mobileContext],
  ['dark.png', null, { ...desktopContext, colorScheme: 'dark' }],
];

const pages = listPages(runDir);
if (!pages.length) { console.error(`No <condition>/<task>/index.html found in ${runDir}`); process.exit(1); }

const browser = await launch();
let count = 0;
for (const { condition, task, dir } of pages) {
  for (const [file, foldFile, options] of views) {
    const { context, page } = await open(browser, dir, options);
    if (foldFile) { await page.screenshot({ path: join(dir, foldFile) }); count++; } // viewport only, taken before the full-page shot scrolls anything
    // Full page, but never taller than 4000 CSS px.
    const height = await page.evaluate((max) => Math.min(max, Math.max(document.documentElement.scrollHeight, innerHeight)), MAX_PAGE_HEIGHT);
    await page.screenshot({ path: join(dir, file), fullPage: true, clip: { x: 0, y: 0, width: options.viewport.width, height } });
    count++;
    await context.close();
  }
  console.log(`shot ${condition}/${task}`);
}
await browser.close();
console.log(`Done: ${pages.length} pages, ${count} screenshots.`);
