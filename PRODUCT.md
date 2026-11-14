# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (static output), TypeScript, Tailwind v4 with CSS-variable design tokens, `motion` vanilla API (animate / inView) for JS animation and CSS for everything else, Astro ClientRouter for view transitions. Confirmed by the owner's brief; build output stays in `build/` so the existing static host (Netlify/Cloudflare-style `_redirects`) keeps working.

Note: product truth below was supplied in the owner's written brief rather than an interactive interview; all of it is owner-stated, none inferred.

## Direction (step 1c)

A personal editorial portfolio, not a tech-brand landing page: warm paper by default (dark as the alternative), a fixed profile sidebar plus a reading column, serif headings, and a restrained layer of hand-drawn "reviewer's ink" annotations that echo the work (systems that check their own work). Supersedes the earlier dark/instrument direction.

## Users

Recruiters and hiring engineers evaluating Sankalp Rajeev for AI/ML Engineer and Forward Deployed Engineer roles. They give the site about 30 seconds. Their job: understand who this is, see real evidence of work, and open the resume, GitHub or LinkedIn.

## Product Purpose

A personal portfolio at sankalprajeev.dev. Success is a visitor who, within 30 seconds, knows the person's focus (reliability of AI systems), has seen concrete evidence (named projects with a real figure each), and takes one of the actions: Resume, GitHub, LinkedIn.

## Positioning

The claim is reliability: AI systems that verify their own work. Evidence is verifiers for LLM code repairs, self-healing agent platforms and production ML pipelines, each backed by a measured figure.

## Operating Context

Evaluated on desktop and phone, often from a resume link or LinkedIn. Visitors skim. The resume PDF (`/Sankalp_Rajeev-Resume.pdf`) is the primary conversion.

## Capabilities and Constraints

- Open to AI/ML and Forward Deployed Engineer roles from January 2027; SF Bay Area, NYC or Seattle.
- Current role: Graduate Research Assistant, University of Michigan–Dearborn. Studying M.S. Artificial Intelligence and M.S.E. Robotics Engineering, graduating Dec 2026.
- Content comes only from the existing site's content files or the owner's brief. No invented facts or numbers.
- Keep meta description, canonical URL and OG tags. Self-hosted fonts only; no off-host requests.
- Content must be readable with JavaScript disabled.

## Brand Commitments

Name: Sankalp Rajeev. Single accent: a deep vermilion ink (#B83E0B light / #F2784A dark). Terminology: "Graduate Research Assistant" (never "Graduate Researcher").

## Evidence on Hand

The AI/ML resume PDF (`public/Sankalp_Rajeev-Resume.pdf`) is the source of truth for experience bullets and project figures; experience is copied verbatim from it. Collections in `src/content/*.json` (experience, projects, certificates, gallery, education, skills, journey); project screenshots in `public/assets/projects/` (Nexus, ContractRelay, Kairos exist; Trust but Verify and Smriti show labelled placeholders until the owner supplies images; Smriti links are not provided yet and must not be invented); company logos in `public/assets/experience/`; resume PDF; reports and transcripts in `public/`.

## Product Principles

1. Evidence over adjectives: every claim sits next to a real figure or artifact.
2. Thirty seconds: the first screen answers who, what, and where to click.
3. Quiet and personal: restraint and editorial calm; the work is the loudest thing on the page, and the hand-drawn ink is sparse and exact.
4. Never fabricate: missing assets are shown as missing, not invented.

## Accessibility & Inclusion

WCAG AA or better in both themes; full keyboard use with visible focus; `prefers-reduced-motion` shows final states with no movement.
