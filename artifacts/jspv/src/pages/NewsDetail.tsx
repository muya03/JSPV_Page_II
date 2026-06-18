import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { useSEO, type RouteMeta } from "@/lib/seo";
import { NEWS } from "@/data/content";
import NotFound from "./not-found";

export default function NewsDetail() {
  const [, params] = useRoute("/actualitat/:slug");
  const slug = params?.slug;
  const item = NEWS.find((n) => n.slug === slug);

  const meta: RouteMeta = item
    ? { path: `/actualitat/${item.slug}`, title: `${item.title} · JSPV`, description: item.excerpt, image: item.image }
    : { path: "/404", title: "Notícia no trobada · JSPV", description: "" };
  useSEO(meta);

  if (!item) return <NotFound />;

  const others = NEWS.filter((n) => n.slug !== item.slug).slice(0, 2);

  return (
    <Layout crumbs={[{ label: "Actualitat", href: "/actualitat" }, { label: item.category }]}>
      <article className="bg-white">
        <div className="container-prose py-12 md:py-16">
          <Reveal>
            <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-primary text-primary-foreground text-xs font-display font-bold uppercase tracking-wide">
              {item.category}
            </span>
            <h1 className="mt-5 font-display font-extrabold text-foreground text-3xl sm:text-4xl leading-[1.1]">
              {item.title}
            </h1>
            <time dateTime={item.iso} className="mt-4 block text-sm font-medium text-muted-foreground">
              {item.date}
            </time>
          </Reveal>

          <div className="mt-8 aspect-[16/9] bg-[hsl(var(--surface-strong))] rounded-lg overflow-hidden">
            <img
              src={item.image}
              alt={item.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>

          <Reveal className="mt-10 space-y-5">
            {item.body.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-foreground/90">
                {p}
              </p>
            ))}
          </Reveal>

          <div className="mt-12 pt-8 border-t border-border">
            <Link href="/actualitat" className="inline-flex items-center gap-2 font-display font-semibold text-primary">
              <ArrowLeft size={16} aria-hidden="true" /> Tornar a l'actualitat
            </Link>
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="bg-[hsl(var(--surface))] border-t border-border">
        <div className="container-page py-14">
          <h2 className="font-display font-extrabold text-2xl text-foreground mb-8">Més notícies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {others.map((other, i) => (
              <Reveal as="article" key={other.slug} delay={i * 80}>
                <Link
                  href={`/actualitat/${other.slug}`}
                  className="group flex flex-col h-full bg-white rounded-lg border border-border p-6 hover:border-primary/40 transition-colors"
                >
                  <span className="text-xs font-display font-bold uppercase tracking-wide text-primary">
                    {other.category}
                  </span>
                  <h3 className="mt-2 font-display font-bold text-lg leading-snug text-foreground group-hover:text-primary transition-colors">
                    {other.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-display font-semibold text-sm text-primary">
                    Llegir més <ArrowRight size={15} aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
