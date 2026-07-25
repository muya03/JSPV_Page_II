import { useState, useCallback } from "react";
import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { useSEO } from "@/lib/seo";
import { EXECUTIVE_FULL, EXECUTIVE_PROFILES, type ExecutiveMember, type ExecutiveProfile } from "@/data/content";
import { useT } from "@/i18n/context";
import heroBg from "@assets/6e828fcbfebe4e0645c4602230b2dc6d_1781816545714.jpg";
import photoItziar from "@assets/itziar-lafita_xl_1782063504964.jpg";
import photoMohamed from "@assets/mohamed-al-howaidi.jpg";
import ph_abel_ortega from "@assets/team/abel-ortega.jpg";
import ph_adrian_campos from "@assets/team/adrian-campos.jpg";
import ph_alejandro_bernabeu from "@assets/team/alejandro-bernabeu.jpg";
import ph_alejandro_ruiz from "@assets/team/alejandro-ruiz.jpg";
import ph_andrea_cantos from "@assets/team/andrea-cantos.jpg";
import ph_ariadna_lopez from "@assets/team/ariadna-lopez.jpg";
import ph_carmen_deltell from "@assets/team/carmen-deltell.jpg";
import ph_carmen_marqueno from "@assets/team/carmen-marqueno.jpg";
import ph_carolina_lucena from "@assets/team/carolina-lucena.jpg";
import ph_claudia_garcia from "@assets/team/claudia-garcia.jpg";
import ph_francisco_hidalgo from "@assets/team/francisco-hidalgo.jpg";
import ph_hector_giner from "@assets/team/hector-giner.jpg";
import ph_irene_martinez from "@assets/team/irene-martinez.jpg";
import ph_ivan_lopez from "@assets/team/ivan-lopez.jpg";
import ph_jose_luis_bravo from "@assets/team/jose-luis-bravo.jpg";
import ph_leire_juan from "@assets/team/leire-juan.jpg";
import ph_marc_tormo from "@assets/team/marc-tormo.jpg";
import ph_marcos_dura from "@assets/team/marcos-dura.jpg";
import ph_maria_arastey from "@assets/team/maria-arastey.jpg";
import ph_maria_marquez from "@assets/team/maria-marquez.jpg";
import ph_pau_resurreccion from "@assets/team/pau-resurreccion.jpg";
import ph_pedro_sabate from "@assets/team/pedro-sabate.jpg";
import ph_tarek_berrakkad from "@assets/team/tarek-berrakkad.jpg";

const PHOTOS: Record<string, string> = {
  "Itziar Lafita Balaguer": photoItziar,
  "Mohamed Al Howaidi Nasralla": photoMohamed,
  "Abel Ortega Gastaldo": ph_abel_ortega,
  "Adrián Campos Campillo": ph_adrian_campos,
  "Alejandro Ruiz Cortés": ph_alejandro_ruiz,
  "Andrea Cantos Martínez": ph_andrea_cantos,
  "Ariadna López Martínez": ph_ariadna_lopez,
  "Carolina Lucena García": ph_carolina_lucena,
  "Claudia Garcia Llopis": ph_claudia_garcia,
  "Francisco José Hidalgo Vidal": ph_francisco_hidalgo,
  "Héctor Giner González": ph_hector_giner,
  "Irene Martínez Romero": ph_irene_martinez,
  "Iván López Sánchez": ph_ivan_lopez,
  "José Alejandro Bernabeu Martínez": ph_alejandro_bernabeu,
  "José Luis Bravo Josemaría": ph_jose_luis_bravo,
  "Leire Juan Checa": ph_leire_juan,
  "M. Carmen Marqueño Moreno": ph_carmen_marqueno,
  "Marc Tormo Varoch": ph_marc_tormo,
  "Marcos Durà Gimeno": ph_marcos_dura,
  "Mari Carmen Deltell": ph_carmen_deltell,
  "Maria Arastey Sanmartín": ph_maria_arastey,
  "María Márquez Bonmatí": ph_maria_marquez,
  "Pau de la Resurrección Pérez": ph_pau_resurreccion,
  "Pedro Sabaté Roca": ph_pedro_sabate,
  "Tarek Berrakkad Lasri": ph_tarek_berrakkad,
};

/** Locally-hosted portrait for a member, or undefined (→ initials fallback). */
function resolvePhoto(name: string): string | undefined {
  return PHOTOS[name];
}

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

const secGen = EXECUTIVE_FULL.find((m) => m.role === "Secretaria General");
const members = EXECUTIVE_FULL.filter((m) => m.role !== "Secretaria General");

// ── Other statutory bodies — simple name lists (role + name, no photos) ───────

interface BodyMember {
  ca: string;
  es: string;
  name: string;
}

interface GovernanceBody {
  ca: string;
  es: string;
  members: BodyMember[];
}

const GOVERNANCE_BODIES: GovernanceBody[] = [
  {
    ca: "Comissió de Garanties Estatutàries i Revisió de Comptes",
    es: "Comisión de Garantías Estatutarias y Revisión de Cuentas",
    members: [
      { ca: "Presidència", es: "Presidencia", name: "Andrea Martínez Villena" },
      { ca: "Vicepresidència primera", es: "Vicepresidencia primera", name: "Claudia Cabrero Ronda" },
      { ca: "Secretaria primera", es: "Secretaría primera", name: "Diego García Vizcaíno" },
      { ca: "Secretaria segona", es: "Secretaría segunda", name: "Jordi Benavent Piera" },
      { ca: "Vocal", es: "Vocal", name: "Manuel Verdú Henares" },
    ],
  },
  {
    ca: "Mesa del Comité Nacional",
    es: "Mesa del Comité Nacional",
    members: [
      { ca: "Presidència", es: "Presidencia", name: "Pablo Peris Gandia" },
      { ca: "Vicepresidència primera", es: "Vicepresidencia primera", name: "Celia Salvador Macián" },
      { ca: "Vicepresidència segona", es: "Vicepresidencia segunda", name: "Vera Muñoz Mojica" },
      { ca: "Secretaria primera", es: "Secretaría primera", name: "Sergi Romaguera" },
      { ca: "Secretaria segona", es: "Secretaría segunda", name: "Rubén Olmos Pérez" },
    ],
  },
];

// ── Secretary General — featured block ───────────────────────────────────────

