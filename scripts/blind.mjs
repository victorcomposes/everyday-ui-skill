// Usage: node scripts/blind.mjs <runDir> <cond1> <cond2> [cond3 ...] --seed <seed>   (N conditions, labels A, B, C ...)
//        node scripts/blind.mjs <runDir> <condA> <condB> <seed>                      (old two-condition call, labels X and Y)
// Per task, shuffles the conditions to labels by seed and copies each one's fold and full screenshots
// (desktop, mobile, dark) to <runDir>/blind/<task>/<label>/. Writes the answer to <runDir>/blind-key.json.
// The judge must never read that file. Re-running wipes <runDir>/blind, including any scores-*.json in it.
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { listPages, BLIND_FILES } from './lib.mjs';

const args = process.argv.slice(2);
const usage = () => { console.error('Usage: node scripts/blind.mjs <runDir> <cond1> <cond2> [cond3 ...] --seed <seed>\n   or: node scripts/blind.mjs <runDir> <condA> <condB> <seed>'); process.exit(1); };
let runDir, conditions, seed, labels;
const si = args.indexOf('--seed');
if (si >= 0) {
  seed = args[si + 1];
  [runDir, ...conditions] = args.filter((_, i) => i !== si && i !== si + 1);
  labels = conditions.map((_, i) => String.fromCharCode(65 + i));
} else {
  [runDir, ...conditions] = args.slice(0, 3);
  seed = args[3];
  labels = ['X', 'Y'];
  if (args.length !== 4) usage();
}
if (!runDir || !seed || conditions.length < 2 || conditions.length > 26 || new Set(conditions).size !== conditions.length) usage();

// mulberry32 seeded by an FNV-1a hash of the seed string: same seed, same order.
let h = 2166136261;
for (const c of String(seed)) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
let s = h >>> 0;
const rand = () => { s = (s + 0x6d2b79f5) >>> 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
// Old two-condition call drew one coin flip per task: keep that sequence so old seeds give the same keys.
const shuffle = (list) => {
  if (list.length === 2) return rand() < 0.5 ? [list[1], list[0]] : [...list];
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

const pages = listPages(runDir);
const tasksOf = (cond) => new Set(pages.filter((p) => p.condition === cond).map((p) => p.task));
const sets = conditions.map(tasksOf);
const empty = conditions.filter((_, i) => !sets[i].size);
if (empty.length) { console.error(`Condition not found or empty: ${empty.join(', ')}`); process.exit(1); }
const tasks = [...sets[0]].filter((t) => sets.every((x) => x.has(t))).sort();
if (!tasks.length) { console.error('No task is present in every condition.'); process.exit(1); }

rmSync(join(runDir, 'blind'), { recursive: true, force: true });
const key = { seed, conditions, tasks: {} };
for (const task of tasks) {
  const order = Object.fromEntries(shuffle(conditions).map((cond, i) => [labels[i], cond]));
  for (const [label, cond] of Object.entries(order)) {
    const out = join(runDir, 'blind', task, label);
    mkdirSync(out, { recursive: true });
    for (const f of BLIND_FILES) {
      const src = join(runDir, cond, task, f);
      if (existsSync(src)) cpSync(src, join(out, f)); else console.warn(`  warn: missing ${cond}/${task}/${f}`);
    }
  }
  key.tasks[task] = order;
  console.log(`${task}: ${labels.join(', ')} assigned`);
}
writeFileSync(join(runDir, 'blind-key.json'), JSON.stringify(key, null, 2));
console.log(`Wrote ${tasks.length} blind task(s) with ${conditions.length} labels and ${join(runDir, 'blind-key.json')} (judge must not read it).`);
