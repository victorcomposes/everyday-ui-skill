// Usage: node scripts/unblind.mjs <runDir>
// Maps every <runDir>/blind/scores-<judge>.json through <runDir>/blind-key.json. Writes:
//   <runDir>/scores.json  { task: { condition: { criterion: mean over judges, notes: "per-judge worst defects" } } }  (report.mjs reads it)
//   <runDir>/results.md   mean overall, per-criterion means, wins per task, and every lint number side by side.
import { readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { CRITERIA, LINT, readJson } from './lib.mjs';

const runDir = process.argv[2];
if (!runDir) { console.error('Usage: node scripts/unblind.mjs <runDir>'); process.exit(1); }
const key = readJson(join(runDir, 'blind-key.json'));
if (!key) { console.error(`No ${join(runDir, 'blind-key.json')}. Run scripts/blind.mjs first.`); process.exit(1); }
const files = readdirSync(join(runDir, 'blind')).filter((f) => /^scores-.+\.json$/.test(f)).sort();
if (!files.length) { console.error(`No scores-<judge>.json in ${join(runDir, 'blind')}.`); process.exit(1); }

const keys = CRITERIA.map(([k]) => k);
const tasks = Object.keys(key.tasks).sort();
const conditions = key.conditions;
const round = (n) => Math.round(n * 100) / 100;
const mean = (xs) => (xs.length ? round(xs.reduce((a, b) => a + b, 0) / xs.length) : null);
const fmt = (n) => (n == null ? '-' : n.toFixed(2));

// samples[task][condition] = { criterion: [n per judge] }, notes[task][condition] = ["judge: text"]
const samples = {}, notes = {};
const judges = [];
for (const file of files) {
  const judge = file.slice('scores-'.length, -'.json'.length);
  let data;
  try { data = readJson(join(runDir, 'blind', file)); } catch (e) { console.error(`Skipping ${file}: not valid JSON (${e.message})`); continue; }
  judges.push(judge);
  for (const task of tasks) {
    for (const [label, cond] of Object.entries(key.tasks[task])) {
      const entry = data?.[task]?.[label];
      if (!entry) { console.warn(`  warn: ${judge} has no ${task}/${label}`); continue; }
      const cell = ((samples[task] ??= {})[cond] ??= {});
      for (const k of keys) {
        const v = entry[k];
        if (!Number.isFinite(v) || v < 1 || v > 10) { console.warn(`  warn: ${judge} ${task}/${label} ${k}=${JSON.stringify(v)} is not 1-10, ignored`); continue; }
        (cell[k] ??= []).push(v);
      }
      if (entry.worst) ((notes[task] ??= {})[cond] ??= []).push(`${judge}: ${entry.worst}`);
    }
  }
}
if (!judges.length) { console.error('No readable judge file.'); process.exit(1); }

const scores = {};
for (const task of tasks) {
  scores[task] = {};
  for (const cond of conditions) {
    const cell = samples[task]?.[cond] ?? {};
    const out = {};
    for (const k of keys) if (cell[k]) out[k] = mean(cell[k]);
    out.notes = (notes[task]?.[cond] ?? []).join(' | ');
    scores[task][cond] = out;
  }
}
writeFileSync(join(runDir, 'scores.json'), JSON.stringify(scores, null, 2));

// results.md
const avg = (cond, k) => mean(tasks.map((t) => scores[t][cond][k]).filter((v) => v != null));
const row = (cells) => `| ${cells.join(' | ')} |`;
const head = (cells) => [row(cells), row(cells.map(() => '---'))];
const wins = Object.fromEntries(conditions.map((c) => [c, { win: 0, tie: 0 }]));
const taskRows = tasks.map((t) => {
  const vals = conditions.map((c) => scores[t][c].overall ?? null);
  const best = Math.max(...vals.filter((v) => v != null));
  const top = conditions.filter((_, i) => vals[i] === best);
  for (const c of top) wins[c][top.length === 1 ? 'win' : 'tie']++;
  return row([t, ...vals.map(fmt), top.length === 1 ? top[0] : `tie: ${top.join(', ')}`]);
});

const L = [`# Results: ${runDir.replace(/[\/]+$/, '').split(/[\/]/).pop()}`, '',
  `Judges: ${judges.join(', ')}. Conditions: ${conditions.join(', ')}. Scores are 1 to 10, averaged across judges.`, '',
  '## Mean overall per condition', '', ...head(['condition', 'mean overall', 'wins', 'ties']),
  ...conditions.map((c) => row([c, fmt(avg(c, 'overall')), wins[c].win, wins[c].tie])), '',
  '## Mean per criterion', '', ...head(['criterion', ...conditions]),
  ...CRITERIA.map(([k, text]) => row([text, ...conditions.map((c) => fmt(avg(c, k)))])), '',
  '## Overall per task', '', ...head(['task', ...conditions, 'winner']), ...taskRows, '',
  '## Lint, side by side', ''];
for (const t of tasks) {
  const lints = conditions.map((c) => readJson(join(runDir, c, t, 'lint.json')));
  L.push(`### ${t}`, '');
  if (lints.every((l) => !l || l.error)) { L.push('No lint.json. Run `node scripts/lint.mjs`.', ''); continue; }
  L.push(...head(['check', ...conditions]),
    ...LINT.map(([label, fn]) => row([label, ...lints.map((l) => (l && !l.error ? fn(l) : '-'))])), '');
}
writeFileSync(join(runDir, 'results.md'), L.join('\n'));
console.log(`Wrote ${join(runDir, 'scores.json')} and ${join(runDir, 'results.md')} from ${judges.length} judge(s).`);
console.log(L.slice(0, 22).join('\n'));
