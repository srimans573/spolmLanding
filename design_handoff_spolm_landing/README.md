# Handoff: spolm Landing Page Redesign

## Overview
A redesigned landing page for **tryspolm.com** that keeps the existing brand identity (editorial serif headlines, coral accent, monospace bracket motifs, dark/light themes) but shifts the page from a single text-heavy hero to a feature-driven walkthrough. The new page leads with the product itself: three animated, looping product demos recreated from real spolm screenshots illustrate what the platform does — trace, score, and learn from agent runs.

## About the Design Files
The files in this bundle are **design references**, prototyped in HTML + React (via Babel standalone). They are not production code to ship as-is. The task is to **recreate these designs in tryspolm.com's existing codebase** (looks like Next.js based on the meta tags) using its established patterns, component library, and design tokens.

You can open `preview.html` in a browser to see exactly how the page should look and behave.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, copy, and interactions are all specified. The developer should reproduce the UI pixel-perfectly.

---

## Page Structure

The page is one long scroll. Top to bottom:

1. **Top nav** — wordmark left, links + Book a Demo CTA right
2. **Hero** — bracket label, headline, lede, two CTAs, MiniTrace product preview on the right, stats strip below
3. **Section 01 · Trace** — animated logs view demo
4. **Section 02 · Score** — animated rubric / eval demo (alternate background)
5. **Section 03 · Learn** — animated before/after agent run demo (the "learning loop")
6. **Section 04 · Quickstart** — code snippet with SDK integration (alternate background)
7. **Use cases** — three cards
8. **Final CTA**
9. **Footer**

---

## Design Tokens

All defined in `src/tokens.css`. Light theme is default; dark theme is the existing tryspolm.com vibe.

### Colors (light theme)

| Token | Hex | Use |
|---|---|---|
| `--bg`           | `#FAF7F2` | Page background (warm cream) |
| `--bg-2`         | `#F4EFE6` | Alternate section bg, chrome bars |
| `--surface`      | `#FFFFFF` | Cards, panels |
| `--surface-2`    | `#FBF8F3` | Nested surfaces (e.g. inside cards) |
| `--text`         | `#161311` | Primary text |
| `--text-2`       | `#3A3530` | Secondary body |
| `--text-muted`   | `#6E6862` | Tertiary / labels |
| `--text-faint`   | `#A8A199` | Disabled / hint |
| `--border`       | `#E6DFD2` | 1px hairlines |
| `--border-2`     | `#D4CBB9` | Stronger borders |
| `--border-strong`| `#1F1A16` | Inverted (button borders) |
| `--accent`       | `#E8654D` | spolm coral — buttons, headline accents, link underlines |
| `--accent-soft`  | `#FCE2D9` | Coral wash backgrounds |
| `--accent-deep`  | `#C24330` | Hover/active states |
| `--ok`           | `#14946A` | Success chips, dots |
| `--ok-soft`      | `#CFEEDF` | Success backgrounds |
| `--warn`         | `#C77A11` | Warning chips |
| `--warn-soft`    | `#F5E3C2` | Warning backgrounds |
| `--err`          | `#D24A3C` | Error/failure chips |
| `--err-soft`     | `#F5D7D2` | Error backgrounds |
| `--info`         | `#2C6DD8` | LLM-step chips |
| `--info-soft`    | `#D6E4F8` | Info backgrounds |

### Colors (dark theme — toggle via `[data-theme="dark"]` on `<html>`)

| Token | Hex |
|---|---|
| `--bg`           | `#0A0A0A` |
| `--bg-2`         | `#111111` |
| `--surface`      | `#141414` |
| `--surface-2`    | `#181818` |
| `--text`         | `#F2EDE5` |
| `--text-muted`   | `#8A847B` |
| `--border`       | `#1F1D1A` |
| `--accent-soft`  | `#2E1A14` |

### Typography

| Token | Family | Use |
|---|---|---|
| `--serif` | **Newsreader** (Google Fonts, variable, with opsz axis) | Headlines, hero title, "spolm" wordmark, big numbers |
| `--sans`  | **Inter Tight** (Google Fonts) | Body, nav, buttons, labels |
| `--mono`  | **JetBrains Mono** (Google Fonts) | Bracket labels `[ like this ]`, code, timestamps, step names in demos |

> The wordmark **must** be Newsreader at `font-style: normal` (not italic). This matches the actual spolm logo on tryspolm.com.

