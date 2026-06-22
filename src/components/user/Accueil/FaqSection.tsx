import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../../layout/Reveal";
import { Faq } from "../../layout/Faq";
import { FAQ } from "../../../data/data";

const FaqSection: React.FC = () => {
  return (
    <section className="py-2 bg-cream">
      <div className="container-page grid gap-12 md:grid-cols-12">
        {/* Left – heading */}
        <Reveal as="div" className="md:col-span-5">
          <p className="eyebrow">Questions fréquentes</p>
          <h2 className="mt-3">
            Tout ce que les patients nous demandent avant un bilan.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Vous ne trouvez pas votre question&nbsp;? Notre équipe y répond lors
            du bilan visuel, sans engagement.
          </p>
          <Link
            to="/contact"
            className="btn-ghost mt-8 inline-flex"
          >
            Poser une question <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        {/* Right – accordion */}
        <Reveal as="div" className="md:col-span-7" delay={120}>
          <Faq items={FAQ} />
        </Reveal>
      </div>
    </section>
  );
};

export default FaqSection;