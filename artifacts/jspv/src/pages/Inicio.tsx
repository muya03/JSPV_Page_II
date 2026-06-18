import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Building2, MapPin, CalendarDays } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { useSEO } from "@/lib/seo";
import { NEWS, AGENDA } from "@/data/content";
import { HeroBanner } from "@/components/HeroBanner";
import { InstagramFeed } from "@/components/InstagramFeed";
import { useT } from "@/i18n/context";
import { Calendar } from "@/components/ui/calendar";

// Badge colours per event type
const TYPE_COLOR: Record<string, string> = {
  Assemblea: "bg-blue-100 text-blue-700",
  Acte: "bg-red-100 text-red-700",
  Formació: "bg-amber-100 text-amber-700",
  Manifestació: "bg-primary/10 text-primary",
  Reunió: "bg-gray-100 text-gray-600",
  Trobada: "bg-emerald-100 text-emerald-700",
};

export default function Inicio() {
  const { t, lang } = useT();
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date(2026, 5));

  useSEO({
    path: "/",
    title: t.seo.home.title,
    description: t.seo.home.description,
  });

  // Merge static (image, slug, iso) with translated text; keep original CA category as key
  const featured = NEWS.slice(0, 3).map((item, i) => ({
    ...item,
    ...t.data.news[i],
    caCategory: item.category,
  }));

  // Dates that have events (for calendar highlighting)
  const eventDates = AGENDA.map((e) => new Date(e.iso));

  const labelAgenda = lang === "es" ? "Agenda pública" : "Agenda pública";
  const labelProxims = lang === "es" ? "Próximos eventos" : "Propers esdeveniments";

  return (
    <Layout>
      <HeroBanner />
      <InstagramFeed />

      {/* Actualitat + Agenda */}
      <section className="bg-[hsl(var(--surface))] border-y border-border">
        <div className="container-page py-16 md:py-20">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-12 xl:gap-14 items-start">

            {/* ── Left: Notícies ──────────────────────────────── */}
            <div>
              <Reveal className="flex items-end justify-between gap-6 mb-10">
                <div>
                  <p className="font-display font-bold text-xs uppercase tracking-[0.18em] text-primary mb-3">
                    {t.home.premsa}
                  </p>
                  <h2 className="font-display font-extrabold text-foreground text-3xl sm:text-4xl">
                    {t.home.actualitat}
                  </h2>
                </div>
                <Link
                  href="/actualitat"
                  className="hidden sm:inline-flex items-center gap-2 font-display font-semibold text-primary hover:gap-3 transition-all"
                >
                  {t.common.veureTot} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featured.map((item, i) => (
                  <Reveal as="article" key={item.slug} delay={i * 90}>
                    <Link
                      href={`/actualitat/${item.slug}`}
                      className="group flex flex-col h-full bg-white rounded-lg border border-border overflow-hidden hover:border-primary/40 transition-colors"
                    >
                      <div className="aspect-[16/9] bg-[hsl(var(--surface-strong))] relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.imageAlt}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute top-4 left-4 inline-flex items-center px-2.5 py-1 rounded-sm bg-primary text-primary-foreground text-xs font-display font-bold uppercase tracking-wide">
                          {t.data.categories[item.caCategory] ?? item.caCategory}
                        </span>
                      </div>
                      <div className="flex flex-col flex-1 p-6">
                        <time dateTime={item.iso} className="text-xs font-medium text-muted-foreground">
                          {item.date}
                        </time>
                        <h3 className="mt-3 font-display font-bold text-lg leading-snug text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {item.excerpt}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-1.5 font-display font-semibold text-sm text-primary">
                          {t.common.llegirMes} <ArrowRight size={15} aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>

              <Link
                href="/actualitat"
                className="sm:hidden mt-8 inline-flex items-center gap-2 font-display font-semibold text-primary"
              >
                {t.home.veureActualitat} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            {/* ── Right: Agenda ───────────────────────────────── */}
            <Reveal className="flex flex-col gap-6">
              {/* Calendar */}
              <div className="bg-white rounded-xl border border-border overflow-hidden">
                <div className="px-4 pt-4 pb-2 border-b border-border flex items-center gap-2">
                  <CalendarDays size={15} className="text-primary" aria-hidden="true" />
                  <span className="font-display font-bold text-sm text-foreground">{labelAgenda}</span>
                </div>
                <Calendar
                  mode="multiple"
                  selected={eventDates}
                  month={calendarMonth}
                  onMonthChange={setCalendarMonth}
                  className="p-3"
                  classNames={{
                    day_selected:
                      "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-full font-bold",
                  }}
                />
              </div>

              {/* Upcoming events list */}
              <div className="bg-white rounded-xl border border-border overflow-hidden">
                <div className="px-4 py-3 border-b border-border flex items-center gap-2">
                  <CalendarDays size={15} className="text-primary" aria-hidden="true" />
                  <span className="font-display font-bold text-sm text-foreground">{labelProxims}</span>
                </div>
                <ul className="divide-y divide-border">
                  {AGENDA.map((event) => {
                    const title = lang === "es" ? event.titleEs : event.title;
                    const badgeClass = TYPE_COLOR[event.type] ?? "bg-gray-100 text-gray-600";
                    return (
                      <li key={event.id} className="px-4 py-3.5 flex flex-col gap-1.5 hover:bg-[hsl(var(--surface))] transition-colors">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-display font-semibold text-sm text-foreground leading-snug flex-1">
                            {title}
                          </p>
                          <span className={`shrink-0 text-[10px] font-bold uppercase tracking-wide rounded-full px-2 py-0.5 ${badgeClass}`}>
                            {event.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <time dateTime={event.iso} className="font-medium">{event.date}</time>
                          <span className="flex items-center gap-1">
                            <MapPin size={10} aria-hidden="true" />
                            {event.location}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* Banner: Institucions */}
      <section className="bg-[#1A1A1A] text-white">
        <div className="container-page py-16 md:py-20">
          <Reveal className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <p className="font-display font-bold text-xs uppercase tracking-[0.18em] text-primary mb-3">
                {t.home.emRepresenta}
              </p>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl leading-tight">
                {t.home.activisme}
              </h2>
              <p className="mt-4 text-white/70 text-lg leading-relaxed">
                {t.home.activismeDesc}
              </p>
            </div>
            <Link
              href="/institucions"
              className="inline-flex items-center gap-2 h-13 px-7 py-3.5 rounded-md bg-primary text-primary-foreground font-display font-bold text-base hover:bg-primary/90 transition-colors shrink-0"
            >
              <Building2 size={18} aria-hidden="true" />
              {t.home.ctaInstitucions}
            </Link>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
