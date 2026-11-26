# Search, filters and results

Job: get people from a half-remembered word to the right item fast, and recover when nothing matches.
Not for: browsing a known list with light filtering (that is the toolbar in `data-table.md` or `lists.md`).

## Layout skeleton

Results page (desktop):
```
[ Search: harbour finch                          x ]  [Search]
Filters (240px)      | 23 results for "harbour finch"     Sort: Relevance v
Type                 | [Invoices x] [Last 90 days x]  Clear all
[x] Invoices 14      |------------------------------------------------
[ ] Customers 6      | INV-2026-0412  Overdue                £1,240.00
[ ] Contacts 3       | **Harbour** & **Finch** Ltd, due 2 Mar
Date                 |------------------------------------------------
( ) Any time         | Harbour & Finch Ltd   Customer
(•) Last 90 days     | 14 invoices, £18,204.50 lifetime
Status               |------------------------------------------------
...                  | ... 10 to 20 results, then pagination
```
- Search field 40px, full content width up to 720px, with a clear button and a visible submit or instant results.
- Facets left (240px) with counts; applied filters as removable chips above results, plus "Clear all".
- Result rows show the matched words in bold (not yellow highlight), the object type, and 1 or 2 key fields.
- Group mixed result types by type with a "See all 14 invoices" link, or show a type filter.

Command palette (Ctrl or Cmd K):
```
+------------------------------------------------+
| [ Type a command or search...               ]  |
| Recent                                         |
|   INV-2026-0412  Harbour & Finch Ltd           |
| Actions                                        |
|   New invoice                         N        |
|   Go to settings                      G S      |
+------------------------------------------------+
```
- 560 to 640px wide, near the top of the viewport, keyboard-first, results grouped, shortcut hints right-aligned.

Phone: search is a full-screen view; filters open in a bottom sheet with "Show 23 results" as its button; applied filters as a horizontal chip row.

## Density

Regular. 8 to 10 results above the fold on desktop.

## Component inventory

Search input with clear and submit, suggestions dropdown (recent, suggested, matching), facet groups with counts, filter chips, sort select, result row by type, result count, pagination, no-results block, command palette, keyboard hints.

## Primary action placement

The search field itself is the primary control. No filled button competes with it; the submit button, if present, is secondary or an icon inside the field.

## States to build

Must for a one-page brief: results; no results; empty query with recent searches. Build the others only when the task names them.

- Empty query: recent searches and suggested destinations, not a blank page.
- Typing: suggestions after 2 characters, debounced, keyboard navigable with `aria-activedescendant`.
- Results with highlights and counts.
- No results: echo the query, suggest a spelling fix ("Did you mean harbour?"), offer to clear filters or search all types.
- Too many filters: zero results caused by filters, with the filter that removes most named.
- Loading: keep previous results dimmed with a thin progress bar, not a blank list.
- Error: "Search isn't working right now. Try again."

## Copy rules

- Placeholder names what can be searched: "Search invoices, customers and contacts".
- The count line echoes the query exactly: 23 results for "harbour finch".
- No-results text gives a next step, not a mood.

## Common AI mistakes

- A search icon in the corner that opens nothing.
- Filters with no counts, and no way to see what is applied.
- Results that do not say what type each item is.
- A blank page for an empty query.
- Clearing all results while new ones load.
- Highlighting with a bright yellow background.

## Checklist

- [ ] The query, the result count and the applied filters are visible together.
- [ ] Matches are emphasised in each result; each result shows its type.
- [ ] Empty query, no results and loading are designed.
- [ ] Suggestions work with the keyboard.
- [ ] At 390px filters open in a sheet that shows the result count on its button.

## Sources

- Apple HIG searching: https://developer.apple.com/design/human-interface-guidelines/searching
- NN/g filters versus facets: https://www.nngroup.com/articles/filters-vs-facets/
- Primer progressive disclosure: https://primer.style/product/ui-patterns/
