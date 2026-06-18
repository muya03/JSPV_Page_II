import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/SectionHeading";
import { useSEO, getRouteMeta } from "@/lib/seo";
import { NEWS } from "@/data/content";

const PER_PAGE = 4;
const categories = ["Totes", ...Array.from(new Set(NEWS.map((n) => n.category)))];

export default function Actualitat() {
  useSEO(getRouteMeta("/actualitat"));
  const [category, setCategory] = useState("Totes");
  const [page, setPage] = useState(1);

  const filtered = NEWS.filter((n) => category === "Totes" || n.category === category);
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const items = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <Layout crumbs={[{ label: "Actualitat" }]}>
      <PageHero
        title="Actualitat"
        subtitle="Sala de premsa de JSPV: comunicats i posicionaments sobre habitatge, educació pública i política autonòmica valenciana."
      />

      <section className="bg-[hsl(var(--surface))]">
        <div className="container-page py-12 md:py-16">
          {/* Category filter */}
          <Reveal className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filtra per categoria">
            {categories.map((c) => {
              const active = c === category;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setCategory(c);
                    setPage(1);
                  }}
                  aria-pressed={active}
                  data-testid={`filter-cat-${c}`}
                  className={`px-4 py-2 rounded-full font-display font-semibold text-sm transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-white border border-border text-foreground hover:border-foreground/40"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item, i) => (
              <Reveal as="article" key={item.slug} delay={i * 70}>
                <Link
                  href={`/actualitat/${item.slug}`}
                  className="group flex flex-col h-full bg-white rounded-lg border border-border overflow-hidden hover:border-primary/40 transition-colors"
                >
                  <div className="aspect-[16/9] bg-[hsl(var(--surface-strong))] relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 inline-flex items-center px-2.5 py-1 rounded-sm bg-primary text-primary-foreground text-xs font-display font-bold uppercase tracking-wide">
                      {item.category}
                    </span>
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
                      Llegir més <ArrowRight size={15} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Pagination (simulated) */}
          {pages > 1 && (
            <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Paginació">
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
