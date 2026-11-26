---
name: everyday-ui
description: Design and build everyday product UI to the standard of the best product in its category - settings, forms, tables, dashboards, sign-in, onboarding, empty states, pricing, checkout, admin, lists, search, notifications, dialogs and mobile screens. Use for any task that builds, changes, restyles, reviews or fixes a screen, page, component or layout, in an existing codebase or from scratch, with or without Mobbin or Refero. Runs a brief, brand, token, fixture, build and render-check-critique loop with a bundled Playwright checker.
version: 2.0.0
---

# Everyday UI

For product screens people use every day, not marketing pages. The bar is the best product in the category. It has a clear character, calm working surfaces, exact details, and honest states.

**Restraint in the working surface, character in the frame.** Tables, forms and charts stay neutral and dense. The logo, sidebar, titles, sign-in panels and empty states carry the brand. A grey, unbranded page loses as surely as AI slop does.

Follow the steps in order. Each step ends with an exit check.

## Files

| File | Read when |
|---|---|
| `references/patterns/<type>.md` | Step 3. One main pattern, at most two more. |
| `references/brand.md` | Step 4. Kit, type pairing, mark, brand moments. |
| `references/tokens.md` | Step 4. Token block, sizes, or how to adopt the project's tokens. |
| `references/fixtures.md` | Step 5. Realistic, hostile and consistent data. |
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

In a codebase, find before you design: tokens (CSS variables, `tailwind.config.*`, theme objects, shadcn `globals.css`), components (`components/ui`, a design-system package, Storybook), the icon set, the font, the logo, the CSS method, and one existing screen of the same kind to copy structure from.

For a standalone page, read the output contract: single file or not, framework, network allowed or not, where the file goes.

Exit check: one line each for token source, component source, icon set, font, logo and output contract. Write "none" where none exists.

### 2. Write the brief

In your working notes, not in shipped code:
```
Screen: <pattern file(s)>
Product: <name>   Feel: <one word>   Domain detail: <one thing, see brand.md>
User: <who, how often, device, expertise>
Job: <verb + object: "Find an overdue invoice and send a reminder">
Primary action: <one button label, verb + object>
Data: <entities, fields, counts, ranges, longest values, units, currency>
Must states: <default + the 2 or 3 from the pattern file's "Must" line>
Density: <compact | regular | comfortable>
Not in scope: <what you will not build>
```
For a one-page brief, build the default view and the pattern's Must states. Build other states only when the task names them.

Exit check: every line is specific. Exactly one primary action. The data line has numbers.

### 3. Load the pattern and compose

Read the main pattern file and at most two more. If Mobbin or Refero is connected, follow `references/references.md`: 2 or 3 screens from different products, extract structure, density, states and copy, never pixels.

Write the region list with sizes for desktop 1440 and phone 390:
```
desktop: sidebar 248 (frame tint, logo) / top bar 56 / content max 1200: title row + actions, filters, table, pagination
phone:   top bar 56 / title row / filter button opens sheet / rows as stacked list / pagination
```
Composition rules:
- Fill the 1440 canvas with purpose. A lone form or card floating in blank space reads as unfinished. Small-content screens (sign-in, onboarding, empty states, confirmations) get a split layout with a brand panel, or sit inside the app shell with real context around them.
- Every action sits in the header row or inside the card or section it acts on. Nothing floats.
- Size side columns for their content (order summaries and detail rails 320 to 400px). Fixed-width action columns.
- Phone-only screens (an app screen) at desktop width: one centred 390 to 430px column on a `--bg-subtle` frame. No fake device chrome.

Exit check: region lists exist for both widths. The primary action has a fixed place. No desktop region is empty without a reason.

### 4. Brand and tokens

- Existing product: adopt its tokens, logo and components. Map them to the roles in `references/tokens.md`. Place 3 brand moments with what it has (`references/brand.md` section 4). No new hue, font or radius.
- New page: copy the token block from `references/tokens.md`. Apply a kit and a type pairing from `references/brand.md`. Build the mark. Pick 3 or 4 brand moments and the domain detail.
- Colours, type, space, radii, shadows and durations come from tokens. One-off component sizes (a 320px rail, a 240px chart) may be literals, or use the size tokens.

Exit check: the logo, tinted frame and display titles are planned. The working surface uses only neutrals plus accent for action, selection and status. A search for `#` and `rgb(` in your styles finds only token definitions and the SVG mark.

### 5. Build the fixtures

Follow `references/fixtures.md`. One data module. Derive every count, total, badge and status from it in code. Never type a count by hand. A header count describes the whole dataset, and the pagination says how many rows show ("1-25 of 36"). Include the hostile cases that fit the data. Keep the default view about 80% ordinary. Put the extremes in a `stress` state.

Exit check: no Lorem, "John Doe", "Jane Smith" or "Acme". Every number on screen comes from the data. Statuses agree with dates and a fixed `TODAY`.

### 6. Build

