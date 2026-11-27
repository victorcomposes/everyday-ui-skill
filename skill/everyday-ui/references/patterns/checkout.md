# Checkout and payment

Job: take a person who has decided to buy through to a confirmed order with no doubt about total cost, and no lost input.
Not for: choosing a plan (use `pricing.md`).

## Layout skeleton

Desktop:
```
Logo                                          Secure checkout (lock icon)
+--------------------------------------+-----------------------------+
| Contact                              | Order summary               |
| Email [ amara@example.com ]          | Linen shirt, M  x2  £118.00 |
|                                      | Canvas tote     x1   £24.00 |
| Delivery                             | --------------------------- |
| Full name [ ... ]                    | Subtotal            £142.00 |
| Address line 1 [ ... ]               | Delivery              £4.95 |
| Town or city [ ... ]  Postcode [8ch] | VAT (included)       £23.67 |
| Delivery option                      | --------------------------- |
| (•) Standard, 3-5 days    £4.95      | Total               £146.95 |
| ( ) Next day               £9.95     | Discount code               |
|                                      |                             |
| Payment                              |                             |
| Card number [ 4242 4242 4242 4242 ]  |                             |
| Expiry [MM/YY]  Security code [4ch]  |                             |
| [x] Billing address same as delivery |                             |
|                                      |                             |
| [ Pay £146.95 ]                      |                             |
+--------------------------------------+-----------------------------+
```
- Form column about 560px, summary column 360 to 400px, sticky. Product names in the summary wrap to 2 lines at most; each item has a 48 to 56px drawn product picture (`../art.md`), never initials and never a generic image icon.
- Card row: expiry and security code share one row at equal widths (8ch each, or 50/50), same height, labels aligned. Single page with sections, or 3 steps (Details, Delivery, Payment) with a review step.
- Guest checkout by default. Offer account creation after purchase, on the confirmation page.
- Ask only for fields needed: average checkouts show about 11 fields where 8 would do (Baymard).
- Address lookup by postcode is optional; manual entry is always available.
- Payment: card fields grouped, card type detected from the number, wallet buttons (Apple Pay, Google Pay) above the form as express options, in their brand form: Apple Pay black with the white Apple mark and "Pay", Google Pay black with the four-colour G and "Pay", both as inline SVG, 44 to 48px high, side by side, then one "or pay by card" divider.

Phone: summary collapses to a bar at the top ("Show order summary  £146.95") that expands. One column. Pay button in a sticky bottom bar: one line with the total, then the button, under 100px including the safe area. Trust lines and footnotes stay in the page, not in the bar.

## Product page and booking: choose, then commit

The same flow in one screen: a product with sizes, an appointment with times, a seat, a delivery slot.
- The picture leads: a large drawn product image or a featured card (`../art.md`). On the phone it takes at most 40% of the first screen, so the choice (sizes, days and times) starts in the first screen.
- The choice is a grid of 44px chips: available, selected (accent fill), and unavailable (struck through, muted, still readable). Say what is free: "7 free on Tue 1 Dec".
- The primary action names the missing choice until it is made ("Select a size", "Choose a time") and looks inactive (`../craft.md`). Then it states the outcome and the price: "Add to bag, £129.00", "Book 10:30, £58".
- Phone: a sticky bottom bar with one line (the choice so far and the price) and the button, under 100px. Content ends above it, nothing sits under it.
- Desktop for a phone-only task: the centred phone column. Desktop for a web page: picture left, choice and action right, both in the fold.

(proof2: on the booking task 7 of 12 judge notes faulted a "Book" button that looked enabled before a time was chosen, and on the booking and product tasks judges found the size picker or time slots under the sticky bar on 5 of 6 skill pages.)

## Density

Comfortable. 16px inputs, 44px controls on phone, 24px between fields.

## Component inventory

Contact, address and payment fieldsets, delivery option radios with price and date, order summary with line items, discount code (collapsed link that expands), totals block, wallet buttons, card fields, billing-same checkbox, error summary, pay button with amount, trust line (lock icon, "Payments processed by Stripe"), confirmation page.

## Primary action placement

One button at the end of the form, where people finish: "Pay £146.95" (amount in the label) or "Place order". Mirror it at the foot of the order summary on desktop, and in a sticky bottom bar on phones, but never lives only in the summary or the bar. The sticky bar adds `scroll-padding-bottom` equal to its height, so focused fields are never hidden. Wallet buttons are express options in brand form, not a second primary.

## States to build

Must for a one-page brief: default; card declined or field errors; order confirmed. Build the others only when the task names them.

- Default, with a realistic cart (2 to 3 items, one with a variant, quantity 2).
- Field errors on submit with summary; card declined ("Your card was declined. Try another card or contact your bank."); card details kept except security code.
- Processing: "Processing payment…", the whole form locked, warning not to close the page.
- 3-D Secure or bank verification step.
- Discount applied and invalid discount code.
- Out-of-stock item found at checkout: inline notice with options.
- Confirmation: order number, what happens next with dates, email sent to, "Create an account to track orders" (optional).

## Copy rules

- Show the total with tax and delivery before the pay button. No surprise costs.
- Delivery options show price and arrival date.
- Error messages name the fix. Never "Payment failed".
- Confirmation title: "Order confirmed", with the order number in the first line.

## Common AI mistakes

- Forced account creation before checkout.
- Two-column field grids for address.
- A "Submit" button, or a pay button without the amount.
- Order summary below the form on desktop, so the total is out of view.
- Discount code field large and prominent, sending people to search for codes.
- Missing `autocomplete="cc-number"`, `cc-exp`, `cc-csc`, `postal-code`.
- `type="number"` on the card number.
- Confirmation page with confetti but no order number.

## Checklist

- [ ] Guest checkout; account creation offered after purchase.
- [ ] The total, including tax and delivery, is visible next to the pay button.
- [ ] Card and address fields use the right `autocomplete` and `inputmode`.
- [ ] Declined and error states keep input and say what to do.
- [ ] The confirmation page shows the order number and next steps.
- [ ] At 390px the summary collapses and the pay button stays reachable.

## Sources

- Baymard checkout usability research: https://baymard.com/research/checkout-usability
- Baymard on average checkout fields: https://baymard.com/blog/checkout-flow-average-form-fields
- Baymard on delayed account creation: https://baymard.com/blog/delayed-account-creation
- GOV.UK payment card details and addresses: https://design-system.service.gov.uk/patterns/payment-card-details/ , https://design-system.service.gov.uk/patterns/addresses/
- GOV.UK confirmation pages: https://design-system.service.gov.uk/patterns/confirmation-pages/
