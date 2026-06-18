import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { useSEO } from "@/lib/seo";
import { EXECUTIVE_FULL } from "@/data/content";
import { useT } from "@/i18n/context";

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

const SEC_GENERAL = EXECUTIVE_FULL[0];
const NUCLI_OTHERS = EXECUTIVE_FULL.filter(
  (m) => m.area === "Nucli de Direcció" && m.name !== SEC_GENERAL.name,
);
const OTHER_AREAS = Array.from(
  new Set(EXECUTIVE_FULL.filter((m) => m.area !== "Nucli de Direcció").map((m) => m.area)),
);

export default function Equip() {
  const { t } = useT();

  useSEO({
    path: "/partit/equip",
    title: t.seo.equip.title,
    description: t.seo.equip.description,
  });

  return (
    <Layout
      crumbs={[
        { label: t.nav.nosaltres, href: "/partit" },
        { label: t.equip.crumb },
      ]}
    >
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="bg-[#1A1A1A] text-white">
        <div className="container-page py-16 md:py-24">
          <Reveal>
            <p className="font-display font-bold text-xs uppercase tracking-[0.22em] text-primary mb-4">
              {t.nav.nosaltres}
            </p>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[1.05] max-w-3xl">
              {t.equip.title}
            </h1>
            <p className="mt-5 text-white/70 text-lg leading-relaxed max-w-2xl">
              {t.equip.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────────── */}
      <section className="bg-white border-b border-border">
        <div className="container-page py-8 md:py-10">
          <Reveal className="grid grid-cols-3 gap-4 md:gap-8 text-center">
            <div>
              <p className="font-display font-extrabold text-4xl md:text-5xl text-primary leading-none">
                29
              </p>
              <p className="mt-1.5 text-sm font-medium text-muted-foreground">{t.equip.statsMembers}</p>
            </div>
            <div>
              <p className="font-display font-extrabold text-4xl md:text-5xl text-primary leading-none">
                9
              </p>
              <p className="mt-1.5 text-sm font-medium text-muted-foreground">{t.equip.statsAreas}</p>
            </div>
            <div>
              <p className="font-display font-extrabold text-base md:text-lg text-foreground leading-tight">
                XIV Congrés
              </p>
              <p className="mt-0.5 text-sm font-medium text-muted-foreground">Alcoi · Juny 2026</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Secretaria General – featured ───────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-page">
          <Reveal>
            <p className="font-display font-bold text-xs uppercase tracking-[0.22em] text-primary mb-8">
              {t.equip.secGeneralRole}
            </p>
            <div className="relative overflow-hidden rounded-2xl border-2 border-primary bg-gradient-to-br from-white to-[hsl(var(--surface))]">
              {/* Red accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary" aria-hidden="true" />
              <div className="pl-10 pr-8 py-10 md:py-12">
                <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
                  {/* Avatar */}
                  <div className="shrink-0">
                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-extrabold text-3xl md:text-4xl shadow-lg">
                      {initials(SEC_GENERAL.name)}
                    </div>
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <span className="inline-flex items-center px-3 py-1 rounded-sm bg-primary text-primary-foreground text-xs font-display font-bold uppercase tracking-widest mb-4">
                      {t.data.executiveRoles[SEC_GENERAL.role] ?? SEC_GENERAL.role}
                    </span>
                    <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground leading-tight">
                      {SEC_GENERAL.name}
                    </h2>
                    <p className="mt-4 text-muted-foreground text-base leading-relaxed max-w-2xl">
                      {t.equip.secGeneralDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Nucli de Direcció ────────────────────────────────────── */}
      <section className="bg-[hsl(var(--surface))] border-y border-border py-16 md:py-20">
        <div className="container-page">
          <Reveal>
            <p className="font-display font-bold text-xs uppercase tracking-[0.22em] text-primary mb-2">
              {t.equip.nucliTitle}
            </p>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-foreground">
              {t.data.executiveAreas["Nucli de Direcció"] ?? "Nucli de Direcció"}
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">{t.equip.nucliDesc}</p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {NUCLI_OTHERS.map((m, i) => (
              <Reveal key={m.name} delay={i * 80}>
                <div className="flex flex-col items-center text-center bg-white border border-border rounded-xl p-7 hover:border-primary/40 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-[hsl(var(--surface-strong))] border border-border flex items-center justify-center font-display font-bold text-lg text-muted-foreground mb-4">
                    {initials(m.name)}
                  </div>
                  <p className="font-display font-bold text-base text-foreground leading-tight">
                    {m.name}
                  </p>
                  <p className="mt-1.5 text-sm text-primary font-semibold">
                    {t.data.executiveRoles[m.role] ?? m.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other areas ─────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-page">
          <Reveal>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-foreground mb-12">
              {t.equip.otherAreas}
            </h2>
          </Reveal>

          <div className="space-y-14">
            {OTHER_AREAS.map((area) => {
              const members = EXECUTIVE_FULL.filter((m) => m.area === area);
              return (
                <div key={area}>
                  <Reveal>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="block w-1 h-7 bg-primary shrink-0" aria-hidden="true" />
                      <h3 className="font-display font-bold text-sm uppercase tracking-[0.18em] text-muted-foreground">
                        {t.data.executiveAreas[area] ?? area}
                      </h3>
                    </div>
                  </Reveal>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {members.map((m, i) => (
                      <Reveal key={m.name} delay={(i % 4) * 50}>
                        <div className="flex items-center gap-4 bg-[hsl(var(--surface))] border border-border rounded-lg p-4 hover:border-primary/40 transition-colors">
                          <span
                            className="shrink-0 w-11 h-11 rounded-full bg-white border border-border flex items-center justify-center font-display font-bold text-sm text-muted-foreground"
                            aria-hidden="true"
                          >
                            {initials(m.name)}
                          </span>
                          <div className="min-w-0">
                            <p className="font-display font-bold text-sm text-foreground leading-tight">
                              {m.name}
                            </p>
                            <p className="text-xs text-primary font-medium mt-0.5 leading-tight">
                              {t.data.executiveRoles[m.role] ?? m.role}
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
