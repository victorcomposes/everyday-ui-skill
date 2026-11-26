# Craft

The details that separate a good product screen from a great one. Each line is a rule, then why.

## Type and numbers

- `font-variant-numeric: tabular-nums` on tables, totals, timers, prices and counters. Why: digits line up and numbers do not jiggle when they change.
- Right-align money, counts and percentages in tables, and right-align their headers. Why: people compare magnitude by the right edge.
- One decimal rule per column: money 2 places (or 0 for whole amounts, never mixed), percentages 0 or 1. Why: mixed precision reads as different magnitudes.
- Currency symbol or code once: in the header (`Amount (GBP)`) or on every value, not both. Why: repetition is noise, absence is ambiguity.
- Thousands separators from 1,000 up. Abbreviate (12.4k, 1.2M) only in KPIs and charts, with the exact value in a tooltip or detail. Why: tables are for exact values, summaries for scale.
- Negative money uses a true minus `−` or the locale format, not red alone. Why: colour is lost in print, for colour-blind users and in dark mode.
- Dates: relative for the last 7 days ("2 hours ago", "Yesterday"), absolute after ("12 Mar 2026"), full timestamp in a `title` or `<time datetime>`. Why: recent things matter by age, old things by date.
- Use `Intl.NumberFormat` and `Intl.DateTimeFormat`. Why: the locale gets separators, symbols and order right.
- Labels are lighter than values: label `--text-muted` 12 to 14px, value `--text` at the same size or larger. Why: the eye should land on the data, not the scaffolding.
- Headings get more space above than below. Why: the heading belongs to the content under it.
- Sentence case for titles, buttons, tabs and labels. Why: easier to read, and Title Case Everywhere reads as a template.
- `text-wrap: balance` on headings, `text-wrap: pretty` on short paragraphs. Why: no single orphan word on the last line.
- Never set text under 12px, and never set body text under 14px. Why: legibility, and the checker fails it.

## Layout and spacing

- Spacing from the 4px scale only. Inside a group 4 to 12px, between groups 24 to 48px. Why: the ratio is what shows grouping.
- One left edge for the main column: title, filters, table, form fields. Why: ragged left edges are the clearest sign of a careless layout.
- `min-height: 100dvh` for full-height shells. Why: `100vh` is taller than the visible area on mobile browsers, so bottom bars hide under the toolbar.
- Sticky table headers and sticky action bars use `position: sticky` with a background and a bottom border or shadow that appears when scrolled. Why: content behind a transparent sticky bar is unreadable.
- `scroll-margin-top` equal to the sticky header height on anchored sections. Why: jump links otherwise land under the header.
- `scrollbar-gutter: stable` on scroll containers that load content. Why: the layout does not shift when a scrollbar appears.
- Give images, avatars, charts and skeletons fixed dimensions or `aspect-ratio`. Why: no layout shift when content arrives.
- `min-width: 0` on flex and grid children that hold text. Why: without it, long text pushes the layout wider instead of truncating.
- Use `gap` for spacing between siblings, not margins on children. Why: no stray margin on the last item.
- Max widths: forms 560 to 640px, reading 65ch, app content 1200 to 1280px. Why: very long lines and very wide fields slow people down.
- Empty space on wide screens goes to the side, not between a label and its value. Why: a label 600px from its value is hard to pair.

## Composition

- Full-height shells: the grid fills the page, the sidebar column carries the background, and only the inner nav is sticky. Why: a `100vh` box with a background stops at the first screen on a long page, and full-page screenshots show the cut.
  ```css
  .shell { display: grid; grid-template-columns: var(--w-sidebar) minmax(0, 1fr); min-height: 100dvh; }
  .shell > aside { background: var(--frame); border-right: 1px solid var(--border); }  /* stretches with the page */
  .shell > aside > nav { position: sticky; top: 0; height: 100dvh; overflow-y: auto; }   /* no background here */
  ```
