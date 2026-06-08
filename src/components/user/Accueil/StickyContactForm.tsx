import React, { useState, useEffect } from "react";
import { Phone, Send, CheckCircle, AlertCircle, X, ChevronRight, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "33759507184"; // ← adapte
const WHATSAPP_MSG = encodeURIComponent("Bonjour, je souhaite obtenir des informations sur un bilan visuel.");
const CALENDLY_URL = "https://calendly.com/votre-lien"; // ← adapte

interface FormData { nomComplet: string; telephone: string; }

const StickyContactForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({ nomComplet: "", telephone: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [pulse, setPulse] = useState(false);

  // Pulse d'attention après 8s pour attirer l'œil
  useEffect(() => {
    const t = setTimeout(() => setPulse(true), 8000);
    return () => clearTimeout(t);
  }, []);

  const validate = () => {
    if (!formData.nomComplet.trim() || formData.nomComplet.trim().split(" ").length < 2) {
      setErrorMsg("Merci d'entrer votre nom et prénom.");
      return false;
    }
    if (!/^0[1-9]\d{8}$/.test(formData.telephone.replace(/\s/g, ""))) {
      setErrorMsg("Numéro invalide (10 chiffres).");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!validate()) { setStatus("error"); return; }
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 700));
    setStatus("success");
    setTimeout(() => {
      window.open(CALENDLY_URL, "_blank");
      setFormData({ nomComplet: "", telephone: "" });
      setStatus("idle");
      setIsOpen(false);
    }, 1500);
  };

  return (
    <>
      {/* ── DESKTOP : panneau latéral droit ──────────────────── */}
      <div className="hidden lg:flex flex-col items-end fixed right-0 top-1/2 -translate-y-1/2 z-40 gap-3">

        {/* Panneau formulaire */}
        <div
          className="flex transition-all duration-500 ease-in-out"
          style={{ transform: isOpen ? "translateX(0)" : "translateX(calc(100% - 44px))" }}
        >
          {/* Languette d'ouverture */}
          <button
            onClick={() => { setIsOpen((v) => !v); setPulse(false); }}
            className="flex flex-col items-center justify-center gap-2 w-11 shrink-0 rounded-l-xl py-5 transition-all"
            style={{
              background: isOpen ? "#0C2340" : "#C9A84C",
              color: isOpen ? "#C9A84C" : "#0C2340",
            }}
          >
            <ChevronRight
              size={16}
              className="transition-transform duration-300"
              style={{ transform: isOpen ? "rotate(0deg)" : "rotate(180deg)" }}
            />
            {!isOpen && (
              <span
                className="text-[10px] font-bold tracking-widest"
                style={{ writingMode: "vertical-rl", color: "#0C2340" }}
              >
                BILAN GRATUIT
              </span>
            )}
            {/* Pulse dot */}
            {pulse && !isOpen && (
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#0C2340" }} />
            )}
          </button>

          {/* Corps du formulaire */}
          <div
            className="w-72 bg-white shadow-2xl overflow-hidden"
            style={{ borderLeft: "none", border: "1px solid rgba(12,35,64,.08)", borderRight: "none" }}
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 px-6 gap-3 text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(201,168,76,.12)" }}>
                  <CheckCircle size={24} style={{ color: "#C9A84C" }} />
                </div>
                <p className="font-bold text-[15px]" style={{ color: "#0C2340" }}>Demande envoyée !</p>
                <p className="text-[12px]" style={{ color: "rgba(12,35,64,.5)" }}>
                  Redirection vers Calendly…
                </p>
              </div>
            ) : (
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-bold text-[15px] leading-tight" style={{ color: "#0C2340" }}>
                      Bilan visuel
                    </p>
                    <p className="text-[11px] mt-0.5" style={{ color: "rgba(12,35,64,.5)" }}>
                      Rappel sous 24h · Sans engagement
                    </p>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="p-1 rounded-lg hover:bg-black/5">
                    <X size={14} style={{ color: "rgba(12,35,64,.4)" }} />
                  </button>
                </div>

                {/* Séparateur doré */}
                <div className="h-px mb-4" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }} />

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold mb-1" style={{ color: "rgba(12,35,64,.6)" }}>
                      Nom et prénom
                    </label>
                    <input
                      type="text"
                      placeholder="Jean Dupont"
                      value={formData.nomComplet}
                      onChange={(e) => setFormData((p) => ({ ...p, nomComplet: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border text-[13px] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] transition-all"
                      style={{ borderColor: "#E2E8F0", background: "#F9FAFB" }}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold mb-1" style={{ color: "rgba(12,35,64,.6)" }}>
                      Téléphone
                    </label>
                    <div className="relative">
                      <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#C9A84C" }} />
                      <input
                        type="tel"
                        placeholder="06 12 34 56 78"
                        value={formData.telephone}
                        onChange={(e) => setFormData((p) => ({ ...p, telephone: e.target.value }))}
                        className="w-full pl-8 pr-3 py-2 rounded-lg border text-[13px] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] transition-all"
                        style={{ borderColor: "#E2E8F0", background: "#F9FAFB" }}
                      />
                    </div>
                  </div>

                  {status === "error" && errorMsg && (
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-red-50 border border-red-200">
                      <AlertCircle size={12} className="text-red-500 shrink-0" />
                      <p className="text-[11px] text-red-600">{errorMsg}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-semibold transition-all hover:scale-[1.01] disabled:opacity-60"
                    style={{ background: "#C9A84C", color: "#0C2340" }}
                  >
                    <Send size={13} />
                    {status === "sending" ? "Envoi…" : "Envoyer ma demande"}
                  </button>
                </form>

                {/* WhatsApp dans le panneau desktop aussi */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg text-[12px] font-medium border transition-all hover:scale-[1.01]"
                  style={{ borderColor: "#25D366", color: "#25D366" }}
                >
                  <MessageCircle size={13} />
                  Contacter sur WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── MOBILE : boutons flottants bas-droite ─────────────── */}
      <div className="lg:hidden fixed bottom-6 right-4 z-50 flex flex-col items-end gap-3">

        {/* Formulaire mobile — panel slide-up */}
        {isOpen && (
          <>
            <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setIsOpen(false)} />
            <div
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl bg-white shadow-2xl overflow-hidden"
              style={{ maxHeight: "90dvh" }}
            >
              {/* Poignée */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full" style={{ background: "rgba(12,35,64,.15)" }} />
              </div>

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 px-6 gap-3 text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(201,168,76,.12)" }}>
                    <CheckCircle size={28} style={{ color: "#C9A84C" }} />
                  </div>
                  <p className="font-bold text-[17px]" style={{ color: "#0C2340" }}>Demande envoyée !</p>
                  <p className="text-[13px]" style={{ color: "rgba(12,35,64,.5)" }}>
                    Redirection vers Calendly…
                  </p>
                </div>
              ) : (
                <div className="px-5 pb-8 pt-2">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-bold text-[17px]" style={{ color: "#0C2340" }}>Bilan visuel</p>
                      <p className="text-[12px] mt-0.5" style={{ color: "rgba(12,35,64,.5)" }}>
                        Rappel sous 24h · Sans engagement
                      </p>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-full hover:bg-black/5">
                      <X size={18} style={{ color: "rgba(12,35,64,.5)" }} />
                    </button>
                  </div>

                  <div className="h-px mb-5" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }} />

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[12px] font-semibold mb-1.5" style={{ color: "rgba(12,35,64,.6)" }}>
                        Nom et prénom
                      </label>
                      <input
                        type="text"
                        placeholder="Jean Dupont"
                        value={formData.nomComplet}
                        onChange={(e) => setFormData((p) => ({ ...p, nomComplet: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                        style={{ borderColor: "#E2E8F0", background: "#F9FAFB" }}
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold mb-1.5" style={{ color: "rgba(12,35,64,.6)" }}>
                        Téléphone
                      </label>
                      <div className="relative">
                        <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#C9A84C" }} />
                        <input
                          type="tel"
                          placeholder="06 12 34 56 78"
                          value={formData.telephone}
                          onChange={(e) => setFormData((p) => ({ ...p, telephone: e.target.value }))}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                          style={{ borderColor: "#E2E8F0", background: "#F9FAFB" }}
                        />
                      </div>
                    </div>

                    {status === "error" && errorMsg && (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200">
                        <AlertCircle size={14} className="text-red-500 shrink-0" />
                        <p className="text-[12px] text-red-600">{errorMsg}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14px] font-semibold transition-all hover:scale-[1.01] disabled:opacity-60"
                      style={{ background: "#C9A84C", color: "#0C2340" }}
                    >
                      <Send size={15} />
                      {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
                    </button>
                  </form>

                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-semibold border transition-all"
                    style={{ borderColor: "#25D366", color: "#25D366" }}
                  >
                    <MessageCircle size={15} />
                    Contacter sur WhatsApp
                  </a>
                </div>
              )}
            </div>
          </>
        )}

        {/* Bouton WhatsApp — toujours visible sur mobile */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 flex items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
          style={{
            width: "52px",
            height: "52px",
            background: "#25D366",
            color: "white",
            boxShadow: "0 4px 16px rgba(37,211,102,.4)",
          }}
          aria-label="Contacter sur WhatsApp"
        >
          <MessageCircle size={24} fill="white" stroke="none" />
        </a >

        {/* Bouton formulaire principal */}
        < button
          onClick={() => { setIsOpen(true); setPulse(false); }}
          className="flex items-center gap-2 px-4 h-14 rounded-full shadow-xl transition-all hover:scale-105 active:scale-95"
          style={{
            background: "#C9A84C",
            color: "#0C2340",
            boxShadow: "0 4px 20px rgba(201,168,76,.45)",
          }}
        >
          <Send size={18} />
          <span className="text-[13px] font-bold">Bilan gratuit</span>
          {
            pulse && (
              <span
                className="w-2 h-2 rounded-full animate-ping"
                style={{ background: "#0C2340", opacity: 0.7 }}
              />
            )
          }
        </button >
      </div >
    </>
  );
};

export default StickyContactForm;