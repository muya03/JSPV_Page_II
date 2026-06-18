import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { useSEO } from "@/lib/seo";
import { useT } from "@/i18n/context";
import heroBg from "@assets/joves-socialistes-bandera-republicana-kB3G--1248x698@abc.jpeg_1781817065311.webp";

const VALUES_EXTENDED_CA = [
  "La socialdemocràcia és el fonament ideològic de JSPV. Defensem un model de societat en el qual els serveis públics —sanitat, educació, habitatge i cures— garantisquen una vida digna per a tothom, independentment del seu origen o situació econòmica. La redistribució de la riquesa a través de la progressivitat fiscal, la regulació dels mercats per a evitar abusos i la inversió sostinguda en l'estat del benestar són polítiques de necessitat urgent, no d'opció ideològica optativa.",
  "El republicanisme implica la sobirania popular com a fonament inqüestionable de tota autoritat política legítima. Defensem institucions laiques, transparents i rendibles de comptes en les quals la ciutadania siga el subjecte polític central. Qüestionem radicalment tota forma de poder hereditari o de privilegi institucional que no emane de la voluntat democràtica del poble, i apostem per una forma d'estat que vertebre la pluralitat de la nostra societat.",
  "El progressisme suposa la convicció profunda que la societat pot i ha de millorar a través de l'acció col·lectiva organitzada i de la presència activa en les institucions. Avancem en drets i llibertats civils, socials i econòmics sense por a governar, assumint les responsabilitats que implica la participació institucional. Ser progressista significa no conformar-se amb l'statu quo i treballar cada dia per a un futur millor.",
  "El feminisme és un eix transversal de tota l'acció de JSPV, no una política sectorial ni un afegit accessori. La igualtat real implica polítiques actives de correcció de les desigualtats estructurals, una inversió suficient en la lluita contra les violències masclistes i la garantia de la corresponsabilitat en l'àmbit de les cures i la vida laboral. Defensem una agenda feminista valenta que no admeta passos enrere en cap dels nostres espais polítics.",
  "El federalisme és la proposta de JSPV al debat territorial des d'una perspectiva d'esquerres i de justícia redistributiva. Defensem un estat federal que reconega la plurinacionalitat d'Espanya, que garantisca una finançament just per al País Valencià —històricament infrafinançat— i que combine autonomia territorial amb solidaritat entre territoris. El federalisme articula diversitat, autogovern i cohesió social com a valors complementaris.",
  "Creiem en una Europa social, federal i democràtica que vaja molt més enllà del mercat únic. L'Europa que defensem ha de garantir estàndards mínims de drets socials per a tota la ciutadania, ha d'afrontar la crisi climàtica amb ambició real i ha de construir una política exterior basada en els drets humans, la pau i la cooperació internacional. Rebutgem una Europa de les nacions que anteposa els interessos d'estat als drets de les persones.",
  "El valencianisme del s. XXI és l'afirmació de la identitat, la llengua i la cultura valencianes des d'una perspectiva d'esquerres, oberta i plural que no renega de la diversitat interna del País Valencià. Defensem l'autogovern real, la normalització lingüística del valencià i la recuperació de la memòria democràtica del nostre poble, sense exclusivismes ni posicions essencialistes. Un valencianisme que dialoga i col·labora amb els altres pobles d'Espanya i d'Europa.",
];

