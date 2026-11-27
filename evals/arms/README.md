# Arm briefs

Each file here holds the exact brief a generator agent gets for one arm. The briefs are frozen for round `proof2`. See `docs/PREREG.md`.

| File | Arm |
| --- | --- |
| `baseline.md` | No instructions beyond the output contract. |
| `prompt.md` | A strong "senior product designer" instruction. |
| `anthropic.md` | Anthropic's frontend-design skill. |
| `skill.md` | This repo's `everyday-ui` skill. |

## Placeholders

- `{TASK_PROMPT}` takes the text of one task file in `evals/heldout/`, with its final full stop removed. The brief adds the full stop back.
- `{OUT_DIR}` takes the run folder, for example `runs/proof2/skill/13-expense-report-s1`.

Replace both placeholders and pass the result to a fresh agent as its whole task. Add nothing else.

## Why baseline has no look tool

`baseline` is the plain arm. It gets the task and the output contract and nothing more. A tool to view the page is an instruction, so `baseline` does not get one.

The other three arms all get the same look line. It lets them run `node scripts/peek.mjs {OUT_DIR}` and view the screenshots. In earlier rounds only `anthropic` and `skill` looked at their output. That was caveat 4 of `docs/METHOD.md`. With the same look tool in all three instructed arms, that caveat no longer applies between them.

The `skill` arm may also run its own checker. The checker is part of the skill, so it counts as part of the treatment.
