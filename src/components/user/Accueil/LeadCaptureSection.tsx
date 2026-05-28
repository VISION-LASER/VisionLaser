import React from "react";
import { Shield, Clock, Star } from "lucide-react";
import { Reveal } from "../../layout/Reveal";
import { ContactForm } from "../../layout/ContactForm";

const TRUST = [
  { icon: Shield, text: "Données confidentielles" },
  { icon: Clock, text: "Réponse sous 48h" },
  { icon: Star, text: "Bilan 100% gratuit" },
];

const LeadCaptureSection: React.FC = () => {

  return (
    <section
      id="bilan-gratuit"
      className="section"
      style={{ background: "linear-gradient(135deg, #0C2340 0%, #0f2d50 100%)" }}
    >
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">

          {/* Gauche — argumentaire */}
          <Reveal>
            <div>
              <p className="eyebrow" style={{ color: "#C9A84C" }}>Passez à l'action</p>
              <h2 className="mt-3 text-white">
                Votre bilan visuel gratuit vous attend.
              </h2>
              <p className="mt-5 text-white/70 leading-relaxed">
                En moins de 2 minutes, dites-nous qui vous êtes. Nous vous
                rappelons pour organiser un bilan complet et gratuit avec le
                Dr. Anthony Sion — sans engagement, sans frais.
              </p>

              {/* Étapes */}
              <ol className="mt-8 space-y-4">
                {[
                  { n: "01", title: "Vous remplissez ce formulaire", sub: "2 minutes" },
                  { n: "02", title: "Nous vous rappelons sous 48h", sub: "À l'heure qui vous convient" },
                  { n: "03", title: "Bilan personnalisé au centre", sub: "1h, gratuit et sans engagement" },
                ].map((s) => (
                  <li key={s.n} className="flex items-start gap-4">
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                      style={{ background: "rgba(201,168,76,.2)", color: "#C9A84C", border: "1px solid rgba(201,168,76,.3)" }}
                    >
                      {s.n}
                    </span>
                    <div>
                      <p className="text-[14px] font-semibold text-white">{s.title}</p>
                      <p className="text-[12px] mt-0.5" style={{ color: "rgba(255,255,255,.45)" }}>{s.sub}</p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Trust badges */}
              <div className="mt-8 flex flex-wrap gap-3">
                {TRUST.map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium"
                    style={{ background: "rgba(201,168,76,.12)", color: "#C9A84C", border: "1px solid rgba(201,168,76,.2)" }}
                  >
                    <Icon size={11} />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <div className="text-navy">
            <ContactForm compact />
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureSection;