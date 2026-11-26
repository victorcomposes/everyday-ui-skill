# Design references for an AI coding agent: research notes

Checked 2026-11-26. Each claim carries a URL. "UNVERIFIED" marks a claim from one secondary source, a competitor page, or an inference. Prices change often: re-check before a purchase.

## Bottom line

- Mobbin and Refero both run an official hosted MCP server today. Both need a paid plan. Either is the legal way for an agent to read them.
- Driving a signed-in browser over Mobbin is a breach of its terms. Use the MCP, not Playwright.
- Most other inspiration sites (Page Flows, Godly, Land-book, Dribbble) have no agent access.
- The free, licence-safe layer is the design systems: GOV.UK, USWDS, Primer, Material 3, shadcn/ui. Read them for structure and rules. Do not ship their text from restricted sources (Apple, Atlassian, Polaris, Tailwind Plus).
- Ship a small built-in pattern library as the default. Treat MCP lookups as an optional upgrade.

---

## 1. Mobbin

### Machine access

| Access | Plan | Facts | Source |
|---|---|---|---|
| Official MCP | Pro, Team, Enterprise | Endpoint `https://api.mobbin.com/mcp`, Streamable HTTP, OAuth sign-in in the browser on first connect, no API key. | https://mobbin.com/mcp.md |
| MCP rate limit | all paid | 60 requests per 60 s per user. HTTP 429 carries `Retry-After`. | https://mobbin.com/mcp.md |
| MCP tools | | `search_screens`, `search_flows`, `search_sections`, `list_collections`, `get_collection_contents`, `create_collection`, `save_content`, `add_comment`. | https://docs.mobbin.com/mcp/features |
| MCP output | | Screens with a low-res preview and a high-res `image_url`. The `image_url` expires after 30 days. Parameters and full return shape are not documented on the page. | https://docs.mobbin.com/mcp/features |
| Claude Code | | Listed as a supported client. The inline gallery (MCP Apps) works in Claude Desktop and Web, not named for Claude Code. | https://mobbin.com/mcp.md |
| REST API | Team, Enterprise | Base `https://api.mobbin.com`, workspace bearer key, 60 req / 60 s per workspace, example `POST /v1/screens/search`, OpenAPI at `docs.mobbin.com/openapi.json`. UNVERIFIED: from search snippets of Mobbin docs, OpenAPI not fetched. | https://mobbin.com/llms-full.txt |
| Export | Pro and up | Copy and download included on Pro and up, "Limited" on Free. | https://mobbin.com/pricing |
| Copy to Figma | | Homepage advertises download and a Figma plugin. A Figma forum user says screens paste as bitmaps. UNVERIFIED (search snippet). | https://mobbin.com/ , https://forum.figma.com/report-a-problem-6/copy-link-to-selection-not-appearing-41801 |
| Community MCPs | | `pdcolandrea/mobbin-mcp` is archived and points to the official server. `@aos-engineer/mobbin-mcp` says it reverse-engineers internal endpoints. Do not use these: they breach 3.2(c) and 3.2(e). | https://github.com/pdcolandrea/mobbin-mcp , https://www.pkgstats.com/pkg:@aos-engineer/mobbin-mcp |

### Pricing (USD, page as served 2026-11-26)

| Plan | Price | Agent access |
|---|---|---|
| Free | $0 | No search, no flows, no MCP, no API |
| Pro | $10/mo billed yearly ($120), or $15/mo billed quarterly | MCP |
| Team | $16/member/mo yearly, or $24 quarterly | MCP and REST API |
| Enterprise | Custom | MCP, SSO |

Source: https://mobbin.com/pricing

### Terms of service (https://mobbin.com/terms)

