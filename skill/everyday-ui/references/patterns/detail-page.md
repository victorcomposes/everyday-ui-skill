# Detail page (record, profile, order)

Job: show everything about one object at a glance, its status first, and the actions that change it.
Not for: editing many fields at once (open `forms.md` as an edit page or inline edits), or lists of objects.

## Layout skeleton

Desktop:
```
Invoices / INV-2026-0412                                   (breadcrumb or back link)
INV-2026-0412 (h1)  [Overdue]                [Send reminder] [Edit] [...]
Harbour & Finch Ltd, due 2 Mar 2026, 12 days overdue
[Overview] [Activity] [Files 3]                            (tabs, only if needed)
+--------------------------------------------+----------------------------+
| Main (2/3)                                 | Side (1/3)                 |
| Line items (table)                         | Details                    |
|   Description        Qty   Price   Total   | Customer   Harbour & Fi... |
|   Consulting, March    8  £120.00 £960.00  | Issued     2 Feb 2026      |
|   ...                                      | Terms      Net 30          |
|                       Subtotal  £1,033.33  | Owner      (AO) Amara O.   |
|                       VAT 20%     £206.67  |                            |
|                       Total     £1,240.00  | Activity                   |
|                                            | 10:42 Reminder sent        |
|                                            | 2 Feb Invoice sent         |
+--------------------------------------------+----------------------------+
```
- Header: identifier as h1, status badge beside it, one summary line of the facts people need first, actions right.
- Main column holds the object's content (items, description, timeline). Side column holds properties as a description list (label muted left 40%, value right or below).
- Properties grouped under small h2s ("Details", "Billing"). Empty values say "Not set" with an edit link.
- Activity as a vertical timeline: time, actor, event, newest first, with a comment box if the product has comments.

Phone: header stacks (title, badge, summary, then a primary button full width and a "More" menu), side column moves below the main content, or becomes the first section if it holds the status people need.

## Density

Regular. Header and the first block of content visible without scrolling.

## Component inventory

Breadcrumb or back link, title with status badge, summary line, action group with overflow menu, tabs, description list, line-item table with totals, activity timeline, comment box, related objects list, inline edit, copy-to-clipboard for IDs.

## Primary action placement

The one action that moves the object forward ("Send reminder", "Approve", "Mark as shipped") is the filled button at the right of the header. Edit is secondary. Destructive actions sit in the overflow menu.

## States to build

Must for a one-page brief: default; a second status with its own primary action; not found. Build the others only when the task names them.

- Default with full data and a few "Not set" properties.
- Each status the object can have, with its own primary action (draft: "Send invoice", paid: no primary).
- Inline edit of one property: editing, saving, saved, error.
- Not found or deleted: "This invoice was deleted on 3 Mar by Amara Okafor" with a link back.
- No permission: read-only with the reason.
- Loading: header skeleton plus content skeleton.

## Copy rules

- The summary line states facts with numbers: "12 days overdue", not "Needs attention".
- Property labels are nouns, values are data. No "N/A".
- Activity in past tense, plain: "Reminder sent to accounts@harbourfinch.co.uk".

## Common AI mistakes

- Every property in its own card, or a grid of stat cards on top.
- Status shown only as colour.
- Four visible action buttons of equal weight.
- Long label-value rows where the value sits 600px from its label.
- Relative times only in the activity log.
- Copyable IDs without a copy action.

## Checklist

- [ ] Identifier, status and the key fact are in the first line of sight.
- [ ] One primary action, matching the object's status.
- [ ] Properties are a grouped description list with labels close to values.
- [ ] Empty properties are fixable; activity shows actor and time.
- [ ] At 390px the header stacks and the primary action is reachable.

## Sources

- Polaris resource details layout: https://polaris-react.shopify.com/patterns/resource-details-layout
- GOV.UK summary list: https://design-system.service.gov.uk/components/summary-list/
- NN/g tabs used right: https://www.nngroup.com/articles/tabs-used-right/
