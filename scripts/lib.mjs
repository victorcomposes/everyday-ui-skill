// Shared helpers: find pages under a run dir, launch Chromium, load a page.
import { chromium } from 'playwright';
import { readdirSync, existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export const DESKTOP = { width: 1440, height: 900 };
export const MOBILE = { width: 390, height: 844 };
export const MAX_PAGE_HEIGHT = 4000;

const dirs = (p) => readdirSync(p).filter((n) => statSync(join(p, n)).isDirectory());

/** Every <runDir>/<condition>/<task>/index.html as {condition, task, dir}. Skips the blind dir. */
export function listPages(runDir) {
  runDir = resolve(runDir);
  if (!existsSync(runDir)) throw new Error(`Run dir not found: ${runDir}`);
  const pages = [];
  for (const condition of dirs(runDir).filter((c) => c !== 'blind')) {
    for (const task of dirs(join(runDir, condition))) {
      const dir = join(runDir, condition, task);
      if (existsSync(join(dir, 'index.html'))) pages.push({ condition, task, dir });
    }
  }
  return pages;
}

export const launch = () => chromium.launch();

/** Open index.html in a fresh page, wait for network idle plus 500 ms. A timeout only warns. */
export async function open(browser, dir, contextOptions) {
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();
  try {
    await page.goto(pathToFileURL(join(dir, 'index.html')).href, { waitUntil: 'networkidle', timeout: 30000 });
  } catch (e) {
    console.warn(`  warn: ${dir}: ${e.message.split('\n')[0]}`);
  }
  await page.waitForTimeout(500);
  return { context, page };
}

// Mobile means a real phone: isMobile honours the viewport meta tag, so a page without it renders at 980 px.
export const mobileContext = { viewport: MOBILE, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
export const desktopContext = { viewport: DESKTOP };
