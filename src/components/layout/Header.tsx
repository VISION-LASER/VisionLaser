import { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../../assets/vision-laser-logo.jpeg";
import BookingModal from "../user/Booking/BookingModal";

import spanishFlag from "../../assets/es.png";
import englishFlag from "../../assets/gb.png";
import frenchFlag  from "../../assets/fr.jpg";
import { useLanguage } from "../../contexts/LanguageContext";

const NAV = [
  { to: "/femtolasik",      label: "FEMTOLASIK" },
  { to: "/tprk",            label: "TPRK" },
  { to: "/equipements",     label: "ÉQUIPEMENTS" },
  { to: "/tarifs",          label: "TARIFS" },
  { to: "/defauts-visuels", label: "DÉFAUTS VISUELS" },
  { to: "/actu",            label: "ACTUALITÉS" },
] as const;

const LANGUAGES = [
  { code: "fr" as const, label: "FR", flag: frenchFlag  },
  { code: "en" as const, label: "EN", flag: englishFlag },
  { code: "es" as const, label: "ES", flag: spanishFlag },
];

export function Header() {
  const [open, setOpen]               = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [langDropOpen, setLangDropOpen] = useState(false); // ← dropdown state
  const dropdownRef = useRef<HTMLDivElement>(null);         // ← ref pour fermer au clic dehors

  const { lang: currentLang, setLang } = useLanguage();
  const activeLang = LANGUAGES.find((l) => l.code === currentLang) ?? LANGUAGES[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le dropdown si clic en dehors
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    //  AJOUT ICI (OUVERTURE MODAL DEPUIS QUIZ)
  useEffect(() => {
    const openModal = () => setBookingOpen(true);

    window.addEventListener("open-booking-modal", openModal);

    return () => {
      window.removeEventListener("open-booking-modal", openModal);
    };
  }, []);

  const handleLanguageChange = (langCode: "fr" | "en" | "es") => {
  if (langCode === "fr") {
    // 🇫🇷 Rafraîchit la page → revient à l'original français
    window.location.reload();
    return;
  }
  setLang(langCode); // 🇬🇧 🇪🇸 → déclenche Google Translate
  setLangDropOpen(false);
};

  return (
    <>
      <header className="sticky top-0 z-40">
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? "border-b border-border bg-white/95 shadow-[0_8px_30px_-20px_rgba(12,35,64,0.25)] backdrop-blur-sm"
              : "border-b border-border/50 bg-white/90 backdrop-blur-sm"
          }`}
        >
          <div className="container-page flex h-20 items-center justify-between">

            {/* Logo */}
            <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
              <img
                src={logo}
                alt="Vision Laser Hauts-de-France"
                width={64} height={64}
                className="h-16 w-16 rounded-full object-cover ring-2 ring-gold/30 transition-all duration-300 group-hover:scale-[1.04] group-hover:ring-gold/50"
              />
              <span className="hidden text-xs font-semibold tracking-tight text-navy sm:block">
                VISION-LASER <br />
                <span className="font-normal text-muted-foreground text-[11px]">HAUTS-DE-FRANCE</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-8 md:flex">
              {NAV.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    `nav-link relative text-xs font-medium transition-colors duration-200 hover:text-navy ${
                      isActive ? "is-active text-navy" : "text-navy/70 hover:text-navy"
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              ))}

              {/* ── Dropdown langue ── */}
              <div
                ref={dropdownRef}
                className="relative ml-2 border-l border-border/50 pl-4"
              >
                {/* Bouton déclencheur */}
                <button
                  onClick={() => setLangDropOpen((o) => !o)}
                  className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 transition-all duration-200 ${
                    langDropOpen ? "bg-gold/10 ring-1 ring-gold/30" : "hover:bg-navy/5"
                  }`}
                  aria-label="Changer la langue"
                  aria-expanded={langDropOpen}
                >
                  <img
                    src={activeLang.flag}
                    alt={`Drapeau ${activeLang.label}`}
                    className="h-5 w-6 rounded-sm object-cover shadow-sm"
                  />
                  <span className="text-xs font-medium text-gold">{activeLang.label}</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-navy/50 transition-transform duration-200 ${
                      langDropOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Menu déroulant */}
                {langDropOpen && (
                  <div className="absolute right-0 top-full mt-2 w-32 origin-top-right rounded-xl border border-border bg-white shadow-lg ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-xs font-medium transition-colors first:rounded-t-xl last:rounded-b-xl ${
                          currentLang === lang.code
                            ? "bg-gold/10 text-gold"
                            : "text-navy/70 hover:bg-navy/5 hover:text-navy"
                        }`}
                      >
                        <img
                          src={lang.flag}
                          alt={`Drapeau ${lang.label}`}
                          className="h-4 w-5 rounded-sm object-cover shadow-sm"
                        />
                        {lang.code === "fr" ? "Français"  :
                         lang.code === "en" ? "English"   :
                                              "Español"}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="btn-gold py-2.5 px-6 text-xs font-semibold shadow-sm hover:shadow-md transition-all duration-300"
              >
                PRENDRE RENDEZ-VOUS
              </button>
            </div>

            {/* Mobile burger */}
            <button
              className="md:hidden rounded-full border border-border bg-white/50 p-2 text-navy backdrop-blur-sm transition-all hover:bg-white hover:shadow-md"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile menu */}
          {open && (
            <div className="border-t border-border bg-white md:hidden">
              <div className="container-page flex flex-col py-4">
                {NAV.map((n) => (
                  <Link
                    key={n.to} to={n.to}
                    onClick={() => setOpen(false)}
                    className="border-b border-border/50 py-3 text-sm font-medium text-navy transition-colors last:border-0 hover:text-gold"
                  >
                    {n.label}
                  </Link>
                ))}

                {/* Sélecteur de langue mobile */}
                <div className="mt-4 flex items-center justify-start gap-2 border-t border-border/50 pt-4">
                  <span className="text-xs font-medium text-navy/60 mr-1">Langue :</span>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { handleLanguageChange(lang.code); setOpen(false); }}
                      className={`flex items-center gap-2 rounded-md px-2.5 py-2 transition-all ${
                        currentLang === lang.code
                          ? "bg-gold text-white"
                          : "bg-navy/5 text-navy hover:bg-navy/10"
                      }`}
                    >
                      <img src={lang.flag} alt={`Drapeau ${lang.label}`} className="h-4 w-5 rounded-sm object-cover" />
                      <span className="text-xs font-medium">{lang.label}</span>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => { setOpen(false); setBookingOpen(true); }}
                  className="btn-gold mt-4 text-center text-sm"
                >
                  PRENDRE RENDEZ-VOUS
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}