import { Layout } from "@/components/layout/Layout";
import { useSEO } from "@/lib/seo";
import { useT } from "@/i18n/context";
import { Reveal } from "@/components/Reveal";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

/* ─── SVG: Casa amb cadena (l'habitatge com a dret vs. negoci) ─────────────── */
function HouseIllustration() {
  return (
    <svg
      viewBox="0 0 480 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full max-w-[420px] mx-auto drop-shadow-2xl"
    >
      {/* Ground */}
      <rect x="20" y="355" width="440" height="8" rx="4" fill="rgba(255,255,255,0.15)" />

      {/* House body */}
      <rect x="80" y="195" width="320" height="165" fill="white" />

      {/* Roof */}
      <polygon points="55,198 240,55 425,198" fill="white" />
      {/* Roof shadow layer */}
      <polygon points="55,198 240,55 425,198" fill="rgba(0,0,0,0.06)" />

      {/* Chimney */}
      <rect x="310" y="75" width="32" height="75" fill="white" />
      {/* Chimney cap */}
      <rect x="304" y="70" width="44" height="10" fill="rgba(255,255,255,0.85)" rx="2" />

      {/* Window left */}
      <rect x="105" y="220" width="90" height="70" fill="#C0202D" rx="3" />
      <rect x="105" y="220" width="90" height="70" fill="rgba(0,0,0,0.15)" rx="3" />
      <line x1="150" y1="220" x2="150" y2="290" stroke="white" strokeWidth="3" opacity="0.5" />
      <line x1="105" y1="255" x2="195" y2="255" stroke="white" strokeWidth="3" opacity="0.5" />

      {/* Window right */}
      <rect x="285" y="220" width="90" height="70" fill="#C0202D" rx="3" />
      <rect x="285" y="220" width="90" height="70" fill="rgba(0,0,0,0.15)" rx="3" />
      <line x1="330" y1="220" x2="330" y2="290" stroke="white" strokeWidth="3" opacity="0.5" />
      <line x1="285" y1="255" x2="375" y2="255" stroke="white" strokeWidth="3" opacity="0.5" />

      {/* Door */}
      <rect x="193" y="270" width="94" height="88" rx="3" fill="#8B0F1A" />
      {/* Door arch */}
      <path d="M193 273 Q240 245 333 273" fill="#8B0F1A" />
      {/* Door knob */}
      <circle cx="274" cy="318" r="6" fill="rgba(255,255,255,0.6)" />

      {/* ── CHAIN / LOCK (speculation metaphor) ─────────────────── */}
      {/* Chain links crossing the door */}
      <g opacity="0.9">
        {/* Chain diagonal */}
        <line x1="130" y1="340" x2="350" y2="215" stroke="rgba(255,255,255,0.35)" strokeWidth="12" strokeLinecap="round" />
        {/* Chain links */}
        {[
          [148, 328], [175, 308], [203, 288], [232, 268], [261, 248], [290, 228], [319, 210]
        ].map(([cx, cy], i) => (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx="13"
            ry="8"
            stroke="white"
            strokeWidth="3.5"
            fill="none"
            transform={`rotate(-35 ${cx} ${cy})`}
          />
        ))}
      </g>

      {/* Lock body */}
      <rect x="208" y="285" width="64" height="52" rx="8" fill="white" />
      {/* Lock shackle */}
      <path
        d="M222 285 L222 268 Q240 255 258 268 L258 285"
        stroke="white"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
      {/* Lock keyhole */}
      <circle cx="240" cy="307" r="8" fill="#B22234" />
      <rect x="236" y="307" width="8" height="12" rx="2" fill="#B22234" />

      {/* ── PRICE TAG (top right) ──────────────────────────────── */}
      <g transform="translate(345, 60)">
        {/* Tag shape */}
        <rect x="0" y="0" width="105" height="75" rx="10" fill="white" />
        <polygon points="0,30 -14,40 0,50" fill="white" />
        {/* Tag string hole */}
        <circle cx="85" cy="12" r="5" fill="#B22234" />
        {/* Price text */}
        <text x="52" y="34" textAnchor="middle" fill="#B22234" fontSize="20" fontWeight="900" fontFamily="serif">
          1.850€
        </text>
        <text x="52" y="54" textAnchor="middle" fill="#1A1A1A" fontSize="11" fontWeight="700" opacity="0.6">
          /mes · Valencia
        </text>
        {/* Arrow up (rising prices) */}
        <text x="52" y="72" textAnchor="middle" fill="#B22234" fontSize="13" fontWeight="900">
          ↑ +42%
        </text>
      </g>

      {/* Stars / accent dots */}
      <circle cx="62" cy="120" r="5" fill="rgba(255,255,255,0.3)" />
      <circle cx="430" cy="170" r="4" fill="rgba(255,255,255,0.25)" />
      <circle cx="45" cy="280" r="6" fill="rgba(255,255,255,0.2)" />
    </svg>
  );
}

