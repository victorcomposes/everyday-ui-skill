# Lists, inboxes and list-detail

Job: let people work through a stream of items (messages, tasks, tickets, files), see what is new or urgent, and open one without losing their place.
Not for: comparing many attributes across records (use `data-table.md`).

## Layout skeleton

List-detail (desktop, 1024px and up):
```
+----------------------------+-------------------------------------+
| Inbox (h1)    [Compose]    | Subject of the open item (h2)       |
| [All] [Unread 12] [Mine]   | From, to, time, status              |
| [ Search inbox          ]  |-------------------------------------|
|----------------------------| Body                                |
|* Bramwell Dental   10:42  |                                     |
|  Appointment reminders...  |                                     |
|  Preview text, 1 line...   |                                     |
|----------------------------|                                     |
|  Kestrel Analytics  Mon    | [Reply]  Archive  ...               |
+----------------------------+-------------------------------------+
  list 320-400px               detail fills the rest
```
- List row: 64 to 76px for 2 to 3 lines: line 1 sender or title (weight 600 when unread) and time right-aligned; line 2 subject; line 3 muted preview, one line, truncated.
- Unread marker: bold text plus a small accent dot with a text alternative. Selected row: `--accent-subtle`.
- Group by day ("Today", "Yesterday", "Earlier this week") with small muted headers when time matters.
- Keyboard: up and down move, Enter opens, E archives, with focus kept in the list.

Simple list (single column): rows 48 to 56px, leading icon or avatar, title, meta right, chevron only if the row navigates.

Phone: the list is a full screen; the detail opens as a new screen with a back button. Swipe actions (archive, mark read) are a shortcut, never the only way.

## Density

Regular. 10 to 12 rows visible at 900px height in list-detail.

## Component inventory

List with rows, unread dot, avatar, time, badges, tabs or segmented filter with counts, search, bulk select, detail pane, toolbar (reply, archive, assign, more), pagination or infinite scroll with a "Load more" fallback, empty and cleared states.

## Primary action placement

The create action ("Compose", "New task") at the top of the list pane or page header. The detail's main action ("Reply", "Mark as done") at the start of the detail toolbar.

## States to build

Must for a one-page brief: populated mixed read and unread; nothing selected; cleared (all caught up). Build the others only when the task names them.

- Mixed read and unread, one with an attachment, one urgent, one very long subject.
- Nothing selected in list-detail: the detail pane shows a quiet "Select a conversation" with a count, not a big illustration.
- Inbox zero: "You're all caught up" with no action needed.
- Loading more at the bottom; new items arrived banner at the top ("3 new messages. Show").
- Item opened then archived: next item opens, toast with Undo.
- Search with no results.

## Copy rules

- Times: today shows "10:42", this week "Mon", older "12 Mar".
- Previews show the first meaningful line, not "Hi,".
- Counts in tabs are exact up to 999, then "999+".

## Common AI mistakes

- Every row a separate card with a shadow and gap.
- Unread shown only by a colour.
- Hover-only actions that never appear on touch.
- Detail pane empty state with a large illustration and marketing text.
- Infinite scroll with no position and no footer.
- Same weight for read and unread rows.

## Checklist

- [ ] Rows have a clear 2 to 3 line anatomy with time right-aligned.
- [ ] Unread is marked by weight and an indicator with a text alternative.
- [ ] Selection, focus and hover look different.
- [ ] At 390px list and detail are separate screens with a back button.
- [ ] Archive and similar actions offer Undo.

## Sources

- Android canonical layouts, list-detail: https://developer.android.com/develop/ui/compose/layouts/adaptive/canonical-layouts
- Primer notification messaging and progressive disclosure: https://primer.style/product/ui-patterns/
- Apple HIG lists and tables: https://developer.apple.com/design/human-interface-guidelines/lists-and-tables
