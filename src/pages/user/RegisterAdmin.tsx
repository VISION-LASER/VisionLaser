import React, { useState } from "react";
import { UserPlus, AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const RegisterAdmin: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    nom: "",
    prenoms: "",
    email: "",
    password: "",
    confirm_password: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (formData.password !== formData.confirm_password) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    const result = await register({
      role: "admin",
      nom: formData.nom,
      prenoms: formData.prenoms,
      email: formData.email,
      password: formData.password,
      confirm_password: formData.confirm_password
    });

    if (result.success) {
      setSuccess("Inscription réussie ! Redirection...");
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } else {
      setError(result.error || "Erreur lors de l'inscription");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 md:p-10">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#C9A84C" }}>
              Créer un compte
            </h2>
            <p className="text-sm mt-2" style={{ color: "#0C2340", opacity: 0.6 }}>
              Inscription administrateur
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-12 h-0.5 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200">
              <AlertCircle size={16} className="text-red-500 shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-green-50 border border-green-200">
              <CheckCircle size={16} className="text-green-500 shrink-0" />
              <p className="text-sm text-green-600">{success}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="nom" className="block text-sm font-medium mb-2" style={{ color: "#0C2340" }}>
                Nom
              </label>
              <input
                id="nom"
                type="text"
                required
                value={formData.nom}
                onChange={handleChange}
                className="appearance-none rounded-xl block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-[#C9A84C] transition-all"
                placeholder="Dupont"
              />
            </div>

            <div>
              <label htmlFor="prenoms" className="block text-sm font-medium mb-2" style={{ color: "#0C2340" }}>
                Prénoms
              </label>
              <input
                id="prenoms"
                type="text"
                required
                value={formData.prenoms}
                onChange={handleChange}
                className="appearance-none rounded-xl block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-[#C9A84C] transition-all"
                placeholder="Jean"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: "#0C2340" }}>
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-xl block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-[#C9A84C] transition-all"
                placeholder="admin@vision-laser.fr"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: "#0C2340" }}>
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-xl block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-[#C9A84C] transition-all"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="confirm_password" className="block text-sm font-medium mb-2" style={{ color: "#0C2340" }}>
                Confirmer le mot de passe
              </label>
              <input
                id="confirm_password"
                type="password"
                required
                value={formData.confirm_password}
                onChange={handleChange}
                className="appearance-none rounded-xl block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-[#C9A84C] transition-all"
                placeholder="••••••••"
              />
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 py-3 px-8 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#C9A84C", color: "#0C2340" }}
              >
                <UserPlus size={18} />
                {loading ? "Inscription..." : "S'inscrire"}
              </button>

              <Link
                to="/admin"
                className="text-center text-sm hover:underline transition-all"
                style={{ color: "#C9A84C" }}
              >
                Déjà un compte ? Se connecter
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterAdmin;