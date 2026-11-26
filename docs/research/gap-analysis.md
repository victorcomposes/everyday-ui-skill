# Gap analysis (before the skill was written)

Written by an Opus 5.5 agent at the start, to find what a naive "design principles" skill would miss and how to make the proof fair. Fable was requested but is blocked by the local model policy.

## Blind spots, ranked
1. The agent never sees its output. Principles cannot fix a model that does not look.
2. It designs the screen, not the task: no clear primary action, flat hierarchy.
3. It regresses to the default AI look (purple gradients, Inter, card soup, emoji icons).
4. It ignores the codebase's own components.
5. Happy path only: no empty, loading, error, permission or first-run states.
6. Fake content ("John Doe", round numbers, three perfect rows) hides real problems.
7. Wrong density for the audience.
8. Missing interaction states: focus-visible, pending, disabled-with-reason, undo.
9. Copywriting: "Submit", marketing tone in settings, errors without a fix.
10. Drift across screens.
11. Fine detail: tabular numbers, icon baseline, field widths, autocomplete.
12. Responsive, dark mode, accessibility and motion treated as afterthoughts.

## Mechanisms, expected strength
- Strong: render-look-fix loop; checks that run as code; constrained choice (one token system); a state and fixture matrix.
- Medium: forced pre-design brief; concrete banned-pattern list; reference retrieval.
- Weak: prose principles, personas, "pixel perfect", self-critique without a screenshot.

## Proof design
- Three comparison arms, not one: no skill, a strong generic prompt, the best public skill.
- Freeze a held-out task set before writing the skill. The skill author never sees it.
- Blind pairwise or N-way judging with shuffled labels, run in both orders.
- Judges see pixels only, never code.
- Report mechanical metrics beside judge scores, and publish the losses.

How this repo applied it: see `docs/METHOD.md`.
