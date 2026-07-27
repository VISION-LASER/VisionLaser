import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Shield,
  Clock,
  Star,
  Check,
  ChevronDown,
  User,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";

// Palette reprise du back-office (RendezvousSection) pour rester cohérent
const NAVY = "#0C2340";
const GOLD = "#C9A84C";

// Layout
import { Header } from "../../components/layout/Header";
import { Reveal } from "../../components/layout/Reveal";

// Éléments optionnels utiles sur une landing page pub (à garder ou retirer selon besoin)
import ExitIntentPopup from "../../components/user/Accueil/ExitIntentPopup";
import BookingModal from "../../components/user/Booking/BookingModal";

const TRUST = [
  { icon: Shield, text: "Données confidentielles" },
  { icon: Clock, text: "Réponse sous 48h" },
  { icon: Star, text: "Bilan" },
];

/**
 * LandingPage
 * ────────────────────────────────────────────────────────────
 * Page dédiée au trafic provenant de sources externes
 * (TikTok, Facebook Ads, Instagram, etc.).
 *
 * Tout est contenu dans ce seul fichier (header minimal, argumentaire,
 * formulaire avec ses consentements) — aucun composant partagé avec
 * le reste du site (ContactForm / LeadCaptureSection) n'est modifié
 * ni réutilisé, pour ne jamais impacter les autres pages.
 *
 * Règles spécifiques à cette page :
 * - Header sans menu de navigation ni bouton "PRENDRE RENDEZ-VOUS"
 *   (seul le sélecteur de langue reste visible → prop `minimal`)
 * - Pas de Footer affiché
 * - Consentements repliés (collapse) par défaut sur PC ; visibles
 *   normalement sur mobile
 * - Les 2 cases de consentement sont `required` : le navigateur affiche
 *   son message natif "Veuillez cocher cette case" si elles ne sont
 *   pas cochées à l'envoi.
 * - À l'envoi : si les cases ne sont pas cochées, la collapse (desktop)
 *   s'ouvre d'abord automatiquement pour révéler les cases, PUIS le
 *   message natif s'affiche dessus (le formulaire utilise `noValidate`
 *   + `reportValidity()` pour contrôler ce timing).
 * - Cases déjà cochées → envoi autorisé même collapse repliée.
 *
 * MAJ design :
 * - Chaque champ a désormais un <label htmlFor> explicite et visible,
 *   accompagné d'une icône, placé au-dessus du champ (jamais de
 *   placeholder utilisé seul comme label, pour rester accessible).
 * - Card du formulaire modernisée (ombre plus douce, coins arrondis,
 *   séparation visuelle claire entre les groupes de champs).
 * - Colonne de gauche retravaillée : eyebrow, titre, timeline, badges.
 */
