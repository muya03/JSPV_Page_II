import { Link } from "wouter";
import { ArrowRight, Building2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { useSEO } from "@/lib/seo";
import { NEWS } from "@/data/content";
import { HeroBanner } from "@/components/HeroBanner";
import { InstagramFeed } from "@/components/InstagramFeed";
import { useT } from "@/i18n/context";

export default function Inicio() {
  const { t } = useT();

  useSEO({
    path: "/",
    title: t.seo.home.title,
    description: t.seo.home.description,
  });

  // Merge static (image, slug, iso) with translated text; keep original CA category as key
  const featured = NEWS.slice(0, 3).map((item, i) => ({
    ...item,
    ...t.data.news[i],
    caCategory: item.category, // preserve CA key for badge lookup
  }));

  return (
    <Layout>
      <HeroBanner />
      <InstagramFeed />

      {/* Actualitat */}
      <section className="bg-[hsl(var(--surface))] border-y border-border">
        <div className="container-page py-16 md:py-20">
          <Reveal className="flex items-end justify-between gap-6 mb-10">
            <div>
              <p className="font-display font-bold text-xs uppercase tracking-[0.18em] text-primary mb-3">
                {t.home.premsa}
              </p>
              <h2 className="font-display font-extrabold text-foreground text-3xl sm:text-4xl">
                {t.home.actualitat}
              </h2>
            </div>
            <Link
              href="/actualitat"
              className="hidden sm:inline-flex items-center gap-2 font-display font-semibold text-primary hover:gap-3 transition-all"
            >
              {t.common.veureTot} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((item, i) => (
              <Reveal as="article" key={item.slug} delay={i * 90}>
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
                      {t.data.categories[item.caCategory] ?? item.caCategory}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <time dateTime={item.iso} className="text-xs font-medium text-muted-foreground">
                      {item.date}
                    </time>
                    <h3 className="mt-3 font-display font-bold text-lg leading-snug text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {item.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 font-display font-semibold text-sm text-primary">
                      {t.common.llegirMes} <ArrowRight size={15} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Link
            href="/actualitat"
            className="sm:hidden mt-8 inline-flex items-center gap-2 font-display font-semibold text-primary"
          >
            {t.home.veureActualitat} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Banner: Institucions */}
      <section className="bg-[#1A1A1A] text-white">
        <div className="container-page py-16 md:py-20">
          <Reveal className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <p className="font-display font-bold text-xs uppercase tracking-[0.18em] text-primary mb-3">
                {t.home.emRepresenta}
              </p>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl leading-tight">
                {t.home.activisme}
              </h2>
              <p className="mt-4 text-white/70 text-lg leading-relaxed">
                {t.home.activismeDesc}
              </p>
            </div>
            <Link
              href="/institucions"
              className="inline-flex items-center gap-2 h-13 px-7 py-3.5 rounded-md bg-primary text-primary-foreground font-display font-bold text-base hover:bg-primary/90 transition-colors shrink-0"
            >
              <Building2 size={18} aria-hidden="true" />
              {t.home.ctaInstitucions}
            </Link>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
