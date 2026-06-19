// import React, { useState } from "react";
// import { LogIn, AlertCircle } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";

// const LoginAdmin: React.FC = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     // Simule un léger délai (UX)
//     setTimeout(() => {
//       const success = login(email, password);
//       if (success) {
//         navigate("/admin/dashboard");
//       } else {
//         setError("Email ou mot de passe incorrect.");
//       }
//       setLoading(false);
//     }, 500);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 md:p-10">
//         <div className="space-y-6">

//           <div className="text-center">
//             <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#C9A84C" }}>
//               Administration
//             </h2>
//             <p className="text-sm mt-2" style={{ color: "#0C2340", opacity: 0.6 }}>
//               Centre Vision Laser des  
//             </p>
//           </div>

//           <div className="flex justify-center">
//             <div className="w-12 h-0.5 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
//           </div>

//           {/* Message d'erreur */}
//           {error && (
//             <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200">
//               <AlertCircle size={16} className="text-red-500 shrink-0" />
//               <p className="text-sm text-red-600">{error}</p>
//             </div>
//           )}

//           <form className="space-y-5" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: "#0C2340" }}>
//                 Adresse email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="appearance-none rounded-xl block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-[#C9A84C] transition-all"
//                 placeholder="admin@vision-laser.fr"
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: "#0C2340" }}>
//                 Mot de passe
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="appearance-none rounded-xl block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-[#C9A84C] transition-all"
//                 placeholder="••••••••"
//               />
//             </div>

//             <div className="flex justify-center">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex items-center gap-2 py-3 px-8 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] disabled:opacity-60 disabled:cursor-not-allowed"
//                 style={{ backgroundColor: "#C9A84C", color: "#0C2340" }}
//               >
//                 <LogIn size={18} />
//                 {loading ? "Connexion..." : "Se connecter"}
//               </button>
//             </div>

//             <p className="text-center text-xs" style={{ color: "#0C2340", opacity: 0.5 }}>
//               Accès réservé au personnel autorisé
//             </p>
//           </form>

//           <div className="text-center pt-4">
//             <p className="text-xs" style={{ color: "#0C2340", opacity: 0.4 }}>
//               © 2026 Centre Vision Laser des  
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginAdmin;

import React, { useState } from "react";
import { LogIn, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const LoginAdmin: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Appel au vrai backend
    const result = await login(email, password, "admin");

    if (result.success) {
      navigate("/admin/dashboard");
    } else {
      setError(result.error || "Email ou mot de passe incorrect.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 md:p-10">
        <div className="space-y-6">

          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#C9A84C" }}>
              Administration
            </h2>
            <p className="text-sm mt-2" style={{ color: "#0C2340", opacity: 0.6 }}>
              Centre Vision Laser des  
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-12 h-0.5 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200">
              <AlertCircle size={16} className="text-red-500 shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: "#0C2340" }}>
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-xl block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-[#C9A84C] transition-all"
                placeholder="••••••••"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 py-3 px-8 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#C9A84C", color: "#0C2340" }}
              >
                <LogIn size={18} />
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </div>

            <p className="text-center text-xs" style={{ color: "#0C2340", opacity: 0.5 }}>
              Accès réservé au personnel autorisé
            </p>
          </form>

          <div className="text-center pt-4">
            <p className="text-xs" style={{ color: "#0C2340", opacity: 0.4 }}>
              © 2026 Centre Vision Laser des  
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;