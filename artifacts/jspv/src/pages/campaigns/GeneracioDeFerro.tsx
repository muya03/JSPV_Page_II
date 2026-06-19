import { Layout } from "@/components/layout/Layout";
import { useSEO } from "@/lib/seo";
import { useT } from "@/i18n/context";
import { Reveal } from "@/components/Reveal";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import danaImg from "@assets/labores-de-limpieza-y-desescombro-en-paiporta-valencia_dcc1.j_1781879514303.webp";

const ACCENT = "#E8650A";
const NAVY = "#0D1321";
const NAVY2 = "#131C2E";

/* ── Timeline events ────────────────────────────────────────── */
const TIMELINE_CA = [
  {
    time: "29 oct · 19h",
    title: "La DANA arrasa l'Horta Sud",
    body: "En menys de dues hores, l'aigua s'emporta cases, cotxes i vides a Paiporta, Alfafar, Catarroja, Sedaví i dotzenes de pobles. 227 morts. Les institucions, absents.",
    tag: "Catàstrofe",
  },
  {
    time: "30 oct · 06h",
    title: "La joventut es mobilitza sola",
    body: "Abans que cap institució reaccionés, milers de joves s'organitzen per Instagram i Telegram, agafen pales i arriben als pobles afectats a peu o en bici. L'Estat no hi era; nosaltres sí.",
    tag: "Resposta",
  },
  {
    time: "1–15 nov",
    title: "+120.000 voluntaris en dos setmanes",
    body: "L'escala de la resposta voluntària no té precedents a l'Estat espanyol. Joves de tot el País Valencià i de fora s'organitzen en brigades improvisades per netejar fang, repartir menjar i donar suport emocional.",
    tag: "Solidaritat",
  },
  {
    time: "Desembre 2024",
    title: "Les ferides invisibles comencen",
    body: "Amb el fang net, arriben el dol, l'ansietat i la depressió. Un de cada tres voluntaris joves reporta símptomes d'estrès posttraumàtic. Cap institució té un pla específic de salut mental post-DANA per a joves.",
    tag: "Conseqüències",
  },
];

const TIMELINE_ES = [
  {
    time: "29 oct · 19h",
    title: "La DANA arrasa l'Horta Sud",
    body: "En menos de dos horas, el agua se lleva casas, coches y vidas en Paiporta, Alfafar, Catarroja, Sedaví y decenas de pueblos. 227 muertos. Las instituciones, ausentes.",
    tag: "Catástrofe",
  },
  {
    time: "30 oct · 06h",
    title: "La juventud se moviliza sola",
    body: "Antes de que ninguna institución reaccionara, miles de jóvenes se organizan por Instagram y Telegram, cogen palas y llegan a los pueblos afectados a pie o en bici. El Estado no estaba; nosotros sí.",
    tag: "Respuesta",
  },
  {
    time: "1–15 nov",
    title: "+120.000 voluntarios en dos semanas",
    body: "La escala de la respuesta voluntaria no tiene precedentes en el Estado español. Jóvenes de todo el País Valenciano y de fuera se organizan en brigadas improvisadas para limpiar barro, repartir comida y dar apoyo emocional.",
    tag: "Solidaridad",
  },
  {
    time: "Diciembre 2024",
    title: "Las heridas invisibles comienzan",
    body: "Con el barro limpio, llegan el duelo, la ansiedad y la depresión. Uno de cada tres voluntarios jóvenes reporta síntomas de estrés postraumático. Ninguna institución tiene un plan específico de salud mental post-DANA para jóvenes.",
    tag: "Consecuencias",
  },
];

/* ── Demands ─────────────────────────────────────────────────── */
const DEMANDS_CA = [
  {
    num: "01",
    title: "Salut mental post-DANA",
    body: "Programa específic de teràpia gratuïta per a tots els joves voluntaris i afectats de l'Horta Sud. Sense llistes d'espera. Sense cost. Com a dret, no com a caritat.",
    cta: "Exigim atenció psicològica immediata",
  },
  {
    num: "02",
    title: "Estatut del voluntariat d'emergències",
    body: "Els +120.000 joves que van actuar durant la DANA van fer feina que corresponia a l'Estat. Exigim reconeixement legal, assegurança i protecció laboral per a qui participa en emergències.",
    cta: "Exigim protecció legal",
  },
  {
    num: "03",
    title: "Fons de reconstrucció jove",
    body: "Centenars de joves han perdut la seua casa, el seu vehicle o el seu lloc de feina. Exigim ajudes directes i ràpides sense burocràcia paralitzant, gestionades des dels municipis afectats.",
    cta: "Exigim ajudes directes",
  },
];

