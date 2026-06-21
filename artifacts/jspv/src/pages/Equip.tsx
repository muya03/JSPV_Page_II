import { useState, useCallback } from "react";
import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { useSEO } from "@/lib/seo";
import { EXECUTIVE_FULL, type ExecutiveMember } from "@/data/content";
import { useT } from "@/i18n/context";
import heroBg from "@assets/6e828fcbfebe4e0645c4602230b2dc6d_1781816545714.jpg";

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

const AREA_ACCENT: Record<string, string> = {
  "Nucli de Direcció": "#E30613",
  "Vicesecretaries Generals": "#b00010",
  "Coordinació i Estratègia": "#1A1A1A",
  "Drets i Inclusió": "#1a3550",
  "Cultura, Llengua i Memòria": "#1a3a28",
  "Acció i Polítiques Públiques": "#1a1a3a",
  "Desenvolupament i Societat": "#2a1a3a",
  "Militància i Entorn Laboral": "#1a2a3a",
  "Altres Sectors Clau": "#3a2010",
};

const NUCLI = "Nucli de Direcció";
const VICE = "Vicesecretaries Generals";
const AREA_ORDER = [
  "Coordinació i Estratègia",
  "Drets i Inclusió",
  "Cultura, Llengua i Memòria",
  "Acció i Polítiques Públiques",
  "Desenvolupament i Societat",
  "Militància i Entorn Laboral",
  "Altres Sectors Clau",
];

const orgMembers = EXECUTIVE_FULL.filter(
  (m) => m.area === NUCLI || m.area === VICE
);
const secretariesMembers = EXECUTIVE_FULL.filter(
  (m) => m.area !== NUCLI && m.area !== VICE
);

