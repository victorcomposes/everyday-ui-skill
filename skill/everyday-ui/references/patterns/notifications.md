# Notifications, toasts and banners

Job: tell people what changed and what needs them, at a weight that matches the urgency, without burying the work.
Not for: email templates. Notification settings follow `settings.md`.

## Pick the right vehicle

| Vehicle | Use for | Lifetime |
|---|---|---|
| Inline message | Status of one field or panel | Until fixed |
| Toast | Result of the user's own small action ("Invoice archived. Undo") | 4 to 6 s, pauses on hover |
| Banner (page) | A condition on this page (read-only, trial ending, sync failed) | Until resolved or dismissed |
| Banner (global) | System-wide condition (outage, maintenance) | Until resolved |
| Notification centre | Events from others or the system the user may act on later | Until read, kept 30 to 90 days |
| Badge or count | Number of items waiting | Live |
| Dialog | A decision that blocks the task | Until answered |

## Layout skeleton

Notification centre (desktop popover from a bell, 400px wide, max 560px high):
```
Notifications            Mark all as read   (settings icon)
[All] [Mentions 2] [Assigned]
Today
* (DR) Daniel Reyes assigned you INV-2026-0412          10:42
       Harbour & Finch Ltd, £1,240.00, overdue
       [Open invoice]
* (KA) Payout of £12,904.00 failed                        09:15
       Bank rejected the account number. [Update bank details]
Yesterday
  (ML) Mei Lin Tan commented on Q3 supplier review       Wed
---------------------------------------------------------
View all notifications
```
- Bell: a 20px icon in a 36 to 44px button. The unread count sits on the top-right corner, offset outward, 16 to 18px high, `--danger` or `--accent` fill, with a 2px ring in the surface colour. It never covers the centre of the glyph. Over 9 shows "9+".
- Row: 32px avatar (people) or icon (system events), actor in weight 600, action in plain words, object as text, time right. Unread: accent dot and a `--accent-subtle` tint or bolder text.
- Inline action only when it is the obvious next step.
- A full page version of the same list for history, with filters.

Toast: bottom left (or bottom centre on phones), 360px max, `--surface`, `--shadow-pop`, icon, one line of text, one action (Undo or View), close button. Stack at most 3.

Banner: full width of the content area, under the page header, `--*-subtle` tint, icon, title, one sentence, one action, dismiss if non-critical.

Phone: the notification centre is a full screen. Toasts sit above the bottom nav and safe area.

## Density

Regular. Rows 64 to 80px with 2 lines.

## Component inventory

Bell with unread count, popover list, tabs or filter, notification row, group headers by day, mark-all-read, toast with action, banner (info, success, warning, danger), notification preferences matrix (event rows by channel columns: in-app, email, push).

## Primary action placement

In the centre: the inline action on each actionable row. In a toast: one text action. In a banner: one button or link. No filled primary buttons inside notification rows.

## States to build

Must for a one-page brief: mixed list; empty; toast with Undo. Build the others only when the task names them.

- Mixed read and unread, actionable and informational, grouped by day.
- Empty: "No notifications yet. You'll see mentions and assignments here."
- All read: list stays, counts gone.
- Toast with Undo, then the undone state.
- Error banner that persists with retry; warning banner for trial ending with the date.
- Preferences: matrix with defaults, "Saved" status.

## Copy rules

- Actor, action, object: "Daniel Reyes assigned you INV-2026-0412".
- Failures say the effect and the fix: "Payout failed. Update bank details".
- Toasts in past tense with the verb the button used: "Archived", "Invite sent".
- No exclamation marks, no emoji.

## Common AI mistakes

- Toasts for errors that need action, gone before they are read.
- A red badge for every count, including informational ones.
- Notifications that do not say who did what to which object.
- Toasts stacked top right over the page actions.
- Banners stacked three deep at the top of the page.
- `role="alert"` on every toast, so screen readers interrupt constantly.

## Checklist

- [ ] Each message uses the vehicle from the table for its urgency and lifetime.
- [ ] Rows say actor, action, object and time; unread is visible without colour alone.
- [ ] Toasts carry Undo where the action is reversible and use `role="status"`.
- [ ] Errors that need action persist until fixed.
- [ ] At 390px the centre is a full screen and toasts clear the bottom nav.

## Sources

- Primer notification messaging: https://primer.style/product/ui-patterns/notification-messaging
- Apple HIG managing notifications: https://developer.apple.com/design/human-interface-guidelines/managing-notifications
- NN/g indicators, validations and notifications: https://www.nngroup.com/articles/indicators-validations-notifications/
- GOV.UK notification banner: https://design-system.service.gov.uk/components/notification-banner/
- Atlassian flag: https://atlassian.design/components/flag
