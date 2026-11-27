# Craft

Scan once before markup and once against the screenshots. Each line is a rule, then the reason. Lines marked (proof2) fix a defect judges named on skill pages.

## Actions and honest states

- [ ] One filled accent button per view. Others are secondary (outline or tinted) or text.
- [ ] **A required choice gates the primary action** (a size, a time slot, a seat, a plan). Until the choice is made the button names what is missing ("Select a size", "Choose a time") and looks inactive: `--bg-subtle` fill, `--text-muted` label, `aria-disabled="true"`. It stays focusable, and a tap scrolls to the choice and says what to pick. (proof2: 7 of 12 judge notes on the booking task named a "Book" button that looked enabled before a time was chosen.)
  ```css
  .btn-primary[aria-disabled="true"] { background: var(--bg-subtle); color: var(--text-muted); box-shadow: inset 0 0 0 1px var(--border); cursor: not-allowed; }
  ```
- [ ] Typed forms are different: keep Submit enabled and validate on submit. With no changes, Save says "No changes to save".
- [ ] **The primary action is in view where the person decides.** On long forms with a summary rail, the rail holds the total and the submit button, sticky on desktop. The end of the form repeats it. (proof2: 7 of 12 judge notes on the expense report named a submit that sat only at the bottom.)
- [ ] Pages: the primary sits at the right of the page header row. Every other action sits in the header or inside the card it acts on.
- [ ] A page with two jobs (track today's order and reorder past ones): the featured item's action is the filled primary, and the action repeated on every row is secondary.
- [ ] Row actions: at most one per row, quiet (text button or icon menu), in a fixed trailing column. A bulk action in the toolbar beats the same button on every row. (proof2: "a Reorder button on every row and no sense of what to do first".)
- [ ] Phone header: the title and its action group stay together. Secondary actions fold into one "More" menu beside the primary.
- [ ] Destructive actions name the object and offer Undo, or a specific confirm for irreversible ones.
- [ ] Pending: keep the button width, show "Saving…", block double submit. Success reuses the verb ("Sent").

## Phone first screen

- [ ] **The job is in the first 844px.** Write down what fills the first phone screen. Top bar plus title under 140px, then the thing the person came to do: the size picker, the time slots, the reply box, the first result. A hero image takes at most 40% of the screen. (proof2: judges named a hidden job on 7 of the 9 skill pages for the booking, product and support tasks.)
- [ ] A sticky bar never covers the job. Under 100px with the safe area, `scroll-padding-bottom` equal to its height, and the page content ends above it.
- [ ] Phone lists are rows, not stacked mini-tables. One line for the name, one muted line for the facts. No label repeated in every card. (proof2: "every card repeats 'Open reviews' and 'Last active' label rows".)
- [ ] Every tap target 44 by 44px, links too (`display: inline-flex; align-items: center; min-height: 44px`). Inputs 16px or more.
- [ ] Nav that does not fit becomes a menu, a select or a bottom tab bar of 3 to 5. A strip that scrolls shows a fade and end padding. Nothing is clipped at the right edge.
- [ ] Nothing scrolls sideways. Badges `nowrap`. Labels and chips at least 8px apart.

## Type, links and numbers

- [ ] Links inside sentences are underlined. Titles, rows, cards and nav are links without underline, with a hover tint. (proof2: underlined titles made the notification list "noisy" for all four judges.)
- [ ] Search matches: bold, or a soft accent-tinted `mark` with 2px radius. Never a wavy or red underline, never splitting a word. (proof2: a red wavy underline "reads as a spelling error".)
- [ ] `tabular-nums` on tables, totals, prices and timers. Numbers right-aligned in tables. One decimal rule per column. Currency once. Real units ("2 kg", "3 days"), never "0.0 d".
- [ ] Dates: relative within 7 days ("Today, 14:30", "Tue"), absolute after ("12 Nov"). Full timestamp in `<time datetime>`.
- [ ] Sentence case. `text-wrap: balance` on headings. No ALL CAPS labels except a 1-word badge.
- [ ] Nothing under 12px. Short text (names, labels, buttons) never wraps to 3 lines.

## Layout

- [ ] One content width and one right edge per page. Side rails 320 to 400px.
- [ ] Side-by-side columns end together. A column background runs the full page height: the background lives on the grid column, only the inner nav is sticky. (proof2: "the conversation and details pane backgrounds stop about 1150px down".)
- [ ] Phone-only screens at desktop width: one centred 390 to 430px column on `--surface` with `--r-xl` and `--shadow-pop`, on the `--bg` page. Sticky bars inside the column.
- [ ] Small-content screens (sign-in, onboarding, confirmations) on desktop: a split layout with a `--deep` or art panel, or the task inside the app shell. Never a lone card in a blank canvas.
- [ ] Spacing from the 4px scale: tight inside a group, loose between groups. No region taller than its content.

## Data

- [ ] One data module, typical believable values, at most one naturally long value in the default view. Invented names and companies, `example.com` emails, prices in the local currency of the place named.
- [ ] Choose the headline numbers by hand, derive every count, badge, total, chart point and bar length from the data in code. Never type a count. (proof2: "29 members plus 3 invites, 31 of 40 seats, 1-25 of 32"; rating bars "the same length although their counts are 98, 41 and 27".)
- [ ] Statuses agree with dates and a fixed `TODAY`. Line items add up to the total to the penny.
- [ ] Missing values: "Not set" or a muted en dash with `aria-label="None"`. Never "null", "NaN", "Invalid Date".
- [ ] Never lorem ipsum, "John Doe", "Acme", round fake numbers ($10,000, 50%).

## Do not

| Do not | Do instead |
|---|---|
| Icons as product images, the same tile on every item | Drawn art per item (`art.md`) |
| A white page with grey text and one blue button | A kit from `look.md`: tinted page, surfaces, committed accent |
| Every item the same size | One featured item, then the rest |
| A grid of identical cards for unlike content, a card inside a card | A list or table, one surface per object |
| Gradients, gradient text, glass, blobs, glow | Flat token colours |
| A coloured stripe on one side of a card | A status badge or a tinted banner |
| A tracked-out ALL CAPS eyebrow above every heading | Just the heading |
| Emoji as icons or status | SVG icons from one set, text badges |
| A welcome hero or marketing copy on a working screen ("Supercharge your…") | The title, the key facts, the job |
| KPI cards with a big number, a green "+12.5%" and a sparkline each | 3 or 4 numbers with a sentence each |
| "Oops", "Something went wrong", "Submit", "Click here" | What happened and the next step; verb plus object |
| Fade-in on load, hover lift on every card, `transition: all` | Motion only answers an action, 120 to 200ms, named properties |

## Dark and accessibility

- [ ] Dark is a token swap with `color-scheme`. Surfaces rise by lightness. Art tiles darkened. No white islands.
- [ ] Landmarks, a skip link, one `h1`, headings in order, real `button`, `a`, `label` and `table`. Visible labels above fields. `:focus-visible` ring. Colour never the only signal.
- [ ] Closed drawers and sheets use `hidden` or `inert`.
