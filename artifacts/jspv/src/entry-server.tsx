import { renderToString } from "react-dom/server";
import App from "./App";
import {
  ROUTE_META,
  NOT_FOUND_META,
  getRouteMeta,
  organizationJsonLd,
  absoluteImageUrl,
  SITE,
  type RouteMeta,
} from "./lib/seo";
import { NEWS } from "./data/content";

export interface PrerenderResult {
  html: string;
  head: string;
  meta: RouteMeta;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHead(meta: RouteMeta): string {
  const canonical = SITE.url + (meta.path === "/" ? "/" : meta.path);
  const image = escapeHtml(absoluteImageUrl(meta.image));
  const t = escapeHtml(meta.title);
  const d = escapeHtml(meta.description);
  const tags = [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:site_name" content="${SITE.shortName}" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json">${JSON.stringify(organizationJsonLd())}</script>`,
  ];
  return tags.join("\n    ");
}

/** Render a single route to static HTML + head markup. */
export function render(url: string): PrerenderResult {
  const clean = url.replace(/\/+$/, "") || "/";
  const meta = newsMeta(clean) ?? getRouteMeta(clean);
  const html = renderToString(<App ssrPath={clean} />);
  return { html, head: buildHead(meta), meta };
}

/** Per-article meta for a `/actualitat/:slug` route, or null if not a news route. */
function newsMeta(clean: string): RouteMeta | null {
  const m = clean.match(/^\/actualitat\/(.+)$/);
  if (!m) return null;
  const item = NEWS.find((n) => n.slug === m[1]);
  if (!item) return null;
  return {
    path: `/actualitat/${item.slug}`,
    title: `${item.title} · JSPV`,
    description: item.excerpt,
    image: item.image,
  };
}

/** All routes that should be statically prerendered. */
export function routesToPrerender(): string[] {
  return [
    ...ROUTE_META.map((r) => r.path),
    ...NEWS.map((n) => `/actualitat/${n.slug}`),
    NOT_FOUND_META.path,
  ];
}