- 3.2(e) bans re-hosting or caching materials "including through the use of any scraper, robot, bot, spider, crawler or any other automated device".
- 3.2(m) bans "unauthorised use of any scraper, robot, bot, spider, crawler or any other automated device or means".
- 3.2(c) bans bypassing "rate-limiting, authentication, or security measures".
- 3.3 sets rules for crawlers: descriptive user agent, obey `robots.txt`, contact details.
- 3.4 bans using "artificial intelligence or machine learning" tools "to create derivative works" and "to train, test, index, benchmark, or improve" any model, "except as expressly permitted by these Terms of Service or the written consent of Mobbin".
- 3.5 permits the API and MCP "for (i) your personal or internal business use" and "(ii) integration into your own proprietary products or services". It bans resale, a competing service, and using retrieved content "to create a standalone content repository".
- 4.1.2 bans account sharing.
- 10.3.1: third-party images may be published elsewhere only "in limited extent" and "only if crediting the respective IP Holders".

### Can an agent use it?

- Legal path: the official MCP on the user's own Pro seat, for internal work. Clause 3.5 covers this. <!-- observed 2026-11-26: mobbin.com/terms 3.5 -->
- UNVERIFIED (my reading, not legal advice): clause 3.4(a) bans AI tools that "create derivative works" of Mobbin content. A skill that copies a Mobbin screen into code could sit close to that line. The skill should extract structure and rules, not reproduce a screen. Confirm with Mobbin support if the skill ships to others.
- Not allowed: Playwright or any browser automation over a signed-in Mobbin session. That is an automated device outside the sanctioned API or MCP (3.2(e), 3.2(m)), and a scripted session for others is account sharing (4.1.2).
- Not allowed: storing MCP results into a skill's bundled library. That is a "standalone content repository" (3.5(c)), and image URLs expire after 30 days anyway.
- Practical: 60 calls a minute is ample for one screen. The skill must handle a 429 and a missing MCP.

---

## 2. Alternatives with machine access

