import React, { useState } from "react";
import { Plus, Trash2, Edit2, ChevronDown, ChevronUp } from "lucide-react";

const FAQSection: React.FC = () => {
  const [faqs, setFaqs] = useState([
    { question: "L'opération est-elle douloureuse ?", reponse: "Non, l'opération est totalement indolore grâce à des collyres anesthésiants." },
    { question: "Quelle est la durée de l'opération ?", reponse: "L'opération dure environ 5 minutes pour les deux yeux." },
    { question: "Quand puis-je reprendre le travail ?", reponse: "La plupart des patients reprennent le travail dès le lendemain." },
  ]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#0C2340" }}>
          Gestion de la FAQ
        </h2>
        <div className="w-12 h-0.5 mt-2 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
        <p className="text-gray-500 mt-2">Ajoutez, modifiez ou supprimez les questions fréquentes</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div 
              className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <h3 className="font-semibold" style={{ color: "#0C2340" }}>{faq.question}</h3>
              <div className="flex items-center gap-3">
                <button 
                  className="p-1 rounded hover:bg-gray-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Edit2 size={16} style={{ color: "#C9A84C" }} />
                </button>
                <button 
                  className="p-1 rounded hover:bg-gray-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
                {openIndex === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </div>
            {openIndex === index && (
              <div className="p-5 pt-0 border-t border-gray-100">
                <p className="text-gray-600">{faq.reponse}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <button 
        className="w-full py-4 rounded-xl border-2 border-dashed transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
        style={{ borderColor: "#C9A84C", color: "#C9A84C" }}
      >
        <Plus size={20} />
        Ajouter une question
      </button>
    </div>
  );
};

export default FAQSection;