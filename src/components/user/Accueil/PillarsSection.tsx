import React from "react";
import { Reveal } from "../../layout/Reveal";
import { PILLARS } from "../../../data/data";

const PillarsSection: React.FC = () => {
  return (
    <section className="section">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">Notre engagement</p>
            <h2 className="mt-3">Une médecine de la vision, sans concession.</h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="card-soft h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--cream)]">
                  <Icon className="h-5 w-5 text-navy" />
                </div>
                <h3 className="mt-5">{title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;