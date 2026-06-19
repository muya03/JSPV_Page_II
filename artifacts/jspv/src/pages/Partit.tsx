import { Link } from "wouter";
import { Users, Clock, Lightbulb, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { useSEO } from "@/lib/seo";
import { useT } from "@/i18n/context";
import manifestacioImg from "@assets/7-2_1781872589432.jpg";

export default function Partit() {
  const { t, lang } = useT();

  useSEO({
    path: "/partit",
    title: t.seo.partit.title,
    description: t.seo.partit.description,
  });

  const sections = [
    {
      href: "/partit/equip",
      Icon: Users,
      label: t.nav.equip,
      eyebrow: lang === "es" ? "Comisión Ejecutiva Nacional" : "Comissió Executiva Nacional",
      desc:
        lang === "es"
          ? "Conoce a las 29 personas que integran la Comisión Ejecutiva Nacional elegida en el XIV Congreso de Alcoy: la Secretaría General, el Núcleo de Dirección y todas las áreas estratégicas."
          : "Coneix les 29 persones que integren la Comissió Executiva Nacional elegida al XIV Congrés d'Alcoi: la Secretaria General, el Nucli de Direcció i totes les àrees estratègiques.",
      stat: "29",
      statLabel: lang === "es" ? "miembros" : "membres",
    },
    {
      href: "/partit/historia",
      Icon: Clock,
      label: t.nav.historia,
      eyebrow: lang === "es" ? "Desde 1903" : "Des de 1903",
      desc:
        lang === "es"
          ? "Más de un siglo de lucha socialista y democrática en el País Valenciano: desde la fundación de las JSE hasta el XIV Congreso de Alcoy, pasando por la República, el exilio y la Transición."
          : "Més d'un segle de lluita socialista i democràtica al País Valencià: des de la fundació de les JSE fins al XIV Congrés d'Alcoi, passant per la República, l'exili i la Transició.",
      stat: "1903",
      statLabel: lang === "es" ? "fundación" : "fundació",
    },
    {
      href: "/partit/valors",
      Icon: Lightbulb,
      label: t.nav.valors,
      eyebrow: lang === "es" ? "7 principios" : "7 principis",
      desc:
        lang === "es"
          ? "Los siete valores que vertebran nuestra acción: socialdemocracia, republicanismo, progresismo, feminismo, federalismo, europeísmo y valencianismo del siglo XXI."
          : "Els set valors que vertebren la nostra acció: socialdemocràcia, republicanisme, progressisme, feminisme, federalisme, europeisme i valencianisme del s. XXI.",
      stat: "7",
      statLabel: lang === "es" ? "valores" : "valors",
    },
  ];

  return (
    <Layout crumbs={[{ label: t.partit.crumb }]}>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative bg-[#1A1A1A] text-white overflow-hidden">
        <img
          src={manifestacioImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/90 via-[#1A1A1A]/60 to-transparent" />
        <div className="relative container-page py-16 md:py-24">
          <Reveal>
            <p className="font-display font-bold text-xs uppercase tracking-[0.22em] text-primary mb-4">
              JSPV
            </p>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[1.05] max-w-3xl">
              {t.partit.title}
            </h1>
            <p className="mt-5 text-white/70 text-lg leading-relaxed max-w-2xl">
              {t.partit.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Three hub cards ───────────────────────────────────── */}
      <section className="bg-[hsl(var(--surface))] border-b border-border">
        <div className="container-page py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {sections.map((s, i) => (
              <Reveal key={s.href} delay={i * 100}>
                <Link
                  href={s.href}
                  className="group flex flex-col h-full bg-white border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-md transition-all"
                >
                  {/* Card header */}
                  <div className="bg-[#1A1A1A] px-7 py-8">
                    <div className="flex items-start justify-between gap-4">
                      <s.Icon
                        size={32}
                        aria-hidden="true"
                        className="text-primary shrink-0"
                      />
                      <div className="text-right">
                        <p className="font-display font-extrabold text-4xl text-white leading-none">
                          {s.stat}
                        </p>
                        <p className="text-xs text-white/50 font-medium mt-1">{s.statLabel}</p>
                      </div>
                    </div>
                    <p className="mt-5 font-display font-bold text-[10px] uppercase tracking-[0.2em] text-primary/80">
                      {s.eyebrow}
                    </p>
                    <h2 className="mt-1 font-display font-extrabold text-2xl text-white leading-tight">
                      {s.label}
                    </h2>
                  </div>
                  {/* Card body */}
                  <div className="flex flex-col flex-1 px-7 py-6">
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                      {s.desc}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 font-display font-bold text-sm text-primary group-hover:gap-3 transition-all">
                      {lang === "es" ? "Descubrir" : "Descobrir"}
                      <ArrowRight size={15} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Intro strip ───────────────────────────────────────── */}
      <section className="bg-white">
        <div className="container-page py-14 md:py-16">
          <Reveal className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 items-center">
            <div>
              <span className="block w-16 h-1.5 bg-primary mb-5" aria-hidden="true" />
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-foreground leading-snug">
                {t.partit.historiaTitle}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.partit.historiaIntro}
            </p>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
