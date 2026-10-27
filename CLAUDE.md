# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Anna Kovalenko's personal portfolio: a single-page React 19 + TypeScript site built with Vite and deployed to GitHub Pages at https://yunnna005.github.io/Portfolio/.

## Commands

```bash
npm run dev       # Vite dev server on http://127.0.0.1:3000/Portfolio/
npm run build     # tsc type-check, then vite build into dist/
npm run preview   # serve the built dist/
npm run deploy    # builds (predeploy), then pushes dist/ to the gh-pages branch
npx eslint .      # lint (no npm script for it)
```

There is no test suite.

## Architecture

- **Base path:** `vite.config.ts` sets `base: "/Portfolio/"` so that the GitHub Pages subpath works. Files in `public/` are served under `/Portfolio/`, so image paths written in project markdown must include that prefix (e.g. `/Portfolio/images/planify.png`).
- **Layout:** `App.tsx` stacks the sections in order: Header → Hero (with the `DotGrid` canvas and `Clock`) → Ticker → ExperienceEducation (01, which also renders `Skills` as a ledger) → Projects (02) → ContactMe (03) → Footer. Each numbered section opens with `SectionHead`. Navigation uses in-page anchors (`#experience`, `#projects`, `#contact`) rather than routes.
- **Projects come from markdown:** `components/Projects/Projects.tsx` loads every `src/projects/*.md` with `import.meta.glob(..., { as: 'raw' })` and parses it with regexes into a `Project`. To add a project, add a `.md` file that follows the existing heading structure exactly: `# Name`, then `## Date` (YYYY-MM-DD, used for sorting), `## Description`, `## Tags` (comma-separated), `## Category` (must match a filter in `FilterButtons.tsx`), `## Link`, `## Images` (one path per line) and `## Detailed Info` (rendered by `react-markdown` in `ProjectModal`). A heading that is misspelled or missing makes its field silently `undefined`.
- **Styling:** plain CSS, mobile first with `min-width` blocks at 768px and 1080px. Tokens, fonts and the reset are in `src/index.css`; layout and shared components (labels, buttons, ledger, spec sheet, contact, footer) in `src/App.css`; project rows and the modal in `components/Projects/Projects.css`.
- **Contact form:** `ContactMe.tsx` sends mail through EmailJS from the browser. The service, template and public-key IDs are hard-coded in the component. The form is hidden behind a toggle; the email link is the primary action.
- **Placeholder links:** project links containing `portfolio-example.com` are hidden (`hasRealLink` in `Projects/projectLinks.ts`).

## Redesign in progress

Goal: make the site stylish, polished, dynamic and memorable. It shouldn't look like a template.
Audience: [fill in, e.g. recruiters for graduate developer roles]
Stack: keep React + TypeScript + Vite and the GitHub Pages deploy. `react-router-dom` is installed but no routes are defined yet.

### Rules
- Project text and images come from `src/projects/*.md`. Never invent projects, numbers or claims.
- If you change the markdown heading format, update the parser and every project file together.
- Don't rewrite hero, about or experience text unless I ask. Change the design, not the words.
- Use my own screenshots from `public/`, with the `/Portfolio/` path prefix. No stock or archive images.
- Pick one styling approach (plain CSS variables or Tailwind) during the direction phase and stick to it. Don't mix them.
- Mobile first. Check every change at 375px wide.
- Every animation respects `prefers-reduced-motion`.
- No new heavy libraries without asking me first.
- Don't touch the EmailJS IDs in `ContactMe.tsx`.
- Show me a plan before any big change.
- Run `npm run build` before saying a change is done, since there are no tests.

### Design direction: editorial fintech

**Subject:** I'm a computing student and frontend developer who is now also doing a master's in finance. The site should read as software *and* finance, not games-only computing.

**Idea:** a portfolio set like a financial paper with a trading terminal built in. The page is mostly light, cool paper with navy ink, set in the serif of a financial paper. Navy appears as solid terminal blocks (the hero panel, the skills ticker, the footer), and the yellow accent appears as bold fills (section number chips, the contact field). Content is laid out like data (ledger rows, spec sheets, an index table) rather than like cards. Fintech is carried by structure, type and the live clock, never by invented numbers, fake charts or fake prices.

These choices come from my brief and override the `design-taste-frontend` house rules that ban monospace labels, index numbering and a second typeface. Every other house rule still applies (no gradients, glows, glass, shadows at rest, eyebrows, emoji, styled accent words in headlines or icon card rows).

**Colours** (tokens in `src/index.css`). Components use the role tokens only; a theme class (`.theme-navy`, `.theme-accent`) on a block swaps the roles for everything inside it.

| Token | Value | Role |
| --- | --- | --- |
| `--paper` | `#eef1f6` | Cool light ground for most of the page. |
| `--paper-2` | `#e0e5ee` | One tone step down on paper: chips, image frames, form fields, the modal's labels. |
| `--navy` | `#14203a` | Ink on paper, and the ground of the terminal blocks. |
| `--navy-2` | `#1f2d4b` | One tone step up on navy. |
| `--accent` | `#ffcf3d` | Signal yellow: section number chips, the hero's active dots, the ticker markers, the primary button, the contact field, link hover marks. Never used as text on paper. |

