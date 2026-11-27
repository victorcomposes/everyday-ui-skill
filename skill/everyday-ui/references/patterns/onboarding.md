# Onboarding and first run

Job: get a new person to the first useful result ("first value") with the fewest questions, and teach the product through doing, not reading.
Not for: product tours of features, or sign-up itself (use `sign-in.md`).

## Layout skeleton

Setup flow (desktop, split layout):
```
+-----------------------------+--------------------------------------------+
| Rail 360-440, --deep       | Step 2 of 3                  Skip for now  |
| or --surface                |                                            |
| [mark] Kestrel Billing      | Tell us about your team (h1, display)      |
|                             | This sets up your workspace. You can       |
| (x) Create account          | change it later.                           |
| (2) Your team     <current  |                                            |
| ( ) Connect your bank       | Team name                                  |
|                             | [ Kestrel Analytics            ]           |
| Live preview: the workspace | How many people will use it?               |
| name and team size appear   | ( ) Just me  (•) 2-10  ( ) 11-50  ( ) 51+  |
| in a mini sidebar as typed  |                                            |
|                             | [ Continue ]   Back                        |
+-----------------------------+--------------------------------------------+
```
- The rail shows the logo, the named steps with the current one marked, and a live preview of what the answers build. The task column holds one question group, max 560px, left-aligned.
- One question group per step, 3 to 5 steps total. Never a lone narrow column in a blank 1440px page.
- Progress as "Step 2 of 3" text or a thin bar. Not numbered circles with lines unless steps have names people need.
- Skip only for optional steps; say what happens ("You can invite people later from Settings").

First-run in-app (after setup):
```
Home (h1)
Get started  2 of 4 done                                [Dismiss]
[x] Create your workspace
[x] Connect your bank
[ ] Send your first invoice          [Create invoice]
[ ] Invite your accountant           Invite
-------------------------------------------------------------------
(the real home screen below, with its own empty states)
```
- A checklist of 3 to 5 real tasks, each completing when done in the product. Dismissable, and it remembers.
- One first action, visually dominant and above the fold: the next open task's button is the only filled button on the screen and the largest control. Templates, imports and other entry points are grouped under it as secondary links or small tiles. If the checklist pushes the empty state below the fold, collapse the done tasks into one line ("2 of 4 done").

Phone: one step per screen, primary button in a sticky bottom bar, "Skip" in the top bar.

## Density

Comfortable. 16px text, generous spacing, one decision per screen.

## Component inventory

Step header with progress, single question group, radio cards (only for 2 to 4 choices with a short description each), import or connect buttons, setup checklist, empty states with one action, inline contextual tips (one at a time), success moment.

## Primary action placement

"Continue" on each step, the outcome on the last ("Create workspace"). In the checklist, each open task has its own action. Only the next open task's action is a filled button. Other task actions are secondary.

One filled button per view still holds when the checklist sits above empty panels: while the checklist shows, the page header's create button and the empty-state buttons below become secondary. When the checklist is dismissed or done, the page header's create button is primary again.

## States to build

Must for a one-page brief: the first step; a step with a validation error; the finished landing with the checklist. Build the others only when the task names them.

- Each step empty and filled.
- Validation error on a step.
- Connecting or importing: progress with what is happening ("Importing 1,284 contacts… 412 done").
- Import partly failed: "1,271 imported, 13 skipped" with a download of the skipped rows.
- Finished: land on the real product with the first result visible, not a "You're all set!" page with confetti.
- Returning user who skipped: checklist shows remaining tasks.

## Copy rules

- Ask only what changes the product now. Explain why when the reason is not obvious.
- Steps are tasks people recognise: "Connect your bank", not "Integrations".
- Success copy names the result: "Your first invoice is ready to send".

## Common AI mistakes

- A carousel of 3 or 4 feature slides with illustrations before any use.
- A tour of tooltips pointing at every button.
- 8-step setup asking for role, company size, goals and how you heard about us.
- Confetti and "You're all set!" with no next step.
- A checklist with fake progress (the first item ticked for "Sign up").
- Steps shown as numbered circles that do not fit on a phone.

## Checklist

- [ ] Every question changes the product; no survey questions in the flow.
- [ ] Progress and Skip are honest; skipped steps reappear in the checklist.
- [ ] The flow ends on the real product showing a first result.
- [ ] Each checklist task completes from the real action and links to it.
- [ ] At 390px each step fits one screen with the button reachable.

## Sources

- Primer feature onboarding: https://primer.style/product/ui-patterns/feature-onboarding
- Apple HIG onboarding: https://developer.apple.com/design/human-interface-guidelines/onboarding
- NN/g onboarding tutorials versus contextual help: https://www.nngroup.com/articles/onboarding-tutorials/
- GOV.UK complete multiple tasks (task list): https://design-system.service.gov.uk/patterns/complete-multiple-tasks/
