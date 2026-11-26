# Empty, loading, error and edge states

Job: tell people what this place is, why nothing (or something wrong) is here, and the one next step.
Not for: whole onboarding flows (use `onboarding.md`). Every other pattern points here for its states.

## The kinds

Must for a one-page brief: first use; no results; error with retry (in context, inside the shell). Build the others only when the task names them.

| Kind | When | Content |
|---|---|---|
| First use | The user has never created any | What this place holds, why it helps, one action, an optional import or docs link |
| No results | Search or filters match nothing | Echo the query, suggest a fix, "Clear filters" |
| Cleared | Inbox zero, all tasks done | A short, calm confirmation; no action needed |
| No permission | The user cannot see this | Who can grant access, a "Request access" action |
| Loading | Data on the way | Nothing under 1 s, skeleton 1 to 10 s, progress with estimate over 10 s |
| Error | Load or save failed | What failed, whether data is safe, "Try again", a help link |
| Partial | One part failed | The rest of the screen works; an inline error in the failed panel |
| Offline | No connection | A banner; cached data marked; actions queued or disabled with reason |
| Not found (404) | Wrong link | Say the page does not exist, link to the parent and to search |
| Server error (500) | Our fault | Say it is a problem on our side, data is safe, try later, status page |

## Layout skeleton

Empty state inside a page or panel:
```
          [ 120-160px art from the product's own shapes, see brand.md ]
          No invoices yet (h2, 16-18px, weight 600)
          Invoices you create or import appear here.  (muted, max 48ch)
          [ Create invoice ]   Import from CSV
```
- Centred inside the area it replaces, vertically placed in the upper third, not the exact middle of a tall page.
- Keep the page header, tabs and toolbar visible around it, so the context stays.
- For no-results, keep the table header and filter bar; the message goes where rows would be.

Loading:
- Skeleton blocks match the final layout's sizes: text lines at 60 to 80% width, same row heights, `--bg-subtle` fill, a slow shimmer or none.
- `aria-busy="true"` on the region, and a visually hidden "Loading invoices" status.

Error:
```
Couldn't load invoices (h2)
The server didn't respond. Your data is safe.
[ Try again ]   Check status
```

Phone: same content, full width, 16px side padding, action full width.

## Density

Compact copy: a title, one sentence, one action. The area keeps the height it would have with content, so the page does not collapse.

## Component inventory

Empty state block, skeleton primitives (line, block, avatar, row), inline error, page error, banner (offline, degraded), 404 and 500 pages, request-access block.

## Primary action placement

One button, centred under the text in an empty state, or left-aligned in an inline panel error. The secondary option is a text link.

If the page header already has the same create action as a filled button, the empty-state button is secondary, or the header button hides while the page is empty. Never two filled buttons for one action. If an onboarding checklist shows on the page, its next task is the only filled button (`onboarding.md`).

## Composition on desktop

A first-use empty state on a 1440px screen is not a lone message in a blank canvas:
- Keep the app shell, the page header with its actions, and the tabs or filters, so the page has its real frame.
- Give the empty state body content: the art from `brand.md` (ghost rows of what will appear), a title, one sentence, the action, and a short row of 2 or 3 "ways to start" (Import a CSV, Connect Xero, Read the guide) as secondary links or small tiles.
- Or show a preview: the real table header with 3 ghost rows at 40% opacity, and the message over the first row.
- A full-page empty state (404, a new workspace) gets the logo, the art and a two-column composition: message and actions left, a product glimpse or help links right.

## Copy rules

- Title says the state plainly: "No invoices yet", "No results for 'harbor'", "You don't have access to Billing".
- The body says why or what next, in one sentence.
- Errors: no "Oops", no apology, no error codes as the headline (put the code in small text for support).
- No results: suggest the fix ("Check the spelling or remove a filter"), echo the query.

## Common AI mistakes

- "No data" in grey and nothing else.
- A giant illustration taking half the screen in a working tool.
- "No results" flashing while data loads.
- A full-page spinner instead of a skeleton.
- Skeletons that do not match the final layout.
- The empty state hides the page header and the create button.
- Error messages that do not say whether work was lost.

## Checklist

- [ ] First-use, no-results and error states are different, each with the right action.
- [ ] Loading never shows an empty or no-results message.
- [ ] Skeletons match the final layout in size and position.
- [ ] Errors say what failed, if data is safe, and offer a retry.
- [ ] Context (header, filters) stays visible around the state.

## Sources

- NN/g empty states: https://www.nngroup.com/articles/empty-state-interface-design/
- NN/g skeleton screens and loading thresholds: https://www.nngroup.com/articles/skeleton-screens/
- Primer empty states, loading and degraded experiences: https://primer.style/product/ui-patterns/
- GOV.UK page not found and service unavailable: https://design-system.service.gov.uk/patterns/page-not-found-pages/
- Atlassian empty state: https://atlassian.design/components/empty-state
