import React, { useState } from 'react';
import { Phone, Send, CheckCircle, AlertCircle, X } from 'lucide-react';

interface FormData {
  nomComplet: string;
  telephone: string;
}

interface StickyContactFormProps {
  initiallyOpen?: boolean;
}

const StickyContactForm: React.FC<StickyContactFormProps> = ({ initiallyOpen = false }) => {
  const [formData, setFormData] = useState<FormData>({
    nomComplet: '',
    telephone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  // URL de redirection vers Calendly (à modifier selon votre lien)
  const CALENDLY_URL = 'https://calendly.com/votre-lien';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (submitStatus !== 'idle') setSubmitStatus('idle');
  };

  const validateForm = (): boolean => {
    if (!formData.nomComplet.trim()) {
      setErrorMessage('Veuillez entrer votre nom et prénom');
      return false;
    }
    if (formData.nomComplet.trim().split(' ').length < 2) {
      setErrorMessage('Veuillez entrer votre nom ET votre prénom');
      return false;
    }
    if (!formData.telephone.trim()) {
      setErrorMessage('Veuillez entrer votre numéro de téléphone');
      return false;
    }
    const phoneRegex = /^(0[1-9]\d{8})$/;
    if (!phoneRegex.test(formData.telephone.replace(/\s/g, ''))) {
      setErrorMessage('Veuillez entrer un numéro de téléphone valide (10 chiffres)');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Ici vous pouvez envoyer les données à votre backend si nécessaire
      // const response = await fetch('http://localhost:3000/api/contact/quick', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     nomComplet: formData.nomComplet,
      //     telephone: formData.telephone
      //   })
      // });
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSubmitStatus('success');
      
      setTimeout(() => {
        window.open(CALENDLY_URL, '_blank');
        setFormData({ nomComplet: '', telephone: '' });
        setSubmitStatus('idle');
        // Optionnel: fermer le formulaire après envoi sur mobile
        if (window.innerWidth < 1024) {
          setIsOpen(false);
        }
      }, 1000);
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Version mobile: bouton flottant qui ouvre le formulaire
  if (!isOpen) {
    return (
      <>
        {/* Bouton flottant pour mobile */}
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
          style={{ backgroundColor: '#C9A84C', color: '#0C2340' }}
        >
          <Send size={24} />
        </button>

        {/* Version desktop: formulaire toujours visible */}
        <div className="hidden lg:block fixed right-0 top-1/2 transform -translate-y-1/2 z-40">
          <div className="relative">
            <div 
              className="w-80 bg-white rounded-l-2xl shadow-2xl p-6"
              style={{ borderWidth: '1px', borderColor: '#E5E7EB', borderRight: 'none' }}
            >
              <h3 
                className="text-xl font-bold mb-2"
                style={{ color: '#0C2340' }}
              >
                Prenez rendez-vous
              </h3>
              <p 
                className="text-sm mb-5"
                style={{ color: '#0C2340', opacity: 0.6 }}
              >
                Un de nos spécialistes vous rappelle sous 24h
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label 
                    htmlFor="nomComplet" 
                    className="block text-xs font-medium mb-1"
                    style={{ color: '#0C2340', opacity: 0.7 }}
                  >
                    Nom et Prénom
                  </label>
                  <input
                    type="text"
                    id="nomComplet"
                    name="nomComplet"
                    value={formData.nomComplet}
                    onChange={handleChange}
                    placeholder="Jean Dupont"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent transition-all text-sm"
                    style={{ backgroundColor: '#F9FAFB' }}
                  />
                </div>

                <div>
                  <label 
                    htmlFor="telephone" 
                    className="block text-xs font-medium mb-1"
                    style={{ color: '#0C2340', opacity: 0.7 }}
                  >
                    Téléphone
                  </label>
                  <div className="relative">
                    <Phone 
                      size={16} 
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ color: '#C9A84C', opacity: 0.6 }}
                    />
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      placeholder="06 12 34 56 78"
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent transition-all text-sm"
                      style={{ backgroundColor: '#F9FAFB' }}
                    />
                  </div>
                </div>

                {submitStatus === 'error' && errorMessage && (
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-red-50 border border-red-200">
                    <AlertCircle size={14} className="text-red-500 shrink-0" />
                    <p className="text-xs text-red-600">{errorMessage}</p>
                  </div>
                )}

                {submitStatus === 'success' && (
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50 border border-green-200">
                    <CheckCircle size={14} className="text-green-500 shrink-0" />
                    <p className="text-xs text-green-600">
                      Demande envoyée ! Redirection...
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#C9A84C', color: '#0C2340' }}
                >
                  <Send size={16} />
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
                </button>

                <p 
                  className="text-center text-xs mt-3"
                  style={{ color: '#0C2340', opacity: 0.4 }}
                >
                  Réponse sous 24h • Sans engagement
                </p>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Version mobile: formulaire ouvert en plein écran
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 lg:hidden animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 animate-in slide-in-from-bottom-4 duration-300"
      >
        {/* Bouton fermeture */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={20} style={{ color: '#0C2340' }} />
        </button>

        <h3 
          className="text-xl font-bold mb-2 pr-6"
          style={{ color: '#0C2340' }}
        >
          Prenez rendez-vous
        </h3>
        <p 
          className="text-sm mb-5"
          style={{ color: '#0C2340', opacity: 0.6 }}
        >
          Un de nos spécialistes vous rappelle sous 24h
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="nomComplet-mobile" 
              className="block text-xs font-medium mb-1"
              style={{ color: '#0C2340', opacity: 0.7 }}
            >
              Nom et Prénom
            </label>
            <input
              type="text"
              id="nomComplet-mobile"
              name="nomComplet"
              value={formData.nomComplet}
              onChange={handleChange}
              placeholder="Jean Dupont"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent transition-all text-sm"
              style={{ backgroundColor: '#F9FAFB' }}
            />
          </div>

          <div>
            <label 
              htmlFor="telephone-mobile" 
              className="block text-xs font-medium mb-1"
              style={{ color: '#0C2340', opacity: 0.7 }}
            >
              Téléphone
            </label>
            <div className="relative">
              <Phone 
                size={16} 
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: '#C9A84C', opacity: 0.6 }}
              />
              <input
                type="tel"
                id="telephone-mobile"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                placeholder="06 12 34 56 78"
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent transition-all text-sm"
                style={{ backgroundColor: '#F9FAFB' }}
              />
            </div>
          </div>

          {submitStatus === 'error' && errorMessage && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-red-50 border border-red-200">
              <AlertCircle size={14} className="text-red-500 shrink-0" />
              <p className="text-xs text-red-600">{errorMessage}</p>
            </div>
          )}

          {submitStatus === 'success' && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50 border border-green-200">
              <CheckCircle size={14} className="text-green-500 shrink-0" />
              <p className="text-xs text-green-600">
                Demande envoyée ! Redirection...
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#C9A84C', color: '#0C2340' }}
          >
            <Send size={16} />
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
          </button>

          <p 
            className="text-center text-xs mt-3"
            style={{ color: '#0C2340', opacity: 0.4 }}
          >
            Réponse sous 24h • Sans engagement
          </p>
        </form>
      </div>
    </div>
  );
};

export default StickyContactForm;