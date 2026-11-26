# Anti-slop

These are the defaults AI-built screens fall into. A ban alone moves the model to the next default, so each ban carries its replacement. Follow the replacement, not just the ban.

The brief's own words win. If the task or the house style asks for one of these, do it.

Sources: Anthropic frontend-design skill (https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md), OpenAI frontend guide (https://developers.openai.com/api/docs/guides/frontend-prompt), pixelslop catalogue (https://cdn.jsdelivr.net/npm/pixelslop@0.3.8/dist/skill/resources/ai-slop-patterns.md), impeccable (https://github.com/pbakaus/impeccable), Vercel guidelines (https://vercel.com/design/guidelines).

## Overcorrection: grey nothing

Avoiding slop must not produce an unbranded page. Judges punish both.

| Banned | Use instead |
|---|---|
| A near-monochrome page: white canvas, grey text, one blue button, no logo | A kit from `brand.md`: logo and mark, tinted frame, display titles, one domain detail. |
| A lone form or card floating in a blank 1440px canvas | A split layout with a brand panel, or the task inside the app shell with context. |
| A half-empty column or a dead right side on desktop | Size columns for content, add the side rail the pattern names, or narrow the layout and centre the whole composition. |
| Buttons floating below or beside content with no container | Actions in the page header row or inside the card they act on. |
| Generic image-placeholder icons for products and customers | Tinted initial tiles or a meaningful domain glyph. |
| System font with no hierarchy when network is allowed | The type pairing from `brand.md`. |

## Layout and structure

| Banned | Use instead |
|---|---|
| A hero, tagline or welcome banner on a product screen ("Welcome back, Sarah!") | Start with the working surface: the title, the key filters or numbers, the table or form. The sign-in and onboarding brand panel in `brand.md` is the one exception. |
| Content chopped into identical rounded cards | One surface. Group with space, headings and 1px dividers. A card only holds one object or one interaction. |
| A card inside a card | Flatten: the inner block becomes a section with a heading or a divider. |
| A grid of 3 or more identical cards for unlike content | A list or table, or sizes that follow importance. |
| Page sections styled as floating cards with shadows | Sections on the page background, separated by space and a heading. |
| Everything centred | Left-aligned on one edge. Centre only empty states, short dialogs and sign-in boxes. |
| Uniform spacing everywhere | Tight inside groups (4 to 12px), loose between groups (24 to 48px). |
| A rounded-square icon tile above every heading or feature | No icon, or one inline 16 to 20px icon where it speeds recognition. |
| A tracked-out ALL-CAPS eyebrow label above every heading | Just the heading. If a kicker carries real information (a step, a category), sentence case in `--text-muted`. |
| Numbered markers (01, 02, 03) on content that is not a sequence | No numbers. Numbers only for real steps. |
| A modal for a simple edit or a short form | Inline edit, a side panel, or a page. Modals for focused, short, blocking decisions. |
| Tabs for wizard steps | A stepper with "Step 2 of 4" and Back and Continue. |
| A hamburger menu on desktop | A visible sidebar or top nav. |

## Colour and surface

| Banned | Use instead |
|---|---|
| Purple-to-blue or any decorative gradient | Solid token colours. One accent. |
| Gradient text, `background-clip: text` | Solid `--text`. Emphasis by weight or size. |
| Glass panels, blurred blobs, orbs, bokeh, noise textures | Flat surfaces from the neutral ramp. |
| A coloured left border on callouts and cards (one-sided accent stripe) | A status banner: subtle tint, thin full border, icon, title. Or no decoration. |
| Grey text on a coloured background | Text tinted from that background's hue, or `--text` on a subtle tint. |
| Saturated colour on decoration (section backgrounds, icon tiles, dividers) | Colour only on actions, links, selection, focus and status. |
| Several accents (blue buttons, purple badges, teal links) | One accent. Status colours only for status. |
| Warm cream background with a high-contrast serif and a terracotta accent | The product's own tokens, or the default neutral tokens. |
| Near-black page with one acid-green or vermilion accent | Same: the product's tokens. Dark mode is a token swap of a calm theme. |
| Broadsheet layout: hairline rules, zero radius, newspaper columns | Product layout: sidebar or top bar, one content column, standard radii. |
| The same soft grey shadow under every box | Flat by default. Shadows only on layers that float. |

## Type

| Banned | Use instead |
|---|---|
| One weight and one size everywhere, hierarchy from size alone | Size, weight and colour together: title 24/600, section 16 to 20/600, label 14/500 muted, value 14/400. |
| Accenting one word of a heading in colour or italics | A plain heading. |
| ALL CAPS labels and buttons | Sentence case. |
| Monospace for small labels and numbers as a "tech" look | The UI font with `tabular-nums`. Mono only for code, keys and IDs people copy. |
| Light grey 12px meta text that fails contrast | `--text-muted`, 12px minimum, 4.5:1. |
| Meta strings joined with middle dots ("Admin · 3 seats · Active") as a default | Separate fields, labels, or a badge. Middle dots only in a dense one-line meta row that already has labels elsewhere. |
| Labels built as "WORD - fragment" with a spaced dash | A label and a value. |
| An arrow appended to every link or button ("View all →") | Plain text. An icon only where it means navigation out (external link). |

## Components

| Banned | Use instead |
|---|---|
| Every button styled primary | One primary per view. Secondary and tertiary for the rest. |
| Emoji as icons or status ("✅ Done", "🚀 Launch") | SVG icons from one set, status badges with text. |
| A KPI row of four identical cards, each with a big number, a green "+12.5%" and a sparkline | Fewer KPIs, chosen by the job. Each with a label, value, period and honest comparison. Sparklines only where trend matters. |
| Toggle switches that wait for a Save button | Checkboxes for deferred settings, switches for instant ones. |
| Placeholder text as the label, floating labels | A visible label above the field. |
| A disabled submit button until the form is valid | An enabled button and validation on submit. |
| Red asterisks on every field | "(optional)" on the few optional fields. |
| Tooltips holding information people need | Inline help text. |
| A spinner for a whole page | A skeleton that matches the layout. |
| Shimmer skeletons for content that loads instantly | Nothing under 1 s. |
| "Are you sure?" for every action | Undo for reversible actions. A specific confirm for irreversible ones. |
| Toasts for errors that need action | An inline error or a banner that stays. |
| Bottom nav with 6 or more items | 3 to 5 items, the rest under "More" or in a profile screen. |
| Charts with perfect smooth curves and no axis labels | Real-looking data with noise, labelled axes, units, period. |
| A "Pro tip" banner or tip card on a working screen | Help in context: a hint under the field, a link to docs. |

## Content and copy

| Banned | Use instead |
|---|---|
| Lorem ipsum, "John Doe", "Jane Smith", "Sarah Johnson", "Acme Inc", "example@email.com" | Realistic data from `fixtures.md`. |
| Round fake numbers (1,000 users, $10,000, 50%) | Plausible numbers: 1,284 users, $9,412.50, 47.3%. |
| Marketing copy inside the product ("Supercharge your workflow", "Unlock powerful insights") | Plain labels for what things are and do. |
| Text that repeats the heading ("Invoices" / "Manage your invoices here") | Drop it, or say something useful ("12 open, 3 overdue"). |
| "Oops!", "Uh oh", "Something went wrong" with no detail | What failed, whether data is safe, what to do now. |
| "Submit", "OK", "Click here", "Learn more" | Verb + object: "Send invoice", "Read the import guide". |
| Title Case On Every Label | Sentence case. |
| Exclamation marks in success messages ("Saved!") | "Changes saved". |
| Fake testimonials, fake logos, stock smiling avatars | Leave them out, or initials avatars on real-looking names. |

## Motion

| Banned | Use instead |
|---|---|
| Fade-and-slide-up on every section on load | No load animation. Content is just there. |
| Hover lift and shadow on every card | Hover only on things that are clickable, as a background tint. |
| `transition: all` | Named properties, 120 to 200 ms. |
| Bouncing, pulsing or looping animation on a working screen | A static indicator. Motion only answers an action. |

## Final scan

Before finishing, look at the screenshots and answer: would a designer at the best product in this category ship each element on this screen? Remove the first one that fails. Then check this list once more.
