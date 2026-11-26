# Settings

Job: let people find one setting fast, change it with confidence, and know it was saved.
Not for: first-time setup (use `onboarding.md`) or editing a business record (use `forms.md` or `detail-page.md`).

## Layout skeleton

Desktop:
```
Settings (h1)
+----------------+---------------------------------------------+
| Section nav    | Section title (h2)                          |
| 200px          | One-line description, muted                 |
|  >Profile      |---------------------------------------------|
|  Account       | Label            [ control           ]      |
|  Notifications | Hint text                                   |
|  Billing       |---------------------------------------------|
|  Team          | Label            [ control ]                |
|  Security      |---------------------------------------------|
|  --            |                         [Cancel] [Save]     |
|  Danger zone?  |                                             |
+----------------+---------------------------------------------+
```
- Content max 720px. Section nav 200px, sticky. Every section, row and input shares that one content width and right edge: text inputs fill the control column, they never stop short of the sections below.
- Each setting row: label and hint on the left (about 40%), control on the right (about 60%), or label above control for text inputs. Rows split by 1px dividers, 16 to 24px vertical padding.
- Groups of 3 to 7 settings under an h2 or h3. More than 7: split into another section.
- Danger zone (delete account, transfer ownership) last, in its own group with a `--danger` outline button. No red background block.

Phone: the section nav becomes a list screen (rows with chevrons, 48 to 56px); each section opens as its own screen with a back button. Labels go above controls.

## Density

Comfortable. Row padding 16 to 24px. Body 14px desktop, 16px phone.

## Component inventory

Section nav (vertical tabs or links), section header, setting row (label, hint, control), switch, checkbox, radio group, select, text input, avatar upload, save bar, inline "Saved" status, danger-zone row, confirm dialog with typed confirmation.

## Primary action placement

Pick one save model per page and say it once:
- Instant: switches and selects apply on change. Show a quiet "Saved" status next to the control or a toast with Undo. No Save button.
- Deferred: a sticky save bar ("Unsaved changes" + Discard + Save changes) that appears on the first edit, or a Save button at the bottom of each section. The Save button is never disabled: with no changes it does nothing and shows "No changes to save". One rule for every form in the product (see `forms.md`).
Never mix both inside one section.

## States to build

Must for a one-page brief: default with real values; saving then saved feedback; one validation error. Build the others only when the task names them.

- Default with real values filled in.
- Dirty: changed fields, save bar visible.
- Saving: button shows "Saving…" and keeps its width.
- Saved: "Changes saved" status or toast.
- Validation error on one field, with the error summary if several.
- Locked setting: disabled control with the reason and who can change it ("Only owners can change this. Ask Amara Okafor.").
- Plan-gated setting: visible, disabled, with "Available on Business plan" and a link.
- Destructive confirm: dialog naming the object, typed confirm for irreversible deletes.

## Copy rules

- Section titles are nouns: "Notifications", "Security".
- Setting labels say what it controls, hints say the effect: "Weekly summary" / "A Monday email with last week's activity."
- Switch labels describe the on state. No "Enable/Disable" prefix.
- Danger copy names the consequence: "Delete workspace. This deletes 1,284 invoices and cannot be undone."

## Common AI mistakes

- Every setting in its own card, cards in a grid.
- Switches that still need a Save button.
- A giant Save button at the bottom of a page of instant switches.
- Settings with no hint, so the effect is a guess.
- The danger zone as a red-tinted box with a red border and a filled red button.
- Phone layout that keeps the 2-column rows and squeezes controls.
- No feedback after save, or a "Saved!" toast with an exclamation mark.

## Checklist

- [ ] One save model per section, visible in the UI.
- [ ] Every setting has a label and, where the effect is not obvious, a hint.
- [ ] Control types match the rule: switch only for instant, checkbox for deferred.
- [ ] Disabled settings say why and who can change them.
- [ ] The danger zone is last, quiet, and its confirm names the object.
- [ ] At 390px each section is its own screen or a single column.

## Sources

- Primer saving pattern: https://primer.style/product/ui-patterns/saving
- Apple HIG settings: https://developer.apple.com/design/human-interface-guidelines/settings
- NN/g toggle switches: https://www.nngroup.com/articles/toggle-switch-guidelines/
- Polaris app settings layout: https://polaris-react.shopify.com/patterns/app-settings-layout
