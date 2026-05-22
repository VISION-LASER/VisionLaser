import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster } from "./components/ui/toaster";

// Autres Pages
import NotFound from "./components/layout/NotFound";
import ProtectedRoute from "./components/layout/ProtectedRoute";

// Public Pages
import HomePage from "./pages/user/HomePage";

// Admin Pages
import AdminLayout from "./components/layout/AdminLayout";
import ContactPage from "./pages/user/ContactPage";
import DefautsVisuelsPage from "./pages/user/DefautsVisuelsPage";
import EquipementsPage from "./pages/user/EquipementsPage";
import FemtoLasikPage from "./pages/user/FemtoLasikPage";
import TarifsPage from "./pages/user/TarifsPage";
import TprkPage from "./pages/user/TprkPage";
import NousTrouver from "./pages/user/NousTrouverPage";

// IMPORTANT : Importer votre page LoginAdmin
import LoginAdmin from "./pages/user/LoginAdmin";
import DashboardAdminPage from "./pages/admin/DashboardAdminPage";
import DashboardComponents from "./components/admin/DashboardComponents";


const queryClient = new QueryClient();

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/*******************************
              *         Public routes         *
              ********************************/}
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/defauts-visuels" element={<DefautsVisuelsPage />} />
              <Route path="/equipements" element={<EquipementsPage />} />
              <Route path="/femtolasik" element={<FemtoLasikPage />} />
              <Route path="/tarifs" element={<TarifsPage />} />
              <Route path="/tprk" element={<TprkPage />} />
              <Route path="/nous-trouver" element={<NousTrouver />} />
              <Route path="/admin" element={<LoginAdmin />} />
              {/*******************************
              *         Admin routes         *
              ********************************/}
              {/* <Route
                path="/admin/*"
                element={
                  <ProtectedRoute requiredRole="ADMIN">
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="" element={<DashboardAdminPage />} />
 
              </Route> */}

              {/*******************************
              *           404 routes         *
              ********************************/}
              <Route path="/admin/dashboard" element={<DashboardAdminPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
