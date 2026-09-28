import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  Cpu,
  TrendingUp,
  AlertTriangle,
  Pickaxe,
  Upload,
  FileText,
  Info,
  X
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/exploration', label: 'Exploration Map', icon: Map, badge: 'GIS' },
  { path: '/ai-analysis', label: 'AI Analysis', icon: Cpu, badge: 'ML' },
  { path: '/production', label: 'Production Analytics', icon: TrendingUp },
  { path: '/shortfall', label: 'Shortfall Analysis', icon: AlertTriangle, alert: true },
  { path: '/mines', label: 'Mine Intelligence', icon: Pickaxe },
  { path: '/data-upload', label: 'Data Upload', icon: Upload },
  { path: '/reports', label: 'Reports & Export', icon: FileText },
  { path: '/about', label: 'About Platform', icon: Info }
];

const Sidebar = ({ isOpen, onClose }) => {
  const sidebarContent = (
    <>
      <div className="space-y-1 overflow-y-auto pr-1">
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
            Navigation Control
          </span>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                if (onClose) onClose();
              }}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium font-sans transition-all group ${isActive
                  ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 text-emerald-400 border border-emerald-500/30 font-semibold shadow-lg shadow-emerald-500/10'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-slate-100'
                }`
              }
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors shrink-0" />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 font-semibold border border-slate-700 shrink-0">
                  {item.badge}
                </span>
              )}
              {item.alert && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping shrink-0"></span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Footer Disclaimer Tag */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 px-3">
        <div className="bg-slate-900/90 rounded-lg p-2.5 border border-slate-800 text-[10px] text-slate-400 font-mono space-y-1">
          <p className="font-semibold text-slate-300 uppercase tracking-wider">SIH Prototype Mode</p>
          <p>Manganese Potential & Reserve AI Estimates require field validation.</p>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar (Sticky side-by-side) */}
      <aside className="hidden lg:flex w-64 glass-panel border-r border-slate-800 flex-col justify-between py-4 px-3 sticky top-16 h-[calc(100vh-4rem)] z-40 shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile & Tablet Drawer Side-Over */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          {/* Drawer Panel */}
          <aside className="relative w-72 max-w-[85vw] bg-[#0b0f19] border-r border-slate-800 z-50 flex flex-col justify-between py-4 px-3 shadow-2xl h-full overflow-y-auto">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
