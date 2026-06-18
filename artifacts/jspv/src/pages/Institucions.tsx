import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/SectionHeading";
import { useSEO, getRouteMeta } from "@/lib/seo";
import { REPRESENTATIVES, type Representative } from "@/data/content";

const PROVINCES: Representative["prov"][] = ["València", "Alacant", "Castelló"];
const INSTITUTIONS: Representative["type"][] = ["Les Corts", "Ajuntaments", "Diputacions"];

export default function Institucions() {
  useSEO(getRouteMeta("/institucions"));
  const [prov, setProv] = useState<Representative["prov"] | null>(null);
  const [inst, setInst] = useState<Representative["type"] | null>(null);

  const filtered = REPRESENTATIVES.filter(
    (r) => (prov === null || r.prov === prov) && (inst === null || r.type === inst),
  );

  const optionBtn = (active: boolean) =>
    `w-full text-left px-4 py-2.5 rounded-md font-display font-semibold text-sm transition-colors ${
      active
        ? "bg-primary text-primary-foreground"
        : "bg-white border border-border text-foreground hover:border-foreground/40"
    }`;

  return (
    <Layout crumbs={[{ label: "En les Institucions" }]}>
      <PageHero
        title="En les Institucions"
        subtitle="Directori de càrrecs públics de JSPV. Filtra per província i institució per descobrir qui et representa."
      />

      <section className="bg-[hsl(var(--surface))]">
        <div className="container-page py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
            {/* Sidebar filters */}
            <aside aria-label="Filtres">
              <div className="lg:sticky lg:top-28 space-y-8">
                <div>
                  <h2 className="font-display font-bold text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
                    Província
                  </h2>
                  <div className="space-y-2">
                    <button type="button" onClick={() => setProv(null)} className={optionBtn(prov === null)} data-testid="filter-prov-all">
                      Totes les províncies
                    </button>
                    {PROVINCES.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setProv(prov === p ? null : p)}
                        className={optionBtn(prov === p)}
                        data-testid={`filter-prov-${p}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="font-display font-bold text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
                    Institució
                  </h2>
                  <div className="space-y-2">
                    <button type="button" onClick={() => setInst(null)} className={optionBtn(inst === null)} data-testid="filter-inst-all">
                      Totes les institucions
                    </button>
                    {INSTITUTIONS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setInst(inst === t ? null : t)}
                        className={optionBtn(inst === t)}
                        data-testid={`filter-inst-${t}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Results */}
            <div>
              <p className="text-sm text-muted-foreground mb-6" aria-live="polite">
                {filtered.length} {filtered.length === 1 ? "representant" : "representants"}
              </p>

              {filtered.length === 0 ? (
                <div className="bg-white border border-border rounded-lg p-12 text-center text-muted-foreground">
                  Cap representant per a aquesta selecció.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {filtered.map((r, i) => (
                    <Reveal key={r.name} delay={(i % 4) * 60} className="h-full">
                      <div className="h-full bg-white border border-border rounded-lg p-6">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h3 className="font-display font-bold text-base text-foreground leading-tight">
                            {r.name}
                          </h3>
                          <span className="shrink-0 text-xs font-display font-bold uppercase tracking-wide px-2 py-1 rounded-sm bg-[hsl(var(--surface-strong))] text-muted-foreground">
                            {r.prov}
                          </span>
                        </div>
                        <p className="text-primary font-semibold text-sm">{r.role}</p>
                        <p className="text-muted-foreground text-sm mt-1">{r.inst}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
