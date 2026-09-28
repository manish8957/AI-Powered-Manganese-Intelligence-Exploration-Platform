import React from 'react';

const StatCard = ({ title, value, subtext, icon: Icon, trend, color = 'emerald' }) => {
  const colorMap = {
    emerald: 'from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30',
    cyan: 'from-cyan-500/20 to-cyan-500/5 text-cyan-400 border-cyan-500/30',
    amber: 'from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/30',
    red: 'from-rose-500/20 to-rose-500/5 text-rose-400 border-rose-500/30',
    blue: 'from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/30'
  };

  return (
    <div className={`glass-card glass-card-hover rounded-xl p-4 sm:p-5 border relative overflow-hidden bg-gradient-to-br ${colorMap[color] || colorMap.emerald}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] sm:text-xs font-mono font-medium text-slate-400 uppercase tracking-wider truncate">{title}</p>
          <h3 className="text-lg sm:text-2xl font-bold text-slate-100 mt-1 font-mono tracking-tight truncate">{value}</h3>
          {subtext && <p className="text-[11px] sm:text-xs text-slate-400 mt-1 font-mono truncate">{subtext}</p>}
        </div>
        {Icon && (
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] sm:text-xs font-mono">
          <span className="text-slate-400">Trend Status:</span>
          <span className="font-semibold">{trend}</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