const LandingPage: React.FC = () => {
  const [bookingOpen, setBookingOpen] = useState(false);

  // ── État du formulaire ──
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [faqAnswers, setFaqAnswers] = useState<any>(null);

  // ── Consentements ──
  const [consent1, setConsent1] = useState(false);
  const [consent2, setConsent2] = useState(false);
  const [consentOpen, setConsentOpen] = useState(false); // replié par défaut (desktop)
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const loadQuizAnswers = () => {
      const savedAnswers = localStorage.getItem("faq_answers");

      if (!savedAnswers) return;

      try {
        const parsed = JSON.parse(savedAnswers);

        if (Array.isArray(parsed)) {
          setFaqAnswers(parsed);
        }
      } catch (error) {
        console.error("Erreur lors du parsing des réponses FAQ:", error);
      }
    };

    loadQuizAnswers();

    window.addEventListener("faq-answers-updated", loadQuizAnswers);

    return () => {
      window.removeEventListener("faq-answers-updated", loadQuizAnswers);
    };
  }, []);

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);

      if (element) {
        // Offset plus important pour l'ancre du formulaire, pour bien le dégager
        const offset = location.hash === "#contact-form" ? 160 : 92; // pixels au-dessus de l'élément
        const top =
          element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = formRef.current ?? (e.currentTarget as HTMLFormElement);
    const consentValid = consent1 && consent2;

    // Si les consentements ne sont pas cochés, on ouvre d'abord la collapse
    // (desktop) pour que les cases soient visibles, PUIS on laisse le
    // navigateur afficher son message natif "requis" dessus.
    if (!consentValid) {
      setConsentOpen(true);
    }

    // On attend que le DOM soit à jour (collapse ouverte) avant de déclencher
    // la validation HTML native — sinon un champ requis encore masqué
    // ferait échouer la validation silencieusement, sans message.
    setTimeout(() => {
      if (!form.reportValidity()) return;
      // Cases cochées et formulaire valide : on replie la collapse (desktop)
      setConsentOpen(false);
      submitForm(form);
    }, 0);
  };

  const submitForm = async (form: HTMLFormElement) => {
    setIsLoading(true);

    const formData = new FormData(form);

    // Préparer les données FAQ - seulement si elles existent
    let faqToSend = null;
    if (faqAnswers && Array.isArray(faqAnswers) && faqAnswers.length > 0) {
      faqToSend = faqAnswers;
    }

    // Récupérer le nom complet et le séparer en prénom et nom
    const fullName = formData.get("fullName") as string;
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Récupérer l'email - NE PAS envoyer si vide
    const emailValue = formData.get("email") as string;
    const email = emailValue && emailValue.trim() !== "" ? emailValue : null;

    // Construire l'objet data - ne pas inclure faq si null
    const data: any = {
      firstName,
      lastName,
      phone: formData.get("phone"),
      email: email,
      message: formData.get("message"),
    };

    // Ajouter faq seulement s'il n'est pas null
    if (faqToSend) {
      data.faq = faqToSend;
    }

    console.log("📤 Données envoyées (landing page):", data);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/contact-patient`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setSent(true);
        toast.success("Demande envoyée avec succès !", {
          position: "bottom-right",
          duration: 4000,
        });
        localStorage.removeItem("faq_answers");
      } else {
        throw new Error(result.message || "Erreur lors de l'envoi");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.", {
        position: "bottom-right",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ── Contenu des 2 cases de consentement (réutilisé mobile + desktop) ──
  const consentCheckboxes = (
    <>
      <label
        htmlFor="consent1"
        className="flex items-start gap-3 rounded-lg border border-input bg-gray-50 px-3.5 py-3 text-xs text-muted-foreground cursor-pointer transition-colors hover:bg-gray-100"
      >
        <input
          id="consent1"
          type="checkbox"
          required
          checked={consent1}
          onChange={(e) => setConsent1(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-input accent-[color:var(--gold)]"
        />
        <span>
          J'accepte d'être recontacté(e) par{" "}
          <strong className="text-navy">Vision Laser SAS</strong> dans le
          cadre de ma demande de bilan visuel.
        </span>
      </label>

      <label
        htmlFor="consent2"
        className="flex items-start gap-3 rounded-lg border border-input bg-gray-50 px-3.5 py-3 text-xs text-muted-foreground cursor-pointer transition-colors hover:bg-gray-100"
      >
        <input
          id="consent2"
          type="checkbox"
          required
          checked={consent2}
          onChange={(e) => setConsent2(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-input accent-[color:var(--gold)]"
        />
        <span>
          J'accepte le traitement de mes informations relatives à ma santé
          visuelle par{" "}
          <strong className="text-navy">Vision Laser SAS</strong>,
          conformément à sa{" "}
          <a
            href="/politique-confidentialite"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[color:var(--gold)]"
          >
            politique de confidentialité
          </a>
          .
        </span>
      </label>
    </>
  );

  return (
    <>
      <Helmet>
        <title>Vision Laser · Bilan visuel gratuit</title>
        <meta
          name="description"
          content="Profitez d'un bilan visuel gratuit avec le Dr. Anthony Sion. Réponse sous 48h, sans engagement."
        />
      </Helmet>

      {/* Header minimal : logo + sélecteur de langue uniquement */}
      <Header minimal />

      <section
        id="bilan-gratuit"
        className="relative overflow-hidden pb-30 pt-18"
        style={{
          background:
            "radial-gradient(circle at 15% 0%, rgba(201,168,76,.10), transparent 45%), linear-gradient(135deg, #0C2340 0%, #0f2d50 100%)",
        }}
      >
        {/* Grain / accent décoratif discret, purement visuel */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "rgba(201,168,76,.10)" }}
        />

        <div className="container-page relative">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            {/* Gauche — argumentaire */}
            <Reveal>
              <div>
                <p className="eyebrow" style={{ color: "#C9A84C" }}>
                  Passez à l'action
                </p>
                <h2 className="mt-2 text-2xl md:text-3xl text-white font-semibold">
                  Votre bilan visuel vous attend.
                </h2>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">
                  En moins de 2 minutes, dites-nous qui vous êtes. Nous vous
                  rappelons pour organiser un bilan complet avec le
                  Dr. Anthony Sion — sans engagement, sans frais.
                </p>

                {/* Étapes */}
                <ol className="mt-6 space-y-3">
                  {[
                    {
                      n: "01",
                      title: "Vous remplissez ce formulaire",
                      sub: "2 minutes",
                    },
                    {
                      n: "02",
                      title: "Nous vous rappelons sous 48h",
                      sub: "À l'heure qui vous convient",
                    },
                    {
                      n: "03",
                      title: "Bilan personnalisé au centre",
                      sub: "1h, sans engagement",
                    },
                  ].map((s) => (
                    <li key={s.n} className="flex items-start gap-4">
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                        style={{
                          background: "rgba(201,168,76,.2)",
                          color: "#C9A84C",
                          border: "1px solid rgba(201,168,76,.3)",
                        }}
                      >
                        {s.n}
                      </span>
                      <div>
                        <p className="text-[14px] font-semibold text-white">
                          {s.title}
                        </p>
                        <p
                          className="text-[12px] mt-0.5"
                          style={{ color: "rgba(255,255,255,.45)" }}
                        >
                          {s.sub}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                {/* Trust badges */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {TRUST.map(({ icon: Icon, text }) => (
                    <div
                      key={text}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium"
                      style={{
                        background: "rgba(201,168,76,.12)",
                        color: "#C9A84C",
                        border: "1px solid rgba(201,168,76,.2)",
                      }}
                    >
                      <Icon size={11} />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <div id="contact-form" className="text-navy">
              {sent ? (
                <div className="card-soft text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--gold-soft)]">
                    <Check className="h-5 w-5 text-navy" />
                  </div>
                  <h3 className="mt-4 text-xl">Demande bien reçue</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Notre équipe vous recontacte sous 48 h ouvrées pour fixer
                    votre bilan visuel.
                  </p>
                </div>
              ) : (
                <form
                  id="lead-form"
                  ref={formRef}
                  noValidate
                  className="space-y-3 rounded-xl bg-white p-5 shadow-md border border-gray-100"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <p
                      className="text-[10px] font-semibold uppercase tracking-wide"
                      style={{ color: GOLD }}
                    >
                      Bilan visuel gratuit
                    </p>
                    <h3
                      className="mt-0.5 text-base font-semibold"
                      style={{ color: NAVY }}
                    >
                      Vos coordonnées
                    </h3>
                  </div>

                  {/* Affichage des réponses FAQ si elles existent */}
                  {faqAnswers && faqAnswers.length > 0 && (
                    <div className="rounded-lg border border-gold/20 bg-gold/5 p-3">
                      <h4 className="mb-2 text-xs font-semibold text-navy uppercase tracking-wide">
                        Vos réponses aux questions :
                      </h4>
                      <ul className="space-y-2 text-xs">
                        {faqAnswers.map((item: any, idx: number) => (
                          <li
                            key={idx}
                            className="border-b border-border/50 pb-2 last:border-0"
                          >
                            <span className="block font-medium text-navy">
                              {item.question}
                            </span>
                            <span className="text-muted-foreground">
                              {item.answer || "Pas de réponse"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Nom et prénom — icône intégrée, pas de label au-dessus */}
                  <div className="relative">
                    <label htmlFor="fullName" className="sr-only">
                      Nom et prénom
                    </label>
                    <User
                      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                      style={{ color: GOLD }}
                    />
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      placeholder="Nom et prénom *"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-[color:var(--gold)] focus:bg-white focus:ring-2 focus:ring-[color:var(--gold)]/20"
                    />
                  </div>

                  {/* Téléphone et Email */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="relative">
                      <label htmlFor="phone" className="sr-only">
                        Téléphone
                      </label>
                      <Phone
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                        style={{ color: GOLD }}
                      />
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="Téléphone *"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-[color:var(--gold)] focus:bg-white focus:ring-2 focus:ring-[color:var(--gold)]/20"
                      />
                    </div>
                    <div className="relative">
                      <label htmlFor="email" className="sr-only">
                        Email
                      </label>
                      <Mail
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                        style={{ color: GOLD }}
                      />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email (optionnel)"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-[color:var(--gold)] focus:bg-white focus:ring-2 focus:ring-[color:var(--gold)]/20"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label htmlFor="message" className="sr-only">
                      Message
                    </label>
                    <MessageSquare
                      className="pointer-events-none absolute left-3 top-3 h-4 w-4"
                      style={{ color: GOLD }}
                    />
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-[color:var(--gold)] focus:bg-white focus:ring-2 focus:ring-[color:var(--gold)]/20"
                      placeholder="Message (optionnel)"
                    />
                  </div>

                  {/* Consentements */}
                  <div>
                    {/* Mobile : toujours visibles, pas de collapse */}
                    <div className="md:hidden space-y-2">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
                        Consentements requis{" "}
                        <span style={{ color: GOLD }}>*</span>
                      </p>
                      {consentCheckboxes}
                    </div>

                    {/* Desktop : repliés par défaut dans une collapse */}
                    <div className="hidden md:block rounded-lg border border-gray-200 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setConsentOpen((o) => !o)}
                        className="flex w-full items-center justify-between px-3 py-2.5 text-[10px] uppercase tracking-wide font-medium text-muted-foreground bg-gray-50 hover:bg-gray-100 transition-colors"
                        aria-expanded={consentOpen}
                      >
                        <span>
                          Consentements requis{" "}
                          <span style={{ color: GOLD }}>*</span>
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                            consentOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          consentOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="space-y-2 p-3 pt-2.5">
                            {consentCheckboxes}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-lg py-2.5 text-sm font-semibold tracking-wide text-white transition hover:brightness-105 active:scale-[0.99] disabled:opacity-60"
                    style={{ backgroundColor: GOLD }}
                  >
                    {isLoading ? "Envoi en cours..." : "Envoyer ma demande"}
                  </button>

                  <p className="text-center text-[10px] text-muted-foreground">
                    Réponse garantie sous 48h ouvrées.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pas de <Footer /> sur cette page */}

      {/* Pop-up d'intention de sortie (optionnel, à retirer si non désiré) */}
      <ExitIntentPopup onOpenBooking={() => setBookingOpen(true)} />

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
};

export default LandingPage;