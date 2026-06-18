import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { useSEO } from "@/lib/seo";
import { useT } from "@/i18n/context";
import heroBg from "@assets/7_1781816874615.jpg";

const HISTORY_EXTENDED_CA = [
  "El 15 d'agost de 1903, Tomás Meabe funda les Joventuts Socialistes d'Espanya a Erandio, Bizkaia, amb l'objectiu d'organitzar la joventut obrera entorn dels ideals socialistes i republicans. Des del primer moment, les JSE es convertixen en el braç militant juvenil del moviment obrer espanyol, formant quadres compromesos amb la transformació social i la defensa de la democràcia enfront del caciquisme i la monarquia restauracionista. La secció valenciana naix poc temps després, arrelant-se als centres industrials i universitaris del litoral mediterrani.",
  "Sota el lema «Guerra a la guerra», les Joventuts Socialistes lideren l'oposició al reclutament forçós i les aventures colonials al Marroc, mobilitzant la joventut treballadora a les grans ciutats industrials. El moviment juvenil consolida la seua presència als principals nuclis obreristes i universitaris, convertint-se en una força organitzada capaç de movilitzar generacions senceres en defensa dels seus drets polítics i socials, en un context de crisi de la Restauració i d'efervescència del moviment obrer internacional.",
  "La derrota de la República espanyola en la Guerra Civil (1939) suposa un cop demolidor per al moviment obrer i democràtic. Les Joventuts Socialistes es veuen forçades a la clandestinitat interior i a l'exili exterior. Militants valencians s'exilien a França, Mèxic i l'Argentina, mantenint vives les estructures organitzatives durant dècades. A l'interior, petits nuclis militants treballen a risc de les seues vides, preservant la memòria democràtica i preparant el retorn de la llibertat per al nostre país.",
  "La Transició democràtica obri una nova era per a les Joventuts Socialistes. Al calor de les mobilitzacions universitàries i obreres, l'organització experimenta un creixement espectacular a tot l'Estat. Al País Valencià, la joventut socialista arriba als barris, a les fàbriques i als instituts, articulant una generació sencera compromesa amb la democràcia, l'autonomia i la justícia social. Són anys d'efervescència militant, de recuperació de les llibertats i d'esperança col·lectiva.",
  "El 1988 marca un punt d'inflexió en la historia de l'organització valenciana. L'aprovació dels estatuts propis i el reconeixement de la plena autonomia orgànica suposa la maduresa de Joves Socialistes del País Valencià com a organització plenament valenciana. JSPV vertebra el territori amb federacions provincials a les tres províncies, establix estructures comarcals i es convertix en un actor clau de la política juvenil valenciana, aportant quadres dirigents a les institucions i al PSPV-PSOE.",
  "El XIV Congrés Nacional celebrat a Alcoi (6-7 de juny de 2026) inaugurà una nova etapa per a JSPV. L'elecció de Marcos Durà Gimeno com a Secretari General i la constitució d'una Comissió Executiva Nacional de vint-i-nou membres organitzats en nou àrees estratègiques posen les bases d'un projecte polític centrat en la vertebració territorial comarca a comarca, l'escolta activa de la base militant i l'activisme de govern. Una etapa de reptes i d'oportunitats per a la joventut valenciana.",
];

const HISTORY_EXTENDED_ES = [
  "El 15 de agosto de 1903, Tomás Meabe funda las Juventudes Socialistas de España en Erandio, Bizkaia, con el objetivo de organizar a la juventud obrera en torno a los ideales socialistas y republicanos. Desde el primer momento, las JSE se convierten en el brazo militante juvenil del movimiento obrero español, formando cuadros comprometidos con la transformación social y la defensa de la democracia frente al caciquismo. La sección valenciana nace poco después, echando raíces en los centros industriales y universitarios del litoral mediterráneo.",
  "Bajo el lema «Guerra a la guerra», las Juventudes Socialistas lideran la oposición al reclutamiento forzoso y las aventuras coloniales en Marruecos, movilizando a la juventud trabajadora en las grandes ciudades industriales. El movimiento juvenil consolida su presencia en los principales núcleos obreros y universitarios, convirtiéndose en una fuerza organizada capaz de movilizar generaciones enteras en defensa de sus derechos políticos y sociales.",
  "La derrota de la República española en la Guerra Civil (1939) supone un golpe demoledor para el movimiento obrero y democrático. Las Juventudes Socialistas se ven forzadas a la clandestinidad interior y al exilio exterior. Militantes valencianos se exilian a Francia, México y Argentina, manteniendo vivas las estructuras organizativas durante décadas. En el interior, pequeños núcleos militantes trabajan arriesgando sus vidas, preservando la memoria democrática.",
  "La Transición democrática abre una nueva era para las Juventudes Socialistas. Al calor de las movilizaciones universitarias y obreras, la organización experimenta un crecimiento espectacular. En el País Valenciano, la juventud socialista llega a los barrios, las fábricas y los institutos, articulando una generación entera comprometida con la democracia, la autonomía y la justicia social. Son años de efervescencia militante y de esperanza colectiva.",
  "En 1988, la aprobación de los estatutos propios y el reconocimiento de la plena autonomía orgánica supone la madurez de Joves Socialistes del País Valencià como organización plenamente valenciana. JSPV vertebra el territorio con federaciones provinciales en las tres provincias, establece estructuras comarcales y se convierte en un actor clave de la política juvenil valenciana, aportando cuadros dirigentes a las instituciones y al PSPV-PSOE.",
  "El XIV Congreso Nacional celebrado en Alcoy (6-7 de junio de 2026) inaugura una nueva etapa para JSPV. La elección de Marcos Durà Gimeno como Secretario General y la constitución de una Comisión Ejecutiva Nacional de veintinueve miembros organizados en nueve áreas estratégicas sientan las bases de un proyecto político centrado en la vertebración territorial, la escucha activa y el activismo de gobierno.",
];

