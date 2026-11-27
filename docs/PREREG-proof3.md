# Pre-registration: round proof3

I wrote this plan before any page of round `proof3` was generated. It fixes the design, the outcomes and the analysis in advance. Any change after the first page exists goes in the deviations section below, with its date and reason.

## Question

Does skill v5 make Claude build better everyday product screens than a strong "senior product designer" prompt, on tasks the skill author never tuned on? The `prompt` arm was the strongest rival in `proof2`, so it is the primary comparison here.

## Why a new round

Tasks 09 to 16 were held out for v4. After `proof2`, I used them to develop v5. They are now development tasks for v5. The `proof2` numbers are therefore not an out-of-sample test of v5. `proof3` uses four new tasks that no version of the skill has seen.

## Skill freeze

- The skill is frozen at v5. The orchestrator adds the commit sha below at freeze time, before generation starts.
- Skill commit: `12c830e`
- Nobody edits any file under `skill/` during `proof3`.
- Before generation starts, `git diff 12c830e -- skill/` must print nothing. I record that check in `runs/proof3/freeze.txt`.

## Tasks

The round uses the four held-out tasks 17 to 20 in `evals/heldout/`, and no other task.

- An agent wrote all four without reading `skill/` or `runs/`.
- Each task is an everyday product screen that real users meet weekly. None repeats a screen type from tasks 01 to 16.
- 17 is a phone-width screen. 18 is a content-led consumer screen where imagery matters. 19 is a dense work tool. 20 has a meaningful interaction state.

| Task | Screen |
| --- | --- |
| `17-mobile-delivery-tracking` | Grocery order tracking, phone width |
| `18-series-page` | Streaming series page |
| `19-shift-rota` | Weekly shift rota for coffee shops |
| `20-photo-upload` | Photo upload with failed and pending files |

## Arms and generation

- The four arms are the briefs in `evals/arms/`: `baseline`, `prompt`, `anthropic` and `skill`. The brief text is the same as in `proof2` and stays unchanged.
- Each arm builds each task three times. Each sample comes from a fresh Claude Sonnet 5.5 agent with no shared context.
- Each page goes to `runs/proof3/<arm>/<task>-s<n>/index.html`, with `n` from 1 to 3. `{OUT_DIR}` takes that folder.
- That gives 4 tasks times 4 arms times 3 samples, which is 48 pages.
- If an agent fails to write a page, a fresh agent runs the same brief once more. If that agent also fails, the page counts as missing. I report every missing page and every rerun.
- I do not add samples, drop samples or rerun a finished page after I see any score.

## Screenshots and lint

`scripts/shoot.mjs` takes the five screenshots per page described in `docs/METHOD.md`. `scripts/lint.mjs` writes the lint metrics per page. Both scripts stay unchanged during the round, except to read the new folder layout.

## Judges

Judging follows `proof2` exactly, except for the label order rule at the end of this list.

- A group is one task and one sample number, for example task 18, sample 2. It holds the four arms' pages for that sample. There are 12 groups.
- Each task gets four judges: two Opus 5.5 and two Sonnet 5.5. That makes 16 judge agents.
- Each judge scores the three groups of one task. That is 12 pages per judge.
- The arm to label mapping is shuffled for each group with a seeded generator. I store the key in `blind-key.json` and do not show it to any judge.
- Judges use the rubric of `docs/METHOD.md`: nine criteria, whole numbers from 1 to 10, and one worst defect per label. `overall` is scored on light mode only.
- The judge must not reward a page for holding more content. More rows, cards or sections earn nothing by themselves.
- Each judge reads only the screenshots and its judge file.
- Two of the four judges per task view the labels in reverse order. One of them is an Opus judge and one is a Sonnet judge. This spreads any order effect evenly across the arms and across both model families.

## Primary outcome

1. For each page, the light score is the mean over judges of every criterion except dark mode, `overall` included.
2. For each group, the difference is the `skill` light score minus the `prompt` light score.
3. The point estimate is the mean of the 12 group differences.
4. The 95% interval comes from a hierarchical bootstrap. Each draw resamples the 4 tasks with replacement. It then resamples the 3 samples within each drawn task with replacement. It takes the mean difference of that draw.
5. The bootstrap runs 10,000 draws with seed 2026. The interval is the 2.5th to 97.5th percentile of the draws.

**H1:** the point estimate is above 0, and the 95% interval excludes 0.

If the interval includes 0, I report the result as not supporting H1. If the estimate is below 0 and the interval excludes 0, I report that the skill lost.

## Secondary outcomes

These describe the result. None of them can replace the primary outcome.

- The same difference and interval for `skill` minus `anthropic` and `skill` minus `baseline`.
- The share of the 12 groups the skill wins. A win means the highest light score of the four arms. I report ties apart.
- The mean light score per task and arm, with the spread across the three samples.
- Per judge family: whether the sign of the primary difference holds for the two Opus judges alone and for the two Sonnet judges alone.
- The lint metrics per arm, averaged over all pages.
- Blind human pairwise votes, if any are collected. I report how many votes there were and who cast them.

## Analysis code

`scripts/stats.mjs` computes every number above from `scores.json`. Its output is the only source for the reported figures.

## Commitment

I report every result of this round. That includes losses, ties and a null result. The README and `docs/METHOD.md` get the `proof3` result whichever way it falls.

## Known limits that remain

- Every judge is a Claude model, the same family as the generator.
- Judges see screenshots only. They cannot test behaviour, keyboard flow or screen readers.
- Four tasks is a very small set. The task level of the bootstrap has few distinct draws, so the interval is coarse. One task can swing the result.
- A blind label hides the arm name, not the style. A judge may recognise a known look.
- `baseline` gets no look tool by design. Its gap to the other arms mixes instructions with the ability to see the page.
- I chose `prompt` as the primary rival after seeing `proof2`. That choice is fixed now, before any `proof3` page exists.

## Deviations

None yet.

## Operational preamble

As in `proof2`, every generator agent gets one line before its arm brief. The line names the working folder, forbids the Skill tool and forbids commits. It is the same for all four arms.
