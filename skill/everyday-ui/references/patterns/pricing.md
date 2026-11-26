# Pricing and plans

Job: let people see which plan fits them, what it costs in total, and how to start, without fine print surprises.
Not for: the checkout itself (use `checkout.md`).

## Layout skeleton

Desktop, public pricing or in-app plan page:
```
Plans and pricing (h1)
Pay monthly ( Monthly | Yearly  save 17% )       Prices in GBP, excl. VAT

+----------------+----------------+----------------+
| Starter        | Team (current) | Business       |
| For 1-3 people | Most teams     | Larger orgs    |
| £0             | £24            | £56            |
| per month      | per user/month | per user/month |
| [Start free]   | [Upgrade]      | [Contact sales]|
| Includes:      | Everything in  | Everything in  |
| - 3 projects   | Starter, plus: | Team, plus:    |
| - 1 GB storage | - Unlimited... | - SSO, audit   |
+----------------+----------------+----------------+

Compare all features (h2)
Table: features as rows grouped by topic, plans as columns, check or value per cell

Questions (h2)
4-6 real questions about billing, cancellation, VAT, seat changes
```
- 3 plans, at most 4. Equal-width columns, aligned rows: name, audience line, price, unit, button, features.
- Recommended plan marked with one quiet device: a "Recommended" badge, or a 2px accent border. Not a scaled-up card with a glow.
- Price 30 to 36px weight 600 tabular, unit 14px muted on its own line. Yearly shows the monthly equivalent and the yearly total.
- Feature lists: 4 to 7 items each, "Everything in Team, plus:" pattern, so lists do not repeat.
- Comparison table below: sticky plan header row, feature groups with h3 rows, values right or centre-aligned per cell type (checks centred, numbers right).

In-app upgrade: highlight the current plan ("Current plan" badge, button "Current plan" disabled-looking), show usage against limits ("2,840 of 3,000 invoices this month").

Public pricing pages use the public site header from `app-shell.md`: one nav list, one primary call to action at the right.

Phone: plans stack vertically, recommended first or current plan first. Billing toggle stays at top. The comparison table becomes one plan at a time: a segmented control or tabs with the plan names, and a two-column list of features and values for the chosen plan. Never a clipped table with a "scroll for more" hint. Badges such as "Save 17%" never wrap: `white-space: nowrap`, and the toggle row makes room for them.

## Density

Regular. The three plan columns with prices and buttons fit in the first desktop screen.

## Component inventory

Billing period segmented control, plan column, price with unit, plan badge, feature list with check icons, comparison table, usage meter, FAQ accordion, contact sales link, tax and currency note.

## Primary action placement

One button per plan. Only the recommended (or next-up) plan's button is filled accent; others are secondary. "Contact sales" for custom plans is secondary.

## States to build

Must for a one-page brief: monthly and yearly; current plan marked (in-app). Build the others only when the task names them.

- Monthly and yearly toggled.
- In-app with current plan marked and usage shown.
- Near limit: "You've used 2,840 of 3,000 invoices" with the upgrade button.
- Downgrade: confirm what will be lost ("Projects over 3 become read-only").
- Trial: "14 days left in your Team trial" with what happens at the end.
- Currency and tax note matching the visitor's region.

## Copy rules

- Plan names are short and ordered by size. Audience lines say who it is for.
- Price units are exact: "per user per month, billed yearly".
- Feature items are concrete: "Unlimited invoices", "SAML single sign-on", not "Advanced features".
- No "Most popular!!!", no fake strike-through prices.

## Common AI mistakes

- The middle card scaled up with a gradient border and a glow.
- Feature lists that repeat every item with a cross on lower plans.
- Prices without unit, period or tax note.
- Four filled primary buttons, one per plan.
- Rows not aligned across plans, so prices sit at different heights.
- Yearly saving shown only as a percentage, with no total.

## Checklist

- [ ] 3 to 4 plans, rows aligned, prices tabular with clear unit and period.
- [ ] One primary button, on the recommended or next-up plan.
- [ ] Yearly pricing shows the monthly equivalent and the yearly total.
- [ ] A comparison table exists for details; plan columns list only differences.
- [ ] At 390px plans stack and the comparison stays readable.

## Sources

- Baymard on price and cost transparency in checkout: https://baymard.com/research/checkout-usability
- Mobbin `search_sections` and Refero screens for current conventions (see `../references.md`).
- Vercel guidelines (currency formatting): https://vercel.com/design/guidelines
