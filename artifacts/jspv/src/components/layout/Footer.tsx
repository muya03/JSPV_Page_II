import { Link } from "wouter";
import { SiInstagram, SiX } from "react-icons/si";
import { NAV_LINKS, CONTACT } from "@/data/content";
import jseLogo from "@/assets/logos/jse.png";
import pspvLogo from "@/assets/logos/pspv-psoe.png";
import jspvLogo from "@assets/logo-jspv-removebg-preview_1781812576061.png";

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="container-page py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <img
                src={jspvLogo}
                alt="Joves Socialistes del País Valencià"
                className="h-14 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-sm leading-relaxed text-white/70 max-w-xs">
              Joves Socialistes del País Valencià. Organització juvenil del socialisme
              valencià, integrada en les Joventuts Socialistes d'Espanya.
            </p>
          </div>

          {/* Navegació */}
          <nav aria-label="Enllaços del peu">
            <h2 className="font-display font-bold text-xs uppercase tracking-[0.18em] text-white/50 mb-5">
              Navegació
            </h2>
            <ul className="space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/80 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/afiliat" className="text-white/80 hover:text-white transition-colors">
                  Afilia't
                </Link>
              </li>
              <li>
                <Link href="/contacte" className="text-white/80 hover:text-white transition-colors">
                  Contacte
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contacte */}
          <div>
            <h2 className="font-display font-bold text-xs uppercase tracking-[0.18em] text-white/50 mb-5">
              Contacte
            </h2>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-white transition-colors">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.organitzacio}`} className="hover:text-white transition-colors">
                  {CONTACT.organitzacio}
                </a>
              </li>
              <li className="text-white/60">{CONTACT.adreca}</li>
            </ul>
            <div className="flex items-center gap-3 mt-5">
              <a
                href={CONTACT.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${CONTACT.instagram.handle}`}
                className="inline-flex w-10 h-10 items-center justify-center rounded-md bg-white/10 hover:bg-primary transition-colors"
              >
                <SiInstagram size={18} aria-hidden="true" />
              </a>
              <a
                href={CONTACT.x.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`X ${CONTACT.x.handle}`}
                className="inline-flex w-10 h-10 items-center justify-center rounded-md bg-white/10 hover:bg-primary transition-colors"
              >
                <SiX size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Institucional */}
          <div>
            <h2 className="font-display font-bold text-xs uppercase tracking-[0.18em] text-white/50 mb-5">
              Institucional
            </h2>
            <div className="flex flex-col gap-3">
              <div className="h-16 rounded-md bg-white flex items-center justify-center px-4">
                <img
                  src={jseLogo}
                  alt="Joventuts Socialistes d'Espanya (JSE)"
                  className="max-h-10 w-auto object-contain"
                />
              </div>
              <div className="h-16 rounded-md bg-white flex items-center justify-center px-4">
                <img
                  src={pspvLogo}
                  alt="Partit Socialista del País Valencià (PSPV-PSOE)"
                  className="max-h-11 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-white/55">
          <p>© 2026 Joves Socialistes del País Valencià · Tots els drets reservats</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><a href="#" className="hover:text-white transition-colors">Avís Legal</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Política de Privacitat</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