> Wherever italic appears in headlines (e.g. `Agents that *learn* from every run.`), it is intentional — Newsreader italic in coral is the brand accent style.

> Use `font-optical-sizing: auto;` on body — Newsreader is a variable font with an `opsz` axis that auto-scales contrast for display vs. text sizes.

### Spacing & radii

- Section vertical padding: `88px` top/bottom (`tl-section`)
- Section horizontal padding: `56px`
- Radii: `--r-sm 4px`, `--r-md 6px`, `--r-lg 10px`, `--r-xl 14px`
- Hairline borders use `1px solid var(--border)` consistently

### Animation speed

All animations honor a global `--anim-speed` CSS var and the `window.__animSpeed` JS global (used by the `wait()` helper in `demos.jsx`). Default = `1`. Setting `0.6` slows everything, `1.6` speeds it up.

---

## Components / Sections

### 1. Top Nav (`<Nav />` in `shared.jsx`)

- Sticky-able but currently static
- Left: "spolm" wordmark, 26px Newsreader, coral underline 1.5px sitting 4px below baseline
- Right (gap: 28px): `[ light ]` theme toggle (mono, bracketed), "Features" / "Docs" / "Join Us" links (13.5px Inter Tight), "Book a Demo" button (`btn btn--accent btn--sm`)
- Border-bottom: 1px hairline

### 2. Hero (`tl-hero` in `telemetry.css`, `tl-hero__*` in `landing.jsx`)

**Top row** — 1.2fr / 1fr grid, gap 64px:

**Left:**
- Bracket label: `[ private beta · v0.4 ]` (mono, 11px, uppercase-lowercase as written)
- H1: `clamp(56px, 6vw, 96px)` Newsreader, line-height 0.94, letter-spacing -0.02em. Coral italic on "learn":
  ```
  Agents that *learn*
  from every run.
  ```
- Lede: 17px, 1.55 line-height, max-width 50ch
- Two CTAs in a row: `Book a Demo →` (coral filled), `Read the technical paper` (ghost outlined)

**Right:** the `<MiniTrace />` component (see Animated Demos)

**Stat strip** below the row: a horizontal flex row with 5 stats, each: 32px serif number + 10.5px mono label uppercased letterspaced. Numbers shown in the design are placeholders — supply real values.

### 3. Feature Section (`tl-section`)

Repeats 4× (Trace / Score / Learn / Quickstart). Header pattern:

```
[ 01 ]   [ trace ]
         {{ Section title — 40–60px Newsreader, optional coral italic accent }}
         {{ Lede paragraph — 17px, max-width 60ch }}
```

The big italic number (01/02/03/04) is `56px` Newsreader italic in coral, in its own grid column (90px wide, gap 32px to the title column).

Below the head, the animated demo is indented `margin-left: 122px` so it aligns under the title column, not the number.

Section 02 and 04 use `tl-section--bg` — same content but with `background: var(--bg-2)` for visual rhythm.

### 4. Quickstart Section

Two-column grid (1fr / 1.2fr, gap 56px):

**Left:** standard section header pattern + a list of three integration bullet points with coral arrow → markers.

**Right:** a dark code panel (`#14110E` background, `#2A2520` border) showing a 4-line Python integration example. Syntax-highlighted:
- Comments `--text-muted` italic (`#6E6862`)
- Keywords coral (`var(--accent)`)
- Strings mint (`#B7E3CA`)
- Function names amber (`#FFD89A`)

### 5. Use Cases

3-column grid of `<UseCard />` (`use-card` in `layout.css`). Each card has:
- Bracket tag (mono uppercase)
- Title (24px Newsreader, line-height 1.1)
- Body (13.5px, muted)
- Optional `+`-marker list with coral plus signs

### 6. Final CTA

Centered. Bracket label → `clamp(48–80px)` serif headline with coral italic accent → two CTA buttons (`Book a 15-min demo →` coral filled, `Join the waitlist` ghost).

### 7. Footer

Two rows separated by hairline:
- Row 1: "spolm" wordmark (24px) + italic serif tag line
- Row 2: nav links (Docs / API / Changelog / Careers / Contact) + © 2026 Spolm in mono

---

## Animated Demos (the centerpiece — `src/demos.jsx`)

All three demos are React components using `useState` + `useEffect`. Each:

