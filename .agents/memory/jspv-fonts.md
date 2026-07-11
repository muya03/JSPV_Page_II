---
name: JSPV fonts
description: Typography system for JSPV website matching PSOE brand identity. Barlow + Barlow Condensed as DIN substitute.
---

# JSPV Typography System (PSOE-style)

## Goal
Match PSOE brand identity as closely as possible. Barlow is the standard free substitute for DIN Pro.

## Google Fonts import (index.html)
```
Barlow: ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700
Barlow Condensed: ital,wght@0,600;0,700;0,800;1,700
```

## CSS variables (index.css)
- `--app-font-sans`: 'Barlow', 'DIN', 'DIN Pro', system-ui
- `--app-font-display`: 'Barlow Condensed', 'DIN Condensed', system-ui

## Typographic hierarchy (PSOE system)
| Role | Tailwind classes | Weight | Style |
|------|-----------------|--------|-------|
| Eyebrow/overline | `font-display font-bold text-xs uppercase tracking-[0.18em] text-primary` | 700 | normal |
| H1 page title | `font-display font-extrabold` | 800 | normal |
| H2/H3 section title | `font-display font-extrabold` | 800 | normal |
| Lead/hero subtitle | `font-light italic` | 300 | italic |
| Intro strip paragraph | `font-light italic` | 300 | italic |
| Card/body description | `font-light` | 300 | normal |
| Body text (default) | font-sans 400 | 400 | normal |
| Nav / CTA / button | `font-display font-bold` | 700 | normal |

**Why:** User explicitly wants to match PSOE brand. PSOE uses DIN Condensed ExtraBold for slogans/titles, DIN Regular for body, and DIN Light Italic for leads/quotes. Barlow mirrors this.

**Do NOT:** reintroduce Montserrat, Inter, or any other font. Do not use Barlow Condensed for body/description text (only for display headings, eyebrows, CTAs, nav).

## Where light italic is applied (lead/subtitle paragraphs)
- `SectionHeading.tsx`: `intro` prop, `subtitle` prop (PageHero both variants)
- `Partit.tsx`: hero subtitle, intro strip paragraph
- `Valors.tsx`: hero subtitle, intro text
- `Historia.tsx`: hero subtitle, intro text, CTA text
- `Afiliat.tsx`: description paragraph
- `Campanyes.tsx`: page subtitle
- `Inicio.tsx`: card excerpt → `font-light` (not italic — shorter UI text)
