import { useEffect } from "react";

export const SITE = {
  name: "Joves Socialistes del País Valencià",
  shortName: "JSPV",
  url: "https://www.jspv.es",
  defaultImage: "/opengraph.jpg",
  locale: "ca_ES",
};

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  /**
   * Optional per-route social-share image. May be a build-asset path (e.g. a
   * hashed `/assets/…jpg`) or an absolute URL. Falls back to the site default.
   */
  image?: string;
}

/** Turn a build-asset path or absolute URL into an absolute social-share URL. */
export function absoluteImageUrl(image?: string): string {
  const candidate = image ?? SITE.defaultImage;
  if (/^https?:\/\//i.test(candidate)) return candidate;
  return SITE.url + (candidate.startsWith("/") ? candidate : "/" + candidate);
}

const TITLE_SUFFIX = " · JSPV";

export const ROUTE_META: RouteMeta[] = [
  {
    path: "/",
    title: "JSPV — Joves Socialistes del País Valencià",
    description:
      "Joves Socialistes del País Valencià. La generació de ferro que transforma el País Valencià: habitatge, educació pública i feminisme.",
  },
  {
    path: "/partit",
    title: "Nosaltres" + TITLE_SUFFIX,
    description:
      "Història, ideari i Comissió Executiva Nacional de JSPV des de la seua fundació en 1903 fins al XIV Congrés d'Alcoi.",
  },
  {
    path: "/actualitat",
    title: "Actualitat" + TITLE_SUFFIX,
    description:
      "Sala de premsa de JSPV: comunicats i notícies sobre habitatge, educació pública i política autonòmica valenciana.",
  },
  {
    path: "/campanyes",
    title: "Campanyes" + TITLE_SUFFIX,
    description:
      "Repositori de campanyes i argumentaris polítics de Joves Socialistes del País Valencià.",
  },
  {
    path: "/institucions",
    title: "En les Institucions" + TITLE_SUFFIX,
    description:
      "Directori de càrrecs públics de JSPV a les institucions valencianes: Les Corts, ajuntaments i diputacions.",
  },
  {
    path: "/afiliat",
    title: "Afilia't" + TITLE_SUFFIX,
    description:
      "Forma part de la generació de ferro. Afilia't a Joves Socialistes del País Valencià.",
  },
  {
    path: "/contacte",
    title: "Contacte" + TITLE_SUFFIX,
    description:
      "Contacta amb Joves Socialistes del País Valencià: correus d'organització, premsa i xarxes socials oficials.",
  },
];

export const NOT_FOUND_META: RouteMeta = {
  path: "/404",
  title: "Pàgina no trobada" + TITLE_SUFFIX,
  description: "La pàgina que cerques no existeix.",
};

export function getRouteMeta(path: string): RouteMeta {
  const clean = path.replace(/\/+$/, "") || "/";
  return ROUTE_META.find((r) => r.path === clean) ?? NOT_FOUND_META;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE.url,
    logo: SITE.url + "/favicon.svg",
    description:
      "Organització política juvenil del socialisme valencià, integrada en les Joventuts Socialistes d'Espanya (JSE).",
    foundingDate: "1903",
    sameAs: [
      "https://instagram.com/jovesocialistes",
      "https://x.com/JSPV_Valencia",
    ],
    areaServed: "País Valencià",
  };
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  if (typeof document === "undefined") return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  if (typeof document === "undefined") return;
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

// Client-side head sync on route change (prerendered HTML already carries
// the correct tags for crawlers; this keeps them in sync during SPA navigation).
export function useSEO(meta: RouteMeta) {
  useEffect(() => {
    const canonical = SITE.url + (meta.path === "/" ? "/" : meta.path);
    const image = absoluteImageUrl(meta.image);
    document.title = meta.title;
    setMeta("name", "description", meta.description);
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:site_name", SITE.shortName);
    setMeta("property", "og:image", image);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);
    setMeta("name", "twitter:image", image);
    setCanonical(canonical);
  }, [meta.path, meta.title, meta.description, meta.image]);
}
