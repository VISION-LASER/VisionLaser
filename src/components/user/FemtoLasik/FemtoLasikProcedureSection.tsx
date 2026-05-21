import React from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import laser from "../../../assets/laser-equipment.jpg";
import { FEMTO_BENEFITS } from "../../../data/data";

const FemtoLasikProcedureSection: React.FC = () => {
  return (
    <section className="section">
      <div className="container-page grid gap-12 md:grid-cols-12">
        {/* Copy */}
        <div className="md:col-span-7">
          <h2>Comment se déroule l'intervention&nbsp;?</h2>
          <p className="mt-4 text-muted-foreground">
            Le FemtoLASIK utilise un laser femtoseconde pour créer un volet
            cornéen ultra-fin, puis un laser excimer pour remodeler la cornée
            selon votre correction. L'intervention se déroule en ambulatoire,
            sous anesthésie locale, et dure quelques minutes par œil.
          </p>

          <ul className="mt-8 space-y-4">
            {FEMTO_BENEFITS.map((benefit) => (
              <li key={benefit} className="flex gap-3 text-sm">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--gold)]" />
                <span className="text-navy">{benefit}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm text-muted-foreground">
            Toutes les indications sont posées après un bilan médical complet.
            Aucune intervention n'est proposée sans validation des examens
            préopératoires.
          </p>

          <div className="mt-10">
            <Link to="/contact" className="btn-gold">
              Demander un bilan visuel gratuit
            </Link>
          </div>
        </div>

        {/* Image */}
        <aside className="md:col-span-5">
          <img
            src={laser}
            alt="Laser femtoseconde"
            width={1400}
            height={1000}
            loading="lazy"
            className="rounded-3xl object-cover"
          />
        </aside>
      </div>
    </section>
  );
};

export default FemtoLasikProcedureSection;