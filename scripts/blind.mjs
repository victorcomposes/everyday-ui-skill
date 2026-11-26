// Usage: node scripts/blind.mjs <runDir> <condA> <condB> <seed>
// Copies both conditions' screenshots to <runDir>/blind/<task>/X and Y in a seeded random order.
// Writes the answer to <runDir>/blind-key.json. The judge must never read that file.
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { listPages } from './lib.mjs';

const [runDir, condA, condB, seed] = process.argv.slice(2);
if (!seed) { console.error('Usage: node scripts/blind.mjs <runDir> <condA> <condB> <seed>'); process.exit(1); }

// mulberry32 seeded by an FNV-1a hash of the seed string: same seed, same order.
let h = 2166136261;
for (const c of String(seed)) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
let s = h >>> 0;
const rand = () => { s = (s + 0x6d2b79f5) >>> 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };

const pages = listPages(runDir);
const tasksOf = (cond) => new Set(pages.filter((p) => p.condition === cond).map((p) => p.task));
const a = tasksOf(condA), b = tasksOf(condB);
if (!a.size || !b.size) { console.error(`Condition not found or empty: ${!a.size ? condA : condB}`); process.exit(1); }
const tasks = [...a].filter((t) => b.has(t)).sort();

rmSync(join(runDir, 'blind'), { recursive: true, force: true });
const key = { seed, conditions: [condA, condB], tasks: {} };
for (const task of tasks) {
  const flip = rand() < 0.5;
  const order = flip ? { X: condB, Y: condA } : { X: condA, Y: condB };
  for (const [label, cond] of Object.entries(order)) {
    const out = join(runDir, 'blind', task, label);
    mkdirSync(out, { recursive: true });
    for (const f of ['desktop.png', 'mobile.png', 'dark.png']) {
      const src = join(runDir, cond, task, f);
      if (existsSync(src)) cpSync(src, join(out, f)); else console.warn(`  warn: missing ${cond}/${task}/${f}`);
    }
  }
  key.tasks[task] = order;
  console.log(`${task}: X and Y assigned`);
}
writeFileSync(join(runDir, 'blind-key.json'), JSON.stringify(key, null, 2));
console.log(`Wrote ${tasks.length} blind pairs and ${join(runDir, 'blind-key.json')} (judge must not read it).`);
