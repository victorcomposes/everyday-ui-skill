# Craft checklist

Scan this before markup and again on the screenshots. Each line is a rule, then the reason in a few words.

## Type and numbers

- [ ] `tabular-nums` on tables, totals, prices, timers, counters. (Digits line up and do not jiggle.)
- [ ] Money, counts and percentages right-aligned in tables, headers too. (Magnitude reads at the right edge.)
- [ ] One decimal rule per column: money 2 places or 0, never mixed. (Mixed precision misleads.)
- [ ] Currency once: in the header or on every value. Thousands separators from 1,000. Abbreviate (12.4k) only in KPIs and charts.
- [ ] Negatives with a true minus `−`, not red alone. Deltas carry a sign or arrow plus semantic colour (`--success` up-good, `--danger` up-bad), never colour alone, never all grey.
- [ ] Dates: relative within 7 days, absolute after, full timestamp in `<time datetime>` or `title`. Use `Intl` formatters.
- [ ] Labels quieter than values: label 13 to 14px muted, value in `--text`. (The eye lands on data.)
- [ ] Sentence case everywhere. `text-wrap: balance` on headings, `pretty` on short paragraphs. (No orphan words.)
- [ ] Nothing under 12px. Body not under 14px.

## Layout and rhythm

- [ ] Spacing from the 4px scale. Inside a group 4 to 12px, between groups 24 to 48px. (The ratio shows grouping.)
- [ ] Rhythm tokens the same on every page: page title to subtitle 12px, section title to intro 8px, label to hint 4px, header block to content 24px, between groups 40px. (No glued subtitle, no random gap.)
- [ ] One left edge and one right edge per column; one content width for every section of a page. (Ragged edges look careless.)
- [ ] Grids balance: side-by-side modules end at the same height, or the shorter column takes a second module. Lower modules use the same section or card treatment as upper ones. (No dead gaps, no unstyled tail.)
- [ ] `min-width: 0` on flex and grid children with text; `gap`, not margins; fixed size or `aspect-ratio` on images, charts and skeletons.
- [ ] Max widths: forms 560 to 640px, reading 65ch, app content 1200 to 1280px. Empty space goes to the sides, not between a label and its value.
- [ ] Full-height shell: background on the grid column, only the inner nav sticky. (A `100vh` box stops at the first screen.)
  ```css
  .shell { display: grid; grid-template-columns: var(--w-sidebar) minmax(0, 1fr); min-height: 100dvh; }
  .shell > aside { background: var(--frame); border-right: 1px solid var(--border); }
  .shell > aside > nav { position: sticky; top: 0; height: 100dvh; overflow-y: auto; }
  ```
- [ ] Sidebar nav groups stack from the top; only the account block pins to the bottom with `margin-top: auto`. (A middle gap reads as a missing section.)
- [ ] Side rails 320 to 400px. Short text (names, labels, buttons) never wraps to 3 lines.
- [ ] Sticky headers and bars have a background and an edge. Anchored sections get `scroll-margin-top`.

## Composition and actions

- [ ] One primary (filled accent) button per view. Others secondary or text. Destructive stays red text or outline until the confirm step.
- [ ] Where the primary goes:
  - Short screens (sign-in, empty state, dialog, settings section): the first action is above the fold at 1440 x 900 and 390 x 844.
  - Long forms and checkout: the submit sits at the end of the form, where people finish. It may also be mirrored in a sticky bar or the order summary, never only there.
  - Pages: the primary sits at the right of the page header row.
- [ ] Every action sits in the header row or inside the card it acts on. Nothing floats.
- [ ] On phones, the page header keeps the title and its action group together. Secondary actions either stay as one labelled secondary button, or fold into a "More" menu placed directly beside the primary in the same group. Never a lone "..." away from the primary, never a lone secondary on its own row.
- [ ] Sticky bottom bars: one line (total or status) plus the button, under 100px with the safe area. Add `scroll-padding-bottom` equal to the bar height on the scroller, so focused fields are never hidden under it.
- [ ] Small-content screens on desktop (sign-in, onboarding, confirmations): split layout with a brand panel; the form block centred vertically in its half.
- [ ] Phone-only screens at desktop width: a centred 390 to 430px column on a tinted page (`--bg-subtle` or `--frame`), the column on `--surface` with `--r-xl` and `--shadow-pop`. No device frame.
- [ ] Public site header: one nav list (no link twice), and one primary call to action at the right ("Start free trial"); "Sign in" beside it as text.
- [ ] Labels: verb + object ("Send invoice"). Success reuses the verb ("Sent"). Footer: primary at the right on desktop, full width on top on phones.
- [ ] Never disable Save or Submit before an attempt. Pending: keep the width, show "Saving…", block double submit.
- [ ] Undo beats confirm for reversible actions. Confirm only irreversible ones, naming the object.

