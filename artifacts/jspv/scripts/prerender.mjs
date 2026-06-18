// Static per-route prerender: renders each app route to its own index.html so
// crawlers receive fully-formed HTML + per-route meta, and writes sitemap.xml.
// Wrapped so a render failure for one route never aborts the whole build.
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const clientDir = path.resolve(root, "dist/public");
const serverEntry = path.resolve(root, "dist/server/entry-server.js");

const SITE_URL = "https://www.jspv.es";

async function main() {
  if (!fs.existsSync(serverEntry)) {
    console.warn("[prerender] server bundle not found, skipping prerender.");
    return;
  }

  // Strip the template's fallback <title>/<meta description> so prerendered
  // pages carry only their per-route head (no duplicate, conflicting tags).
  const template = fs
    .readFileSync(path.resolve(clientDir, "index.html"), "utf-8")
    .replace(/\s*<title>[\s\S]*?<\/title>/i, "")
    .replace(/\s*<meta\s+name="description"[^>]*>/i, "");
  const { render, routesToPrerender } = await import(serverEntry);
  const routes = routesToPrerender();
  const written = [];
  const failed = [];

  for (const route of routes) {
    try {
      const { html, head } = render(route);
      const page = template
        .replace("<!--app-head-->", head)
        .replace("<!--app-html-->", html);

      // "/404" -> dist/public/404.html ; "/foo" -> dist/public/foo/index.html
      let outFile;
      if (route === "/404") {
        outFile = path.resolve(clientDir, "404.html");
      } else if (route === "/") {
        outFile = path.resolve(clientDir, "index.html");
      } else {
        const dir = path.resolve(clientDir, route.replace(/^\//, ""));
        fs.mkdirSync(dir, { recursive: true });
        outFile = path.resolve(dir, "index.html");
      }
      fs.writeFileSync(outFile, page);
      written.push(route);
    } catch (err) {
      console.error(`[prerender] failed for ${route}:`, err?.message ?? err);
      failed.push(route);
    }
  }

  if (failed.length > 0) {
    throw new Error(
      `prerender failed for ${failed.length} required route(s): ${failed.join(", ")}`,
    );
  }

  // Sitemap (exclude the 404 route).
  const urls = written.filter((r) => r !== "/404");
  const today = new Date().toISOString().slice(0, 10);
  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map((r) => {
        const loc = SITE_URL + (r === "/" ? "/" : r);
        const priority = r === "/" ? "1.0" : "0.8";
        return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
      })
      .join("\n") +
    `\n</urlset>\n`;
  fs.writeFileSync(path.resolve(clientDir, "sitemap.xml"), sitemap);

  console.log(`[prerender] wrote ${written.length} route(s) + sitemap.xml`);
}

main().catch((err) => {
  // SEO is a core deliverable: fail the build if required routes can't render,
  // so an incomplete set of indexed pages can never ship silently.
  console.error("[prerender] FAILED:", err?.message ?? err);
  process.exit(1);
});
