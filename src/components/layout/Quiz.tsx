import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { faqService } from "../../services/faqService";
import type { FAQ } from "../../services/faqService";

type QuizQuestion = {
  id: number;
  q: string;
  options: string[];
};

export function Quiz() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const buildFormattedAnswers = useCallback((answersToSave: string[]) =>
    questions.map((question, idx) => ({
      question: question.q,
      answer: answersToSave[idx] || ""
    })), [questions]);

  const loadQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await faqService.getPublicAll();
      const quizQuestions = data
        .filter((faq: FAQ) => faq.question?.trim() && faq.reponse_faq?.length > 0)
        .map((faq: FAQ) => ({
          id: faq.id,
          q: faq.question,
          options: faq.reponse_faq
        }));

      setQuestions(quizQuestions);
      setStep(0);
      setDone(false);
      setAnswers([]);
      localStorage.removeItem('faq_answers');
    } catch (err) {
      console.error("Erreur lors du chargement du quiz:", err);
      setError("Impossible de charger les questions du quiz.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadQuestions();
  }, [loadQuestions]);

  // Sauvegarder les réponses dans localStorage à chaque changement
  useEffect(() => {
    if (answers.length > 0 && questions.length > 0) {
      const formattedAnswers = buildFormattedAnswers(answers);
      localStorage.setItem('faq_answers', JSON.stringify(formattedAnswers));
      console.log('Quiz réponses sauvegardées:', formattedAnswers);
    }
  }, [answers, questions, buildFormattedAnswers]);

  const handleContactClick = () => {
    const formattedAnswers = buildFormattedAnswers(answers);
    localStorage.setItem("faq_answers", JSON.stringify(formattedAnswers));

    navigate("#contact-form");
  };

  const handleWatchAppClick = () => {
    const phoneNumber = "33612345678"; // À modifier
    const message = "Bonjour, j'ai effectué le quiz d'éligibilité et souhaite discuter avec un conseiller.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (done) {
    return (
      <div className="card-soft fade-in">
        <p className="eyebrow">Information pédagogique</p>
        <h3 className="mt-3">Seul un bilan médical peut vous répondre.</h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Sur la base de vos réponses, une consultation de bilan visuel vous permettrait
          d'obtenir une réponse précise de notre équipe. Aucun diagnostic ne peut être posé en ligne.
        </p>

        {/* Affichage du résumé des réponses / supprimer les grader question seulments */}
        {answers.length > 0 && (
          <div className="mt-4 rounded-lg bg-cream p-4">
            <h4 className="text-sm font-semibold text-navy mb-2"> Nous sommes là pour vous aider.</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {questions.map((question, idx) => (
                <li key={question.id}>
                  <span className="font-medium">{question.q}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Affichage du résumé des réponses */}
        {/* {answers.length > 0 && (
          <div className="mt-4 rounded-lg bg-cream p-4">
            <h4 className="text-sm font-semibold text-navy mb-2">Vos réponses :</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {questions.map((question, idx) => (
                <li key={question.id}>
                  <span className="font-medium">{question.q}</span> : {answers[idx] || "Non répondue"}
                </li>
              ))}
            </ul>
          </div>
        )} */}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleContactClick}
            className="btn-gold"
          >
            Contactez-nous
          </button>
          {/* <button
            type="button"
            onClick={handleWatchAppClick}
            className="btn-watchapp"
          >
            WhatsApp
          </button> */}
          {/* <button
            type="button"
            className="btn-ghost"
            onClick={() => { setStep(0); setDone(false); setAnswers([]); localStorage.removeItem('faq_answers'); }}
          >
            Recommencer
          </button> */}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="card-soft">
        <p className="eyebrow">Suis-je éligible ?</p>
        <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-2 w-1/2 animate-pulse rounded-full bg-[color:var(--gold)]" />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Chargement des questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card-soft">
        <p className="eyebrow">Suis-je éligible ?</p>
        <h3 className="mt-3">Les questions ne sont pas disponibles.</h3>
        <p className="mt-3 text-sm text-muted-foreground">{error}</p>
        <button  type="button" className="btn-gold mt-5" onClick={loadQuestions}>
          Réessayer
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="card-soft">
        <p className="eyebrow">Suis-je éligible ?</p>
        <h3 className="mt-3">Aucune question disponible pour le moment.</h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Ajoutez des questions et des réponses dans la gestion FAQ pour afficher le quiz.
        </p>
      </div>
    );
  }

  const current = questions[step];
  return (
    <div className="card-soft">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Question {step + 1} / {questions.length}</span>
        <span className="eyebrow !text-[10px]">Suis-je éligible ?</span>
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-1 rounded-full bg-[color:var(--gold)] transition-all duration-500"
          style={{ width: `${((step + 1) / questions.length) * 100}%` }}
        />
      </div>
      <h3 key={step} className="mt-6 fade-in">{current.q}</h3>
      <div className="mt-5 grid gap-3">
        {current.options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => {
              const next = [...answers.slice(0, step), opt];
              setAnswers(next);
              if (step + 1 >= questions.length) setDone(true);
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
          onClick={() => { setStep(step - 1); setAnswers(answers.slice(0, step - 1)); }}
        >
          <ArrowLeft className="h-3 w-3" /> Question précédente
        </button>
      )}
    </div>
  );
}
