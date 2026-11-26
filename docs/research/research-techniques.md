# What makes coding agents produce good, non-generic UI for everyday product screens

Research date: 2026-11-26. Every claim carries its source URL. "Fetched" means I read the page in this session. "Unverified" means I could not read the primary page, or the source is a leak or a secondary write-up.

## 0. Bottom line

1. **Anthropic's own skill aims at distinctive marketing pages, not product screens.** Its rules push toward "one aesthetic risk". For dashboards, forms and tables, OpenAI's frontend guide and impeccable's "operate" mode say the opposite: restraint, start from the working surface, no hero, cards only around interactions.
2. **Bans alone move the default, they do not remove it.** Anthropic's Sonnet 5 guide says generic "don't use that color" instructions shift the model to another fixed palette. Concrete specs (hex values, radius, fonts) and "propose options first" work reliably.
3. **Deterministic detectors exist and are cheap.** impeccable ships 62 rules with no LLM. pixelslop publishes 26 visual patterns with numeric thresholds. Both can become eval metrics.
4. **Screenshot critique loops help, with caveats.** A VLM critic gave up to +17.8% over three cycles on WebDev Arena prompts. Multi-screenshot judges agree with human experts 90.95% versus 79.06% with no image. Unconstrained revision can get worse, so accept a revision only if it scores better.
5. **The classic rules are codifiable with numbers.** WCAG contrast and target size, GOV.UK form rules, NN/g loading thresholds and table alignment rules all give checkable thresholds.

---

## 1. Anthropic's frontend-design skill and blog

### 1.1 The current SKILL.md (anthropics/skills)

Source, fetched: https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md

The Claude Code plugin path `https://raw.githubusercontent.com/anthropics/claude-code/main/plugins/frontend-design/skills/frontend-design/SKILL.md` returned 404 on 2026-11-26. The Claude docs still link to it (https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5). It may have moved. Unverified whether the two copies differ.

Key instructions, quoted exactly:

- Process: "create a compact token system with color, type, layout, and principles." The summary of the file adds 4 to 6 named hex colours, type roles, an ASCII wireframe of the layout, then a review of the plan against the brief before building.
- Self-critique: "Critique your own work as you build, taking screenshots to review if your environment supports it"
- Subtraction: "Consider Chanel's advice: before leaving the house, take a look in the mirror and remove one accessory."
- Type: "use one family or two, and if two, make them clearly distinct." and "Default to line lengths of less than 80 characters."
- Motion: "Use non-user-triggered motion sparingly and deliberately, only to draw attention."
- Floor: "Build to a quality floor without announcing it: responsive down to mobile, visible keyboard focus," (also reduced motion and accessibility, per the fetch summary).
- Named AI defaults to avoid:
  - "a warm cream background (near #F4F1EA) with a high-contrast serif display" (with a terracotta accent)
  - "a near-black background with a single bright acid-green or vermilion accent;"
  - "a broadsheet-style layout with hairline rules, zero border-radius, and dense newspaper-like columns;"
  - "content chopped into identical rounded cards, one border-radius on everything regardless of hierarchy,"
  - "tinted near-black (#0B0B0B, #111) standing in for black"
  - "a tracked-out ALL-CAPS eyebrow label above every heading"
  - "a monospace face for small data labels"
  - "Accenting just a single word or phrase in a headline, like putting one word in italic/bold or a different color."
  - The fetch summary also lists middle-dot meta strings, spaced dash labels and arrows appended to links.
- Copy rules (from the fetch summary): plain language, sentence case, active voice. Errors say what happened and how to fix it, without apology. Empty states invite action.

### 1.2 The rewrite

Source, secondary, unverified against GitHub: https://dev.to/kenimo49/anthropic-rewrote-frontend-design-skill-3-ai-design-cliches-named-with-hex-codes-22m4

- The article says the rewrite landed on June 18 in commit `423563cf` and bumped the plugin to 1.1.0. Unverified.
- Old version: "Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined..."
- New version: "...take one real aesthetic risk you can justify." and "Spend your boldness in one place."
- On the clichés: "they are defaults rather than choices, and they appear regardless of subject."
- Lesson: the old "pick an extreme" prompt produced its own new defaults (cream and serif, black and acid green). Anthropic then had to ban those too.

### 1.3 Blog post "Improving frontend design through Skills" (2025-11-12)

