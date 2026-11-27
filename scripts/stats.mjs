// Usage: node scripts/stats.mjs <runDir>      node scripts/stats.mjs --selftest
// Reads <runDir>/scores.json (and scores-by-judge.json, both from unblind.mjs). Writes <runDir>/stats.json and <runDir>/stats.md.
// A group is a <task>-s<n> key in scores.json. Its light mean per arm is the mean of every criterion except dark, overall included.
// Arm means and differences weigh each task equally: mean over tasks of the mean over that task's samples.
// Difference = skill minus another arm, in the groups where both were scored. The 95% CI is a hierarchical bootstrap:
// resample tasks with replacement, then samples within each drawn task with replacement, DRAWS times, seeded PRNG.
// A win is a group where skill has the strictly highest light mean. A tie is a group where skill shares the highest. Ties are counted apart.
// Family rows (opus, sonnet) use only the judges of that family, so they can cover fewer groups.
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import { CRITERIA, readJson, taskOf } from './lib.mjs';

const SKILL = 'skill', DRAWS = 10000, SEED = 2026, FAMILIES = ['opus', 'sonnet'];
const LIGHT = CRITERIA.map(([k]) => k).filter((k) => k !== 'dark');
const sum = (xs) => xs.reduce((a, b) => a + b, 0);
const mean = (xs) => (xs.length ? sum(xs) / xs.length : null);
const round = (n) => (n == null ? null : Math.round(n * 1000) / 1000);
const fmt = (n) => (n == null ? '-' : n.toFixed(2));
const signed = (n) => (n == null ? '-' : (n >= 0 ? '+' : '') + n.toFixed(2));

