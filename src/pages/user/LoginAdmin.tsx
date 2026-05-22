import React from "react";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginAdmin: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirection directe vers le dashboard
    navigate("/admin/dashboard");
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* CardView blanc */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 md:p-10">
        <div className="space-y-6">
          
          {/* Titre */}
          <div className="text-center">
            <h2 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "#C9A84C" }}
            >
              Administration
            </h2>
            <p 
              className="text-sm mt-2"
              style={{ color: "#0C2340", opacity: 0.6 }}
            >
              Centre Vision Laser des Hauts-de-France
            </p>
          </div>

          {/* Séparateur décoratif */}
          <div className="flex justify-center">
            <div 
              className="w-12 h-0.5 rounded-full"
              style={{ backgroundColor: "#C9A84C" }}
            />
          </div>

          {/* Formulaire */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium mb-2"
                style={{ color: "#0C2340" }}
              >
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-[#C9A84C] transition-all duration-200"
                placeholder="exemple@vision-laser.fr"
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium mb-2"
                style={{ color: "#0C2340" }}
              >
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-[#C9A84C] transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Mot de passe oublié */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm hover:underline transition-all"
                style={{ color: "#C9A84C" }}
              >
                Mot de passe oublié ?
              </button>
            </div>

            {/* Bouton de connexion */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="group flex justify-center py-3 px-6 border border-transparent rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C9A84C]"
                style={{ 
                  backgroundColor: "#C9A84C",
                  color: "#0C2340",
                  boxShadow: "0 4px 14px 0 rgba(201, 168, 76, 0.25)"
                }}
              >
                <div className="flex items-center gap-2">
                  <LogIn size={18} />
                  <span>Se connecter</span>
                </div>
              </button>
            </div>

            {/* Accès réservé */}
            <div className="text-center mt-4">
              <p 
                className="text-xs"
                style={{ color: "#0C2340", opacity: 0.5 }}
              >
                Accès réservé au personnel autorisé
              </p>
            </div>
          </form>

          {/* Footer */}
          <div className="text-center pt-4">
            <p 
              className="text-xs"
              style={{ color: "#0C2340", opacity: 0.4 }}
            >
              © 2025 Centre Vision Laser des Hauts-de-France
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;