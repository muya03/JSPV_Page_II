import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/SectionHeading";
import { useSEO } from "@/lib/seo";
import { CAMPAIGNS } from "@/data/content";
import { useT } from "@/i18n/context";
import { Check } from "lucide-react";

export default function Campanyes() {
  const { t } = useT();

  useSEO({
    path: "/campanyes",
    title: t.seo.campanyes.title,
    description: t.seo.campanyes.description,
  });

  const campaigns = CAMPAIGNS.map((c, i) => ({ ...c, ...t.data.campaigns[i] }));

  return (
    <Layout crumbs={[{ label: t.campanyes.crumb }]}>
      <PageHero title={t.campanyes.title} subtitle={t.campanyes.subtitle} />

      <section className="bg-[hsl(var(--surface))]">
        <div className="container-page py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {campaigns.map((c, i) => (
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
                      {t.campanyes.argumentari}
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
