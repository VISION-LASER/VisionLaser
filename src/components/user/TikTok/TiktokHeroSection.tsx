import React from "react";
import { ArrowRight } from "lucide-react";
import laser from "../../../assets/laser-equipment.jpg";
import { Reveal } from "../../layout/Reveal";

const TiktokHeroSection: React.FC = () => (
  <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
    <img
      src={laser}
      alt="Laser AMARIS dans la salle d'opération"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-navy/40 to-navy/85" />

    <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-10 text-white">
      <Reveal>
        <p className="eyebrow">Hauts-de-France</p>
      </Reveal>

      <Reveal delay={100}>
        <h1 className="mt-3 text-3xl text-white">
          La vision laser,
          <span className="block" style={{ color: "var(--gold)" }}>
            comment ça marche&nbsp;?
          </span>
        </h1>
      </Reveal>

      <Reveal delay={180}>
        <p className="mt-4 text-sm text-white/85">
          Bilan visuel <strong className="text-white">gratuit</strong> en moins
          de 48 h. Aucun engagement, aucun diagnostic en ligne, juste une vraie
          réponse médicale.
        </p>
      </Reveal>

      <Reveal delay={260}>
        <a href="#form" className="btn-gold mt-6 w-full">
          Poser une question
          <ArrowRight className="h-4 w-4" />
        </a>
        <p className="mt-3 text-center text-[11px] text-white/70">
          Contenus médicaux validés par le Dr. Chemla
        </p>
      </Reveal>
    </div>
  </section>
);

export default TiktokHeroSection;