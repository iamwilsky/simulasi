
import React, { useState } from "react";
import { Calculator, Settings, LogIn, LayoutDashboard, LogOut } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PinDialog from "./PinDialog";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";

const Navbar: React.FC = () => {
  const [isPinDialogOpen, setIsPinDialogOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const transparentRoutes = ["/", "/pricing", "/login", "/register"];
  const isTransparentPage = transparentRoutes.includes(location.pathname);

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPinDialogOpen(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('simulasi_session_id');
    navigate("/");
  };

  const handlePinSuccess = () => {
    navigate("/settings");
  };

  return (
    <header className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${isTransparentPage
      ? "bg-transparent border-none"
      : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm"
      }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/fd2dea6c-8bd7-465f-bbad-5127eed31324.png"
                alt="Hyundai Utama"
                className="h-5 sm:h-7 w-auto"
                style={{ filter: isTransparentPage ? 'brightness(0) invert(1)' : 'none' }}
              />
              <span className="hidden">Kredit Simulators</span>
            </Link>
          </div>

          <nav className="flex items-center space-x-2 md:space-x-4">
            {isTransparentPage ? (
              <>
                <Link
                  to="/pricing"
                  className={`flex items-center px-3 py-2 text-sm font-bold transition-colors uppercase tracking-widest ${location.pathname === "/pricing" ? "text-emerald-400" : "text-white hover:text-emerald-400"
                    }`}
                >
                  <span>Pricing</span>
                </Link>

                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="flex items-center px-3 py-2 text-sm font-bold text-white hover:text-emerald-400 transition-colors uppercase tracking-widest gap-2"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span className="hidden sm:inline">Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-red-500/20 text-white hover:text-red-400 transition-all"
                      title="Logout"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${location.pathname === "/login" ? "bg-emerald-500 text-white" : "bg-white/10 hover:bg-white/20 text-white"
                      }`}
                    title="Login"
                  >
                    <LogIn className="h-5 w-5" />
                  </Link>
                )}
              </>
            ) : (
              <>
                <a
                  href="#"
                  onClick={handleSettingsClick}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Setting</span>
                </a>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </nav>
        </div>
      </div>

      <PinDialog
        isOpen={isPinDialogOpen}
        onClose={() => setIsPinDialogOpen(false)}
        correctPin="082788"
        onSuccess={handlePinSuccess}
      />
    </header>
  );
};

export default Navbar;
