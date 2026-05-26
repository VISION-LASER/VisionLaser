import React from "react";
import { Reveal } from "../../layout/Reveal";
import { CTA_BENEFITS } from "../../../data/data";
import { ContactForm } from "../../layout/ContactForm";

const CtaSection: React.FC = () => {
  return (
    <section className="section pt-0">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-[color:var(--navy)] p-8 text-white md:p-14">
            {/* Decorative blobs */}
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[color:var(--gold)]/15 blur-3xl" />
            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

            <div className="relative grid gap-10 md:grid-cols-2">
              {/* Copy */}
              <div>
                <p className="eyebrow">Contactez-nous</p>
                <h2 className="mt-3 text-white">
                  Premier pas vers une vision nette.
                </h2>
                <p className="mt-5 text-white/75">
                  Un bilan complet et sans engagement pour évaluer si la
                  chirurgie réfractive est adaptée à votre vision. Réponse
                  personnalisée sous 48 h.
                </p>

                <ul className="mt-6 space-y-2 text-sm text-white/80">
                  {CTA_BENEFITS.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-[color:var(--gold)]" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Form */}
              <div className="text-navy">
                <ContactForm compact />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CtaSection;