/** mulberry32: same seed, same draws. */
function prng(seed) {
  let s = seed >>> 0;
  return () => { s = (s + 0x6d2b79f5) >>> 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

/** Light mean of one { criterion: n } cell, or null when it has none. */
const lightMean = (cell) => mean(LIGHT.map((k) => cell[k]).filter(Number.isFinite));

/** { group: { arm: light mean } } from scores.json. */
function lightByGroup(scores) {
  const out = {};
  for (const [group, arms] of Object.entries(scores))
    for (const [arm, cell] of Object.entries(arms)) {
      const v = lightMean(cell);
      if (v != null) (out[group] ??= {})[arm] = v;
    }
  return out;
}

/** Same shape from scores-by-judge.json, using only judges of one family: mean over those judges of their light mean. */
function lightByGroupFamily(byJudge, family) {
  const out = {};
  for (const [group, arms] of Object.entries(byJudge.groups))
    for (const [arm, judges] of Object.entries(arms)) {
      const vs = Object.entries(judges).filter(([j]) => byJudge.judges[j] === family).map(([, cell]) => lightMean(cell)).filter((v) => v != null);
      if (vs.length) (out[group] ??= {})[arm] = mean(vs);
    }
  return out;
}

/** { task: [group values] } */
const byTask = (groups) => {
  const out = {};
  for (const [group, arms] of Object.entries(groups)) (out[taskOf(group)] ??= []).push(arms);
  return out;
};

/** Task-weighted mean of a statistic per sample: tasks = { task: [number] }. */
const taskMean = (tasks) => mean(Object.values(tasks).map(mean));

/** Per task, the samples where both arms were scored, as skill minus other. */
function diffs(groups, other) {
  const out = {};
  for (const [task, samples] of Object.entries(byTask(groups))) {
    const d = samples.filter((s) => s[SKILL] != null && s[other] != null).map((s) => s[SKILL] - s[other]);
    if (d.length) out[task] = d;
  }
  return out;
}

/** Hierarchical bootstrap of the task-weighted mean. */
function bootstrap(tasks) {
  const lists = Object.values(tasks);
  if (!lists.length) return null;
  const rand = prng(SEED);
  const pick = (xs) => xs[Math.floor(rand() * xs.length)];
  const draws = [];
  for (let i = 0; i < DRAWS; i++) {
    const means = [];
    for (let t = 0; t < lists.length; t++) {
      const samples = pick(lists);
      means.push(mean(samples.map(() => pick(samples))));
    }
    draws.push(mean(means));
  }
  draws.sort((a, b) => a - b);
  return { mean: round(taskMean(tasks)), lo: round(draws[Math.floor(0.025 * DRAWS)]), hi: round(draws[Math.ceil(0.975 * DRAWS) - 1]), tasks: lists.length, groups: sum(lists.map((l) => l.length)) };
}

function winCounts(groups) {
  const w = { win: 0, tie: 0, loss: 0, groups: 0 };
  for (const arms of Object.values(groups)) {
    if (arms[SKILL] == null) continue;
    const best = Math.max(...Object.values(arms));
    const topCount = Object.values(arms).filter((v) => Math.abs(v - best) < 1e-9).length;
    w.groups++;
    if (arms[SKILL] < best - 1e-9) w.loss++; else if (topCount === 1) w.win++; else w.tie++;
  }
  return w;
}

/** All numbers for one dataset of light means: { group: { arm: number } }. */
function analyse(groups) {
  const tasks = byTask(groups);
  const arms = [...new Set(Object.values(groups).flatMap((a) => Object.keys(a)))];
  const armMeans = {}, others = arms.filter((a) => a !== SKILL), diff = {}, perTask = {};
  for (const arm of arms) {
    const perTaskValues = Object.fromEntries(Object.entries(tasks).map(([t, ss]) => [t, ss.map((s) => s[arm]).filter((v) => v != null)]).filter(([, v]) => v.length));
    armMeans[arm] = round(taskMean(perTaskValues));
    for (const [t, v] of Object.entries(perTaskValues)) (perTask[t] ??= {})[arm] = { mean: round(mean(v)), min: round(Math.min(...v)), max: round(Math.max(...v)), n: v.length };
  }
  for (const arm of others) diff[arm] = bootstrap(diffs(groups, arm));
  return { arms, armMeans, diff, wins: winCounts(groups), perTask };
}

function stats(scores, byJudge) {
  const out = { seed: SEED, draws: DRAWS, ...analyse(lightByGroup(scores)), byFamily: {} };
  if (byJudge) {
    for (const family of FAMILIES) {
      const groups = lightByGroupFamily(byJudge, family);
      out.byFamily[family] = { judges: Object.keys(byJudge.judges).filter((j) => byJudge.judges[j] === family), diffVsAnthropic: bootstrap(diffs(groups, 'anthropic')) };
    }
  }
  return out;
}

function markdown(name, r) {
  const row = (cells) => `| ${cells.join(' | ')} |`;
  const head = (cells) => [row(cells), row(cells.map(() => '---'))];
  const ci = (d) => (d ? `${signed(d.mean)} [${signed(d.lo)}, ${signed(d.hi)}]` : '-');
  const others = r.arms.filter((a) => a !== SKILL);
  const tasks = Object.keys(r.perTask).sort();
  const L = [`# Stats: ${name}`, '',
    `Light mean per group: the mean of every criterion except dark, overall included. Tasks count equally. Seed ${r.seed}, ${r.draws} bootstrap draws.`, '',
    '## Arm means', '', ...head(['arm', 'light mean']), ...r.arms.map((a) => row([a, fmt(r.armMeans[a])])), '',
    `## ${SKILL} minus each arm`, '',
    'Mean difference with a 95% CI from a hierarchical bootstrap: tasks resampled, then samples within each task.', '',
    ...head(['arm', 'difference [95% CI]', 'tasks', 'groups']), ...others.map((a) => row([a, ci(r.diff[a]), r.diff[a]?.tasks ?? '-', r.diff[a]?.groups ?? '-'])), '',
    `## ${SKILL} against the best arm, per group`, '',
    ...head(['wins', 'ties', 'losses', 'groups']), row([r.wins.win, r.wins.tie, r.wins.loss, r.wins.groups]), '',
    'A win is the strictly highest light mean. A tie shares the highest. A loss means another arm is higher.', '',
    '## Per task: mean (min-max across samples)', '', ...head(['task', ...r.arms]),
    ...tasks.map((t) => row([t, ...r.arms.map((a) => { const c = r.perTask[t][a]; return c ? `${fmt(c.mean)} (${fmt(c.min)}-${fmt(c.max)})` : '-'; })])), '',
    `## ${SKILL} minus anthropic, by judge family`, ''];
  if (Object.keys(r.byFamily).length) {
    L.push(...head(['family', 'judges', 'difference [95% CI]', 'tasks', 'groups']),
      ...FAMILIES.map((f) => { const x = r.byFamily[f]; return row([f, x.judges.join(', ') || 'none', ci(x.diffVsAnthropic), x.diffVsAnthropic?.tasks ?? '-', x.diffVsAnthropic?.groups ?? '-']); }), '');
  } else L.push('No scores-by-judge.json. Run `node scripts/unblind.mjs`.', '');
  return L.join('\n');
}

function selftest() {
  const cell = (v, dark = 1) => Object.fromEntries(CRITERIA.map(([k]) => [k, k === 'dark' ? dark : v]));
  const g = (skill, anthropic, baseline) => ({ skill: cell(skill), anthropic: cell(anthropic), baseline: cell(baseline) });
  const scores = { 'tA-s1': g(8, 7, 5), 'tA-s2': g(8, 7, 5), 'tB-s1': g(7, 7, 4), 'tB-s2': g(6, 7, 3) };
  // opus1 scores every group: skill 9, anthropic 7. sonnet1 scores task tA only: skill 6, anthropic 6.
  const judged = (opus, sonnet) => Object.fromEntries(Object.keys(scores).map((k) => [k, Object.fromEntries(['skill', 'anthropic', 'baseline'].map((a, i) => [a,
    { opus1: cell(opus[i]), ...(k.startsWith('tA') ? { sonnet1: cell(sonnet[i]) } : {}) }]))]));
  const byJudge = { judges: { opus1: 'opus', sonnet1: 'sonnet' }, groups: judged([9, 7, 5], [6, 6, 5]) };

  const r = stats(scores, byJudge);
  assert.equal(r.armMeans.skill, 7.25); // dark is left out; tasks: tA 8, tB 6.5
  assert.equal(r.armMeans.anthropic, 7);
  assert.equal(r.armMeans.baseline, 4.25); // tA 5, tB 3.5
  assert.deepEqual(r.wins, { win: 2, tie: 1, loss: 1, groups: 4 });
  assert.equal(r.diff.anthropic.mean, 0.25); // tA 1, tB -0.5
  assert.ok(r.diff.anthropic.lo <= 0.25 && 0.25 <= r.diff.anthropic.hi && r.diff.anthropic.lo >= -1 && r.diff.anthropic.hi <= 1);
  assert.deepEqual([r.diff.baseline.mean, r.diff.baseline.lo, r.diff.baseline.hi], [3, 3, 3]);
  assert.deepEqual(r.perTask.tB.skill, { mean: 6.5, min: 6, max: 7, n: 2 });
  // Constant differences give a CI of one point.
  const flat = stats({ 'tA-s1': g(8, 7, 5), 'tA-s2': g(7, 6, 4), 'tB-s1': g(6, 5, 3) }, null);
  assert.deepEqual([flat.diff.anthropic.mean, flat.diff.anthropic.lo, flat.diff.anthropic.hi], [1, 1, 1]);
  assert.deepEqual(flat.wins, { win: 3, tie: 0, loss: 0, groups: 3 });
  // Families: opus covers 2 tasks (diff 2), sonnet covers task tA only (diff 0).
  assert.deepEqual([r.byFamily.opus.diffVsAnthropic.mean, r.byFamily.opus.diffVsAnthropic.lo, r.byFamily.opus.diffVsAnthropic.hi, r.byFamily.opus.diffVsAnthropic.tasks], [2, 2, 2, 2]);
  assert.deepEqual([r.byFamily.sonnet.diffVsAnthropic.mean, r.byFamily.sonnet.diffVsAnthropic.lo, r.byFamily.sonnet.diffVsAnthropic.hi, r.byFamily.sonnet.diffVsAnthropic.tasks, r.byFamily.sonnet.diffVsAnthropic.groups], [0, 0, 0, 1, 2]);
  assert.deepEqual(stats(scores, byJudge), r); // same seed, same answer
  console.log('stats selftest passed');
}

const arg = process.argv[2];
if (!arg) { console.error('Usage: node scripts/stats.mjs <runDir>\n   or: node scripts/stats.mjs --selftest'); process.exit(1); }
if (arg === '--selftest') selftest();
else {
  const scores = readJson(join(arg, 'scores.json'));
  if (!scores) { console.error(`No ${join(arg, 'scores.json')}. Run scripts/unblind.mjs first.`); process.exit(1); }
  const byJudge = readJson(join(arg, 'scores-by-judge.json'));
  if (!byJudge) console.warn('  warn: no scores-by-judge.json, skipping the judge family rows');
  const result = stats(scores, byJudge);
  const md = markdown(arg.replace(/[\/\\]+$/, '').split(/[\/\\]/).pop(), result);
  writeFileSync(join(arg, 'stats.json'), JSON.stringify(result, null, 2));
  writeFileSync(join(arg, 'stats.md'), md + '\n');
  console.log(`Wrote ${join(arg, 'stats.json')} and ${join(arg, 'stats.md')}.\n\n${md}`);
}
