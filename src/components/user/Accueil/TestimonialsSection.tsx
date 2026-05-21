import React from "react";
import { Quote } from "lucide-react";
import { Reveal } from "../../layout/Reveal";
import { TESTIMONIALS } from "../../../data/data";

const TestimonialsSection: React.FC = () => {
  return (
    <section className="section">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">Paroles de patients</p>
            <h2 className="mt-3">Ils ont franchi le pas.</h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map(({ name, age, text }, i) => (
            <Reveal key={name} delay={i * 90}>
              <figure className="card-soft h-full">
                <Quote className="h-5 w-5 text-[color:var(--gold)]" />
                <blockquote className="mt-4 text-sm leading-relaxed text-navy">
                  "{text}"
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
                  <span className="font-medium text-navy">{name}</span> · {age}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Témoignages anonymisés, recueillis avec le consentement des patients.
        </p>
      </div>
    </section>
  );
};

export default TestimonialsSection;