- Small-content screens on desktop (sign-in, sign-up, onboarding steps, confirmations): split the canvas. A brand panel of 40 to 50% with the logo, a concrete headline and a product glimpse, and the task column beside it. Why: a 400px form alone in a 1440px page reads as unfinished.
- Empty states inside the app keep the shell, the page header and its actions around them. Why: context tells people where they are and what fills this place.
- Every action sits in the header row of its page or inside the card or section it acts on. Why: a floating button has no clear object.
- Side rails (order summary, detail properties, filters) are 320 to 400px, sized for their content. Product names wrap to 2 lines at most. Why: a squeezed rail wraps names to 4 lines and looks broken.
- Short text (a name, a label, a button) never wraps to 3 or more lines. Widen the column, truncate with a tooltip, or move the item. Why: tall narrow text blocks are the clearest sign of a squeezed layout.
- Fixed width for action columns and button groups that repeat per row (`width: 1%` plus `white-space: nowrap`, or a fixed px width). Why: mixed-width actions make the column wobble.
- Fields on one row share the same height and line up. Pairs with the same answer length get the same width (expiry and security code both 8ch). Why: ragged rows look accidental.
- Entity marks: customers, products and projects get a tinted initial tile or a meaningful domain glyph, never a generic image placeholder icon. Why: placeholders say "unfinished".
- Phone-only screens at desktop width: one centred 390 to 430px column on a `--bg-subtle` page, with no fake device frame. Why: the screen is shown at its real size without pretending to be hardware.

## Forms

- Visible label above every field, sentence case, no colon. Why: placeholders vanish on typing and fail contrast.
- Hint text sits between the label and the field, linked with `aria-describedby`. Why: people read it before they type.
- Field width matches the expected answer: postcode 8ch, CVC 4ch, phone 16ch, email and names full width up to 480px. Why: the width tells people what to enter.
- One column. Put 2 or 3 fields on one line only when they form one value (expiry month and year, first and last name on desktop). Why: multi-column forms get fields skipped.
- `autocomplete` on every personal field: `name`, `given-name`, `family-name`, `email`, `tel`, `street-address`, `postal-code`, `country`, `cc-number`, `cc-exp`, `cc-csc`, `username`, `current-password`, `new-password`, `one-time-code`, `organization`. Why: autofill finishes forms in seconds.
- Right `type` and `inputmode`: `type="email"`, `type="tel"`, `inputmode="numeric"` for codes and card numbers (not `type="number"`). Why: the right phone keyboard, and no spinner or scroll-wheel changes on IDs.
- `spellcheck="false"` and `autocapitalize="off"` on emails, usernames, codes. Why: the phone does not "correct" them.
- Mark optional fields "(optional)". Do not mark required ones with red asterisks. Why: most fields are required, so marking the exception is quieter.
- Validate on submit. Then show an error summary at the top with links to each field, move focus to it, and put each message above its field in `--danger`. Why: GOV.UK testing found this works for the most people.
- Errors say what is wrong and how to fix it: "Enter a date in the past", not "Invalid input". Why: the user needs the next step, not the diagnosis.
- Keep the user's input after an error. Why: retyping is the most hated form failure.
- Keep the submit button enabled until submit, then show a pending label ("Saving…") and block double submit. Why: a disabled button gives no reason, a silent one gets clicked twice.
- Password fields have a show and hide toggle. No confirm-password field. Why: the toggle catches typos better than retyping.
- Checkbox and radio inputs sit inside their `label`, and the whole row is the target. Why: a 16px box is too small to hit.
- Choose the control by count: 2 to 5 options use radios or a segmented control, 6 to 15 a select, more a searchable combobox. Why: visible options are faster when few.
- Toggle switches only for settings that apply at once. Use a checkbox for anything that waits for a Save. Why: a switch promises an immediate effect.

## Tables and lists

