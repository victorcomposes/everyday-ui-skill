// Usage: node scripts/vote-kit.mjs [runDir=runs/proof2]
// Builds the blind human vote kit in vote/ (public): first-screen JPEGs under opaque ids and pairs.json.
// Writes the id -> arm key to <runDir>/vote-key.json (gitignored while voting is open).
// Pairs: in each group (task, sample), `skill` against each of the other three arms.
import { mkdirSync, rmSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { listPages, launch, open, desktopContext, mobileContext, taskOf } from './lib.mjs';

const runDir = resolve(process.argv[2] ?? 'runs/proof2');
const outDir = resolve('vote');
const SEED = 777;

const TITLES = {
  '09-team-members': 'Team members admin',
  '10-notifications': 'Notifications centre',
  '11-search-results': 'Recipe search results',
  '12-mobile-product': 'Mobile sneaker product screen',
  '13-expense-report': 'Expense report form',
  '14-support-conversation': 'Support conversation',
  '15-mobile-booking': 'Dental appointment booking',
  '16-stock-levels': 'Stock levels',
};

// mulberry32
function prng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rng = prng(SEED);
const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; }
  return arr;
};

// Stable order first, so the same seed always gives the same ids.
const pages = listPages(runDir)
  .map((p) => ({ ...p, sample: Number(/-s(\d+)$/.exec(p.task)?.[1]), taskName: taskOf(p.task) }))
  .filter((p) => TITLES[p.taskName] && p.sample)
  .sort((x, y) => (x.condition + x.task).localeCompare(y.condition + y.task));

const used = new Set();
for (const p of pages) {
  do p.id = Math.floor(rng() * 0x100000000).toString(16).padStart(8, '0'); while (used.has(p.id));
  used.add(p.id);
}

rmSync(join(outDir, 'img'), { recursive: true, force: true }); // keep vote/index.html
mkdirSync(join(outDir, 'img'), { recursive: true });

const browser = await launch();
const shoot = async (p, file, options) => {
  const { context, page } = await open(browser, p.dir, { ...options, colorScheme: 'light' });
  await page.screenshot({ path: join(outDir, 'img', file), type: 'jpeg', quality: 72 });
  await context.close();
};
for (const p of pages) {
  await shoot(p, `${p.id}-d.jpg`, { ...desktopContext, deviceScaleFactor: 1 });
  await shoot(p, `${p.id}-m.jpg`, mobileContext);
  console.log(`shot ${p.condition}/${p.task} -> ${p.id}`);
}
await browser.close();

// Pairs
const byGroup = new Map();
for (const p of pages) byGroup.set(p.task, [...(byGroup.get(p.task) ?? []), p]);
const raw = [];
for (const [, group] of [...byGroup].sort(([x], [y]) => x.localeCompare(y))) {
  const skill = group.find((p) => p.condition === 'skill');
  if (!skill) { console.warn(`warn: no skill page in ${group[0].task}`); continue; }
  for (const other of group.filter((p) => p.condition !== 'skill').sort((x, y) => x.condition.localeCompare(y.condition))) {
    const flip = rng() < 0.5; // a/b order in the file carries no arm signal
    raw.push({ task: TITLES[skill.taskName], a: flip ? skill.id : other.id, b: flip ? other.id : skill.id });
  }
}
const pairs = shuffle(raw).map((x, i) => ({ pair: `p${String(i + 1).padStart(3, '0')}`, ...x }));
writeFileSync(join(outDir, 'pairs.json'), JSON.stringify(pairs));

const key = Object.fromEntries(pages.map((p) => [p.id, { arm: p.condition, task: p.taskName, sample: p.sample }]));
writeFileSync(join(runDir, 'vote-key.json'), JSON.stringify(key, null, 2));

const walk = (d) => readdirSync(d).flatMap((n) => { const f = join(d, n); return statSync(f).isDirectory() ? walk(f) : [f]; });
const files = walk(outDir);
const bytes = files.reduce((s, f) => s + statSync(f).size, 0);
console.log(`${pages.length} pages, ${pairs.length} pairs. vote/ has ${files.length} files, ${(bytes / 1048576).toFixed(2)} MB.`);
