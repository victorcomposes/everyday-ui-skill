# App shell and navigation

Job: give every screen of the product the same frame, so people always know where they are and how to get anywhere in one or two clicks.
Not for: marketing site headers. The content inside the shell has its own pattern.

## Layout skeleton

Desktop (1024px and up):
```
+----------+--------------------------------------------------+
| Logo     | Top bar 56: search (max 480) ...... help  avatar |
|----------+--------------------------------------------------|
| Nav 240  | Page header: title (h1) + meta ....... actions   |
|  Home    |--------------------------------------------------|
| >Orders  | Page content, max 1200-1280, padding 24-32       |
|  Custom. |                                                  |
|  --      |                                                  |
|  Settings|                                                  |
| [org v]  |                                                  |
+----------+--------------------------------------------------+
```
- Sidebar 240 to 264px on `--surface` with a 1px right border, beside content on the `--bg` page. The logo (mark plus wordmark) sits at its top. Consumer products usually use a top bar instead: logo, 3 to 5 nav links, search, account.
- Full height without the 100vh bug: the grid column carries the background and stretches with the page, and the inner nav is sticky. Never give a box with a background `height: 100vh`, sticky or fixed: on a long page it stops at the first screen. Code: `../craft.md`, section Layout.
- Nav items 32 to 36px high, 16 to 20px icon, 14px label, 8px icon gap. Group with a small muted section label (sentence case) only when there are more than 7 items.
- Nav groups stack from the top, 16 to 24px between groups, no gap in the middle. Only the account or workspace block pins to the bottom (`margin-top: auto` on that block alone). Settings and help sit in the last group or in the account block.
- Page header in the content area: title left, primary action right, on one line. Secondary actions (Export, Refresh) sit left of the primary as secondary buttons. Tabs or filters sit right under it.
- On phones the page header keeps the title and its action group together: the primary, plus either one labelled secondary or a "More" menu placed directly beside the primary. Never a lone "..." away from the primary, never a secondary on its own row.
- Public site header (marketing, pricing, docs): logo left, one nav list with each link once, then "Sign in" as text and one primary call to action ("Start free trial") at the right. On phones: logo, the primary, and a menu button.

Tablet (768 to 1023px): sidebar collapses to a 56 to 64px icon rail with tooltips, or hides behind a menu button.

Phone (under 768px):
- App: top bar 56px with title and up to 2 icon actions, a bottom tab bar of 3 to 5 items (56px + safe area).
- Web app with many sections: top bar with a menu button opening a full-height sheet with the same nav.
- The primary action moves into the top bar as an icon button with a label in `aria-label`, or a sticky bottom button.

## Density

Regular. Nav 32 to 36px rows, top bar 56px (48px in dense developer tools), page padding 24 to 32px desktop, 16px phone.

## Component inventory

Sidebar nav with sections, nav item (icon, label, optional count), workspace switcher, top bar, global search or command palette trigger (Ctrl or Cmd K), notifications bell with unread dot, avatar menu (profile, settings, sign out), page header, breadcrumbs (deep hierarchies only), skip link.

## Primary action placement

The shell has no primary action of its own. Each page puts its one primary action at the right of the page header. Do not put a giant "+ New" button in the sidebar unless the product's main job is creating that object.

## States to build

Must for a one-page brief: default with the active nav item; the phone navigation (tab bar or open sheet). Build the others only when the task names them.

- Active nav item: `aria-current="page"`, `--accent-subtle` background, `--text` weight 500, or a 2px accent indicator. One style only.
- Counts on nav items (unread, pending): small muted number, not a red badge unless it needs action.
- Collapsed sidebar with tooltips. Phone nav sheet open.
- Signed-in user without permission to a section: hide the item, or show it disabled with a reason.
- Degraded: a thin banner under the top bar for an outage or read-only mode, with a link.

## Copy rules

- Nav labels are nouns, 1 to 2 words, the same words as the page titles they open.
- No product slogan in the shell. The logo or product name is enough.
- Avatar menu items: "Profile", "Settings", "Sign out" (not "Logout").

## Common AI mistakes

- A gradient or dark-blue sidebar with white text and a coloured active pill. Keep the sidebar quiet.
- Three nav items in the demo. Real products have 6 to 10.
- A welcome banner at the top of every page.
- Icons in the nav from mixed sets or with different stroke widths.
- Top bar search that is 100% wide, or a search icon with no field.
- Page title missing because the nav "already says it".
- Hamburger menu on desktop, or a sidebar squeezed onto the phone.
- `height: 100vh` on the sidebar, so its background stops at 900px on a long page.
- A grey, unbranded shell with no logo. The shell is where the brand lives.

## Checklist

- [ ] The current page is marked in the nav and matches the page title.
- [ ] The sidebar background reaches the bottom of the full-page screenshot; the shell uses `min-height: 100dvh`.
- [ ] The logo, the tinted page and a display title are visible in the desktop fold.
- [ ] At 390px there is no sidebar on screen; navigation is a bottom bar or a sheet.
- [ ] One icon set, one size, one stroke in the nav.
- [ ] A skip link reaches `main`; landmarks are `header`, `nav`, `main`.

## Sources

- Primer navigation and progressive disclosure: https://primer.style/product/ui-patterns/
- Android canonical layouts and navigation by width: https://developer.android.com/develop/ui/compose/layouts/adaptive/canonical-layouts
- shadcn/ui sidebar blocks: https://ui.shadcn.com/blocks
- NN/g on hidden navigation: https://www.nngroup.com/articles/hamburger-menus/
