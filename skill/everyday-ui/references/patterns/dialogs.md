# Dialogs, drawers and confirmation

Job: get one focused decision or short task done without losing the page underneath.
Not for: long forms (use a page), information people need while working (use inline content or a side panel), or every action (use undo).

## Pick the right container

| Container | Use for |
|---|---|
| Inline | Edits of one field or row; expanding details |
| Popover | Small pickers and quick settings tied to a control |
| Side drawer (400 to 560px, right) | Viewing or editing one record while keeping the list visible |
| Modal dialog | A short task (1 to 5 fields) or a decision that blocks |
| Confirm dialog | A destructive action that cannot be undone |
| Full page | Anything longer, or anything people will want to link to |

## Layout skeleton

Confirm dialog (400px):
```
+--------------------------------------------+
| Delete "Q3 supplier review"?          (h2) |
| This deletes the project and its 48 files. |
| You can't undo this.                       |
|                                            |
| Type the project name to confirm           |
| [                                       ]  |
|                                            |
|                      [Cancel] [Delete project]
+--------------------------------------------+
```
Form dialog (560px):
```
+--------------------------------------------+
| Invite members                       (x)   |
|--------------------------------------------|
| Email addresses                            |
| [ chips + input                         ]  |
| Role                                       |
| [ Member v ]                               |
|--------------------------------------------|
|                     [Cancel] [Send invites]|
+--------------------------------------------+
```
- Padding 24px, title 18 to 20px weight 600, body 14 to 16px, footer buttons right-aligned, primary last.
- Radius `--r-xl`, `--shadow-dialog`, backdrop `rgb(0 0 0 / 0.4)` (0.6 in dark).
- Body scrolls inside the dialog when tall; header and footer stay. Max height 85dvh.
- Destructive confirm: the destructive button is the filled one, in `--danger`, labelled with the verb and object. Cancel is secondary. Initial focus on Cancel or the type-to-confirm field, never on the destructive button.
- Typed confirmation only for high-impact, irreversible deletes (workspaces, projects with data). Otherwise a plain confirm.

Phone: dialogs become bottom sheets or full-screen views. Buttons stack full width, primary on top.

## Density

Compact copy. A confirm dialog has a title, at most 2 sentences and 2 buttons.

## Component inventory

`<dialog>` element or the house dialog, title, close button, body, footer, drawer, bottom sheet, backdrop, type-to-confirm input, undo toast as the alternative.

## Primary action placement

Footer right on desktop: Cancel, then the primary. On phones: stacked, primary on top. One filled button per dialog.

## States to build

Must for a one-page brief: open with focus set; submitting then error; typed confirm. Build the others only when the task names them.

- Open with initial focus set.
- Submitting: primary shows "Deleting…", buttons locked, Escape disabled until done.
- Error inside the dialog: inline message, dialog stays open, input kept.
- Typed confirm: button disabled until the text matches, with the reason visible.
- Unsaved changes on close: a small confirm "Discard changes?".
- Undo alternative: the reversible action happens at once with a toast "Project archived. Undo".

## Copy rules

- Title is a question or task naming the object: "Delete 'Q3 supplier review'?", "Invite members".
- Body says the consequence in numbers.
- Buttons repeat the verb: "Delete project", never "Yes" or "OK". Cancel is "Cancel".

## Common AI mistakes

- Modals for long forms or for showing read-only details.
- "Are you sure?" with Yes and No.
- The destructive button focused by default, or styled the same as Cancel.
- Dialogs taller than the viewport with the buttons off-screen.
- No focus trap, no Escape, no focus return.
- Nested dialogs.

## Checklist

- [ ] The container matches the table; reversible actions use undo, not confirm.
- [ ] Title and buttons name the object and the verb.
- [ ] Focus is trapped, starts on a safe control, returns to the trigger; Escape closes.
- [ ] Footer stays visible when the body scrolls.
- [ ] At 390px the dialog is a sheet or full screen with stacked buttons.

## Sources

- NN/g confirmation dialogs: https://www.nngroup.com/articles/confirmation-dialog/
- NN/g modal and nonmodal dialogs: https://www.nngroup.com/articles/modal-nonmodal-dialog/
- Primer progressive disclosure: https://primer.style/product/ui-patterns/
- WAI-ARIA dialog pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
