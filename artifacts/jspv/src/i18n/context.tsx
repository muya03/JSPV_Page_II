import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { ca, type Translations } from "./ca";
import { es } from "./es";

type Lang = "ca" | "es";
const STORAGE_KEY = "jspv-lang";

interface LangCtx {
  t: Translations;
  lang: Lang;
  setLang: (l: Lang) => void;
}

const Ctx = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "ca" || stored === "es") return stored;
    } catch {
      // SSR / storage unavailable
    }
    return "ca";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch { /* noop */ }
  };

  useEffect(() => {
    document.documentElement.lang = lang === "ca" ? "ca" : "es";
  }, [lang]);

  const t = lang === "es" ? es : ca;
  return <Ctx.Provider value={{ t, lang, setLang }}>{children}</Ctx.Provider>;
}

export function useT() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useT must be used inside <LanguageProvider>");
  return ctx;
}
