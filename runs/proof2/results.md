# Results: proof2

Judges: opus1, opus2, sonnet1, sonnet2. Conditions: baseline, prompt, anthropic, skill. Scores are 1 to 10, averaged across judges.

## Mean overall per condition

| condition | mean overall | light mean | wins | ties |
| --- | --- | --- | --- | --- |
| baseline | 5.66 | 6.19 | 1 | 0 |
| prompt | 7.71 | 7.80 | 16 | 1 |
| anthropic | 7.20 | 7.40 | 6 | 1 |
| skill | 5.89 | 6.42 | 0 | 0 |

Light mean: the mean of every criterion except dark mode, overall included.

## Mean per criterion

| criterion | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Hierarchy and focus on the primary job | 6.25 | 7.84 | 7.79 | 6.39 |
| Layout and spacing rhythm | 6.29 | 7.77 | 7.40 | 6.61 |
| Typography | 6.46 | 7.86 | 7.45 | 6.52 |
| Colour and contrast | 6.58 | 7.90 | 7.41 | 6.55 |
| Component craft and detail | 5.91 | 7.86 | 7.32 | 6.23 |
| State and content realism | 6.60 | 8.28 | 7.68 | 6.94 |
| Mobile quality | 5.80 | 7.17 | 6.91 | 6.21 |
| Dark mode quality | 6.89 | 7.79 | 7.19 | 6.91 |
| Overall: would a picky senior product designer ship this | 5.66 | 7.71 | 7.20 | 5.89 |

## Overall per task

| task | baseline | prompt | anthropic | skill | winner |
| --- | --- | --- | --- | --- | --- |
| 09-team-members-s1 | 4.50 | 7.75 | 7.50 | 6.00 | prompt |
| 09-team-members-s2 | 5.00 | 8.00 | 7.25 | 6.50 | prompt |
| 09-team-members-s3 | 5.00 | 8.00 | 7.00 | 6.00 | prompt |
| 10-notifications-s1 | 5.00 | 7.25 | 7.75 | 6.00 | anthropic |
| 10-notifications-s2 | 6.00 | 7.25 | 7.75 | 5.00 | anthropic |
| 10-notifications-s3 | 5.00 | 7.25 | 7.75 | 6.00 | anthropic |
| 11-search-results-s1 | 6.75 | 7.75 | 6.00 | 5.25 | prompt |
| 11-search-results-s2 | 6.25 | 8.25 | 6.75 | 4.50 | prompt |
| 11-search-results-s3 | 6.00 | 8.50 | 7.25 | 4.75 | prompt |
| 12-mobile-product-s1 | 6.50 | 8.25 | 7.00 | 5.25 | prompt |
| 12-mobile-product-s2 | 5.25 | 7.75 | 7.75 | 6.25 | tie: prompt, anthropic |
| 12-mobile-product-s3 | 5.75 | 8.50 | 6.50 | 7.25 | prompt |
| 13-expense-report-s1 | 7.75 | 5.50 | 7.50 | 6.25 | baseline |
| 13-expense-report-s2 | 6.25 | 8.25 | 7.00 | 5.50 | prompt |
| 13-expense-report-s3 | 6.50 | 7.50 | 7.75 | 5.25 | anthropic |
| 14-support-conversation-s1 | 5.50 | 8.50 | 6.00 | 7.25 | prompt |
| 14-support-conversation-s2 | 5.25 | 7.75 | 6.50 | 7.50 | prompt |
| 14-support-conversation-s3 | 5.00 | 8.50 | 7.00 | 6.50 | prompt |
| 15-mobile-booking-s1 | 4.75 | 6.50 | 8.00 | 6.50 | anthropic |
| 15-mobile-booking-s2 | 5.00 | 7.75 | 7.25 | 6.00 | prompt |
| 15-mobile-booking-s3 | 5.00 | 7.75 | 7.25 | 6.00 | prompt |
| 16-stock-levels-s1 | 6.00 | 8.00 | 7.25 | 5.00 | prompt |
| 16-stock-levels-s2 | 6.00 | 7.00 | 7.75 | 5.25 | anthropic |
| 16-stock-levels-s3 | 5.75 | 7.50 | 7.25 | 5.50 | prompt |

