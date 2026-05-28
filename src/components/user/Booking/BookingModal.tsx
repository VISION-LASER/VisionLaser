import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import BookingStep1 from "./BookingStep1";
import BookingStep2 from "./BookingStep2";
import BookingStep3 from "./BookingStep3";
import type { BookingState, PatientInfo } from "../../../types/booking";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

const EMPTY_PATIENT: PatientInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: "",
  motif: "",
  notes: "",
};

const STEP_LABELS = ["Informations", "Créneau", "Confirmation"];

const BookingModal: React.FC<BookingModalProps> = ({ open, onClose }) => {
  const [state, setState] = useState<BookingState>({
    step: 1,
    patient: EMPTY_PATIENT,
    selectedDate: null,
    selectedTime: null,
  });

  // Bloquer le scroll quand la modale est ouverte
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Fermer avec Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const reset = () =>
    setState({ step: 1, patient: EMPTY_PATIENT, selectedDate: null, selectedTime: null });

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300); // reset après l'animation de fermeture
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative w-full sm:max-w-lg bg-white sm:rounded-3xl overflow-hidden shadow-2xl"
        style={{ maxHeight: "95vh" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between border-b border-border px-6 py-4"
          style={{ background: "linear-gradient(135deg, #0C2340, #0f2e52)" }}
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "#C9A84C" }}>
              Centre Vision Laser
            </p>
            <p className="mt-0.5 text-sm font-semibold text-white">Prise de rendez-vous</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex border-b border-border bg-[color:var(--cream)]">
          {STEP_LABELS.map((label, i) => {
            const stepNum = (i + 1) as 1 | 2 | 3;
            const isActive = state.step === stepNum;
            const isDone = state.step > stepNum;
            return (
              <div
                key={label}
                className="flex flex-1 flex-col items-center py-3 gap-1 relative"
              >
                {/* Connector line */}
                {i < STEP_LABELS.length - 1 && (
                  <div
                    className="absolute right-0 top-1/2 h-px w-1/2 -translate-y-1/2"
                    style={{ background: isDone ? "#C9A84C" : "rgba(12,35,64,0.12)" }}
                  />
                )}
                {i > 0 && (
                  <div
                    className="absolute left-0 top-1/2 h-px w-1/2 -translate-y-1/2"
                    style={{ background: state.step > i ? "#C9A84C" : "rgba(12,35,64,0.12)" }}
                  />
                )}
                <div
                  className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold transition-all"
                  style={{
                    background: isDone ? "#C9A84C" : isActive ? "#0C2340" : "rgba(12,35,64,0.12)",
                    color: isDone || isActive ? "white" : "rgba(12,35,64,0.4)",
                  }}
                >
                  {isDone ? "✓" : stepNum}
                </div>
                <span
                  className="text-[10px] font-medium"
                  style={{ color: isActive ? "#0C2340" : "rgba(12,35,64,0.4)" }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step content */}
        <div className="overflow-y-auto p-6" style={{ maxHeight: "calc(95vh - 140px)" }}>
          {state.step === 1 && (
            <BookingStep1
              data={state.patient}
              onChange={patient => setState(s => ({ ...s, patient }))}
              onNext={() => setState(s => ({ ...s, step: 2 }))}
            />
          )}
          {state.step === 2 && (
            <BookingStep2
              selectedDate={state.selectedDate}
              selectedTime={state.selectedTime}
              onSelect={(date, time) => setState(s => ({ ...s, selectedDate: date, selectedTime: time }))}
              onNext={() => setState(s => ({ ...s, step: 3 }))}
              onBack={() => setState(s => ({ ...s, step: 1 }))}
            />
          )}
          {state.step === 3 && state.selectedDate && state.selectedTime && (
            <BookingStep3
              patient={state.patient}
              date={state.selectedDate}
              time={state.selectedTime}
              onBack={() => setState(s => ({ ...s, step: 2 }))}
              onDone={handleClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;