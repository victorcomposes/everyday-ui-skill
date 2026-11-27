---
name: everyday-ui
description: Design and build everyday product UI to the standard of the best product in its category - settings, forms, tables, dashboards, sign-in, onboarding, empty states, pricing, checkout, admin, lists, search, notifications, dialogs, product and booking pages, and mobile screens. Use for any task that builds, changes, restyles, reviews or fixes a screen, page, component or layout, in an existing codebase or from scratch. Gives the page a world (tinted page, committed colour, system-font type pairing), drawn product art, one featured item and honest actions, then runs a render, check and look loop with a bundled Playwright checker.
version: 5.0.0
---

# Everyday UI

For product screens people use every day, not marketing pages. The bar: put your screenshot beside the same screen at the best product in its category. A picky senior designer should not be able to tell which one shipped.

What decides that, in the order a designer sees it:
1. **A world.** A tinted page with white surfaces, one committed brand colour, a type pairing with character. Not a white page in the system font.
2. **Real things.** Products, dishes, people and places are drawn, each one different. Not the same icon on every row.
3. **One thing leads.** A featured item, fewer and larger items in the first screen, calm two-line rows. Not a dense grid of equals.
4. **Honest actions.** The job is in the first phone screen. A button that needs a choice says what is missing. The primary action sits where people decide.
5. **No defects.** Contrast, tap targets, no sideways scroll, focus, dark mode. The checker finds these, so spend your own attention on 1 to 4.

Spend effort in that order. Process exists to serve the screenshot.

## Files

`SKILL_DIR` means the folder that holds this file. Read only these, once each:

| File | Read when |
|---|---|
| `references/look.md` | Always, step 2. Kits, type stacks, hierarchy. |
| `references/art.md` | Step 2, when the screen shows products, food, people, places or orders. |
| `references/tokens.md` | Step 4, for a new page. In a codebase, its section 1 only. |
| `references/patterns/<type>.md` | Step 3. The main pattern, at most one more. |
| `references/craft.md` | Step 4 before markup, and step 7 against the screenshots. |
| `references/references.md` | Only if Mobbin, Refero or a named design system is connected. |
| `scripts/ui-check.mjs` | Steps 6 and 7. |

## Pick the pattern

| The request mentions | Main pattern | Often add |
|---|---|---|
| settings, preferences, account, profile | `settings.md` | `forms.md` |
| form, create, edit, wizard, application, expense, report | `forms.md` | `dialogs.md` |
| table, records, orders, invoices, stock, logs | `data-table.md` | `search.md` |
| dashboard, overview, home, analytics | `dashboard.md` | `data-table.md` |
| sign in, sign up, reset password, 2FA | `sign-in.md` | `forms.md` |
| onboarding, getting started, first run | `onboarding.md` | `empty-states.md` |
| empty, no results, error, offline, 404 | `empty-states.md` | `app-shell.md` |
| pricing, plans, upgrade, paywall | `pricing.md` | |
| checkout, cart, payment, booking, product page | `checkout.md` | `mobile.md` |
| admin, users, team, roles, permissions | `admin.md` | `data-table.md` |
| list, inbox, feed, queue, conversation, order history | `lists.md` | `detail-page.md` |
| search, filter, results, browse | `search.md` | `lists.md` |
| notifications, alerts, activity | `notifications.md` | |
| mobile, iOS, Android, app screen, phone | `mobile.md` | the screen's own pattern |
| detail, record, order page | `detail-page.md` | |
| modal, dialog, drawer, confirm | `dialogs.md` | |
| shell, sidebar, navigation | `app-shell.md` | |

## Workflow

### 1. Read the ground

In a codebase, find its tokens, components, icon set, font, logo and one existing screen of the same kind, and adopt them. For a standalone page, read the output contract: single file or not, network allowed or not, where the file goes.

### 2. Brief and world

Write this in your notes, not in shipped code. Read `look.md` first, and `art.md` if the screen has things with a look.
```
Product: <name; invent a short plausible one if none>     Kit: <Pantry | Atelier | Harbour | Clinic | Depot | Studio>
Type: <display stack + title size/weight from look.md>  Art: <what gets drawn, which symbols, or "none">
Job: <verb + object, the one thing the person came to do>
Primary action: <one button label; with two jobs, the featured item's action>   Gated by: <a required choice, or "nothing">
Leads: <the hero or featured item, or the key number>
Phone first screen: <top to bottom, what fits in 844px; the job must be in it>
Data: <entities, counts, ranges, currency, TODAY>
```
Exit check: one primary action. The job is in the phone first screen. Art is planned for every item that has a look.

### 3. Compose

Read the main pattern file. Write the region list for desktop 1440 and phone 390, with sizes:
```
desktop: top bar 64 (logo, nav, search, account) / content 1200: title row + primary / featured card 320 tall / list 3 to 5 items with art / rail 360: summary + primary
phone:   top bar 56 / title 28 / featured card compact / job controls / list rows / sticky bar 72
```
Rules:
- One content width and one right edge. Side rails 320 to 400px.
- One featured item where the domain has one (`look.md` section 4). It is the largest thing after the title.
- Short screens (sign-in, onboarding, empty, confirmation) get a split layout with a `--deep` or art panel, or sit inside the app shell.
- Phone-only screens at desktop width: one centred 390 to 430px column on `--surface` with a shadow, on the `--bg` page.
- On long forms with a summary, the rail holds the total and the primary action.

