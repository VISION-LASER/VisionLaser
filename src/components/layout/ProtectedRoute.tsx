import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; 

interface Props { requiredRole: string; }

const ProtectedRoute = ({ requiredRole }: Props) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/admin" replace />;
  if (user?.role !== requiredRole) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;