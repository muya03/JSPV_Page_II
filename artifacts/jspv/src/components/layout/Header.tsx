import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useT } from "@/i18n/context";
import jspvLogo from "@assets/logo-jspv-removebg-preview_1781812576061.png";

function isActive(current: string, href: string) {
  const clean = current.replace(/\/+$/, "") || "/";
  if (href === "/") return clean === "/";
  return clean === href || clean.startsWith(href + "/");
}

export function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const { t, lang, setLang } = useT();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const navLinks = [
    { label: t.nav.nosaltres, href: "/partit" },
    { label: t.nav.actualitat, href: "/actualitat" },
    { label: t.nav.institucions, href: "/institucions" },
    { label: t.nav.campanyes, href: "/campanyes" },
  ];

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
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label={t.nav.ariaHome}
        >
          <img
            src={jspvLogo}
            alt="Joves Socialistes del País Valencià"
            className="h-11 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-7" aria-label={t.nav.ariaMain}>
          {navLinks.map((link) => {
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

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? t.nav.ariaClose : t.nav.ariaOpen}
          data-testid="button-mobile-menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="md:hidden border-t border-border bg-white"
          aria-label={t.nav.ariaMobile}
        >
          <ul className="container-page py-4 flex flex-col">
            {navLinks.map((link) => {
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
