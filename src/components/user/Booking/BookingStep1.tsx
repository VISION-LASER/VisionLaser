import React, { useState } from "react";
import { User, Mail, Phone, Calendar, FileText, ChevronRight, Check } from "lucide-react";
import { MOTIFS, type PatientInfo } from "../../../types/booking";

interface Step1Props {
  data: PatientInfo;
  onChange: (data: PatientInfo) => void;
  onNext: () => void;
}

const inputClass =
  "w-full rounded-xl border border-border bg-[color:var(--cream)] px-4 py-3 text-sm text-navy outline-none transition-all placeholder:text-navy/35 focus:border-navy focus:bg-white focus:ring-2 focus:ring-navy/10";

const BookingStep1: React.FC<Step1Props> = ({ data, onChange, onNext }) => {
  const set = (field: keyof PatientInfo) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => onChange({ ...data, [field]: e.target.value });

  // State local qui garde exactement ce que l'utilisateur tape
  const [rawFullName, setRawFullName] = useState(
    data.lastName ? `${data.firstName} ${data.lastName}` : data.firstName
  );

  const [selectedMotifs, setSelectedMotifs] = useState<string[]>(data.motif ? [data.motif] : []);
  const [acceptConditions, setAcceptConditions] = useState(false);

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
      
      // Mettre à jour le data.motif avec le premier motif sélectionné ou vide
      onChange({ ...data, motif: newMotifs.length > 0 ? newMotifs[0] : "" });
      return newMotifs;
    });
  };

  const handleSubmit = () => {
    if (acceptConditions) {
      onNext();
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="eyebrow">Étape 1 sur 3</p>
        <h2 className="mt-2 text-2xl font-semibold text-navy">Vos informations</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Ces informations nous permettent de préparer votre dossier avant la consultation.
        </p>
      </div>

      {/* Ligne 1 : Nom complet seul */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-navy/70">
          Nom et prénom <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/30" />
          <input
            type="text"
            value={rawFullName}
            onChange={handleFullName}
            placeholder="Jean Dupont"
            className={`${inputClass} pl-10`}
          />
        </div>
      </div>

      {/* Ligne 2 : Téléphone et Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-navy/70">
            Téléphone <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/30" />
            <input
              type="tel"
              value={data.phone}
              onChange={set("phone")}
              placeholder="06 00 00 00 00"
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-navy/70">
            Email <span className="text-navy/40 font-normal">(optionnel)</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/30" />
            <input
              type="email"
              value={data.email}
              onChange={set("email")}
              placeholder="sophie@exemple.fr"
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>
      </div>

      {/* Ligne 3 : Date de naissance seul */}
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

      {/* Ligne 4 : Motif de consultation en 3 boutons */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-navy/70">
          Motif de consultation <span className="text-navy/40 font-normal">(optionnel)</span>
        </label>
        <div className="flex flex-wrap gap-3">
          {MOTIFS.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => toggleMotif(m.value)}
              className={`
                px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
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

      {/* Ligne 5 : Checkbox conditions */}
      <div className="flex items-start gap-3 pt-2">
        <button
          type="button"
          onClick={() => setAcceptConditions(!acceptConditions)}
          className={`
            mt-0.5 h-5 w-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0
            ${acceptConditions
              ? "bg-navy border-navy text-white"
              : "border-border bg-white hover:border-navy/30"
            }
          `}
        >
          {acceptConditions && <Check className="h-3.5 w-3.5" />}
        </button>
        <div>
          <label className="text-sm text-navy/80 cursor-pointer" onClick={() => setAcceptConditions(!acceptConditions)}>
            J'accepte les conditions générales d'utilisation
          </label>
          <p className="text-xs text-navy/50 mt-0.5">
            En cliquant sur ce bouton, vous acceptez que vos données soient traitées conformément à notre politique de confidentialité.
          </p>
        </div>
      </div>

      {/* Bouton avec condition */}
      <button 
        type="button" 
        onClick={handleSubmit}
        disabled={!acceptConditions}
        className={`
          btn-gold w-full transition-all duration-200
          ${!acceptConditions && "opacity-50 cursor-not-allowed"}
        `}
      >
        Choisir un créneau
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default BookingStep1;