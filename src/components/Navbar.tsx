import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Settings, LogOut, LayoutDashboard } from "lucide-react";
import { toast } from "sonner";

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Berhasil logout");
      navigate("/login");
    } catch (error) {
      toast.error("Gagal logout");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <div className="w-full max-w-5xl bg-white/60 dark:bg-gray-950/60 backdrop-blur-2xl rounded-2xl border border-gray-200/50 dark:border-white/10 shadow-lg shadow-black/[0.03] px-5 py-2.5">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-[15px] font-bold text-gray-900 dark:text-white tracking-tight">
              SimulasiKredit Pro
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            <Link
              to="/pricing"
              className="px-3 py-1.5 text-[13px] font-medium text-gray-600 dark:text-gray-300 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              Harga
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center px-3 py-1.5 text-[13px] font-medium text-gray-600 dark:text-gray-300 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  <LayoutDashboard className="mr-1.5 h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-3 py-1.5 text-[13px] font-medium text-gray-600 dark:text-gray-300 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  <Settings className="mr-1.5 h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Setting</span>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50/80 dark:hover:bg-red-950/30 text-[13px] h-auto py-1.5 px-3 rounded-lg"
                >
                  <LogOut className="h-3.5 w-3.5 sm:mr-1.5" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-[13px] text-gray-600 dark:text-gray-300 h-auto py-1.5 px-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/10">
                    Masuk
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="text-[13px] h-auto py-1.5 px-4 rounded-lg bg-gray-900 dark:bg-white dark:text-gray-900 text-white hover:bg-gray-800 dark:hover:bg-gray-100">
                    Daftar
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
