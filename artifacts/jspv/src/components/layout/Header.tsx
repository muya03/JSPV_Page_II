import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Users, Clock, Lightbulb } from "lucide-react";
import { useT } from "@/i18n/context";
import jspvLogo from "@assets/logo-jspv-removebg-preview_1781812576061.png";

function isActive(current: string, href: string) {
  const clean = current.replace(/\/+$/, "") || "/";
  if (href === "/") return clean === "/";
  return clean === href || clean.startsWith(href + "/");
}

const NOSALTRES_SUB = (nav: { equip: string; historia: string; valors: string }) => [
  { href: "/partit/equip", label: nav.equip, Icon: Users },
  { href: "/partit/historia", label: nav.historia, Icon: Clock },
  { href: "/partit/valors", label: nav.valors, Icon: Lightbulb },
];

export function Header() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileNosaltres, setMobileNosaltres] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t, lang, setLang } = useT();

  useEffect(() => {
    setMobileOpen(false);
    setMobileNosaltres(false);
  }, [location]);

  const subLinks = NOSALTRES_SUB(t.nav);
  const nosaltresActive = isActive(location, "/partit");

  const LangSwitcher = ({ mobile = false }: { mobile?: boolean }) => (
    <div
      className={`flex items-center gap-0.5 ${mobile ? "border border-border rounded-md overflow-hidden" : ""}`}
      role="group"
      aria-label="Canvi d'idioma / Cambio de idioma"
    >
      <button
        type="button"
        onClick={() => setLang("ca")}
        aria-pressed={lang === "ca"}
        className={`font-display font-bold text-xs tracking-wide transition-colors px-2.5 py-1.5 ${
          mobile ? "flex-1" : "rounded-l-md border border-border"
        } ${
          lang === "ca"
            ? "bg-primary text-primary-foreground"
            : "bg-white text-foreground hover:bg-primary/10"
        }`}
      >
        CA
      </button>
      <button
        type="button"
        onClick={() => setLang("es")}
        aria-pressed={lang === "es"}
        className={`font-display font-bold text-xs tracking-wide transition-colors px-2.5 py-1.5 ${
          mobile ? "flex-1" : "rounded-r-md border border-border border-l-0"
        } ${
          lang === "es"
            ? "bg-primary text-primary-foreground"
            : "bg-white text-foreground hover:bg-primary/10"
        }`}
      >
        ES
      </button>
    </div>
  );

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-border border-t-4 border-t-primary">
      <div className="container-page flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" aria-label={t.nav.ariaHome}>
          <img
            src={jspvLogo}
            alt="Joves Socialistes del País Valencià"
            className="h-11 w-auto"
          />
        </Link>

        {/* ── Desktop nav ──────────────────────────────────────── */}
        <nav className="hidden md:flex items-center gap-7" aria-label={t.nav.ariaMain}>
          {/* Nosaltres with dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setDesktopDropdown(true)}
            onMouseLeave={() => setDesktopDropdown(false)}
          >
            <Link
              href="/partit"
              aria-current={nosaltresActive ? "page" : undefined}
              aria-haspopup="true"
              aria-expanded={desktopDropdown}
              className={`relative inline-flex items-center gap-1 font-display text-[0.95rem] font-semibold tracking-tight transition-colors py-1 ${
                nosaltresActive ? "text-primary" : "text-foreground hover:text-primary"
              }`}
            >
              {t.nav.nosaltres}
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={`transition-transform duration-200 ${desktopDropdown ? "rotate-180" : ""}`}
              />
              <span
                aria-hidden="true"
                className={`absolute left-0 -bottom-0.5 h-0.5 bg-primary transition-all duration-200 ${
                  nosaltresActive ? "w-full" : "w-0"
                }`}
              />
            </Link>

            {/* Dropdown panel */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 w-56 transition-all duration-150 ${
                desktopDropdown
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-1 pointer-events-none"
              }`}
              role="menu"
              aria-label={t.nav.nosaltres}
            >
              <div className="bg-white rounded-xl border border-border shadow-xl overflow-hidden">
                {/* Hub link */}
                <Link
                  href="/partit"
                  role="menuitem"
                  className="flex items-center gap-3 px-4 py-3 border-b border-border hover:bg-[hsl(var(--surface))] transition-colors group"
                >
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground text-[10px] font-display font-bold">↗</span>
                  </span>
                  <span className="font-display font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                    {t.nav.nosaltres}
                  </span>
                </Link>
                {/* Sub-links */}
                {subLinks.map(({ href, label, Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    role="menuitem"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[hsl(var(--surface))] transition-colors group last:pb-4"
                  >
                    <Icon
                      size={16}
                      aria-hidden="true"
                      className="text-primary shrink-0"
                    />
                    <span className="font-display font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                      {label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Other nav links */}
          {(
            [
              { label: t.nav.actualitat, href: "/actualitat" },
              { label: t.nav.institucions, href: "/institucions" },
              { label: t.nav.campanyes, href: "/campanyes" },
            ] as const
          ).map((link) => {
            const active = isActive(location, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative font-display text-[0.95rem] font-semibold tracking-tight transition-colors py-1 ${
                  active ? "text-primary" : "text-foreground hover:text-primary"
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 -bottom-0.5 h-0.5 bg-primary transition-all duration-200 ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}

          <div className="flex items-center gap-3 ml-1">
            <LangSwitcher />
            <Link
              href="/afiliat"
              data-testid="button-nav-afiliate"
              className="inline-flex items-center justify-center h-10 px-5 rounded-md bg-primary text-primary-foreground font-display font-bold text-sm tracking-tight hover:bg-primary/90 transition-colors"
            >
              {t.nav.afiliat}
            </Link>
          </div>
        </nav>

        {/* ── Mobile burger ────────────────────────────────────── */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 text-foreground"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? t.nav.ariaClose : t.nav.ariaOpen}
          data-testid="button-mobile-menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ── Mobile nav ───────────────────────────────────────────── */}
      {mobileOpen && (
        <nav
          id="mobile-nav"
          className="md:hidden border-t border-border bg-white"
          aria-label={t.nav.ariaMobile}
        >
          <ul className="container-page py-4 flex flex-col">
            {/* Nosaltres accordion */}
            <li>
              <div className="flex items-center border-b border-border">
                <Link
                  href="/partit"
                  aria-current={nosaltresActive ? "page" : undefined}
                  className={`flex-1 block py-3 font-display font-semibold ${
                    nosaltresActive ? "text-primary" : "text-foreground"
                  }`}
                >
                  {t.nav.nosaltres}
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileNosaltres((v) => !v)}
                  aria-expanded={mobileNosaltres}
                  className="p-3 text-muted-foreground"
                  aria-label="Desplegar submenú"
                >
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={`transition-transform duration-200 ${mobileNosaltres ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
              {mobileNosaltres && (
                <ul className="bg-[hsl(var(--surface))] border-b border-border">
                  {subLinks.map(({ href, label, Icon }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        aria-current={isActive(location, href) ? "page" : undefined}
                        className={`flex items-center gap-3 pl-6 pr-4 py-3 font-display font-semibold text-sm border-b border-border/50 last:border-0 ${
                          isActive(location, href) ? "text-primary" : "text-foreground"
                        }`}
                      >
                        <Icon size={15} aria-hidden="true" className="text-primary shrink-0" />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Other links */}
            {(
              [
                { label: t.nav.actualitat, href: "/actualitat" },
                { label: t.nav.institucions, href: "/institucions" },
                { label: t.nav.campanyes, href: "/campanyes" },
              ] as const
            ).map((link) => {
              const active = isActive(location, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`block py-3 font-display font-semibold border-b border-border ${
                      active ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}

            <li className="mt-4 flex flex-col gap-3">
              <LangSwitcher mobile />
              <Link
                href="/afiliat"
                className="inline-flex w-full items-center justify-center h-12 rounded-md bg-primary text-primary-foreground font-display font-bold"
              >
                {t.nav.afiliat}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
