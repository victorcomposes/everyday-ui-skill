// Usage: node scripts/judge-kit.mjs <runDir> [--per-task]
// Run after blind.mjs. Writes <runDir>/blind/JUDGE.md: the instructions a blind judge follows, listing every group.
// A group is a folder under blind/: a task, or <task>-s<n> in a round with several samples per task.
// The judge sees only the images under <runDir>/blind/ and writes <runDir>/blind/scores-<judgeName>.json.
// With --per-task it also writes <runDir>/blind/JUDGE-<task>.md for each task, listing only that task's groups
// (<task>-s1, -s2, ...). That judge writes <runDir>/blind/scores-<task>-<judgeName>.json with only those groups.
// Name each judge opus<...> or sonnet<...>: unblind.mjs reads the model family from the name.
import { existsSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { CRITERIA, BLIND_FILES, taskOf } from './lib.mjs';

const args = process.argv.slice(2);
const perTask = args.includes('--per-task');
const runDir = args.find((a) => !a.startsWith('--'));
if (!runDir) { console.error('Usage: node scripts/judge-kit.mjs <runDir> [--per-task]'); process.exit(1); }
const blind = join(runDir, 'blind');
if (!existsSync(blind)) { console.error(`No ${blind}. Run scripts/blind.mjs first.`); process.exit(1); }

const dirs = (p) => readdirSync(p).filter((n) => statSync(join(p, n)).isDirectory()).sort();
const groups = dirs(blind).map((group) => ({ group, labels: dirs(join(blind, group)) }));
if (!groups.length) { console.error(`${blind} holds no group folders.`); process.exit(1); }

/** The judge text for these groups. only: the task name for a per-task file, else null. */
function kit(groups, only) {
  const example = `{
  "${groups[0].group}": {
    "${groups[0].labels[0]}": { ${CRITERIA.map(([k]) => `"${k}": 7`).join(', ')}, "seen": ["desktop-fold.png", "desktop.png", "mobile-fold.png", "mobile.png", "dark.png"], "worst": "mobile-fold.png: the primary button is cut off at the right edge" }
  }
}`;
  const scope = only ? ` You judge only the groups of task \`${only}\`. Do not open any other folder.` : '';
  const write = only
    ? `Write \`blind/scores-${only}-<judgeName>.json\`, holding only the groups listed above, in this shape:`
    : 'Write `blind/scores-<judgeName>.json` in this shape:';

  return `# Blind judge instructions

You judge screenshots of web pages built for the same task by different builders. You do not know who built which.

## What you may read

- Read only image files under this folder (\`blind/\`): the \`.png\` files in \`<group>/<label>/\`.
- Do not read any other file. Do not open \`blind-key.json\`, \`lint.json\`, \`lint-summary.md\`, \`results.md\`, \`scores.json\`, any \`index.html\`, or any file outside \`blind/\`. Do not list the parent folder.
- Do not read another judge's \`scores-*.json\`.
- Do not guess which label came from which builder. Judge only what you see.

## The screenshots

Each \`<group>/<label>/\` folder holds up to five images:

| File | What it shows |
|---|---|
| \`desktop-fold.png\` | Desktop 1440x900, the first screen a user sees. |
| \`desktop.png\` | Desktop 1440 px wide, full page (capped at 4000 px tall). |
| \`mobile-fold.png\` | Phone 390x844, the first screen a user sees. |
| \`mobile.png\` | Phone 390 px wide, full page. |
| \`dark.png\` | Desktop full page with the system set to dark mode. |

Look at the fold shots first. A fixed or sticky bar appears mid-page in a full-page shot but sits at the edge in a real fold, so judge such bars on the fold shots.
Open every one of the 5 images for every label before you score that label. Do not skip \`mobile.png\` or any other file.
If a file is truly missing from the folder, score what you can see, say so in \`worst\`, and leave it out of \`seen\`.

## Groups and labels

Each group is a folder. Score the labels of a group against each other only.${scope}

${groups.map((t) => `- \`${t.group}\`: ${t.labels.map((l) => `\`${l}\``).join(', ')}`).join('\n')}

## Scoring

For each group, score every label from 1 to 10 on each criterion. Use whole numbers. 1 is broken, 5 is mediocre, 8 is good, 10 is the best you have seen.

${CRITERIA.map(([k, text]) => `- \`${k}\`: ${text}.`).join('\n')}

**Light mode only for \`overall\`.** Judge \`overall\` on the light-mode design only: \`desktop-fold.png\`, \`desktop.png\`, \`mobile-fold.png\` and \`mobile.png\`. Dark mode has its own criterion, \`dark\`. Look at \`dark.png\` only for \`dark\`. Dark mode must not change \`overall\` or any other criterion.

Do not reward a page for holding more content. Judge the quality of what is there.

Score the labels of one group against each other, and keep your scale steady across groups. Do not give two labels the same \`overall\` unless you truly cannot separate them.

For each label, name its single worst defect in \`worst\`. Write the screenshot file where you saw it, a colon, then the defect. Example: \`desktop.png: the sidebar background ends halfway down the page\`.

## Output

Pick a judge name with letters, digits and dashes only. It must start with \`opus\` or \`sonnet\`, for your model family, such as \`opus1\`. ${write}

\`\`\`json
{ "<group>": { "<label>": { "<criterion>": n, "overall": n, "seen": ["<file name>", ...], "worst": "<file>: <defect>" } } }
\`\`\`

Example, with the criterion keys exactly as written above:

\`\`\`json
${example}
\`\`\`

Every group and every label above needs an entry. Every criterion needs a whole number from 1 to 10. Every label needs \`"seen"\`: the list of image file names you opened for that label. Write only that file.
`;
}

writeFileSync(join(blind, 'JUDGE.md'), kit(groups, null));
console.log(`Wrote ${join(blind, 'JUDGE.md')}: ${groups.length} group(s), ${BLIND_FILES.length} image types.`);
if (perTask) {
  for (const task of [...new Set(groups.map((g) => taskOf(g.group)))]) {
    const mine = groups.filter((g) => taskOf(g.group) === task);
    writeFileSync(join(blind, `JUDGE-${task}.md`), kit(mine, task));
    console.log(`Wrote ${join(blind, `JUDGE-${task}.md`)}: ${mine.map((g) => g.group).join(', ')}`);
  }
}
