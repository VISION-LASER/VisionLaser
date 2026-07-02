import { API_BASE_URL } from "../../config/api.config";

import { useState } from "react";
import {
  CheckCircle2,
  ShieldCheck,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { Header } from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

interface DevisFormData {
  civilite: string;
  nomPrenom: string;
  email: string;
  telephone: string;
}

export default function DevisPage() {
  const [formData, setFormData] = useState<DevisFormData>({
    civilite: "M.",
    nomPrenom: "",
    email: "",
    telephone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/devis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erreur lors de l'envoi");

      setIsSuccess(true);
      toast.success("Votre demande de devis a été envoyée !");
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <>
        <Header />
        <main className="mesh-bg min-h-screen flex items-center justify-center section">
          <div className="container-page">
            <div className="max-w-xl mx-auto text-center card-soft p-10 sm:p-14 fade-in">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-gold-soft)]">
                <CheckCircle2 className="h-9 w-9 text-[var(--color-gold)]" />
              </div>
              <h1 className="text-title-large mb-4">Merci pour votre demande !</h1>
              <p className="text-body text-muted-foreground mb-8">
                Notre équipe a bien reçu votre demande de devis. Nous reviendrons
                vers vous dans les plus brefs délais, généralement sous 24 à 48h ouvrées.
              </p>
              <a href="/" className="btn-primary">
                Retour à l'accueil
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main>

        {/* Formulaire + Info sidebar */}
        <section className="section m-1 p-1 bg-amber-50">
          <div className="container-page">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Formulaire */}
              <form
                onSubmit={handleSubmit}
                className="lg:col-span-2 card-soft p-6 sm:p-10 fade-in"
              >
                <h2 className="text-title mb-2">Votre demande</h2>
                <p className="text-body text-muted-foreground mb-8">
                  Les champs marqués d'un <span className="text-[var(--color-gold)]">*</span> sont obligatoires.
                </p>

                {/* Civilité */}
                <div className="mb-6">
                  <label className="text-subtitle text-sm mb-2 block">
                    Civilité <span className="text-[var(--color-gold)]">*</span>
                  </label>
                  <div className="flex gap-4">
                    {["M.", "Mme"].map((civ) => (
                      <label
                        key={civ}
                        className={`flex-1 cursor-pointer rounded-xl border px-4 py-3 text-center text-sm transition-all ${formData.civilite === civ
                            ? "border-[var(--color-gold)] bg-[var(--color-gold-soft)]"
                            : "border-[var(--color-border)]"
                          }`}
                      >
                        <input
                          type="radio"
                          name="civilite"
                          value={civ}
                          checked={formData.civilite === civ}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        {civ}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Nom & Prénom (champ unique) */}
                <div className="mb-6">
                  <label className="text-subtitle text-sm mb-2 block">
                    Nom et prénom <span className="text-[var(--color-gold)]">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="nomPrenom"
                    value={formData.nomPrenom}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-gold)]"
                    placeholder="Ex : Jean Dupont"
                  />
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label className="text-subtitle text-sm mb-2 block">
                    Adresse e-mail <span className="text-[var(--color-gold)]">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-gold)]"
                    placeholder="vous@exemple.com"
                  />
                </div>

                {/* Téléphone */}
                <div className="mb-8">
                  <label className="text-subtitle text-sm mb-2 block">
                    Numéro de téléphone <span className="text-[var(--color-gold)]">*</span>
                  </label>
                  <input
                    required
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-gold)]"
                    placeholder="06 12 34 56 78"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    "Envoyer ma demande de devis"
                  )}
                </button>
              </form>

              {/* Sidebar : texte explicatif */}
              <aside className="space-y-6">
                <div className="card-soft p-7 fade-in space-y-4">
                  <h3 className="text-subtitle mb-1">
                    Faites le point sur votre prise en charge mutuelle !
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Saviez-vous que votre mutuelle peut vous aider financièrement
                    pour une chirurgie réfractive ?
                  </p>

                  <p className="text-sm text-muted-foreground">
                    En effet, il est souvent plus avantageux pour elle de ne
                    plus rembourser lunettes et lentilles chaque année.
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Obtenez dès à présent un devis d'information tarifaire.
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Remplissez le formulaire en bas de la page, vous pouvez
                    demander un devis sans engagement.
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Ce document vous permettra d'interroger votre mutuelle sur
                    sa prise en charge.
                  </p>
                </div>

                <div className="rounded-2xl p-7 mesh-bg border border-[var(--color-border)] fade-in space-y-3">
                  <div className="eyebrow mb-2">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Important
                  </div>
                  <div className="flex gap-3 items-start">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5 text-[var(--color-gold)]" />
                    <p className="text-sm text-navy m-0">
                      Ce devis ne garantit en rien votre opérabilité : seule une
                      consultation préopératoire avec un spécialiste pourra
                      confirmer votre éligibilité à l'intervention.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
