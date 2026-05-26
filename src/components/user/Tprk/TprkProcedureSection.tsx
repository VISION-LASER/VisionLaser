import React from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import eye from "../../../assets/eye.jpg";
import { TPRK_BENEFITS } from "../../../data/data";

const TprkProcedureSection: React.FC = () => {
  return (
    <section className="section">
      <div className="container-page grid gap-12 md:grid-cols-12">
        {/* Copy */}
        <div className="md:col-span-7">
          <h2>Une approche de surface, guidée par le laser.</h2>
          <p className="mt-4 text-muted-foreground">
            La TPRK (Trans-epithelial PhotoRefractive Keratectomy) consiste à
            corriger la vision en remodelant la couche superficielle de la
            cornée avec un laser excimer, sans création de volet cornéen. La
            récupération est plus progressive qu'en FemtoLASIK, mais la
            technique respecte une cornée naturellement plus fine.
          </p>

          <ul className="mt-8 space-y-4">
            {TPRK_BENEFITS.map((benefit) => (
              <li key={benefit} className="flex gap-3 text-sm">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--gold)]" />
                <span className="text-navy">{benefit}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm text-muted-foreground">
            Le choix entre FemtoLASIK et TPRK dépend uniquement de critères
            médicaux, évalués lors du bilan préopératoire.
          </p>

          <div className="mt-10">
            <Link to="/contact" className="btn-gold">
              Contactez-nous
            </Link>
          </div>
        </div>

        {/* Image */}
        <aside className="md:col-span-5">
          <img
            src={eye}
            alt="Œil humain"
            width={1600}
            height={1000}
            loading="lazy"
            className="aspect-[4/5] w-full rounded-3xl object-cover"
          />
        </aside>
      </div>
    </section>
  );
};

export default TprkProcedureSection;