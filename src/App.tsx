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
import DashboardAdminPage from "./pages/admin/DashboardAdminPage";
import ContactPage from "./pages/user/ContactPage";
import DefautsVisuelsPage from "./pages/user/DefautsVisuelsPage";
import EquipementsPage from "./pages/user/EquipementsPage";
import FemtoLasikPage from "./pages/user/FemtoLasikPage";
import TarifsPage from "./pages/user/TarifsPage";
import TprkPage from "./pages/user/TprkPage";
import NousTrouver from "./pages/user/NousTrouverPage";
import ActualitesPage from "./pages/user/ActualitésPage";
import CookieBanner from "./components/layout/CookieBanner";

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
              <Route path="/actu" element={<ActualitesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/defauts-visuels" element={<DefautsVisuelsPage />} />
              <Route path="/equipements" element={<EquipementsPage />} />
              <Route path="/femtolasik" element={<FemtoLasikPage />} />
              <Route path="/tarifs" element={<TarifsPage />} />
              <Route path="/tprk" element={<TprkPage />} />
              <Route path="/nous-trouver" element={<NousTrouver />} />
              {/*******************************
              *         Admin routes         *
              ********************************/}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute requiredRole="ADMIN">
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="" element={<DashboardAdminPage />} />

              </Route>

              {/*******************************
              *           404 routes         *
              ********************************/}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <CookieBanner />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
