import { useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

function clearGoogTransCookie() {
  document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
}

export function useGoogleTranslate() {
  const { lang } = useLanguage();

  // ── 1. Injecte le widget + nettoie le cookie au montage ──
  useEffect(() => {
    clearGoogTransCookie();

    if (document.getElementById("google-translate-script")) return;

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
  }, []);

  // ── 2. Uniquement EN et ES → Google Translate ──
  // 🇫🇷 FR est géré directement dans le Header (reload)
  useEffect(() => {
    if (lang === "fr") return; // ← ne rien faire du tout

    const applyViaSelect = () => {
      const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (!select) {
        setTimeout(applyViaSelect, 300);
        return;
      }
      select.value = lang;
      select.dispatchEvent(new Event("change"));
    };

    applyViaSelect();
  }, [lang]);
}