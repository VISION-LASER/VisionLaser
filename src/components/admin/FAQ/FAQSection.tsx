// import React, { useState } from "react";
// import { Plus, Trash2, Edit2, ChevronDown, ChevronUp } from "lucide-react";

// const FAQSection: React.FC = () => {
//   const [faqs, setFaqs] = useState([
//     { question: "L'opération est-elle douloureuse ?", reponse: "Non, l'opération est totalement indolore grâce à des collyres anesthésiants." },
//     { question: "Quelle est la durée de l'opération ?", reponse: "L'opération dure environ 5 minutes pour les deux yeux." },
//     { question: "Quand puis-je reprendre le travail ?", reponse: "La plupart des patients reprennent le travail dès le lendemain." },
//   ]);
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   return (
//     <div className="space-y-6">
//       <div className="mb-6">
//         <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#0C2340" }}>
//           Gestion de la FAQ
//         </h2>
//         <div className="w-12 h-0.5 mt-2 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
//         <p className="text-gray-500 mt-2">Ajoutez, modifiez ou supprimez les questions fréquentes</p>
//       </div>

//       <div className="space-y-4">
//         {faqs.map((faq, index) => (
//           <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
//             <div 
//               className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50"
//               onClick={() => setOpenIndex(openIndex === index ? null : index)}
//             >
//               <h3 className="font-semibold" style={{ color: "#0C2340" }}>{faq.question}</h3>
//               <div className="flex items-center gap-3">
//                 <button 
//                   className="p-1 rounded hover:bg-gray-100"
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   <Edit2 size={16} style={{ color: "#C9A84C" }} />
//                 </button>
//                 <button 
//                   className="p-1 rounded hover:bg-gray-100"
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   <Trash2 size={16} className="text-red-500" />
//                 </button>
//                 {openIndex === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//               </div>
//             </div>
//             {openIndex === index && (
//               <div className="p-5 pt-0 border-t border-gray-100">
//                 <p className="text-gray-600">{faq.reponse}</p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       <button 
//         className="w-full py-4 rounded-xl border-2 border-dashed transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
//         style={{ borderColor: "#C9A84C", color: "#C9A84C" }}
//       >
//         <Plus size={20} />
//         Ajouter une question
//       </button>
//     </div>
//   );
// };

// export default FAQSection;

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, ChevronDown, ChevronUp, RefreshCw, X } from "lucide-react";
import { faqService } from "../../../services/faqService";
import type { FAQ, FAQFormData } from "../../../services/faqService";
import type { FAQ as FAQType } from "../../../services/faqService";

const FAQSection: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQType | null>(null);
  const [formData, setFormData] = useState<FAQFormData>({
    question: "",
    reponse_faq: ""
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
    setFormData({ question: "", reponse_faq: "" });
    setIsModalOpen(true);
  };

  // Ouvrir le modal de modification
  const handleEdit = (faq: FAQType) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      reponse_faq: faq.reponse_faq
    });
    setIsModalOpen(true);
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
    if (!formData.reponse_faq.trim()) {
      setError("La réponse est requise");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      if (editingFaq) {
        await faqService.update(editingFaq.id, formData);
      } else {
        await faqService.create(formData);
      }
      setIsModalOpen(false);
      await loadFaqs();
    } catch (err) {
      console.error("Erreur:", err);
      setError("Erreur lors de l'enregistrement");
    } finally {
      setSubmitting(false);
    }
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
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {faq.reponse_faq}
                  </p>
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
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#0C2340" }}>
                  Question *
                </label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
                  placeholder="Ex: L'opération est-elle douloureuse ?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#0C2340" }}>
                  Réponse *
                </label>
                <textarea
                  value={formData.reponse_faq}
                  onChange={(e) => setFormData({ ...formData, reponse_faq: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent resize-none"
                  placeholder="Réponse détaillée à la question..."
                  required
                />
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