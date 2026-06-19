import { Layout } from "@/components/layout/Layout";
import { useSEO } from "@/lib/seo";
import { useT } from "@/i18n/context";
import { Reveal } from "@/components/Reveal";
import { Link } from "wouter";
import { ArrowLeft, Home, TrendingUp, Users, MapPin } from "lucide-react";
import habitatgeImg from "@/assets/news/parc-public-habitatge.jpg";

const STATS_CA = [
  { value: "40%", label: "dels ingressos dels joves al lloguer" },
  { value: "28 anys", label: "edat mitjana d'emancipació" },
  { value: "×3", label: "el lloguer s'ha triplicat en 10 anys" },
];
const STATS_ES = [
  { value: "40%", label: "de los ingresos de los jóvenes al alquiler" },
  { value: "28 años", label: "edad media de emancipación" },
  { value: "×3", label: "el alquiler se ha triplicado en 10 años" },
];

const PROPOSALS_CA = [
  {
    num: "01",
    icon: <Home size={28} />,
    title: "Parc públic de lloguer",
    body: "Mobilitzar sòl i immobles públics per construir habitatge de lloguer assequible destinat a la joventut i a qui ho necessita.",
  },
  {
    num: "02",
    icon: <TrendingUp size={28} />,
    title: "Regular els preus",
    body: "Aplicar la contenció de rendes en zones tensionades i perseguir les pràctiques especulatives que expulsen la gent dels seus barris.",
  },
  {
    num: "03",
    icon: <Users size={28} />,
    title: "Ajudes a l'emancipació",
    body: "Ajudes directes per al primer lloguer, bonificacions fiscals i orientació pública per a joves que volen accedir al seu primer habitatge.",
  },
];
const PROPOSALS_ES = [
  {
    num: "01",
    icon: <Home size={28} />,
    title: "Parque público de alquiler",
    body: "Movilizar suelo e inmuebles públicos para construir vivienda de alquiler asequible destinada a la juventud y a quien lo necesita.",
  },
  {
    num: "02",
    icon: <TrendingUp size={28} />,
    title: "Regular los precios",
    body: "Aplicar la contención de rentas en zonas tensionadas y perseguir las prácticas especulativas que expulsan a la gente de sus barrios.",
  },
  {
    num: "03",
    icon: <Users size={28} />,
    title: "Ayudas a la emancipación",
    body: "Ayudas directas para el primer alquiler, bonificaciones fiscales y orientación pública para jóvenes que quieren acceder a su primera vivienda.",
  },
];

