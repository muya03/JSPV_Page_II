import { Link } from "wouter";
import { ArrowRight, Building2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { useSEO, getRouteMeta } from "@/lib/seo";
import { NEWS } from "@/data/content";
import { HeroBanner } from "@/components/HeroBanner";
import { InstagramFeed } from "@/components/InstagramFeed";

const featured = NEWS.slice(0, 3);

export default function Inicio() {
  useSEO(getRouteMeta("/"));

  return (
    <Layout>
      {/* Banner principal — imatge slider full-width */}
      <HeroBanner />

      {/* Feed Instagram */}
      <InstagramFeed />

      {/* Actualitat */}
      <section className="bg-[hsl(var(--surface))] border-y border-border">
        <div className="container-page py-16 md:py-20">
          <Reveal className="flex items-end justify-between gap-6 mb-10">
            <div>
              <p className="font-display font-bold text-xs uppercase tracking-[0.18em] text-primary mb-3">
                Sala de premsa
              </p>
              <h2 className="font-display font-extrabold text-foreground text-3xl sm:text-4xl">
                Actualitat
              </h2>
            </div>
            <Link
              href="/actualitat"
              className="hidden sm:inline-flex items-center gap-2 font-display font-semibold text-primary hover:gap-3 transition-all"
            >
              Veure tot <ArrowRight size={16} aria-hidden="true" />
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
                      {item.category}
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
                      Llegir més <ArrowRight size={15} aria-hidden="true" />
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
            Veure tota l'actualitat <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Banner: En les Institucions */}
      <section className="bg-[#1A1A1A] text-white">
        <div className="container-page py-16 md:py-20">
          <Reveal className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <p className="font-display font-bold text-xs uppercase tracking-[0.18em] text-primary mb-3">
                Em representa
              </p>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl leading-tight">
                Activisme de govern, no només de carrer
              </h2>
              <p className="mt-4 text-white/70 text-lg leading-relaxed">
                Joves Socialistes amb responsabilitats reals a Les Corts, ajuntaments i
                diputacions de tot el País Valencià. Coneix qui et representa.
              </p>
            </div>
            <Link
              href="/institucions"
              className="inline-flex items-center gap-2 h-13 px-7 py-3.5 rounded-md bg-primary text-primary-foreground font-display font-bold text-base hover:bg-primary/90 transition-colors shrink-0"
            >
              <Building2 size={18} aria-hidden="true" />
              En les Institucions
            </Link>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
