import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Settings, LogOut, LayoutDashboard, ChevronRight } from "lucide-react";
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
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 group">
        <div className="w-6 h-6 rounded border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-white group-hover:scale-110 transition-transform" />
        </div>
        <span className="text-[17px] font-semibold text-white tracking-tight">
          SimulasiKredit
        </span>
      </Link>

      {/* Centered Navigation Pill (Removed as per user request) */}
      <div className="hidden md:block flex-1" />

      {/* Right side */}
      <nav className="flex items-center gap-4">
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="text-[14px] font-medium text-gray-300 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Button
              size="sm"
              onClick={handleLogout}
              className="h-9 px-5 rounded-lg bg-white text-black hover:bg-gray-100 text-[13px] font-semibold"
            >
              Coba Gratis
            </Button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-[14px] font-medium text-gray-300 hover:text-white transition-colors"
            >
              Masuk
            </Link>
            <Link to="/register">
              <Button size="sm" className="h-9 px-5 rounded-lg bg-white text-black hover:bg-gray-100 text-[14px] font-semibold flex items-center gap-1">
                Coba Gratis
              </Button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
