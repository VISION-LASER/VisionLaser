import React from "react";
import { Check, Sparkles } from "lucide-react";
import { Reveal } from "../../layout/Reveal";
import { FEMTO_BENEFITS, TPRK_BENEFITS } from "../../../data/data";
interface TechCardProps {
  title: string;
  benefits: string[];
  muted?: boolean;
  delay?: number;
}

const TechCard: React.FC<TechCardProps> = ({ title, benefits, muted = false, delay = 0 }) => (
  <Reveal delay={delay}>
    <div
      className={`rounded-2xl border border-border p-5 ${
        muted ? "bg-[color:var(--cream)]" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-[color:var(--gold)]" />
        <h3 className="text-base">{title}</h3>
      </div>
      <ul className="mt-3 space-y-2 text-sm text-navy">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 text-[color:var(--gold)]" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  </Reveal>
);

const TiktokTechniquesSection: React.FC = () => (
  <section className="px-5 pt-14">
    <Reveal>
      <p className="eyebrow">Et la TPRK&nbsp;?</p>
      <h2 className="mt-3 text-2xl">Une autre voie, sans découpe.</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        La technique est choisie en fonction de tes critères médicaux — jamais
        de tes préférences.
      </p>
    </Reveal>

    <div className="mt-6 grid gap-4">
      <TechCard title="FemtoLASIK" benefits={FEMTO_BENEFITS} />
      <TechCard title="TPRK" benefits={TPRK_BENEFITS} muted delay={80} />
    </div>
  </section>
);

export default TiktokTechniquesSection;