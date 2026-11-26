// Usage: node scripts/report.mjs [runsDir=runs]
// Builds report/index.html: one section per round (<runsDir>/<round>), one card per task,
// conditions side by side for desktop, mobile and dark, then lint numbers and judge scores.
// Images are linked relative to report/, so keep report/ and runs/ together.
// <round>/scores.json is optional: { "<task>": { "<condition>": { "<criterion>": number, "notes": "text" } } }
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { listPages } from './lib.mjs';

const runsDir = resolve(process.argv[2] ?? 'runs');
const outDir = resolve('report');
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const readJson = (p) => (existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null);
const rel = (p) => relative(outDir, p).split('\\').join('/');
const taskPrompt = (task) => { const p = resolve('evals/tasks', `${task}.md`); return existsSync(p) ? readFileSync(p, 'utf8').trim() : ''; };

// Lint rows: label, value from lint.json.
const LINT = [
  ['Axe critical (nodes)', (l) => l.axe.byImpact.critical?.nodes ?? 0],
  ['Axe serious (nodes)', (l) => l.axe.byImpact.serious?.nodes ?? 0],
  ['Axe moderate + minor', (l) => (l.axe.byImpact.moderate?.nodes ?? 0) + (l.axe.byImpact.minor?.nodes ?? 0)],
  ['Contrast failures', (l) => l.axe.contrastFailures],
  ['Overflow at 390 px', (l) => (l.overflow.yes ? `yes, ${l.overflow.px}px` : 'no')],
  ['Tap targets under 44 px', (l) => l.smallTapTargets.count],
  ['Font families', (l) => l.fontFamilies.length],
  ['Text colors', (l) => l.textColors],
  ['Smallest font', (l) => (l.minFontPx == null ? 'n/a' : `${l.minFontPx}px`)],
  ['Emoji in DOM', (l) => l.emoji.count],
  ['Images without alt', (l) => l.imgNoAlt],
  ['Visible focus style', (l) => (l.focus.checked ? (l.focus.visible ? 'yes' : 'no') : 'n/a')],
];

const rounds = readdirSync(runsDir).filter((n) => statSync(join(runsDir, n)).isDirectory()).sort().map((round) => {
  const dir = join(runsDir, round);
  const pages = listPages(dir);
  const conditions = [...new Set(pages.map((p) => p.condition))].sort();
  const tasks = [...new Set(pages.map((p) => p.task))].sort();
  return { round, dir, pages, conditions, tasks, scores: readJson(join(dir, 'scores.json')) };
}).filter((r) => r.pages.length);

const id = (round, task) => `${round}--${task}`.replace(/[^\w-]/g, '_');

function shot(dir, cond, task, file) {
  const p = join(dir, cond, task, file);
  if (!existsSync(p)) return `<div class="shot missing">no ${file}</div>`;
  return `<a class="shot ${file.split('.')[0]}" href="${rel(p)}" target="_blank" rel="noopener"><img src="${rel(p)}" alt="${esc(`${cond} ${task} ${file.split('.')[0]}`)}" loading="lazy"></a>`;
}

function viewRow(r, task, label, file) {
  const cols = r.conditions.map((c) => `<figure><figcaption>${esc(c)}</figcaption>${shot(r.dir, c, task, file)}</figure>`).join('');
  return `<h4>${label}</h4><div class="row ${file.split('.')[0]}" style="--n:${r.conditions.length}">${cols}</div>`;
}

function lintTable(r, task) {
  const lints = r.conditions.map((c) => readJson(join(r.dir, c, task, 'lint.json')));
  if (lints.every((l) => !l || l.error)) return '<p class="muted">No lint.json yet. Run <code>node scripts/lint.mjs</code>.</p>';
  const rows = LINT.map(([label, fn]) => {
    const vals = lints.map((l) => (l && !l.error ? fn(l) : '-'));
    const differs = new Set(vals.map(String)).size > 1;
    return `<tr${differs ? ' class="diff"' : ''}><th scope="row">${label}</th>${vals.map((v) => `<td>${esc(v)}</td>`).join('')}</tr>`;
  }).join('');
  return `<div class="scroll"><table><thead><tr><th></th>${r.conditions.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>`;
}

function scoreTable(r, task) {
  const s = r.scores?.[task];
  if (!s) return '';
  const criteria = [...new Set(r.conditions.flatMap((c) => Object.keys(s[c] ?? {})))];
  const rows = criteria.map((k) => `<tr><th scope="row">${esc(k)}</th>${r.conditions.map((c) => `<td${k === 'notes' ? ' class="notes"' : ''}>${esc(s[c]?.[k] ?? '')}</td>`).join('')}</tr>`).join('');
  return `<h4>Judge scores</h4><div class="scroll"><table class="scores"><thead><tr><th></th>${r.conditions.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>`;
}

