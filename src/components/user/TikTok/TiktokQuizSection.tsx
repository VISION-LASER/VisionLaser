import React from "react";
import { Reveal } from "../../layout/Reveal";
import { Quiz } from "../../layout/Quiz";
const TiktokQuizSection: React.FC = () => (
  <section className="px-5 pt-14">
    <Reveal>
      <p className="eyebrow">Suis-je éligible&nbsp;?</p>
      <h2 className="mt-3 text-2xl">Quiz pédagogique en 3 questions.</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Aucun diagnostic n'est posé. Le quiz t'aide à comprendre.
      </p>
    </Reveal>

    <div className="mt-6">
      <Reveal delay={80}>
        <Quiz />
      </Reveal>
    </div>
  </section>
);

export default TiktokQuizSection;