- Uses `useInView()` (IntersectionObserver, threshold 0.2-0.25) so the animation only runs when the demo is visible. Resets to start whenever it re-enters the viewport.
- Honors `window.__animSpeed` for the global animation speed multiplier.
- Is fully self-contained — no external state, no props required beyond an optional `height`.

### `<TraceDemo />` — Section 01 · Trace

Recreates the **Logs view** (matches `0A8A0E04-….JPG` screenshot exactly):

- Faux Mac window chrome on top with breadcrumbs: `spolm › Personal › Logs › e28b300f…`
- Run header: task title (Newsreader 22px) + sub-task line + meta (Run ID code chip, duration). Right side: 28px serif "11" steps + green "Complete" chip.
- Tabs row (Overview / **Logs** / Issues / Rubric Evals)
- Two-pane body:
  - **Left (36%)** — vertical list of 11 steps. Each step shows: `1. reasoning`, kind chip (LLM/AUTH/EMAIL color-coded), tag pill, ms timing, status chip
  - **Right (1fr)** — selected step detail with INPUT and OUTPUT JSON panels side by side
- **Animation loop:**
  1. Steps fade in left-to-right, one every 130ms
  2. After all steps are revealed, a small SVG cursor moves to step 1 (reasoning · failure)
  3. Cursor click → step 1 highlights with coral border, detail panel updates to step 1's data
  4. 3.2 seconds later → cursor moves to step 8 (generateReply · success), same behavior
  5. Loops indefinitely

Data is hard-coded as `TRACE_STEPS` and `STEP_DETAILS` constants — engineer can swap in real fixture data.

### `<RubricDemo />` — Section 02 · Score

Recreates the **Run Overview** view (matches `534CF5C8-….JPG` screenshot):

- Same window chrome
- Header: "Task: What is quantum computing?" + Run ID code chip + duration + tokens + green "complete" chip
- 4-card grid (200px / 1fr / 1fr columns, 2 rows):
  - **Score gauge** (column 1, spans 2 rows): SVG semicircle arc that fills from 0/10 to 10/10 over ~2 seconds. Green arc on grey track.
  - **What went right** (top row col 2): 3 bullet items in green-soft pills that fade in one at a time
  - **What went wrong** (top row col 3): 2 bullet items in red-soft pills
  - **Root cause summary** (bottom row, spans cols 2-3): paragraph that types in character-by-character at ~90 char/sec with a blinking coral caret
- **Loop:** every ~11 seconds, all four animations reset and replay

### `<LoopDemo />` — Section 03 · Learn

Original composition (no direct screenshot equivalent — illustrates the value prop):

- 3-column grid: Run A (left) / Knowledge Base + Lesson (center) / Run B (right)
- **Run A** card: titled "Session 1 · Yesterday · Run #182", 8 steps that play out sequentially. Two of them are failures (red dot + soft red bg).
- **Center column:**
  - Top: "Lesson learned" card with coral border, glowing coral-soft shadow ring. Title: `Always authenticate before fetch_email`. Two chips: `accuracy +24%` (ok), `tool sequence` (ghost).
  - Bottom: "Knowledge base" panel with current count (246 → 247 patterns), a row of 18 coral bars.
- **Run B** card: "Session 2 · Today · Run #183", 4 steps, all success, plays out fast.
- **Animation phases** (controlled by `phase` state 0→4):
  1. Reset
  2. Run A plays — steps fade in at 180ms intervals
  3. Pause 700ms
  4. Phase 2: Lesson card "flies" — `transform: translateY(20px) scale(.92); opacity .55`, transition 1.2s
  5. Phase 3: Lesson "stored" — snaps back to normal, KB count bumps to 247
  6. Phase 4: Run B plays — steps fade in at 220ms intervals (faster than A)
  7. 2200ms pause, then loop

### `<MiniTrace />` — Hero right column (`shared.jsx`)

A compressed version of TraceDemo for the hero. Just 8 step rows that progressively "in"-light. Max-width 360px. Used purely as decoration in the hero — shows life and movement without competing with the headline.

---

## Cursor Sprite

Used in `<TraceDemo />`. Small SVG arrow pointer (18×22 viewBox) that animates between absolute positions inside `.demo-body`. CSS transition on `left` and `top` for smooth movement. When clicking, a `.clicking` class is added briefly to render a pulsing coral ring (`@keyframes pulseRing`).

---

## State Management

All demo state is **local React state** — no global store needed.

For the live site:

- **Theme toggle** (`light`/`dark`) — write to `localStorage`, restore on mount, apply via `<html data-theme="dark">`. Currently a static `[ light ]` label; wire up the click handler.
- **Book a Demo** — links to `https://cal.com/srirammanikandan/15min?user=srirammanikandan`
- All other links are anchor scrolls within the page.

---

## Animations & Easing

| Where | Property | Duration | Easing |
|---|---|---|---|
| Cursor sprite move | `left, top` | 850ms / speed | `cubic-bezier(.7, .05, .25, 1)` |
| Cursor click ring | `box-shadow` | 600ms / speed | `ease-out` |
| Trace step fade-in | `opacity, transform` | 250ms | `ease` |
| Rubric row fade-in | `opacity, transform` | 350ms | `ease` |
| Rubric score gauge | `stroke-dasharray` | continuous fill | n/a |
| Rubric caret blink | `opacity` | 1s | `steps(1)` infinite |
| Loop lesson "fly" | `transform, opacity` | 1.2s | `cubic-bezier(.5, .05, .2, 1)` |
| Loop arrow appear | `opacity` | 350ms | `ease` |
| Button hover lift | `transform` | 150ms | `ease` |

---

## Recommended Next.js Mapping

Suggested component breakdown if you're building this in Next.js with the App Router:

```
app/
  page.tsx                       → renders <Landing />
  globals.css                    → import tokens.css contents
components/
  landing/
    Landing.tsx                  → main page component (was telemetry.jsx)
    Nav.tsx                      → from shared.jsx
    Footer.tsx                   → from shared.jsx
    StatStrip.tsx                → from shared.jsx
    UseCard.tsx                  → from shared.jsx
    MiniTrace.tsx                → from shared.jsx
    SectionHead.tsx              → from shared.jsx
    demos/
      TraceDemo.tsx              → from demos.jsx
      RubricDemo.tsx             → from demos.jsx
      LoopDemo.tsx               → from demos.jsx
      Cursor.tsx                 → CursorSprite from demos.jsx
      useInView.ts               → hook from demos.jsx
styles/
  tokens.css | demos.css | layout.css | telemetry.css
```

The demos need to be **client components** (`'use client'`) because they use `useEffect` and `IntersectionObserver`.

---

## Assets

- **No image assets** — all product demos are recreated in CSS/SVG.
- **Fonts** are loaded from Google Fonts (URL in `tokens.css`). For a Next.js project, use `next/font/google` for `Newsreader`, `Inter_Tight`, and `JetBrains_Mono`.
- **No icons** — uses Unicode characters (`◐ ✦ ⊹ ◇ → ✓ ✕`) for the trusted-by-logos and similar.

---

## Files in this bundle

| File | Purpose |
|---|---|
| `preview.html` | Open this in a browser to see the design running end-to-end |
| `src/tokens.css` | All design tokens (colors, type, radii) |
| `src/layout.css` | Nav, Footer, StatStrip, SectionHead, UseCard, MiniTrace styles |
| `src/demos.css` | Animated demo styles (Trace / Rubric / Loop) |
| `src/telemetry.css` | Page-section styles (hero, section, quickstart, use-cases, cta) |
| `src/shared.jsx` | Shared React components (Nav, Footer, etc.) |
| `src/demos.jsx` | The three animated product demo components |
| `src/landing.jsx` | The full landing page composition |

---

## Implementation checklist

- [ ] Wire up Google Fonts (`Newsreader`, `Inter Tight`, `JetBrains Mono`) via `next/font/google` or `<link>` in `<head>`
- [ ] Port `tokens.css` → `globals.css` (or split into CSS Modules / Tailwind theme — your call)
- [ ] Decide if the existing site keeps light *or* dark as default. Current default in the prototype is light; the existing tryspolm.com site is dark.
- [ ] Port each demo as a `'use client'` component
- [ ] Replace placeholder content:
  - Hero stat numbers (currently 8,924 / 247 / +24% / −61% / 4 lines)
  - Trusted-by logos (currently text glyph placeholders)
  - Use-case card copy
- [ ] Hook the "Book a Demo" CTA to the existing Cal.com link
- [ ] Test the IntersectionObserver-based animation triggering on mobile (smaller viewports may need different thresholds)
- [ ] The 56px section padding will need responsive overrides for tablet (≤768px) and mobile (≤480px) — not handled in this prototype
