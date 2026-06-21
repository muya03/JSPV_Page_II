import { useState, useCallback } from "react";
import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { useSEO } from "@/lib/seo";
import { EXECUTIVE_FULL, type ExecutiveMember } from "@/data/content";
import { useT } from "@/i18n/context";
import heroBg from "@assets/6e828fcbfebe4e0645c4602230b2dc6d_1781816545714.jpg";
import photoMarcos from "@assets/MarcosDura_1782063504964.jpeg";
import photoItziar from "@assets/itziar-lafita_xl_1782063504964.jpg";
import photoFrancisco from "@assets/Francisco_Jose_Hidalgo_2023_1782063504963.jpg";

const PHOTOS: Record<string, string> = {
  "Marcos Durà Gimeno": photoMarcos,
  "Itziar Lafita Balaguer": photoItziar,
  "Francisco José Hidalgo Vidal": photoFrancisco,
};

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

const secGen = EXECUTIVE_FULL.find((m) => m.role === "Secretaria General");
const members = EXECUTIVE_FULL.filter((m) => m.role !== "Secretaria General");

// ── Secretary General — featured block ───────────────────────────────────────

function SecGenFeature({
  member,
  lang,
  photo,
}: {
  member: ExecutiveMember;
  lang: string;
  photo?: string;
}) {
  return (
    <Reveal>
      <div className="relative bg-white rounded-3xl shadow-[0_20px_60px_-20px_rgba(227,6,19,0.35)] overflow-hidden grid md:grid-cols-[300px_1fr]">
        {/* Left — red panel with oversized avatar */}
        <div className="relative bg-primary text-white flex flex-col items-center justify-center py-12 px-8 overflow-hidden">
          {/* Decorative oversized star watermark */}
          <span
            className="pointer-events-none absolute -right-8 -bottom-10 font-display font-extrabold text-[11rem] leading-none text-white/10 select-none"
            aria-hidden="true"
          >
            ★
          </span>

          <div className="relative w-36 h-36 rounded-full bg-white text-primary flex items-center justify-center font-display font-extrabold text-5xl shadow-xl ring-8 ring-white/20 overflow-hidden">
            {photo ? (
              <img src={photo} alt={member.name} className="w-full h-full object-cover object-top" />
            ) : (
              initials(member.name)
            )}
          </div>

          <p className="relative mt-6 text-[11px] font-bold uppercase tracking-[0.3em] text-white/90 text-center">
            {lang === "es" ? "Secretario General" : "Secretari General"}
          </p>
        </div>

        {/* Right — name + bio */}
        <div className="relative flex flex-col justify-center p-8 md:p-12">
          <span className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {lang === "es" ? "Máxima responsabilidad" : "Màxima responsabilitat"}
          </span>

          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground leading-[1.05]">
            {member.name}
          </h2>

          <div className="mt-5 mb-6 w-16 h-1 bg-primary rounded-full" />

          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
            {member.bio}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

// ── Member tile — white square, red panel slides up on click ─────────────────

function MemberTile({
  member,
  isActive,
  onToggle,
  lang,
  photo,
}: {
  member: ExecutiveMember;
  isActive: boolean;
  onToggle: () => void;
  lang: string;
  photo?: string;
}) {
  return (
    <div
      className={`group relative aspect-square rounded-2xl overflow-hidden cursor-pointer select-none transition-all duration-300 bg-white ${
        isActive
          ? "shadow-2xl -translate-y-1"
          : "border border-border shadow-sm hover:shadow-lg hover:-translate-y-1"
      }`}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      aria-label={member.name}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      {/* Default face */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <div className={`w-[68px] h-[68px] rounded-full text-white flex items-center justify-center font-display font-extrabold text-lg mb-3 transition-transform duration-300 group-hover:scale-110 overflow-hidden ${photo ? "bg-transparent" : "bg-[#1A1A1A] group-hover:bg-primary"}`}>
          {photo ? (
            <img src={photo} alt={member.name} className="w-full h-full object-cover object-top" />
          ) : (
            initials(member.name)
          )}
        </div>
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-primary leading-tight mb-1.5 line-clamp-2">
          {member.role}
        </p>
        <p className="font-display font-bold text-sm text-foreground leading-snug line-clamp-2">
          {member.name}
        </p>

        {/* Corner plus indicator */}
        <span
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white"
          aria-hidden="true"
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path
              d="M5.5 1.5v8M1.5 5.5h8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>

      {/* Red panel — slides up on click */}
      <div
        className={`absolute inset-0 bg-primary text-white p-5 flex flex-col transition-transform duration-[400ms] ease-out ${
          isActive ? "translate-y-0" : "translate-y-[101%]"
        }`}
      >
        <span
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
          aria-hidden="true"
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path
              d="M1.5 5.5h8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </span>

        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/80 leading-tight mb-1 pr-7">
          {member.role}
        </p>
        <p className="font-display font-extrabold text-[15px] leading-tight mb-2.5">
          {member.name}
        </p>
        <p className="text-[11px] leading-relaxed text-white/90 overflow-y-auto pr-1 flex-1 min-h-0">
          {member.bio}
        </p>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Equip() {
  const { t, lang } = useT();
  const [activeName, setActiveName] = useState<string | null>(null);

  useSEO({
    path: "/partit/equip",
    title: t.seo.equip.title,
    description: t.seo.equip.description,
  });

  const toggle = useCallback((name: string) => {
    setActiveName((prev) => (prev === name ? null : name));
  }, []);

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
            <div className="hidden sm:block w-px h-12 bg-border" aria-hidden="true" />
            <div className="text-center sm:text-left">
              <p className="font-display font-bold text-base text-foreground">
                XIV {lang === "es" ? "Congreso Nacional" : "Congrés Nacional"}
              </p>
              <p className="text-sm font-medium text-muted-foreground">
                {lang === "es" ? "Alcoy · Junio 2026" : "Alcoi · Juny 2026"}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section className="bg-[hsl(var(--surface))]">
        <div className="container-page py-12 md:py-16 space-y-14">
          {/* Featured Secretary General */}
          {secGen && <SecGenFeature member={secGen} lang={lang} photo={PHOTOS[secGen.name]} />}

          {/* Collective grid */}
          <div>
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-3 mb-7">
                <div className="flex items-center gap-3">
                  <span
                    className="block w-1 h-6 bg-primary shrink-0"
                    aria-hidden="true"
                  />
                  <h2 className="font-display font-extrabold text-lg text-foreground">
                    {lang === "es"
                      ? "Comisión Ejecutiva Nacional"
                      : "Comissió Executiva Nacional"}
                  </h2>
                </div>
                <p className="text-xs text-muted-foreground font-medium">
                  {lang === "es"
                    ? "Haz clic en cada persona para leer su perfil"
                    : "Fes clic en cada persona per llegir el seu perfil"}
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
              {members.map((m, i) => (
                <Reveal key={m.name} delay={(i % 4) * 50}>
                  <MemberTile
                    member={m}
                    isActive={activeName === m.name}
                    onToggle={() => toggle(m.name)}
                    photo={PHOTOS[m.name]}
                    lang={lang}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
