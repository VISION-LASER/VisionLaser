import { useState } from "react";
import { Check } from "lucide-react";
import toast from 'react-hot-toast';

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);

  const formData = new FormData(e.currentTarget);
  const data = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    message: formData.get('message'),
  };

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/contact-patient`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      setSent(true);
      toast.success('Demande envoyée avec succès !', {
        position: 'bottom-right',
        duration: 4000,
      });
    } else {
      throw new Error(result.message || 'Erreur lors de l\'envoi');
    }
  } catch (error) {
    console.error('Erreur:', error);
    toast.error('Erreur lors de l\'envoi. Veuillez réessayer.', {
      position: 'bottom-right',
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
          Notre équipe vous recontacte sous 48 h ouvrées pour fixer votre bilan visuel.
        </p>
      </div>
    );
  }

  return (
    <form
      className="card-soft space-y-4"
      onSubmit={handleSubmit}
    >
      {!compact && (
        <div>
          <h3 className="text-xl">Contactez-nous</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Réponse personnalisée sous 48 h. Aucun engagement.
          </p>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Prénom" name="firstName" required />
        <Field label="Nom" name="lastName" required />
        <Field label="Téléphone" name="phone" type="tel" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy">Message (optionnel)</label>
        <textarea
          name="message"
          rows={4}
          className="w-full rounded-lg border border-input bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-[color:var(--gold)]"
          placeholder="Précisez votre situation, vos questions…"
        />
      </div>
      <label className="flex items-start gap-3 text-xs text-muted-foreground">
        <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-input" />
        <span>
          J'accepte que mes données soient utilisées pour traiter ma demande, conformément
          au RGPD. Aucune donnée n'est transmise à des tiers.
        </span>
      </label>
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
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-navy">
        {label} {required && <span className="text-[color:var(--gold)]">*</span>}
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