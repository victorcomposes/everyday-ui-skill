// Usage: node scripts/judge-kit.mjs <runDir>
// Run after blind.mjs. Writes <runDir>/blind/JUDGE.md: the instructions a blind judge follows.
// The judge sees only the images under <runDir>/blind/ and writes <runDir>/blind/scores-<judgeName>.json.
import { existsSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { CRITERIA, BLIND_FILES } from './lib.mjs';

const runDir = process.argv[2];
if (!runDir) { console.error('Usage: node scripts/judge-kit.mjs <runDir>'); process.exit(1); }
const blind = join(runDir, 'blind');
if (!existsSync(blind)) { console.error(`No ${blind}. Run scripts/blind.mjs first.`); process.exit(1); }

const dirs = (p) => readdirSync(p).filter((n) => statSync(join(p, n)).isDirectory()).sort();
const tasks = dirs(blind).map((task) => ({ task, labels: dirs(join(blind, task)) }));
if (!tasks.length) { console.error(`${blind} holds no task folders.`); process.exit(1); }

const example = `{
  "${tasks[0].task}": {
    "${tasks[0].labels[0]}": { ${CRITERIA.map(([k]) => `"${k}": 7`).join(', ')}, "worst": "mobile-fold.png: the primary button is cut off at the right edge" }
  }
}`;

const md = `# Blind judge instructions

You judge screenshots of web pages built for the same task by different builders. You do not know who built which.

## What you may read

- Read only image files under this folder (\`blind/\`): the \`.png\` files in \`<task>/<label>/\`.
- Do not read any other file. Do not open \`blind-key.json\`, \`lint.json\`, \`lint-summary.md\`, \`results.md\`, \`scores.json\`, any \`index.html\`, or any file outside \`blind/\`. Do not list the parent folder.
- Do not read another judge's \`scores-*.json\`.
- Do not guess which label came from which builder. Judge only what you see.

## The screenshots

Each \`<task>/<label>/\` folder holds up to five images:

| File | What it shows |
|---|---|
| \`desktop-fold.png\` | Desktop 1440x900, the first screen a user sees. |
| \`desktop.png\` | Desktop 1440 px wide, full page (capped at 4000 px tall). |
| \`mobile-fold.png\` | Phone 390x844, the first screen a user sees. |
| \`mobile.png\` | Phone 390 px wide, full page. |
| \`dark.png\` | Desktop full page with the system set to dark mode. |

Look at the fold shots first. A fixed or sticky bar appears mid-page in a full-page shot but sits at the edge in a real fold, so judge such bars on the fold shots.
If a file is missing, score what you can see and say so in \`worst\`.

## Tasks and labels

${tasks.map((t) => `- \`${t.task}\`: ${t.labels.map((l) => `\`${l}\``).join(', ')}`).join('\n')}

## Scoring

For each task, score every label from 1 to 10 on each criterion. Use whole numbers. 1 is broken, 5 is mediocre, 8 is good, 10 is the best you have seen.

${CRITERIA.map(([k, text]) => `- \`${k}\`: ${text}.`).join('\n')}

Score the labels of one task against each other, and keep your scale steady across tasks. Do not give two labels the same \`overall\` unless you truly cannot separate them.

For each label, name its single worst defect in \`worst\`. Write the screenshot file where you saw it, a colon, then the defect. Example: \`desktop.png: the sidebar background ends halfway down the page\`.

## Output

Pick a judge name with letters, digits and dashes only, such as \`judge-1\`. Write \`blind/scores-<judgeName>.json\` in this shape:

\`\`\`json
{ "<task>": { "<label>": { "<criterion>": n, "overall": n, "worst": "<file>: <defect>" } } }
\`\`\`

Example, with the criterion keys exactly as written above:

\`\`\`json
${example}
\`\`\`

Every task and every label above needs an entry. Every criterion needs a whole number from 1 to 10. Write only that file.
`;

writeFileSync(join(blind, 'JUDGE.md'), md);
console.log(`Wrote ${join(blind, 'JUDGE.md')}: ${tasks.length} task(s), ${BLIND_FILES.length} image types.`);
