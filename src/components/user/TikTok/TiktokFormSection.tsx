import React, { useState } from "react";
import { Check } from "lucide-react";
import { Reveal } from "../../layout/Reveal";

const TiktokFormSection: React.FC = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="form" className="px-5 pt-14">
      <Reveal>
        <div className="rounded-3xl border border-border bg-[color:var(--navy)] p-6 text-white">
          <p className="eyebrow">Bilan visuel gratuit</p>
          <h2 className="mt-3 text-2xl text-white">On te recontacte sous 48 h.</h2>
          <p className="mt-2 text-sm text-white/75">
            Quatre infos suffisent. Tu reçois une confirmation par email
            immédiatement.
          </p>

          {sent ? (
            <SuccessMessage />
          ) : (
            <ContactForm onSubmit={handleSubmit} />
          )}
        </div>
      </Reveal>
    </section>
  );
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const SuccessMessage: React.FC = () => (
  <div className="mt-6 rounded-2xl bg-white p-5 text-navy">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--gold-soft)]">
      <Check className="h-5 w-5 text-navy" />
    </div>
    <p className="mt-3 font-medium">Demande bien reçue.</p>
    <p className="mt-1 text-sm text-muted-foreground">
      Notre équipe te recontacte sous 48 h ouvrées.
    </p>
  </div>
);

interface ContactFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const inputClass =
  "rounded-xl bg-white/10 px-3.5 py-3 text-sm text-white placeholder:text-white/55 outline-none ring-1 ring-white/15 focus:ring-[color:var(--gold)]";

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => (
  <form className="mt-6 space-y-3" onSubmit={onSubmit}>
    <div className="grid grid-cols-2 gap-3">
      <input placeholder="Prénom" required className={inputClass} />
      <input placeholder="Nom" required className={inputClass} />
    </div>
    <input
      placeholder="Téléphone"
      type="tel"
      required
      className={`w-full ${inputClass}`}
    />
    <input
      placeholder="Email"
      type="email"
      required
      className={`w-full ${inputClass}`}
    />
    <label className="flex items-start gap-2 pt-1 text-[11px] text-white/70">
      <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded" />
      <span>
        J'accepte que mes données soient utilisées pour traiter ma demande,
        conformément au RGPD.
      </span>
    </label>
    <button type="submit" className="btn-gold w-full">
      Envoyer ma demande
    </button>
  </form>
);

export default TiktokFormSection;