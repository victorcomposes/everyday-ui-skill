# Pre-registration: round proof2

I wrote this plan before any page of round `proof2` was generated. It fixes the design, the outcomes and the analysis in advance. Any change after the first page exists goes in the deviations section below, with its date and reason.

## Question

Does skill v4 make Claude build better everyday product screens than Anthropic's frontend-design skill, on tasks the skill author never tuned on? Round `proof2` adds samples, tasks and controls that the final round lacked.

## Skill freeze

- The skill is frozen at v4. Its files are those of commit `586d204` under `skill/everyday-ui/`.
- Nobody edits any file under `skill/` during `proof2`.
- Before generation starts, `git diff 586d204 -- skill/` must print nothing. I record that check in `runs/proof2/freeze.txt`.

## Tasks

The round uses the eight held-out tasks 09 to 16 in `evals/heldout/`.

- Tasks 09 to 12 ran once in the final round. The skill has not changed since, so they stay out of sample for v4.
- Tasks 13 to 16 are new. An agent wrote them without reading `skill/` or `runs/`.
- The task set includes two phone-width screens (12, 15), two dense form or data screens (13, 16) and two screens with an interaction state (14, 15).

## Arms and generation

- The four arms are the briefs in `evals/arms/`: `baseline`, `prompt`, `anthropic` and `skill`. The brief text is frozen and stored in this repo.
- Each arm builds each task three times. Each sample comes from a fresh Claude Sonnet 5.5 agent with no shared context.
- Each page goes to `runs/proof2/<arm>/<task>-s<n>/index.html`, with `n` from 1 to 3.
- That gives 8 tasks times 4 arms times 3 samples, which is 96 pages.
- If an agent fails to write a page, a fresh agent runs the same brief once more. If that agent also fails, the page counts as missing. I report every missing page and every rerun.
- I do not add samples, drop samples or rerun a finished page after I see any score.

## Screenshots and lint

`scripts/shoot.mjs` takes the five screenshots per page described in `docs/METHOD.md`. `scripts/lint.mjs` writes the lint metrics per page. Both scripts stay unchanged during the round, except to read the new folder layout.

## Judges

- A group is one task and one sample number, for example task 13, sample 2. It holds the four arms' pages for that sample. There are 24 groups.
- Each task gets four judges: two Opus 5.5 and two Sonnet 5.5. That makes 32 judge agents.
- Each judge scores the three groups of one task. That is 12 pages per judge.
- The arm to label mapping is shuffled for each group with a seeded generator. I store the key in `blind-key.json` and do not show it to any judge.
- Judges use the rubric of `docs/METHOD.md`: nine criteria, whole numbers from 1 to 10, and one worst defect per label. `overall` is scored on light mode only.
- One rule is new. The judge must not reward a page for holding more content. More rows, cards or sections earn nothing by themselves.
- Each judge reads only the screenshots and its judge file.

## Primary outcome

1. For each page, the light score is the mean over judges of every criterion except dark mode, `overall` included.
2. For each group, the difference is the `skill` light score minus the `anthropic` light score.
3. The point estimate is the mean of the 24 group differences.
4. The 95% interval comes from a hierarchical bootstrap. Each draw resamples the 8 tasks with replacement. It then resamples the 3 samples within each drawn task with replacement. It takes the mean difference of that draw.
5. The bootstrap runs 10,000 draws with seed 2026. The interval is the 2.5th to 97.5th percentile of the draws.

**H1:** the point estimate is above 0, and the 95% interval excludes 0.

If the interval includes 0, I report the result as not supporting H1. If the estimate is below 0 and the interval excludes 0, I report that the skill lost.

## Secondary outcomes

These describe the result. None of them can replace the primary outcome.

- The same difference and interval for `skill` minus `prompt` and `skill` minus `baseline`.
- The share of the 24 groups the skill wins. A win means the highest light score of the four arms. I report ties apart.
- The mean light score per task and arm, with the spread across the three samples.
- Whether the sign of the primary difference holds for the two Opus judges alone and for the two Sonnet judges alone.
- The lint metrics per arm, averaged over all pages.
- Blind human pairwise votes, if any are collected. I report how many votes there were and who cast them.

## Analysis code

`scripts/stats.mjs` computes every number above from `scores.json`. Its output is the only source for the reported figures.

## Commitment

I report every result of this round. That includes losses, ties and a null result. The README and `docs/METHOD.md` get the `proof2` result whichever way it falls.

## Known limits that remain

- Every judge is a Claude model, the same family as the generator.
- Judges see screenshots only. They cannot test behaviour, keyboard flow or screen readers.
- Eight tasks is a small set. The interval reflects that, but the task choice may still favour one arm.
- A blind label hides the arm name, not the style. A judge may recognise a known look.
- `baseline` gets no look tool by design. Its gap to the other arms mixes instructions with the ability to see the page.

## Deviations

None yet.
