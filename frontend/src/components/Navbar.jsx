import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pickaxe, ShieldCheck, Activity, Cpu, LogOut, LogIn, UserPlus, Menu, X } from 'lucide-react';

const Navbar = ({ onToggleMobileMenu, isMobileMenuOpen, activeRole }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sih_user');
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    } catch (e) { }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('sih_token');
    localStorage.removeItem('sih_user');
    setCurrentUser(null);
    navigate('/login');
  };

  const displayName = currentUser?.name || activeRole || "SIH Demo Analyst";
  const displayRole = currentUser?.role ? `(${currentUser.role})` : "";

  return (
    <header className="h-16 glass-panel border-b border-slate-800 flex items-center justify-between px-3 sm:px-6 sticky top-0 z-50">
      {/* Left: Mobile Menu Toggle + Brand Title */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 active:scale-95 transition-all"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
          </button>
        )}

        <Link to="/" className="flex items-center space-x-2.5 sm:space-x-3 group">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
            <Pickaxe className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-bold text-sm sm:text-base md:text-lg text-slate-100 tracking-wide uppercase font-mono">
                Manganese <span className="hidden xs:inline">Intelligence </span><span className="text-emerald-400 font-extrabold">& Exploration</span>
              </h1>
              <span className="hidden xl:flex bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>National Control Center</span>
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono hidden sm:block">SIH 2026 Prototype • GIS, AI/ML & Satellite Analytics</p>
          </div>
        </Link>
      </div>

      {/* Header Actions */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="hidden xl:flex items-center space-x-2 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>RF ML Engine: <span className="text-emerald-400 font-semibold">Online (81.7% Acc)</span></span>
        </div>

        <div className="hidden md:flex items-center space-x-2 bg-slate-900/80 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate max-w-[100px] sm:max-w-[180px]">User: <span className="text-slate-100 font-semibold">{displayName} {displayRole}</span></span>
        </div>

        {currentUser || localStorage.getItem('sih_token') ? (
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="bg-slate-800 hover:bg-rose-500/20 hover:text-rose-300 text-slate-300 border border-slate-700 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-mono transition-all flex items-center space-x-1.5 active:scale-95"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        ) : (
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <Link
              to="/login"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-mono transition-all flex items-center space-x-1"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Login</span>
            </Link>
            <Link
              to="/register"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs font-bold font-mono transition-all flex items-center space-x-1 shadow-lg shadow-emerald-500/20"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Register</span>
            </Link>
          </div>
        )}

        <Link
          to="/ai-analysis"
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-bold font-mono transition-all flex items-center space-x-1.5 shadow-lg shadow-emerald-500/20 active:scale-95"
        >
          <Activity className="w-4 h-4" />
          <span className="hidden sm:inline">Run AI</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
