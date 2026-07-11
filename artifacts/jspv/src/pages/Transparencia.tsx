import { FileText, Download, ExternalLink } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/SectionHeading";
import { useSEO } from "@/lib/seo";
import { useT } from "@/i18n/context";

interface DocItem {
  title: string;
  date: string;
  size: string;
  href: string;
}
interface DocSection {
  category: string;
  docs: DocItem[];
}

const DOCS_CA: DocSection[] = [
  {
    category: "Estatuts i Normativa",
    docs: [
      { title: "Estatuts de JSPV", date: "XIV Congrés · Alcoi, juny 2026", size: "PDF · 2,4 MB", href: "#" },
    ],
  },
  {
    category: "Resolucions del Congrés",
    docs: [
      { title: "Resolució sobre Habitatge i Emergència Climàtica", date: "XIV Congrés · Alcoi, juny 2026", size: "PDF · 540 KB", href: "#" },
    ],
  },
  {
    category: "Documents del Congrés",
    docs: [
      { title: "Ponència Marc del XIV Congrés Nacional", date: "Alcoi, juny 2026", size: "PDF · 3,2 MB", href: "#" },
    ],
  },
];

const DOCS_ES: DocSection[] = [
  {
    category: "Estatutos y Normativa",
    docs: [
      { title: "Estatutos de JSPV", date: "XIV Congreso · Alcoy, junio 2026", size: "PDF · 2,4 MB", href: "#" },
    ],
  },
  {
    category: "Resoluciones del Congreso",
    docs: [
      { title: "Resolución sobre Vivienda y Emergencia Climática", date: "XIV Congreso · Alcoy, junio 2026", size: "PDF · 540 KB", href: "#" },
    ],
  },
  {
    category: "Documentos del Congreso",
    docs: [
      { title: "Ponencia Marco del XIV Congreso Nacional", date: "Alcoy, junio 2026", size: "PDF · 3,2 MB", href: "#" },
    ],
  },
];

export default function Transparencia() {
  const { t, lang } = useT();
  const docs = lang === "es" ? DOCS_ES : DOCS_CA;

  useSEO({
    path: "/transparencia",
    title: t.seo.transparencia.title,
    description: t.seo.transparencia.description,
  });

  return (
    <Layout crumbs={[{ label: t.transparencia.crumb }]}>
      <PageHero title={t.transparencia.title} subtitle={t.transparencia.subtitle} image="/transparencia-banner.jpg" />

      {/* ── Documents ────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="container-page py-16 md:py-24">
          <div className="space-y-14">
            {docs.map((section, si) => (
              <Reveal key={section.category} delay={si * 60}>
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="block w-8 h-1 bg-primary rounded-full" aria-hidden="true" />
                    <h2 className="font-display font-extrabold text-xl text-foreground">
                      {section.category}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {section.docs.map((doc) => (
                      <a
                        key={doc.title}
                        href={doc.href}
                        className="group flex items-start gap-4 bg-[hsl(var(--surface))] rounded-xl border border-border p-5 hover:border-primary/40 hover:bg-white transition-all"
                        aria-label={`${doc.title} — ${doc.date}`}
                      >
                        <span className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <FileText size={18} className="text-primary" aria-hidden="true" />
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-bold text-sm text-foreground leading-snug group-hover:text-primary transition-colors">
                            {doc.title}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground font-light">{doc.date}</p>
                          <p className="mt-1.5 text-[11px] text-muted-foreground/60 font-light">{doc.size}</p>
                        </div>
                        <Download
                          size={16}
                          className="shrink-0 mt-1 text-muted-foreground/40 group-hover:text-primary transition-colors"
                          aria-hidden="true"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────── */}
      <section className="bg-[hsl(var(--surface))] border-t border-border">
        <div className="container-page py-12 md:py-14">
          <Reveal className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h2 className="font-display font-extrabold text-xl text-foreground">
                {t.transparencia.contactTitle}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground font-light italic">
                {t.transparencia.contactDesc}
              </p>
            </div>
            <a
              href="mailto:organitzacio@jovesocialistes.org"
              className="shrink-0 inline-flex items-center gap-2 h-11 px-6 rounded-md bg-primary text-primary-foreground font-display font-bold text-sm hover:bg-primary/90 transition-colors"
            >
              <ExternalLink size={15} aria-hidden="true" />
              {t.transparencia.contactCta}
            </a>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
