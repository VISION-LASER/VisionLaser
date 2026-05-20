interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  
  return <>{children}</>;
};

export default ProtectedRoute;