import { Layout } from "@/components/layout/Layout";
import { useSEO } from "@/lib/seo";
import { useT } from "@/i18n/context";
import { Reveal } from "@/components/Reveal";
import { Link } from "wouter";
import { ArrowLeft, Brain, Zap, HandHeart } from "lucide-react";
import danaImg from "@assets/labores-de-limpieza-y-desescombro-en-paiporta-valencia_dcc1.j_1781879514303.webp";

const PILLARS_CA = [
  {
    icon: <Brain size={32} />,
    label: "Salut mental",
    title: "Salut mental accessible per a tothom",
    body: "La DANA va deixar una ferida invisible. Exigim recursos de salut mental gratuïts i accessibles per a tots els joves afectats per l'emergència i per a qualsevol que ho necessita.",
    stat: "1 de cada 3",
    statLabel: "joves ha patit ansietat severa",
  },
  {
    icon: <Zap size={32} />,
    label: "Precarietat",
    title: "Feina digna, futur possible",
    body: "La precarietat laboral no és inevitable. Exigim contractes dignes, salaris adequats i el fi dels falsos autònoms que atrapen la joventut en una vida sense certeses.",
    stat: "42%",
    statLabel: "de joves en situació de precarietat laboral",
  },
  {
    icon: <HandHeart size={32} />,
    label: "Reconeixement",
    title: "Reconeixement del voluntariat",
    body: "Milers de joves van emplenar-se de fang per ajudar sense demanar res a canvi. Exigim que l'Administració reconega legalment el voluntariat d'emergències i en garantisca la protecció.",
    stat: "+12.000",
    statLabel: "joves voluntaris durant la DANA",
  },
];

const PILLARS_ES = [
  {
    icon: <Brain size={32} />,
    label: "Salud mental",
    title: "Salud mental accesible para todos",
    body: "La DANA dejó una herida invisible. Exigimos recursos de salud mental gratuitos y accesibles para todos los jóvenes afectados por la emergencia y para cualquiera que lo necesita.",
    stat: "1 de cada 3",
    statLabel: "jóvenes ha sufrido ansiedad severa",
  },
  {
    icon: <Zap size={32} />,
    label: "Precariedad",
    title: "Trabajo digno, futuro posible",
    body: "La precariedad laboral no es inevitable. Exigimos contratos dignos, salarios adecuados y el fin de los falsos autónomos que atrapan a la juventud en una vida sin certezas.",
    stat: "42%",
    statLabel: "de jóvenes en situación de precariedad laboral",
  },
  {
    icon: <HandHeart size={32} />,
    label: "Reconocimiento",
    title: "Reconocimiento del voluntariado",
    body: "Miles de jóvenes se llenaron de barro para ayudar sin pedir nada a cambio. Exigimos que la Administración reconozca legalmente el voluntariado de emergencias y garantice su protección.",
    stat: "+12.000",
    statLabel: "jóvenes voluntarios durante la DANA",
  },
];

