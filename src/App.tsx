
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { SettingsProvider } from "./context/SettingsContext";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pricing from "./pages/Pricing";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/guards/ProtectedRoute";
import { SubscriptionGuard } from "./components/guards/SubscriptionGuard";
import AppLayout from "./components/layout/AppLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SettingsProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Wrap everything in AppLayout so Navbar is always present */}
              <Route element={<AppLayout />}>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/pricing" element={<Pricing />} />

                {/* Protected Routes (Require Login) */}
                <Route element={<ProtectedRoute />}>
                  {/* Core Features - Require Active Subscription */}
                  <Route element={<SubscriptionGuard />}>
                    <Route path="/dashboard" element={<Index />} />
                    <Route path="/settings" element={<Settings />} />
                  </Route>
                </Route>

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SettingsProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
