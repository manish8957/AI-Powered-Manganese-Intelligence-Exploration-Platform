import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import { AlertTriangle, TrendingUp, ShieldAlert, CheckCircle, ArrowUpRight, Cpu } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const ShortfallAnalysis = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/shortfall');
        if (res.data && res.data.data) setData(res.data.data);
      } catch (err) {
        console.log('Shortfall fetch fallback triggered');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const metrics = data?.currentMetrics || {
    demandMT: 4050000,
    productionMT: 2950000,
    shortfallMT: 1100000,
    shortfallPercentage: 27.16,
    requiredAdditionalProductionMT: 1100000,
    riskStatus: "HIGH RISK"
  };

  const rawProjected = data?.projected || [
    { year: 2026, demand: 4.32, production: 3.08, shortfall: 1.24 },
    { year: 2027, demand: 4.61, production: 3.22, shortfall: 1.39 },
    { year: 2028, demand: 4.95, production: 3.38, shortfall: 1.57 },
    { year: 2029, demand: 5.32, production: 3.55, shortfall: 1.77 },
    { year: 2030, demand: 5.75, production: 3.75, shortfall: 2.00 }
  ];

  const projectedChartData = rawProjected.map((item) => {
    const demandVal = item.demand ?? (item.demandMT ? item.demandMT / 1000000 : 4.32);
    const prodVal = item.production ?? (item.estimatedProductionMT ? item.estimatedProductionMT / 1000000 : 3.08);
    const shortfallVal = item.shortfall ?? (item.projectedShortfallMT ? item.projectedShortfallMT / 1000000 : 1.24);
    return {
      year: item.year,
      demand: Number(Number(demandVal).toFixed(2)),
      production: Number(Number(prodVal).toFixed(2)),
      shortfall: Number(Number(shortfallVal).toFixed(2))
    };
  });

  const rawHistorical = data?.historical || [
    { year: 2020, demand: 3.10, production: 2.35, shortfall: 0.75 },
    { year: 2021, demand: 3.28, production: 2.48, shortfall: 0.80 },
    { year: 2022, demand: 3.45, production: 2.62, shortfall: 0.83 },
    { year: 2023, demand: 3.62, production: 2.75, shortfall: 0.87 },
    { year: 2024, demand: 3.80, production: 2.84, shortfall: 0.96 },
    { year: 2025, demand: 4.05, production: 2.95, shortfall: 1.10 }
  ];

  const historicalChartData = rawHistorical.map((item) => {
    const d = item.demand ?? (item.demandMT ? item.demandMT / 1000000 : 3.5);
    const p = item.production ?? (item.productionMT ? item.productionMT / 1000000 : 2.5);
    const s = item.shortfall ?? (item.shortfallMT ? item.shortfallMT / 1000000 : 1.0);
    return {
      year: item.year,
      demand: Number(Number(d).toFixed(2)),
      production: Number(Number(p).toFixed(2)),
      shortfall: Number(Number(s).toFixed(2))
    };
  });

  const solutions = data?.solutions || [
    { title: "Prioritize High-Potential Exploration Blocks", description: "Accelerate G3/G2 stage exploration in Dongri-Chikla & Tirodi East corridors to add 1.5 MT annual capacity by 2027.", impact: "+450,000 MT/year" },
    { title: "Optimize Extraction at Reserve-Rich Active Mines", description: "Deepen shaft workings at Balaghat and Barjamda mines to tap underlying high-grade ore horizons.", impact: "+350,000 MT/year" },
    { title: "Improve Ore Beneficiation & Mineral Recovery", description: "Deploy optical ore sorting and gravity separation to convert low-grade (<30% Mn) sub-economic dumps into ferro-grade ore.", impact: "+200,000 MT/year" },
    { title: "Streamline Environmental & Mining Lease Approvals", description: "Fast-track clearance for high-priority brownfield expansion projects in Sausar belt.", impact: "+180,000 MT/year" },
    { title: "Adopt AI/ML Predictive Deep Target Identification", description: "Use spaceborne MNI spectral proxy maps and satellite analytics to reduce exploration targeting failure rates.", impact: "High Efficiency" }
  ];

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 uppercase tracking-tight">
              Manganese Production Shortfall Analysis
            </h1>
            <span className="bg-rose-500/20 text-rose-300 font-mono text-xs px-2.5 py-0.5 rounded border border-rose-500/30">
              Critical Deficit Warning
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-400 font-mono mt-1">
            Industrial Demand vs Domestic Production Gap Analysis (Shortfall = Demand - Production)
          </p>
        </div>
      </div>

      {/* Alert Message Banner */}
      <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3.5 sm:p-4 text-xs font-mono text-rose-200 flex items-start space-x-3 shadow-lg shadow-rose-500/5">
        <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-rose-300 uppercase tracking-wider text-xs sm:text-sm">
            CRITICAL ALERT: Production Shortfall Detected
          </h4>
          <p className="text-slate-300 mt-0.5 leading-relaxed">
            Current annual domestic manganese demand of 4.05 Million MT exceeds production of 2.95 Million MT, generating a deficit of <strong>1.10 Million MT (27.16%)</strong>.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard title="Current Domestic Demand" value="4.05 Million MT" subtext="Steel & Battery Sectors" icon={TrendingUp} color="blue" />
        <StatCard title="Current Annual Production" value="2.95 Million MT" subtext="Domestic Mine Yield" icon={TrendingUp} color="emerald" />
        <StatCard title="Net Production Deficit" value="1.10 Million MT" subtext="Shortfall Gap = Demand - Prod" icon={AlertTriangle} color="red" trend="27.16% DEFICIT" />
        <StatCard title="Required Addtl. Capacity" value="+1.10 Million MT" subtext="Target to Close Gap" icon={ShieldAlert} color="amber" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Historical Deficit Trend */}
        <div className="glass-card rounded-xl p-4 sm:p-5 border border-slate-800 space-y-4 min-w-0">
          <h3 className="text-xs sm:text-sm font-bold font-mono text-slate-100 uppercase tracking-wider">
            Historical Demand vs Production (2020 - 2025)
          </h3>
          <div className="h-56 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalChartData}>
                <XAxis dataKey="year" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} unit=" M" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} formatter={(val) => [`${val} M MT`, '']} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Line type="monotone" dataKey="demand" name="Domestic Demand" stroke="#ef4444" strokeWidth={3} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="production" name="Mine Production" stroke="#10b981" strokeWidth={3} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="shortfall" name="Deficit Gap" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Projected Shortfall Chart */}
        <div className="glass-card rounded-xl p-4 sm:p-5 border border-slate-800 space-y-4 min-w-0">
          <h3 className="text-xs sm:text-sm font-bold font-mono text-slate-100 uppercase tracking-wider">
            Projected Future Demand vs Deficit (2026 - 2030)
          </h3>
          <div className="h-56 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectedChartData}>
                <XAxis dataKey="year" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} unit=" M" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} formatter={(val) => [`${val} M MT`, '']} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="demand" name="Projected Demand" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="production" name="Estimated Yield" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="shortfall" name="Projected Deficit" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Solutions Framework */}
      <div className="glass-card rounded-xl p-4 sm:p-6 border border-slate-800 space-y-4">
        <h3 className="text-xs sm:text-sm font-bold font-mono text-slate-100 uppercase tracking-wider flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Recommended Strategic Solutions to Bridge the Shortfall</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {solutions.map((sol, idx) => (
            <div key={idx} className="glass-panel p-3.5 sm:p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-bold text-xs sm:text-sm text-slate-100 font-mono flex items-center space-x-1.5">
                  <ArrowUpRight className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{sol.title}</span>
                </h4>
                <span className="text-[9px] sm:text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold border border-emerald-500/30 shrink-0">
                  {sol.impact}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-300 font-sans leading-relaxed">{sol.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ShortfallAnalysis;
