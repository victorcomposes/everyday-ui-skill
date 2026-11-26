# Admin and back office

Job: let operators and admins manage people, permissions and records safely, at volume, with a trail of who did what.
Not for: the end-user's own settings (use `settings.md`). The tables inside follow `data-table.md`.

## Layout skeleton

Members and roles (desktop):
```
Members (h1)  38 members, 4 pending invites ...................... [Invite members]
[ Search by name or email ] [Role v] [Status v]
+--------------------------------------+-----------+------------+-------------+-----+
| Member                               | Role      | Status     | Last active |     |
+--------------------------------------+-----------+------------+-------------+-----+
| (AO) Amara Okafor  You               | Owner     | Active     | Now         |     |
|      amara.okafor@kestrel-analyt...  |           |            |             |     |
| (DR) Daniel Reyes                    | [Admin v] | Active     | 2 h ago     | ... |
| (ML) mei.lin.tan@kestrel-anal...     | [Member v]| [Invited]  | Never       | ... |
+--------------------------------------+-----------+------------+-------------+-----+
```
Record detail with side panel (desktop):
```
Table (60%)                         | Detail panel (40%), opens on row click
                                    | Name, status, key fields
                                    | Actions: Edit, Suspend (secondary), Delete (danger, in menu)
                                    | Activity: who changed what, when
```
- Member cell: 32px avatar (initials), name weight 500, email muted on line 2, a "You" tag on the current user.
- Role is an inline select only where the viewer may change it; otherwise plain text.
- Audit log: a table of time (absolute, with seconds on hover), actor, action, target, IP or source; filters for actor, action, date range; export.
- Roles page: a table of roles with member counts, and a permission matrix (permissions as rows grouped by area, roles as columns, checkboxes). Built-in roles read-only.

Phone: admin work is mostly desktop. Still: rows become two-line list items, the detail panel becomes a full screen, bulk actions in a bottom bar.

## Density

Compact. 14px body, 40 to 48px rows, 15 or more rows above the fold.

## Component inventory

Members table, invite dialog (multiple emails, role select, optional message), role select, status badge, row action menu, bulk action bar, side detail panel or drawer, audit log table, permission matrix, impersonate or "view as" banner, confirm dialogs with typed confirmation.

## Primary action placement

"Invite members" (or "New <object>") at the right of the page header. Destructive actions (remove, suspend, delete) live in the row menu or the detail panel, never as visible red buttons in every row.

## States to build

Must for a one-page brief: populated with the current user marked; invite dialog; read-only for a non-admin. Build the others only when the task names them.

- Populated with mixed roles and statuses, the current user marked, one pending invite, one suspended member.
- Invite dialog with several emails, one invalid; sent state with "Resend" and "Revoke" on pending invites.
- No permission: a non-admin sees the list read-only with "Only admins can manage members".
- Last owner protection: cannot remove or demote the only owner; explain why.
- Bulk: 5 selected, change role, remove (confirm lists the names, with a count).
- Audit log empty for a filter; export in progress.
- "Viewing as Daniel Reyes" banner with "Exit" during impersonation.

## Copy rules

- Role names with a one-line description in the select ("Admin: manage members and billing").
- Confirm destructive actions with the object and effect: "Remove Daniel Reyes? He loses access to 12 projects now. His work stays."
- Audit actions in past tense, plain: "changed role from Member to Admin".

## Common AI mistakes

- Red "Delete" buttons on every row.
- Role changes applied with no confirmation or feedback.
- A dashboard of stat cards on top of a members page.
- No mark for the current user, so people demote themselves.
- Audit logs with relative times only.
- A permission matrix with 40 unlabelled toggles.

## Checklist

- [ ] The current user is marked; last-owner and self-demotion are guarded.
- [ ] Destructive actions sit in menus or panels and confirm with names and effects.
- [ ] Viewers without permission see read-only UI with the reason.
- [ ] The audit log shows absolute time, actor, action, target, and can be filtered.
- [ ] The table follows `data-table.md` (alignment, states, pagination).

## Sources

- Polaris resource index and details layouts: https://polaris-react.shopify.com/patterns/resource-index-layout , https://polaris-react.shopify.com/patterns/resource-details-layout
- USWDS user profile pattern: https://designsystem.digital.gov/patterns/
- NN/g confirmation dialogs: https://www.nngroup.com/articles/confirmation-dialog/
