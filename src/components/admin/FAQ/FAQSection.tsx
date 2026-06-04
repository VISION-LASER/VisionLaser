import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, ChevronDown, ChevronUp, RefreshCw, X } from "lucide-react";
import { faqService } from "../../../services/faqService";
import type { FAQ, FAQFormData } from "../../../services/faqService";

const FAQSection: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState<FAQFormData>({
    question: "",
    reponse_faq: [""]  // ← Tableau de strings
  });
  const [submitting, setSubmitting] = useState(false);

  // Charger les FAQ
  const loadFaqs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await faqService.getAll();
      setFaqs(data);
    } catch (err) {
      setError("Impossible de charger les FAQ");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  // Ouvrir le modal d'ajout
  const handleAdd = () => {
    setEditingFaq(null);
    setFormData({ question: "", reponse_faq: [""] });  // ← Tableau avec une string vide
    setIsModalOpen(true);
  };

  // Ouvrir le modal de modification
  const handleEdit = (faq: FAQ) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      reponse_faq: faq.reponse_faq.length > 0 ? [...faq.reponse_faq] : [""]  // ← Tableau
    });
    setIsModalOpen(true);
  };

  // Ajouter une option de réponse
  const addAnswerOption = () => {
    setFormData(prev => ({
      ...prev,
      reponse_faq: [...prev.reponse_faq, ""]
    }));
  };

  // Supprimer une option de réponse
  const removeAnswerOption = (index: number) => {
    if (formData.reponse_faq.length <= 1) {
      setError("Il faut au moins une réponse");
      return;
    }
    setFormData(prev => ({
      ...prev,
      reponse_faq: prev.reponse_faq.filter((_, i) => i !== index)
    }));
  };

  // Mettre à jour une option de réponse
  const updateAnswerOption = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      reponse_faq: prev.reponse_faq.map((item, i) => i === index ? value : item)
    }));
  };

  // Supprimer une FAQ
  const handleDelete = async (id: number, question: string) => {
    if (window.confirm(`Supprimer la question "${question}" ?`)) {
      try {
        const success = await faqService.delete(id);
        if (success) {
          await loadFaqs();
          setOpenIndex(null);
        } else {
          setError("Erreur lors de la suppression");
        }
      } catch (err) {
        console.error("Erreur:", err);
        setError("Erreur lors de la suppression");
      }
    }
  };

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.question.trim()) {
      setError("La question est requise");
      return;
    }
    
    const validAnswers = formData.reponse_faq.filter(a => a && a.trim() !== "");
    if (validAnswers.length === 0) {
      setError("Au moins une réponse est requise");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const dataToSend = {
        question: formData.question,
        reponse_faq: validAnswers  // ← Envoyer le tableau de strings
      };
      
      if (editingFaq) {
        await faqService.update(editingFaq.id, dataToSend);
      } else {
        await faqService.create(dataToSend);
      }
      setIsModalOpen(false);
      await loadFaqs();
    } catch (err: any) {
      console.error("Erreur:", err);
      setError(err.message || "Erreur lors de l'enregistrement");
    } finally {
      setSubmitting(false);
    }
  };

  // Afficher les réponses dans l'accordéon
  const renderAnswers = (reponses: string[]) => {
    if (!reponses || reponses.length === 0) {
      return <p className="text-sm text-gray-500 italic">Aucune réponse</p>;
    }
    
    return (
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-500">Réponses possibles :</p>
        <ul className="space-y-1">
          {reponses.map((reponse, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="text-[#C9A84C] mt-0.5">•</span>
              <span>{reponse}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: "#0C2340" }}>
            Gestion de la FAQ
          </h2>
          <div className="w-12 h-0.5 mt-2 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Ajoutez, modifiez ou supprimez les questions fréquentes
            {!loading && faqs.length > 0 && (
              <span className="ml-2 text-xs sm:text-sm">
                ({faqs.length} question{faqs.length > 1 ? 's' : ''})
              </span>
            )}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={loadFaqs}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg transition-all hover:scale-105 disabled:opacity-50"
            style={{ backgroundColor: "#E5E7EB", color: "#0C2340" }}
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Rafraîchir
          </button>
          <button
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg transition-all hover:scale-105"
            style={{ backgroundColor: "#C9A84C", color: "#0C2340" }}
          >
            <Plus size={16} />
            Ajouter
          </button>
        </div>
      </div>

      {/* État de chargement */}
      {loading && (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2" style={{ borderColor: "#C9A84C" }} />
          <p className="mt-3 text-gray-500">Chargement des questions...</p>
        </div>
      )}

      {/* Message d'erreur */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-600 text-sm">{error}</p>
          <button
            onClick={loadFaqs}
            className="mt-2 text-sm underline"
            style={{ color: "#C9A84C" }}
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Aucune donnée */}
      {!loading && !error && faqs.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-500">Aucune question pour le moment</p>
          <button
            onClick={handleAdd}
            className="mt-4 flex items-center justify-center gap-2 mx-auto px-4 py-2 text-sm rounded-lg"
            style={{ backgroundColor: "#C9A84C", color: "#0C2340" }}
          >
            <Plus size={16} />
            Ajouter votre première question
          </button>
        </div>
      )}

      {/* Liste des FAQ */}
      {!loading && !error && faqs.length > 0 && (
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              <div 
                className="flex justify-between items-center p-4 sm:p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="font-semibold text-sm sm:text-base pr-2 flex-1" style={{ color: "#0C2340" }}>
                  {faq.question}
                </h3>
                <div className="flex items-center gap-2 shrink-0">
                  <button 
                    className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(faq);
                    }}
                    title="Modifier"
                  >
                    <Edit2 size={16} style={{ color: "#C9A84C" }} />
                  </button>
                  <button 
                    className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(faq.id, faq.question);
                    }}
                    title="Supprimer"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                  {openIndex === index ? 
                    <ChevronUp size={18} style={{ color: "#C9A84C" }} /> : 
                    <ChevronDown size={18} style={{ color: "#C9A84C" }} />
                  }
                </div>
              </div>
              {openIndex === index && (
                <div className="p-4 sm:p-5 pt-0 border-t border-gray-100">
                  {renderAnswers(faq.reponse_faq)}
                  <p className="text-xs text-gray-400 mt-3">
                    Dernière modification : {new Date(faq.updated_at).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal d'ajout/modification */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold" style={{ color: "#0C2340" }}>
                {editingFaq ? "Modifier la question" : "Ajouter une question"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Question */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#0C2340" }}>
                  Question *
                </label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
                  placeholder="Ex: Quels sont les défauts visuels que vous traitez ?"
                  required
                />
              </div>

              {/* Réponses multiples */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#0C2340" }}>
                  Réponses possibles *
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Ajoutez plusieurs options que les patients pourront choisir
                </p>
                
                <div className="space-y-3">
                  {formData.reponse_faq.map((reponse, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={reponse}
                          onChange={(e) => updateAnswerOption(idx, e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
                          placeholder={`Option ${idx + 1}`}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAnswerOption(idx)}
                        className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Supprimer cette option"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <button
                  type="button"
                  onClick={addAnswerOption}
                  className="mt-3 flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                  style={{ color: "#C9A84C" }}
                >
                  <Plus size={14} />
                  Ajouter une option
                </button>
                
                <p className="text-xs text-gray-400 mt-2">
                  {formData.reponse_faq.filter(a => a && a.trim() !== "").length} option(s) valide(s)
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 rounded-lg font-semibold transition-all hover:scale-[1.02] disabled:opacity-50"
                  style={{ backgroundColor: "#C9A84C", color: "#0C2340" }}
                >
                  {submitting ? "Enregistrement..." : (editingFaq ? "Modifier" : "Ajouter")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQSection;