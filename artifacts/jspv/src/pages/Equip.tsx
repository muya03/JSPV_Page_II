import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { useSEO } from "@/lib/seo";
import { EXECUTIVE_FULL, type ExecutiveMember } from "@/data/content";
import { useT } from "@/i18n/context";

// ── helpers ────────────────────────────────────────────────────────────────

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

// Hierarchical order (most senior first)
const AREA_HIER: string[] = [
  "Nucli de Direcció",
  "Vicesecretaries Generals",
  "Coordinació i Estratègia",
  "Drets i Inclusió",
  "Cultura, Llengua i Memòria",
  "Acció i Polítiques Públiques",
  "Desenvolupament i Societat",
  "Militància i Entorn Laboral",
  "Altres Sectors Clau",
];

// Area order = alphabetical for the "per àrea" toggle
const AREA_ALPHA: string[] = [...AREA_HIER].sort((a, b) => a.localeCompare(b, "ca"));

// ── sub-components ─────────────────────────────────────────────────────────

function MemberCard({
  member,
  roleLabel,
}: {
  member: ExecutiveMember;
  roleLabel: string;
}) {
  const isSecGen = member.role === "Secretaria General";
  return (
    <div className="group flex flex-col items-center text-center bg-white border border-border rounded-2xl p-5 hover:shadow-lg hover:border-primary/25 hover:-translate-y-0.5 transition-all duration-200">
      {/* Avatar */}
      <div
        className={`w-[72px] h-[72px] rounded-full flex items-center justify-center font-display font-extrabold text-base mb-3 transition-transform duration-200 group-hover:scale-105 select-none ${
          isSecGen
            ? "bg-primary text-primary-foreground ring-2 ring-primary/30 ring-offset-2"
            : "bg-[#1A1A1A] text-white"
        }`}
        aria-hidden="true"
      >
        {initials(member.name)}
      </div>

      {/* Role */}
      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-primary/75 leading-tight mb-1 max-w-[120px]">
        {roleLabel}
      </p>

      {/* Name */}
      <p className="font-display font-bold text-sm text-foreground leading-snug">
        {member.name}
      </p>
    </div>
  );
}

function AreaBlock({
  area,
  areaLabel,
  members,
  t,
}: {
  area: string;
  areaLabel: string;
  members: ExecutiveMember[];
  t: ReturnType<typeof useT>["t"];
}) {
  return (
    <div>
      <Reveal>
        <div className="flex items-center gap-3 mb-5">
          <span className="block w-1 h-5 bg-primary shrink-0" aria-hidden="true" />
          <h2 className="font-display font-bold text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {areaLabel}
          </h2>
          <span className="text-[11px] font-medium text-muted-foreground/60">
            ({members.length})
          </span>
        </div>
      </Reveal>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {members.map((m, i) => (
          <Reveal key={m.name} delay={(i % 5) * 40}>
            <MemberCard
              member={m}
              roleLabel={t.data.executiveRoles[m.role] ?? m.role}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// ── page ───────────────────────────────────────────────────────────────────

export default function Equip() {
  const { t, lang } = useT();
  const [view, setView] = useState<"hierarchy" | "area">("hierarchy");

  useSEO({
    path: "/partit/equip",
    title: t.seo.equip.title,
    description: t.seo.equip.description,
  });

  const areaOrder = view === "hierarchy" ? AREA_HIER : AREA_ALPHA;
  const areas = areaOrder.filter((a) => EXECUTIVE_FULL.some((m) => m.area === a));

  const labelHierarchy = lang === "es" ? "Por jerarquía" : "Per jerarquia";
  const labelArea = lang === "es" ? "Por área" : "Per àrea";

  return (
    <Layout
      crumbs={[
        { label: t.nav.nosaltres, href: "/partit" },
        { label: t.equip.crumb },
      ]}
    >
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="bg-[#1A1A1A] text-white">
        <div className="container-page py-16 md:py-20">
          <Reveal>
            <p className="font-display font-bold text-xs uppercase tracking-[0.22em] text-primary mb-4">
              {t.nav.nosaltres}
            </p>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] max-w-3xl">
              {t.equip.title}
            </h1>
            <p className="mt-5 text-white/70 text-lg leading-relaxed max-w-2xl">
              {t.equip.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Stats strip ───────────────────────────────────────── */}
      <section className="bg-white border-b border-border">
        <div className="container-page py-7">
          <Reveal className="flex flex-wrap items-center justify-center sm:justify-start gap-8 sm:gap-16 text-center sm:text-left">
            <div>
              <p className="font-display font-extrabold text-5xl text-primary leading-none">
                {EXECUTIVE_FULL.length}
              </p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                {t.equip.statsMembers}
              </p>
            </div>
            <div>
              <p className="font-display font-extrabold text-5xl text-primary leading-none">
                {AREA_HIER.length}
              </p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                {t.equip.statsAreas}
              </p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" aria-hidden="true" />
            <div>
              <p className="font-display font-bold text-base text-foreground">
                XIV {lang === "es" ? "Congreso" : "Congrés"}
              </p>
              <p className="text-sm font-medium text-muted-foreground">
                {lang === "es" ? "Alcoy · Junio 2026" : "Alcoi · Juny 2026"}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Team grid ─────────────────────────────────────────── */}
      <section className="bg-[hsl(var(--surface))]">
        <div className="container-page py-12 md:py-16">
          {/* Toggle */}
          <Reveal className="flex justify-center mb-12">
            <div
              className="inline-flex rounded-full border border-border bg-white p-1 shadow-sm"
              role="group"
              aria-label={lang === "es" ? "Vista del equipo" : "Vista de l'equip"}
            >
              {(
                [
                  { key: "hierarchy", label: labelHierarchy },
                  { key: "area", label: labelArea },
                ] as const
              ).map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setView(key)}
                  aria-pressed={view === key}
                  className={`rounded-full px-6 py-2 text-sm font-display font-semibold transition-all duration-200 ${
                    view === key
                      ? "bg-[#1A1A1A] text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Areas with member grids */}
          <div className="space-y-12">
            {areas.map((area) => {
              const members = EXECUTIVE_FULL.filter((m) => m.area === area);
              const areaLabel = t.data.executiveAreas[area] ?? area;
              return (
                <AreaBlock
                  key={area}
                  area={area}
                  areaLabel={areaLabel}
                  members={members}
                  t={t}
                />
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
