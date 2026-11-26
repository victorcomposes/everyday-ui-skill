# Forms

Job: help people give correct information once, with no surprises, and know it was accepted.
Not for: settings with instant changes (`settings.md`), sign-in (`sign-in.md`), payment (`checkout.md`).

## Layout skeleton

Desktop, single page form:
```
< Back to Customers
New customer (h1)
One line on what happens after submit, muted

[ Error summary, only after a failed submit ]

Company name
[ field, max 480                 ]

Contact email
Hint: we send invoices here
[ field                          ]

VAT number (optional)
[ 14ch     ]

Billing address (h2, fieldset legend)
Address line 1               [ field, max 480 ]
Address line 2 (optional)    [ field, max 480 ]
Town or city                 [ field, max 320 ]
Postcode                     [ 8ch ]
(labels sit above their fields; shown inline here to save space)

[ Create customer ]  Cancel
```
- One column, max 560 to 640px, left-aligned with the page title.
- Label 14px weight 500, hint 14px muted, 8px label to field, 24px between fields, 32 to 48px between groups.
- Related fields in a `fieldset` with a `legend` styled as an h2.
- Buttons at the bottom left, aligned with the fields: primary, then Cancel as a link or secondary.

Long forms (more than about 12 fields): split into steps of one topic each, with "Step 2 of 4", Back and Continue, and a "Check your answers" page before submit.

Phone: same single column, 16px inputs, 44px controls. Primary button full width; in long forms, a sticky bottom bar.

## Density

Comfortable. Inputs 36px desktop, 44px phone. Do not squeeze fields side by side to save space.

## Component inventory

Label, hint, text input, textarea, select, radio group, checkbox, date input (three fields for known dates, a picker for near dates), file upload, fieldset and legend, error summary, inline error message, character count, step indicator, check-answers summary list, success page or toast.

## Primary action placement

One primary button at the end of the form, labelled with the outcome: "Create customer", "Send request", "Save changes". Cancel beside it as secondary. In a stepped form, "Continue" on each step and the outcome label on the last.

## States to build

Must for a one-page brief: default (empty or prefilled); error after submit with summary and inline messages; submitting. Build the others only when the task names them.

- Empty form, with sensible defaults pre-selected where safe.
- Filled form with realistic values.
- Error after submit: summary at top (h2 "There is a problem", list of links), focus moved to it, each field shows its message above the input, red 2px border, input values kept.
- Submitting: button "Creating…", inputs read-only, no double submit.
- Success: redirect to the new object with a toast "Customer created", or a confirmation page for big outcomes.
- Server error: banner at the top, data kept, "Try again".
- Edit form: prefilled, Save disabled-looking until a change, "Unsaved changes" warning on leave.

## Copy rules

- Labels are short noun phrases. Questions only in one-question-per-page flows.
- Hints give format or reason: "For example, 27 3 2026".
- Errors: what is wrong and how to fix it, per field. "Enter an email address in the correct format, like name@example.com". Not "Invalid".
- No placeholder-only fields, no colons after labels.

## Common AI mistakes

- Two or three columns of unrelated fields.
- Floating labels or placeholder labels.
- Red asterisks on every field.
- Validation on every keystroke, with errors before the user finishes typing.
- A disabled submit button with no reason.
- All fields full width, including postcode and CVC.
- Missing `autocomplete`, wrong input types.
- Success shown only as a fleeting toast after a long form.

## Checklist

- [ ] One column, fields left-aligned with the title, widths matching the answers.
- [ ] Every field has a visible label; optional fields say "(optional)".
- [ ] `autocomplete`, `type` and `inputmode` set on personal fields.
- [ ] Submit with errors shows the summary, focuses it, and keeps the values.
- [ ] The primary button names the outcome and shows a pending state.
- [ ] At 390px inputs are 16px and the button is full width.

## Sources

- GOV.UK text input: https://design-system.service.gov.uk/components/text-input/
- GOV.UK validation: https://design-system.service.gov.uk/patterns/validation/
- GOV.UK error summary: https://design-system.service.gov.uk/components/error-summary/
- GOV.UK question pages and check answers: https://design-system.service.gov.uk/patterns/question-pages/ , https://design-system.service.gov.uk/patterns/check-answers/
- Baymard on multi-column forms: https://baymard.com/blog/avoid-multi-column-forms
- Baymard on inline validation: https://baymard.com/blog/inline-form-validation