const nav = rounds.map((r) => `<span class="grp"><b>${esc(r.round)}</b>${r.tasks.map((t) => `<a href="#${id(r.round, t)}" title="${esc(t)}">${esc(t.slice(0, 2))}</a>`).join('')}</span>`).join('');

const body = rounds.map((r) => `<section><h2>${esc(r.round)} <small>${r.conditions.map(esc).join(' vs ')}</small></h2>${r.tasks.map((t) => `
<article id="${id(r.round, t)}">
  <h3>${esc(t)}</h3>
  <p class="prompt">${esc(taskPrompt(t))}</p>
  ${viewRow(r, t, 'Desktop 1440 px', 'desktop.png')}
  ${viewRow(r, t, 'Mobile 390 px', 'mobile.png')}
  ${viewRow(r, t, 'Dark', 'dark.png')}
  <h4>Lint</h4>${lintTable(r, t)}
  ${scoreTable(r, t)}
</article>`).join('')}</section>`).join('') || '<p class="muted">No runs found. Put pages in runs/&lt;round&gt;/&lt;condition&gt;/&lt;task&gt;/index.html.</p>';

const css = `
:root{--bg:#f6f6f4;--card:#fff;--ink:#1c1c1a;--muted:#6b6b66;--line:#dcdcd7;--accent:#2f5d8a;--hl:#fff6d6;color-scheme:light dark}
@media (prefers-color-scheme:dark){:root{--bg:#141413;--card:#1d1d1b;--ink:#ececE8;--muted:#9a9a93;--line:#34342f;--accent:#8db6e0;--hl:#3a331a}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
header{position:sticky;top:0;z-index:5;background:var(--card);border-bottom:1px solid var(--line);padding:10px 16px;display:flex;gap:16px;align-items:center}
header h1{font-size:16px;margin:0;white-space:nowrap}
nav{display:flex;gap:18px;overflow-x:auto;scrollbar-width:thin;padding:2px 0}
.grp{display:flex;gap:4px;align-items:center;white-space:nowrap}
.grp b{font-size:12px;color:var(--muted);margin-right:4px;font-weight:600}
nav a{min-width:32px;text-align:center;padding:4px 8px;border:1px solid var(--line);border-radius:6px;color:var(--accent);text-decoration:none;font-size:13px;font-variant-numeric:tabular-nums}
nav a:hover,nav a:focus-visible{background:var(--accent);color:var(--card);outline:none}
main{max-width:1500px;margin:0 auto;padding:16px}
h2{font-size:22px;margin:32px 0 12px}h2 small{font-size:14px;color:var(--muted);font-weight:400;margin-left:8px}
article{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:16px;margin:0 0 24px;scroll-margin-top:64px}
h3{margin:0 0 4px;font-size:18px}h4{margin:20px 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)}
.prompt{margin:0;color:var(--muted);font-size:14px}
.row{display:grid;grid-template-columns:repeat(var(--n),minmax(0,1fr));gap:12px}
.row.mobile,.row.dark{align-items:start}
figure{margin:0;min-width:0}figcaption{font-size:13px;font-weight:600;margin-bottom:6px}
.shot{display:block;border:1px solid var(--line);border-radius:8px;overflow:auto;background:#fff}
.shot img{display:block;width:100%;height:auto}
.mobile .shot{max-height:720px;max-width:300px}
.dark .shot{max-height:720px}
.missing{padding:24px;color:var(--muted);font-size:13px;text-align:center}
.scroll{overflow-x:auto}
table{border-collapse:collapse;width:100%;font-size:14px}
th,td{text-align:left;padding:6px 10px;border-bottom:1px solid var(--line);vertical-align:top}
thead th{font-size:13px}tbody th{font-weight:500;color:var(--muted);white-space:nowrap}
td{font-variant-numeric:tabular-nums}td.notes{max-width:420px}
tr.diff td{background:var(--hl)}
.muted{color:var(--muted)}code{font-size:.9em}
@media (max-width:720px){main{padding:12px}header{padding:8px 12px;gap:10px}article{padding:12px}.row{grid-template-columns:1fr}.mobile .shot{max-width:none}}
`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Eval report</title><style>${css}</style></head><body>
<header><h1>Eval report</h1><nav aria-label="Tasks">${nav}</nav></header><main>${body}</main></body></html>`;

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'index.html'), html);
console.log(`Wrote ${join(outDir, 'index.html')}: ${rounds.length} round(s), ${rounds.reduce((n, r) => n + r.tasks.length, 0)} task card(s).`);