export default function Habitatge() {
  const { lang } = useT();

  useSEO({
    path: "/campanyes/habitatge-es-un-dret",
    title: lang === "es" ? "La vivienda es un derecho — JSPV" : "L'habitatge és un dret — JSPV",
    description:
      lang === "es"
        ? "Plan de choque para la emancipación juvenil: parque público de alquiler y regulación de precios."
        : "Pla de xoc per l'emancipació juvenil: parc públic de lloguer i regulació de preus.",
  });

  const stats = lang === "es" ? STATS_ES : STATS_CA;
  const proposals = lang === "es" ? PROPOSALS_ES : PROPOSALS_CA;

  return (
    <Layout crumbs={[
      { label: lang === "es" ? "Campañas" : "Campanyes", href: "/campanyes" },
      { label: lang === "es" ? "La vivienda es un derecho" : "L'habitatge és un dret" },
    ]}>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative bg-[#B22234] text-white overflow-hidden">
        {/* Background photo overlay */}
        <div className="absolute inset-0">
          <img
            src={habitatgeImg}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#B22234]/80 via-[#B22234]/70 to-[#B22234]" />
        </div>

        <div className="relative container-page py-20 md:py-28 lg:py-36">
          {/* Back link */}
          <Link href="/campanyes" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-semibold mb-10 transition-colors">
            <ArrowLeft size={16} />
            {lang === "es" ? "Todas las campañas" : "Totes les campanyes"}
          </Link>

          <Reveal>
            <span className="inline-block bg-white/15 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full px-4 py-1.5 mb-6">
              {lang === "es" ? "Vivienda" : "Habitatge"}
            </span>
            <h1 className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl leading-[1] max-w-3xl">
              {lang === "es" ? (
                <>La vivienda<br /><span style={{ WebkitTextStroke: "2px white", color: "transparent" }}>es un derecho</span></>
              ) : (
                <>L'habitatge<br /><span style={{ WebkitTextStroke: "2px white", color: "transparent" }}>és un dret</span></>
              )}
            </h1>
            <p className="mt-8 text-white/75 text-xl md:text-2xl max-w-xl leading-relaxed">
              {lang === "es"
                ? "La crisis expulsa a nuestra generación. Exigimos soluciones reales, ahora."
                : "La crisi expulsa la nostra generació. Exigim solucions reals, ara."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────── */}
      <section className="bg-[#1A1A1A] text-white">
        <div className="container-page py-10 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:divide-x sm:divide-white/10">
            {stats.map((s) => (
              <Reveal key={s.value} className="sm:px-8 first:pl-0 last:pr-0">
                <p className="font-display font-extrabold text-4xl md:text-5xl text-[#E8231A] mb-2">
                  {s.value}
                </p>
                <p className="text-white/60 text-sm leading-relaxed">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EL PROBLEMA ─────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="container-page py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">
                {lang === "es" ? "El problema" : "El problema"}
              </p>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#1A1A1A] leading-tight mb-6">
                {lang === "es"
                  ? "Una generación empujada fuera de sus ciudades"
                  : "Una generació empentada fora de les seues ciutats"}
              </h2>
              <p className="text-[#1A1A1A]/70 leading-relaxed mb-4">
                {lang === "es"
                  ? "El mercado de la vivienda se ha convertido en el principal obstáculo para la emancipación de la juventud valenciana. Los alquileres se han disparado, los salarios no crecen y el acceso a la propiedad se ha vuelto imposible para quien no hereda un patrimonio."
                  : "El mercat de l'habitatge s'ha convertit en el principal obstacle per a l'emancipació de la joventut valenciana. Els lloguers s'han disparat, els salaris no creixen i l'accés a la propietat s'ha tornat impossible per a qui no hereta un patrimoni."}
              </p>
              <p className="text-[#1A1A1A]/70 leading-relaxed">
                {lang === "es"
                  ? "Mientras los fondos de inversión acumulan pisos vacíos, miles de jóvenes se ven obligados a compartir piso a los 30 años o a alejarse de sus familias y trabajos. Esto no es inevitable: es una consecuencia de decisiones políticas que podemos cambiar."
                  : "Mentre els fons d'inversió acumulen pisos buits, milers de joves es veuen obligats a compartir pis als 30 anys o a allunyar-se de les seues famílies i treballs. Això no és inevitable: és una conseqüència de decisions polítiques que podem canviar."}
              </p>
            </Reveal>

            {/* Visual block */}
            <Reveal delay={80}>
              <div className="relative">
                <img
                  src={habitatgeImg}
                  alt={lang === "es" ? "Bloques de vivienda residencial" : "Blocs d'habitatge residencial"}
                  className="w-full rounded-2xl object-cover aspect-[4/3]"
                />
                <div className="absolute -bottom-5 -left-5 bg-[#B22234] text-white rounded-xl px-6 py-4 shadow-xl">
                  <MapPin size={18} className="mb-1 opacity-70" />
                  <p className="font-display font-bold text-sm">
                    {lang === "es" ? "País Valenciano" : "País Valencià"}
                  </p>
                  <p className="text-white/70 text-xs">
                    {lang === "es" ? "Crisis de vivienda, 2026" : "Crisi d'habitatge, 2026"}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PROPOSALS ────────────────────────────────────────────── */}
      <section className="bg-[#F7F7F7]">
        <div className="container-page py-16 md:py-24">
          <Reveal className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">
              {lang === "es" ? "Nuestras propuestas" : "Les nostres propostes"}
            </p>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#1A1A1A] max-w-xl leading-tight">
              {lang === "es"
                ? "Tres medidas concretas para un cambio real"
                : "Tres mesures concretes per a un canvi real"}
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {proposals.map((p, i) => (
              <Reveal key={p.num} delay={i * 80}>
                <div className="bg-white rounded-2xl p-8 border-t-4 border-[#B22234] h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-[#B22234]">{p.icon}</span>
                    <span className="font-display font-extrabold text-5xl text-[#F0F0F0] leading-none select-none">
                      {p.num}
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-[#1A1A1A] mb-3">
                    {p.title}
                  </h3>
                  <p className="text-[#1A1A1A]/60 text-sm leading-relaxed flex-1">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ───────────────────────────────────────────── */}
      <section className="bg-[#B22234] text-white">
        <div className="container-page py-16 md:py-20 text-center">
          <Reveal>
            <blockquote className="font-display font-extrabold text-2xl md:text-4xl leading-tight max-w-3xl mx-auto">
              «{lang === "es"
                ? "La vivienda es un derecho reconocido, no un activo financiero. Nuestra generación no puede aceptar que la independencia vital dependa del código postal donde naces."
                : "L'habitatge és un dret reconegut, no un actiu financer. La nostra generació no pot acceptar que la independència vital depenga del codi postal on naixes."}»
            </blockquote>
            <p className="mt-6 text-white/60 font-semibold text-sm uppercase tracking-wider">
              — {lang === "es" ? "Marcos Durà Gimeno, Secretario General JSPV" : "Marcos Durà Gimeno, Secretari General JSPV"}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="container-page py-16 md:py-20 text-center">
          <Reveal>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#1A1A1A] mb-4">
              {lang === "es" ? "Súmate a la lucha" : "Uneix-te a la lluita"}
            </h2>
            <p className="text-[#1A1A1A]/60 mb-8 max-w-md mx-auto">
              {lang === "es"
                ? "Juntos podemos cambiar las reglas del mercado de la vivienda. Afíliate a JSPV y forma parte del cambio."
                : "Junts podem canviar les regles del mercat de l'habitatge. Afilia't a JSPV i forma part del canvi."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/afiliat"
                className="inline-flex items-center justify-center gap-2 bg-[#B22234] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#8B1A28] transition-colors"
              >
                {lang === "es" ? "Afíliate" : "Afilia't"}
              </Link>
              <Link
                href="/campanyes"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold px-8 py-3.5 rounded-full hover:bg-[#1A1A1A] hover:text-white transition-colors"
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
