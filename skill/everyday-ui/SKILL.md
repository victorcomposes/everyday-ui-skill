---
name: everyday-ui
description: Design and build everyday product UI to the standard of the best product in its category - settings, forms, tables, dashboards, sign-in, onboarding, empty states, pricing, checkout, admin, lists, search, notifications, dialogs and mobile screens. Use for any task that builds, changes, restyles, reviews or fixes a screen, page, component or layout, in an existing codebase or from scratch, with or without Mobbin or Refero. Runs a brief, brand, type, fixture, build and render-check-critique loop with a bundled Playwright checker.
version: 4.0.0
---

# Everyday UI

For product screens people use every day, not marketing pages. The bar is the best product in the category: a confident type hierarchy, a clear character, calm working surfaces, exact details and honest states.

**Restraint in the working surface, character in the frame.** Tables, forms and charts stay neutral and dense. The logo, sidebar, titles, key numbers, sign-in panels and empty states carry the brand.

**Hierarchy is the first thing judged.** At arm's length the page title, the key number and the primary action read first, in that order. Everything else is visibly quieter.

Follow the steps in order. Each step ends with an exit check.

Read only what the task needs: this file, `references/tokens.md`, `references/brand.md`, and the pattern files for the screen types in this task. `references/craft.md` and `references/anti-slop.md` are checklists to scan, not to study.

## Files

| File | Read when |
|---|---|
| `references/patterns/<type>.md` | Step 3. One main pattern, at most two more. |
| `references/brand.md` | Step 4. Kit and variant, type pairing and type scale, mark, brand moments. |
| `references/tokens.md` | Step 4. Token block, rhythm and sizes, or how to adopt the project's tokens. |
| `references/fixtures.md` | Step 5. Typical default data, hostile stress data, coherent numbers. |
| `references/craft.md` | Step 6. Read once per task before markup. |
| `references/anti-slop.md` | Steps 6 and 9. Banned patterns with replacements. |
| `references/references.md` | Step 3, only if Mobbin, Refero or a named design system is available. |
| `scripts/ui-check.mjs` | Steps 7 to 9. Screenshots plus code checks. |

`SKILL_DIR` means the folder that holds this file.

## Pick the pattern

| The request mentions | Main pattern | Often add |
|---|---|---|
| settings, preferences, account, profile | `settings.md` | `forms.md`, `app-shell.md` |
| form, create, edit, wizard, multi-step, application | `forms.md` | `dialogs.md` |
| table, records, orders, invoices, transactions, logs | `data-table.md` | `search.md`, `app-shell.md` |
| dashboard, overview, home, analytics, KPIs | `dashboard.md` | `app-shell.md`, `data-table.md` |
| sign in, sign up, reset password, 2FA, SSO | `sign-in.md` | `forms.md` |
| onboarding, getting started, setup, first run | `onboarding.md` | `empty-states.md` |
| empty, no results, loading, error, offline, 404 | `empty-states.md` | `app-shell.md` |
| pricing, plans, upgrade, paywall | `pricing.md` | |
| checkout, cart, payment, order confirmation | `checkout.md` | `forms.md` |
| admin, users, roles, permissions, audit log | `admin.md` | `data-table.md`, `detail-page.md` |
| list, inbox, feed, queue, tasks, messages | `lists.md` | `detail-page.md` |
| search, filter, results, command palette | `search.md` | `lists.md` |
| notifications, alerts, activity, toasts, banners | `notifications.md` | `settings.md` |
| mobile, iOS, Android, app screen, phone | `mobile.md` | the screen's own pattern |
| detail, record, profile page, order page | `detail-page.md` | `app-shell.md` |
| modal, dialog, drawer, confirm, delete | `dialogs.md` | |
| shell, sidebar, navigation, header | `app-shell.md` | |

## Workflow

### 1. Read the ground

In a codebase, find before you design: tokens (CSS variables, `tailwind.config.*`, theme objects, shadcn `globals.css`), components (`components/ui`, a design-system package, Storybook), the icon set, the font, the logo, the CSS method, and one existing screen of the same kind.

For a standalone page, read the output contract: single file or not, framework, network allowed or not, where the file goes.

Exit check: one line each for token source, component source, icon set, font, logo and output contract. Write "none" where none exists.

### 2. Write the brief

In your working notes, not in shipped code:
```
Screen: <pattern file(s)>
Product: <name>   Feel: <one word>   Domain detail: <one thing, see brand.md>
Signature: <kit + variant> / <shape: crisp | standard | soft> / <type pairing A or B>
User: <who, how often, device, expertise>
Job: <verb + object: "Find an overdue invoice and send a reminder">
Primary action: <one button label, verb + object>
Key number: <optional: the one number this screen exists to show>
Data: <entities, fields, counts, ranges, units, currency>
Must states: <default + the 2 or 3 from the pattern file's "Must" line>
Density: <compact | regular | comfortable>
```
For a one-page brief, build the default view and the pattern's Must states only.

