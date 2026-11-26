# Results: r3

Judges: opusA, opusB, sonnetA, sonnetB. Conditions: baseline, prompt, anthropic, skill. Scores are 1 to 10, averaged across judges.

## Mean overall per condition

| condition | mean overall | light mean | wins | ties |
| --- | --- | --- | --- | --- |
| baseline | 5.63 | 6.50 | 0 | 0 |
| prompt | 5.94 | 6.64 | 0 | 0 |
| anthropic | 6.94 | 7.39 | 1 | 0 |
| skill | 7.88 | 7.89 | 7 | 0 |

Light mean: the mean of every criterion except dark mode, overall included.

## Mean per criterion

| criterion | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Hierarchy and focus on the primary job | 6.75 | 6.88 | 7.44 | 7.94 |
| Layout and spacing rhythm | 6.56 | 6.75 | 7.13 | 7.94 |
| Typography | 6.69 | 6.94 | 7.75 | 7.50 |
| Colour and contrast | 6.88 | 7.13 | 7.44 | 7.63 |
| Component craft and detail | 6.19 | 6.63 | 7.56 | 7.81 |
| State and content realism | 6.88 | 6.81 | 8.00 | 8.50 |
| Mobile quality | 6.38 | 6.06 | 6.88 | 7.94 |
| Dark mode quality | 7.31 | 2.44 | 1.75 | 7.94 |
| Overall: would a picky senior product designer ship this | 5.63 | 5.94 | 6.94 | 7.88 |

## Overall per task

| task | baseline | prompt | anthropic | skill | winner |
| --- | --- | --- | --- | --- | --- |
| 01-settings | 5.00 | 6.50 | 6.50 | 8.00 | skill |
| 02-invoices-table | 6.50 | 5.00 | 6.50 | 8.50 | skill |
| 03-sign-in | 6.00 | 6.00 | 8.00 | 6.00 | anthropic |
| 04-empty-onboarding | 5.50 | 6.50 | 6.00 | 8.00 | skill |
| 05-pricing | 6.00 | 5.50 | 7.00 | 7.50 | skill |
| 06-checkout | 5.50 | 5.50 | 7.00 | 8.50 | skill |
| 07-dashboard | 5.50 | 6.50 | 7.50 | 8.50 | skill |
| 08-mobile-banking | 5.00 | 6.00 | 7.00 | 8.00 | skill |

## Lint, side by side

### 01-settings

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 0 | 3 | 2 | 0 |
| Axe moderate + minor | 2 | 1 | 0 | 0 |
| Contrast failures | 0 | 0 | 2 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 24 | 28 | 24 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 0 | 1 | 1 |
| Font families | 1 | 1 | 2 | 2 |
| Text colors | 7 | 6 | 6 | 6 |
| Smallest font | 12px | 10px | 12px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 02-invoices-table

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 0 | 0 | 0 | 0 |
| Axe moderate + minor | 0 | 0 | 0 | 0 |
| Contrast failures | 0 | 0 | 0 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 46 | 46 | 59 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 1 | 1 | 0 | 1 |
| Font families | 1 | 1 | 1 | 1 |
| Text colors | 8 | 8 | 6 | 6 |
| Smallest font | 11.6667px | 11.6667px | 11.6667px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 03-sign-in

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 0 | 0 | 0 | 0 |
| Axe moderate + minor | 0 | 2 | 3 | 0 |
| Contrast failures | 0 | 0 | 0 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 5 | 8 | 7 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 0 | 0 | 0 |
| Font families | 1 | 1 | 1 | 2 |
| Text colors | 6 | 5 | 5 | 7 |
| Smallest font | 12px | 12px | 13px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 04-empty-onboarding

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 2 | 0 | 0 | 0 |
| Axe moderate + minor | 0 | 0 | 0 | 0 |
| Contrast failures | 2 | 0 | 0 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 2 | 7 | 6 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 0 | 0 | 0 |
| Font families | 1 | 2 | 1 | 2 |
| Text colors | 4 | 5 | 4 | 4 |
| Smallest font | 11.5px | 11px | 13px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 05-pricing

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 0 | 0 | 10 | 0 |
| Axe moderate + minor | 0 | 0 | 2 | 0 |
| Contrast failures | 0 | 0 | 10 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 3 | 2 | 98 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 0 | 0 | 0 |
| Font families | 1 | 2 | 2 | 1 |
| Text colors | 6 | 7 | 7 | 5 |
| Smallest font | 12px | 12px | 13px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 06-checkout

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 0 | 0 | 0 | 0 |
| Axe moderate + minor | 11 | 0 | 0 | 0 |
| Contrast failures | 0 | 0 | 0 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 5 | 6 | 1 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 0 | 0 | 0 |
| Font families | 3 | 3 | 2 | 2 |
| Text colors | 4 | 4 | 5 | 5 |
| Smallest font | 10px | 12px | 13px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 07-dashboard

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 8 | 0 | 0 | 0 |
| Axe moderate + minor | 0 | 0 | 0 | 0 |
| Contrast failures | 8 | 0 | 0 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 2 | 8 | 4 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 1 | 0 | 0 | 1 |
| Font families | 1 | 2 | 1 | 2 |
| Text colors | 7 | 9 | 9 | 7 |
| Smallest font | 12px | 11px | 12px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 08-mobile-banking

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 2 | 0 | 2 | 0 |
| Axe moderate + minor | 3 | 1 | 2 | 0 |
| Contrast failures | 2 | 0 | 2 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 1 | 1 | 2 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 0 | 0 | 0 |
| Font families | 1 | 1 | 1 | 1 |
| Text colors | 8 | 13 | 8 | 8 |
| Smallest font | 11px | 12px | 12px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |
