---
name: JSPV fonts
description: Current typeface decisions for the JSPV website.
---

# JSPV typography

The site uses **DIN Condensed** as the single typeface for all text — both display headings and body copy. This replaces the earlier Roboto Slab + Roboto pairing.

**Font stack:**
- Primary: `'DIN Condensed'`, `'DINCondensed-Bold'` (system font on macOS/iOS)
- Web fallback: `'Barlow Condensed'` loaded from Google Fonts (weights 400–900)
- Final fallback: `system-ui, sans-serif`

Both `--app-font-sans` and `--app-font-display` CSS variables point to this same stack.

**Why:** User explicitly requested DIN Condensed for the full site redesign.

**How to apply:** Do not reintroduce Roboto or any other font family. If a new weight or style is needed, add it to the Barlow Condensed Google Fonts import in `src/index.css`.
