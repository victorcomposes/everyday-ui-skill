# Output contract for generators

Every generator, with or without the skill, follows these rules.

1. Write exactly one file per task: `index.html`. It must be self-contained.
2. Use no build step. The file opens straight from disk in a browser.
3. Load scripts from a CDN only when needed, and pin an exact version, for example `https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js`. Never use `@latest` or a range.
4. Use no external images, fonts or media. Draw icons and art with inline SVG or CSS.
5. Put fake but realistic data inline. Use plausible names, amounts, dates and counts. Never use lorem ipsum.
6. Include `<meta name="viewport" content="width=device-width, initial-scale=1">`.
7. The page must render well at 1440x900 and at 390x844. The harness checks both.
8. The page must work in light mode and in dark mode (`prefers-color-scheme: dark`). The harness captures both.
9. Treat the task prompt as the whole brief. Do not ask questions. Make reasonable product choices and build the page.

Harness layout: `runs/<round>/<condition>/<task>/index.html`, where `<task>` is the file name of the task without `.md`, for example `01-settings`.
