import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const QUESTIONS = [
  {
    q: "Quel défaut visuel souhaitez-vous corriger ?",
    options: ["Myopie", "Astigmatisme", "Hypermétropie", "Presbytie"],
  },
  {
    q: "Quelle est votre tranche d'âge ?",
    options: ["Moins de 18 ans", "18 – 40 ans", "40 – 60 ans", "Plus de 60 ans"],
  },
  {
    q: "Portez-vous des lentilles ?",
    options: ["Oui, rigides", "Oui, souples", "Non"],
  },
] as const;

export function Quiz() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);

  if (done) {
    return (
      <div className="card-soft fade-in">
        <p className="eyebrow">Information pédagogique</p>
        <h3 className="mt-3">Seul un bilan médical peut vous répondre.</h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Sur la base de vos réponses, une consultation de bilan visuel gratuit vous permettrait
          d'obtenir une réponse précise de notre équipe. Aucun diagnostic ne peut être posé en ligne.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/contact" className="btn-gold">Demander un bilan gratuit</Link>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => { setStep(0); setDone(false); setAnswers([]); }}
          >
            Recommencer
          </button>
        </div>
      </div>
    );
  }

  const current = QUESTIONS[step];
  return (
    <div className="card-soft">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Question {step + 1} / {QUESTIONS.length}</span>
        <span className="eyebrow !text-[10px]">Suis-je éligible&nbsp;?</span>
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-1 rounded-full bg-[color:var(--gold)] transition-all duration-500"
          style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
        />
      </div>
      <h3 key={step} className="mt-6 fade-in">{current.q}</h3>
      <div className="mt-5 grid gap-3">
        {current.options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => {
              const next = [...answers, opt];
              setAnswers(next);
              if (step + 1 >= QUESTIONS.length) setDone(true);
              else setStep(step + 1);
            }}
            className="group flex items-center justify-between rounded-xl border border-border bg-white px-5 py-4 text-left text-sm text-navy transition-all hover:-translate-y-0.5 hover:border-[color:var(--gold)] hover:bg-[color:var(--cream)]"
          >
            <span>{opt}</span>
            <span className="text-[color:var(--gold)] opacity-0 transition-opacity group-hover:opacity-100">→</span>
          </button>
        ))}
      </div>
      {step > 0 && (
        <button
          type="button"
          className="mt-5 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-navy"
          onClick={() => { setStep(step - 1); setAnswers(answers.slice(0, -1)); }}
        >
          <ArrowLeft className="h-3 w-3" /> Question précédente
        </button>
      )}
    </div>
  );
}
