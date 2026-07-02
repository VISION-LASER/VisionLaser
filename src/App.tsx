import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./hooks/useAuth";
import { Toaster as HotToaster } from 'react-hot-toast';

import { LanguageProvider } from "./contexts/LanguageContext";
import { useGoogleTranslate } from "./hooks/useGoogleTranslate";

// Layout & guards
import NotFound from "./components/layout/NotFound";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import CookieBanner from "./components/layout/CookieBanner";
import AdminLayout from "./components/layout/AdminLayout";

// Public pages
import HomePage from "./pages/user/HomePage";
import ContactPage from "./pages/user/ContactPage";
import DefautsVisuelsPage from "./pages/user/DefautsVisuelsPage";
import EquipementsPage from "./pages/user/EquipementsPage";
import FemtoLasikPage from "./pages/user/FemtoLasikPage";
import TarifsPage from "./pages/user/TarifsPage";
import TprkPage from "./pages/user/TprkPage";
import NousTrouver from "./pages/user/NousTrouverPage";
import ActualitesPage from "./pages/user/ActualitésPage";
import LoginAdmin from "./pages/user/LoginAdmin";
import RegisterAdmin from "./pages/user/RegisterAdmin";

// Admin sections
import TableauBordSection from "./components/admin/TableauDeBoard/TableauBordSection";
import DemandesSection from "./components/admin/Demandes/DemandesSection";
import TarifsSection from "./components/admin/Tarifs/TarifsSection";
import EquipementsSection from "./components/admin/Equipements/EquipementsSection";
import ActualiteSection from "./components/admin/Actualite/ActualiteSection";
import HorairesSection from "./components/admin/Horaires/HorairesSection";
import FAQSection from "./components/admin/FAQ/FAQSection";
import AproposSection from "./components/admin/Apropos/AproposSection";
import RendezvousSection from "./components/admin/Rendez-vous/RendezvousSection";
import NotificationSection from "./components/admin/Notification/NotificationSection";
import BlogPage from "./pages/user/BlogPage";
import { useAnalytics } from "./hooks/useAnalytics";
import ScrollToTop from "./components/layout/ScrollToTop";
import MentionLegalesPage from "./pages/user/MentionLegalesPage";
import PolitiqueConfidentialitePage from "./pages/user/PolitiqueConfidentialitePage";
import CGVPage from "./pages/user/CGVPage";
import OffresPage from "./pages/user/OffrePage";
import FloatingDevisButton from "./components/layout/FloatingDevisButton";
import DevisPage from "./pages/user/DevisPage";
import { DevisSection } from "./components/admin/Devis/DevisSection";


const queryClient = new QueryClient();

function AnalyticsTracker() {
  useAnalytics();
  return null;
}

function AppContent() {
  useGoogleTranslate();
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <HotToaster position="bottom-right" />

          {/* Conteneur caché requis par Google Translate */}
          <div id="google-translate-container" style={{ display: "none" }} />

          <BrowserRouter>
            <ScrollToTop />   
            <AnalyticsTracker />
            <FloatingDevisButton />
            <Routes>
              {/* ── Public ─────────────────────────────── */}
              <Route path="/" element={<HomePage />} />
              <Route path="/mentions-legales" element={<MentionLegalesPage />} />
              <Route path="/politique-confidentialite" element={<PolitiqueConfidentialitePage />} />
              <Route path="/cgv" element={<CGVPage />} />
              <Route path="/actu" element={<ActualitesPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/defauts-visuels" element={<DefautsVisuelsPage />} />
              <Route path="/equipements" element={<EquipementsPage />} />
              <Route path="/femtolasik" element={<FemtoLasikPage />} />
              <Route path="/tarifs" element={<TarifsPage />} />
              <Route path="/tprk" element={<TprkPage />} />
              <Route path="/nous-trouver" element={<NousTrouver />} />
              <Route path="/offres" element={<OffresPage />} />
              <Route path="/devis" element={<DevisPage />} />

              {/* ── Login ──────────────────────────────── */}
              <Route path="/admin" element={<LoginAdmin />} />
              <Route path="/admin/register" element={<RegisterAdmin />} />

              {/* ── Admin (protégé) ─────────────────────── */}
              <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="dashboard" element={<TableauBordSection />} />
                  <Route path="demandes" element={<DemandesSection />} />
                  <Route path="rendez-vous" element={<RendezvousSection />} />
                  <Route path="devis" element={<DevisSection />} />
                  <Route path="tarifs" element={<TarifsSection />} />
                  <Route path="equipements" element={<EquipementsSection />} />
                  <Route path="actualite" element={<ActualiteSection />} />
                  <Route path="horaires" element={<HorairesSection />} />
                  <Route path="faq" element={<FAQSection />} />
                  <Route path="apropos" element={<AproposSection />} />
                  <Route path="notifications" element={<NotificationSection />} />
                </Route>
              </Route>

              {/* ── 404 ───────────────────────────────── */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <CookieBanner />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

// ✅ LanguageProvider englobe AppContent
function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;