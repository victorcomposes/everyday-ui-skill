# Stats: proof2

Light mean per group: the mean of every criterion except dark, overall included. Tasks count equally. Seed 2026, 10000 bootstrap draws.

## Arm means

| arm | light mean |
| --- | --- |
| baseline | 6.19 |
| prompt | 7.80 |
| anthropic | 7.39 |
| skill | 6.42 |

## skill minus each arm

Mean difference with a 95% CI from a hierarchical bootstrap: tasks resampled, then samples within each task.

| arm | difference [95% CI] | tasks | groups |
| --- | --- | --- | --- |
| baseline | +0.22 [-0.41, +0.83] | 8 | 24 |
| prompt | -1.38 [-1.72, -1.05] | 8 | 24 |
| anthropic | -0.98 [-1.37, -0.50] | 8 | 24 |

## skill against the best arm, per group

| wins | ties | losses | groups |
| --- | --- | --- | --- |
| 0 | 0 | 24 | 24 |

A win is the strictly highest light mean. A tie shares the highest. A loss means another arm is higher.

## Per task: mean (min-max across samples)

| task | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| 09-team-members | 5.53 (5.44-5.59) | 7.92 (7.88-7.97) | 7.44 (7.19-7.59) | 6.63 (6.38-6.81) |
| 10-notifications | 6.22 (6.03-6.53) | 7.71 (7.69-7.72) | 7.80 (7.75-7.91) | 6.45 (6.06-6.75) |
| 11-search-results | 6.69 (6.38-7.06) | 7.95 (7.72-8.16) | 7.08 (6.66-7.47) | 5.77 (5.59-6.09) |
| 12-mobile-product | 6.27 (5.91-6.84) | 8.13 (7.88-8.28) | 7.23 (6.56-7.81) | 6.63 (5.91-7.50) |
| 13-expense-report | 7.09 (6.59-7.81) | 7.31 (6.44-7.88) | 7.49 (7.09-7.75) | 6.13 (5.88-6.47) |
| 14-support-conversation | 5.93 (5.72-6.16) | 8.15 (7.81-8.34) | 6.97 (6.47-7.28) | 7.30 (6.88-7.66) |
| 15-mobile-booking | 5.34 (5.31-5.38) | 7.57 (6.84-8.03) | 7.66 (7.44-7.97) | 6.41 (6.31-6.59) |
| 16-stock-levels | 6.48 (6.31-6.69) | 7.67 (7.41-8.00) | 7.48 (7.25-7.81) | 6.00 (5.84-6.22) |

## skill minus anthropic, by judge family

| family | judges | difference [95% CI] | tasks | groups |
| --- | --- | --- | --- | --- |
| opus | opus1, opus2 | -0.72 [-1.15, -0.20] | 8 | 24 |
| sonnet | sonnet1, sonnet2 | -1.24 [-1.62, -0.78] | 8 | 24 |

