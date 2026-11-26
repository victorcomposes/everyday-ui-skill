# References

Use outside references to learn structure, density, states and copy from real products. Never copy pixels, brand, illustrations or text. Build from the brief, never from one screenshot.

## Fallback order

1. The project itself: an existing screen of the same kind. Always first in a codebase.
2. Mobbin MCP, if connected.
3. Refero MCP, if connected.
4. The free design systems in section 4, read on the web if a fetch tool is available.
5. The built-in pattern file in `patterns/`. Always available. It is enough on its own.

Do not stall if 2 to 4 are missing. Say which sources you used in your report.

## 1. Mobbin

- Access: the official MCP server at `https://api.mobbin.com/mcp` (Streamable HTTP, OAuth sign-in on first connect). It needs the user's own Pro, Team or Enterprise plan. Source: https://mobbin.com/mcp.md
- Tools: `search_screens`, `search_flows`, `search_sections`, plus collection tools you do not need here. Source: https://docs.mobbin.com/mcp/features
- Limit: 60 requests per 60 s per user. On HTTP 429, wait for `Retry-After`. Three to six calls per screen is plenty.
- Never drive a browser over a signed-in Mobbin session, never scrape, never use community "reverse-engineered" MCPs. Terms 3.2(c), 3.2(e) and 3.2(m) ban automated access and bypassing limits. Source: https://mobbin.com/terms
- Terms 3.5 allow the API and MCP for the user's own internal use and products, and ban building "a standalone content repository". So: never save Mobbin images, URLs or payloads into the repo, the skill or a cache. Image URLs expire after 30 days anyway.
- Terms 3.4 restrict using AI to create derivative works of Mobbin content. So extract the pattern (structure, density, states, copy shape), then design your own screen. Never reproduce one screen.

## 2. Refero

- Access: official MCP at `https://api.refero.design/mcp`, OAuth or bearer token, paid plan, about 8,000 calls per user per month. Add it in Claude Code with `claude mcp add --transport http refero https://api.refero.design/mcp`. Source: https://doc.refero.design/mcp/getting-started.md
- Tools: `refero_search_screens`, `refero_get_screen` (patterns, elements, content structure as text), `refero_get_similar_screens`, `refero_search_flows`, `refero_get_flow`, `refero_search_styles`, `refero_get_style`. Source: https://raw.githubusercontent.com/referodesign/refero_skill/f78b4eccf112d7a179b92afeafdd7e8684560ac2/references/mcp-tools.md
- Refero returns screen structure as text, so you rarely need the image. Use `refero_get_flow` for multi-step patterns (onboarding, checkout, sign-up).
- Do not use `refero_get_style` to pick a look for an existing product. The product's tokens win.

## 3. How to search

- Search by what is literally on the screen, not by mood: "team members table with role dropdown and invite button", "settings page with left section nav and danger zone", "empty inbox state with one action". Not "clean modern dashboard".
- Pick 3 to 5 screens from different products. One product's screen is a style, three products' agreement is a convention.
- For flows, search the flow ("sign up with email verification", "checkout guest flow").
- Prefer mature products in the same domain and platform (web app vs iOS).

## 4. Free design systems

Read these for rules and structure. Licence column says whether text may be bundled. Reading to inform a design is always fine.

| Source | Best for | Licence |
|---|---|---|
| GOV.UK Design System, https://design-system.service.gov.uk/patterns/ | Forms, validation, question pages, check answers, confirmation, accounts, passwords, dates, addresses, payment, task lists, error pages | OGL v3 and MIT: bundle with attribution |
| USWDS, https://designsystem.digital.gov/patterns/ | Complex forms, profiles, language selection | Public domain |
| GitHub Primer, https://primer.style/product/ui-patterns/ | Empty states, loading, saving, forms, notifications, degraded states, progressive disclosure, onboarding, dense developer UI | MIT |
| shadcn/ui blocks, https://ui.shadcn.com/blocks | Concrete skeletons: dashboard, sidebar, sign-in, sign-up | MIT |
| Android canonical layouts, https://developer.android.com/develop/ui/compose/layouts/adaptive/canonical-layouts | List-detail, feed, supporting pane, breakpoints | Read only |
| Apple HIG patterns, https://developer.apple.com/design/human-interface-guidelines/patterns | Onboarding, settings, search, loading, notifications, entering data, undo | Read only, do not bundle |
| Atlassian Design System, https://atlassian.design/ | Tables, empty states, messaging, flags | Read only, do not bundle |
| Shopify Polaris, https://polaris-react.shopify.com/ | Resource index and detail, settings, admin | Read only, do not bundle |
| Baymard Institute, https://baymard.com/research/checkout-usability | Checkout, cart, forms | Cite facts, never copy text |
| Nielsen Norman Group, https://www.nngroup.com/articles/ | Empty states, loading thresholds, dialogs, errors, tables | Cite facts, never copy text |

Which to read per screen: forms and checkout read GOV.UK and Baymard. Empty, loading and saving read Primer. Tables read Atlassian or Polaris plus https://mattstromawn.com/writing/tables/. Mobile list and detail read Android canonical layouts. Settings and onboarding read Apple HIG and Primer.

## 5. The reference brief

Write this in your notes after the searches. It feeds steps 2 and 3 of the workflow.

```
Pattern: <screen type>
Sources: <3 to 5 URLs or Mobbin/Refero screen ids, never images>
Convention (3+ agree): <what most products do: layout, primary action place, save model>
Flourish (1 does): <an idea worth taking on purpose, or none>
Skeleton: <regions in order with sizes, desktop and phone>
Density: <row height, base space, items above the fold>
Components: <named, mapped to the house library>
States seen: <empty, loading, error, partial, success, disabled, no permission>
Copy shape: <title form, button verbs, empty and error wording, rewritten in your words>
Responsive: <what collapses at 390px>
```

Rules:
- Follow the convention unless the brief gives a reason not to.
- Take at most one flourish, and only if it serves the job.
- Inspiration sites show the happy path. The states line comes mostly from the design systems and the pattern file.
- Never paste copy. Rewrite it for this product's user.
