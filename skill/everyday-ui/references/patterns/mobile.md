# Mobile screens

Job: let people do the one thing they opened the app for, one-handed, in short bursts, on a small screen.
Not for: shrinking a desktop page. Use this with the screen's own pattern file.

## Layout skeleton

Phone (390 x 844):
```
+----------------------------------+
| status bar (safe area top)       |
| Title (large, 28-34px) or        |
| < Back   Title (17px)    Action  |  nav bar 44-56px
|----------------------------------|
| [ Search                      ]  |
| Section header (13px muted)      |
| Row 56px: icon  Title      Value>|
| Row 56px: icon  Title      Value>|
| ...                              |
|                                  |
|        [ Primary action ]        |  sticky bottom, full width minus 16px
|----------------------------------|
| Home  Invoices  Clients  More    |  tab bar 49-56px + safe area
+----------------------------------+
```
- Side padding 16px. Content in one column.
- Top bar: large title on root screens, compact title with back button on pushed screens. At most 2 actions, as 44px icon buttons with `aria-label`.
- Bottom tab bar: 3 to 5 destinations, icon plus label, active in accent. Never 6 or more.
- Lists: rows 48 to 72px, full-width tap target, chevron only when the row pushes a new screen. Inset grouped sections for settings-like screens.
- Primary action: a sticky bottom button for forms and checkout, a top-bar action for "Add" on lists, or a floating button only if the product already uses one.
- Sheets for filters, pickers and short tasks: rounded top corners 12 to 16px, a grab handle, a title row with Cancel and Done or a bottom primary button.

Tablet and larger: list-detail side by side (see `lists.md`).

Phone-only screens shown at desktop width (the task is an app screen, but it renders at 1440): one centred column 390 to 430px wide on a `--bg-subtle` page, the column on `--bg` with a 1px `--border` and `--r-xl` corners. No fake device frame, notch or status bar art. The tab bar and sticky buttons stay inside the column (`position: sticky` in the column, not `fixed` to the window).

## Density

Comfortable. Body 16 to 17px, secondary 13 to 15px, controls 44px or more, 8px or more between targets.

## Component inventory

Top bar (large title, back, actions), tab bar, list rows, grouped sections, search field, segmented control, bottom sheet, action sheet, sticky bottom button, pull to refresh, swipe actions, toasts above the tab bar, empty states.

## Primary action placement

In the thumb zone: bottom of the screen. One full-width primary button with 16px side margins and the safe-area padding below. Secondary actions as text buttons above it or in the top bar.

## States to build

Must for a one-page brief: default with scrolling content; empty; sheet open. Build the others only when the task names them.

- Default with real content filling more than one screen, so scrolling and sticky bars show.
- Scrolled: large title collapses, top bar gains a bottom border.
- Keyboard open on a form: the active field and the button stay visible.
- Sheet open over the list.
- Empty, loading (skeleton rows), offline banner, error with retry.
- Swipe action revealed on one row, with the same action available in the row's detail.

## Copy rules

- Titles 1 to 3 words. Tab labels 1 word.
- Buttons short: "Save", "Send invoice". Never truncated with an ellipsis.
- Use platform words: "Done", "Cancel", "Edit" in navigation.

## Common AI mistakes

- The desktop layout squeezed: sidebar, multi-column grids, tiny text.
- Tap targets under 44px, icons crammed in the top bar.
- A hamburger menu where a tab bar fits.
- Fixed bottom elements without safe-area padding.
- `100vh` layouts that hide the bottom button under the browser toolbar.
- Hover tooltips holding needed information.
- Horizontal scroll of the whole page.

## Checklist

- [ ] No sideways scroll; every target at least 44 x 44px.
- [ ] Navigation is a tab bar of 3 to 5 items, or a back button on pushed screens.
- [ ] The primary action sits in the thumb zone and clears the safe area.
- [ ] Inputs are 16px or larger with the right keyboard type.
- [ ] Bottom bars use `env(safe-area-inset-bottom)`; layouts use `100dvh`.

## Sources

- Android canonical layouts: https://developer.android.com/develop/ui/compose/layouts/adaptive/canonical-layouts
- Apple HIG tab bars and layout: https://developer.apple.com/design/human-interface-guidelines/tab-bars , https://developer.apple.com/design/human-interface-guidelines/layout
- WCAG 2.2 target size: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- Vercel guidelines (16px inputs, 44px targets): https://vercel.com/design/guidelines
