import { Layout } from "@/components/layout/Layout";
import { useSEO } from "@/lib/seo";
import { CAMPAIGNS } from "@/data/content";
import { useT } from "@/i18n/context";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

interface CampaignTheme {
  slug: string;
  bg: string;
  fg: string;
  accent: string;
  hasPage: boolean;
  visual: string;
  sloganLines: string[];
  sloganLinesEs: string[];
}

const THEMES: CampaignTheme[] = [
  {
    slug: "habitatge-es-un-dret",
    bg: "#B22234",
    fg: "#fff",
    accent: "#FFD0D0",
    hasPage: true,
    visual: "🏠",
    sloganLines: ["L'habitatge", "és un dret"],
    sloganLinesEs: ["La vivienda", "es un derecho"],
  },
  {
    slug: "educacio-publica-de-tots",
    bg: "#1A4A8A",
    fg: "#fff",
    accent: "#A8D4FF",
    hasPage: false,
    visual: "📚",
    sloganLines: ["Educació", "pública,", "per a tots"],
    sloganLinesEs: ["Educación", "pública,", "para todos"],
  },
  {
    slug: "generacio-de-ferro",
    bg: "#131A2A",
    fg: "#fff",
    accent: "#E8650A",
    hasPage: true,
    visual: "✊",
    sloganLines: ["Generació", "de ferro"],
    sloganLinesEs: ["Generación", "de hierro"],
  },
  {
    slug: "feminisme-sense-passos-enrere",
    bg: "#5B1E6E",
    fg: "#fff",
    accent: "#F4A7E4",
    hasPage: false,
    visual: "♀",
    sloganLines: ["Feminisme", "sense passos", "enrere"],
    sloganLinesEs: ["Feminismo", "sin pasos", "atrás"],
  },
];

export default function Campanyes() {
  const { t, lang } = useT();

  useSEO({
    path: "/campanyes",
    title: t.seo.campanyes.title,
    description: t.seo.campanyes.description,
  });

  const campaigns = CAMPAIGNS.map((c, i) => ({
    ...c,
    ...t.data.campaigns[i],
    theme: THEMES[i],
  }));

  return (
    <Layout crumbs={[{ label: t.campanyes.crumb }]}>
      {/* ── Page header ──────────────────────────────────────────── */}
      <section className="bg-[#1A1A1A] text-white py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">
              {lang === "es" ? "Campañas" : "Campanyes"}
            </p>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl leading-[1.05] max-w-2xl">
              {lang === "es"
                ? "Nuestras campañas políticas"
                : "Les nostres campanyes polítiques"}
            </h1>
            <p className="mt-6 text-white/60 text-lg max-w-xl leading-relaxed">
              {lang === "es"
                ? "Cada campaña es una apuesta política concreta. Aquí puedes conocer qué defendemos y por qué luchamos."
                : "Cada campanya és una aposta política concreta. Ací pots conèixer què defensem i per què lluitem."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Campaign poster grid ─────────────────────────────────── */}
      <section className="bg-[#F5F5F5] py-10 md:py-14">
        <div className="container-page">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {campaigns.map((c, i) => {
              const theme = c.theme;
              const lines = lang === "es" ? theme.sloganLinesEs : theme.sloganLines;
              const card = (
                <article
                  style={{ backgroundColor: theme.bg, color: theme.fg }}
                  className="relative flex flex-col justify-between rounded-2xl overflow-hidden p-8 md:p-10 min-h-[340px] md:min-h-[400px] group transition-transform duration-300 hover:-translate-y-1"
                >
                  {/* Decorative background circle */}
                  <div
                    className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full opacity-10"
                    style={{ backgroundColor: theme.fg }}
                    aria-hidden="true"
                  />
                  {/* Top row: tag */}
                  <div>
                    <span
                      className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] rounded-full px-3 py-1"
                      style={{ backgroundColor: "rgba(255,255,255,0.18)", color: theme.fg }}
                    >
                      {c.tag}
                    </span>
                  </div>

                  {/* Center: visual emoji */}
                  <div
                    className="text-6xl md:text-7xl select-none my-2"
                    aria-hidden="true"
                    style={{ opacity: 0.18 }}
                  >
                    {theme.visual}
                  </div>

                  {/* Bottom: slogan + CTA */}
                  <div>
                    <h2
                      className="font-display font-extrabold text-3xl md:text-4xl leading-[1.1] mb-6"
                      style={{ color: theme.fg }}
                    >
                      {lines.map((line, li) => (
                        <span key={li} className="block">
                          {li === 0 ? (
                            <span
                              className="relative"
                              style={{
                                borderBottom: `3px solid ${theme.accent}`,
                                paddingBottom: "2px",
                              }}
                            >
                              {line}
                            </span>
                          ) : (
                            line
                          )}
                        </span>
                      ))}
                    </h2>

                    {theme.hasPage ? (
                      <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all duration-200"
                        style={{ color: theme.accent }}>
                        {lang === "es" ? "Ver campaña" : "Veure campanya"}
                        <ArrowRight size={16} />
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm font-semibold opacity-50"
                        style={{ color: theme.fg }}>
                        {lang === "es" ? "Próximamente" : "Pròximament"}
                      </span>
                    )}
                  </div>
                </article>
              );

              return (
                <Reveal key={c.slug} delay={i * 60}>
                  {theme.hasPage ? (
                    <Link href={`/campanyes/${c.slug}`} className="block focus-visible:outline-2 focus-visible:outline-primary rounded-2xl">
                      {card}
                    </Link>
                  ) : (
                    card
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