export default function GeneracioDeFerro() {
  const { lang } = useT();

  useSEO({
    path: "/campanyes/generacio-de-ferro",
    title: lang === "es" ? "Generación de hierro — JSPV" : "Generació de ferro — JSPV",
    description:
      lang === "es"
        ? "La generación que se llenó de barro no olvidará. Salud mental, precariedad y reconocimiento del voluntariado."
        : "La generació que es va emplenar de fang no oblidarà. Salut mental, precarietat i reconeixement del voluntariat.",
  });

  const pillars = lang === "es" ? PILLARS_ES : PILLARS_CA;
  const ACCENT = "#E8650A";
  const DARK = "#131A2A";

  return (
    <Layout crumbs={[
      { label: lang === "es" ? "Campañas" : "Campanyes", href: "/campanyes" },
      { label: lang === "es" ? "Generación de hierro" : "Generació de ferro" },
    ]}>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden text-white" style={{ backgroundColor: DARK }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={danaImg}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-25"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${DARK}CC 0%, ${DARK}99 50%, ${DARK}E6 100%)`,
            }}
          />
        </div>

        {/* Orange stripe decoration */}
        <div
          className="absolute top-0 right-0 w-2 h-full"
          style={{ backgroundColor: ACCENT }}
          aria-hidden="true"
        />

        <div className="relative container-page py-20 md:py-28 lg:py-36">
          <Link
            href="/campanyes"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-semibold mb-10 transition-colors"
          >
            <ArrowLeft size={16} />
            {lang === "es" ? "Todas las campañas" : "Totes les campanyes"}
          </Link>

          <Reveal>
            <span
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] rounded-full px-4 py-1.5 mb-6"
              style={{ backgroundColor: ACCENT, color: "#fff" }}
            >
              {lang === "es" ? "Juventud" : "Joventut"}
            </span>
            <h1 className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl leading-[1] max-w-3xl mb-4">
              {lang === "es" ? (
                <>
                  <span style={{ color: ACCENT }}>Generación</span>
                  <br />
                  de hierro
                </>
              ) : (
                <>
                  <span style={{ color: ACCENT }}>Generació</span>
                  <br />
                  de ferro
                </>
              )}
            </h1>
            <p className="mt-6 text-white/65 text-xl md:text-2xl max-w-xl leading-relaxed">
              {lang === "es"
                ? "La generación que se llenó de barro no olvidará. Y no perdonará la indiferencia."
                : "La generació que es va emplenar de fang no oblidarà. I no perdonarà la indiferència."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── WHO WE ARE ───────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#0E1320" }} className="text-white">
        <div className="container-page py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal>
              <p
                className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
                style={{ color: ACCENT }}
              >
                {lang === "es" ? "Quiénes somos" : "Qui som"}
              </p>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl leading-tight mb-6">
                {lang === "es"
                  ? "La juventud que no miró hacia otro lado"
                  : "La joventut que no va mirar cap a un altre lloc"}
              </h2>
              <p className="text-white/60 leading-relaxed mb-4">
                {lang === "es"
                  ? "Cuando la DANA arrasó el País Valenciano en noviembre de 2024, mientras las instituciones tardaban en reaccionar, fueron miles de jóvenes quienes pusieron el cuerpo. Se organizaron en redes sociales, cargaron palas, arrimaron el hombro y demostraron que la solidaridad no es una consigna: es una práctica."
                  : "Quan la DANA va arrasar el País Valencià el novembre del 2024, mentre les institucions tardaven a reaccionar, van ser milers de joves qui van posar el cos. Es van organitzar en xarxes socials, van agafar pales, van arremangar i van demostrar que la solidaritat no és un eslògan: és una pràctica."}
              </p>
              <p className="text-white/60 leading-relaxed">
                {lang === "es"
                  ? "A esa generación no se le puede pedir más sacrificio sin darle nada a cambio. \"Generación de hierro\" es la campaña de JSPV para exigir lo que les corresponde: salud mental, trabajo digno y reconocimiento."
                  : "A aquella generació no se li pot demanar més sacrifici sense donar-li res a canvi. «Generació de ferro» és la campanya de JSPV per a exigir allò que els pertoca: salut mental, feina digna i reconeixement."}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div className="relative">
                <img
                  src={danaImg}
                  alt={lang === "es" ? "Jóvenes voluntarios durante la DANA" : "Joves voluntaris durant la DANA"}
                  className="w-full rounded-2xl object-cover aspect-[4/3]"
                />
                <div
                  className="absolute -bottom-4 -right-4 rounded-xl px-5 py-4 shadow-xl"
                  style={{ backgroundColor: ACCENT }}
                >
                  <p className="font-display font-extrabold text-2xl text-white">Nov 2024</p>
                  <p className="text-white/80 text-xs font-semibold">
                    {lang === "es" ? "La DANA · País Valenciano" : "La DANA · País Valencià"}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS ─────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#F4F4F4" }}>
        <div className="container-page py-16 md:py-24">
          <Reveal className="mb-12">
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
              style={{ color: ACCENT }}
            >
              {lang === "es" ? "Nuestras demandas" : "Les nostres demandes"}
            </p>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#1A1A1A] max-w-xl leading-tight">
              {lang === "es"
                ? "Tres exigencias, una sola generación"
                : "Tres exigències, una sola generació"}
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <Reveal key={p.label} delay={i * 90}>
                <div className="bg-white rounded-2xl overflow-hidden h-full flex flex-col">
                  {/* Top accent bar */}
                  <div className="h-1.5" style={{ backgroundColor: ACCENT }} />
                  <div className="p-7 flex flex-col flex-1">
                    <div className="mb-5" style={{ color: ACCENT }}>
                      {p.icon}
                    </div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3"
                      style={{ color: ACCENT }}
                    >
                      {p.label}
                    </span>
                    <h3 className="font-display font-extrabold text-xl text-[#1A1A1A] mb-3 leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-[#1A1A1A]/60 text-sm leading-relaxed flex-1">{p.body}</p>

                    {/* Stat */}
                    <div
                      className="mt-6 pt-5 border-t"
                      style={{ borderColor: "#E8E8E8" }}
                    >
                      <p
                        className="font-display font-extrabold text-3xl"
                        style={{ color: DARK }}
                      >
                        {p.stat}
                      </p>
                      <p className="text-[#1A1A1A]/50 text-xs mt-0.5">{p.statLabel}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ────────────────────────────────────────────── */}
      <section style={{ backgroundColor: DARK }} className="text-white">
        <div className="container-page py-16 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <Reveal>
              <p
                className="text-xs font-bold uppercase tracking-[0.2em] mb-6"
                style={{ color: ACCENT }}
              >
                {lang === "es" ? "Manifiesto" : "Manifest"}
              </p>
              <p className="font-display font-bold text-2xl md:text-3xl leading-relaxed text-white/90 mb-8">
                {lang === "es"
                  ? "«Somos la generación que creció con la crisis, sobrevivió a la pandemia y se llenó de barro cuando nos necesitaban. Ahora exigimos que las instituciones estén a la altura de nuestra generación.»"
                  : "«Som la generació que va créixer amb la crisi, va sobreviure la pandèmia i es va emplenar de fang quan ens necessitaven. Ara exigim que les institucions estiguen a l'alçada de la nostra generació.»"}
              </p>
              <p className="text-white/40 text-sm uppercase tracking-wider font-semibold">
                — {lang === "es" ? "Manifiesto de la Generación de Hierro, JSPV 2026" : "Manifest de la Generació de Ferro, JSPV 2026"}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="container-page py-16 md:py-20 text-center">
          <Reveal>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#1A1A1A] mb-4">
              {lang === "es" ? "Únete a la generación de hierro" : "Uneix-te a la generació de ferro"}
            </h2>
            <p className="text-[#1A1A1A]/60 mb-8 max-w-md mx-auto">
              {lang === "es"
                ? "Si crees que tu generación merece más, JSPV es tu organización."
                : "Si creus que la teua generació mereix més, JSPV és la teua organització."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/afiliat"
                className="inline-flex items-center justify-center gap-2 text-white font-bold px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity"
                style={{ backgroundColor: ACCENT }}
              >
                {lang === "es" ? "Afíliate" : "Afilia't"}
              </Link>
              <Link
                href="/campanyes"
                className="inline-flex items-center justify-center gap-2 font-bold px-8 py-3.5 rounded-full border-2 transition-colors hover:text-white"
                style={{
                  borderColor: DARK,
                  color: DARK,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = DARK;
                  (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color = DARK;
                }}
              >
                {lang === "es" ? "Otras campañas" : "Altres campanyes"}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
