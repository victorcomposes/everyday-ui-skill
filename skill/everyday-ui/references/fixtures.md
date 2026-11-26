# Fixtures

Real-looking data is the cheapest big win on a product screen. Hostile data finds the layout bugs before a user does. Put all sample data in one array or module and render from it, so states and counts stay consistent.

## Rules

- Write data for the brief's domain and user. A dental clinic's appointments, a freight company's shipments, a SaaS team's members. Never generic "Item 1".
- Default view: about 80% ordinary rows, plus a few hard ones (one long name, one missing value, one warning status, one big number).
- `stress` state: the extremes below, many rows, every edge at once.
- Numbers must agree. Compute every count, total, badge and summary from the data in code (`rows.filter(r => r.status === 'Overdue').length`). Never type a count by hand.
- A count in a header describes the whole dataset. If the table shows fewer rows, the pagination says so: "1-25 of 36". The visible rows must be a plausible slice: sorted by the stated sort, and filtered by the stated filters.
- Status follows the data: "Overdue" means due date before `TODAY` and unpaid. "Last active 2 hours ago" means a timestamp 2 hours before `TODAY`. Derive statuses from dates, do not assign them at random.
- Totals: line items add to the subtotal, tax uses one stated rate, the total equals subtotal plus tax plus delivery, to the penny.
- Dates relative to a fixed "today" in the data, so the screen does not change between runs.
- No real people's personal data. Invent names, emails on `example.com`, `example.org` or invented company domains, phone numbers from reserved ranges (UK `07700 900xxx`, US `555-01xx`).

## The hostile matrix

Pick the rows that fit the brief's data line.

| Data | Ordinary | Hostile |
|---|---|---|
| Person name | Amara Okafor, Daniel Reyes, Mei Lin Tan, Tomasz Wójcik, Priya Raghunathan | Maximilian Alexander von Hohenberg-Schwarzenau; Siobhán Ní Bhriain; a single name "Teodora"; no name (show the email) |
| Company | Harbour & Finch Ltd, Kestrel Analytics, Bramwell Dental Group, Oduya Textiles | Société Générale des Transports Maritimes et Fluviaux S.A.; a one-letter brand "Q"; a name with an ampersand |
| Email | amara.okafor@kestrel-analytics.com | very.long.first.name.and.last.name@subdomain.example-company.co.uk |
| Title or subject | Q3 supplier review | A 120-character subject that wraps twice and contains a URL with no spaces https://example.com/a/very/long/path/that/never/breaks |
| Money | £1,240.00, £86.50 | £0.00; −£312.40 (refund); £1,284,900.50; £0.40; a missing amount |
| Count | 12, 38 | 0; 1 (singular copy); 12,480; 1,000,000+ |
| Percent | 47.3% | 0%; 100%; −8.2%; 0.04% |
| Date | 3 days ago; 12 Mar 2026 | today; in the future (scheduled); 4 years ago; missing |
| Status | Active, Paid, Delivered | Overdue, Failed, Suspended, Pending review: at least one warning and one error |
| Avatar | photo missing, so initials | initials from a one-word name; two people with the same initials |
| Tags | 1 or 2 | 0; 9 tags (show 2 and "+7") |
| Free text | One short sentence | Empty; 2,000 characters; a line break; an emoji inside user content |
| Address | 14 Wharf Road, Leeds LS1 4BR | A flat number, building name, and a 3-line street; a missing postcode |
| ID | INV-2026-0412 | INV-2026-0412-REISSUE-02 |
| List length | 25 rows | 0 rows; 1 row; 1,284 rows (paginate, show the total) |

## Empty values

- In tables: a muted en dash `–` with `aria-label="None"`, or a word ("Not set", "Never") when the absence means something.
- In detail views: "Not set" plus an edit link, so the gap is fixable.
- Never "null", "undefined", "NaN", "$NaN", "Invalid Date" or a blank where a value belongs. Search the screenshot for them.

## Translation and expansion

- Labels in German or Finnish run 30 to 40% longer. Test one button and one nav item with a long label: "Rechnungen exportieren", "Benachrichtigungseinstellungen".
- Never put text in fixed-width boxes. Let buttons grow, let nav labels truncate with a tooltip.

## Many rows and many items

- Tables: render at least 25 rows in the default view when the real product would have them, so density shows. Show pagination with the real total.
- Navigation: 7 to 9 sidebar items with one section label, not 3. Real apps are bigger than demos.
- Charts: 30 to 90 points with plausible noise and one visible dip, not a smooth curve.

## A starter set

Adapt it to the domain. Do not reuse it verbatim on every screen.

```js
const TODAY = new Date('2026-03-14T10:30:00Z');
const people = [
  { name: 'Amara Okafor', email: 'amara.okafor@kestrel-analytics.com', role: 'Admin', status: 'Active', lastSeen: '2026-03-14T09:52:00Z' },
  { name: 'Daniel Reyes', email: 'daniel.reyes@kestrel-analytics.com', role: 'Member', status: 'Active', lastSeen: '2026-03-13T16:05:00Z' },
  { name: 'Maximilian Alexander von Hohenberg-Schwarzenau', email: 'max.hohenberg@kestrel-analytics.com', role: 'Member', status: 'Active', lastSeen: '2026-02-28T11:20:00Z' },
  { name: 'Mei Lin Tan', email: 'meilin.tan@kestrel-analytics.com', role: 'Billing', status: 'Invited', lastSeen: null },
  { name: 'Teodora', email: 'teodora@kestrel-analytics.com', role: 'Member', status: 'Suspended', lastSeen: '2025-11-02T08:00:00Z' },
];
const invoices = [
  { id: 'INV-2026-0412', customer: 'Harbour & Finch Ltd', amount: 1240.00, currency: 'GBP', due: '2026-03-02', status: 'Overdue' },
  { id: 'INV-2026-0413', customer: 'Bramwell Dental Group', amount: 86.50, currency: 'GBP', due: '2026-03-20', status: 'Open' },
  { id: 'INV-2026-0398', customer: 'Société Générale des Transports Maritimes et Fluviaux S.A.', amount: 1284900.50, currency: 'GBP', due: '2026-02-15', status: 'Paid' },
  { id: 'INV-2026-0401-CR', customer: 'Oduya Textiles', amount: -312.40, currency: 'GBP', due: null, status: 'Refunded' },
];
```

## Check

- Search the rendered text for: Lorem, John Doe, Jane, Acme, example@email, undefined, null, NaN, Invalid Date, "1 items".
- Count every badge and summary number against the rows and the pagination text.
- Check each status against its date and `TODAY`.
- Add up one order or invoice by hand.
