import React from "react";
import { Reveal } from "../../layout/Reveal";
import { STEPS } from "../../../data/data";

const ProcessSection: React.FC = () => {
  return (
    <section className="bg-[color:var(--cream)] section">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">Le parcours patient</p>
            <h2 className="mt-3">
              Un parcours clair, du premier contact au dernier contrôle.
            </h2>
          </div>
        </Reveal>

        <ol className="mt-14 grid gap-6 md:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, description }, idx) => (
            <Reveal key={title} delay={idx * 100}>
              <li className="relative h-full rounded-2xl border border-border bg-white p-6">
                {/* Step number */}
                <span className="absolute right-5 top-5 text-xs font-semibold text-[color:var(--gold)]">
                  0{idx + 1}
                </span>
                <Icon className="h-6 w-6 text-navy" />
                <h3 className="mt-5 text-lg">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProcessSection;