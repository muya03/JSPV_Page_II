---
name: JSPV SSR prerender pipeline
description: The jspv artifact statically prerenders every content route for SEO, unlike the default react-vite SPA scaffold.
---

The `artifacts/jspv` web app does build-time static prerendering (a custom multi-step `build`), not the default single SPA `vite build`. Every public route — including each dynamic news article — is rendered to its own static HTML with per-route meta, and listed in `sitemap.xml`.

**Why:** SEO (per-route title/description/OG/canonical/JSON-LD, sitemap, crawlable HTML) is a core deliverable, not a nice-to-have. A plain SPA build serves an empty shell to crawlers.

**How to apply:**
- Any new indexable route (static page or new dynamic-content collection) must be added to the prerender route list and given per-route meta, or it ships as an SPA-only route that crawlers can't read.
- Treat prerender completeness as build-blocking: if a required route can't render, fail the build rather than shipping a partial set of indexed pages silently.
- Dynamic content routes (e.g. news articles) must derive their prerender list from the same data source the pages render from, so the two never drift.
