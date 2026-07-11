import { useMemo } from "react";
import { Link } from "wouter";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/SectionHeading";
import { useSEO } from "@/lib/seo";
import { NEWS } from "@/data/content";
import { useT } from "@/i18n/context";
import heroImg from "@assets/7582576_1781818344056.jpg";

export default function Comunicats() {
  const { t } = useT();

  useSEO({
    path: "/comunicats",
    title: t.seo.comunicats.title,
    description: t.seo.comunicats.description,
  });

  const items = useMemo(
    () =>
      NEWS.map((n, i) => ({ ...n, ...t.data.news[i], caCategory: n.category })).filter(
        (n) => n.caCategory === "Comunicat",
      ),
    [t],
  );

  return (
    <Layout crumbs={[{ label: t.actualitat.title, href: "/actualitat" }, { label: t.comunicats.crumb }]}>
      <PageHero title={t.comunicats.title} subtitle={t.comunicats.subtitle} image={heroImg} />

      <section className="bg-[hsl(var(--surface))]">
        <div className="container-page py-12 md:py-20">
          {items.length === 0 ? (
            <p className="text-muted-foreground font-light text-center py-16">
              {t.actualitat.totes}
            </p>
          ) : (
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <Reveal key={item.slug} as="li">
                  {item.externalUrl ? (
                    <a
                      href={item.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="relative overflow-hidden aspect-[16/9]">
                        <img
                          src={item.image}
                          alt={item.imageAlt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        {item.source && (
                          <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-foreground text-xs font-display font-semibold px-2 py-1 rounded-md flex items-center gap-1">
                            <ExternalLink size={10} aria-hidden="true" />
                            {item.source}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col flex-1 p-5 gap-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="inline-block bg-primary/10 text-primary text-[0.7rem] font-display font-bold uppercase tracking-widest px-2 py-0.5 rounded">
                            {t.data.categories[item.caCategory] ?? item.caCategory}
                          </span>
                          <time
                            dateTime={item.iso}
                            className="text-xs text-muted-foreground font-light"
                          >
                            {item.date}
                          </time>
                        </div>
                        <h2 className="font-display font-extrabold text-lg leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-3">
                          {item.title}
                        </h2>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed line-clamp-3 flex-1">
                          {item.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-1 text-primary text-sm font-display font-semibold mt-auto">
                          <ExternalLink size={14} aria-hidden="true" />
                          {item.source}
                        </span>
                      </div>
                    </a>
                  ) : (
                    <Link
                      href={`/actualitat/${item.slug}`}
                      className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="relative overflow-hidden aspect-[16/9]">
                        <img
                          src={item.image}
                          alt={item.imageAlt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-col flex-1 p-5 gap-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="inline-block bg-primary/10 text-primary text-[0.7rem] font-display font-bold uppercase tracking-widest px-2 py-0.5 rounded">
                            {t.data.categories[item.caCategory] ?? item.caCategory}
                          </span>
                          <time
                            dateTime={item.iso}
                            className="text-xs text-muted-foreground font-light"
                          >
                            {item.date}
                          </time>
                        </div>
                        <h2 className="font-display font-extrabold text-lg leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-3">
                          {item.title}
                        </h2>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed line-clamp-3 flex-1">
                          {item.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-1 text-primary text-sm font-display font-semibold mt-auto">
                          {t.common.llegirMes}
                          <ArrowRight size={14} aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  )}
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </section>
    </Layout>
  );
}
