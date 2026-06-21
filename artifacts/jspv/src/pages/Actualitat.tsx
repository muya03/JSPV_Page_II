import { useState, useMemo } from "react";
import { Link } from "wouter";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/SectionHeading";
import { useSEO } from "@/lib/seo";
import { NEWS } from "@/data/content";
import { useT } from "@/i18n/context";
import heroImg from "@assets/7582576_1781818344056.jpg";

const PER_PAGE = 4;

// Stable CA keys for categories — never translated keys
const CA_CATEGORIES = Array.from(new Set(NEWS.map((n) => n.category)));

export default function Actualitat() {
  const { t } = useT();

  useSEO({
    path: "/actualitat",
    title: t.seo.actualitat.title,
    description: t.seo.actualitat.description,
  });

  // "" = show all; otherwise = CA category key
  const [catKey, setCatKey] = useState("");
  const [page, setPage] = useState(1);

  const items = useMemo(
    () => NEWS.map((n, i) => ({ ...n, ...t.data.news[i], caCategory: n.category })),
    [t],
  );

  const filtered = items.filter((n) => catKey === "" || n.caCategory === catKey);
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const handleCategoryChange = (key: string) => {
    setCatKey(key);
    setPage(1);
  };

  const catLabel = (key: string) =>
    key === "" ? t.data.filterAll : (t.data.categories[key] ?? key);

  return (
    <Layout crumbs={[{ label: t.actualitat.title }]}>
      <PageHero title={t.actualitat.title} subtitle={t.actualitat.subtitle} image={heroImg} />

      <section className="bg-[hsl(var(--surface))]">
        <div className="container-page py-12 md:py-16">
          <Reveal
            className="flex flex-wrap gap-2 mb-10"
            role="group"
            aria-label={t.actualitat.filtraAria}
          >
            {["", ...CA_CATEGORIES].map((key) => {
              const active = catKey === key;
              return (
                <button
                  key={key || "__all__"}
                  type="button"
                  onClick={() => handleCategoryChange(key)}
                  aria-pressed={active}
                  data-testid={`filter-cat-${key || "all"}`}
                  className={`px-4 py-2 rounded-full font-display font-semibold text-sm transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-white border border-border text-foreground hover:border-foreground/40"
                  }`}
                >
                  {catLabel(key)}
                </button>
              );
            })}
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visible.map((item, i) => {
              const isExternal = !!item.externalUrl;
              const cardClass = "group flex flex-col h-full bg-white rounded-lg border border-border overflow-hidden hover:border-primary/40 transition-colors";
              const inner = (
                <>
                  <div className="aspect-[16/9] bg-[hsl(var(--surface-strong))] relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 inline-flex items-center px-2.5 py-1 rounded-sm bg-primary text-primary-foreground text-xs font-display font-bold uppercase tracking-wide">
                      {t.data.categories[item.caCategory] ?? item.caCategory}
                    </span>
                    {isExternal && (
                      <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-[#1A1A1A]/80 text-white text-xs font-bold backdrop-blur-sm">
                        <ExternalLink size={11} aria-hidden="true" />
                        {item.source}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <time dateTime={item.iso} className="text-xs font-medium text-muted-foreground">
                      {item.date}
                    </time>
                    <h2 className="mt-3 font-display font-bold text-xl leading-snug text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {item.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 font-display font-semibold text-sm text-primary">
                      {isExternal
                        ? <>{t.common.llegirMes} a {item.source} <ExternalLink size={13} aria-hidden="true" /></>
                        : <>{t.common.llegirMes} <ArrowRight size={15} aria-hidden="true" /></>
                      }
                    </span>
                  </div>
                </>
              );
              return (
                <Reveal as="article" key={item.slug} delay={i * 70}>
                  {isExternal ? (
                    <a
                      href={item.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cardClass}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link href={`/actualitat/${item.slug}`} className={cardClass}>
                      {inner}
                    </Link>
                  )}
                </Reveal>
              );
            })}
          </div>

          {pages > 1 && (
            <nav
              className="mt-12 flex items-center justify-center gap-2"
              aria-label={t.actualitat.paginacioAria}
            >
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  aria-current={p === current ? "page" : undefined}
                  className={`w-10 h-10 rounded-md font-display font-bold text-sm transition-colors ${
                    p === current
                      ? "bg-primary text-primary-foreground"
                      : "bg-white border border-border text-foreground hover:border-foreground/40"
                  }`}
                >
                  {p}
                </button>
              ))}
            </nav>
          )}
        </div>
      </section>
    </Layout>
  );
}
