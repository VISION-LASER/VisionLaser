import { useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export function useGoogleTranslate() {
  const { lang } = useLanguage();

  // ── 1. Injecte le widget Google Translate une seule fois au montage ──
  useEffect(() => {
    if (document.getElementById("google-translate-script")) return;

    // Callback appelé par Google quand le script est prêt
    (window as any).googleTranslateInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "fr",
          includedLanguages: "en,es",
          autoDisplay: false,
        },
        "google-translate-container"
      );
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateInit";
    script.async = true;
    document.body.appendChild(script);
  }, []); // ← une seule fois

  // ── 2. Change la langue via le select caché de Google Translate ──
  useEffect(() => {
    // Attend que le widget soit prêt (il injecte un <select> dans le DOM)
    const applyLanguage = () => {
      const select = document.querySelector<HTMLSelectElement>(
        ".goog-te-combo"
      );

      if (!select) {
        // Widget pas encore prêt → réessaie dans 300ms
        setTimeout(applyLanguage, 300);
        return;
      }

      if (lang === "fr") {
        // Remet en français en sélectionnant la valeur vide
        select.value = "";
        select.dispatchEvent(new Event("change"));
      } else {
        select.value = lang; // "en" ou "es"
        select.dispatchEvent(new Event("change"));
      }
    };

    applyLanguage();
  }, [lang]); // ← se redéclenche à chaque changement de langue
}