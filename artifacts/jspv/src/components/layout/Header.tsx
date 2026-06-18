import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/data/content";

function isActive(current: string, href: string) {
  const clean = current.replace(/\/+$/, "") || "/";
  if (href === "/") return clean === "/";
  return clean === href || clean.startsWith(href + "/");
}

export function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
      <div className="container-page flex items-center justify-between h-16 md:h-20">
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="JSPV — Inici"
        >
          <span className="block w-1.5 h-8 bg-primary" aria-hidden="true" />
          <span className="font-display font-extrabold text-2xl tracking-tight text-foreground">
            JSPV
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Navegació principal">
          {NAV_LINKS.map((link) => {
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
          <Link
            href="/afiliat"
            data-testid="button-nav-afiliate"
            className="inline-flex items-center justify-center h-10 px-5 rounded-md bg-primary text-primary-foreground font-display font-bold text-sm tracking-tight hover:bg-primary/90 transition-colors"
          >
            Afilia't
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Tancar menú" : "Obrir menú"}
          data-testid="button-mobile-menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="md:hidden border-t border-border bg-white"
          aria-label="Navegació principal mòbil"
        >
          <ul className="container-page py-4 flex flex-col">
            {NAV_LINKS.map((link) => {
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
            <li>
              <Link
                href="/afiliat"
                className="mt-4 inline-flex w-full items-center justify-center h-12 rounded-md bg-primary text-primary-foreground font-display font-bold"
              >
                Afilia't
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
