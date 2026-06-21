import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/SectionHeading";
import { useSEO } from "@/lib/seo";
import { REPRESENTATIVES, type Representative } from "@/data/content";
import { useT } from "@/i18n/context";
import heroImg from "@assets/HEMICICLOVACIO--644x362_1781818524829.jpg";

const PROVINCES: Representative["prov"][] = ["València", "Alacant", "Castelló"];
const INSTITUTIONS: Representative["type"][] = ["Les Corts", "Ajuntaments", "Diputacions"];

export default function Institucions() {
  const { t } = useT();

  useSEO({
    path: "/institucions",
    title: t.seo.institucions.title,
    description: t.seo.institucions.description,
  });

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
    <Layout crumbs={[{ label: t.institucions.crumb }]}>
      <PageHero title={t.institucions.title} subtitle={t.institucions.subtitle} image={heroImg} />

      <section className="bg-[hsl(var(--surface))]">
        <div className="container-page py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
            <aside aria-label={t.institucions.provincia}>
              <div className="lg:sticky lg:top-28 space-y-8">
                <div>
                  <h2 className="font-display font-bold text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
                    {t.institucions.provincia}
                  </h2>
                  <div className="space-y-2">
                    <button type="button" onClick={() => setProv(null)} className={optionBtn(prov === null)} data-testid="filter-prov-all">
                      {t.institucions.todesProvinces}
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
                    {t.institucions.institucio}
                  </h2>
                  <div className="space-y-2">
                    <button type="button" onClick={() => setInst(null)} className={optionBtn(inst === null)} data-testid="filter-inst-all">
                      {t.institucions.todesInstitucions}
                    </button>
                    {INSTITUTIONS.map((ty) => (
                      <button
                        key={ty}
                        type="button"
                        onClick={() => setInst(inst === ty ? null : ty)}
                        className={optionBtn(inst === ty)}
                        data-testid={`filter-inst-${ty}`}
                      >
                        {ty}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <div>
              <p className="text-sm text-muted-foreground mb-6" aria-live="polite">
                {filtered.length}{" "}
                {filtered.length === 1 ? t.institucions.representant : t.institucions.representants}
              </p>

              {filtered.length === 0 ? (
                <div className="bg-white border border-border rounded-lg p-12 text-center text-muted-foreground">
                  {t.institucions.capResultat}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {filtered.map((r, i) => (
                    <Reveal key={r.name} delay={(i % 4) * 60} className="h-full">
                      <div className="h-full bg-white border border-border rounded-lg p-5 flex items-center gap-4">
                        {r.photo ? (
                          <img
                            src={r.photo}
                            alt={r.name}
                            className="w-16 h-16 rounded-full object-cover object-top shrink-0 ring-2 ring-border"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-[hsl(var(--surface-strong))] shrink-0 flex items-center justify-center font-display font-bold text-lg text-muted-foreground">
                            {r.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-display font-bold text-sm text-foreground leading-tight">
                              {r.name}
                            </h3>
                            <span className="shrink-0 text-xs font-display font-bold uppercase tracking-wide px-2 py-1 rounded-sm bg-[hsl(var(--surface-strong))] text-muted-foreground">
                              {r.prov}
                            </span>
                          </div>
                          <p className="text-primary font-semibold text-xs">{r.role}</p>
                          <p className="text-muted-foreground text-xs mt-0.5 truncate">{r.inst}</p>
                        </div>
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
