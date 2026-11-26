# Dashboard

Job: answer "is everything all right, and what needs me now?" in under 10 seconds, then lead to the place to act.
Not for: exploring data in depth (a report or table page), or a marketing "overview" of features.

## Layout skeleton

Desktop:
```
Overview (h1)                         [Last 30 days v]  [Export]
3 invoices overdue, £4,812.40 total. Review overdue invoices   (needs-action strip, only if true)

Revenue        Outstanding     Overdue        Avg days to pay
£48,210.90     £12,904.00      £4,812.40      18 days
+8.2% vs Feb   −3.1% vs Feb    3 invoices     2 days slower
-------------------------------------------------------------- (one row, no cards, dividers)
+------------------------------------+-------------------------+
| Revenue by week (chart, 2/3)       | Needs attention (1/3)   |
| axis labels, units, period         | list of 5 items + link  |
+------------------------------------+-------------------------+
| Recent invoices (table, 8 rows, "View all invoices")         |
+--------------------------------------------------------------+
```
- Order by decision value: what needs action, then key numbers, then trend, then recent activity.
- KPI row: 3 to 5 metrics, no more. Each: label (muted 14px), value (24 to 30px weight 600 tabular), comparison with period ("vs Feb"), not just a percentage. Separate with space or vertical dividers, not one card each.
- 2-column grid below: 2/3 and 1/3, or 1/2 and 1/2. Panels with a title row (h2 16px weight 600 + "View all" link) and a 1px border or none.
- One time-range control for the whole page, top right.

Phone: KPIs as a 2 x 2 grid, then the needs-action list, then charts full width at 200 to 240px high, then recent items as a list.

## Density

Regular. The first desktop screen shows the KPIs, one chart and the needs-attention list without scrolling.

## Component inventory

Page header with time-range select, needs-action banner or list, KPI (label, value, delta, period), line or bar chart with axes and tooltip, ranked list (top customers, top pages), recent activity table, "View all" links, empty panel state.

## Primary action placement

Dashboards often have no primary create action. The main action is the needs-action strip's link ("Review overdue invoices"). If the product has a main create action, put it top right in the page header.

## States to build

Must for a one-page brief: populated; new account with empty panels; one panel errored. Build the others only when the task names them.

- Populated with plausible, noisy data and one honest negative trend.
- Loading: KPI skeletons the size of the values, chart area skeleton with axis space.
- New account, no data: each panel shows its own empty state, with one setup action at the top ("Connect your bank to see revenue").
- Partial data: one panel errored ("Couldn't load payouts. Try again") while others show.
- Nothing needs action: the needs-action strip says so in one muted line, or disappears.
- Stale data: "Updated 2 hours ago" with a refresh action.

## Copy rules

- KPI labels are plain nouns: "Outstanding", not "Total Outstanding Amount Metric".
- Deltas say compared to what: "+8.2% vs February".
- Do not colour a delta green or red unless up is clearly good or bad for this metric (rising costs are bad).
- Chart titles say what and when: "Revenue by week, last 12 weeks".

## Common AI mistakes

- Four identical KPI cards with icons in coloured tiles, big numbers and green "+12.5%" sparklines.
- A "Welcome back" hero with an illustration.
- Charts with perfect curves, no axes, no units, rainbow series.
- Donut charts for more than 4 categories.
- Every panel a shadowed card in a uniform grid of the same height.
- Data that does not add up across panels.
- Time range control on every panel, each set differently.

## Checklist

- [ ] What needs action is above the fold and links to where to act.
- [ ] 3 to 5 KPIs, each with label, value, period and comparison.
- [ ] Charts have labelled axes, units and a period; series use at most 3 colours.
- [ ] Numbers agree across KPIs, charts and tables.
- [ ] Each panel has an empty, loading and error state.
- [ ] No KPI card grid with icon tiles.

## Sources

- NN/g dashboards and preattentive attributes: https://www.nngroup.com/articles/dashboards-preattentive/
- Primer data visualisation: https://primer.style/product/ui-patterns/data-visualization
- shadcn/ui dashboard block: https://ui.shadcn.com/blocks
- OpenAI frontend guidance (start with the working surface): https://developers.openai.com/api/docs/guides/frontend-prompt