Source, fetched: https://claude.com/blog/improving-frontend-design-through-skills

- Diagnosis: "During sampling, models predict tokens based on statistical patterns in training data." and "Without direction, Claude samples from this high-probability center." The post calls this distributional convergence.
- Type: "Never use: Inter, Roboto, Open Sans, Lato, default system fonts". "Use extremes: 100/200 weight vs 800/900, not 400 vs 600."
- Colour: "Commit to a cohesive aesthetic. Use CSS variables for consistency." "Dominant colors with sharp accents outperform timid, evenly-distributed palettes."
- Avoid: "Clichéd color schemes (particularly purple gradients on white backgrounds)".
- Anti-convergence: the model still drifts to Space Grotesk, so the prompt ends "it is critical that you think outside the box!"
- The general prompt is about 400 tokens.
- Evidence: side-by-side screenshots only (SaaS landing page, blog, admin dashboard). No sample size, rubric, blinding or repeated runs. Illustrative, not systematic.

### 1.4 Claude prompting docs

Source, fetched: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-4-best-practices (redirects to claude-prompting-best-practices)

- The `<frontend_aesthetics>` snippet opens: "You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic."
- It lists "Overused font families (Inter, Roboto, Arial, system fonts)", "Clichéd color schemes (particularly purple gradients on white backgrounds)", "Predictable layouts and component patterns", "Cookie-cutter design that lacks context-specific character".

Source, fetched: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5

This is the most important finding for skill design:

- "A default house style can read well for some briefs but be a poor fit for dashboards, dev tools, fintech, healthcare, or enterprise apps."
- "Generic instructions ("don't use that color," "make it clean and minimal") tend to shift the model to a different fixed palette rather than producing variety."
- What works: "Specify a concrete alternative. The model follows explicit specs precisely". The example gives five hex values, "4px corner radius consistently across cards, buttons, inputs, and media frames", a named typeface and a 160ms hover transition.
- Second method: "Before building, propose 4 distinct visual directions tailored to this brief (each as: bg hex / accent hex / typeface, plus a one-line rationale)."

**Implication for our skill:** for an existing product, the concrete spec is the product's own design tokens. The skill should make the agent read and reuse them, not invent an aesthetic.

---

## 2. Other public design skills and prompt packs

### 2.1 impeccable (pbakaus)

Sources, fetched: https://github.com/pbakaus/impeccable, https://raw.githubusercontent.com/pbakaus/impeccable/main/.claude/skills/impeccable/SKILL.md, `reference/mode-operate.md`, `reference/craft-floor.md`, `reference/critique-rubric.md` under the same raw path.

What it is: a design "vocabulary" built from Anthropic's skill. The README lists about 117k stars (unverified count), 24 commands and support for 20 agent tools. Version 4.11.1.

What is clever:

- **Modes by surface, not product.** Persuade (marketing), Operate (app UI, dashboards, admin), Read (docs), Experience (portfolios). Operate quote: "Brand lives in precise details."
- **Context files.** `PRODUCT.md` and `DESIGN.md` are written once and read by every later command. This is the "concrete spec" method from the Sonnet 5 guide, made persistent.
- **Deterministic detector.** "62 deterministic rules flag the tells above," "No LLM, no API key." Command: `npx impeccable detect src/`, with `--json` and `--sarif`. JSX and TSX get pattern rules only. Contrast and tiny text need a rendered URL. Exit code 2 means findings.
- **Render to verify.** "Verify by looking at the rendered result at the sizes it ships at." and "fix what one look shows before looking again."
- **Refinement versus redesign.** "Refinement preserves; redesign replaces." The skill keeps the existing identity unless told otherwise.

craft-floor.md numeric rules, quoted: "body and placeholder text ≥4.5:1, large text ≥3:1", "body measure 65–75ch", "display max 6rem", "tracking floor -0.04em". Other floor items: headings get more space above than below. Secondary text on coloured surfaces is tinted from the hue, not grey. Cover hover, disabled, loading, error, empty and focus states. Use tabular numerals.

craft-floor.md refuse list (unless the brief earns it): card-based page structure, hero-metric layouts, modals for simple tasks, eyebrow labels (banned outright), numbered sections, gradient text, decorative glass, one-sided accent borders, hard offset shadows, sparklines and placeholder graphics, monospace as decoration, emoji or Unicode as icons.

