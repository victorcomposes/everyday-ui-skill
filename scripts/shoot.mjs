// Usage: node scripts/shoot.mjs <runDir>
// Writes desktop.png (1440x900 viewport, full page), mobile.png (390x844 @2x, full page) and
// dark.png (desktop, prefers-color-scheme dark) beside each <runDir>/<condition>/<task>/index.html.
import { join } from 'node:path';
import { listPages, launch, open, desktopContext, mobileContext, MAX_PAGE_HEIGHT } from './lib.mjs';

const runDir = process.argv[2];
if (!runDir) { console.error('Usage: node scripts/shoot.mjs <runDir>'); process.exit(1); }

const views = [
  ['desktop.png', desktopContext],
  ['mobile.png', mobileContext],
  ['dark.png', { ...desktopContext, colorScheme: 'dark' }],
];

const pages = listPages(runDir);
if (!pages.length) { console.error(`No <condition>/<task>/index.html found in ${runDir}`); process.exit(1); }

const browser = await launch();
for (const { condition, task, dir } of pages) {
  for (const [file, options] of views) {
    const { context, page } = await open(browser, dir, options);
    // Full page, but never taller than 4000 CSS px.
    const height = await page.evaluate((max) => Math.min(max, Math.max(document.documentElement.scrollHeight, innerHeight)), MAX_PAGE_HEIGHT);
    await page.screenshot({ path: join(dir, file), fullPage: true, clip: { x: 0, y: 0, width: options.viewport.width, height } });
    await context.close();
  }
  console.log(`shot ${condition}/${task}`);
}
await browser.close();
console.log(`Done: ${pages.length} pages, ${pages.length * views.length} screenshots.`);