Read `references/craft.md` and `references/anti-slop.md` once first. Then:
1. Semantic structure: landmarks, a skip link, one `h1`, headings in order, real `button`, `a`, `label`, `table`.
2. The shell, if any: the background lives on the full-height grid column. Only the inner nav is sticky with `height: 100dvh`. Never put `100vh` on an element that paints a background.
3. The populated default view from the fixtures, desktop first, house components first.
4. The Must states. In a codebase, use its mechanism (story, fixture, prop). In a standalone page, read `?state=empty|loading|error|stress`. No demo switcher unless the task asks to show states.
5. Phone: every table becomes stacked rows under 640px, or scrolls inside its own container with a visible cue. Every link and button is at least 44px tall, skip link included. Closed drawers use `hidden` or `inert`.
6. Dark mode through tokens and the kit's dark column. Then hover, active, `:focus-visible`, disabled, pending, selected and error states.

One filled button per view. When an onboarding checklist and empty states share a page, the checklist's next task is the filled button. Empty-state and header create buttons become secondary while the checklist shows.

Exit check: each Must state renders. No console error. Nothing from the banned list.

### 7. Check by code

```
node SKILL_DIR/scripts/ui-check.mjs <file-or-folder-or-url> [outDir] --state=empty,error,stress
```
It writes fold and full-page screenshots for desktop 1440, phone 390 and dark, then prints FAIL, WARN and PASS lines. It checks contrast in both themes, sideways scroll with culprits, tables on phone, tap targets, input zoom, focus rings, labels, names, alt text, short backgrounds (the 100vh sidebar), squeezed text, touching labels, empty canvas, tabular figures, counts of fonts, sizes and colours, banned patterns, JS errors, and axe-core rules when axe-core is installed. It finds Playwright in the page's project, the current project, beside the script, then the global npm root. It launches Playwright's Chromium, then installed Chrome, then Edge, and prints which one ran. If Playwright is missing it prints the install command. Run it and rerun the check.

Fix every FAIL. Fix each WARN or write one line on why it is right here.

Exit check: 0 FAIL. Every WARN fixed or justified.

### 8. Look, critique, fix

Zero FAIL is not the finish. Judges score the look. Always run at least one look round, and at most 3.

Open with your file-reading tool: `desktop-fold`, `desktop-full`, `phone-full`, `dark-fold`, and the desktop shot of each Must state. Score the checklist below as yes or no. For each no, write the concrete defect and fix: "Order summary 220px wide wraps product names to 4 lines: widen the rail to 360px". Adjectives are not findings.

Fix the worst 3 to 5 defects. Save a copy first. Rerun step 7, then this step. Keep a revision only if FAIL is not higher and checklist misses are lower. Otherwise restore the copy and try a different fix.

Exit check: a scored checklist for the final round, from at least one round after 0 FAIL. The final version is the best scoring one.

### 9. Subtract and finish

- Remove one element that does not serve the job or the brand.
- Read `references/anti-slop.md` against the final screenshots.
- Run the checker one last time.
- Report in a few lines: job and primary action, product and kit, states and how to see them, checker score, known gaps.

Exit check: 0 FAIL on the final run, and every known gap is named.

## Critique checklist

Score from the screenshots, not the code.

1. Job first: the desktop fold shows the working surface or, on small-content screens, the task beside a brand panel. No welcome hero.
2. Character: logo, tinted frame and display titles are visible. The product feels like one specific product in its domain, with one domain detail.
3. Composition: the 1440 canvas is used on purpose. No lone card in blank space, no dead half-empty column, no floating actions.
4. One primary: one filled accent button per view, verb + object, where the pattern puts it.
5. Type: title, section, label, value and help text differ clearly by size, weight and colour. The display face appears only in the frame and titles.
6. Edges and grouping: one left edge per column. Space between groups is at least twice the space inside a group.
7. Real, coherent data: names, numbers, dates and statuses look real and agree. Header counts match rows and pagination.
8. Numbers: right-aligned in tables, tabular, one decimal rule per column, currency shown once.
9. Steady columns: action columns fixed width, side rails sized for content, no text wrapped to 3 or more lines in a narrow column, inputs in one row aligned and sized together.
10. Phone: no sideways scroll, tables stacked or scrolled with a cue, labels never touching, 44px targets, primary action reachable.
11. Dark: every surface switched, the frame tint and brand panel in dark values, borders visible, no white islands.
12. States: each Must state exists, says what happened and gives one next step.
13. Copy: sentence case, plain verbs, no filler or marketing words inside the product, errors say what is wrong and how to fix it.
14. Detail: one icon set at one or two sizes, nested radii, aligned baselines, meaningful entity marks, no generic image placeholders.
15. Restraint: nothing from the banned list. Brand colour stays out of data cells and form fields.

## Fix mode

For a fix or a small change to an existing screen: keep the existing design and change only what the task needs. Do steps 1, 2 (job, primary action, Must states), 6 for the touched area, 7, and one look round of 8. Report other problems you saw, and do not fix them unasked.

## Rules that always apply

- House components, tokens and brand first. A new component only when the house has none.
- Left-aligned product UI, at most two font families, one accent, status colours with text labels.
- No card unless it holds one object or one interaction. No card inside a card.
- Visible labels, 44px touch targets on phones, a visible `:focus-visible` ring.
- `font: inherit` on controls. Phone inputs at least 16px.
- `min-height: 100dvh` on the shell. Backgrounds on full-height grid columns, never on a `100vh` box.
- `tabular-nums` wherever numbers line up or change.
- Destructive actions name the object and offer undo or a specific confirm (`patterns/dialogs.md`).
- Motion only answers a user action, 120 to 200 ms, and stops under `prefers-reduced-motion`.
