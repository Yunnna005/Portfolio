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
- **Layout:** `App.tsx` stacks the sections in order: Header → Hero (which contains the Skills modal) → ExperienceEducation → Projects → ContactMe → Footer. Navigation uses in-page anchors (`#projects`, `#contact`) rather than routes.
- **Projects come from markdown:** `components/Projects/Projects.tsx` loads every `src/projects/*.md` with `import.meta.glob(..., { as: 'raw' })` and parses it with regexes into a `Project`. To add a project, add a `.md` file that follows the existing heading structure exactly: `# Name`, then `## Date` (YYYY-MM-DD, used for sorting), `## Description`, `## Tags` (comma-separated), `## Category` (must match a filter in `FilterButtons.tsx`), `## Link`, `## Images` (one path per line) and `## Detailed Info` (rendered by `react-markdown` in `ProjectModal`). A heading that is misspelled or missing makes its field silently `undefined`.
- **Styling:** almost all styling is plain CSS in `src/App.css` (global, class-based, with one `@media (max-width: 1080px)` block for mobile) plus `components/Projects/Projects.css`. Theme colors and fonts are CSS variables in `src/index.css`. Tailwind v4 was added recently through `@tailwindcss/vite`, but nothing uses it yet: `src/input.css` (`@import "tailwindcss"`) is not imported anywhere, and `css/output.css` is a stale CLI build output.
- **Contact form:** `ContactMe.tsx` sends mail through EmailJS from the browser. The service, template and public-key IDs are hard-coded in the component.
- `ProjectsPage.tsx` is unused leftover code with its own diverging `Project` type.

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

### Design direction: the name as a monument

**Idea:** "Hi, I'm Anna" is set so large that it becomes the architecture of the first screen (about 16vw, one line, pinned), and the project screenshots scroll up underneath it. Everything after the hero is small and calm so the scale contrast holds. The name returns at full width in the footer with ground and ink inverted.

**Colours** (tokens in `src/index.css`):

| Token | Value | Role |
| --- | --- | --- |
| `--bg` | `#0a0d14` | Page ground (blue-black). No section changes colour. |
| `--surface` | `#131824` | Panels, the modal, form fields: one tone step up, never a border or shadow. |
| `--ink` | `#e9edf3` | All running text and headings. |
| `--muted` | `#8891a1` | Secondary text only (dates, categories). Never fade text below this. |
| `--accent` | `#5a9bfc` | Cornflower. The one primary action per screen (CV, Send, View project) and nothing else. |
| `--accent-ink` | `#0a0d14` | Text on the accent. |

The footer swaps `--bg` and `--ink`. No gradients, glows, violet or lilac.

**Fonts:**
- Display: **Unbounded** 800, uppercase, tracking -0.04em, leading 0.85–0.9 at monument size and 1.0 for section headings. Used for the monument, project names in the work index and the footer wordmark.
- Text: **Onest** 400 for body, 500 for emphasis, leading 1.5, sentence case. Everything else.
- Five type sizes at most: `--step-small` (≥13px), `--step-body` (17–19px), `--step-lead`, `--step-head` (section headings, 32–64px) and `--step-monument` (the hero name and footer wordmark only). No other sizes.

**Spacing scale** (multiples of 4px; use these values only):

| Name | Value | Use |
| --- | --- | --- |
| 2xs | 4px | Icon and text gaps |
| xs | 8px | Tight groups, between a label and its value |
| s | 16px | Between paragraphs, inside controls |
| m | 24px | Between items in a list or index |
| l | 40px | Between a heading and its content |
| xl | 64px | Between blocks inside a section |
| 2xl | 120px | Between sections on desktop (80px on phone) |
| 3xl | 200px | Before and after the pinned hero sequence |

Page margins are `clamp(16px, 2vw, 32px)`, equal on both sides at every width, so the monument type nearly touches the edges. Square corners on images; buttons are fully round. One button shape across the site.

**Styling approach:** plain CSS with custom properties. Do not use Tailwind: remove `src/input.css`, `css/output.css` and the `@tailwindcss/vite` plugin when the restyle starts. Components reference the tokens above only. The old variables in `index.css` (`--primary-color`, `--font-title` and the rest) are legacy and should be deleted once no component uses them.

## Project skills

`.claude/skills/` (pinned in `skills-lock.json`) contains these skills. Use them by phase:

1. Direction: `frontend-design` + `design-taste-frontend`
2. Build: `frontend-design`
3. Motion: `find-animation-opportunities`
4. Audit: `web-design-guidelines` + `improve-animations` + `design-taste-frontend` (browser check)

## Project skills

`.claude/skills/` (pinned in `skills-lock.json`) contains `frontend-design`, `web-design-guidelines`, `find-animation-opportunities` and `improve-animations`. Use them for UI and design work on this site.
