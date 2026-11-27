// Shared helpers: find pages under a run dir, launch Chromium, load a page.
import { chromium } from 'playwright';
import { readdirSync, existsSync, statSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export const DESKTOP = { width: 1440, height: 900 };
export const MOBILE = { width: 390, height: 844 };
export const MAX_PAGE_HEIGHT = 4000;

const dirs = (p) => readdirSync(p).filter((n) => statSync(join(p, n)).isDirectory());

/** Task of a blind group: "09-team-members-s2" is task "09-team-members". Old rounds have no -s<n>, so group and task are the same. */
export const taskOf = (group) => group.replace(/-s\d+$/, '');

/** Every <runDir>/<condition>/<task>/index.html as {condition, task, dir}. Skips the blind dir and any dir starting with . or _. Stray files are ignored. */
export function listPages(runDir) {
  runDir = resolve(runDir);
  if (!existsSync(runDir)) throw new Error(`Run dir not found: ${runDir}`);
  const pages = [];
  for (const condition of dirs(runDir).filter((c) => c !== 'blind' && !/^[._]/.test(c))) {
    for (const task of dirs(join(runDir, condition))) {
      const dir = join(runDir, condition, task);
      if (existsSync(join(dir, 'index.html'))) pages.push({ condition, task, dir });
    }
  }
  return pages;
}

export const launch = () => chromium.launch();

/** Open index.html in a fresh page, wait for network idle plus 500 ms. A timeout only warns. onPage(page) runs before the load, to attach listeners. */
export async function open(browser, dir, contextOptions, onPage) {
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();
  onPage?.(page);
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

/** Runs in the page. A scroll container (overflow auto or scroll) holding over 50 px more than it shows would hide content from a full-page shot: let it and its ancestors grow. */
function unclipScrollContainers() {
  // Find every container first: growing one changes the scroll sizes of the others.
  const clipped = [document.body, ...document.body.querySelectorAll('*')]
    .filter((el) => /auto|scroll/.test(getComputedStyle(el).overflowY) && el.scrollHeight - el.clientHeight > 50);
  for (const el of clipped) {
    for (let e = el; e; e = e.parentElement) { // up to and including html
      e.style.setProperty('height', 'auto', 'important');
      e.style.setProperty('max-height', 'none', 'important');
      e.style.setProperty('overflow', 'visible', 'important');
    }
  }
}

/** Full-page screenshot to path, never taller than MAX_PAGE_HEIGHT CSS px. Call it after any fold shot: it changes the page. */
export async function fullPageShot(page, path, width) {
  await page.evaluate(unclipScrollContainers);
  const height = await page.evaluate((max) => Math.min(max, Math.max(document.documentElement.scrollHeight, innerHeight)), MAX_PAGE_HEIGHT);
  await page.screenshot({ path, fullPage: true, clip: { x: 0, y: 0, width, height } });
}

/** Screenshots a blind judge sees per label, fold first. */
export const BLIND_FILES = ['desktop-fold.png', 'desktop.png', 'mobile-fold.png', 'mobile.png', 'dark.png'];

/** Judge criteria: key in scores files, and the text shown to the judge. */
export const CRITERIA = [
  ['hierarchy', 'Hierarchy and focus on the primary job'],
  ['layout', 'Layout and spacing rhythm'],
  ['typography', 'Typography'],
  ['colour', 'Colour and contrast'],
  ['craft', 'Component craft and detail'],
  ['realism', 'State and content realism'],
  ['mobile', 'Mobile quality'],
  ['dark', 'Dark mode quality'],
  ['overall', 'Overall: would a picky senior product designer ship this'],
];

/** Lint rows: label, value from lint.json. Used by report.mjs and unblind.mjs. */
export const LINT = [
  ['Axe critical (nodes)', (l) => l.axe.byImpact.critical?.nodes ?? 0],
  ['Axe serious (nodes)', (l) => l.axe.byImpact.serious?.nodes ?? 0],
  ['Axe moderate + minor', (l) => (l.axe.byImpact.moderate?.nodes ?? 0) + (l.axe.byImpact.minor?.nodes ?? 0)],
  ['Contrast failures', (l) => l.axe.contrastFailures],
  ['Overflow at 390 px', (l) => (l.overflow.yes ? `yes, ${l.overflow.px}px` : 'no')],
  ['Tap targets under 44 px', (l) => l.smallTapTargets.count],
  ['Fixed/sticky over 15% of 390x844', (l) => l.fixed_overlap?.count ?? 'n/a'],
  ['100vh gap (900 px boxes in a tall page)', (l) => l.vh_gap?.count ?? 'n/a'],
  ['Font families', (l) => l.fontFamilies.length],
  ['Text colors', (l) => l.textColors],
  ['Smallest font', (l) => (l.minFontPx == null ? 'n/a' : `${l.minFontPx}px`)],
  ['Emoji in DOM', (l) => l.emoji.count],
  ['Images without alt', (l) => l.imgNoAlt],
  ['Visible focus style', (l) => (l.focus.checked ? (l.focus.visible ? 'yes' : 'no') : 'n/a')],
];

export const readJson = (p) => (existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null);