mode-operate.md (product UI): no numbers. Rules: the world contributes "four things and only these": type, palette, density and one signature move. It never supplies layout, navigation or controls. "A grey screen with one accent colour is the category default without the category's polish, not restraint." "The finish bar is the best product in the category." Use realistic content: plausible values with units, real labels. Red for critical and amber for degraded only where they carry meaning.

critique-rubric.md: Nielsen's 10 heuristics, each scored 0 to 4 ("a 4 means genuinely excellent, not "good enough.""). A cognitive-load checklist: ≤4 items per group, ≤4 visible options. Personas by surface: dashboard and admin use "Alex" (power user) and "Sam" (screen reader, keyboard only). Forms use Jordan, Sam and Casey.

What is fluff: 24 commands is a lot of surface for one agent to route. Commands such as `delight` and `overdrive` target marketing work. The mode-operate file has no numbers.

### 2.2 ui-ux-pro-max (nextlevelbuilder)

Source, fetched: https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/main/.claude/skills/ui-ux-pro-max/SKILL.md . Repo: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill

- A searchable local database: 80 styles, 194 palettes, 74 font pairings, 141 UX guidelines, 25 chart types. A Python `search.py` with `--design-system` generates a palette, type and anti-pattern set and can persist `MASTER.md`.
- Concrete rules quoted: "Contrast 4.5:1, Alt text, Keyboard nav, Aria-labels". "Min size 44×44px, 8px+ spacing, Loading feedback". "Reserve space (CLS < 0.1)". "Base 16px, Line-height 1.5, Semantic color tokens". Avoid "Text < 12px body". "SVG icons (no emoji)". "Bottom nav ≤5".
- Density dial: spacious 24 to 96px, standard 16 to 64px, dense 8 to 32px.
- Clever: the priority ordering (accessibility first) and the density dial. Fluff: a palette lookup by product category tends to produce yet another stock look. A Python script dependency is a cost.

### 2.3 taste-skill (Leonxlnx)

Source, fetched: https://raw.githubusercontent.com/leonxlnx/taste-skill/main/README.md

- Targets landing pages, portfolios and redesigns. A script deals a palette, a font pairing and one of eleven hero layouts. It checks for empty visuals, contrast drops, misaligned columns and placeholder text, and runs up to three finish rounds.
- Clever: randomised dealing to beat convergence, and a bounded three-round finish gate. Not relevant to product screens: shaders, scroll scenes, hero layouts.

### 2.4 Vercel Web Interface Guidelines

Source, fetched: https://vercel.com/design/guidelines

The most checkable rule list I found. Quotes:

- "On mobile, the minimum size is 44px." "Prefer `:focus-visible` over `:focus`". "`<input>` font size is ≥ 16px on mobile to prevent iOS Safari auto-zoom/pan on focus."
- "Never `transition: all`." "Prioritize GPU-accelerated properties (`transform`, `opacity`)".
- "Skeletons mirror final content exactly to avoid layout shift." "Don't rely on color alone; include text labels."
- "Keep submit enabled until submission starts; then disable during the in-flight request," "Show errors next to their fields; on submit, focus the first error."
- "Child radius ≤ parent radius & concentric so curves align." "`:hover`, `:active`, `:focus` have more contrast than rest state."
- "display currency with either 0 or 2 decimal places, never mix both."

### 2.5 OpenAI frontend guidance (primary source, a useful contrast)

Sources, fetched: https://developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4 and https://developers.openai.com/api/docs/guides/frontend-prompt

This is the clearest published guidance on product screens as distinct from landing pages:

- Apps: "Default to Linear-style restraint". "Start with the working surface itself: KPIs, charts, filters, tables, status, or task context." "Do not introduce a hero section unless the user explicitly asks for one."
- "should feel quiet, utilitarian, and work-focused rather than illustrative or editorial". "You do not use visible, in-app text to describe the application's features".
- Cards: "Default: no cards." "Cards are allowed only when they are the container for a user interaction." "If removing a border, shadow, background, or radius does not hurt interaction or understanding, it should not be a card." "You do not put UI cards inside other cards." "Do not style page sections as floating cards."
- Existing systems: "pay careful attention to existing conventions and ensure that what you build is consistent with the frameworks used". "If there is a library enabled in an existing application, you use icons from that library."
- Bans: "You do not add discrete orbs, gradient orbs, or bokeh blobs". "limit dominant purple/purple-blue gradients, beige/cream/sand/tan, dark blue/slate". "You do not scale font size with viewport width".
- Tokens: "Define core design tokens such as `background`, `surface`, `primary text`, `muted text`, and `accent`".
- Verification: "you verify with Playwright screenshots and canvas-pixel checks across desktop/mobile viewports".

