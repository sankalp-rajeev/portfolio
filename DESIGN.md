---
name: Sankalp Rajeev Portfolio
description: A personal editorial portfolio on warm paper, annotated by hand like a reviewer's marked-up proof.
colors:
  paper: "#f4f1ea"
  paper-raised: "#faf8f3"
  paper-sunk: "#ebe7dd"
  ink: "#1d1b18"
  ink-2: "#4a463f"
  ink-3: "#655f55"
  vermilion: "#b83e0b"
  charcoal: "#161513"
  charcoal-raised: "#1c1a18"
  charcoal-sunk: "#252320"
  paper-text: "#ece6da"
  paper-text-2: "#b5aea1"
  paper-text-3: "#958d80"
  vermilion-dark: "#f2784a"
  logo-tile: "#ffffff"
  graph-0-light: "#ebe7dd"
  graph-1-light: "#cc7853"
  graph-2-light: "#c1582b"
  graph-3-light: "#b83e0b"
  graph-4-light: "#89340f"
  graph-0-dark: "#252320"
  graph-1-dark: "#9f5337"
  graph-2-dark: "#cc6841"
  graph-3-dark: "#f2784a"
  graph-4-dark: "#f69e7d"
  lightbox-scrim: "rgb(14 13 12 / 0.92)"
  lightbox-control: "rgb(0 0 0 / 0.4)"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(40px, 5vw, 64px)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.02em"
  heading:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(1.75rem, 3vw, 2.125rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 500
    lineHeight: 1.25
  lead:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.5vw, 1.25rem)"
    lineHeight: 1.55
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
  ui:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "0.875rem"
  base:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.55
  figure:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "1.25rem"
    fontWeight: 500
  mono:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
  eyebrow:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
  control-icon:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "18px"
  figure-large:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "clamp(1.375rem, 3.4vw, 2.25rem)"
    fontWeight: 500
  note:
    fontFamily: "Caveat, cursive"
    fontSize: "1.375rem"
    fontWeight: 500
rounded:
  xs: "4px"
  tag: "6px"
  sm: "8px"
  surface: "12px"
  control: "10px"
  pill: "999px"
spacing:
  s1: "8px"
  s2: "16px"
  s3: "24px"
  s4: "32px"
  s6: "48px"
  s10: "80px"
  s12: "96px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    height: "44px"
    padding: "0 20px"
  button-secondary:
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "44px"
  work-card-frame:
    backgroundColor: "{colors.paper-raised}"
    rounded: "{rounded.surface}"
---

# Design System: Sankalp Rajeev Portfolio

## Overview

**Creative north star: "a marked-up proof."** A quiet personal editorial portfolio on warm paper: a fixed profile sidebar, a single reading column, serif headings, and a thin layer of hand-drawn ink (vermilion strokes and Caveat notes) in the margins, as if a reviewer had checked the work. Mode: Experience. The content leads; the ink is sparse, exact and decorative only.

**Accepted overrides.** The detector flags (1) Geist as an overused face and (2) the warm paper background as `cream-palette`. Both are deliberate owner decisions and are intentionally not acted on.

Light is the default theme (warm paper, near-black ink). Dark is the alternative (warm charcoal, paper-toned text). A static film grain (~3%, no animation) sits over both. No gradients, glows, particle backgrounds, custom cursors, typewriter effects, emoji or chip soup.

This replaces the earlier dark tech-brand direction and the hero background art. `src/scripts/hero-bg/trace-gate.ts` (+ `common.ts`) is kept unused for possible later use on the Nexus page.

## Colors

No grayscale or single-colour filters anywhere: the portrait, gallery, project images and company logos all show in full colour.

Neutral everything, one accent: **vermilion ink**, used for annotations, link hover, focus rings. Never for body text, dates or company names.

- Light: paper `#f4f1ea`, raised `#faf8f3`, sunk `#ebe7dd`, ink `#1d1b18`, secondary `#4a463f`, tertiary `#655f55`, vermilion `#b83e0b` (4.99:1 on paper, 5.30 on the raised tone, 4.55 on the sunk tone: AA for normal text on every light surface).
- Dark: charcoal `#161513`, raised `#1c1a18`, sunk `#252320`, text `#ece6da`, secondary `#b5aea1`, tertiary `#958d80`, vermilion `#f2784a` (6.57:1).
- Hairlines: 1px at 12–13% of ink; 30% for hover edges and control borders.
- All text pairs are AA in both themes (verified by script).

## Typography

Newsreader (self-hosted variable, optical sizing on; roman 400/500, italic available) for headings, the name and the hero. Geist for body and UI. Geist Mono only for dates, durations, numbers, figures and tags. Caveat (self-hosted) only for ink notes. All woff2; no off-host requests. Cabinet Grotesk from step 1b is removed.

- Display `clamp(40px, 5vw, 64px)`, weight 400, tracking -0.02em, leading 1.06.
- Section headings 28–34px weight 500; role and card titles 22px weight 500.
- Body 17px / 1.7, measure ≤ 38em. UI 14–15px.
- Annotations 22px Caveat, rotated about -3°.

## Layout

≥1024px: fixed 300px sidebar (hairline right border) and a content column to its right; reading width 720px (work grid 800px) centred in the column, leaving right margin for ink notes. A sticky top bar over the column holds the section nav and the theme toggle. <1024px: the sidebar becomes a top profile block (photo, name, role, line, facts, buttons), then the sticky top bar, then the content. 8px spacing scale; sections 80/96px; hairline dividers.

## Elevation & Depth

None. Depth is a one-step raised or sunk paper tone plus a hairline. Hover lightens a frame border through an overlay's opacity.

## Shapes

12px on image frames, 8px on the portrait and logo tiles, 10px on buttons, full pill for the section nav.

## Components

- **Sidebar**: full-colour portrait 96px, name in Newsreader 28px, role, one-line pitch, three facts with line icons, LinkedIn / GitHub / Instagram icon buttons, solid "Download CV", square email button.
- **Section nav (pill)**: About · Experience · Work · Education. An inverted copy of the row is clipped to the active item; only `clip-path` animates (~400ms), so the pill keeps a true rounded shape while it slides and resizes.
- **Experience timeline**: 40px rounded tile (hairline border, raised surface) holding the original full-colour logo on its own white backing, so white-background logos look intentional in dark mode; serif role title, "Company · Internship / Research", mono dates right-aligned with the computed duration beneath, a vertical hairline between roles, bullets verbatim from the resume, quiet outlined mono tags.
- **Work card**: framed image (16:10; labelled placeholder when absent), serif title with arrow, one-line description, one figure (mono value + sans label), mono stack line (separators drawn in CSS at item starts), links. The whole card is a stretched link to `/work/<slug>`.
- **Activity graph** (own inline SVG, from the build-time GitHub snapshot `src/data/contributions.json`): 53×7 cells, 11px with 3px gaps, 2px radius; a five-level ramp from the sunk surface to the accent (level 1 is ≥ 3:1 against the surface in both themes: 3.12 light, 3.11 dark); month labels above, "N contributions in YEAR" below, Less→More legend. Year tabs at the right on desktop and below on mobile (JS only; without JS the latest year renders statically). Switching years crossfades opacity only (200ms). On narrow screens the graph scrolls inside its container, starting at the latest week. Hover/tap a cell for a tooltip ("N contributions on Mar 14"). The graph has an aria-label summary per year; cells are not tab stops. It fades in once on entry, with no per-cell stagger.
- **Ink** (decorative, `aria-hidden`): pre-authored irregular SVG strokes drawn once on entering view (`stroke-dashoffset`, `pathLength=1`, 750ms, ease-out), then a Caveat note fades in 150ms later. Exactly six marks: hero underline under "check their own work."; "← current" beside the UM–Dearborn role (a left-pointing ink arrow plus a Caveat note); a loose circle around the Nexus figure; "live" by Nexus and "on PyPI" by its pip link; an arrow from "Focus" to its first item. Mobile keeps only the hero underline and the Nexus circle; margin notes hide below 1280px. Reduced motion: drawn and static.

## Motion

Ease-out `cubic-bezier(0.16, 1, 0.3, 1)`. Hover/press 120–200ms; image scale 400ms; entrances 600–750ms; ~70ms stagger, at most 4. Only transform, opacity, clip-path and stroke-dashoffset animate. Native scroll. The hero headline and subhead are visible from the first frame (translate only), so LCP never waits on animation. The sidebar never animates on scroll. Reduced motion shows final states. The theme toggle reveals the new theme in a circle from the button (View Transitions, ~500ms; instant fallback).

## Do's and Don'ts

- Do keep one figure per card and label missing images as missing.
- Do keep annotations in margins or whitespace, never across body text.
- Don't add annotations beyond the six specified.
- Don't animate layout properties, colour or shadows.
- Keep every accent/surface pair at 4.5:1 or better for normal-size text; change the token, not a one-off colour.