## Forms

- [ ] A visible label above every field, no colon; hint between label and field; "(optional)" on the few optional fields.
- [ ] Width matches the answer: postcode 8ch, CVC and expiry equal widths, names and email up to 480px; fields on one row share a height.
- [ ] One column. Two or three fields on a row only for one value.
- [ ] `autocomplete`, `type` and `inputmode` on every personal field; `inputmode="numeric"` for codes and cards, never `type="number"`.
- [ ] Validate on submit: error summary at the top with links, focus moved to it, messages above each field, input kept.
- [ ] Errors say what is wrong and how to fix it.
- [ ] Password with a Show toggle, no confirm field. Checkboxes and radios inside their label.
- [ ] 2 to 5 options: radios or segmented control. 6 to 15: select. More: combobox. Switches only for instant settings.

## Tables and lists

- [ ] Text left, numbers right, never centred. Rows 40 or 48px. Horizontal 1px dividers only.
- [ ] The first column names the row (customer, person, title) in weight 500 and links to detail.
- [ ] IDs quiet: muted plain text, `tabular-nums`, no chip, no box, no mono, never cut mid-string.
- [ ] Row actions live in a fixed-width trailing column: an icon menu or one short label, the same width on every row, never inside data cells. (Varying actions push into the amounts.)
- [ ] Long text truncates with an ellipsis and a `title`. Status as a text badge, `nowrap`.
- [ ] Count and range shown: "1–25 of 1,284". Sort arrow only on the sorted column.
- [ ] Under 640px tables become stacked rows, or scroll inside their own container with a cut-off next column. Never widen the page.
  ```css
  @media (max-width: 640px) {
    table.reflow thead { display: none; }
    table.reflow, table.reflow tbody, table.reflow tr, table.reflow td { display: block; }
    table.reflow tr { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 2px var(--s-3); padding: var(--s-3) 0; border-bottom: 1px solid var(--border); }
    table.reflow td { border: 0; padding: 0; height: auto; }
  }
  ```
- [ ] Charts: legend totals, axis labels, tooltips, the KPI and the last point come from one array.

## Components

- [ ] Badges and pills: `white-space: nowrap`, `flex-shrink: 0`, and room in their row.
- [ ] Count badges sit on an icon's top-right corner, offset outward, with a 2px ring in the surface colour. Never over the glyph.
- [ ] Tabs: at most 6, for peer views only. On phones, all tabs fit, or become a select or segmented control, or scroll with a visible edge fade and end padding so the cut is clearly deliberate.
- [ ] Icons from one set, one stroke, 16px inline, 20px in buttons and nav. Only where they speed recognition.
- [ ] Initials only for people and merchants. Tasks get icons, products a product glyph or tile.
- [ ] Third-party buttons (Apple Pay, Google Pay, PayPal, Google or Apple sign-in) in their brand form: their mark in inline SVG, their standard colours.
- [ ] Active nav item: `aria-current="page"`, `--accent-subtle`, weight 500. The page title matches the nav label.

## States and feedback

- [ ] Loading: nothing under 1 s, a skeleton matching the layout for 1 to 10 s, a progress bar with an estimate after. Never "No results" while loading.
- [ ] Empty: what the place is for, why it is empty, one action. On phones, any explaining example sits directly after that action, short.
- [ ] Error: what failed, whether data is safe, "Try again", a way to get help.
- [ ] Toasts for small reversible results, with Undo, `role="status"`. Never for errors that need action.

## Phone

- [ ] Every tap target 44 x 44px, including nav links, "View all", the skip link: `display: inline-flex; align-items: center; min-height: 44px`.
- [ ] Inputs 16px or more. Safe-area padding on bottom bars. No hover-only content.
- [ ] Labels and chips at least 8px apart, free to wrap.
- [ ] Closed drawers use `hidden` or `inert`. Visually hidden text uses `.sr-only` inside a positioned parent.

## Dark, motion, accessibility, copy

- [ ] Dark is a token swap. `color-scheme` on `:root`. Surfaces rise by lightness. No white islands.
- [ ] Transitions on named properties, 120 to 200 ms, only in answer to an action; off under `prefers-reduced-motion`.
- [ ] `:focus-visible` ring 2px. Landmarks, one `h1`, headings in order. Dialogs trap focus and close on Escape. Colour never the only signal.
- [ ] The user's words, no in-product marketing, no "Oops", no exclamation marks, real numbers in copy, correct plurals.
