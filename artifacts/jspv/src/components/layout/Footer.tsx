import { Link } from "wouter";
import { SiInstagram, SiX } from "react-icons/si";
import { CONTACT } from "@/data/content";
import { useT } from "@/i18n/context";
import jseLogo from "@/assets/logos/jse.png";
import pspvLogo from "@/assets/logos/pspv-psoe.png";
import jspvLogo from "@assets/logo-jspv-removebg-preview_1781812576061.png";

export function Footer() {
  const { t } = useT();

  const navLinks = [
    { label: t.nav.nosaltres, href: "/partit" },
    { label: t.nav.actualitat, href: "/actualitat" },
    { label: t.nav.institucions, href: "/institucions" },
    { label: t.nav.campanyes, href: "/campanyes" },
  ];

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
              {t.footer.desc}
            </p>
          </div>

          {/* Navegació */}
          <nav aria-label={t.footer.navegacio}>
            <h2 className="font-display font-bold text-xs uppercase tracking-[0.18em] text-white/50 mb-5">
              {t.footer.navegacio}
            </h2>
            <ul className="space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/80 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/afiliat" className="text-white/80 hover:text-white transition-colors">
                  {t.nav.afiliat}
                </Link>
              </li>
              <li>
                <Link href="/contacte" className="text-white/80 hover:text-white transition-colors">
                  {t.nav.contacte}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contacte */}
          <div>
            <h2 className="font-display font-bold text-xs uppercase tracking-[0.18em] text-white/50 mb-5">
              {t.nav.contacte}
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
              {t.footer.institucional}
            </h2>
            <div className="flex flex-col gap-3">
              <div className="h-16 rounded-md bg-white flex items-center justify-center px-4">
                <img
                  src={jseLogo}
                  alt={t.footer.jseAlt}
                  className="max-h-10 w-auto object-contain"
                />
              </div>
              <div className="h-16 rounded-md bg-white flex items-center justify-center px-4">
                <img
                  src={pspvLogo}
                  alt={t.footer.pspvAlt}
                  className="max-h-11 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-white/55">
          <p>{t.footer.copyright}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><a href="#" className="hover:text-white transition-colors">{t.footer.avisLegal}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t.footer.privacitat}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t.footer.cookies}</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
