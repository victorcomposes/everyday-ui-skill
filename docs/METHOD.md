# Method

This page describes the eval in full. It covers the design, each round and every known weakness. Numbers come from `runs/<round>/results.md` and `runs/<round>/scores.json`.

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

Each arm builds one page per task. That is one sample per arm per task. The page is a single `index.html` with no build step, no external images and inline data.

The exact instruction text of the `prompt` arm is not stored in this repo. That is a gap. A reproduction needs a new text, and the result may differ.

## Tasks and the held-out rule

There are two task sets.

- Development tasks 01 to 08 in `evals/tasks/`: settings, invoices table, sign-in, empty onboarding, pricing, checkout, dashboard and mobile banking. The skill author saw these and tuned the skill on them over rounds r0 to r3.
- Held-out tasks 09 to 12 in `evals/heldout/`: team members, notifications, search results and a mobile product screen. The skill author never saw these before the final round. The skill was frozen at v4 before they ran.

Tasks 09 to 12 cover a pattern the skill has a file for (`admin.md`, `notifications.md`, `search.md`, `mobile.md`). They do not copy a development task. The held-out round is the only round that tests generalisation. The development rounds measure progress on tasks the skill author studied.

The competitor pages for tasks 01 to 08 were generated once. Every round reused them unchanged. Only the `skill` arm was regenerated for each new skill version.

## Blinding

`scripts/blind.mjs` copies each page's five screenshots into `runs/<round>/blind/<task>/<label>/`. It shuffles the arm to label mapping per task with a seeded generator and writes the answer to `blind-key.json`. The seeds were 7 (r0), 11 (r1), 23 (r2), 37 (r3) and 101 (final). All four judges in a round see the same labels.

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

Four judges score each round: two Opus 5.5 and two Sonnet 5.5. Every judge scores every task and every label.

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

Skill v4 ran once on tasks 09 to 12, with no change after r3.

| Arm | Light mean | Overall |
| --- | --- | --- |
| `skill` | 8.03 | 7.88 |
| `anthropic` | 7.22 | 6.75 |
| `prompt` | 6.31 | 5.81 |
| `baseline` | 4.06 | 3.38 |

`skill` won 09, 10 and 12. It tied 11 with `anthropic` at 7.50. On typography `skill` and `anthropic` tie at 7.81. On dark mode `skill` scores 8.25, `prompt` 7.06, `baseline` 1.81 and `anthropic` 1.50.

## Caveats

1. Judge noise is about 0.5 per round. The same unchanged `anthropic` pages scored 6.94, 6.38, 6.81 and 6.94 overall across r0 to r3. Per task, the same page moved by up to 2 points between rounds. Light-mean gaps under about 0.3 are not safe to read.
2. One sample per arm per task. A second generation of the same prompt may look different. This applies most to a single task win or loss.
3. Every judge is a Claude model, the same family as the generator. Claude judges may prefer Claude-like layouts. A different family could rank the arms differently.
4. The `anthropic` arm's agent also took screenshots of its own pages. The `skill` arm does this by design through `ui-check.mjs`. The `baseline` and `prompt` arms are not known to have looked at their output.
5. Dark mode was not requested in any prompt. It is scored apart and left out of the light mean. Arms that skipped it lose the dark criterion only.
6. No human has judged the pages. Judge scores are a proxy for a designer's view.
7. Scores are relative inside a task. A strong page makes its neighbours look worse. The unchanged `baseline` arm drifted from 6.97 to 6.50 light mean over r0 to r3. That drift came from judging, because the pages did not change. Part of the growing gap to `skill` may come from this.
8. Absolute levels do not carry across rounds. Each round was judged on its own. The final round used new tasks and differently named judges, and `baseline` fell to 4.06. The data do not say whether the tasks, the judges or the pages caused it.
9. The `skill` pages hold more content. The 09 `skill` page header says 28 members. The `baseline` page lists 5. The realism and craft criteria may reward volume as well as quality.
10. A blind label hides the arm name, not the style. A judge may recognise a default look or a known skill's habits.
11. The `skill` author tuned the skill on tasks 01 to 08. The r0 to r3 curve measures fit to those tasks as well as skill quality. Only the final round is out of sample.
12. The held-out round has four tasks, one sample each. It supports a direction, not a size.
13. The `anthropic` page for 12-mobile-product scrolls inside a fixed frame, according to the judge notes. Its full-page shot then shows only the first screen, and judges marked it down for hiding content. This may understate `anthropic` on that task (5.75). I did not open the page to confirm.
14. Judges read screenshots only. They cannot see behaviour, keyboard flow or real text. The lint covers part of that.

## What would make the proof stronger

- Human judges. Ask designers to score the same blind screenshots and compare the ranking with the Claude judges.
- Three seeds or more. Generate each arm three times per task, and report the spread.
- A judge from another model family. Run the same blind kit through it.
- A brownfield test. Give each arm a real codebase with its own tokens and components, and ask for a new screen. The skill's step 1 exists for this case and no test covers it.
- Ablations per mechanism. Remove one piece at a time: the checker, the squint test, the brand step, the fixtures and the pattern files. Then measure each effect. Today the lessons in `docs/LESSONS.md` rest on round-to-round changes, which carry noise.
- A second held-out set with different screen types, and a frozen copy of the `prompt` arm's instruction text.
