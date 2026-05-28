import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; 

interface Props { 
  requiredRole: string; 
}

const ProtectedRoute = ({ requiredRole }: Props) => {
  const { isAuthenticated, user, loading } = useAuth(); // Ajoutez loading

  // Gestion du chargement
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C9A84C]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  
  // ✅ Comparaison insensible à la casse
  if (user?.role?.toLowerCase() !== requiredRole.toLowerCase()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;