## Lint, side by side

### 09-team-members-s1

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 3 | 0 | 1 | 0 |
| Axe moderate + minor | 0 | 0 | 0 | 0 |
| Contrast failures | 3 | 0 | 1 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 29 | 36 | 43 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 1 | 0 | 1 |
| Font families | 1 | 1 | 1 | 1 |
| Text colors | 6 | 20 | 12 | 5 |
| Smallest font | 11px | 11px | 12px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 09-team-members-s2

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 1 | 1 | 0 | 0 |
| Axe moderate + minor | 0 | 0 | 0 | 0 |
| Contrast failures | 1 | 0 | 0 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 32 | 38 | 33 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 0 | 1 | 1 |
| Font families | 1 | 1 | 2 | 1 |
| Text colors | 5 | 23 | 14 | 6 |
| Smallest font | 11px | 11.5px | 12.5px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 09-team-members-s3

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 14 | 0 | 3 | 0 |
| Axe moderate + minor | 0 | 0 | 0 | 0 |
| Contrast failures | 14 | 0 | 3 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 33 | 32 | 24 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 1 | 0 | 1 |
| Font families | 1 | 2 | 2 | 1 |
| Text colors | 6 | 3 | 18 | 7 |
| Smallest font | 11px | 11.5px | 12px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 10-notifications-s1

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 0 | 1 | 16 | 0 |
| Axe moderate + minor | 0 | 0 | 0 | 0 |
| Contrast failures | 0 | 0 | 16 | 0 |
| Overflow at 390 px | yes, 100px | no | no | no |
| Tap targets under 44 px | 59 | 41 | 47 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 1 | 0 | 0 | 1 |
| Font families | 1 | 2 | 2 | 1 |
| Text colors | 7 | 7 | 7 | 4 |
| Smallest font | 11px | 11px | 11px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 10-notifications-s2

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 0 | 0 | 0 | 0 |
| Axe moderate + minor | 0 | 0 | 0 | 0 |
| Contrast failures | 0 | 0 | 0 | 0 |
| Overflow at 390 px | yes, 404px | no | no | no |
| Tap targets under 44 px | 54 | 47 | 44 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 1 | 0 | 1 |
| Font families | 1 | 2 | 2 | 1 |
| Text colors | 8 | 5 | 5 | 6 |
| Smallest font | 11px | 12px | 12px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 10-notifications-s3

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 0 | 0 | 1 | 0 |
| Axe moderate + minor | 0 | 0 | 1 | 0 |
| Contrast failures | 0 | 0 | 1 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 44 | 34 | 24 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 1 | 0 | 1 |
| Font families | 1 | 2 | 1 | 1 |
| Text colors | 3 | 6 | 15 | 4 |
| Smallest font | 11px | 12px | 13px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 11-search-results-s1

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 0 | 1 | 0 | 0 |
| Axe moderate + minor | 0 | 0 | 0 | 0 |
| Contrast failures | 0 | 0 | 0 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 17 | 9 | 5 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 0 | 0 | 0 |
| Font families | 1 | 2 | 2 | 1 |
| Text colors | 5 | 4 | 5 | 4 |
| Smallest font | 12.5px | 12.5px | 13px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 11-search-results-s2

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 23 | 0 | 1 | 0 |
| Axe moderate + minor | 0 | 0 | 0 | 0 |
| Contrast failures | 23 | 0 | 1 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 26 | 22 | 13 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 0 | 0 | 0 |
| Font families | 1 | 2 | 2 | 1 |
| Text colors | 5 | 7 | 7 | 4 |
| Smallest font | 11.52px | 12px | 12px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 11-search-results-s3

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 0 | 0 | 0 | 0 |
| Axe moderate + minor | 0 | 1 | 0 | 0 |
| Contrast failures | 0 | 0 | 0 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 25 | 2 | 13 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 0 | 0 | 0 |
| Font families | 1 | 2 | 2 | 1 |
| Text colors | 4 | 7 | 4 | 3 |
| Smallest font | 12px | 12px | 12.9333px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 12-mobile-product-s1

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 2 | 0 | 0 | 0 |
| Axe moderate + minor | 1 | 4 | 1 | 1 |
| Contrast failures | 1 | 0 | 0 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 15 | 17 | 2 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 0 | 0 | 0 |
| Font families | 1 | 1 | 2 | 1 |
| Text colors | 4 | 5 | 5 | 4 |
| Smallest font | 12px | 12px | 12px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 12-mobile-product-s2

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 3 | 0 | 2 | 0 |
| Axe moderate + minor | 1 | 1 | 1 | 0 |
| Contrast failures | 2 | 0 | 2 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 1 | 3 | 7 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 0 | 0 | 0 |
| Font families | 1 | 1 | 1 | 1 |
| Text colors | 6 | 5 | 4 | 5 |
| Smallest font | 12px | 12px | 11px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 12-mobile-product-s3

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 3 | 0 | 1 | 0 |
| Axe moderate + minor | 0 | 0 | 1 | 0 |
| Contrast failures | 2 | 0 | 1 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 2 | 5 | 1 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 0 | 0 | 0 |
| Font families | 1 | 1 | 2 | 1 |
| Text colors | 7 | 4 | 5 | 5 |
| Smallest font | 12px | 12px | 13px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 13-expense-report-s1

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 11 | 0 |
| Axe serious (nodes) | 0 | 0 | 0 | 0 |
| Axe moderate + minor | 0 | 0 | 0 | 0 |
| Contrast failures | 0 | 0 | 0 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 63 | 70 | 61 | 11 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 0 | 0 | 0 |
| Font families | 1 | 1 | 2 | 1 |
| Text colors | 5 | 7 | 6 | 5 |
| Smallest font | 12px | 12px | 12px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 13-expense-report-s2

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 24 | 0 | 0 |
| Axe serious (nodes) | 0 | 8 | 2 | 0 |
| Axe moderate + minor | 0 | 0 | 0 | 0 |
| Contrast failures | 0 | 0 | 2 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 86 | 18 | 53 | 4 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 0 | 0 | 1 |
| Font families | 1 | 1 | 2 | 1 |
| Text colors | 6 | 5 | 6 | 5 |
| Smallest font | 11px | 12px | 12.5px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 13-expense-report-s3

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 0 | 0 | 0 | 0 |
| Axe moderate + minor | 0 | 0 | 0 | 0 |
| Contrast failures | 0 | 0 | 0 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 8 | 13 | 23 | 3 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 0 | 0 | 1 |
| Font families | 1 | 1 | 2 | 1 |
| Text colors | 5 | 5 | 8 | 5 |
| Smallest font | 10px | 10px | 10px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 14-support-conversation-s1

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 4 | 0 | 0 | 0 |
| Axe moderate + minor | 1 | 0 | 0 | 0 |
| Contrast failures | 4 | 0 | 0 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 14 | 12 | 7 | 2 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 0 | 0 | 1 |
| Font families | 1 | 2 | 2 | 1 |
| Text colors | 9 | 8 | 5 | 5 |
| Smallest font | 10.8333px | 11.5px | 12.5px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 14-support-conversation-s2

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 1 | 0 | 1 | 0 |
| Axe moderate + minor | 1 | 2 | 0 | 0 |
| Contrast failures | 0 | 0 | 0 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 8 | 12 | 7 | 2 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 0 | 0 | 0 |
| Font families | 1 | 1 | 1 | 1 |
| Text colors | 8 | 7 | 6 | 6 |
| Smallest font | 12px | 11px | 12px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 14-support-conversation-s3

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 0 | 0 | 0 | 0 |
| Axe moderate + minor | 0 | 1 | 0 | 0 |
| Contrast failures | 0 | 0 | 0 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 6 | 18 | 6 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 0 | 0 | 0 |
| Font families | 1 | 1 | 2 | 1 |
| Text colors | 7 | 9 | 5 | 5 |
| Smallest font | 10.8333px | 10.8333px | 12px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 15-mobile-booking-s1

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 0 | 0 | 0 | 0 |
| Axe moderate + minor | 2 | 0 | 0 | 0 |
| Contrast failures | 0 | 0 | 0 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 15 | 0 | 0 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 1 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 0 | 0 | 0 |
| Font families | 1 | 1 | 2 | 1 |
| Text colors | 4 | 7 | 5 | 4 |
| Smallest font | 12px | 12.5px | 11px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 15-mobile-booking-s2

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 0 | 0 | 9 | 0 |
| Axe moderate + minor | 0 | 10 | 0 | 0 |
| Contrast failures | 0 | 0 | 0 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 0 | 20 | 0 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 1 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 0 | 0 | 0 |
| Font families | 1 | 1 | 2 | 1 |
| Text colors | 5 | 9 | 3 | 4 |
| Smallest font | 12px | 11.5px | 13px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 15-mobile-booking-s3

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 0 | 0 | 9 | 0 |
| Axe moderate + minor | 0 | 0 | 0 | 0 |
| Contrast failures | 0 | 0 | 0 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 0 | 21 | 0 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 0 | 0 | 0 |
| Font families | 1 | 2 | 1 | 1 |
| Text colors | 5 | 3 | 9 | 4 |
| Smallest font | 11px | 12px | 11px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 16-stock-levels-s1

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 0 | 1 | 31 | 0 |
| Axe moderate + minor | 0 | 0 | 2 | 0 |
| Contrast failures | 0 | 0 | 15 | 0 |
| Overflow at 390 px | yes, 7px | no | no | no |
| Tap targets under 44 px | 29 | 64 | 23 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 1 | 0 | 1 |
| Font families | 1 | 2 | 1 | 1 |
| Text colors | 6 | 6 | 7 | 6 |
| Smallest font | 12px | 12px | 13px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 16-stock-levels-s2

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 10 | 0 | 0 | 0 |
| Axe moderate + minor | 0 | 0 | 0 | 0 |
| Contrast failures | 1 | 0 | 0 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 21 | 101 | 14 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 1 | 0 | 1 |
| Font families | 1 | 2 | 2 | 1 |
| Text colors | 5 | 9 | 5 | 6 |
| Smallest font | 12px | 12px | 12.5px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |

### 16-stock-levels-s3

| check | baseline | prompt | anthropic | skill |
| --- | --- | --- | --- | --- |
| Axe critical (nodes) | 0 | 0 | 0 | 0 |
| Axe serious (nodes) | 0 | 0 | 1 | 0 |
| Axe moderate + minor | 1 | 0 | 0 | 0 |
| Contrast failures | 0 | 0 | 1 | 0 |
| Overflow at 390 px | no | no | no | no |
| Tap targets under 44 px | 51 | 47 | 22 | 0 |
| Fixed/sticky over 15% of 390x844 | 0 | 0 | 0 | 0 |
| 100vh gap (900 px boxes in a tall page) | 0 | 1 | 0 | 1 |
| Font families | 1 | 2 | 2 | 1 |
| Text colors | 6 | 7 | 4 | 6 |
| Smallest font | 12px | 12px | 12px | 12px |
| Emoji in DOM | 0 | 0 | 0 | 0 |
| Images without alt | 0 | 0 | 0 | 0 |
| Visible focus style | yes | yes | yes | yes |