const DEMANDS_ES = [
  {
    num: "01",
    title: "Salud mental post-DANA",
    body: "Programa específico de terapia gratuita para todos los jóvenes voluntarios y afectados de l'Horta Sud. Sin listas de espera. Sin coste. Como un derecho, no como una caridad.",
    cta: "Exigimos atención psicológica inmediata",
  },
  {
    num: "02",
    title: "Estatuto del voluntariado de emergencias",
    body: "Los +120.000 jóvenes que actuaron durante la DANA hicieron trabajo que correspondía al Estado. Exigimos reconocimiento legal, seguro y protección laboral para quien participa en emergencias.",
    cta: "Exigimos protección legal",
  },
  {
    num: "03",
    title: "Fondo de reconstrucción joven",
    body: "Cientos de jóvenes han perdido su casa, su vehículo o su puesto de trabajo. Exigimos ayudas directas y rápidas sin burocracia paralizante, gestionadas desde los municipios afectados.",
    cta: "Exigimos ayudas directas",
  },
];

export default function GeneracioDeFerro() {
  const { lang } = useT();

  useSEO({
    path: "/campanyes/generacio-de-ferro",
    title: lang === "es" ? "Generación de hierro — JSPV" : "Generació de ferro — JSPV",
    description:
      lang === "es"
        ? "La generación que se llenó de barro el 29-O no olvidará. Salud mental, reconocimiento y reconstrucción."
        : "La generació que es va emplenar de fang el 29-O no oblidarà. Salut mental, reconeixement i reconstrucció.",
  });

  const timeline = lang === "es" ? TIMELINE_ES : TIMELINE_CA;
  const demands = lang === "es" ? DEMANDS_ES : DEMANDS_CA;

  return (
    <Layout crumbs={[
      { label: lang === "es" ? "Campañas" : "Campanyes", href: "/campanyes" },
      { label: lang === "es" ? "Generación de hierro" : "Generació de ferro" },
    ]}>

      {/* ── HERO: full-viewport split ─────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col" style={{ backgroundColor: NAVY }}>
        {/* Photo fills right half on desktop, whole background on mobile */}
        <div className="absolute inset-0 lg:left-[48%]">
          <img
            src={danaImg}
            alt={lang === "es" ? "Labores de limpieza en Paiporta tras la DANA" : "Labors de neteja a Paiporta després de la DANA"}
            className="w-full h-full object-cover"
          />
          {/* gradient: on mobile covers everything; on desktop just left edge of photo */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, #0D1321 0%, #0D1321 10%, rgba(13,19,33,0.82) 40%, rgba(13,19,33,0.3) 75%, rgba(13,19,33,0.15) 100%)",
            }}
          />
          {/* bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-40"
            style={{ background: `linear-gradient(to top, ${NAVY}, transparent)` }}
          />
        </div>

        {/* Left content */}
        <div className="relative flex-1 flex flex-col justify-center container-page py-24 lg:py-32 max-w-3xl">
          <Link
            href="/campanyes"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-xs font-bold uppercase tracking-[0.18em] mb-12 transition-colors"
          >
            <ArrowLeft size={14} />
            {lang === "es" ? "Todas las campañas" : "Totes les campanyes"}
          </Link>

          {/* Date badge */}
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="text-xs font-extrabold uppercase tracking-[0.2em] px-3 py-1.5"
                style={{ backgroundColor: ACCENT, color: "#fff" }}
              >
                29-O · {lang === "es" ? "País Valenciano" : "País Valencià"}
              </div>
            </div>

            <h1 className="font-display font-extrabold leading-[0.95] text-white mb-6"
              style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)" }}
            >
              <span style={{ color: ACCENT }}>
                {lang === "es" ? "Generación" : "Generació"}
              </span>
              <br />
              {lang === "es" ? "de hierro" : "de ferro"}
            </h1>

            <p className="text-white/55 text-lg md:text-xl max-w-md leading-relaxed mb-10">
              {lang === "es"
                ? "Cuando el Estado falló, la juventud valenciana puso el cuerpo. 227 muertos. 120.000 voluntarios. Y ni un plan de salud mental."
                : "Quan l'Estat va fallar, la joventut valenciana va posar el cos. 227 morts. 120.000 voluntaris. I ni un pla de salut mental."}
            </p>
          </Reveal>

          {/* Inline stats row */}
          <Reveal delay={80}>
            <div className="flex flex-wrap gap-8 border-t border-white/10 pt-8">
              {[
                { n: "227", l: lang === "es" ? "víctimas mortales" : "víctimes mortals" },
                { n: "+120.000", l: lang === "es" ? "voluntarios jóvenes" : "voluntaris joves" },
                { n: "1 de 3", l: lang === "es" ? "con estrés postraumático" : "amb estrès posttraumàtic" },
              ].map(({ n, l }) => (
                <div key={n}>
                  <p className="font-display font-extrabold text-2xl md:text-3xl" style={{ color: ACCENT }}>{n}</p>
                  <p className="text-white/40 text-xs font-semibold mt-0.5 max-w-[10rem] leading-snug">{l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <div className="relative flex justify-center pb-8 text-white/25">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              {lang === "es" ? "Leer más" : "Llegir més"}
            </span>
            <div className="w-px h-8 bg-white/20" />
          </div>
        </div>
      </section>

      {/* ── TIMELINE: el 29-O ─────────────────────────────────────── */}
      <section style={{ backgroundColor: NAVY2 }}>
        <div className="container-page py-16 md:py-24">
          <Reveal className="mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: ACCENT }}>
              {lang === "es" ? "Lo que pasó" : "El que va passar"}
            </p>
            <h2 className="font-display font-extrabold text-white text-3xl md:text-4xl max-w-lg leading-tight">
              {lang === "es"
                ? "Del barro a la exigencia"
                : "Del fang a l'exigència"}
            </h2>
          </Reveal>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-[7.5rem] top-0 bottom-0 w-px hidden md:block"
              style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
            />

            <div className="flex flex-col gap-0">
              {timeline.map((ev, i) => (
                <Reveal key={i} delay={i * 70}>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-0 py-8 border-b border-white/5 last:border-0">
                    {/* Time + tag */}
                    <div className="md:w-48 md:pr-8 flex-shrink-0">
                      <p
                        className="font-display font-extrabold text-sm leading-tight mb-1"
                        style={{ color: ACCENT }}
                      >
                        {ev.time}
                      </p>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 border border-white/10 px-2 py-0.5">
                        {ev.tag}
                      </span>
                    </div>

                    {/* Dot */}
                    <div className="hidden md:flex items-start justify-center w-6 flex-shrink-0 pt-1">
                      <div
                        className="w-2.5 h-2.5 rounded-full border-2 flex-shrink-0"
                        style={{ borderColor: ACCENT, backgroundColor: NAVY2 }}
                      />
                    </div>

                    {/* Content */}
                    <div className="md:pl-8 flex-1">
                      <h3 className="font-display font-extrabold text-white text-lg md:text-xl mb-2 leading-snug">
                        {ev.title}
                      </h3>
                      <p className="text-white/45 text-sm leading-relaxed max-w-xl">
                        {ev.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: NAVY }}>
        <div
          className="absolute inset-0 opacity-[0.04] select-none pointer-events-none overflow-hidden"
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-display, serif)",
            fontWeight: 900,
            fontSize: "clamp(12rem, 25vw, 22rem)",
            lineHeight: 1,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          29-O
        </div>
        <div className="relative container-page py-20 md:py-28 max-w-3xl mx-auto text-center">
          <Reveal>
            <div
              className="inline-block w-12 h-1 mb-10 mx-auto"
              style={{ backgroundColor: ACCENT }}
            />
            <blockquote className="font-display font-extrabold text-white text-2xl md:text-3xl lg:text-4xl leading-snug mb-8">
              {lang === "es"
                ? "«Pusimos el cuerpo cuando el Estado no estaba. Ahora el Estado tiene que estar cuando nosotros lo necesitamos.»"
                : "«Vam posar el cos quan l'Estat no hi era. Ara l'Estat ha d'estar quan nosaltres el necessitem.»"}
            </blockquote>
            <p className="text-white/30 text-xs uppercase tracking-[0.2em] font-bold">
              — {lang === "es" ? "Manifest Generació de Ferro, JSPV 2026" : "Manifest Generació de Ferro, JSPV 2026"}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── THREE DEMANDS ─────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#F5F4F2" }}>
        <div className="container-page py-16 md:py-24">
          <Reveal className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: ACCENT }}>
              {lang === "es" ? "Nuestras exigencias" : "Les nostres exigències"}
            </p>
            <h2 className="font-display font-extrabold text-[#1A1A1A] text-3xl md:text-4xl max-w-lg leading-tight">
              {lang === "es"
                ? "Tres demandas concretas. Ahora."
                : "Tres demandes concretes. Ara."}
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#E0DEDA]">
            {demands.map((d, i) => (
              <Reveal key={d.num} delay={i * 80}>
                <div className="bg-[#F5F4F2] p-8 md:p-10 flex flex-col h-full">
                  <span
                    className="font-display font-extrabold text-5xl md:text-6xl leading-none mb-6 block"
                    style={{ color: ACCENT, opacity: 0.25 }}
                  >
                    {d.num}
                  </span>
                  <h3 className="font-display font-extrabold text-[#1A1A1A] text-xl md:text-2xl leading-tight mb-4">
                    {d.title}
                  </h3>
                  <p className="text-[#1A1A1A]/55 text-sm leading-relaxed flex-1 mb-8">
                    {d.body}
                  </p>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
                    → {d.cta}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO FULL-BLEED + DATA ────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[50vh] flex items-center">
        <img
          src={danaImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${NAVY}F0 0%, ${NAVY}CC 50%, ${NAVY}55 100%)` }}
        />
        <div className="relative container-page py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: ACCENT }}>
              {lang === "es" ? "La magnitud" : "La magnitud"}
            </p>
            <h2 className="font-display font-extrabold text-white text-3xl md:text-4xl leading-tight">
              {lang === "es"
                ? "L'Horta Sud no puede esperar más"
                : "L'Horta Sud no pot esperar més"}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="grid grid-cols-2 gap-6">
              {[
                { n: "78", unit: lang === "es" ? "municipios" : "municipis", detail: lang === "es" ? "afectados por la DANA" : "afectats per la DANA" },
                { n: "227", unit: lang === "es" ? "víctimas" : "víctimes", detail: lang === "es" ? "confirmadas" : "confirmades" },
                { n: "120.000+", unit: lang === "es" ? "voluntarios" : "voluntaris", detail: lang === "es" ? "en las primeras 2 semanas" : "en les primeres 2 setmanes" },
                { n: "0", unit: lang === "es" ? "planes" : "plans", detail: lang === "es" ? "de salud mental específicos para jóvenes" : "de salut mental específics per a joves" },
              ].map(({ n, unit, detail }) => (
                <div key={n + unit} className="text-white">
                  <p className="font-display font-extrabold text-3xl md:text-4xl" style={{ color: ACCENT }}>{n}</p>
                  <p className="font-display font-bold text-sm text-white leading-snug">{unit}</p>
                  <p className="text-white/40 text-xs mt-1 leading-tight">{detail}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: NAVY }}>
        <div className="container-page py-20 md:py-24">
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: ACCENT }}>
                {lang === "es" ? "Actúa" : "Actua"}
              </p>
              <h2 className="font-display font-extrabold text-white text-3xl md:text-4xl leading-tight mb-4">
                {lang === "es"
                  ? "La generación de hierro necesita tu voz"
                  : "La generació de ferro necessita la teua veu"}
              </h2>
              <p className="text-white/45 mb-10 max-w-md leading-relaxed">
                {lang === "es"
                  ? "No pedimos más sacrificio. Pedimos que las instituciones hagan su trabajo. Únete a JSPV y suma tu voz a la campaña."
                  : "No demanem més sacrifici. Demanem que les institucions facen la seua feina. Uneix-te a JSPV i suma la teua veu a la campanya."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/afiliat"
                  className="inline-flex items-center justify-center gap-2 text-white font-bold px-8 py-4 text-sm uppercase tracking-wider transition-opacity hover:opacity-90"
                  style={{ backgroundColor: ACCENT }}
                >
                  {lang === "es" ? "Afíliate" : "Afilia't"}
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/campanyes"
                  className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 text-sm uppercase tracking-wider border border-white/20 text-white/60 hover:text-white hover:border-white/50 transition-colors"
                >
                  {lang === "es" ? "Ver otras campañas" : "Veure altres campanyes"}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
