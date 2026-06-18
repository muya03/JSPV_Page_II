import { useState, useEffect, useCallback } from "react";
import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { useSEO } from "@/lib/seo";
import { EXECUTIVE_FULL, type ExecutiveMember } from "@/data/content";
import { useT } from "@/i18n/context";

// ── helpers ────────────────────────────────────────────────────────────────

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

const NUCLI = "Nucli de Direcció";

const orgMembers = EXECUTIVE_FULL.filter((m) => m.area === NUCLI);
const secretariesMembers = EXECUTIVE_FULL.filter((m) => m.area !== NUCLI);

// ── modal ─────────────────────────────────────────────────────────────────

function MemberModal({
  member,
  onClose,
  areaLabel,
}: {
  member: ExecutiveMember;
  onClose: () => void;
  areaLabel: string;
}) {
  const isSecGen = member.role === "Secretaria General";

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={member.name}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Colored top strip */}
        <div className={`h-2 w-full ${isSecGen ? "bg-primary" : "bg-[#1A1A1A]"}`} />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Tancar"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="px-8 pb-8 pt-6 flex flex-col items-center text-center">
          {/* Avatar */}
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center font-display font-extrabold text-2xl mb-5 select-none ${
              isSecGen
                ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                : "bg-[#1A1A1A] text-white"
            }`}
          >
            {initials(member.name)}
          </div>

          {/* Area tag */}
          <span className="inline-block bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-[0.15em] rounded-full px-3 py-1 mb-3">
            {areaLabel}
          </span>

          {/* Role */}
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary mb-2">
            {member.role}
          </p>

          {/* Name */}
          <h2 className="font-display font-extrabold text-xl text-foreground leading-tight mb-4">
            {member.name}
          </h2>

          {/* Bio */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {member.bio}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── card ──────────────────────────────────────────────────────────────────

function MemberCard({
  member,
  onClick,
}: {
  member: ExecutiveMember;
  onClick: () => void;
}) {
  const isSecGen = member.role === "Secretaria General";

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-center text-center bg-white border border-border rounded-2xl p-5 hover:shadow-lg hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200 w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-primary"
    >
      {/* Avatar */}
      <div
        className={`w-[72px] h-[72px] rounded-full flex items-center justify-center font-display font-extrabold text-base mb-3 transition-transform duration-200 group-hover:scale-105 select-none ${
          isSecGen
            ? "bg-primary text-primary-foreground ring-2 ring-primary/30 ring-offset-2"
            : "bg-[#1A1A1A] text-white"
        }`}
        aria-hidden="true"
      >
        {initials(member.name)}
      </div>

      {/* Role */}
      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-primary/80 leading-tight mb-1 max-w-[120px]">
        {member.role}
      </p>

      {/* Name */}
      <p className="font-display font-bold text-sm text-foreground leading-snug">
        {member.name}
      </p>
    </button>
  );
}

// ── section ───────────────────────────────────────────────────────────────

function TeamSection({
  title,
  members,
  onSelect,
}: {
  title: string;
  members: ExecutiveMember[];
  onSelect: (m: ExecutiveMember) => void;
}) {
  return (
    <div>
      <Reveal>
        <div className="flex items-center gap-3 mb-6">
          <span className="block w-1 h-6 bg-primary shrink-0" aria-hidden="true" />
          <h2 className="font-display font-extrabold text-lg text-foreground">
            {title}
          </h2>
          <span className="text-sm font-medium text-muted-foreground/60">
            ({members.length})
          </span>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {members.map((m, i) => (
          <Reveal key={m.name} delay={(i % 5) * 40}>
            <MemberCard member={m} onClick={() => onSelect(m)} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// ── page ──────────────────────────────────────────────────────────────────

export default function Equip() {
  const { t, lang } = useT();
  const [selected, setSelected] = useState<ExecutiveMember | null>(null);

  useSEO({
    path: "/partit/equip",
    title: t.seo.equip.title,
    description: t.seo.equip.description,
  });

  const close = useCallback(() => setSelected(null), []);

  const sectionOrg = lang === "es" ? "Organización" : "Organització";
  const sectionSec = lang === "es" ? "Secretarías" : "Secretaries";

  return (
    <Layout
      crumbs={[
        { label: t.nav.nosaltres, href: "/partit" },
        { label: t.equip.crumb },
      ]}
    >
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="bg-[#1A1A1A] text-white">
        <div className="container-page py-16 md:py-20">
          <Reveal>
            <p className="font-display font-bold text-xs uppercase tracking-[0.22em] text-primary mb-4">
              {t.nav.nosaltres}
            </p>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] max-w-3xl">
              {t.equip.title}
            </h1>
            <p className="mt-5 text-white/70 text-lg leading-relaxed max-w-2xl">
              {t.equip.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Stats strip ───────────────────────────────────────── */}
      <section className="bg-white border-b border-border">
        <div className="container-page py-7">
          <Reveal className="flex flex-wrap items-center justify-center sm:justify-start gap-8 sm:gap-16">
            <div className="text-center sm:text-left">
              <p className="font-display font-extrabold text-5xl text-primary leading-none">
                {EXECUTIVE_FULL.length}
              </p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                {t.equip.statsMembers}
              </p>
            </div>
            <div className="text-center sm:text-left">
              <p className="font-display font-extrabold text-5xl text-primary leading-none">9</p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                {t.equip.statsAreas}
              </p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" aria-hidden="true" />
            <div className="text-center sm:text-left">
              <p className="font-display font-bold text-base text-foreground">
                XIV {lang === "es" ? "Congreso" : "Congrés"}
              </p>
              <p className="text-sm font-medium text-muted-foreground">
                {lang === "es" ? "Alcoy · Junio 2026" : "Alcoi · Juny 2026"}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Team grid ─────────────────────────────────────────── */}
      <section className="bg-[hsl(var(--surface))]">
        <div className="container-page py-12 md:py-16 space-y-14">
          <TeamSection
            title={sectionOrg}
            members={orgMembers}
            onSelect={setSelected}
          />
          <hr className="border-border" />
          <TeamSection
            title={sectionSec}
            members={secretariesMembers}
            onSelect={setSelected}
          />
        </div>
      </section>

      {/* ── Modal ─────────────────────────────────────────────── */}
      {selected && (
        <MemberModal
          member={selected}
          onClose={close}
          areaLabel={t.data.executiveAreas[selected.area] ?? selected.area}
        />
      )}
    </Layout>
  );
}