export default function Historia() {
  const { t, lang } = useT();
  const extended = lang === "es" ? HISTORY_EXTENDED_ES : HISTORY_EXTENDED_CA;

  useSEO({
    path: "/partit/historia",
    title: t.seo.historia.title,
    description: t.seo.historia.description,
  });

  return (
    <Layout
      crumbs={[
        { label: t.nav.nosaltres, href: "/partit" },
        { label: t.historia.crumb },
      ]}
    >
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section
        className="relative text-white overflow-hidden"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center 40%" }}
      >
        <div className="absolute inset-0 bg-[#1A1A1A]/70" aria-hidden="true" />
        <div className="relative z-10 container-page py-20 md:py-28">
          <Reveal>
            <p className="font-display font-bold text-xs uppercase tracking-[0.22em] text-primary mb-4">
              {t.nav.nosaltres}
            </p>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[1.05] max-w-3xl">
              {t.historia.title}
            </h1>
            <p className="mt-5 text-white/75 text-lg leading-relaxed max-w-2xl">
              {t.historia.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Intro ───────────────────────────────────────────────── */}
      <section className="bg-[hsl(var(--surface))] border-b border-border">
        <div className="container-page py-12 md:py-16">
          <Reveal className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 items-start">
            <div>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-foreground leading-snug">
                {t.historia.introTitle}
              </h2>
              <span className="block w-16 h-1.5 bg-primary mt-5" aria-hidden="true" />
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.historia.introText}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Timeline ────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-page">
          <div className="relative">
            {/* Central vertical line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden lg:block"
              aria-hidden="true"
            />

            <div className="space-y-0">
              {t.data.history.map((item, i) => {
                const isLeft = i % 2 === 0;
                const isCurrent = i === t.data.history.length - 1;

                return (
                  <Reveal key={item.year} delay={i * 60}>
                    <div
                      className={`lg:grid lg:grid-cols-2 lg:gap-16 mb-0 relative ${
                        isLeft ? "" : ""
                      }`}
                    >
                      {/* Left column */}
                      <div
                        className={`${
                          isLeft
                            ? "lg:text-right lg:pr-12"
                            : "lg:col-start-2 lg:pl-12"
                        } pb-12`}
                      >
                        {/* On mobile: always show content */}
                        {/* On desktop: show content on correct side */}
                        <div
                          className={`relative bg-white border ${
                            isCurrent ? "border-primary border-2" : "border-border"
                          } rounded-xl p-7 md:p-8 hover:border-primary/50 transition-colors`}
                        >
                          {isCurrent && (
                            <span className="absolute -top-3 left-6 inline-flex items-center px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-display font-bold uppercase tracking-wide">
                              {lang === "es" ? "Etapa actual" : "Etapa actual"}
                            </span>
                          )}
                          <div
                            className={`flex items-center gap-4 mb-4 ${
                              isLeft ? "lg:justify-end" : ""
                            }`}
                          >
                            <span
                              className={`font-display font-extrabold text-4xl md:text-5xl leading-none ${
                                isCurrent ? "text-primary" : "text-foreground"
                              }`}
                            >
                              {item.year}
                            </span>
                          </div>
                          <h3 className="font-display font-bold text-xl text-foreground mb-3">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                            {item.desc}
                          </p>
                          {extended[i] && (
                            <p className="text-foreground/70 text-sm leading-relaxed border-t border-border pt-4">
                              {extended[i]}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Empty column for the other side (desktop only) */}
                      {isLeft && (
                        <div
                          className="hidden lg:block"
                          aria-hidden="true"
                        />
                      )}
                      {!isLeft && (
                        <div
                          className="hidden lg:block lg:col-start-1 lg:row-start-1"
                          aria-hidden="true"
                        />
                      )}

                      {/* Timeline dot (desktop) */}
                      <div
                        className={`absolute left-1/2 top-8 -translate-x-1/2 hidden lg:block z-10`}
                        aria-hidden="true"
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-4 border-white ${
                            isCurrent ? "bg-primary" : "bg-foreground"
                          }`}
                        />
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="bg-[#1A1A1A] text-white">
        <div className="container-page py-16 md:py-20">
          <Reveal className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl leading-tight">
                {t.historia.ctaTitle}
              </h2>
              <p className="mt-4 text-white/70 text-lg leading-relaxed">
                {t.historia.ctaText}
              </p>
            </div>
            <Link
              href="/afiliat"
              className="inline-flex items-center gap-2 h-13 px-7 py-3.5 rounded-md bg-primary text-primary-foreground font-display font-bold text-base hover:bg-primary/90 transition-colors shrink-0"
            >
              {t.historia.ctaButton} <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
