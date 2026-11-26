# Fixtures

Real-looking data is the cheapest big win on a product screen. Put all sample data in one module and render from it, so states and numbers stay consistent.

## Principles

1. **Domain first.** Write data for this product's user: a dental clinic's appointments, a freight company's shipments, a household's bank account. Never "Item 1", Lorem, "John Doe", "Jane Smith", "Acme" or `example@email.com`.
2. **Typical by default.** The default view shows believable data: a realistic mix of statuses (mostly fine, one or two needing action) and at most one naturally long value. Nothing that looks like a bug: no one-letter names, missing names, huge numbers, cut IDs.
3. **Hostile only in `?state=stress`.** Long and missing values, zero and huge numbers, many rows, singular counts. Build it, check it, never make it the default.
4. **Choose the story, derive the rest.** Pick the headline numbers by hand so the story is honest, with one metric moving the wrong way (revenue +8.2%, days to pay 2 days slower). Derive every row, chart point, count, badge and total from the data in code. Never type a count by hand.
5. **Everything agrees.** A header count describes the whole dataset, and pagination says how many rows show ("1-25 of 36"). Statuses follow dates and a fixed `TODAY` ("Overdue" means due before today and unpaid). Line items add up to the total, to the penny. Chart legends, axes, tooltips and KPIs come from the same array.
6. **Enough of it.** Tables show at least 25 rows when the real product would. Sidebars have 6 to 9 items. Charts have 30 to 90 points with plausible noise and one dip.
7. **Invented, never real.** Invented people and companies, emails on `example.com` or invented domains, phone numbers from reserved ranges (UK `07700 900xxx`, US `555-01xx`).

## Stress values to draw from

| Data | Stress cases |
|---|---|
| Names | a very long double-barrelled name; a single name; no name (show the email) |
| Money | £0.00; a refund −£312.40; £1,284,900.50; a missing amount |
| Counts | 0; 1 (singular copy); 12,480 |
| Text | empty; 2,000 characters; a URL with no spaces |
| Dates | today; in the future; 4 years ago; missing |
| Lists | 0 rows; 1 row; 1,284 rows (paginate) |

## Empty values

- Tables: a muted en dash `–` with `aria-label="None"`, or a word ("Not set", "Never") when absence means something.
- Detail views: "Not set" plus an edit link.
- Never "null", "undefined", "NaN", "Invalid Date" or a blank where a value belongs.

## One short example

```js
const TODAY = new Date('2026-03-14T10:30:00Z');
const invoices = [
  { id: 'INV-2026-0412', customer: 'Harbour & Finch Ltd', amount: 1240.00, due: '2026-03-02', paid: false },
  { id: 'INV-2026-0413', customer: 'Bramwell Dental Group', amount: 86.50, due: '2026-03-20', paid: false },
  { id: 'INV-2026-0398', customer: 'Northgate Veterinary Partners LLP', amount: 18204.50, due: '2026-02-15', paid: true },
];
const status = (i) => i.paid ? 'Paid' : new Date(i.due) < TODAY ? 'Overdue' : 'Open';
const overdue = invoices.filter((i) => status(i) === 'Overdue');
const overdueTotal = overdue.reduce((s, i) => s + i.amount, 0); // the header reads these, never a typed number
```

## Check

- Search the rendered text for: Lorem, Doe, Acme, undefined, null, NaN, Invalid Date, "1 items".
- Count every badge and summary number against the rows and the pagination.
- Add one order or invoice up by hand.