- Text left, numbers right, never centred. Header alignment follows the column. Why: alignment is how people scan columns.
- Row height 40px compact, 48px regular. Horizontal dividers only, 1px `--border`, no vertical lines, no zebra unless rows are very wide. Why: light rules keep the data in front.
- The first column is the identifier and the link to detail, in `--text` weight 500. Why: it tells people what each row is and where to click.
- Truncate long text with an ellipsis and put the full value in `title` or a tooltip. Set a `max-width` per column. Why: one long name must not reshape the whole table.
- Status as a badge with text. Why: scannable and readable without colour.
- Row actions: one visible text action or a kebab menu at the right end. Why: a row of five icon buttons is noise.
- Bulk select checkbox in the first column. A bulk bar replaces the toolbar when rows are selected and says "3 selected". Why: bulk actions belong to the selection.
- Show the total count and the range: "1–25 of 1,284". Why: people need scale before they filter.
- Sorting: clickable headers with `aria-sort` and one arrow on the sorted column only. Why: arrows on every column are noise.
- Under 640px every table changes form. Default: each row becomes a stacked item (title and key value on line one, meta and status on line two, the whole item a 44px+ target). Alternative for comparison tables: scroll inside its own `overflow-x: auto` container with the first column sticky and the next column visibly cut off. Never let a table widen the page or clip columns. Why: a 7-column table squeezed into 390px is unreadable, and a clipped one hides data.
  ```css
  @media (max-width: 640px) {
    table.reflow thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
    table.reflow, table.reflow tbody, table.reflow tr, table.reflow td { display: block; }
    table.reflow tr { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 2px var(--s-3); padding: var(--s-3) 0; border-bottom: 1px solid var(--border); }
    table.reflow td { border: 0; padding: 0; height: auto; }
  }
  ```

## Actions and buttons

- One primary button per view: filled accent. Others are secondary (outline or subtle fill) or tertiary (text). Destructive is red text or red outline until the confirm step. Why: hierarchy tells people what to do next.
- Button labels are verb + object: "Save changes", "Invite member", "Delete project". Never "Submit", "OK", "Yes". Why: the label is the promise.
- The success message reuses the verb: "Publish" leads to "Published". Why: consistent words build trust.
- Footer button order: primary at the right end of a dialog or form footer on desktop, full width and on top on phones. Cancel next to it as secondary. Why: platform convention and thumb reach.
- Icon-only buttons get `aria-label` and a tooltip, and are 32px (desktop) or 44px (touch). Why: icons are ambiguous and small targets are missed.
- Pending state: keep the width, show a small spinner and a present-tense label. Why: the button must not jump.
- Disabled buttons say why, in nearby text or a tooltip. Why: a dead button with no reason is a dead end.

## Feedback and states

- Under 1 s: show nothing. 1 to 10 s: a skeleton that matches the final layout for a page, a spinner for one panel. Over 10 s: a progress bar with an estimate. Why: NN/g thresholds, and flashing loaders feel slower.
- Skeletons copy the real layout exactly. Why: a skeleton that does not match causes a jump.
- Never show "No results" while loading. Why: it lies.
- Empty state: what this place is for, why it is empty, one action. Why: the empty screen is the first lesson.
- Error state: what failed, whether data is safe, one recovery action ("Try again"), and a way to get help. Why: people need to know if they lost work.
- Success: a toast for small reversible actions ("Invoice archived. Undo"). A page or banner for big outcomes (payment done). Why: weight of feedback matches weight of action.
- Toasts: bottom left or bottom centre, 4 to 6 s, pause on hover, `role="status"`, never for errors that need action. Why: an error that disappears cannot be fixed.
- Undo beats confirm for reversible actions. A confirm dialog only for destructive actions that cannot be undone. Why: confirm dialogs get clicked through by habit.
- Optimistic updates for small, safe changes (toggle, star, rename), with rollback and a message on failure. Why: the interface feels instant.
- Unsaved changes: show a sticky save bar or "Unsaved changes" text, and warn on leave. Why: lost edits are the worst outcome.

## Navigation

- The current page is marked in the nav with `aria-current="page"`, the accent-subtle background and weight 500. Why: people need to know where they are.
- Page title matches the nav label. Why: the click and the result use the same word.
- Breadcrumbs only for hierarchy deeper than two levels. Why: two levels need only a back link.
- Tabs for peer views of the same object, at most 6, never for steps. Why: tabs imply free switching.
- Phone navigation: a bottom tab bar of 3 to 5 items for apps, a menu sheet for sites. Why: thumbs reach the bottom.

## Icons and images

