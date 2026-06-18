import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { PageHero, SectionHeading } from "@/components/SectionHeading";
import { useSEO, getRouteMeta } from "@/lib/seo";
import { HISTORY, VALUES, EXECUTIVE_FULL } from "@/data/content";

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

const areas = Array.from(new Set(EXECUTIVE_FULL.map((m) => m.area)));

export default function Partit() {
  useSEO(getRouteMeta("/partit"));

  return (
    <Layout crumbs={[{ label: "Nosaltres" }]}>
      <PageHero
        title="El Partit"
        subtitle="Una història de més d'un segle al servei de la joventut, un ideari clar i una executiva renovada per liderar el present."
      />

      {/* Història */}
      <section className="bg-white">
        <div className="container-page py-16 md:py-20">
          <SectionHeading
            eyebrow="La nostra història"
            title="Des de 1903, lluitant per la joventut"
            intro="Les Joventuts Socialistes d'Espanya van ser fundades per Tomás Meabe. Joves Socialistes del País Valencià hereta eixa tradició amb plena autonomia orgànica."
          />

          <ol className="mt-12 relative border-l-2 border-border ml-2 pl-8 space-y-10">
            {HISTORY.map((m, i) => (
              <Reveal as="li" key={m.year} delay={i * 60} className="relative">
                <span
                  className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-white"
                  aria-hidden="true"
                />
                <span className="font-display font-extrabold text-2xl text-foreground">{m.year}</span>
                <h3 className="font-display font-bold text-lg text-foreground mt-1">{m.title}</h3>
                <p className="mt-1.5 text-muted-foreground leading-relaxed max-w-2xl">{m.desc}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Valors */}
      <section className="bg-[hsl(var(--surface))] border-y border-border">
        <div className="container-page py-16 md:py-20">
          <SectionHeading eyebrow="Idees i valors" title="Els principis que ens mouen" />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 80} className="h-full">
                <div className="h-full bg-white border border-border rounded-lg p-6 hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="block w-1.5 h-6 bg-primary" aria-hidden="true" />
                    <h3 className="font-display font-bold text-lg text-foreground">{v.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Executiva */}
      <section className="bg-white">
        <div className="container-page py-16 md:py-20">
          <SectionHeading
            eyebrow="XIV Congrés · Alcoi, juny 2026"
            title="Comissió Executiva Nacional"
            intro="L'equip emanat del XIV Congrés Nacional, organitzat per àrees estratègiques."
          />

          <div className="mt-12 space-y-12">
            {areas.map((area) => {
              const members = EXECUTIVE_FULL.filter((m) => m.area === area);
              return (
                <div key={area}>
                  <h3 className="font-display font-bold text-xs uppercase tracking-[0.18em] text-muted-foreground border-b border-border pb-3 mb-6">
                    {area}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {members.map((m, i) => (
                      <Reveal key={m.name} delay={(i % 4) * 60} className="h-full">
                        <div className="h-full flex items-center gap-4 bg-[hsl(var(--surface))] border border-border rounded-lg p-4">
                          <span
                            className="shrink-0 w-12 h-12 rounded-full bg-white border border-border flex items-center justify-center font-display font-bold text-sm text-muted-foreground"
                            aria-hidden="true"
                          >
                            {initials(m.name)}
                          </span>
                          <div className="min-w-0">
                            <p className="font-display font-bold text-sm text-foreground leading-tight">
                              {m.name}
                            </p>
                            <p className="text-xs text-primary font-medium mt-0.5 leading-tight">
                              {m.role}
                            </p>
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
