# Blind judge instructions

You judge screenshots of web pages built for the same task by different builders. You do not know who built which.

## What you may read

- Read only image files under this folder (`blind/`): the `.png` files in `<group>/<label>/`.
- Do not read any other file. Do not open `blind-key.json`, `lint.json`, `lint-summary.md`, `results.md`, `scores.json`, any `index.html`, or any file outside `blind/`. Do not list the parent folder.
- Do not read another judge's `scores-*.json`.
- Do not guess which label came from which builder. Judge only what you see.

## The screenshots

Each `<group>/<label>/` folder holds up to five images:

| File | What it shows |
|---|---|
| `desktop-fold.png` | Desktop 1440x900, the first screen a user sees. |
| `desktop.png` | Desktop 1440 px wide, full page (capped at 4000 px tall). |
| `mobile-fold.png` | Phone 390x844, the first screen a user sees. |
| `mobile.png` | Phone 390 px wide, full page. |
| `dark.png` | Desktop full page with the system set to dark mode. |

Look at the fold shots first. A fixed or sticky bar appears mid-page in a full-page shot but sits at the edge in a real fold, so judge such bars on the fold shots.
Open every one of the 5 images for every label before you score that label. Do not skip `mobile.png` or any other file.
If a file is truly missing from the folder, score what you can see, say so in `worst`, and leave it out of `seen`.

## Groups and labels

Each group is a folder. Score the labels of a group against each other only. You judge only the groups of task `14-support-conversation`. Do not open any other folder.

- `14-support-conversation-s1`: `A`, `B`, `C`, `D`
- `14-support-conversation-s2`: `A`, `B`, `C`, `D`
- `14-support-conversation-s3`: `A`, `B`, `C`, `D`

## Scoring

For each group, score every label from 1 to 10 on each criterion. Use whole numbers. 1 is broken, 5 is mediocre, 8 is good, 10 is the best you have seen.

- `hierarchy`: Hierarchy and focus on the primary job.
- `layout`: Layout and spacing rhythm.
- `typography`: Typography.
- `colour`: Colour and contrast.
- `craft`: Component craft and detail.
- `realism`: State and content realism.
- `mobile`: Mobile quality.
- `dark`: Dark mode quality.
- `overall`: Overall: would a picky senior product designer ship this.

**Light mode only for `overall`.** Judge `overall` on the light-mode design only: `desktop-fold.png`, `desktop.png`, `mobile-fold.png` and `mobile.png`. Dark mode has its own criterion, `dark`. Look at `dark.png` only for `dark`. Dark mode must not change `overall` or any other criterion.

Do not reward a page for holding more content. Judge the quality of what is there.

Score the labels of one group against each other, and keep your scale steady across groups. Do not give two labels the same `overall` unless you truly cannot separate them.

For each label, name its single worst defect in `worst`. Write the screenshot file where you saw it, a colon, then the defect. Example: `desktop.png: the sidebar background ends halfway down the page`.

## Output

Pick a judge name with letters, digits and dashes only. It must start with `opus` or `sonnet`, for your model family, such as `opus1`. Write `blind/scores-14-support-conversation-<judgeName>.json`, holding only the groups listed above, in this shape:

```json
{ "<group>": { "<label>": { "<criterion>": n, "overall": n, "seen": ["<file name>", ...], "worst": "<file>: <defect>" } } }
```

Example, with the criterion keys exactly as written above:

```json
{
  "14-support-conversation-s1": {
    "A": { "hierarchy": 7, "layout": 7, "typography": 7, "colour": 7, "craft": 7, "realism": 7, "mobile": 7, "dark": 7, "overall": 7, "seen": ["desktop-fold.png", "desktop.png", "mobile-fold.png", "mobile.png", "dark.png"], "worst": "mobile-fold.png: the primary button is cut off at the right edge" }
  }
}
```

Every group and every label above needs an entry. Every criterion needs a whole number from 1 to 10. Every label needs `"seen"`: the list of image file names you opened for that label. Write only that file.
