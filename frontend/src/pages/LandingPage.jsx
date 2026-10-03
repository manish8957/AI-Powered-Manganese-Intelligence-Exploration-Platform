import React from 'react';
import { Link } from 'react-router-dom';
import { Pickaxe, MapPin, Cpu, Satellite, AlertTriangle } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#0b0f19] text-slate-100 flex flex-col justify-between font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Header Bar */}
      <header className="h-16 sm:h-20 border-b border-slate-800 glass-panel sticky top-0 z-50 px-3 xs:px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full">
        <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
            <Pickaxe className="w-4 h-4 sm:w-6 sm:h-6 text-slate-950 font-bold" />
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-xs xs:text-sm sm:text-lg md:text-xl text-slate-100 tracking-wide font-mono uppercase truncate">
              Manganese <span className="text-emerald-400">Intelligence</span>
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono hidden md:block truncate">National Exploration & Shortfall Analytics Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 font-mono text-[11px] sm:text-xs shrink-0">
          <Link to="/login" className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2.5 xs:px-3 py-1.5 rounded-lg sm:rounded-xl transition-all">Sign In</Link>
          <Link to="/register" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 xs:px-3.5 sm:px-4 py-1.5 rounded-lg sm:rounded-xl transition-all shadow-lg shadow-emerald-500/20">Register</Link>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 flex flex-col justify-center w-full">
        {/* Hero Section */}
        <section className="relative py-8 sm:py-16 lg:py-20 px-3 xs:px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col items-center text-center space-y-5 sm:space-y-8">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] xs:text-[11px] sm:text-xs px-3 sm:px-4 py-1.5 rounded-full shadow-lg shadow-emerald-500/5 max-w-full text-center leading-snug whitespace-normal break-words">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span className="break-words">SIH 2026 Solution • Space Tech & AI Mineral Target Identification</span>
          </div>

          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-100 max-w-4xl tracking-tight leading-tight sm:leading-tight font-sans break-words w-full">
            AI-Powered Manganese Intelligence & Exploration Platform
          </h1>

          <p className="text-xs xs:text-sm sm:text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed font-light px-1 sm:px-2 break-words">
            Combining Space Technology, GIS, AI/ML and Production Analytics to identify manganese potential zones and help overcome manganese production shortfalls in India.
          </p>

          <div className="flex flex-col xs:flex-row justify-center gap-3 sm:gap-4 pt-2 w-full xs:w-auto px-2 sm:px-0 max-w-sm xs:max-w-none">
            <Link
              to="/login"
              className="w-full xs:w-auto min-w-[180px] sm:min-w-[200px] bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono px-5 sm:px-8 py-3 sm:py-4 rounded-xl text-xs sm:text-sm transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center space-x-2.5 active:scale-95"
            >
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span>Explore Manganese Map</span>
            </Link>

            <Link
              to="/login"
              className="w-full xs:w-auto min-w-[180px] sm:min-w-[200px] glass-panel hover:bg-slate-800/80 text-cyan-400 border border-cyan-500/40 font-bold font-mono px-5 sm:px-8 py-3 sm:py-4 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center space-x-2.5 shadow-xl active:scale-95"
            >
              <Cpu className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span>Run AI Analysis</span>
            </Link>
          </div>

          {/* Quick Platform Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 xs:gap-3 sm:gap-4 w-full max-w-5xl pt-6 sm:pt-10">
            <div className="glass-card rounded-xl p-3 xs:p-4 sm:p-5 border border-slate-800 text-left min-w-0 flex flex-col justify-between overflow-hidden">
              <p className="text-[10px] xs:text-xs font-mono text-slate-400 uppercase truncate">National Shortfall</p>
              <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold font-mono text-rose-400 mt-1 truncate">1.10 MT/yr</h3>
              <p className="text-[9px] xs:text-[10px] sm:text-[11px] text-slate-400 font-mono mt-1 truncate">27.16% Supply Deficit</p>
            </div>
            <div className="glass-card rounded-xl p-3 xs:p-4 sm:p-5 border border-slate-800 text-left min-w-0 flex flex-col justify-between overflow-hidden">
              <p className="text-[10px] xs:text-xs font-mono text-slate-400 uppercase truncate">Active Mines</p>
              <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold font-mono text-emerald-400 mt-1 truncate">10 Mines</h3>
              <p className="text-[9px] xs:text-[10px] sm:text-[11px] text-slate-400 font-mono mt-1 truncate">MOIL & State Entities</p>
            </div>
            <div className="glass-card rounded-xl p-3 xs:p-4 sm:p-5 border border-slate-800 text-left min-w-0 flex flex-col justify-between overflow-hidden">
              <p className="text-[10px] xs:text-xs font-mono text-slate-400 uppercase truncate">ML Accuracy</p>
              <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold font-mono text-cyan-400 mt-1 truncate">81.67%</h3>
              <p className="text-[9px] xs:text-[10px] sm:text-[11px] text-slate-400 font-mono mt-1 truncate">Random Forest Model</p>
            </div>
            <div className="glass-card rounded-xl p-3 xs:p-4 sm:p-5 border border-slate-800 text-left min-w-0 flex flex-col justify-between overflow-hidden">
              <p className="text-[10px] xs:text-xs font-mono text-slate-400 uppercase truncate">Candidate Targets</p>
              <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold font-mono text-amber-400 mt-1 truncate">8 Zones</h3>
              <p className="text-[9px] xs:text-[10px] sm:text-[11px] text-slate-400 font-mono mt-1 truncate">Bhandara & Central India</p>
            </div>
          </div>
        </section>

        {/* Feature Capabilities Grid */}
        <section className="py-8 sm:py-14 lg:py-16 px-3 xs:px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="text-center mb-6 sm:mb-12">
            <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold font-mono uppercase text-slate-100 break-words">
              End-to-End Mineral Intelligence Architecture
            </h2>
            <p className="text-slate-400 font-mono text-[11px] sm:text-sm mt-2 break-words">
              Integrated decision support for mining officials, geologists, and strategic analysts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6 w-full">
            <div className="glass-panel p-4 xs:p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-800 space-y-2.5 sm:space-y-3 min-w-0 flex flex-col justify-between">
              <div className="space-y-2.5 sm:space-y-3">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Satellite className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-sm xs:text-base sm:text-lg font-bold font-mono text-slate-100 leading-snug break-words">Space Technology & Satellite GIS</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans break-words">
                  Derives exploratory Manganese Index (MNI), Iron Oxide Index (IOI), Clay Mineral Index (CMI), and NDVI proxies from Landsat-9 and Sentinel-2 SWIR multispectral bands.
                </p>
              </div>
            </div>

            <div className="glass-panel p-4 xs:p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-800 space-y-2.5 sm:space-y-3 min-w-0 flex flex-col justify-between">
              <div className="space-y-2.5 sm:space-y-3">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-sm xs:text-base sm:text-lg font-bold font-mono text-slate-100 leading-snug break-words">AI/ML Classification & Reserve Regressor</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans break-words">
                  RandomForest models evaluate geochemical assays (Mn%, Fe%, SiO2%, P%), spatial coordinates, deposit depth, and area to estimate potential tiers and reserve volumes.
                </p>
              </div>
            </div>

            <div className="glass-panel p-4 xs:p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-800 space-y-2.5 sm:space-y-3 min-w-0 flex flex-col justify-between md:col-span-2 lg:col-span-1">
              <div className="space-y-2.5 sm:space-y-3">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-sm xs:text-base sm:text-lg font-bold font-mono text-slate-100 leading-snug break-words">Demand vs. Shortfall Analytics</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans break-words">
                  Tracks steel and battery sector demand growth against domestic mine yields, providing real-time deficit alerts and strategic mitigation frameworks.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-5 sm:py-8 border-t border-slate-800 text-center text-[11px] sm:text-xs font-mono text-slate-400 glass-panel px-3 xs:px-4 w-full overflow-hidden">
        <p className="break-words">National Manganese Intelligence & Exploration Control Center • Smart India Hackathon 2026</p>
        <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 break-words">Prototype Decision-Support System • Requires Geological & Field Assay Validation</p>
      </footer>
    </div>
  );
};

export default LandingPage;