| Source | Agent access today | Cost | Notes | Source |
|---|---|---|---|---|
| **Refero** | Official MCP, `https://api.refero.design/mcp`, OAuth or bearer token. Verified. | Paid plan needed (Pro, Team, Lifetime). Price not on the docs page. UNVERIFIED: usage-based business tier $0.001/request, $2,000 minimum. | 8,000 MCP calls per user per month. Covers web and iOS. Claude Code: `claude mcp add --transport http refero https://api.refero.design/mcp` | https://doc.refero.design/mcp/getting-started.md , https://doc.refero.design/help/plans.md , https://design.lazyweb.com/best/design-research-tools.md |
| Refero tools | `refero_search_styles`, `refero_get_style` (md or json: colours, type scale, spacing, radius, do and don't), `refero_search_screens`, `refero_get_screen` (patterns, elements, fonts, content structure as text), `refero_get_similar_screens`, `refero_get_screen_image`, `refero_search_flows`, `refero_get_flow` (steps, actions, system responses). | | Refero's own skill advises: styles first, then screens, then flows, and treat each style as "reference ingredient, not a template". Screen metadata comes back as text, so the agent rarely needs the image. | https://raw.githubusercontent.com/referodesign/refero_skill/f78b4eccf112d7a179b92afeafdd7e8684560ac2/references/mcp-tools.md |
| Refero terms | MCP access is "for design research by the licensed user". One user per seat. No clause found on AI use. | | | https://doc.refero.design/help/plans.md |
| **Lazyweb** | Public search API and MCP. Bearer token. Installer `curl -fsSL https://www.lazyweb.com/install.sh \| bash` (review it first). | Says "Lazyweb is free", no card. | UNVERIFIED: endpoint and tool names not on the page. Its comparison pages are competitor marketing. No web-app flows yet. | https://www.lazyweb.com/mcp-install , https://design.lazyweb.com/best/design-research-tools.md |
| **Page Flows** | None. No MCP, no public API, no export. | $99/yr, $39/qtr, Team $199/yr, $2.95 trial. UNVERIFIED (competitor page). | Terms allow Fair Use of media and say nothing on bots. | https://design.lazyweb.com/vs/pageflows.md , https://pageflows.com/terms/ |
| **Screenlane** | None. UNVERIFIED: merged into Page Flows July 2024, domain redirects. | | | https://design.lazyweb.com/best/design-research-tools.md |
| **UI Sources** | None found. UNVERIFIED: last visible activity is a 2020 relaunch, status unknown. | | | https://www.producthunt.com/products/ui-sources , https://buttondown.com/uisources/archive/introducing-the-new-ui-sources/ |
| **Godly** | None. UNVERIFIED: blocks AI crawlers via Cloudflare and `ai-train=no`. | | Landing pages, not product screens. | https://www.lazyweb.com/vs/godly |
| **Land-book** | None. UNVERIFIED: Cloudflare bot protection. | | Landing pages and sections. | https://lazylanding-labs.onrender.com/vs/land-book |
| **Dribbble** | API v2 covers mainly the user's own shots. Popular feed not offered. General terms ban use "other than as expressly permitted". | Free | Dribbble shots are concept art, often not real product screens. Low value for everyday screens. | https://help.dribbble.com/en/articles/11065925-about-the-dribbble-api , https://dribbble.com/terms |
| **Figma Community** | No official REST search of Community files. Official Figma MCP reads the user's own files. Third-party scrapers exist. | Free | Good only when the user names a specific Community file. | https://forum.figma.com/t/how-to-implement-search-using-rest-api/49042 , https://developers.figma.com/docs/rest-api |
| Other "design reference" MCPs | UI Discovery (hosted MCP and JSON API), InspoAI (92,000+ screenshots, free key tier), FontofWeb, Design Corpus (650+ landing pages), Awwwards (open-source, may scrape). All UNVERIFIED: seen only in directories or vendor copy. | | Mostly marketing pages, not product screens. | https://mcpservers.org/servers/uidiscovery-com , https://inspoai.io/mcp , https://mcpservers.org/servers/fontofweb-com-mcp , https://www.producthunt.com/products/design-corpus , https://mcpmarket.com/server/awwwards |

Verdict: only Mobbin and Refero are verified, first-party, product-screen sources with agent access. Refero returns structured text per screen, which suits a text-first skill better. Mobbin has the larger catalogue (press release title says 621,500 screens, UNVERIFIED) but returns images.

---

## 3. Free, licence-safe pattern sources an agent can read as text

"Licence" here means: can the skill quote or bundle the text? Reading a public page to inform a design is fine for all of them. Bundling text needs a permissive licence.

| Source | Licence | Strong screen types | Source |
|---|---|---|---|
| **GOV.UK Design System** | Content OGL v3.0, code MIT. Bundling with attribution is fine. | Forms and transactional flows: question pages, check answers, confirmation, create accounts, passwords, addresses, dates, payment card details, validation errors, task list (complete multiple tasks), start page, 404, service unavailable, cookies, interruption pages. 30 patterns. | https://design-system.service.gov.uk/patterns/ , https://raw.githubusercontent.com/alphagov/govuk-frontend/main/LICENSE.txt |
| **USWDS** | Public domain (CC0), except some fonts and icons. | Complex forms, select a language, create a user profile. Smaller pattern set than GOV.UK. | https://designsystem.digital.gov/patterns/ , https://raw.githubusercontent.com/uswds/uswds/develop/LICENSE.md |
| **GitHub Primer** | MIT (primer/design repo). | Empty states, loading, saving, forms, navigation, notification messaging, degraded experiences, progressive disclosure, feature onboarding, data visualisation. Dense developer-tool UI. | https://primer.style/product/ui-patterns/ , https://github.com/primer/design/blob/main/LICENSE |
| **shadcn/ui blocks** | MIT. Code can ship. | Dashboard (sidebar, charts, data table), sidebars, login, signup. Good concrete skeletons in React and Tailwind. | https://ui.shadcn.com/blocks , https://raw.githubusercontent.com/shadcn-ui/ui/main/LICENSE.md |
| **Radix Primitives** | MIT. | Components only (dialog, menu, tabs), not screens. Useful for behaviour and accessibility rules, not layout. | https://raw.githubusercontent.com/radix-ui/primitives/main/LICENSE |
| **Material 3 / Android canonical layouts** | UNVERIFIED: M3 content stated as Apache 2.0 or CC BY 4.0 (search snippet of m3.material.io/get-started). | List-detail, feed, supporting pane, with breakpoint rules (supporting pane 70/30 on expanded width). Mobile list and detail, adaptive layouts. | https://developer.android.com/develop/ui/compose/layouts/adaptive/canonical-layouts , https://m3.material.io/get-started |
| **Apple HIG** | Apple site terms ban copying and automated scraping. Read, do not bundle. UNVERIFIED: whether developer.apple.com has separate terms. | 25 patterns: onboarding, settings, searching, loading, managing accounts, managing notifications, entering data, feedback, modality, charting data, undo and redo, file management. | https://developer.apple.com/tutorials/data/design/human-interface-guidelines/patterns.json , https://www.apple.com/legal/internet-services/terms/site.html |
| **Atlassian Design System** | Restricted to add-ons that integrate with Atlassian products. No derivative works. Do not bundle. | Strong on tables, empty states, messaging (from general knowledge, UNVERIFIED this session). | https://atlassian.design/license |
| **Shopify Polaris** | Restricted to apps that integrate with Shopify. Polaris is now web components. Do not bundle. | Admin resource index and detail, settings, app home (UNVERIFIED this session). | https://raw.githubusercontent.com/Shopify/polaris/main/LICENSE.md , https://shopify.dev/docs/api/polaris |
| **Tailwind Plus** | Paid. Bans publishing a repository of components or building a UI library from them. UNVERIFIED: full text not fetched (page needs sign-in), from search snippets. Do not bundle. | Application shells, tables, forms, marketing sections. | https://tailwindcss.com/plus/license |
| **Untitled UI** | Free React components MIT. PRO under its own paid licence (seat-limited sharing). Bundle only the MIT set. | PRO has 250+ dashboards, settings pages, marketing pages. | https://github.com/untitleduico/react , https://www.untitledui.com/legal/license |
| **Baymard** | Copyright. Free: 7,500+ checkout step examples, 70 articles, 49 abandonment stats. Paid Premium: 110+ checkout guidelines. Cite facts, do not copy text. | Checkout, cart, forms. Headline facts: average cart abandonment 70.19%, average site has 32 checkout improvements to make. | https://baymard.com/research/checkout-usability |

Safe to bundle as text (with attribution): GOV.UK, USWDS, Primer, shadcn/ui, Radix, Untitled UI free set. Read-only: Apple, Atlassian, Polaris, Tailwind Plus, Baymard, Mobbin, Refero.

---

## 4. Reference retrieval step: design

This section is design, not sourced fact. It borrows Refero's "ingredient, not template" rule (https://raw.githubusercontent.com/referodesign/refero_skill/f78b4eccf112d7a179b92afeafdd7e8684560ac2/references/mcp-tools.md).

### Flow

1. Classify the screen type from the request (one of the list below).
2. Read the built-in library entry for that type (section 5). This always works offline.
3. If Refero or Mobbin MCP is connected, run 2 to 3 searches. Search by what is literally on the screen ("settings page with sidebar sections and toggles"), not by mood. Pick 3 to 5 references from different products.
4. Read one design-system source for the rules (GOV.UK for forms, Primer for empty and loading states, Material for list-detail).
5. Write a reference brief (template below). Build from the brief, never from one screenshot.
6. Record each reference URL in the brief. Never save images or MCP payloads into the repo (Mobbin 3.5(c)).

### What to extract (the reference brief)

| Field | What to write | Why |
|---|---|---|
| Layout skeleton | Regions in order, with rough widths: "top bar 56px / left nav 240px / content max 960px / right rail none". | Structure transfers. Pixels do not. |
| Density | Row height, base spacing unit, items above the fold. | Data tables and settings live or die on density. |
| Component inventory | Named components per region, mapped to the project's own library. | Forces reuse of house components. |
| Hierarchy | One primary action. Where it sits. Secondary and destructive actions. | Most screens fail here. |
| Copy patterns | Title form, button verbs, helper text, error wording. Rewritten, never pasted. | Copy is the highest-value cheap win. |
| States | Empty (first use, no results, cleared), loading, error, partial, success, disabled, permission denied. | Inspiration sites show the happy path only. |
| Responsive rule | What collapses at narrow width (rail into sheet, table into cards, list-detail into two screens). | Material canonical layouts give the rules. |
| Convergence | What 3 or more references agree on (the convention) versus what one does (the flourish). | Follow the convention. Choose a flourish on purpose. |
| Sources | URLs only. | Provenance, and no stored copies. |

### What to look up per screen type

| Screen | Look for | Best text source |
|---|---|---|
| Settings | Grouping (sidebar sections vs one long page), save model (autosave vs Save button), danger zone placement | Primer saving, Apple HIG settings |
| Data table | Toolbar (search, filter chips, bulk actions), column alignment, row density, pagination vs infinite, empty and no-results states | shadcn dashboard-01, Primer DataTable |
| Login | Field order, SSO button placement, error message on bad credentials, password reveal, "forgot" link position | GOV.UK passwords and create accounts, shadcn login blocks |
| Onboarding | Step count, skip option, progress, first-run empty state that teaches | Primer feature onboarding, Apple HIG onboarding, GOV.UK start using a service |
| Empty state | First use vs no results vs cleared, one call to action, illustration or none | Primer empty states |
| Pricing | Plan count (usually 3), highlighted plan, monthly/yearly toggle, comparison table below | Mobbin `search_sections`, Refero screens |
| Checkout | Guest option, field count, order summary placement, error recovery | Baymard free articles, GOV.UK payment card details and check answers |
| Dashboard | KPI row, chart count, time-range control, drill-down path | shadcn dashboard-01, Primer data visualisation |
| Mobile list and detail | Row anatomy, swipe actions, back behaviour, two-pane on tablet | Android canonical layouts |
| Search | Where the box lives, instant vs submit, filters, no-results recovery | Apple HIG searching |
| Notifications | Inbox vs toasts, read and unread, grouping, settings link | Primer notification messaging, Apple HIG managing notifications |

---

## 5. Built-in pattern library: what each entry needs

Design proposal. The library is text the skill ships, so it must stand alone when no MCP is connected. Write it in our own words, citing permissive sources only (section 3).

### Entry template

```markdown
## <screen type>
Use when: <the job the user is doing, one line>
Not for: <the near neighbour it gets confused with>

Skeleton (desktop):
  <region list with rough sizes, ASCII box if useful>
Skeleton (mobile): <what collapses and how>

Density: <row height, spacing unit, items above the fold>
Components: <inventory, in generic names the skill maps to the house library>
Primary action: <one, and where it sits>
Secondary / destructive: <where, and confirmation rule>

Copy:
  Title: <pattern, e.g. noun phrase, sentence case>
  Buttons: <verb + object, e.g. "Save changes", not "Submit">
  Errors: <say what happened and how to fix it>
  Empty: <what this is, why it is empty, one action>

States (each needs a line):
  empty-first-use | empty-no-results | loading | error | partial | success | disabled | no-permission

Conventions (3+ products agree): <bullets>
Common mistakes: <bullets>
Accessibility: <focus order, labels, keyboard, live regions>
Variants: <e.g. settings: single page vs sectioned>
Check before done: <3 to 5 yes/no questions>
Sources: <URLs of permissive references>
```

### Why each field

- "Use when / Not for" stops the agent picking the wrong pattern (a list-detail where a table fits).
- Skeleton and density are the transferable parts of a reference.
- States are the gap that screenshot sites leave. Primer and GOV.UK cover them in text.
- "Check before done" turns the entry into a review gate the agent can run on its own output.
- Sources keep provenance and let a human audit the licence.

### Size

About 11 entries (the screen types in section 4) at 60 to 100 lines each fits in one skill reference file under roughly 1,000 lines. The skill loads one entry at a time.

---

## Not checked

- Mobbin OpenAPI spec and exact MCP tool parameters (`docs.mobbin.com/openapi.json` not fetched).
- Refero dollar price (pricing page rendered empty to the fetcher).
- Tailwind Plus licence full text (sign-in wall).
- Material 3 licence wording (page rendered empty to the fetcher).
- Atlassian and Polaris pattern lists (only the licences were read).
- Lazyweb MCP endpoint and tools.
- Mobbin press release (HTTP 429).
