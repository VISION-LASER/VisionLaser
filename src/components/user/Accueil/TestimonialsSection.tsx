import React, { useState } from "react";
import { Quote, Play } from "lucide-react";
import { Reveal } from "../../layout/Reveal";
import { TESTIMONIALS } from "../../../data/data";
import type { Testimonial } from "../../../types/types";
import TiktokVideoModal from "../../layout/TiktokVideoModal";

const TestimonialsSection: React.FC = () => {
  const [active, setActive] = useState<Testimonial | null>(null);

  return (
    <section id="temoignages" className="section">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">Paroles de patients</p>
            <h2 className="mt-3">Ils ont franchi le pas.</h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <figure className="card-soft flex h-full flex-col">
                <Quote className="h-5 w-5 text-[color:var(--gold)]" />

                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-navy">
                  "{t.text}"
                </blockquote>

                <figcaption className="mt-5 border-t border-border pt-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-muted-foreground">
                      <span className="font-medium text-navy">{t.name}</span> · {t.age}
                    </span>

                    {t.videoUrl && (
                      <button
                        type="button"
                        onClick={() => setActive(t)}
                        className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-[11px] font-medium text-navy transition-colors hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
                        aria-label={`Voir le témoignage vidéo de ${t.name}`}
                      >
                        <Play className="h-3 w-3 fill-current" />
                        Voir la vidéo
                      </button>
                    )}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Témoignages anonymisés, recueillis avec le consentement des patients.
        </p>
      </div>

      {active && (
        <TiktokVideoModal
          testimonial={active}
          all={TESTIMONIALS}
          onClose={() => setActive(null)}
          onSelect={setActive}
        />
      )}
    </section>
  );
};

export default TestimonialsSection;