Exit check: every line is specific. Exactly one primary action. The data line has numbers.

### 3. Load the pattern and compose

Read the main pattern file and at most two more. If Mobbin or Refero is connected, follow `references/references.md`: 2 or 3 screens from different products, extract structure, density, states and copy, never pixels.

Write the region list with sizes for desktop 1440 and phone 390:
```
desktop: sidebar 248 (frame tint, logo) / content max 1200: title row + actions, KPI row, table, pagination
phone:   top bar 56 (title, primary, "More") / KPI 2x2 / rows as stacked list / pagination
```
Composition rules:
- Small-content screens (sign-in, onboarding, empty states, confirmations) get a split layout with a brand panel, or sit inside the app shell. Never a lone card in a blank 1440 canvas.
- One first action per screen. On short screens (sign-in, empty state, dialog, settings section) it is above the fold at both widths. On long forms and checkout the submit sits at the end of the form; a sticky bar or the summary may mirror it, never replace it. Other entry points are grouped under it and visibly secondary.
- One content width and one right edge per page. Every section shares them.
- Every action sits in the header row or inside the card it acts on. On phones the header keeps the title and its action group together: the primary plus one labelled secondary, or a "More" menu directly beside the primary.
- Side rails 320 to 400px. Row actions in a fixed-width trailing column. Side-by-side modules end at the same height. Sticky phone bars under 100px, with `scroll-padding-bottom` equal to their height.
- Phone-only screens at desktop width: one centred 390 to 430px column on `--surface` with a shadow, on a tinted page.

Exit check: region lists for both widths. The primary action and the key number have fixed places. No region is empty without a reason.

### 4. Brand, type and tokens

- Existing product: adopt its tokens, logo and components, map them to the roles in `references/tokens.md`, and place 3 brand moments with what it has. Still apply the type scale with its own fonts.
- New page: copy the token block from `references/tokens.md`. Apply the kit or its variant, the shape and the type pairing from `references/brand.md`. Build the mark. Pick 3 or 4 brand moments and the domain detail.
- Type, the step that wins hierarchy (`brand.md` section 3): title 28 to 32px in the display face, 600 to 700, -0.02em, at least twice the 14 to 15px body. Key numbers 28 to 40px, 600, tabular. Section titles 18 to 20px. Labels 13 to 14px, 500, muted. Two weights carry the contrast: 400 and 600 or 700.
- Rhythm: page title to subtitle 12px, section title to intro 8px, header block to content 24px, between groups 40px, from the `--rhythm-*` tokens, the same on every page.

Exit check: the signature line is applied. The title, key number and labels use the scale. Styles contain only token values, the SVG mark and one-off component sizes.

### 5. Build the fixtures

Follow `references/fixtures.md`. One data module. The default view uses typical, believable data with at most one naturally long value. Hostile data (one-letter names, huge numbers, missing values) lives only in `?state=stress`. Choose the KPIs by hand so the story is honest, then derive every row, chart point, count, badge and total from the same data in code. Header counts describe the whole dataset; pagination says how many rows show.

Exit check: nothing in the default view looks like a bug. Every number on screen comes from the data. Chart legends, axes and KPIs agree. Statuses agree with dates and a fixed `TODAY`.

### 6. Build

Scan `references/craft.md` and `references/anti-slop.md` first. Then:
1. Semantic structure: landmarks, a skip link, one `h1`, headings in order, real `button`, `a`, `label`, `table`. The base CSS from `tokens.md`, including `[hidden]` and `a { color: inherit }`.
2. The shell, if any: the background lives on the full-height grid column; only the inner nav is sticky. Nav groups stack from the top; only the account block pins to the bottom.
3. The populated default view, desktop first, house components first. IDs are quiet: muted plain tabular text, no chip. Initials only for people and merchants. Third-party buttons in their brand form.
4. The Must states. In a codebase, use its mechanism. In a standalone page, read `?state=empty|loading|error|stress`. No demo switcher unless the task asks.
5. Phone: tables become stacked rows under 640px (thead `display: none`). Links and buttons at least 44px tall. Badges `nowrap`. Closed drawers `hidden` or `inert`.
6. Dark mode through tokens and the kit's dark column. Then hover, active, `:focus-visible`, disabled, pending, selected and error states.

Exit check: each Must state renders. No console error. Nothing from the banned list.

### 7. Check by code

During the loop, check the default view only (13 to 15 s a run):
```
node SKILL_DIR/scripts/ui-check.mjs <file-or-folder-or-url> [outDir]
```
It writes fold and full-page screenshots for desktop 1440, phone 390 and dark, plus `desktop-squint.png`, a blurred fold for the arm's-length test. Every line carries its state, for example `FAIL [default] tap-targets`. It checks:
- contrast in both themes, and type hierarchy (title scale, tracking, weight)
- on the phone: sideways scroll with culprits and causes, tables, tap targets, input zoom, badge wrap, tall sticky bars
- focus rings, labels, names and alt text
- the 100vh sidebar, squeezed text, touching labels and empty canvas
- tabular figures, counts of fonts, sizes and colours, banned patterns, JS errors, and axe-core when it is installed

It finds Playwright in the page's project, the current project, beside the script, then the global npm root. It launches Playwright's Chromium, then Chrome, then Edge, and prints which one ran. If Playwright is missing it prints the install command.

Fix every FAIL. Fix each WARN or write one line on why it is right here. Comparison matrices may opt out of number alignment with `data-matrix`.

Exit check: 0 FAIL. Every WARN fixed or justified.

### 8. Look, critique, fix

Zero FAIL is not the finish. Judges score the look. Always run at least one look round, and at most 3.

Open with your file-reading tool: `desktop-squint`, `desktop-fold`, `desktop-full`, `phone-full`, and `dark-fold`. Start with the squint: name the first three things you see. If they are not the title, the key number and the primary action, fix that first. Then score the checklist below as yes or no. For each no, write the concrete defect and fix: "Invoice ID chip is the darkest thing in the row: make it muted plain text". Adjectives are not findings.

Fix the worst 3 to 5 defects. Save a copy first. Rerun step 7, then this step. Keep a revision only if FAIL is not higher and checklist misses are lower. Otherwise restore the copy.

Exit check: a scored checklist for the final round, from at least one round after 0 FAIL.

### 9. Subtract and finish

- Remove one element that does not serve the job or the brand.
- Read `references/anti-slop.md` against the final screenshots.
- Run the checker once with the states: `--state=empty,error,stress` (or the Must states). Fix any new FAIL and look at each state's desktop shot.
- Report in a few lines: job and primary action, signature, states and how to see them, checker score, known gaps.

Exit check: 0 FAIL on the final run with states, and every known gap is named.

## Critique checklist

Score from the screenshots, not the code.

1. Arm's length: in the squint, the title, the key number and the primary action read first, in that order.
2. Type: the title is twice the body size, tight and heavy, in the display face. Section, label, value and help text differ clearly. Two weights carry the contrast.
3. Rhythm: title and subtitle sit close, groups sit far apart, the same way on the whole page. No cramped heading next to a random big gap.
4. Character: logo, tinted frame and display titles are visible. The product looks like itself, not a sibling of another kit product.
5. Composition: the 1440 canvas is used on purpose. One content width and right edge. No dead column, no floating action.
6. One first action: one filled accent button per view, above the fold on short screens, at the end of long forms. Alternatives grouped once and visibly secondary.
7. Quiet secondaries: IDs, meta and secondary actions are muted. Nothing secondary is the loudest thing in its row.
8. Believable data: the default view has typical data and no value that looks like a bug. Counts, totals, charts and legends agree.
9. Numbers: right-aligned in tables, tabular, one decimal rule per column, currency shown once.
10. Steady layout: fixed action columns, side rails sized for content, no text wrapped to 3 lines in a narrow column, aligned field rows, nav groups stacked from the top.
11. Phone: no sideways scroll, tables stacked, tabs that fit or scroll with a visible fade, badges on one line, labels never touching, 44px targets, header actions grouped with the primary, sticky bars slim.
12. Detail: one icon set, count badges on the icon's corner, initials only for people and merchants, third-party buttons in brand form, nested radii.
13. States: each Must state exists, says what happened and gives one next step.
14. Copy: sentence case, plain verbs, no filler, errors say what is wrong and how to fix it.
15. Dark: every surface switched, borders visible, no white islands.

## Fix mode

For a fix or a small change to an existing screen: keep the existing design and change only what the task needs. Do steps 1, 2 (job, primary action, Must states), 6 for the touched area, 7, and one look round of 8. Report other problems you saw, and do not fix them unasked.

## Rules that always apply

- House components, tokens and brand first. A new component only when the house has none.
- Left-aligned product UI, at most two font families, one accent, status colours with text labels.
- No card unless it holds one object or one interaction. No card inside a card.
- Visible labels, 44px touch targets on phones, a visible `:focus-visible` ring. `font: inherit` on controls, phone inputs at least 16px.
- `min-height: 100dvh` on the shell. Backgrounds on full-height grid columns, never on a `100vh` box.
- `tabular-nums` wherever numbers line up or change.
- Never disable Save or Submit before an attempt. With no changes, Save says "No changes to save".
- Destructive actions name the object and offer undo or a specific confirm (`patterns/dialogs.md`).
- Motion only answers a user action, 120 to 200 ms, and stops under `prefers-reduced-motion`.
