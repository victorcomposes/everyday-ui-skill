# Data table

Job: let people scan, compare, find and act on many records of the same kind.
Not for: a handful of unlike items (use a list or a detail page), or a feed people read in order (use `lists.md`).

## Layout skeleton

Desktop:
```
Invoices (h1)  1,284 invoices ...................... [Export] [New invoice]
[All] [Open 212] [Overdue 3] [Paid] [Draft]                 (view tabs)
[ Search invoices...     ] [Status v] [Customer v] [Date v]  Clear filters
+---+---------------+--------------------------+------------+--------+-----+
| o | Invoice       | Customer                 |     Amount | Due    | ... |
+---+---------------+--------------------------+------------+--------+-----+
| o | INV-2026-0412 | Harbour & Finch Ltd      |  £1,240.00 | 2 Mar  | ... |
|   | [Overdue]     |                          |            |        |     |
+---+---------------+--------------------------+------------+--------+-----+
1-25 of 1,284                                   Rows 25 v   < 1 2 3 ... 52 >
```
- Toolbar on one line: search (240 to 320px), filter dropdowns or chips, "Clear filters". View tabs or a segmented control above it for saved views with counts.
- IDs are secondary: muted plain text with `tabular-nums`, no chip, no box, no mono, never truncated mid-string. The row's name (customer, person, title) is the link in weight 500.
- Columns: checkbox 40px, name or identifier (link, weight 500), 3 to 6 data columns, a fixed-width trailing actions column (48px for an icon menu, or one short label of the same width on every row). Row actions never sit inside data cells. Widest column gets the most text, not equal widths. People and merchants may carry a 24px initials mark when it helps scanning; other entities get an icon or nothing.
- Header row: 12 to 14px weight 500 `--text-muted`, `--bg-subtle` background or none, sticky on scroll.
- Row: 40px compact or 48px regular, 1px bottom divider, hover `--bg-subtle`, selected `--accent-subtle`.
- The table sits directly on the page, full content width. A 1px border with `--r-lg` around it is fine. No card with a shadow, no card around the toolbar.

View tabs on phones: all tabs fit, or become a select or segmented control, or scroll with a visible edge fade and end padding.

Phone (mandatory under 640px, `ui-check` tests it):
- Default: each row becomes a list item: line 1 identifier and the key number right-aligned, line 2 customer and status badge, full row tappable (min 56px).
- Or, for tables people compare across: the table scrolls inside its own `overflow-x: auto` container with the first column sticky and the next column visibly cut off, so the scroll is obvious.
- Never: a table that widens the page, or a parent with `overflow: hidden` that clips columns. Reflow CSS in `../craft.md`, section Tables and lists.
- Filters collapse into one "Filters (2)" button opening a sheet. Search stays visible.

## Density

Compact to regular. Body 14px. At 1440 x 900 show at least 12 to 15 rows above the fold.

## Component inventory

Page header with count, view tabs, search input, filter menus or chips, active-filter chips with remove, table with sortable headers, row checkbox, status badge, row action menu, bulk action bar, pagination with page size, column visibility menu (optional), empty and no-results states, skeleton rows.

## Primary action placement

"New <object>" at the right of the page header. Row actions in a kebab menu at the row end, or one text action. Bulk actions appear in a bar that replaces the toolbar when rows are selected: "3 selected", actions, "Clear selection".

## States to build

Must for a one-page brief: populated; no results for filters; first-use empty. Build the others only when the task names them.

- Populated, 25 rows, mixed statuses, one long customer name truncated with title, one empty cell.
- Loading: header stays, 8 to 10 skeleton rows of the same height and column widths.
- Empty, first use: no table header; an empty state with one line, one action ("Create your first invoice") and an import link.
- No results for filters: table header stays, one row area says "No invoices match these filters" with "Clear filters".
- Error loading: inline message in the table area with "Try again"; filters stay.
- Selection: some rows checked, bulk bar visible, header checkbox indeterminate.
- Stress: 1,284 rows paginated, long text, missing values, huge amounts.

## Copy rules

- Column headers are short nouns with units: "Amount (GBP)", "Last seen".
- Counts with real numbers: "1,284 invoices", "Overdue 3".
- Status words are states, not actions: "Overdue", "Paid".
- Empty cells: muted en dash, not "N/A" or "null".

## Common AI mistakes

- Centred cells, or numbers left-aligned.
- Status shown as coloured text or dots with no label.
- Every row with 3 or 4 visible icon buttons.
- Row actions of different widths ("Send reminder" next to "View"), so the column wobbles. Fix the column width.
- A header count ("36 overdue") that does not match the rows and the pagination.
- Table wrapped in a shadowed card, with the toolbar in another card.
- Zebra stripes plus borders plus hover, all at once.
- 5 rows of demo data, so density never shows.
- Pagination with no total, or "Load more" on admin tables where people need position.
- The 7-column table squeezed at 390px with 10px text.

## Checklist

- [ ] Numbers right-aligned with tabular figures, headers aligned like their columns.
- [ ] The identifier column links to the detail page.
- [ ] Search, filters and the result count sit above the table; active filters are visible and clearable.
- [ ] Loading, empty, no-results and error states are distinct.
- [ ] Bulk selection shows a count and its actions.
- [ ] At 390px rows become list items or scroll inside their container; nothing overflows the page.

## Sources

- Matt Strom, designing tables: https://mattstromawn.com/writing/tables/
- GOV.UK table: https://design-system.service.gov.uk/components/table/
- NN/g data tables: https://www.nngroup.com/articles/data-tables/
- Atlassian dynamic table: https://atlassian.design/components/dynamic-table
- Polaris resource index: https://polaris-react.shopify.com/patterns/resource-index-layout
