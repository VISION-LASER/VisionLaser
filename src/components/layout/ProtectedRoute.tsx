interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  
  return <>{children}</>;
};

export default ProtectedRoute;