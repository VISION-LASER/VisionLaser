import React from "react";
import { Reveal } from "../../layout/Reveal";
import { FEMTO_STEPS } from "../../../data/data";

const TiktokStepsSection: React.FC = () => (
  <section className="px-5 pt-14">
    <Reveal>
      <p className="eyebrow">FemtoLASIK</p>
      <h2 className="mt-3 text-2xl">L'opération en 4 étapes.</h2>
    </Reveal>

    <ol className="mt-6 space-y-4">
      {FEMTO_STEPS.map(({ icon: Icon, title, description }, idx) => (
        <Reveal key={title} delay={idx * 90}>
          <li className="flex gap-4 rounded-2xl border border-border bg-white p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[color:var(--cream)]">
              <Icon className="h-5 w-5 text-navy" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-semibold text-[color:var(--gold)]">
                  0{idx + 1}
                </span>
                <h3 className="text-base">{title}</h3>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            </div>
          </li>
        </Reveal>
      ))}
    </ol>
  </section>
);

export default TiktokStepsSection;