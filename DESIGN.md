---
name: Sankalp Rajeev Portfolio
description: A quiet, precise instrument for showing evidence of reliable AI work.
colors:
  bg-dark: "#0c0c0b"
  surface-dark: "#151514"
  surface-2-dark: "#1b1b1a"
  text-dark: "#ededea"
  text-2-dark: "#a8a8a2"
  text-3-dark: "#8b8b85"
  accent-dark: "#e8794a"
  bg-light: "#fafaf8"
  surface-light: "#ffffff"
  surface-2-light: "#f3f2ee"
  text-light: "#141413"
  text-2-light: "#53534d"
  text-3-light: "#6a6a63"
  accent-light: "#b4451f"
typography:
  display:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(44px, 7vw, 96px)"
    fontWeight: 550
    lineHeight: 1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 550
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  eyebrow:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.12em"
  mono:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
rounded:
  surface: "12px"
  control: "10px"
spacing:
  s1: "8px"
  s2: "16px"
  s3: "24px"
  s4: "32px"
  s6: "48px"
  s10: "80px"
  s16: "128px"
components:
  button-primary:
    backgroundColor: "{colors.text-dark}"
    textColor: "{colors.bg-dark}"
    rounded: "{rounded.control}"
    height: "44px"
    padding: "0 20px"
  button-secondary:
    textColor: "{colors.text-dark}"
    rounded: "{rounded.control}"
    height: "44px"
    padding: "0 20px"
  work-card-frame:
    backgroundColor: "{colors.surface-dark}"
    rounded: "{rounded.surface}"
---

# Design System: Sankalp Rajeev Portfolio

## Overview

**Creative north star: "A well-made instrument."** Crisp, precise, quiet. Mode: Experience. The work (screenshots, figures) leads and the interface recedes. Dark is the default; light is a real, equal theme. No gradients, blobs, glassmorphism, glows, particle backgrounds, custom cursors, typewriter effects, emoji or chip soup.

## Colors

Neutral greys carry all text levels. One accent, the current orange-red, used only for links on hover, the active nav indicator, focus rings, and at most one highlight per screen (the "Open to" status dot on Home). Dates and company names are neutral.

- Dark: bg `#0c0c0b` (slightly warm near-black), raised surface `#151514`, text `#ededea`, secondary `#a8a8a2`, tertiary `#8b8b85`, accent `#e8794a`.
- Light: bg `#fafaf8`, raised surface `#ffffff`, text `#141413`, secondary `#53534d`, tertiary `#6a6a63`, accent `#b4451f`.
- Hairlines: 1px at 9–10% of text colour; stronger hairline 20–28% for hover edges and control borders.
- All text/background pairs meet WCAG AA (verified by script, see report).

## Typography

Geist Sans for everything, Geist Mono only for numbers, dates, tags and code names. Self-hosted variable woff2.

- Display `clamp(44px, 7vw, 96px)`, weight 550, tracking -0.035em, line-height 1.0.
- Body 17px / 1.6, max 65ch. Card description 16px.
- Uppercase letter-spaced text exists only for small section eyebrows (12px, +0.12em).
- Mono labels for facts (13px, normal case) and key figure values (20px).

## Layout

12-column grid, max width 1200px, gutters 24px (mobile) / 40px (≥768px). 8px spacing scale. Section padding 80px mobile / 128px desktop. 1px low-opacity hairlines divide sections. Work grid: 2×2 on desktop, 1 column below 768px.

## Elevation & Depth

No shadows or glows. Depth is a one-step raised surface plus a hairline. Hover lightens the frame border via an overlay's opacity.

## Shapes

12px radius on surfaces (frames, cards); 10px on controls; 50% on dots.

## Components

- **Button**: 44px high; primary is solid neutral (inverse of the page), secondary is hairline outline. Press scales to 0.97 over 120ms; hover is a 6–12% wash (opacity only).
- **Browser frame**: thin 28px chrome bar with three neutral dots over a raised surface; screenshot 16:10, top-aligned crop, never dimmed.
- **Work card**: framed screenshot, title with arrow, one-line description, one key figure (mono value + sans label), mono stack line, links. The whole card is a stretched link to `/work/<slug>`; secondary links sit above it.
- **Nav**: sticky; transparent at top, then hairline + blur after 16px (an overlay fading in); a 2px accent indicator slides between Work / Experience / About.
- **Theme toggle**: circle reveal from the button via View Transitions, ~500ms; instant fallback.

## Motion

Ease-out `cubic-bezier(0.16, 1, 0.3, 1)`. Hover/press 120–200ms; image scale 400ms; entrances 400–700ms; stagger ~70ms for at most 4 items. Only transform and opacity (plus clip-path for masks/theme reveal). Native scroll. Hero entrance plays once per session (CSS keyframes, gated by `sessionStorage`); cards fade up 16px once in view (motion `inView`). `prefers-reduced-motion` shows final states with no movement.

## Do's and Don'ts

- Do keep one idea per card: a single figure.
- Do show missing screenshots as missing.
- Don't use the accent for decoration, dates or company names.
- Don't animate layout properties, colour or shadows.
- Don't add gradients, glows, tilt, or emoji.
