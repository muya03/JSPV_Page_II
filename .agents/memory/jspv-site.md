---
name: JSPV site structure
description: Artifact layout, build system, and key files for the JSPV website
---

# JSPV site structure

- Artifact dir: `artifacts/jspv/` — React + Vite, pnpm monorepo
- Router: wouter `Switch/Route` in `src/App.tsx`
- i18n: `src/i18n/ca.ts` (source of truth) + `src/i18n/es.ts` (must match type)
- SSR build: 3-step (client + ssr + prerender) — not standard Vite build
- Logo assets: `@/assets/logos/jse.png`, `@/assets/logos/pspv-psoe.png`
- `@assets` alias → `attached_assets/`; `@/` → `artifacts/jspv/src/`
- Pages added: OnEstem (/on-estem), Transparencia (/transparencia)
- "Nosaltres" dropdown: NOSALTRES_SUB array in Header.tsx — includes equip, historia, valors, onEstem
