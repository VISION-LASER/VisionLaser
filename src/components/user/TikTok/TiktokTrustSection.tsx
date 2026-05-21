import React from "react";
import { Reveal } from "../../layout/Reveal";
import { TRUST_BADGES } from "../../../data/data";

const TiktokTrustSection: React.FC = () => (
  <section className="px-5 pt-12">
    <div className="grid grid-cols-3 gap-3 text-center">
      {TRUST_BADGES.map(({ title, subtitle }, i) => (
        <Reveal key={title} delay={i * 70}>
          <div className="rounded-2xl border border-border bg-[color:var(--cream)] p-4">
            <p className="text-sm font-medium text-navy">{title}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">{subtitle}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

export default TiktokTrustSection;