import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/SectionHeading";
import { useSEO, getRouteMeta } from "@/lib/seo";
import { CAMPAIGNS } from "@/data/content";
import { Check } from "lucide-react";

export default function Campanyes() {
  useSEO(getRouteMeta("/campanyes"));

  return (
    <Layout crumbs={[{ label: "Campanyes" }]}>
      <PageHero
        title="Campanyes"
        subtitle="Repositori de campanyes i argumentaris polítics de Joves Socialistes del País Valencià."
      />

      <section className="bg-[hsl(var(--surface))]">
        <div className="container-page py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {CAMPAIGNS.map((c, i) => (
              <Reveal as="article" key={c.slug} delay={(i % 2) * 80} className="h-full">
                <div className="h-full flex flex-col bg-white border border-border rounded-lg overflow-hidden">
                  <div className="p-7 border-b border-border">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-primary/10 text-primary text-xs font-display font-bold uppercase tracking-wide">
                      {c.tag}
                    </span>
                    <h2 className="mt-4 font-display font-extrabold text-2xl text-foreground leading-tight">
                      {c.title}
                    </h2>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{c.summary}</p>
                  </div>
                  <div className="p-7">
                    <h3 className="font-display font-bold text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">
                      Argumentari
                    </h3>
                    <ul className="space-y-3">
                      {c.points.map((p) => (
                        <li key={p} className="flex items-start gap-3">
                          <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                            <Check size={13} aria-hidden="true" />
                          </span>
                          <span className="text-sm text-foreground/90 leading-relaxed">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
