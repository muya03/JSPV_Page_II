import { MapPin, Mail } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/SectionHeading";
import { useSEO } from "@/lib/seo";
import { useT } from "@/i18n/context";
import { ValenciaMap } from "@/components/ValenciaMap";

const FEDERACIONS = [
  {
    id: "valencia",
    nom: "Federació Provincial de València",
    nomEs: "Federación Provincial de Valencia",
    codi: "FPV",
    color: "#E30613",
    seccions: [
      { nom: "València capital", comarca: "L'Horta" },
      { nom: "Torrent", comarca: "L'Horta Sud" },
      { nom: "Paterna", comarca: "L'Horta Nord" },
      { nom: "Burjassot", comarca: "L'Horta Nord" },
      { nom: "Gandia", comarca: "La Safor" },
      { nom: "Alzira", comarca: "La Ribera Alta" },
      { nom: "Sagunt", comarca: "El Camp de Morvedre" },
      { nom: "Sueca", comarca: "La Ribera Baixa" },
      { nom: "Ontinyent", comarca: "El Comtat" },
    ],
  },
  {
    id: "alacant",
    nom: "Federació Provincial d'Alacant",
    nomEs: "Federación Provincial de Alicante",
    codi: "FPA",
    color: "#C0182A",
    seccions: [
      { nom: "Alacant capital", comarca: "L'Alacantí" },
      { nom: "Elx", comarca: "El Baix Vinalopó" },
      { nom: "Dénia", comarca: "La Marina Alta" },
      { nom: "Alcoi", comarca: "L'Alcoià" },
      { nom: "Benidorm", comarca: "La Marina Baixa" },
      { nom: "Torrevieja", comarca: "La Vega Baixa" },
      { nom: "Petrer", comarca: "El Vinalopó Mitjà" },
    ],
  },
  {
    id: "castello",
    nom: "Federació Provincial de Castelló",
    nomEs: "Federación Provincial de Castellón",
    codi: "FPC",
    color: "#8B0D18",
    seccions: [
      { nom: "Castelló capital", comarca: "La Plana Alta" },
      { nom: "Vila-real", comarca: "La Plana Baixa" },
      { nom: "Borriana", comarca: "La Plana Baixa" },
      { nom: "Vinaròs", comarca: "El Baix Maestrat" },
      { nom: "Almassora", comarca: "La Plana Alta" },
      { nom: "Benicàssim", comarca: "La Plana Alta" },
    ],
  },
];

export default function OnEstem() {
  const { t, lang } = useT();

  useSEO({
    path: "/on-estem",
    title: t.seo.onEstem.title,
    description: t.seo.onEstem.description,
  });

  return (
    <Layout
      crumbs={[
        { label: t.nav.nosaltres, href: "/partit" },
        { label: t.onEstem.crumb },
      ]}
    >
      <PageHero
        title={t.onEstem.title}
        subtitle={t.onEstem.subtitle}
      />

      {/* ── Stats strip ──────────────────────────────────────── */}
      <section className="bg-[hsl(var(--surface))] border-b border-border">
        <div className="container-page py-10 md:py-14">
          <div className="grid grid-cols-3 gap-8">
            {[
              { num: "3", label: t.onEstem.statFederacions },
              { num: "22+", label: t.onEstem.statSeccions },
              { num: "3", label: t.onEstem.statProvinces },
            ].map((s) => (
              <Reveal key={s.label} className="text-center">
                <p className="font-display font-extrabold text-5xl md:text-6xl text-primary leading-none">
                  {s.num}
                </p>
                <p className="mt-2 text-sm text-muted-foreground font-light">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interactive map ──────────────────────────────────── */}
      <section className="bg-white">
        <div className="container-page py-16 md:py-24">
          <Reveal>
            <div className="mb-10">
              <p className="font-display font-bold text-xs uppercase tracking-[0.2em] text-primary mb-2">
                {lang === "es" ? "Estructura territorial" : "Estructura territorial"}
              </p>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl leading-tight text-foreground">
                {lang === "es"
                  ? "Les nostres federacions i seccions"
                  : "Les nostres federacions i seccions"}
              </h2>
              <p className="mt-3 text-muted-foreground font-light text-base max-w-xl">
                {lang === "es"
                  ? "JSPV s'organitza en tres federacions provincials que coordinen les seccions locals de tota la Comunitat Valenciana."
                  : "JSPV s'organitza en tres federacions provincials que coordinen les seccions locals de tota la Comunitat Valenciana."}
              </p>
            </div>
            <ValenciaMap lang={lang} />
          </Reveal>
        </div>
      </section>

      {/* ── Full directory ───────────────────────────────────── */}
      <section className="bg-[hsl(var(--surface))] border-t border-border">
        <div className="container-page py-14 md:py-20">
          <Reveal>
            <p className="font-display font-bold text-xs uppercase tracking-[0.2em] text-primary mb-6">
              {lang === "es" ? "Directori complet" : "Directori complet"}
            </p>
          </Reveal>
          <div className="space-y-8">
            {FEDERACIONS.map((fed, fi) => (
              <Reveal key={fed.id} delay={fi * 70}>
                <div className="rounded-2xl overflow-hidden border border-border">
                  <div
                    className="px-7 py-5 flex items-center justify-between"
                    style={{ backgroundColor: fed.color }}
                  >
                    <div>
                      <p className="font-display font-bold text-[10px] uppercase tracking-[0.22em] text-white/60 mb-0.5">
                        {fed.codi}
                      </p>
                      <h3 className="font-display font-extrabold text-xl md:text-2xl text-white leading-tight">
                        {lang === "es" ? fed.nomEs : fed.nom}
                      </h3>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="font-display font-extrabold text-3xl text-white/90 leading-none">
                        {fed.seccions.length}
                      </p>
                      <p className="text-xs text-white/60 font-light mt-0.5">
                        {lang === "es" ? "secciones" : "seccions"}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-5">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5">
                      {fed.seccions.map((s) => (
                        <div
                          key={s.nom}
                          className="group bg-[hsl(var(--surface))] rounded-xl border border-border p-3.5 hover:border-primary/40 hover:shadow-sm transition-all"
                        >
                          <div className="flex items-start gap-2">
                            <MapPin size={11} className="shrink-0 mt-0.5 text-primary" aria-hidden="true" />
                            <div>
                              <p className="font-display font-bold text-[13px] text-foreground leading-tight group-hover:text-primary transition-colors">
                                {s.nom}
                              </p>
                              <p className="mt-0.5 text-[10px] text-muted-foreground font-light">
                                {s.comarca}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-[#1A1A1A] text-white">
        <div className="container-page py-14 md:py-16">
          <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="font-display font-bold text-xs uppercase tracking-[0.2em] text-primary mb-3">
                {lang === "es" ? "Organízate" : "Organitza't"}
              </p>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl leading-tight">
                {t.onEstem.ctaTitle}
              </h2>
              <p className="mt-4 text-white/70 text-lg leading-relaxed font-light italic">
                {t.onEstem.ctaDesc}
              </p>
            </div>
            <div className="flex lg:justify-end">
              <a
                href="mailto:organitzacio@jovesocialistes.org"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-md border border-white/25 text-white font-display font-bold text-sm hover:bg-white/10 transition-colors"
              >
                <Mail size={16} aria-hidden="true" />
                {lang === "es" ? "Escríbenos" : "Escriu-nos"}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