### 4. Build

1. Paste the token block from `tokens.md` with the kit lines and display stack from `look.md`. Add the art kit from `art.md` before the content, so every item gets a picture from the start.
2. Data: one module with typical, believable data and a fixed `TODAY`. Choose the headline numbers by hand. Derive every count, badge, total and bar from the data in code.
3. Semantic structure: landmarks, a skip link, one `h1`, headings in order, real `button`, `a`, `label`, `table`.
4. The default view, desktop first. Then the phone: stacked rows under 640px, 44px targets, the job in the first screen, sticky bars that cover nothing.
5. Dark mode through the kit's dark line. Hover, active, `:focus-visible`, pending and selected states. The gated state of the primary action.
6. Other states only when the task names them. In a standalone page read `?state=empty|error` and similar. No demo switcher.

Scan `craft.md` once before markup.

### 5. Self-check the code

Before rendering, check four things in the code: every product, dish, person or place has its own art with an `aria-label`; the primary action has a gated state if a choice is required; no title link is underlined; every number comes from the data.

### 6. Check by code

```
node SKILL_DIR/scripts/ui-check.mjs <file-or-folder-or-url> [outDir]
```
It writes desktop 1440, phone 390 and dark screenshots (fold and full), plus `desktop-squint.png`. It checks contrast in both themes, sideways scroll, tap targets, input zoom, tables, focus rings, labels, names, the column that stops early, repeated art, underlined title links, type hierarchy, and axe-core when it is installed. Run `--help` for options.

Fix every FAIL. Fix each WARN, or write one line on why it is right here. These screenshots are all you need for step 7; another screenshot tool adds nothing.

### 7. Look against the bar

Zero FAIL is the start, not the finish. Do at least 2 look rounds, at most 4.

Open `desktop-fold.png`, `phone-fold.png`, `desktop-full.png` and `dark-fold.png`. For each, picture the same screen at the best product in the category (Airbnb, Stripe, Linear, Monzo, Deliveroo, Nike, Calendly, Intercom: pick the closest). Score the bar below, yes or no, from the screenshots only. For each no, write the concrete defect and the fix: "Order rows show a grey box icon: draw the three main groceries per order". Adjectives are not findings.

Fix the worst 3 to 5, starting with bar items 1 to 6. Rerun step 6, then this step. Keep a revision only if FAIL does not rise and bar misses fall.

### 8. Finish

- Remove one element that does not serve the job.
- Run the checker once more, with `--state=` for any states you built. 0 FAIL.
- Report in a few lines: job and primary action, kit and type, states and how to see them, checker score, the bar items still at no.

## The bar

Score from the screenshots, not the code.

1. **World**: tinted page, white surfaces, a committed accent in four or more roles, a display title with character. It looks like this product, not a template.
2. **Imagery**: every product, dish, person or place has its own drawn picture at a real size. Nothing looks like a placeholder. No picture repeats 3 times.
3. **Leads**: in the desktop fold, the title, then one featured item or key number, then the primary action read first. One thing is clearly the biggest.
4. **Calm density**: after the featured item, 2 to 5 items in the consumer fold, or two-line rows of 56 to 64px in a tool. At most 6 table columns. No row with 3 or more competing buttons.
5. **Phone job**: the phone fold shows the job (picker, slots, reply box, first result), not only a header, a hero and filters. No sticky bar over content.
6. **Honest action**: one filled primary per view. If a choice is required, the button says what is missing and looks inactive. On a long form, the total and submit are in view in the rail.
7. **Type**: title, section, label, value and meta differ clearly by size, weight and colour. Links in sentences only are underlined.
8. **Rhythm**: tight inside groups, loose between them, no dead gap, columns end together, one right edge.
9. **Detail**: one icon set, badges that do not wrap, numbers aligned and tabular, units human ("2 days", not "2.0 d"), nested radii.
10. **Believable**: names, prices and places fit the product and the country. Counts, totals and bars agree.
11. **Phone craft**: no sideways scroll, nothing clipped at the edge, nav that fits, 44px targets, rows instead of stacked mini-tables.
12. **Dark**: every surface switched, art tiles darkened, borders visible, no white islands.

## Fix mode

For a fix or a small change to an existing screen: keep its design and change only what the task needs. Do steps 1, 2 (job and primary action), 4 for the touched area, 6, and one round of 7. Report other problems you saw, and do not fix them unasked.

## Rules that always apply

- House components, tokens and brand first in a codebase. A new component only when the house has none.
- At most two font families plus a mono for codes. One accent. Status colours always with a text label.
- A card holds one object or one interaction. No card inside a card.
- Visible labels, 44px touch targets on phones, a visible `:focus-visible` ring, phone inputs 16px or more.
- `min-height: 100dvh` on the shell. Column backgrounds on full-height grid columns, never on a `100vh` box.
- `tabular-nums` wherever numbers line up or change.
- Typed forms keep Submit enabled and validate on submit. A required choice (size, slot, plan) gates the primary action with a visible reason.
- Destructive actions name the object and offer Undo or a specific confirm.
- Motion only answers an action, 120 to 200ms, and stops under `prefers-reduced-motion`.
