# Changelog

## 5.0.0 (2026-11-27)

Why: in round proof2 the skill lost all 24 groups. Light mean: prompt 7.80, anthropic 7.39, skill 6.42, baseline 6.19 (`runs/proof2/stats.md`). The skill still led on mechanics: 0 serious axe errors and 0.9 tap targets under 44px per page, against 20 to 28 for the other arms. v5 moves the agent's effort from process to look and feel, and keeps the checker.

### Look and identity

- **New `references/look.md` replaces `brand.md`.** Six kits (Pantry, Atelier, Harbour, Clinic, Depot, Studio) set every colour token, including a tinted page colour, in light and dark. Every pair passes AA: muted text at least 5.3:1, accent at least 5.2:1, field edges at least 3.2:1. Evidence: the prompt arm put the page on a tinted paper colour on 24 of 24 pages, the anthropic arm on at least 22 of 24. The skill used `#ffffff` on 24 of 24.
- **Type pairings that need no web font.** Serif display (Iowan Old Style, Palatino Linotype, Georgia), humanist display (Avenir Next, Segoe UI Variable Display) and condensed display (Bahnschrift, DIN Alternate), each tied to a kit with a title size and weight. Rendered and checked in Playwright Chromium on Windows. Evidence: 21 of 48 prompt and anthropic pages used a serif display stack. All 24 skill pages used the plain system stack, because `evals/RULES.md` bans external fonts and v4 only offered Google Fonts.
- **Removed the bans on a serif display and on a warm paper page.** v4's anti-slop table banned both. The two winning arms used both, and judges rewarded them.
- **New `references/art.md`: drawn product art in inline SVG.** It covers one art-kit technique (symbols coloured through CSS custom properties, six palettes) and tested recipes for a dish, grocery items, a shoe, a person, a home, a van and a map tile. It also covers composites (an order as a row of item pictures, a featured item, empty-state art). Evidence: on 11-search-results s1, all four judge notes called the skill's thumbnails placeholders ("every result uses the same generic pot icon"), and two more notes on s2 named the same repeated icon. The prompt arm drew a different dish for each recipe.

### Hierarchy and density

- **One featured item leads** where the domain has one (look.md section 4, the bar item 3, and the `search.md` and `lists.md` patterns). Evidence: the prompt arm's best-match hero card on 11-search-results. On the phone the hero is capped at 40% of the first screen, because judges faulted the prompt arm for a hero that filled the phone fold (11-search-results s1 and s2).
- **Fewer columns and two-line rows** in tools: at most 6 columns, with meta folded into a second line (`data-table.md`). A summary strip must fill its width. Evidence: 16-stock-levels s1 skill table had 10 columns. On s3, two judges noted "the two-stat summary strip leaves the right two-thirds empty".
- **No stacked mini-tables on the phone** (craft.md). Evidence: 09-team-members s1: "every card repeats 'Open reviews' and 'Last active' label rows".
- **Underlined links only inside sentences.** The base CSS no longer underlines every `p a`. Evidence: 10-notifications s2, all four judges: "underlined links in nearly every title make the list noisy".
- **Search matches in bold or a soft tint**, never a wavy underline. Evidence: 11-search-results s2, all four judges: "reads as a spelling error".

### Honest actions

- **A required choice gates the primary action.** The button names what is missing ("Select a size", "Choose a time") and looks inactive with `aria-disabled`, but stays focusable. Typed forms still keep Submit enabled. This replaces v4's flat "never disable Submit". Evidence: 7 of 12 judge notes on 15-mobile-booking named "Book check-up looks enabled before any time is chosen", and 12-mobile-product s1 had the same note. The anthropic arm's "Select a size" button scored well.
- **The job sits in the first phone screen, and no sticky bar covers it** (craft.md, `mobile.md`, `checkout.md`, `lists.md`). Evidence: judges found the size picker, the time slots or the reply box hidden on 7 of the 9 skill pages for tasks 12, 14 and 15.
- **A form with a total has a summary rail that holds the submit button.** v4 put the submit "at the end of the form" (`forms.md`). Evidence: 7 of 12 judge notes on 13-expense-report named a submit that sat only at the bottom.
- **One urgent notification leads**, and routine rows get quiet actions (`notifications.md`). Evidence: 10-notifications s1 and s3: "every row action is the same outline button".
- **Inline invite and a seat meter on team pages** (`admin.md`). Evidence: 09-team-members s2: "no seat usage anywhere" and "the invite action has no form on the page". The prompt arm, which won all three groups, had both.

### Process cost

- **Fewer files to read per run.** A run reads about 520 lines without art and 670 with art, against about 935 in v4. `brand.md`, `anti-slop.md` and `fixtures.md` are gone. Their working rules moved into `look.md` and `craft.md`, cut to the lines that judges or the checker act on. `tokens.md` went from 216 to 83 lines, and `SKILL.md` from 203 to 159.
- **States only when the task names them.** v4 built three "Must" states per page. Judges score screenshots of the default view only (desktop, mobile, dark), and no proof2 note mentions another state.
- **The look step judges the look against a concrete bar.** The 15-item defect checklist became a 12-item bar that starts with world, imagery, leads, density, phone job and honest action. The agent pictures the same screen at a named top product. It must run at least 2 look rounds, against 1 in v4.
- **A brief line for the phone first screen.** The agent writes what fills 844px before it builds.

### Checker (`scripts/ui-check.mjs`)

- New `--help`.
- New WARN `repeated-art`: 3 or more pictures or icon tiles of 48px or more that render pixel for pixel the same. It fires on skill/11-search-results-s1 (6 and 3 copies) and not on prompt/11-search-results-s1.
- New WARN `underlined-titles`: 4 or more underlined links that stand alone as titles or rows. It fires on skill/10-notifications-s2 (13 links).
- New WARN `column-ends-early`: a painted column ends more than 80px above a side-by-side sibling. This extends the `short-background` check below the first screen. It gave no false positive on 6 proof2 pages across all arms. It did not reproduce the 14-support-conversation s2 defect, because that page only grows past 900px in the harness's full-page capture.
- The `font-sizes` WARN now allows 10 sizes in total, up from 8. The display sizes of a serif title, a featured title and a key number are intended.
- Messages now point to `look.md` and to the bar.

### Dry run

The dry run built a Pantrybox order history page (`runs/v5-dry/order-history/`) with a fresh Sonnet agent that followed v5. The checker reported 0 FAIL and 0 WARN. These fixes came from that run:
- `art.md`: never overlap square item tiles. The phone thumbnails hid each other's objects.
- `art.md`: the object fills 70 to 85% of its tile, and there is guidance for a `slice` crop of square tiles and maps.
- `art.md`: a map is a hero only with the answer on it, and it is at most 240px tall on the phone.
- `look.md`: the six text sizes are named.
- `look.md` and the bar: the fold count is "after the featured item, 2 to 5 items".
- `craft.md`: on a page with two jobs, the featured item's action is the filled primary.
- `lists.md`: an anatomy for a phone order row.
- `SKILL.md`: ui-check's screenshots are enough for the look step.