- One icon set (the project's, or Lucide). One stroke width. 16px inline with 14px text, 20px in buttons and nav, 24px only as a standalone. Why: mixed sets and sizes look patched together.
- Icons sit on the text's optical centre: `display: inline-flex; align-items: center; gap: 8px`. Why: a 1px drop is visible.
- Icons only where they speed recognition (nav, status, file types, actions people repeat). No icon on every heading or field. Why: decoration icons dilute the useful ones.
- Avatars: real image or initials on a neutral tint, a consistent size per context (24 in tables, 32 in lists, 64 in profiles). Why: random photos look fake, mixed sizes look broken.
- Decorative images get `alt=""`. Content images get alt text that says what the image shows. Why: screen readers.

## Mobile

- Every tap target at least 44 by 44px, with 8px between targets. This includes nav links, "View all" links, the skip link and links in toolbars: `display: inline-flex; align-items: center; min-height: 44px`. Only links inside running text are exempt. Why: fingers are not cursors.
- Adjacent labels, chips and values keep at least 8px apart on phones and may wrap to a new line. Why: touching labels read as one word.
- Closed drawers, sheets and menus use `hidden`, `inert` or `visibility: hidden`, not only a transform off screen. Why: off-screen links still take keyboard focus and still count as tap targets.
- Visually hidden text uses the `.sr-only` pattern from `tokens.md` (1px box, `clip-path: inset(50%)`), never a large negative offset. Why: offset text widens the page on phones.
- Inputs at least 16px font size. Why: iOS zooms the page on smaller fields.
- Respect safe areas: `padding-bottom: env(safe-area-inset-bottom)` on bottom bars. Why: the home indicator covers content.
- Primary actions in a sticky bottom bar on long forms and checkout. Why: thumb reach and always visible.
- No hover-only content. Why: there is no hover on touch.
- Horizontal scroll only inside a container that shows it scrolls (cut-off item, edge fade). Why: hidden overflow is never found.

## Dark mode

- Dark is a token swap, not a filter. Every colour comes from tokens, so dark comes free. Why: hand-tuned dark screens drift.
- Raise surfaces by lightness, not shadow: bg < subtle < surface < popover. Why: shadows barely show on dark.
- Set `color-scheme` on `:root`. Why: native inputs, selects and scrollbars follow the theme.
- Lighten the accent and status colours in dark (they are in the token block). Why: saturated mid-tones vibrate on dark grounds and fail contrast.
- Check images and charts: no white boxes, chart grid lines from `--border`. Why: one white island ruins the screen.

## Motion

- Transitions on named properties only (`background-color`, `border-color`, `opacity`, `transform`), 120 to 200 ms, ease-out. Why: `transition: all` animates layout and feels sluggish.
- Motion only answers a user action: open, close, expand, confirm, reorder. Why: ambient motion distracts from work.
- Under `prefers-reduced-motion: reduce`, replace movement with an instant change or a fade. Why: motion can make people ill.

## Accessibility floor

- Visible `:focus-visible` ring: 2px outline in `--focus`, 2px offset, never removed without a replacement. Why: keyboard users must see where they are.
- Landmarks: `header`, `nav`, `main`, `aside`, `footer`. One `h1`. Headings in order. Why: screen reader navigation.
- Live regions: `role="status"` for toasts and saved states, `role="alert"` for blocking errors only. Why: announcements without stealing focus.
- Dialogs trap focus, close on Escape, return focus to the trigger, and use `aria-labelledby`. Use `<dialog>` where you can. Why: keyboard and screen reader users get stuck otherwise.
- Colour is never the only signal. Why: 1 in 12 men has a colour vision deficiency.
- Contrast: text 4.5:1, large text 3:1, field edges and focus rings 3:1, in both themes. Why: WCAG 2.2 AA.

## Copy

- Name things as the user does: "Notifications", not "Webhook config". Why: the user's words are the interface.
- No in-product marketing: no "Supercharge", "Seamless", "Unlock", "Powerful". Why: people are already here to work.
- No "Oops", no apology, no exclamation marks. Why: calm, exact words are trusted.
- Empty and error text: one sentence of status, one of next step, one button. Why: short text gets read.
- Use real numbers in copy: "3 invoices overdue", not "Some invoices need attention". Why: specific beats vague.
- Pluralise correctly: "1 member", "2 members". Use `Intl.PluralRules` when the count varies. Why: "1 members" is the classic tell of a careless build.
