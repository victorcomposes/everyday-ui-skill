# Method

This page describes the eval in full. It covers the design, each round and every known weakness. Numbers come from `runs/<round>/results.md` and `runs/<round>/scores.json`.

The current result is round [`proof2`](#proof2-skill-v4-pre-registered), pre-registered in `docs/PREREG.md`. The skill lost it. Rounds r0 to final came first. Their headline is superseded.

## Question

Does a design skill make Claude build better everyday product screens than the alternatives do? "Better" means a blind judge, who sees only screenshots, scores the page higher.

The design follows `docs/research/gap-analysis.md`. That note asked for three comparison arms, a frozen held-out set, shuffled blind judging, pixels only and published losses.

## Arms

All arms use the same generator, Claude Sonnet 5.5, and the same output contract in `evals/RULES.md`.

| Arm | What the generator gets |
| --- | --- |
| `baseline` | The task prompt only. |
| `prompt` | The task prompt and a strong "senior product designer" instruction. |
| `anthropic` | The task prompt and Anthropic's public frontend-design skill. |
| `skill` | The task prompt and this repo's `everyday-ui` skill. |

In rounds r0 to final, each arm built one page per task. In `proof2`, each arm built three. The page is a single `index.html` with no build step, no external images and inline data.

Rounds r0 to final did not store the exact `prompt` instruction text. From `proof2` on, every arm brief is frozen in `evals/arms/`.

## Tasks and the held-out rule

There are two task sets.

- Development tasks 01 to 08 in `evals/tasks/`: settings, invoices table, sign-in, empty onboarding, pricing, checkout, dashboard and mobile banking. The skill author saw these and tuned the skill on them over rounds r0 to r3.
- Held-out tasks 09 to 12 in `evals/heldout/`: team members, notifications, search results and a mobile product screen. The skill author never saw these before the final round. The skill was frozen at v4 before they ran.
- Held-out tasks 13 to 16, added for `proof2`: expense report, support conversation, mobile booking and stock levels. An agent wrote them without reading `skill/` or `runs/`.

Tasks 09 to 12 cover a pattern the skill has a file for (`admin.md`, `notifications.md`, `search.md`, `mobile.md`). They do not copy a development task. The held-out round is the only round that tests generalisation. The development rounds measure progress on tasks the skill author studied.

The competitor pages for tasks 01 to 08 were generated once. Every round reused them unchanged. Only the `skill` arm was regenerated for each new skill version.

## Blinding

`scripts/blind.mjs` copies each page's five screenshots into `runs/<round>/blind/<task>/<label>/`. It shuffles the arm to label mapping per task with a seeded generator and writes the answer to `blind-key.json`. The seeds were 7 (r0), 11 (r1), 23 (r2), 37 (r3), 101 (final) and 2026 (`proof2`, shuffled per group). All judges in a round see the same labels.

The judge sees five images per page:

| File | View |
| --- | --- |
| `desktop-fold.png` | 1440x900, the first screen |
| `desktop.png` | 1440 px wide, full page, capped at 4000 px |
| `mobile-fold.png` | 390x844 at 2x, the first screen |
| `mobile.png` | 390 px wide, full page |
| `dark.png` | desktop full page with the system set to dark |

Fold shots exist because a sticky bar sits mid-page in a full-page shot.

`blind/JUDGE.md` tells each judge to read only those images and nothing else. No script enforces this. Compliance rests on the judge agents following the instructions.

## Judges and rubric

Four judges score each round: two Opus 5.5 and two Sonnet 5.5. Every judge scores every task and every label. `proof2` used four judges per task instead, 32 in all.

Each label gets a whole number from 1 to 10 on nine criteria. 1 is broken, 5 is mediocre, 8 is good and 10 is the best the judge has seen.

1. Hierarchy and focus on the primary job
2. Layout and spacing rhythm
3. Typography
4. Colour and contrast
5. Component craft and detail
6. State and content realism
7. Mobile quality
8. Dark mode quality
9. Overall: would a picky senior product designer ship this

The judge also names the single worst defect per label, with the screenshot file where it showed. `scripts/unblind.mjs` averages the four judges and writes `scores.json` (with the worst-defect notes) and `results.md`.

Three summaries appear in `results.md`:

- Mean overall: the mean of the `overall` criterion.
- Light mean: the mean of every criterion except dark mode, `overall` included.
- Wins: per task, the arm with the highest mean `overall`. Equal scores count as ties.

## The light-only rule change

In r0 and r1, `overall` took dark mode into account. Several arms built no dark mode, because the prompts did not ask for one. Their `overall` may have dropped for that reason, and the comparison would then measure an unrequested feature.

The change, in commit `be52adb`, tells the judge to score `overall` on light mode only. Dark mode keeps its own criterion. It applies from r2 on.

Two things follow.

- Light mean replaces mean overall as the headline number. It leaves out the dark criterion for every round, including r0 and r1.
- The `overall` scores in r0 and r1 may still carry some dark mode effect. I recomputed the mean of the seven light criteria without `overall` from `scores.json`. The order of `skill` and `anthropic` stays the same in every round:

| Round | `skill` | `anthropic` | `prompt` | `baseline` |
| --- | --- | --- | --- | --- |
| r0 | 7.29 | 7.63 | 6.74 | 7.00 |
| r1 | 7.64 | 7.58 | 6.78 | 6.93 |
| r2 | 7.63 | 7.33 | 6.84 | 6.71 |
| r3 | 7.89 | 7.46 | 6.74 | 6.62 |
| final | 8.05 | 7.29 | 6.38 | 4.15 |

In r1 the gap shrinks from 0.21 to 0.06. A reader who distrusts the `overall` score of r1 should read r1 as a tie.

## Mechanical lint

`scripts/lint.mjs` measures each page in a real browser. It writes `lint.json` beside the screenshots and `lint-summary.md` for the round. It does not use the judges. `results.md` shows the numbers beside the scores.

| Check | Viewport | What it counts |
| --- | --- | --- |
| Axe critical, serious, moderate and minor | 1440 | Failing nodes by impact |
| Contrast failures | 1440 | Axe colour-contrast nodes |
| Overflow | 390 | Sideways scroll, with pixels |
| Tap targets under 44 px | 390 | Links and controls that are too small |
| Fixed or sticky over 15% of the screen | 390x844 | Bars that cover too much of the phone |
| 100vh gap | 1440 | A 900 px box with a background in a page taller than 1000 px |
| Font families | 1440 | First family of each text element |
| Text colours | 1440 | Distinct computed text colours |
| Smallest font | 1440 | In px |
| Emoji | 1440 | Emoji in the DOM |
| Images without `alt` | 1440 | `alt=""` is allowed |
| Visible focus style | 1440 | Whether focus shows a ring |

In the final round the `skill` pages have 0 tap targets under 44 px on all four tasks. The other arms have 2 to 28 on 11 of their 12 pages. Two `prompt` pages overflow sideways at 390 px. No other page does.

## Rounds

Each round judged the pages first. The skill was then revised from the judges' notes and the lint output, and the next round ran the new version.

| Round | Skill | Light mean `skill` / `anthropic` | Mean overall `skill` / `anthropic` | Wins `skill` / `anthropic` / ties |
| --- | --- | --- | --- | --- |
| r0 | v1 | 7.28 / 7.54 | 7.19 / 6.94 | 3 / 1 / 4 |
| r1 | v2 | 7.64 / 7.43 | 7.63 / 6.38 | 5 / 1 / 1 |
| r2 | v3 | 7.60 / 7.27 | 7.44 / 6.81 | 4 / 2 / 2 |
| r3 | v4 | 7.89 / 7.39 | 7.88 / 6.94 | 7 / 1 / 0 |
| final | v4 | 8.03 / 7.22 | 7.88 / 6.75 | 3 / 0 / 1 |

The last column counts tasks won by `skill`, tasks won by `anthropic`, and tasks where the top score was shared. A tie may not involve `skill`. In r1, `baseline` won 04-empty-onboarding. No other round gave `baseline` or `prompt` an outright win.

### r0, skill v1

v1 held design principles, 17 pattern files and a checker. It lost to `anthropic` on light mean (7.28 against 7.54). It lost 03-sign-in and 04-empty-onboarding at 6.0 each, where `baseline` and `anthropic` scored 7.5. Judge notes call these pages a generic centred form with no brand presence. v1 overcorrected into a bland, unbranded look.

It also left a 100vh sidebar that ends halfway down the page on 07-dashboard, and an invoices table that overflows at 390 px on 01-settings.

### r1, skill v2

v2 added a brand identity step, split layouts for small-content screens, and checks for `100vh` backgrounds and table overflow. Light mean rose to 7.64. The `skill` arm won 5 of 8 tasks. It lost 02-invoices-table to `anthropic` (6.0 against 7.0).

### r2, skill v3

v3 added a concrete type scale, a squint test (a blurred fold screenshot) and coherent fixtures, where every number derives from one data module. Light mean stayed flat for `skill` (7.64 to 7.60). The gap to `anthropic` grew from 0.21 to 0.33, and the `anthropic` score fell from 7.43 to 7.27 with identical pages. It lost 03-sign-in and 07-dashboard.

### r3, skill v4

v4 simplified the skill. It removed rule conflicts the skill itself caused: a cramped subtitle token, a lone overflow button, a monochrome kit and a pay button that lived only in the sidebar. Light mean rose to 7.89 and `skill` won 7 of 8 tasks. It lost 03-sign-in (6.0 against 8.0). Typography still trailed (7.50 against 7.75).

### final, skill v4, held-out tasks

Superseded by `proof2`, which re-ran these tasks with three samples. Skill v4 ran once on tasks 09 to 12, with no change after r3.

| Arm | Light mean | Overall |
| --- | --- | --- |
| `skill` | 8.03 | 7.88 |
| `anthropic` | 7.22 | 6.75 |
| `prompt` | 6.31 | 5.81 |
| `baseline` | 4.06 | 3.38 |

`skill` won 09, 10 and 12. It tied 11 with `anthropic` at 7.50. On typography `skill` and `anthropic` tie at 7.81. On dark mode `skill` scores 8.25, `prompt` 7.06, `baseline` 1.81 and `anthropic` 1.50.

## proof2, skill v4, pre-registered

This is the current result. The skill lost.

### Design

- I wrote the plan in `docs/PREREG.md` and committed it in `60bf969`, before any page existed. The same commit froze the arm briefs, tasks 13 to 16 and `scripts/stats.mjs`. The scripts that produce the scores, the briefs and `evals/RULES.md` have not changed since.
- `runs/proof2/freeze.txt` records that `git diff 586d204 -- skill/` printed nothing at 2026-11-27T04:50:34Z. The skill was v4.
- 8 held-out tasks (09 to 16), 4 arms, 3 samples each: 96 pages. A fresh Claude Sonnet 5.5 agent built each page from its arm brief in `evals/arms/`.
- `prompt`, `anthropic` and `skill` got the same screenshot tool, `node scripts/peek.mjs <dir>`. `baseline` got none. The `skill` arm could also run its own checker.
- A group is one task and one sample number. There are 24. Labels were shuffled per group, seed 2026.
- 32 judge agents: 2 Opus 5.5 and 2 Sonnet 5.5 per task. Each judge scored the three groups of one task, 12 pages.
- The rubric is the one above, with one new rule: the judge must not reward a page for holding more content.
- Primary outcome: the mean over 24 groups of `skill` light mean minus `anthropic` light mean. The 95% CI comes from a hierarchical bootstrap: tasks resampled, then samples within each task, 10,000 draws, seed 2026.

### Deviations and run issues

The design, outcomes and analysis did not change after the first page. These issues remain:

- All 96 pages exist, so no page counts as missing. The repo holds no record of reruns.
- One skill sample, 12 mobile product sample 1, did not run the skill's checker. The brief asks for it. The page is scored, because the plan forbids dropping pages.
- Generators were told not to use the Skill tool. The plan says to add nothing to the brief, so this is a deviation. It applied to every arm. The `skill` arm read `SKILL.md` as a file, as its brief says.
- Generator agents may have run with a user-level "ponytail" (minimal-code) output style. One agent report mentions it. If present, it applied to all arms equally.
- No human votes were collected.

### Results

| arm | light mean | `skill` minus this arm [95% CI] |
| --- | --- | --- |
| `prompt` | 7.80 | -1.38 [-1.72, -1.05] |
| `anthropic` | 7.39 | -0.98 [-1.37, -0.50] |
| `skill` | 6.42 | |
| `baseline` | 6.19 | +0.22 [-0.41, +0.83] |

- H1 is rejected, in the opposite direction. The estimate is below 0 and the interval excludes 0.
- `skill` had the strictly highest light mean in 0 of 24 groups, with no ties.
- Both judge families agree on the sign. `skill` minus `anthropic` is -0.72 [-1.15, -0.20] for the Opus judges and -1.24 [-1.62, -0.78] for the Sonnet judges.
- `skill` scored below `prompt` and `anthropic` on every light criterion, mobile quality included (6.21 against 7.17 and 6.91).
- On the lint, `skill` led every arm. Per-page means: axe serious + critical 0.00 against 1.50 to 3.71, contrast failures 0.00 (`prompt` also 0.00), tap targets under 44 px 0.9 against 19.7 to 28.4. No `skill` page scrolls sideways at 390 px. Three `baseline` pages do.
- Per-task means and sample ranges are in `runs/proof2/stats.md`. Judge notes per page are in `runs/proof2/scores.json`.

`runs/proof2/results.md` prints 7.40 for `anthropic`. It averages rounded criterion means. `stats.md` prints 7.39 and is the source the plan names.

### Checks

- All 480 blind images (96 labels, 5 shots each) match their source page's screenshots by md5, under the mapping in `blind-key.json`.
- I recomputed the arm light means directly from the 32 raw judge files in `runs/proof2/blind/`. They match `stats.json` to three decimals: 6.194, 7.799, 7.393 and 6.417.

### Same tasks, two rounds

Tasks 09 to 12 ran in both the final round and `proof2`, with the same frozen skill. Light mean on those four tasks:

| arm | final (1 sample) | `proof2` (3 samples) |
| --- | --- | --- |
| `skill` | 8.03 | 6.37 |
| `anthropic` | 7.22 | 7.39 |
| `prompt` | 6.31 | 7.92 |
| `baseline` | 4.06 | 6.18 |

What changed: `prompt` gained the screenshot tool, judges got the no-more-content rule, and each arm had three samples. The following is interpretation, not proof.

- `prompt` passed `anthropic` once it could see its page. The earlier `skill` win likely came mostly from its look loop, not its rules.
- `skill` fell 1.66 with no change to the skill. The no-more-content rule may have removed a volume advantage (caveat 9). A single lucky sample in the final round may also explain part of it.
- `baseline` rose 2.12 with no new tool. Absolute levels move between rounds (caveat 8), so none of these shifts is a clean effect.

Recurring judge notes on `skill` pages: primary buttons look enabled before a required choice. The primary job is buried on phones. Dead gaps. Identical repeated icons. Plain, low-brand visuals next to illustrated competitors.

### Next

Skill v5 is being built from these notes. It will run as round `proof3` on 4 new held-out tasks, under a new pre-registration.

## Caveats

Caveats 1 to 14 were written for rounds r0 to final. Notes in brackets say how `proof2` changed them.

1. Judge noise is about 0.5 per round. The same unchanged `anthropic` pages scored 6.94, 6.38, 6.81 and 6.94 overall across r0 to r3. Per task, the same page moved by up to 2 points between rounds. Light-mean gaps under about 0.3 are not safe to read.
2. One sample per arm per task. A second generation of the same prompt may look different. This applies most to a single task win or loss. (`proof2` used three samples.)
3. Every judge is a Claude model, the same family as the generator. Claude judges may prefer Claude-like layouts. A different family could rank the arms differently.
4. The `anthropic` arm's agent also took screenshots of its own pages. The `skill` arm does this by design through `ui-check.mjs`. The `baseline` and `prompt` arms are not known to have looked at their output. (In `proof2`, `prompt`, `anthropic` and `skill` had the same screenshot tool.)
5. Dark mode was not requested in any prompt. It is scored apart and left out of the light mean. Arms that skipped it lose the dark criterion only.
6. No human has judged the pages. Judge scores are a proxy for a designer's view.
7. Scores are relative inside a task. A strong page makes its neighbours look worse. The unchanged `baseline` arm drifted from 6.97 to 6.50 light mean over r0 to r3. That drift came from judging, because the pages did not change. Part of the growing gap to `skill` may come from this.
8. Absolute levels do not carry across rounds. Each round was judged on its own. The final round used new tasks and differently named judges, and `baseline` fell to 4.06. The data do not say whether the tasks, the judges or the pages caused it.
9. The `skill` pages hold more content. The 09 `skill` page header says 28 members. The `baseline` page lists 5. The realism and craft criteria may reward volume as well as quality. (`proof2` told judges not to reward more content.)
10. A blind label hides the arm name, not the style. A judge may recognise a default look or a known skill's habits.
11. The `skill` author tuned the skill on tasks 01 to 08. The r0 to r3 curve measures fit to those tasks as well as skill quality. Only the final round is out of sample.
12. The held-out round has four tasks, one sample each. It supports a direction, not a size. (`proof2` re-ran those tasks with three samples, and the direction reversed.)
13. The `anthropic` page for 12-mobile-product scrolls inside a fixed frame, according to the judge notes. Its full-page shot then shows only the first screen, and judges marked it down for hiding content. This may understate `anthropic` on that task (5.75). I did not open the page to confirm.
14. Judges read screenshots only. They cannot see behaviour, keyboard flow or real text. The lint covers part of that.

## What would make the proof stronger

Status after `proof2`:

- Done: three samples per arm per task. `proof2` used three and reports the spread.
- Done: a second held-out set and a frozen `prompt` text. Tasks 13 to 16 were added, and `evals/arms/` holds every brief.
- Done: the same look tool for every instructed arm (caveat 4).
- Done: a judge rule against rewarding volume (caveat 9).
- Done: a pre-registration with a fixed primary outcome and analysis code.
- Open: human judges. Ask designers to score the same blind screenshots and compare the ranking with the Claude judges.
- Open: a judge from another model family. Run the same blind kit through it.
- Open: a brownfield test. Give each arm a real codebase with its own tokens and components, and ask for a new screen. The skill's step 1 exists for this case and no test covers it.
- Open: ablations per mechanism. `proof2` suggests the look loop matters more than the rules. Remove one piece at a time and measure each effect.
