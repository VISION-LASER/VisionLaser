import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthUser {
  email: string;
  role: "ADMIN";
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const ADMIN_EMAIL = "admin@vision-laser.fr";
const ADMIN_PASSWORD = "Admin2026!";

const AuthContext = createContext<AuthContextType | null>(null);

// Hook séparé — export nommé
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans AuthProvider");
  return ctx;
};

// Provider — export nommé aussi
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = sessionStorage.getItem("cvl_admin");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser: AuthUser = { email, role: "ADMIN" };
      setUser(adminUser);
      sessionStorage.setItem("cvl_admin", JSON.stringify(adminUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("cvl_admin");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};