---

## 3. How v0, Lovable and Bolt steer design

All three are leaks or community copies. Treat exact wording as unverified.

### 3.1 v0 (Vercel)

Source, fetched: https://raw.githubusercontent.com/x1xhlol/system-prompts-and-models-of-ai-tools/main/v0%20Prompts%20and%20Tools/Prompt.txt (leak, version date unknown). Earlier leak: https://simonwillison.net/2024/Nov/25/leaked-system-prompts-from-vercel-v0 (not fetched).

- Colour: "ALWAYS use exactly 3-5 colors total." "Choose 1 primary brand color" "Add 2-3 neutrals (white, grays, off-whites, black variants) and 1-2 accents". "NEVER exceed 5 total colors without explicit user permission".
- Type: "ALWAYS limit to maximum 2 font families total." "Use line-height between 1.4-1.6 for body text". "NEVER use decorative fonts for body text or fonts smaller than 14px".
- Layout: "Prefer the Tailwind spacing scale instead of arbitrary values". "Prefer gap classes for spacing". "NEVER mix margin/padding with gap classes on the same element". "NEVER use floats or absolute positioning unless absolutely necessary".
- Gradients: "Avoid gradients entirely unless explicitly asked for. Use solid colors." "Maximum 2-3 color stops".
- Icons: "Use consistent icon sizing: typically 16px, 20px, or 24px". "NEVER use emojis as icons".
- A search summary of the Mintlify copy also reports "Never use purple/violet prominently unless requested". The 2024 leak said v0 "DOES NOT use indigo or blue colors unless specified". Both unverified, Mintlify returned 410.

### 3.2 Lovable

Source, fetched: https://raw.githubusercontent.com/x1xhlol/system-prompts-and-models-of-ai-tools/main/Lovable/Agent%20Prompt.txt (leak)

- "CRITICAL: USE SEMANTIC TOKENS FOR COLORS, GRADIENTS, FONTS, ETC."
- "DO NOT use direct colors like text-white, text-black, bg-white, bg-black, etc."
- "Everything must be themed via the design system defined in the index.css and tailwind.config.ts files!"
- "You should never write custom styles in components, you should always use the design system"
- "Create variants in the components you'll use immediately." "Shadcn components are made to be customized!"
- Lesson: Lovable steers by forcing all styling through tokens and component variants. This makes a screen consistent, and makes a later palette change a one-file edit.

### 3.3 Bolt

- The open-source Bolt prompt has no design rules. Source, fetched: https://raw.githubusercontent.com/x1xhlol/system-prompts-and-models-of-ai-tools/main/Open%20Source%20prompts/Bolt/Prompt.txt
- The common `.bolt/prompt` file asks for designs that are "beautiful, not cookie cutter" and production-worthy, defaults to Tailwind and lucide-react, and links Unsplash photos. Source, fetched (summary only, not verbatim): https://huggingface.co/spaces/AntDX316/HF-Spaces/blob/main/.bolt/prompt . Unverified whether this is Bolt's official default.
- Lesson: a one-line "make it beautiful" adds little. The numeric limits in v0 and the token discipline in Lovable are the parts worth copying.

---

## 4. Named "AI slop" UI patterns

### 4.1 pixelslop catalogue (the most measurable list)

Source, fetched: https://cdn.jsdelivr.net/npm/pixelslop@0.3.8/dist/skill/resources/ai-slop-patterns.md

26 visual patterns with detection rules on a rendered DOM. The ones that matter most for product screens:

| Pattern | Detection rule |
|---|---|
| Gradient text | heading or metric with `background-clip: text` |
| Purple-to-blue gradients | any gradient background with purple or blue |
| Hero metric layout | ≥2 elements with font-size ≥24px and short numeric text |
| Identical card grids | ≥3 identical-size children, ≥100×80px |
| Generic font stack | body and h1 both Inter, Roboto, Arial, Open Sans, Helvetica or system-ui |
| Nested cards | bordered or shadowed element with radius >4px inside another, flagged at >1 |
| Rounded rectangles with generic shadows | 8 to 20px radius plus box-shadow, flagged at >4 |
| One-sided accent borders | one side ≥3px, others <2px, flagged at >2 |
| Everything centred | >70% of h1-h3, p and section children centred |
| Icon above heading | h2-h4 preceded by an icon, flagged at ≥3 |
| Redundant information | text under a heading shares >40% of its words |
| Every button is primary | ≥3 buttons with uniformity >0.6 |
| Same spacing everywhere | ≤2 unique padding values across >6 |
| Cards wrapping everything | >6 elements in `main` with radius, shadow or border and padding >8px |
| Grey text on coloured backgrounds | >2 grey text elements on coloured ancestors |
| Monospace "tech vibes" | non-code text in monospace, flagged at >2 |
| Modal overuse | >2 dialogs |

Source-level patterns include `transition-all`, `animate-bounce`, `StatCard`/`MetricCard` components, Lorem ipsum, and generic CTA labels repeated 3+ times.

### 4.2 Other lists

- impeccable README tells: "Inter for everything.", "Purple-to-blue gradients.", nested cards, grey text on colour, a rounded-square icon tile above every heading, cramped padding, skipped heading levels. Source, fetched: https://github.com/pbakaus/impeccable
- Kosta Canatselis, fetched: https://world.hey.com/kostac/spot-the-slop-a-ui-designer-s-guide-to-fixing-ai-defaults-4c448c9c . Seven defaults: Inter with a system fallback, decorative purple-to-blue gradient, generic headlines, "Uniform everything" (same padding, radius and card height), missing empty, loading and error states, identical fade-in motion, everything visible at once. Fix for uniformity: "Break the uniformity on purpose."
- Search-only, not fetched (unverified): https://github.com/Laith0003/ux-skill/wiki/Anti-AI-slop-ban-list , https://uxdesign.cc/how-to-de-slopify-your-designs-4c40c57c1dc9 , https://builtin.com/articles/ai-design-slop-era . One catalogue claims a specific indigo, violet and cyan set appears in "80% of UI requests". No evidence found for that number.
- Placeholder names "John Doe, Jane Smith, Sarah Johnson" are named as a tell in community catalogues (search result, unverified).

### 4.3 The consensus list for product screens

Across the fetched sources the repeated tells are: purple or blue gradients and gradient text, Inter or a system stack with no hierarchy, emoji as icons, cards everywhere and cards inside cards, identical card grids, every button styled primary, centred content, an icon tile above every heading, eyebrow labels, decorative glass and blobs, one-sided accent borders, uniform spacing, hero metric rows, and missing empty, loading and error states.

---

## 5. Vision self-critique loops

- **Vision-Guided Iterative Refinement for Frontend Code Generation** (ICLR 2026 listing). Fetched abstract: https://arxiv.org/abs/2604.05839 . A VLM critic on rendered pages gives "up to a 17.8% increase in performance" over three refinement cycles, on WebDev Arena user requests. LoRA training on the critic's feedback recovers about 25% of the gain with no extra tokens. Per-round curves and the metric definition were not in the abstract (unverified).
- **ReLook** (arXiv 2510.11498). Fetched: https://arxiv.org/html/2510.11498v1 . On ArtifactsBench subsets with Qwen2.5-7B, the critic loop beats the same model without the critic on every subset, for example A-Lite 25.44 to 27.88. Cost: 123.04 s per query versus 18.03 s. Warning: "a subsequent revision may score lower than the previous one, degrading trajectories." Figure 4: the base model "degrades after initial attempts despite MLLM feedback." Their fix is a strict acceptance rule: keep a revision only if it scores higher.
- **ArtifactsBench** (Tencent). Fetched: https://arxiv.org/html/2507.04952v2 . Headless Chromium at 1024×768, three staged screenshots (before, during, after an interaction). Judge agreement with human experts: 90.95% with multiple screenshots, 87.10% with one, 79.06% with no image. 94.4% ranking consistency with WebDev Arena.
- **UICrit** (UIST 2024). Fetched: https://arxiv.org/html/2407.08850v3 . 3,059 critiques of 983 mobile UIs by 7 designers. Few-shot examples plus visual prompting raised LLM critique quality from 0.31 to 0.48 (about 55%). Human designers scored 0.75, so LLM critique is still well below a designer. The largest critique categories: layout 696, colour contrast 655, button usability 601, learnability 601, text readability 591.
- **Other vision-loop papers** (search results only, unverified): VisRefiner https://arxiv.org/abs/2602.05998v1 , UI2Code^N https://arxiv.org/pdf/2511.08195 .