function SecGenFeature({
  member,
  lang,
  photo,
  profile,
}: {
  member: ExecutiveMember;
  lang: string;
  photo?: string;
  profile?: ExecutiveProfile;
}) {
  const isEs = lang === "es";
  const [imgError, setImgError] = useState(false);
  return (
    <Reveal>
      <div className="relative bg-white rounded-3xl shadow-[0_20px_60px_-20px_rgba(227,6,19,0.35)] overflow-hidden grid md:grid-cols-[360px_1fr]">
        {/* Left — red panel with oversized avatar */}
        <div className="relative bg-primary text-white flex flex-col items-center justify-center py-12 px-8 overflow-hidden">
          {/* Decorative oversized star watermark */}
          <span
            className="pointer-events-none absolute -right-8 -bottom-10 font-display font-extrabold text-[11rem] leading-none text-white/10 select-none"
            aria-hidden="true"
          >
            ★
          </span>

          <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full bg-white text-primary flex items-center justify-center font-display font-extrabold text-6xl shadow-xl ring-8 ring-white/20 overflow-hidden">
            {photo && !imgError ? (
              <img
                src={photo}
                alt={member.name}
                className="w-full h-full object-cover object-top"
                onError={() => setImgError(true)}
              />
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

          {profile && (
            <div className="mt-6">
              <blockquote className="border-l-4 border-primary pl-4 italic text-foreground/80 text-base leading-relaxed max-w-2xl">
                «{profile.frase}»
              </blockquote>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[hsl(var(--surface-strong))] text-foreground/70 text-xs font-semibold">
                  {isEs ? "Edad" : "Edat"}: {profile.edad} {isEs ? "años" : "anys"}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[hsl(var(--surface-strong))] text-foreground/70 text-xs font-semibold">
                  Comarca: {profile.comarca}
                </span>
              </div>
            </div>
          )}
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
  profile,
}: {
  member: ExecutiveMember;
  isActive: boolean;
  onToggle: () => void;
  lang: string;
  photo?: string;
  profile?: ExecutiveProfile;
}) {
  const isEs = lang === "es";
  const [imgError, setImgError] = useState(false);
  return (
    <div
      className={`group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer select-none transition-all duration-300 bg-white ${
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
      <div className="absolute inset-0 flex flex-col">
        {/* Photo — fills top ~75% */}
        <div className="flex-1 overflow-hidden bg-[hsl(var(--surface))]">
          {photo && !imgError ? (
            <img
              src={photo}
              alt={member.name}
              className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center font-display font-extrabold text-4xl text-white transition-colors duration-300 bg-[#1A1A1A] group-hover:bg-primary`}>
              {initials(member.name)}
            </div>
          )}
        </div>

        {/* Name strip — fixed bottom */}
        <div className="shrink-0 bg-white px-4 py-3 border-t border-border">
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-primary leading-tight mb-0.5 line-clamp-1">
            {member.role}
          </p>
          <p className="font-display font-bold text-sm text-foreground leading-snug line-clamp-1">
            {member.name}
          </p>
        </div>

        {/* Corner plus indicator */}
        <span
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/80 text-foreground flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white"
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

        {profile ? (
          <>
            <blockquote className="text-[11px] leading-relaxed text-white/95 italic overflow-y-auto pr-1 flex-1 min-h-0">
              «{profile.frase}»
            </blockquote>
            <div className="shrink-0 mt-2.5 pt-2.5 border-t border-white/20 space-y-1">
              <p className="text-[10px] leading-tight text-white/90">
                <span className="uppercase tracking-[0.12em] text-white/60">{isEs ? "Edad" : "Edat"}</span>{" "}
                {profile.edad} {isEs ? "años" : "anys"}
              </p>
              <p className="text-[10px] leading-tight text-white/90">
                <span className="uppercase tracking-[0.12em] text-white/60">Comarca</span>{" "}
                {profile.comarca}
              </p>
            </div>
          </>
        ) : (
          <p className="text-[11px] leading-relaxed text-white/90 overflow-y-auto pr-1 flex-1 min-h-0">
            {member.bio}
          </p>
        )}
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
          {secGen && (
            <SecGenFeature
              member={secGen}
              lang={lang}
              photo={resolvePhoto(secGen.name)}
              profile={EXECUTIVE_PROFILES[secGen.name]}
            />
          )}

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

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {members.map((m, i) => (
                <Reveal key={m.name} delay={(i % 3) * 50}>
                  <MemberTile
                    member={m}
                    isActive={activeName === m.name}
                    onToggle={() => toggle(m.name)}
                    photo={resolvePhoto(m.name)}
                    profile={EXECUTIVE_PROFILES[m.name]}
                    lang={lang}
                  />
                </Reveal>
              ))}
            </div>
          </div>

          {/* Other statutory bodies — simple name lists */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-7">
                <span className="block w-1 h-6 bg-primary shrink-0" aria-hidden="true" />
                <h2 className="font-display font-extrabold text-lg text-foreground">
                  {lang === "es" ? "Otros órganos" : "Altres òrgans"}
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {GOVERNANCE_BODIES.map((body, bi) => (
                <Reveal key={body.ca} delay={bi * 70}>
                  <div className="h-full bg-white border border-border rounded-xl overflow-hidden">
                    <div className="bg-[hsl(var(--surface))] px-6 py-4 border-b border-border flex items-start gap-3">
                      <span className="shrink-0 mt-1 block w-1.5 h-6 bg-primary rounded-full" aria-hidden="true" />
                      <h3 className="font-display font-bold text-base md:text-lg text-foreground leading-tight">
                        {lang === "es" ? body.es : body.ca}
                      </h3>
                    </div>
                    <ul className="divide-y divide-border">
                      {body.members.map((m) => (
                        <li key={m.name} className="px-6 py-3.5">
                          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary mb-0.5">
                            {lang === "es" ? m.es : m.ca}
                          </p>
                          <p className="font-display font-semibold text-[15px] text-foreground leading-snug">
                            {m.name}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
