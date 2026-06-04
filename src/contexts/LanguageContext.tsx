import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Lang = "fr" | "en" | "es";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // ✅ Toujours "fr" au montage — le drapeau FR s'affiche après reload
  const [lang, setLangState] = useState<Lang>("fr");

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}