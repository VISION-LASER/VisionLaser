import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [faqAnswers, setFaqAnswers] = useState<any>(null);
  
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

    // Chargement initial
    loadQuizAnswers();

    // Quand le quiz envoie de nouvelles réponses
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
        const offset = 92; // pixels au-dessus de l'élément
        const top =
          element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

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

    console.log("📤 Données envoyées:", data);

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
        // Effacer le localStorage après envoi réussi
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

  if (sent) {
    return (
      <div className="card-soft text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--gold-soft)]">
          <Check className="h-5 w-5 text-navy" />
        </div>
        <h3 className="mt-4 text-xl">Demande bien reçue</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Notre équipe vous recontacte sous 48 h ouvrées pour fixer votre bilan
          visuel.
        </p>
      </div>
    );
  }

  return (
    <form className="card-soft space-y-4" onSubmit={handleSubmit}>
      {!compact && (
        <div>
          <h3 className="text-xl">Contactez-nous</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Réponse personnalisée sous 48 h. Aucun engagement.
          </p>
        </div>
      )}

      {/* Affichage des réponses FAQ si elles existent */}
      {faqAnswers && faqAnswers.length > 0 && (
        <div className="rounded-lg border border-gold/20 bg-gold/5 p-4">
          <h4 className="mb-2 text-sm font-semibold text-navy uppercase tracking-wide">
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

      {/* Champ Nom et prénom - Pleine largeur */}
      <Field label="Nom et prénom" name="fullName" required />

      {/* Téléphone et Email - Côte à côte */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Téléphone" name="phone" type="tel" required />
        <Field label="Email" name="email" type="email" required={false} />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy">
          Message (optionnel)
        </label>
        <textarea
          name="message"
          rows={4}
          className="w-full rounded-lg border border-input bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-[color:var(--gold)]"
          placeholder="Précisez votre situation, vos questions…"
        />
      </div>

      <div className="space-y-3">
  <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
    Consentements requis <span className="text-[color:var(--gold)]">*</span>
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <label className="flex items-start gap-3 rounded-lg border border-input bg-gray-50 px-3.5 py-3 text-xs text-muted-foreground cursor-pointer">
      <input
        type="checkbox"
        required
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-input accent-[color:var(--gold)]"
      />
      <span>
        J'accepte d'être recontacté(e) par <strong className="text-navy">Vision Laser SAS</strong> dans le cadre de ma demande de bilan visuel.
      </span>
    </label>

    <label className="flex items-start gap-3 rounded-lg border border-input bg-gray-50 px-3.5 py-3 text-xs text-muted-foreground cursor-pointer">
      <input
        type="checkbox"
        required
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-input accent-[color:var(--gold)]"
      />
      <span>
        J'accepte le traitement de mes informations relatives à ma santé visuelle par{" "}
        <strong className="text-navy">Vision Laser SAS</strong>, conformément à sa{" "}
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
  </div>
</div>

      <button type="submit" className="btn-gold w-full" disabled={isLoading}>
        {isLoading ? "Envoi en cours..." : "Envoyer ma demande"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-navy"
      >
        {label}{" "}
        {required && <span className="text-[color:var(--gold)]">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-input bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-[color:var(--gold)]"
      />
    </div>
  );
}