const VALUES_EXTENDED_ES = [
  "La socialdemocracia es el fundamento ideológico de JSPV. Defendemos un modelo de sociedad en el que los servicios públicos —sanidad, educación, vivienda y cuidados— garanticen una vida digna para todos, independientemente de su origen o situación económica. La redistribución de la riqueza, la regulación de los mercados y la inversión sostenida en el estado del bienestar son políticas de necesidad urgente.",
  "El republicanismo implica la soberanía popular como fundamento incuestionable de toda autoridad política legítima. Defendemos instituciones laicas, transparentes y responsables en las que la ciudadanía sea el sujeto político central. Cuestionamos radicalmente toda forma de poder hereditario o privilegio institucional que no emane de la voluntad democrática del pueblo.",
  "El progresismo supone la convicción profunda de que la sociedad puede y debe mejorar a través de la acción colectiva organizada y de la presencia activa en las instituciones. Avanzamos en derechos y libertades sin miedo a gobernar, asumiendo las responsabilidades que implica la participación institucional. Ser progresista significa no conformarse con el statu quo.",
  "El feminismo es un eje transversal de toda la acción de JSPV, no una política sectorial ni un añadido accesorio. La igualdad real implica políticas activas de corrección de las desigualdades estructurales, inversión suficiente contra las violencias machistas y la garantía de la corresponsabilidad en los cuidados y la vida laboral. Defendemos una agenda feminista valiente sin pasos atrás.",
  "El federalismo es la propuesta de JSPV al debate territorial desde una perspectiva de izquierdas y de justicia redistributiva. Defendemos un estado federal que reconozca la plurinacionalidad de España, garantice una financiación justa para el País Valenciano y combine autonomía territorial con solidaridad entre territorios.",
  "Creemos en una Europa social, federal y democrática que vaya mucho más allá del mercado único. La Europa que defendemos debe garantizar estándares mínimos de derechos sociales, afrontar la crisis climática con ambición real y construir una política exterior basada en los derechos humanos, la paz y la cooperación internacional.",
  "El valencianismo del s. XXI es la afirmación de la identidad, la lengua y la cultura valencianas desde una perspectiva de izquierdas, abierta y plural. Defendemos el autogobierno real, la normalización lingüística del valenciano y la recuperación de la memoria democrática de nuestro pueblo, sin exclusivismos ni posiciones esencialistas.",
];

export default function Valors() {
  const { t, lang } = useT();
  const extended = lang === "es" ? VALUES_EXTENDED_ES : VALUES_EXTENDED_CA;

  useSEO({
    path: "/partit/valors",
    title: t.seo.valors.title,
    description: t.seo.valors.description,
  });

  return (
    <Layout
      crumbs={[
        { label: t.nav.nosaltres, href: "/partit" },
        { label: t.valors.crumb },
      ]}
    >
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section
        className="relative text-white overflow-hidden"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center 35%" }}
      >
        <div className="absolute inset-0 bg-[#1A1A1A]/72" aria-hidden="true" />
        <div className="relative z-10 container-page py-20 md:py-28">
          <Reveal>
            <p className="font-display font-bold text-xs uppercase tracking-[0.22em] text-primary mb-4">
              {t.nav.nosaltres}
            </p>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[1.05] max-w-3xl">
              {t.valors.title}
            </h1>
            <p className="mt-5 text-white/75 text-lg leading-relaxed max-w-2xl">
              {t.valors.subtitle}
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
                {t.valors.introTitle}
              </h2>
              <span className="block w-16 h-1.5 bg-primary mt-5" aria-hidden="true" />
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.valors.introText}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Values grid ─────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {t.data.values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 70}>
                <article className="group h-full flex flex-col bg-white border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-sm transition-all">
                  {/* Header bar */}
                  <div className="bg-[hsl(var(--surface))] px-7 pt-7 pb-5 border-b border-border">
                    <div className="flex items-start gap-4">
                      <span
                        className="shrink-0 mt-1 block w-1.5 h-8 bg-primary rounded-full"
                        aria-hidden="true"
                      />
                      <div>
                        <span className="font-display font-bold text-[10px] uppercase tracking-[0.2em] text-primary/80">
                          0{i + 1}
                        </span>
                        <h3 className="font-display font-extrabold text-xl md:text-2xl text-foreground leading-tight mt-0.5">
                          {v.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                  {/* Body */}
                  <div className="flex-1 flex flex-col px-7 py-6">
                    <p className="font-semibold text-foreground/90 text-sm leading-relaxed mb-4">
                      {v.desc}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                      {extended[i]}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Manifesto quote ─────────────────────────────────────── */}
      <section className="bg-[#1A1A1A] text-white py-16 md:py-20">
        <div className="container-page">
          <Reveal>
            <blockquote className="max-w-3xl mx-auto text-center">
              <p className="font-display font-extrabold text-2xl md:text-3xl leading-snug text-white/95">
                {lang === "es"
                  ? "«Construir el socialismo del s. XXI exige comprometerse con el presente sin renunciar a los sueños del futuro.»"
                  : "«Construir el socialisme del s. XXI exigix comprometre's amb el present sense renunciar als somnis del futur.»"}
              </p>
              <footer className="mt-6 text-primary font-display font-bold text-sm uppercase tracking-widest">
                {lang === "es"
                  ? "XIV Congreso Nacional de JSPV · Alcoy, 2026"
                  : "XIV Congrés Nacional de JSPV · Alcoi, 2026"}
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
