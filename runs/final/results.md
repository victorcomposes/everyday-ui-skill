# Results: final

Judges: opus1, opus2, sonnet1, sonnet2. Conditions: baseline, prompt, anthropic, skill. Scores are 1 to 10, averaged across judges.

## Mean overall per condition

| condition | mean overall | light mean | wins | ties |
| --- | --- | --- | --- | --- |
| baseline | 3.38 | 4.06 | 0 | 0 |
| prompt | 5.81 | 6.31 | 0 | 0 |
| anthropic | 6.75 | 7.22 | 0 | 1 |
| skill | 7.88 | 8.03 | 3 | 1 |

Light mean: the mean of every criterion except dark mode, overall included.

## Mean per criterion

| criterion | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Hierarchy and focus on the primary job | 4.25 | 6.81 | 7.75 | 8.00 |
| Layout and spacing rhythm | 4.56 | 6.81 | 7.00 | 8.00 |
| Typography | 3.88 | 6.94 | 7.81 | 7.81 |
| Colour and contrast | 4.50 | 6.88 | 6.94 | 7.69 |
| Component craft and detail | 3.19 | 6.38 | 7.31 | 8.13 |
| State and content realism | 4.00 | 6.19 | 7.88 | 8.94 |
| Mobile quality | 4.69 | 4.63 | 6.31 | 7.81 |
| Dark mode quality | 1.81 | 7.06 | 1.50 | 8.25 |
| Overall: would a picky senior product designer ship this | 3.38 | 5.81 | 6.75 | 7.88 |

## Overall per task

| task | baseline | prompt | anthropic | skill | winner |
| --- | --- | --- | --- | --- | --- |
| 09-team-members | 4.00 | 5.75 | 6.50 | 8.00 | skill |
| 10-notifications | 3.25 | 5.00 | 7.25 | 7.75 | skill |
| 11-search-results | 3.50 | 6.00 | 7.50 | 7.50 | tie: anthropic, skill |
| 12-mobile-product | 2.75 | 6.50 | 5.75 | 8.25 | skill |

## Lint, side by side

### 09-team-members

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 1 | 0 | 0 | 0 |
| Axe moderate + minor | 1 | 0 | 0 | 0 |
| Contrast failures | 1 | 0 | 0 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 13 | 17 | 28 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 0 | 1 | 1 |
| Font families | 1 | 1 | 1 | 1 |
| Text colors | 5 | 8 | 14 | 5 |
| Smallest font | 13px | 12px | 12.5px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 10-notifications

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 8 | 0 | 6 | 0 |
| Axe moderate + minor | 0 | 0 | 2 | 0 |
| Contrast failures | 8 | 0 | 6 | 0 |
| Overflow at 390 px | no | yes, 54px | no | no |
| Tap targets under 44 px | 6 | 13 | 22 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 0 | 0 | 1 |
| Font families | 1 | 1 | 2 | 2 |
| Text colors | 6 | 4 | 14 | 4 |
| Smallest font | 12px | 12px | 11.5px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 11-search-results

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 9 | 0 | 0 | 0 |
| Axe moderate + minor | 0 | 0 | 8 | 0 |
| Contrast failures | 9 | 0 | 0 | 0 |
| Overflow at 390 px | no | yes, 73px | no | no |
| Tap targets under 44 px | 7 | 15 | 8 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 0 | 0 | 2 |
| Font families | 2 | 2 | 2 | 2 |
| Text colors | 8 | 5 | 7 | 4 |
| Smallest font | 12px | 12px | 13.5px | 12px |
| Emoji in DOM | 9 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 12-mobile-product

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 0 | 3 | 0 | 0 |
| Axe moderate + minor | 11 | 7 | 12 | 0 |
| Contrast failures | 0 | 3 | 0 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 12 | 0 | 2 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 0 | 0 | 0 |
| Font families | 1 | 2 | 1 | 2 |
| Text colors | 6 | 5 | 8 | 5 |
| Smallest font | 13.3333px | 11px | 13px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |
