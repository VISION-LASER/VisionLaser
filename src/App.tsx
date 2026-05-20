import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster } from "./components/ui/toaster";
import HomePage from "./pages/user/HomePage";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import NotFound from "./components/layout/NotFound";
import AdminLayout from "./components/layout/AdminLayout";
import DashboardAdminPage from "./pages/admin/DashboardAdminPage";

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
                <Route path="/" element={<DashboardAdminPage />} />
                
              </Route>

              {/*******************************
              *           404 routes         *
              ********************************/}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
