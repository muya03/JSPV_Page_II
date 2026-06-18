---
name: JSPV i18n architecture
description: How bilingual CA/ES support is implemented in the jspv artifact
---

Custom React context — no external i18n library (no react-i18next / i18next).

**Files:**
- `src/i18n/ca.ts` — Valencian (default). Exports `ca` object + `Translations` type (inferred from ca).
- `src/i18n/es.ts` — Spanish. Implements `Translations` type.
- `src/i18n/context.tsx` — `LanguageProvider` + `useT()` hook. Lang stored in `localStorage` key `jspv-lang`. Also sets `document.documentElement.lang`.

**Usage:** Every page/component calls `const { t, lang, setLang } = useT();`. No prop drilling.

**Language switcher:** `CA | ES` toggle buttons inside `Header.tsx`. Also shown in mobile menu.

**Content data pattern (critical):**
- `src/data/content.ts` keeps slugs, image imports, iso dates, and **original Valencian category names** as the canonical keys.
- Translation files include full arrays for `data.news`, `data.values`, `data.history`, `data.campaigns`.
- Pages merge: `{ ...NEWS[i], ...t.data.news[i], caCategory: NEWS[i].category }`.
- `caCategory` (the original CA string like `"Habitatge"`) is used as the lookup key in `t.data.categories` dict. **Never use the translated category string as a filter key** — it breaks on language switch.
- In `Actualitat.tsx`, filter state is stored as CA key (`""` = all, `"Habitatge"` etc.) so switching language doesn't invalidate the filter.

**Executive roles/areas:** Translated via `t.data.executiveRoles[role]` and `t.data.executiveAreas[area]` dictionaries, keyed by Valencian string.

**Why no external lib:** Project is self-contained with finite known strings; context approach is simpler, zero config, type-safe via TypeScript inference from `ca.ts`.