/* ─── Infographic bar ──────────────────────────────────────────────────────── */
function InfographicBar({
  pct,
  label,
  value,
  color = "#B22234",
  delay = 0,
}: {
  pct: number;
  label: string;
  value: string;
  color?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="w-full">
      <div className="flex items-baseline gap-4 mb-2">
        <span className="font-display font-extrabold text-4xl md:text-5xl" style={{ color }}>
          {value}
        </span>
        <span className="text-[#1A1A1A]/60 text-sm leading-snug max-w-xs">{label}</span>
      </div>
      <div className="w-full h-3 rounded-full bg-[#E8E8E8] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </Reveal>
  );
}

/* ─── Fact card ────────────────────────────────────────────────────────────── */
function FactCard({
  emoji,
  heading,
  body,
  delay,
}: {
  emoji: string;
  heading: string;
  body: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="flex gap-5 items-start">
        <span className="text-4xl shrink-0 leading-none mt-1" aria-hidden="true">
          {emoji}
        </span>
        <div>
          <p className="font-display font-extrabold text-xl text-[#1A1A1A] leading-snug mb-1">
            {heading}
          </p>
          <p className="text-[#1A1A1A]/60 text-sm leading-relaxed">{body}</p>
        </div>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */

export default function Habitatge() {
  const { lang } = useT();

  useSEO({
    path: "/campanyes/habitatge-es-un-dret",
    title:
      lang === "es" ? "La vivienda es un derecho — JSPV" : "L'habitatge és un dret — JSPV",
    description:
      lang === "es"
        ? "Plan de choque para la emancipación juvenil: parque público de alquiler y regulación de precios."
        : "Pla de xoc per l'emancipació juvenil: parc públic de lloguer i regulació de preus.",
  });

  const isEs = lang === "es";

  return (
    <Layout
      crumbs={[
        { label: isEs ? "Campañas" : "Campanyes", href: "/campanyes" },
        { label: isEs ? "La vivienda es un derecho" : "L'habitatge és un dret" },
      ]}
    >
      {/* ══ HERO: fons vermell pur + il·lustració SVG ═══════════════════════ */}
      <section
        className="relative overflow-hidden min-h-screen flex flex-col"
        style={{ backgroundColor: "#C0202D" }}
      >
        {/* Top bar */}
        <div className="container-page pt-8">
          <Link
            href="/campanyes"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-semibold transition-colors"
          >
            <ArrowLeft size={15} />
            {isEs ? "Todas las campañas" : "Totes les campanyes"}
          </Link>
        </div>

        {/* Main hero content */}
        <div className="container-page flex-1 flex flex-col lg:flex-row items-center justify-between gap-8 py-12 lg:py-16">
          {/* Left: text */}
          <div className="flex-1 text-white max-w-xl">
            <Reveal>
              <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] rounded-full px-3 py-1 mb-6 border border-white/30 text-white/70">
                {isEs ? "Campaña · Vivienda" : "Campanya · Habitatge"}
              </span>

              <h1
                className="font-display font-extrabold leading-[0.92] uppercase mb-8"
                style={{ fontSize: "clamp(3.2rem, 8vw, 6.5rem)" }}
              >
                {isEs ? (
                  <>
                    La<br />
                    <span
                      className="inline-block px-3 -mx-1"
                      style={{ backgroundColor: "white", color: "#C0202D" }}
                    >
                      vivienda
                    </span>
                    <br />
                    es un<br />
                    derecho
                  </>
                ) : (
                  <>
                    L'habi-<br />
                    <span
                      className="inline-block px-3 -mx-1"
                      style={{ backgroundColor: "white", color: "#C0202D" }}
                    >
                      tatge
                    </span>
                    <br />
                    és un<br />
                    dret
                  </>
                )}
              </h1>

              <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-md">
                {isEs
                  ? "La especulación inmobiliaria expulsa a la juventud. No lo aceptamos."
                  : "L'especulació immobiliària expulsa la joventut. No ho acceptem."}
              </p>
            </Reveal>
          </div>

          {/* Right: SVG illustration */}
          <Reveal delay={100} className="flex-1 w-full max-w-md lg:max-w-lg">
            <HouseIllustration />
          </Reveal>
        </div>

        {/* Scroll hint */}
        <div className="container-page pb-8 flex justify-center">
          <div className="flex flex-col items-center gap-2 text-white/40">
            <div className="w-px h-10 bg-white/20 animate-pulse" />
            <span className="text-xs uppercase tracking-widest">scroll</span>
          </div>
        </div>

        {/* Big decorative text background */}
        <div
          className="absolute inset-y-0 right-0 flex items-center overflow-hidden pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="font-display font-extrabold uppercase leading-none opacity-[0.04]"
            style={{ fontSize: "22vw", color: "white" }}
          >
            DRET
          </span>
        </div>
      </section>

      {/* ══ XIFRES: infografia de barres ════════════════════════════════════ */}
      <section style={{ backgroundColor: "#1A1A1A" }} className="text-white">
        <div className="container-page py-14 md:py-20">
          <Reveal className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#E8231A" }}>
              {isEs ? "La crisis en datos" : "La crisi en xifres"}
            </p>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white max-w-xl leading-tight">
              {isEs
                ? "La vivienda se ha convertido en un lujo"
                : "L'habitatge s'ha convertit en un luxe"}
            </h2>
          </Reveal>

          <div className="space-y-8">
            <InfographicBar
              pct={40}
              value="40%"
              label={isEs ? "de los ingresos de los jóvenes se van al pago del alquiler" : "dels ingressos dels joves se'n van al pagament del lloguer"}
              color="#E8231A"
              delay={0}
            />
            <InfographicBar
              pct={56}
              value="28 anys"
              label={isEs ? "edat mitjana d'emancipació, la més alta de la UE" : "edat mitjana d'emancipació, la més alta de la UE"}
              color="#FF6B5B"
              delay={80}
            />
            <InfographicBar
              pct={100}
              value="×3"
              label={isEs ? "el alquiler se ha triplicado en 10 años, mientras el salario creció solo un 20%" : "el lloguer s'ha triplicat en 10 anys, mentre el salari va créixer un 20%"}
              color="#FF9B8A"
              delay={160}
            />
          </div>
        </div>
      </section>

      {/* ══ EL PROBLEMA: visual fact cards ═════════════════════════════════ */}
      <section style={{ backgroundColor: "#F9F4F0" }}>
        <div className="container-page py-14 md:py-20">
          <Reveal className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
              {isEs ? "¿Qué está pasando?" : "Què està passant?"}
            </p>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-[#1A1A1A] max-w-xl leading-tight">
              {isEs
                ? "Tres razones por las que la juventud no puede independizarse"
                : "Tres raons per les quals la joventut no pot emancipar-se"}
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FactCard
              emoji="📈"
              heading={isEs ? "Alquileres disparados" : "Lloguers per les núvols"}
              body={isEs
                ? "En Valencia capital, el alquiler medio ha pasado de 650€ a más de 1.200€ en una década. Los salarios no han seguido el ritmo."
                : "A la capital valenciana, el lloguer mitjà ha passat de 650€ a més de 1.200€ en una dècada. Els salaris no han seguit el ritme."}
              delay={0}
            />
            <FactCard
              emoji="🏦"
              heading={isEs ? "Fondos buitre en nuestros barrios" : "Fons voltor als nostres barris"}
              body={isEs
                ? "Grandes fondos de inversión compran edificios enteros para alquilarlos a precios abusivos. Especulan con la necesidad más básica."
                : "Grans fons d'inversió compren edificis sencers per a llogar-los a preus abusius. Especulen amb la necessitat més bàsica."}
              delay={80}
            />
            <FactCard
              emoji="🔑"
              heading={isEs ? "Propiedad: sueño imposible" : "Propietat: somni impossible"}
              body={isEs
                ? "El precio de la vivienda nueva está 7 veces por encima del salario medio anual de un joven valenciano."
                : "El preu de l'habitatge nou és 7 vegades per damunt del salari anual mitjà d'un jove valencià."}
              delay={160}
            />
          </div>
        </div>
      </section>

      {/* ══ PROPOSTES: visual numbered sections ═════════════════════════════ */}
      <section className="bg-white">
        <div className="container-page py-14 md:py-20">
          <Reveal className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
              {isEs ? "Nuestras propuestas" : "Les nostres propostes"}
            </p>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#1A1A1A] max-w-xl leading-tight">
              {isEs
                ? "Lo que exigimos, concreto y sin excusas"
                : "El que exigim, concret i sense excuses"}
            </h2>
          </Reveal>

          <div className="space-y-0 divide-y divide-[#F0F0F0]">
            {(isEs
              ? [
                  {
                    num: "01",
                    title: "Parque público de alquiler asequible",
                    body: "Movilizar suelo y patrimonio público para construir vivienda de alquiler a precios ajustados a los ingresos reales de los jóvenes. El Estado debe ser un actor del mercado, no un espectador.",
                    tag: "Vivienda pública",
                  },
                  {
                    num: "02",
                    title: "Regulación de precios en zonas tensionadas",
                    body: "Aplicar de manera efectiva la Ley de Vivienda para contener los alquileres abusivos. Perseguir las prácticas especulativas con sanciones reales y disuasorias.",
                    tag: "Regulación",
                  },
                  {
                    num: "03",
                    title: "Ayudas directas a la emancipación juvenil",
                    body: "Bono de alquiler joven ampliado, asesoramiento gratuito para primeros inquilinos y bonificaciones fiscales para propietarios que alquilen a precio asequible.",
                    tag: "Emancipación",
                  },
                ]
              : [
                  {
                    num: "01",
                    title: "Parc públic de lloguer assequible",
                    body: "Mobilitzar sòl i patrimoni públics per a construir habitatge de lloguer a preus ajustats als ingressos reals dels joves. L'Estat ha de ser un actor del mercat, no un espectador.",
                    tag: "Habitatge públic",
                  },
                  {
                    num: "02",
                    title: "Regulació de preus en zones tensionades",
                    body: "Aplicar de manera efectiva la Llei d'Habitatge per a contenir els lloguers abusius. Perseguir les pràctiques especulatives amb sancions reals i dissuasives.",
                    tag: "Regulació",
                  },
                  {
                    num: "03",
                    title: "Ajudes directes a l'emancipació juvenil",
                    body: "Bo de lloguer jove ampliat, assessorament gratuït per a primers llogaters i bonificacions fiscals per a propietaris que lloguen a preu assequible.",
                    tag: "Emancipació",
                  },
                ]
            ).map((p, i) => (
              <Reveal key={p.num} delay={i * 60}>
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start py-10">
                  <span
                    className="font-display font-extrabold text-7xl md:text-8xl leading-none shrink-0 select-none"
                    style={{ color: "#F0F0F0" }}
                  >
                    {p.num}
                  </span>
                  <div className="flex-1">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] rounded-full px-3 py-1 mb-3 bg-primary/10 text-primary">
                      {p.tag}
                    </span>
                    <h3 className="font-display font-extrabold text-2xl md:text-3xl text-[#1A1A1A] mb-3 leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-[#1A1A1A]/60 leading-relaxed max-w-2xl">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PULL QUOTE: tipogràfic ═══════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#C0202D" }} className="text-white overflow-hidden relative">
        {/* Big background letter */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="font-display font-extrabold uppercase leading-none opacity-[0.05]"
            style={{ fontSize: "35vw", color: "white" }}
          >
            "
          </span>
        </div>

        <div className="relative container-page py-20 md:py-28">
          <Reveal>
            <blockquote className="font-display font-extrabold leading-tight max-w-3xl"
              style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)" }}>
              {isEs
                ? "«La vivienda es un derecho constitucional. No podemos aceptar que emanciparse dependa del código postal donde naces.»"
                : "«L'habitatge és un dret constitucional. No podem acceptar que emancipar-se depenga del codi postal on naixes.»"}
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-display font-extrabold text-sm">
                MD
              </div>
              <div>
                <p className="font-bold text-sm">Marcos Durà Gimeno</p>
                <p className="text-white/50 text-xs uppercase tracking-wider">
                  {isEs ? "Secretario General JSPV" : "Secretari General JSPV"}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ CTA FINAL ═══════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#1A1A1A" }} className="text-white">
        <div className="container-page py-16 md:py-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <Reveal>
              <h2 className="font-display font-extrabold text-3xl md:text-5xl leading-tight max-w-lg">
                {isEs ? (
                  <>Únete.<br /><span style={{ color: "#E8231A" }}>Cambia</span> las reglas.</>
                ) : (
                  <>Uneix-t'hi.<br /><span style={{ color: "#E8231A" }}>Canvia</span> les regles.</>
                )}
              </h2>
            </Reveal>
            <Reveal delay={80} className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/afiliat"
                className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-full text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#C0202D" }}
              >
                {isEs ? "Afíliate a JSPV" : "Afilia't a JSPV"}
              </Link>
              <Link
                href="/campanyes"
                className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-full border-2 border-white/20 text-white/70 hover:border-white hover:text-white transition-colors"
              >
                {isEs ? "Otras campañas" : "Altres campanyes"}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