Role tokens: `--ground`, `--surface`, `--ink`, `--ink-soft`, `--muted`, `--button-bg`, `--button-ink`, `--mark` (link hover background). On paper: ink `--navy`, ink-soft `#3d4a62`, muted `#5b6578`. On navy: ink `#e8ecf3`, ink-soft `#c3cbd9`, muted `#9aa6bb`. On the accent: ink `--navy`, muted `#4a4230`. All pass WCAG AA on their own ground and surface.

**Dark theme:** `data-theme="dark"` on `<html>` (set before paint by the script in `index.html` from the saved choice or the system setting; `ThemeToggle` in the header switches it and saves to `localStorage`). It redefines the root role tokens: ground `#0b1220`, surface `#182238`, ink `#e8ecf3`, ink-soft `#c3cbd9`, muted `#9aa6bb`, mark `#26355a`. Terminal blocks use `--terminal` / `--terminal-2` (navy in light, lifted to `#19253f` / `#26355a` in dark) so they still read as blocks. The yellow contact field and chips are the same in both themes. Never hard-code `--navy`/`--paper` for ink or ground; use the role tokens so both themes work.

**Type** (three families, each with one job):
- **Display serif: Newsreader** (variable, optical sizes), 400 for headings, 300 for the hero headline and footer name. Sentence case. Tracking -0.02em to -0.03em, leading 0.95–1.05.
- **Text sans: Onest**, 400 for text and 500 for emphasis. Leading 1.55 for text, 1.6 for intros.
- **Labels mono: Martian Mono**, 400, `--step-label` only. Section numbers, dates, the clock, the ticker, stack labels, filters, table headers. No uppercase. Separate labels with space or position, not middle dots or em dashes.
- Five sizes at most: `--step-label` (12–13px), `--step-body` (17–19px), `--step-lead` (1.2–1.5rem), `--step-head` (2.25rem up to 3.5rem: section headings, project names, the contact email), `--step-display` (3.5rem up to 9rem: the hero headline). The footer name is the one exception: it is sized to fill the width between the margins.
- Numbers and dates always use tabular figures.

**Grid and spacing:**
- A 12-column grid inside `--page-margin` (`clamp(20px, 5vw, 96px)`, equal on both sides) with a 24px gutter (16px on phone). Terminal blocks may bleed to the screen edge; text never does.
- Every section opens with its number as a yellow chip (`01`) and its serif heading in columns 1–4; the content fills columns 5–12. Below 1080px everything stacks.
- Spacing scale (multiples of 4px): 4, 8, 16, 24, 40, 64, 120 (section gap on desktop, 80 on phone), 200.

**Sections:**
- **Hero:** headline, intro, CV button and mono facts on paper in columns 1–7. Columns 8–12 hold the navy terminal panel, bleeding to the right edge and running the full hero height (the hero is capped at 760px tall): the reactive dot grid with a live Ireland clock in its top bar. On phone the panel is a full-width band under the text.
- **Signature element: the dot grid.** Dots in the panel's muted colour; dots near the pointer grow and turn `--accent`, then ease back. One sweep on load. With `prefers-reduced-motion` it is still. `aria-hidden`, no library.
- **Ticker:** a navy band under the hero scrolling the skills as mono labels separated by yellow ▲ markers, like a stock ticker. It holds real skills only, no prices. Still and clipped under reduced motion. `aria-hidden` (the skills are listed in full in section 01).
- **01 Experience and education:** ledger rows (mono period, serif role or degree, organisation, description) separated by `--surface` rules, then the skills ledger.
- **02 Projects:** the filter, then the three most recent projects as features: the first large (screenshot over 8 columns, text over 4), the next two side by side and staggered. Each shows a spec sheet (year, category, stack), "Read more" (opens the modal) and the project link. Hovering a screenshot fades to the project's second image. A "Show N more projects" button reveals the rest as an index table (year, project, category, stack); each name opens the modal.
- **03 Contact:** a full-width yellow field. One serif line, the email set large in navy, mono rows for location, languages and links, and the message form behind a toggle.
- **Footer:** navy. The name in the serif at full width, the copyright as a mono label.

**Components:**
- Buttons: square corners. Primary is a solid `--button-bg` fill with `--button-ink` text (yellow with navy on paper and navy, navy with paper on the yellow field). Secondary actions are underlined text links; on hover the link gets a `--mark` background.
- Mono chips: 4px × 8px padding on `--surface`; the active filter is navy with paper text.
- Square corners everywhere. Visible keyboard focus: a 2px outline in `--ink`, offset 4px.
- No hairline rules, except between ledger, spec and table rows (real tabular data).

**Motion:** the dot grid, the ticker and the image crossfade on hover. Nothing else moves. Every animation respects `prefers-reduced-motion`.

**Styling approach:** plain CSS with custom properties. Do not use Tailwind. Components reference the role tokens only.

## Project skills

`.claude/skills/` (pinned in `skills-lock.json`) contains these skills. Use them by phase:

1. Direction: `frontend-design` + `design-taste-frontend`
2. Build: `frontend-design`
3. Motion: `find-animation-opportunities`
4. Audit: `web-design-guidelines` + `improve-animations` + `design-taste-frontend` (browser check)
