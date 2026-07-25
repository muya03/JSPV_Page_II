import { Link } from "wouter";
import {
  ArrowRight,
  Landmark,
  UserCheck,
  Building2,
  ShieldCheck,
  Coins,
  Languages,
  MapPin,
  Building,
  Users,
  Clock,
  HeartHandshake,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { useSEO } from "@/lib/seo";
import { useT } from "@/i18n/context";
import heroImg from "@assets/HEMICICLOVACIO--644x362_1781818524829.jpg";

// ── Institution data ──────────────────────────────────────────────────────────
// Each institution carries a shared icon plus per-language copy, mirroring the
// bilingual content pattern used across the site (Valors, Història).

interface InstitutionCopy {
  name: string;
  role: string;
  desc: string;
  functions: string[];
}

interface Institution {
  Icon: LucideIcon;
  ca: InstitutionCopy;
  es: InstitutionCopy;
}

interface InstitutionGroup {
  ca: string;
  es: string;
  items: Institution[];
}

const INSTITUTION_GROUPS: InstitutionGroup[] = [
  {
    ca: "Institucions d'autogovern",
    es: "Instituciones de autogobierno",
    items: [
      {
        Icon: Landmark,
        ca: {
          name: "Les Corts Valencianes",
          role: "Poder legislatiu",
          desc: "El parlament valencià, format per 99 diputades i diputats triats per sufragi universal cada quatre anys. Representa el poble valencià i és la seu de la sobirania de la Comunitat.",
          functions: [
            "Aprovar les lleis que regixen el País Valencià.",
            "Aprovar els pressupostos de la Generalitat.",
            "Elegir i controlar el president o presidenta de la Generalitat.",
            "Impulsar i fiscalitzar l'acció del Consell.",
          ],
        },
        es: {
          name: "Les Corts Valencianes",
          role: "Poder legislativo",
          desc: "El parlamento valenciano, formado por 99 diputadas y diputados elegidos por sufragio universal cada cuatro años. Representa al pueblo valenciano y es la sede de la soberanía de la Comunidad.",
          functions: [
            "Aprobar las leyes que rigen el País Valenciano.",
            "Aprobar los presupuestos de la Generalitat.",
            "Elegir y controlar al president o presidenta de la Generalitat.",
            "Impulsar y fiscalizar la acción del Consell.",
          ],
        },
      },
      {
        Icon: UserCheck,
        ca: {
          name: "President/a de la Generalitat",
          role: "Màxima representació",
          desc: "La màxima representació de la Comunitat Valenciana i representant ordinari de l'Estat al territori. És triat per les Corts d'entre els seus membres.",
          functions: [
            "Dirigir i coordinar l'acció del Consell.",
            "Representar la Generalitat davant l'Estat i altres institucions.",
            "Nomenar els consellers i conselleres.",
          ],
        },
        es: {
          name: "President/a de la Generalitat",
          role: "Máxima representación",
          desc: "La máxima representación de la Comunidad Valenciana y representante ordinario del Estado en el territorio. Es elegido por Les Corts de entre sus miembros.",
          functions: [
            "Dirigir y coordinar la acción del Consell.",
            "Representar a la Generalitat ante el Estado y otras instituciones.",
            "Nombrar a los consellers y conselleres.",
          ],
        },
      },
      {
        Icon: Building2,
        ca: {
          name: "El Consell",
          role: "Poder executiu",
          desc: "El govern valencià, format pel president, els vicepresidents i els consellers que dirigixen les conselleries. Exercix la funció executiva i la potestat reglamentària.",
          functions: [
            "Dirigir la política i l'administració de la Generalitat.",
            "Elaborar i executar els pressupostos.",
            "Gestionar la sanitat, l'educació i els serveis públics.",
          ],
        },
        es: {
          name: "El Consell",
          role: "Poder ejecutivo",
          desc: "El gobierno valenciano, formado por el president, los vicepresidentes y los consellers que dirigen las conselleries. Ejerce la función ejecutiva y la potestad reglamentaria.",
          functions: [
            "Dirigir la política y la administración de la Generalitat.",
            "Elaborar y ejecutar los presupuestos.",
            "Gestionar la sanidad, la educación y los servicios públicos.",
          ],
        },
      },
    ],
  },
  {
    ca: "Institucions de control i garanties",
    es: "Instituciones de control y garantías",
    items: [
      {
        Icon: ShieldCheck,
        ca: {
          name: "Síndic de Greuges",
          role: "Defensa de drets",
          desc: "El comissionat de les Corts encarregat de defensar els drets i les llibertats de la ciutadania davant l'administració valenciana.",
          functions: [
            "Atendre les queixes de la ciutadania.",
            "Supervisar l'actuació de les administracions valencianes.",
            "Formular recomanacions per a millorar els serveis públics.",
          ],
        },
        es: {
          name: "Síndic de Greuges",
          role: "Defensa de derechos",
          desc: "El comisionado de Les Corts encargado de defender los derechos y las libertades de la ciudadanía ante la administración valenciana.",
          functions: [
            "Atender las quejas de la ciudadanía.",
            "Supervisar la actuación de las administraciones valencianas.",
            "Formular recomendaciones para mejorar los servicios públicos.",
          ],
        },
      },
      {
        Icon: Coins,
        ca: {
          name: "Sindicatura de Comptes",
          role: "Control econòmic",
          desc: "L'òrgan, dependent de les Corts, que fiscalitza els comptes i la gestió econòmica del sector públic valencià.",
          functions: [
            "Auditar els comptes de la Generalitat i els ajuntaments.",
            "Vetlar per l'ús correcte dels diners públics.",
            "Informar les Corts sobre la gestió econòmica.",
          ],
        },
        es: {
          name: "Sindicatura de Comptes",
          role: "Control económico",
          desc: "El órgano, dependiente de Les Corts, que fiscaliza las cuentas y la gestión económica del sector público valenciano.",
          functions: [
            "Auditar las cuentas de la Generalitat y los ayuntamientos.",
            "Velar por el uso correcto del dinero público.",
            "Informar a Les Corts sobre la gestión económica.",
          ],
        },
      },
      {
        Icon: Languages,
        ca: {
          name: "Acadèmia Valenciana de la Llengua",
          role: "Autoritat lingüística",
          desc: "La institució que determina i elabora la normativa del valencià i vetla pel seu ús i la seua normalització.",
          functions: [
            "Fixar la normativa lingüística del valencià.",
            "Assessorar les institucions en matèria lingüística.",
            "Promoure l'ús social de la llengua.",
          ],
        },
        es: {
          name: "Acadèmia Valenciana de la Llengua",
          role: "Autoridad lingüística",
          desc: "La institución que determina y elabora la normativa del valenciano y vela por su uso y su normalización.",
          functions: [
            "Fijar la normativa lingüística del valenciano.",
            "Asesorar a las instituciones en materia lingüística.",
            "Promover el uso social de la lengua.",
          ],
        },
      },
    ],
  },
  {
    ca: "Administració local",
    es: "Administración local",
    items: [
      {
        Icon: MapPin,
        ca: {
          name: "Diputacions provincials",
          role: "Govern provincial",
          desc: "Les institucions que governen cadascuna de les tres províncies —València, Alacant i Castelló— i donen suport especialment als municipis més xicotets.",
          functions: [
            "Coordinar i assistir els ajuntaments.",
            "Gestionar serveis d'àmbit provincial.",
            "Garantir la prestació de serveis als pobles menuts.",
          ],
        },
        es: {
          name: "Diputaciones provinciales",
          role: "Gobierno provincial",
          desc: "Las instituciones que gobiernan cada una de las tres provincias —Valencia, Alicante y Castellón— y dan apoyo especialmente a los municipios más pequeños.",
          functions: [
            "Coordinar y asistir a los ayuntamientos.",
            "Gestionar servicios de ámbito provincial.",
            "Garantizar la prestación de servicios a los pueblos pequeños.",
          ],
        },
      },
      {
        Icon: Building,
        ca: {
          name: "Ajuntaments",
          role: "Govern local",
          desc: "La institució més pròxima a la ciutadania. Governen els municipis i presten els serveis bàsics del dia a dia.",
          functions: [
            "Gestionar l'urbanisme, la neteja i la via pública.",
            "Oferir serveis socials, culturals i esportius de proximitat.",
            "Decidir sobre la vida quotidiana del municipi.",
          ],
        },
        es: {
          name: "Ayuntamientos",
          role: "Gobierno local",
          desc: "La institución más cercana a la ciudadanía. Gobiernan los municipios y prestan los servicios básicos del día a día.",
          functions: [
            "Gestionar el urbanismo, la limpieza y la vía pública.",
            "Ofrecer servicios sociales, culturales y deportivos de proximidad.",
            "Decidir sobre la vida cotidiana del municipio.",
          ],
        },
      },
    ],
  },
];

// ── Why the youth voice matters ───────────────────────────────────────────────

interface PillarCopy {
  title: string;
  text: string;
}

interface Pillar {
  Icon: LucideIcon;
  ca: PillarCopy;
  es: PillarCopy;
}

const YOUTH_PILLARS: Pillar[] = [
  {
    Icon: Users,
    ca: {
      title: "Representació real",
      text: "Una part important de la població és jove, però la seua presència en els òrgans de decisió és molt menor. Una democràcia sana ha de reflectir totes les generacions que la componen.",
    },
    es: {
      title: "Representación real",
      text: "Una parte importante de la población es joven, pero su presencia en los órganos de decisión es mucho menor. Una democracia sana debe reflejar todas las generaciones que la componen.",
    },
  },
  {
    Icon: Clock,
    ca: {
      title: "Mirada de futur",
      text: "Les persones joves defensen polítiques amb visió de llarg termini —clima, habitatge, pensions— perquè seran les que en viuran les conseqüències durant més temps.",
    },
    es: {
      title: "Mirada de futuro",
      text: "Las personas jóvenes defienden políticas con visión de largo plazo —clima, vivienda, pensiones— porque serán quienes vivirán sus consecuencias durante más tiempo.",
    },
  },
  {
    Icon: HeartHandshake,
    ca: {
      title: "Problemes propis, veus pròpies",
      text: "Ningú explica millor la precarietat laboral, la crisi d'emancipació o la salut mental que qui les patix en primera persona. La joventut aporta un coneixement que no es pot delegar.",
    },
    es: {
      title: "Problemas propios, voces propias",
      text: "Nadie explica mejor la precariedad laboral, la crisis de emancipación o la salud mental que quien las sufre en primera persona. La juventud aporta un conocimiento que no se puede delegar.",
    },
  },
  {
    Icon: Sparkles,
    ca: {
      title: "Renovació democràtica",
      text: "La participació jove combat la desafecció, apropa la política a la ciutadania i garantix el relleu generacional que manté vives les institucions.",
    },
    es: {
      title: "Renovación democrática",
      text: "La participación joven combate la desafección, acerca la política a la ciudadanía y garantiza el relevo generacional que mantiene vivas las instituciones.",
    },
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function InstitucionsValencianes() {
  const { t, lang } = useT();
  const L = lang === "es" ? "es" : "ca";

  useSEO({
    path: "/institucions/valencianes",
    title: t.seo.institucionsValencianes.title,
    description: t.seo.institucionsValencianes.description,
  });

  const iv = t.institucionsValencianes;

  return (
    <Layout
      crumbs={[
        { label: t.nav.institucions, href: "/institucions" },
        { label: iv.crumb },
      ]}
    >
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section
        className="relative text-white overflow-hidden"
        style={{ backgroundImage: `url(${heroImg})`, backgroundSize: "cover", backgroundPosition: "center 45%" }}
      >
        <div className="absolute inset-0 bg-[#1A1A1A]/72" aria-hidden="true" />
        <div className="relative z-10 container-page py-20 md:py-28">
          <Reveal>
            <p className="font-display font-bold text-xs uppercase tracking-[0.22em] text-primary mb-4">
              {t.nav.institucions}
            </p>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[1.05] max-w-3xl">
              {iv.title}
            </h1>
            <p className="mt-5 text-white/75 text-lg leading-relaxed max-w-2xl font-light italic">
              {iv.subtitle}
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
                {iv.introTitle}
              </h2>
              <span className="block w-16 h-1.5 bg-primary mt-5" aria-hidden="true" />
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed font-light italic">
              {iv.introText}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Institutions ────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-page">
          <Reveal className="max-w-3xl mb-12 md:mb-16">
            <p className="font-display font-bold text-xs uppercase tracking-[0.18em] text-primary mb-3">
              {iv.institucionsEyebrow}
            </p>
            <h2 className="font-display font-extrabold text-foreground text-3xl sm:text-4xl leading-[1.1]">
              {iv.institucionsTitle}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed font-light italic">
              {iv.institucionsIntro}
            </p>
          </Reveal>

          <div className="space-y-14 md:space-y-20">
            {INSTITUTION_GROUPS.map((group) => (
              <div key={group.ca}>
                <Reveal className="flex items-center gap-4 mb-7">
                  <span className="shrink-0 block w-1.5 h-7 bg-primary rounded-full" aria-hidden="true" />
                  <h3 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {group[L]}
                  </h3>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {group.items.map((inst, i) => {
                    const c = inst[L];
                    const Icon = inst.Icon;
                    return (
                      <Reveal key={c.name} delay={(i % 3) * 70}>
                        <article className="group h-full flex flex-col bg-white border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-sm transition-all">
                          {/* Header */}
                          <div className="bg-[hsl(var(--surface))] px-7 pt-7 pb-5 border-b border-border">
                            <div className="flex items-start gap-4">
                              <span
                                className="shrink-0 inline-flex w-11 h-11 items-center justify-center rounded-lg bg-primary/10 text-primary"
                                aria-hidden="true"
                              >
                                <Icon size={22} />
                              </span>
                              <div>
                                <span className="font-display font-bold text-[10px] uppercase tracking-[0.2em] text-primary/80">
                                  {c.role}
                                </span>
                                <h4 className="font-display font-extrabold text-xl md:text-2xl text-foreground leading-tight mt-0.5">
                                  {c.name}
                                </h4>
                              </div>
                            </div>
                          </div>
                          {/* Body */}
                          <div className="flex-1 flex flex-col px-7 py-6">
                            <p className="text-muted-foreground text-sm leading-relaxed font-light mb-5">
                              {c.desc}
                            </p>
                            <p className="font-display font-bold text-[10px] uppercase tracking-[0.18em] text-foreground/70 mb-3">
                              {iv.funcionsLabel}
                            </p>
                            <ul className="space-y-2.5">
                              {c.functions.map((fn) => (
                                <li key={fn} className="flex items-start gap-2.5 text-sm text-foreground/85 leading-relaxed">
                                  <span className="shrink-0 mt-1.5 block w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
                                  <span>{fn}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </article>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why the youth voice matters ─────────────────────────── */}
      <section className="bg-[#1A1A1A] text-white py-16 md:py-24">
        <div className="container-page">
          <Reveal className="max-w-3xl mb-12 md:mb-16">
            <p className="font-display font-bold text-xs uppercase tracking-[0.18em] text-primary mb-3">
              {iv.jovesEyebrow}
            </p>
            <h2 className="font-display font-extrabold text-white text-3xl sm:text-4xl leading-[1.1]">
              {iv.jovesTitle}
            </h2>
            <p className="mt-5 text-white/70 text-lg leading-relaxed font-light italic">
              {iv.jovesIntro}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {YOUTH_PILLARS.map((pillar, i) => {
              const p = pillar[L];
              const Icon = pillar.Icon;
              return (
                <Reveal key={p.title} delay={(i % 2) * 80}>
                  <article className="h-full flex gap-5 bg-white/[0.04] border border-white/10 rounded-xl p-6 md:p-7 hover:border-primary/40 transition-colors">
                    <span
                      className="shrink-0 inline-flex w-12 h-12 items-center justify-center rounded-lg bg-primary text-primary-foreground"
                      aria-hidden="true"
                    >
                      <Icon size={22} />
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-lg text-white mb-2">
                        {p.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed font-light">
                        {p.text}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="bg-[hsl(var(--surface))] border-t border-border">
        <div className="container-page py-16 md:py-20">
          <Reveal className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl leading-tight text-foreground">
                {iv.ctaTitle}
              </h2>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed font-light italic">
                {iv.ctaText}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/institucions"
                className="inline-flex items-center justify-center gap-2 h-13 px-7 py-3.5 rounded-md bg-primary text-primary-foreground font-display font-bold text-base hover:bg-primary/90 transition-colors"
              >
                {iv.ctaDirectori} <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a
                href="https://www.jse.org/afiliacion-online-jse/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-13 px-7 py-3.5 rounded-md bg-white border border-border text-foreground font-display font-bold text-base hover:border-foreground/40 transition-colors"
              >
                {iv.ctaAfiliat}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