function MemberCard({
  member,
  isExpanded,
  onToggle,
  lang,
}: {
  member: ExecutiveMember;
  isExpanded: boolean;
  onToggle: () => void;
  lang: string;
}) {
  const accent = AREA_ACCENT[member.area] ?? "#1A1A1A";

  return (
    <div
      className={`relative flex flex-col items-center text-center bg-white rounded-2xl overflow-hidden cursor-pointer select-none transition-all duration-300 ${
        isExpanded
          ? "shadow-2xl ring-2 ring-[--accent]/30"
          : "shadow-sm border border-border hover:shadow-md hover:-translate-y-0.5"
      }`}
      style={{ "--accent": accent } as React.CSSProperties}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      {/* Coloured top bar */}
      <div
        className="w-full h-1.5 shrink-0"
        style={{ backgroundColor: accent }}
        aria-hidden="true"
      />

      <div className="w-full px-4 pt-5 pb-4 flex flex-col items-center">
        {/* Avatar */}
        <div
          className={`w-[76px] h-[76px] rounded-full flex items-center justify-center font-display font-extrabold text-lg text-white mb-3 transition-transform duration-300 ${
            isExpanded ? "scale-110" : "group-hover:scale-105"
          }`}
          style={{ backgroundColor: accent }}
          aria-hidden="true"
        >
          {initials(member.name)}
        </div>

        {/* Role */}
        <p
          className="text-[9px] font-bold uppercase tracking-[0.2em] leading-tight mb-1.5 max-w-[130px]"
          style={{ color: accent }}
        >
          {member.role}
        </p>

        {/* Name */}
        <p className="font-display font-bold text-sm text-foreground leading-snug">
          {member.name}
        </p>

        {/* Expand chevron */}
        <div
          className={`mt-2 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
            isExpanded ? "opacity-100" : "opacity-40"
          }`}
          style={{ backgroundColor: `${accent}18` }}
          aria-hidden="true"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          >
            <path
              d="M2 3.5L5 6.5L8 3.5"
              stroke={accent}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Expandable content — CSS grid trick for smooth height */}
      <div
        className="w-full grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-5">
            <div className="h-px bg-border mb-3" />

            {/* Area badge */}
            <span
              className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest mb-3"
              style={{
                backgroundColor: `${accent}15`,
                color: accent,
                border: `1px solid ${accent}30`,
              }}
            >
              {member.area}
            </span>

            {/* Bio */}
            <p className="text-xs text-muted-foreground leading-relaxed text-left">
              {member.bio}
            </p>

            {/* Close hint */}
            <p
              className="mt-3 text-[9px] font-semibold uppercase tracking-widest text-center"
              style={{ color: `${accent}80` }}
            >
              {lang === "es" ? "Cerrar ↑" : "Tancar ↑"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamSection({
  title,
  members,
  selectedName,
  onToggle,
  lang,
}: {
  title: string;
  members: ExecutiveMember[];
  selectedName: string | null;
  onToggle: (name: string) => void;
  lang: string;
}) {
  return (
    <div>
      <Reveal>
        <div className="flex items-center gap-3 mb-6">
          <span className="block w-1 h-6 bg-primary shrink-0" aria-hidden="true" />
          <h2 className="font-display font-extrabold text-lg text-foreground">
            {title}
          </h2>
          <span className="text-sm font-medium text-muted-foreground/50">
            ({members.length})
          </span>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 items-start">
        {members.map((m, i) => (
          <Reveal key={m.name} delay={(i % 5) * 40}>
            <MemberCard
              member={m}
              isExpanded={selectedName === m.name}
              onToggle={() => onToggle(m.name)}
              lang={lang}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function AreaSections({
  selectedName,
  onToggle,
  lang,
}: {
  selectedName: string | null;
  onToggle: (name: string) => void;
  lang: string;
}) {
  return (
    <>
      {AREA_ORDER.map((area) => {
        const members = secretariesMembers.filter((m) => m.area === area);
        if (!members.length) return null;
        return (
          <div key={area}>
            <hr className="border-border" />
            <TeamSection
              title={area}
              members={members}
              selectedName={selectedName}
              onToggle={onToggle}
              lang={lang}
            />
          </div>
        );
      })}
    </>
  );
}

export default function Equip() {
  const { t, lang } = useT();
  const [selectedName, setSelectedName] = useState<string | null>(null);

  useSEO({
    path: "/partit/equip",
    title: t.seo.equip.title,
    description: t.seo.equip.description,
  });

  const toggle = useCallback((name: string) => {
    setSelectedName((prev) => (prev === name ? null : name));
  }, []);

  const sectionOrg =
    lang === "es" ? "Organización y Dirección" : "Organització i Direcció";
  const sectionSec =
    lang === "es" ? "Secretarías" : "Secretaries";

  return (
    <Layout
      crumbs={[
        { label: t.nav.nosaltres, href: "/partit" },
        { label: t.equip.crumb },
      ]}
    >
      {/* Hero */}
      <section
        className="relative text-white overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        <div className="absolute inset-0 bg-[#1A1A1A]/75" aria-hidden="true" />
        <div className="relative z-10 container-page py-20 md:py-28">
          <Reveal>
            <p className="font-display font-bold text-xs uppercase tracking-[0.22em] text-primary mb-4">
              {t.nav.nosaltres}
            </p>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] max-w-3xl">
              {t.equip.title}
            </h1>
            <p className="mt-5 text-white/75 text-lg leading-relaxed max-w-2xl">
              {t.equip.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-white border-b border-border">
        <div className="container-page py-7">
          <Reveal className="flex flex-wrap items-center justify-center sm:justify-start gap-8 sm:gap-16">
            <div className="text-center sm:text-left">
              <p className="font-display font-extrabold text-5xl text-primary leading-none">
                {EXECUTIVE_FULL.length}
              </p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                {t.equip.statsMembers}
              </p>
            </div>
            <div className="text-center sm:text-left">
              <p className="font-display font-extrabold text-5xl text-primary leading-none">
                9
              </p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                {t.equip.statsAreas}
              </p>
            </div>
            <div
              className="hidden sm:block w-px h-12 bg-border"
              aria-hidden="true"
            />
            <div className="text-center sm:text-left">
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

      {/* Instruction hint */}
      <div className="bg-primary/5 border-b border-primary/10">
        <div className="container-page py-3 flex items-center gap-2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="text-primary shrink-0"
            aria-hidden="true"
          >
            <circle cx="7" cy="7" r="6.25" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M7 6v4M7 4.5v.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <p className="text-xs text-primary/80 font-medium">
            {lang === "es"
              ? "Haz clic en cualquier tarjeta para conocer a cada persona"
              : "Fes clic en qualsevol targeta per conèixer cada persona"}
          </p>
        </div>
      </div>

      {/* Team grid */}
      <section className="bg-[hsl(var(--surface))]">
        <div className="container-page py-12 md:py-16 space-y-14">
          <TeamSection
            title={sectionOrg}
            members={orgMembers}
            selectedName={selectedName}
            onToggle={toggle}
            lang={lang}
          />
          <AreaSections
            selectedName={selectedName}
            onToggle={toggle}
            lang={lang}
          />
        </div>
      </section>
    </Layout>
  );
}
