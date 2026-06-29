import React, { useState } from "react";
import { User, Mail, Phone, Calendar, ChevronRight, Check } from "lucide-react";
import { MOTIFS, type PatientInfo } from "../../../types/booking";

interface Step1Props {
  data: PatientInfo;
  onChange: (data: PatientInfo) => void;
  onNext: () => void;
}

const inputClass =
  "w-full rounded-xl border border-border bg-[color:var(--cream)] px-3 py-2 text-sm text-navy outline-none transition-all placeholder:text-navy/35 focus:border-navy focus:bg-white focus:ring-2 focus:ring-navy/10";

const BookingStep1: React.FC<Step1Props> = ({ data, onChange, onNext }) => {
  const set = (field: keyof PatientInfo) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => onChange({ ...data, [field]: e.target.value });

  const [rawFullName, setRawFullName] = useState(
    data.lastName ? `${data.firstName} ${data.lastName}` : data.firstName
  );

  const [selectedMotifs, setSelectedMotifs] = useState<string[]>(data.motif ? [data.motif] : []);
  const [consentContact, setConsentContact] = useState(false);
  const [consentSante, setConsentSante] = useState(false);

  const handleFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setRawFullName(raw);

    const spaceIndex = raw.indexOf(" ");
    if (spaceIndex === -1) {
      onChange({ ...data, firstName: raw, lastName: "" });
    } else {
      onChange({
        ...data,
        firstName: raw.slice(0, spaceIndex),
        lastName: raw.slice(spaceIndex + 1),
      });
    }
  };

  const toggleMotif = (motifValue: string) => {
    setSelectedMotifs(prev => {
      const newMotifs = prev.includes(motifValue)
        ? prev.filter(m => m !== motifValue)
        : [...prev, motifValue];
      onChange({ ...data, motif: newMotifs.length > 0 ? newMotifs[0] : "" });
      return newMotifs;
    });
  };

  const canProceed = consentContact && consentSante;

  const handleSubmit = () => {
    if (canProceed) onNext();
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="eyebrow">Étape 1 sur 3</p>
        <h2 className="mt-2 text-2xl font-semibold text-navy">Vos informations</h2>
      </div>

      {/* Nom complet */}
      <div className="relative">
        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/30" />
        <input
          type="text"
          value={rawFullName}
          onChange={handleFullName}
          placeholder="Nom et prénom *"
          className={`${inputClass} pl-10`}
        />
      </div>

      {/* Téléphone et Email */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/30" />
          <input
            type="tel"
            value={data.phone}
            onChange={set("phone")}
            placeholder="Téléphone *"
            className={`${inputClass} pl-10`}
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/30" />
          <input
            type="email"
            value={data.email}
            onChange={set("email")}
            placeholder="Email (optionnel)"
            className={`${inputClass} pl-10`}
          />
        </div>
      </div>

      {/* Date de naissance */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-navy/70">
          Date de naissance
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/30" />
          <input
            type="date"
            value={data.birthDate}
            onChange={set("birthDate")}
            className={`${inputClass} pl-10`}
          />
        </div>
      </div>

      {/* Motif de consultation */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-navy/70">
          Motif de consultation <span className="text-navy/40 font-normal">(optionnel)</span>
        </label>
        <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {MOTIFS.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => toggleMotif(m.value)}
              className={`
                flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                ${selectedMotifs.includes(m.value)
                  ? "bg-navy text-white shadow-md ring-2 ring-navy/20"
                  : "bg-[color:var(--cream)] text-navy/70 border border-border hover:border-navy/30 hover:bg-white"
                }
              `}
            >
              <span className="flex items-center gap-2">
                {selectedMotifs.includes(m.value) && <Check className="h-4 w-4" />}
                {m.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Double opt-in RGPD */}
      <div className="space-y-3">
        <div className="flex gap-3">
          {/* Consentement 1 — recontact */}
          <div
            className="flex cursor-pointer items-start gap-2 rounded-xl border border-border bg-[color:var(--cream)] px-3 py-2.5 transition-colors hover:bg-white flex-1"
            onClick={() => setConsentContact(!consentContact)}
          >
            <div
              className={`
                mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200
                ${consentContact ? "border-navy bg-navy text-white" : "border-border bg-white hover:border-navy/30"}
              `}
            >
              {consentContact && <Check className="h-3.5 w-3.5" />}
            </div>
            <span className="text-xs text-navy/80 leading-relaxed">
              J'accepte d'être recontacté(e) par{" "}
              <strong className="font-semibold text-navy">Vision Laser SAS</strong>{" "}
              dans le cadre de ma demande de bilan visuel.
            </span>
          </div>

          {/* Consentement 2 — données de santé */}
          <div
            className="flex cursor-pointer items-start gap-2 rounded-xl border border-border bg-[color:var(--cream)] px-3 py-2.5 transition-colors hover:bg-white flex-1"
            onClick={() => setConsentSante(!consentSante)}
          >
            <div
              className={`
                mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200
                ${consentSante ? "border-navy bg-navy text-white" : "border-border bg-white hover:border-navy/30"}
              `}
            >
              {consentSante && <Check className="h-3.5 w-3.5" />}
            </div>
            <span className="text-xs text-navy/80 leading-relaxed">
              J'accepte le traitement de mes informations relatives à ma santé visuelle par{" "}
              <strong className="font-semibold text-navy">Vision Laser SAS</strong>, conformément à sa{" "}
              <a 
                href="/politique-confidentialite"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[color:var(--gold)]"
                onClick={(e) => e.stopPropagation()}
              >
                politique de confidentialité
              </a>
              .
            </span>
          </div>
        </div>
      </div>

      {/* Bouton suivant */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!canProceed}
        className={`
          btn-gold w-full transition-all duration-200
          ${!canProceed && "opacity-50 cursor-not-allowed"}
        `}
      >
        Choisir un créneau
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default BookingStep1;