**Practical reading:** a screenshot loop helps, more screenshots help the judge, and a fixed checklist or few-shot examples raise critique quality. Bound the loop at about three rounds and keep a revision only if it is better against the rubric. Anthropic's skill, impeccable and OpenAI's guide all tell the agent to screenshot its own work.

---

## 6. Classic, codifiable design rules

### 6.1 Contrast and targets (WCAG 2.2, fetched)

- 1.4.3: text "at least 4.5:1". Large text "at least 3:1". Large means "at least 18 point or 14 point bold", about 24px or 18.5px bold. https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- 1.4.11: UI component boundaries, states, focus indicators and needed graphics "at least 3:1 against adjacent color(s)". Inactive components are exempt. https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
- 2.5.8 (AA): pointer targets "at least 24 by 24 CSS pixels", or spaced so a 24px circle on each does not overlap a neighbour. https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- 1.4.8: lines of "80 or fewer characters", cited by Baymard. https://baymard.com/blog/line-length-readability (fetched)

### 6.2 Platform touch targets

- Apple HIG: 44×44 pt minimum. The HIG page rendered empty for me, so this is unverified at the primary source. Secondary: https://developer.apple.com/design/tips (search snippet), https://dequeuniversity.com/rules/attest-ios/1.0/touch-target-size
- Material: "at least 48 x 48 dp, with at least 8dp of space between each target". 4dp grid for fine alignment, padding in 8dp or 4dp steps. Search results only: https://material.io/design/layout/applying-density.html , https://material.io/design/layout/spacing-methods.html , https://support.google.com/accessibility/android/answer/7101858 . m3.material.io rendered empty, so unverified at M3.
- Vercel: 44px minimum on mobile, input font ≥16px on mobile. https://vercel.com/design/guidelines (fetched)

### 6.3 Refactoring UI (Wathan and Schoger)

- Tip titles, fetched from https://refactoringui.com/ : "Limit your choices", "Size isn't everything", "Don't use grey text on colored backgrounds", "De-emphasize to emphasize", "Labels are a last resort", "Balance weight and contrast", "Start with too much white space", "Establish a spacing and sizing system", "Avoid ambiguous spacing", "Establish a type scale", "Keep your line length in check", "Greys don't have to be grey", "Don't rely on color alone", "Use shadows to convey elevation", "Don't overlook empty states", "Use fewer borders".
- Palette, fetched: https://refactoringui.com/previews/building-your-color-palette . Greys: "you want 8-10 shades to choose from." Nine-step scale 100 to 900, base at 500. "Define all shades up front" rather than computing them with lighten or darken.
- Numeric distillation, third party, not the book: https://cdn.jsdelivr.net/npm/claude-code-skills@0.5.0/data/skills/ux-ui-design-system/references/refactoring-ui.md (fetched). Spacing 4, 8, 12, 16, 24, 32, 48, 64, 96. Type 12, 14, 16, 18, 20, 24, 30, 36, 48, 60. Body line-height 1.5 to 1.75, headings 1.2 to 1.3. Weights 400 to 700. Label to input 8px, form groups 24px apart. One primary button per view. Icons 16, 20, 24. Treat these as one reasonable codification, not the authors' numbers.

### 6.4 Forms

