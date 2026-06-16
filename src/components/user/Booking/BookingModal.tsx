import React, { useState, useEffect, useRef } from "react";
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

const API_URL = import.meta.env.VITE_API_URL ?? "";

const BookingModal: React.FC<BookingModalProps> = ({ open, onClose }) => {
  const [state, setState] = useState<BookingState>({
    step: 1,
    patient: EMPTY_PATIENT,
    selectedDate: null,
    selectedTime: null,
  });

  const draftIdRef = useRef<number | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const { firstName, lastName, phone } = state.patient;

    console.log("🔍 useEffect déclenché:", { firstName, lastName, phone });

    const isReadyToSave =
      (firstName.trim() + lastName.trim()).length >= 2 &&
      phone.replace(/\s/g, "").length >= 6;

    console.log("✅ isReadyToSave:", isReadyToSave);
    console.log("🌐 API_URL:", API_URL);

    if (!isReadyToSave || !API_URL) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      console.log("📤 Envoi saveDraft...", { firstName, lastName, phone });
      try {
        const body = {
          firstName: state.patient.firstName,
          lastName: state.patient.lastName,
          phone: state.patient.phone,
          ...(draftIdRef.current ? { draftId: draftIdRef.current } : {}),
        };

        const response = await fetch(`${API_URL}/contact-patient/draft`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        console.log("📩 Réponse status:", response.status);
        const result = await response.json();
        console.log("📩 Réponse body:", result);

        if (result.data?.id) draftIdRef.current = result.data.id;
      } catch (err) {
        console.error("❌ Erreur fetch:", err);
      }
    }, 800);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [state.patient.firstName, state.patient.lastName, state.patient.phone]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const reset = () => {
    setState({ step: 1, patient: EMPTY_PATIENT, selectedDate: null, selectedTime: null });
    draftIdRef.current = null;
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white shadow-2xl overflow-hidden"
        style={{ borderRadius: "24px" }}
        onClick={e => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ background: "#0C2340" }}
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

        <div className="p-6">
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