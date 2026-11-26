# Lessons

This page ranks what moved the scores and lists what did not. No ablation exists, so each lesson rests on a round-to-round change. Judge noise is about 0.5 per round, and several changes shipped together. Read each cause as a strong suspect, not as proof. The method is in `docs/METHOD.md`.

All numbers are light-mean scores or per-criterion means from `runs/<round>/results.md`.

## What moved scores, ranked

### 1. Fewer, non-conflicting rules (v4, round r3)

Light mean rose from 7.60 to 7.89 and task wins from 4 to 7 of 8. Layout rose 7.50 to 7.94, colour 7.19 to 7.63, mobile 7.56 to 7.94 and hierarchy 7.63 to 7.94. It was the largest rise since r1.

v4 did not add a rule. It removed rules that fought each other. The skill had asked for a cramped subtitle token, a lone overflow button, a monochrome kit and a pay button that lived only in the sidebar. Each conflicted with another rule in the skill itself. v3 had added rules and scored flat, so the lesson is that the rule set must agree with itself.

Held-out proof: v4 scored 8.03 on four tasks it had not seen. The gain did not come only from fitting tasks 01 to 08.

### 2. A brand identity step (v2, round r1)

Light mean rose from 7.28 to 7.64. Colour rose 6.88 to 7.56 and realism 7.75 to 8.25. Three weak tasks improved: 03-sign-in 6.0 to 7.5, 04-empty-onboarding 6.0 to 7.0 and 07-dashboard 6.5 to 8.5.

v1 had principles and no character. Judge notes on its sign-in page read "generic centred form" and "nothing that says whose product this is". v2 added a kit, a mark and brand moments, and gave small screens a split layout. v2 also added the `100vh` and table-overflow checks, so the rise has more than one cause. The brand step is the strongest suspect because colour and sign-in moved most.

### 3. A render-and-look loop with a code checker (v1 on)

The `skill` arm led on mobile quality from r0: 7.44 against 6.56 for `baseline` and 7.19 for `anthropic`. The gap grew. In r3 it was 7.94 against 6.88 for `anthropic`. In the final round it was 7.81 against 6.31, 4.69 and 4.63 for `anthropic`, `baseline` and `prompt`, the widest criterion gap of that round.

`ui-check.mjs` tests sideways scroll, tap targets, tables, input zoom and sticky bar height at 390 px. The independent lint agrees. In the final round the four `skill` pages have 0 tap targets under 44 px. The other arms have 2 to 28 on 11 of 12 pages.

The loop is part of v1, so no round isolates it.

### 4. Coherent fixtures and the states list (v2 and v3)

State and content realism is the `skill` arm's best criterion in every round: 7.75, 8.25, 8.38 and 8.50. Its lead over `anthropic` appeared in r1 (8.25 against 8.00) and widened to 0.63 in r2. In the final round it was 8.94 against 7.88.

One data module drives every number on the page, and the default view holds believable data. Treat this one with care. The `skill` pages also hold more content, and judges may reward volume as well as accuracy.

### 5. Measuring light mode only (a method change, from r2)

The r0 headline read 7.19 for `skill` against 6.94 for `anthropic` overall. Light mean read 7.28 against 7.54, so `anthropic` led. The first number came from dark mode, which the prompts never asked for. `anthropic` scored 2.00 on dark mode in r0 and `skill` 7.75.

A feature outside the prompt can decide a headline. The light-only rule fixed the measurement, and it shows that v1 lost on quality.

## What did not work

### Prompting for taste

The `prompt` arm got a strong "senior product designer" instruction. Its light mean was below `baseline` in r0 (6.60 against 6.97) and r1 (6.59 against 6.89). It was about equal in r2 and r3 (6.74 and 6.64 against 6.59 and 6.50). Words about taste did not give the generator a way to see or measure the page.

The `prompt` arm did beat `baseline` in the final round (6.31 against 4.06). That was because `baseline` fell. It does not show that the instruction helped.

### A concrete type scale and the squint test (v3, round r2)

v3 added exact sizes and a blurred-fold test. Typography moved 7.44 (r1), 7.50 (r2), 7.50 (r3). `anthropic` scored 7.69, 7.56 and 7.75. The `skill` arm never beat `anthropic` on typography in rounds r0 to r3 and tied it at 7.81 in the final round.

The typography gap closed from 0.94 in r0 to 0.25 in r3. Most of that came from v2 (7.06 to 7.44) and from `anthropic` scoring lower. The type scale itself added 0.06, which is inside the noise.

### Stacking rules (v3)

v3 added the type scale, the squint test and coherent fixtures. Light mean for `skill` stayed flat (7.64 to 7.60) and mean overall fell from 7.63 to 7.44. The visible gain over `anthropic` came partly from `anthropic` scoring lower on identical pages (7.43 to 7.27).

### Principles without character (v1, round r0)

v1 told the generator what good UI is. It produced clean, plain pages with no brand. It lost light mean to `anthropic` and lost sign-in and onboarding at 6.0 against 7.5.

### The sign-in screen

Sign-in is the `skill` arm's weakest task. Its scores were 6.0, 7.5, 7.0 and 6.0 across r0 to r3. `anthropic` scored 7.5, 6.0, 7.5 and 8.0. The r3 judge notes read "generic navy and blue SaaS sign-in with no distinctive idea" and "the form column floats in empty white space". The split-layout rule from v2 lifted it once, in r1, and it fell back. No version has solved it.

## Where the judges now look

By r3 the worst defects the judges named for `skill` pages were small: tiny status chips, an orphaned arrow beside a wrapped delta, a total shown twice and a detached dollar sign. In the final round they named a tiny seat meter, repeated thumbnails, a sticky bar that cuts the size grid and a floating "Mark all as read" button. These are craft defects. The structural defects of r0, the 100vh sidebar and the overflowing table, do not appear in the r3 or final notes kept in `scores.json`.

## Not checked

- The lint `100vh gap` column is non-zero on 3 of 4 `skill` pages in the final round (1, 1, 2 and 0). I did not check whether these are real gaps or a sticky `100vh` sidebar that the heuristic flags.
- No test covers an existing codebase with its own tokens and components. Step 1 of the skill exists for it.
- Whether any single mechanism matters. The ablations in `docs/METHOD.md` would answer this.
