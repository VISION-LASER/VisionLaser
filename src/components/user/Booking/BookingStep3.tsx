import React, { useState } from "react";
import { CheckCircle2, ChevronLeft, User, Mail, Phone, Calendar, Clock, FileText, Loader2 } from "lucide-react";
import type { PatientInfo } from "../../../types/booking";
import { MOTIFS } from "../../../types/booking";
import { submitAppointment } from "../../../services/BookingService";
import toast from 'react-hot-toast';

interface Step3Props {
  patient: PatientInfo;
  date: string;
  time: string;
  onBack: () => void;
  onDone: () => void;
}

const Row: React.FC<{ icon: React.ElementType; label: string; value: string }> = ({
  icon: Icon, label, value,
}) => (
  <div className="flex items-start gap-3">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--cream)]">
      <Icon className="h-3.5 w-3.5 text-navy" />
    </div>
    <div>
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-navy">{value}</p>
    </div>
  </div>
);

const BookingStep3: React.FC<Step3Props> = ({ patient, date, time, onBack, onDone }) => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const motifLabel = MOTIFS.find(m => m.value === patient.motif)?.label ?? patient.motif;

  const dateFormatted = new Date(date + "T12:00:00").toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      await submitAppointment(patient, date, time);
      setDone(true);
      // TOAST DE SUCCÈS
      toast.success('Rendez-vous confirmé avec succès !', {
        position: 'bottom-right',
        duration: 4000,
      });
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer ou nous contacter directement.");
      // TOAST D'ERREUR
      toast.error('Erreur lors de la confirmation du rendez-vous', {
        position: 'bottom-right',
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-8 w-8 text-emerald-500" />
        </div>
        <h2 className="mt-5 text-2xl font-semibold text-navy">Rendez-vous confirmé !</h2>
        <p className="mt-3 max-w-sm text-sm text-muted-foreground">
          Votre rendez-vous du <strong className="text-navy">{dateFormatted}</strong> à{" "}
          <strong className="text-navy">{time}</strong> est enregistré. Vous recevrez
          une confirmation par email à <strong className="text-navy">{patient.email}</strong>.
        </p>
        <button
          type="button"
          onClick={onDone}
          className="btn-gold mt-8"
        >
          Fermer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Étape 3 sur 3</p>
        <h2 className="mt-2 text-2xl font-semibold text-navy">Récapitulatif</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Vérifiez vos informations avant de confirmer.
        </p>
      </div>

      {/* Summary card */}
      <div className="rounded-2xl border border-border bg-[color:var(--cream)] p-6 space-y-4">
        {/* Date/time highlight */}
        <div className="rounded-xl border border-[color:var(--gold)]/30 bg-white px-5 py-4 text-center">
          <p className="text-[11px] uppercase tracking-widest text-[color:var(--gold)]">
            Votre rendez-vous
          </p>
          <p className="mt-1 text-lg font-semibold text-navy capitalize">{dateFormatted}</p>
          <p className="text-2xl font-bold text-navy">{time}</p>
        </div>

        <div className="h-px bg-border" />

        <Row icon={User}     label="Nom complet"    value={`${patient.firstName} ${patient.lastName}`} />
        <Row icon={Mail}     label="Email"          value={patient.email} />
        <Row icon={Phone}    label="Téléphone"      value={patient.phone} />
        {patient.birthDate && (
          <Row icon={Calendar} label="Date de naissance" value={new Date(patient.birthDate).toLocaleDateString("fr-FR")} />
        )}
        <Row icon={Clock}    label="Motif"          value={motifLabel} />
        {patient.notes && (
          <Row icon={FileText} label="Notes"        value={patient.notes} />
        )}
      </div>

      {error && (
        <p className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium text-navy hover:bg-[color:var(--cream)] transition-colors disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" /> Modifier
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={loading}
          className="btn-gold flex-1 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Enregistrement…
            </>
          ) : (
            "Confirmer le rendez-vous"
          )}
        </button>
      </div>
    </div>
  );
};

export default BookingStep3;