- GOV.UK text input, fetched: https://design-system.service.gov.uk/components/text-input/ . Visible labels above the input, sentence case, no colon. "Do not use placeholder text in place of a label, or for hints or examples". Width matches the answer: "Postcode inputs should be postcode-sized". Use `autocomplete`.
- GOV.UK validation, fetched: https://design-system.service.gov.uk/patterns/validation/ . Validate when the user submits, not on blur or while typing. Error summary "at the top of the page" with focus moved to it. Error message next to each field. Keep the user's values. Say what went wrong and how to fix it.
- Baymard, search results: multi-column forms cause problems. 2 to 3 inputs on one line are fine when they belong to one entity (https://baymard.com/blog/avoid-multi-column-forms). Overzealous inline validation frustrates users (https://baymard.com/blog/inline-form-validation). Average checkout has 11.3 fields, most need 8. Not fetched directly, so unverified wording.
- CXL: single-column form finished 15.4 s faster than multi-column (n = 356 vs 346). https://cxl.com/form-design-best-practices/ (search result, unverified).
- Label position: Wroblewski recommends top-aligned labels, citing Penzo's 2006 eye tracking. A Napier University replication found right-aligned labels fastest. The evidence is contested. Top-aligned stays the safe default because it also works on mobile. https://static.lukew.com/WebForms_LukeW_101209.pdf , https://napier-repository.worktribe.com/OutputFile/232503 (search results, unverified).

### 6.5 Tables

- Matt Strom, fetched: https://mattstromawn.com/writing/tables/ . "Numerical data is right-aligned". Text left-aligned. Headers "should carry whatever alignment their data has." "Don't use center alignment". Use tabular lining figures. Same decimal places within a column. Unit once per column. Rules "extremely light". Tables monochromatic. He calls zebra striping bad (opinion).
- NICE design system: right-align values you compare, such as prices. Search result: https://design-system.nice.org.uk/components/table/
- Row heights 40px condensed, 48px regular, 56px relaxed. Search result, unverified: https://medium.com/design-with-figma/the-ultimate-guide-to-designing-data-tables-7db29713a85a

### 6.6 States

- Empty states, NN/g, fetched: https://www.nngroup.com/articles/empty-state-interface-design/ . "Do not default to totally empty states." Do not show "No records" while loading. Give "brief yet explicit instructions" and "direct pathways (i.e., links) to getting started with key tasks".
- Loading, NN/g, fetched: https://www.nngroup.com/articles/skeleton-screens/ . Under 1 s: no loader. Spinner for 2 to 10 s on one module. Skeleton for a full-page load under 10 s. Over 10 s: a progress bar, "Anything above 10 seconds requires an explicit estimation of duration."
- Vercel: "Skeletons mirror final content exactly to avoid layout shift."
- Errors: GOV.UK, Anthropic's skill and Vercel all say the message states what happened and how to fix it.

---

## 7. How UI quality is evaluated

- **WebDev Arena (LMArena).** A user prompts, two models build apps, the user tries both and votes. Bradley-Terry scores. Now a subset of Text Arena, per Epoch. Sources (search results): https://news.lmarena.ai/webdev-arena , https://epoch.ai/benchmarks/webdev-arena
- **Design Arena.** Fetched: https://designarena.ai/about . Four anonymous models per prompt in a bracket of five pairwise battles. Bradley-Terry, rating = 400 × log10(strength). Models below 50 comparisons are hidden, about 200 needed for a stable rating. Categories include Website, Web Apps, Mobile App.
- **UI-Bench.** Fetched abstract: https://arxiv.org/abs/2508.20410 . 10 text-to-app tools, 30 prompts, 300 sites, over 4,000 expert pairwise judgments, TrueSkill ranking.
- **ArtifactsBench.** See section 5. A 10-item checklist per task. Item 9 is "Interface visual design: color palette limits, spacing rules, font size and line height, and layout clutter." Item 10 is interaction smoothness.
- **UICrit.** Rates aesthetics, learnability, efficiency, usability and overall quality. See section 5.
- **Designer feedback fine-tuning** (CHI 2026). Fetched abstract: https://arxiv.org/abs/2509.16779v2 . 21 designers, 1,500 annotations. Models tuned on comments and sketches beat ranking-feedback models and GPT-5 in human judging. No win rates in the abstract.
- **impeccable critique** gives a ready rubric: Nielsen 0 to 4 per heuristic, plus a cognitive-load checklist (section 2.1).

**For our blind before/after eval:** use pairwise blind votes (the Arena and UI-Bench method), several screenshots per screen including an interaction state, a fixed checklist, and a deterministic detector count (pixelslop or `npx impeccable detect`) as an objective second metric. The ArtifactsBench numbers say a judge given multiple screenshots tracks human experts best.

---

## 8. Unverified or not fetched

- Apple HIG accessibility page and m3.material.io pages rendered empty. The 44 pt and 48 dp numbers rest on secondary sources.
- The dev.to account of the frontend-design rewrite (date, commit, version).
- v0, Lovable and Bolt prompts are leaks. The Mintlify v0 copy returned 410.
- Baymard form articles, CXL, Wroblewski and Napier were search results only.
- impeccable star count and the rest of its 54 reference files.
- Per-round curves in the Vision-Guided Refinement paper.
- Laith0003 ban list, uxdesign.cc de-slopify, builtin.com articles.

---

## Top 15 rules a skill should encode

Each rule is written so a reviewer can check it on a screenshot. Numbers come from the sources above.

1. **Reuse the product's tokens and components first.** Every colour, radius, shadow and font on the screen comes from the existing design system or one small token set (background, surface, text, muted text, accent, plus status). Check: no colour on screen that is not in the token list. (Sonnet 5 guide, Lovable, OpenAI)
2. **Start with the working surface.** The first viewport shows the task: data, filters, form or table. No hero, no tagline, no text that describes the app's features, no decorative blobs, orbs, glass or gradient backgrounds. (OpenAI frontend prompt, impeccable operate mode)
3. **One primary action per view.** Exactly one filled, accent-coloured button per view or dialog. Other actions are secondary or ghost. Check: count filled accent buttons, expect 1. (Refactoring UI distillation, pixelslop #20)
4. **Contrast meets WCAG AA.** Body text ≥4.5:1. Text ≥24px, or ≥18.5px bold, ≥3:1. Input borders, focus rings and icons that carry meaning ≥3:1. No grey text on a coloured background. (WCAG 1.4.3, 1.4.11, Refactoring UI)
5. **Colour has a job.** At most 3 to 5 colours plus status colours. Saturated colour appears only on actions, links, selection and status. No purple-to-blue gradient, no gradient text. Status always pairs colour with a text label or icon. (v0, Vercel, OpenAI, WCAG 1.4.1)
6. **Type is a small scale.** At most 2 families. At most 5 distinct font sizes on one screen. Body text ≥14px in dense tools, ≥16px for reading text and mobile inputs. Body line-height 1.4 to 1.6. Text lines ≤80 characters. (v0, Vercel, Baymard, Anthropic skill)
7. **Hierarchy comes from weight and colour, not only size.** Labels are smaller and lighter than their values. Headings use more space above than below. No eyebrow label above every heading, no icon tile above every heading. (Refactoring UI, impeccable craft-floor, pixelslop #18)
8. **Spacing comes from a 4px scale and shows grouping.** Every gap is one of 4, 8, 12, 16, 24, 32, 48 or 64px. The gap between groups is at least twice the gap inside a group. The screen uses at least 3 distinct gap sizes. (Material, Refactoring UI, pixelslop #21)
9. **Cards only where they hold an interaction or one object.** No card inside a card. Page sections are not floating cards. A nested radius is ≤ its parent radius. Check: count nested bordered or shadowed boxes, expect 0. (OpenAI, Vercel, pixelslop #9 and #23)
10. **Align to edges, not the centre.** Body content, headings and form fields share one left edge. Centred text is limited to empty states and short dialogs. Fail if more than 70% of text blocks are centred. (pixelslop #17, Matt Strom)
11. **Tables read like ledgers.** Numbers right-aligned with tabular figures. Text left-aligned. Each header aligned like its column. No centred cells. Units in the header. Same decimal places within a column. Light horizontal rules only. Rows 40 to 48px high. (Matt Strom, NICE, table guide)
12. **Forms follow GOV.UK.** One column, with 2 or 3 fields on a line only when they form one value. A visible label above every field, never a placeholder as label. Field width matches the expected answer. On submit, errors appear next to each field and in a summary at the top. Each error says what is wrong and how to fix it. (GOV.UK, Baymard)
13. **Every data view has designed empty, loading and error states.** Empty: one line of status plus one action. Loading: nothing under 1 s, a skeleton that matches the final layout for a page, a spinner for one module, a progress bar over 10 s. Never show "No records" while loading. (NN/g, Vercel)
14. **Controls are real and reachable.** Icons come from one library at 16, 20 or 24px, with one stroke width. No emoji as icons. Pointer targets ≥24×24px on desktop and ≥44px on touch. A visible focus ring on every control. Content is realistic, no Lorem ipsum, no "John Doe". (v0, OpenAI, WCAG 2.5.8, Apple, impeccable operate)
15. **Screenshot, critique, fix, at most 3 rounds.** Render at 1440px and 390px wide, plus one interaction or error state. Score against rules 1 to 14 and run a detector if one is available. Keep a revision only if it scores better. Before finishing, remove one decorative element. Check: no horizontal scroll at 390px, no overlap, no clipped text. (Vision-Guided Refinement, ReLook, ArtifactsBench, Anthropic skill)
