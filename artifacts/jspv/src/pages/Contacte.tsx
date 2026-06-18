import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/SectionHeading";
import { useSEO } from "@/lib/seo";
import { CONTACT } from "@/data/content";
import { useT } from "@/i18n/context";
import { Mail, MapPin } from "lucide-react";
import { SiInstagram, SiX } from "react-icons/si";

export default function Contacte() {
  const { t } = useT();

  useSEO({
    path: "/contacte",
    title: t.seo.contacte.title,
    description: t.seo.contacte.description,
  });

  const directori = [
    { label: t.contacte.informacioGeneral, email: CONTACT.email },
    { label: t.contacte.organitzacio, email: CONTACT.organitzacio },
    { label: t.contacte.premsa, email: CONTACT.premsa },
  ];

  return (
    <Layout crumbs={[{ label: t.contacte.crumb }]}>
      <PageHero title={t.contacte.title} subtitle={t.contacte.subtitle} />

      <section className="bg-[hsl(var(--surface))]">
        <div className="container-page py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Reveal className="lg:col-span-2">
              <div className="bg-white border border-border rounded-lg p-7 h-full">
                <h2 className="font-display font-extrabold text-xl text-foreground mb-6">
                  {t.contacte.directori}
                </h2>
                <ul className="divide-y divide-border">
                  {directori.map((d) => (
                    <li key={d.email} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                      <span className="shrink-0 w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                        <Mail size={18} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-display font-semibold text-foreground">{d.label}</p>
                        <a href={`mailto:${d.email}`} className="text-primary text-sm hover:underline">
                          {d.email}
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-border flex items-start gap-4">
                  <span className="shrink-0 w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                    <MapPin size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display font-semibold text-foreground">{t.contacte.seuNacional}</p>
                    <p className="text-muted-foreground text-sm">{CONTACT.adreca}</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="bg-[#1A1A1A] text-white rounded-lg p-7 h-full flex flex-col">
                <h2 className="font-display font-extrabold text-xl mb-3">{t.contacte.xarxes}</h2>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  {t.contacte.xarxesDesc}
                </p>
                <div className="space-y-3">
                  <a
                    href={CONTACT.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <SiInstagram size={20} aria-hidden="true" />
                    <span>
                      <span className="block font-display font-semibold">Instagram</span>
                      <span className="block text-white/60 text-sm">{CONTACT.instagram.handle}</span>
                    </span>
                  </a>
                  <a
                    href={CONTACT.x.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <SiX size={20} aria-hidden="true" />
                    <span>
                      <span className="block font-display font-semibold">X</span>
                      <span className="block text-white/60 text-sm">{CONTACT.x.handle}</span>
                    </span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
