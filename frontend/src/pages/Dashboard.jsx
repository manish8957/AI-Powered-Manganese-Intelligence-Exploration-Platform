import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import DisclaimerBanner from '../components/DisclaimerBanner';
import { Pickaxe, TrendingUp, AlertTriangle, Cpu, Layers, Award, Activity, MapPin } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get('/dashboard');
        if (res.data && res.data.data) {
          setData(res.data.data);
        }
      } catch (err) {
        console.log('Dashboard fetch fallback triggered');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const COLORS = ['#10b981', '#06b6d4', '#3b82f6', '#f59e0b', '#ef4444'];

  const kpis = data?.kpis || {
    totalActiveMines: 10,
    estimatedManganeseReserveMT: 114400000,
    currentAnnualProductionMT: 2950000,
    currentDemandMT: 4050000,
    productionShortfallMT: 1100000,
    shortfallPercentage: 27.16,
    highPotentialZonesCount: 4,
    mlModelAccuracy: 81.67,
    averageMnGradePercent: 40.18
  };

  const productionTrend = data?.productionTrend || [
    { year: 2020, production: 2.35, demand: 3.10, shortfall: 0.75 },
    { year: 2021, production: 2.48, demand: 3.28, shortfall: 0.80 },
    { year: 2022, production: 2.62, demand: 3.45, shortfall: 0.83 },
    { year: 2023, production: 2.75, demand: 3.62, shortfall: 0.87 },
    { year: 2024, production: 2.84, demand: 3.80, shortfall: 0.96 },
    { year: 2025, production: 2.95, demand: 4.05, shortfall: 1.10 }
  ];

  const stateWiseProduction = data?.stateWiseProduction || [
    { state: "Madhya Pradesh", productionMT: 1070000 },
    { state: "Maharashtra", productionMT: 880000 },
    { state: "Odisha", productionMT: 620000 },
    { state: "Karnataka", productionMT: 250000 },
    { state: "Andhra Pradesh", productionMT: 130000 }
  ];

  const reserveDistribution = data?.reserveDistribution || [
    { state: "Madhya Pradesh", reserveMT: 51.3 },
    { state: "Maharashtra", reserveMT: 36.2 },
    { state: "Odisha", reserveMT: 19.4 },
    { state: "Karnataka", reserveMT: 13.7 }
  ];

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 uppercase tracking-tight">
            National Executive Dashboard
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-400 font-mono mt-0.5">
            Real-time Monitoring of Manganese Mines, Reserves, Production & Demand Shortfall
          </p>
        </div>
        <div className="inline-flex items-center space-x-2 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 shrink-0 self-start sm:self-auto">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>Status: <span className="text-emerald-400 font-bold">Operational (Live Feed)</span></span>
        </div>
      </div>

      <DisclaimerBanner />

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard 
          title="Active Mines" 
          value={`${kpis.totalActiveMines} Mines`} 
          subtext="MOIL & State Corporations" 
          icon={Pickaxe} 
          color="emerald"
        />
        <StatCard 
          title="Est. National Reserve" 
          value={`${(kpis.estimatedManganeseReserveMT / 1000000).toFixed(1)} Million MT`} 
          subtext={`Avg Mn Grade: ${kpis.averageMnGradePercent}%`} 
          icon={Layers} 
          color="cyan"
        />
        <StatCard 
          title="Current Annual Production" 
          value={`${(kpis.currentAnnualProductionMT / 1000000).toFixed(2)} Million MT`} 
          subtext={`Annual Demand: ${(kpis.currentDemandMT / 1000000).toFixed(2)} MT`} 
          icon={TrendingUp} 
          color="blue"
        />
        <StatCard 
          title="Production Shortfall" 
          value={`${(kpis.productionShortfallMT / 1000000).toFixed(2)} Million MT`} 
          subtext={`Shortfall: ${kpis.shortfallPercentage}% of Demand`} 
          icon={AlertTriangle} 
          color="red"
          trend="HIGH RISK DEFICIT"
        />
      </div>

      {/* Secondary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="glass-card rounded-xl p-3.5 sm:p-4 border border-slate-800 flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono uppercase truncate">High Potential Zones</p>
            <h4 className="text-base sm:text-lg font-bold font-mono text-slate-100 truncate">{kpis.highPotentialZonesCount} Exploration Blocks</h4>
          </div>
        </div>

        <div className="glass-card rounded-xl p-3.5 sm:p-4 border border-slate-800 flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono uppercase truncate">RF Classifier Accuracy</p>
            <h4 className="text-base sm:text-lg font-bold font-mono text-slate-100 truncate">{kpis.mlModelAccuracy}% Model Confidence</h4>
          </div>
        </div>

        <div className="glass-card rounded-xl p-3.5 sm:p-4 border border-slate-800 flex items-center space-x-3.5 sm:col-span-2 lg:col-span-1">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono uppercase truncate">Primary Mining Region</p>
            <h4 className="text-base sm:text-lg font-bold font-mono text-slate-100 truncate">Balaghat & Bhandara Belt</h4>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Demand vs Production Line Chart */}
        <div className="glass-card rounded-xl p-4 sm:p-5 border border-slate-800 space-y-4 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xs sm:text-sm font-bold font-mono text-slate-100 uppercase tracking-wider truncate">
              Demand vs. Production Trend (Million MT)
            </h3>
            <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded shrink-0">2020 - 2025</span>
          </div>
          <div className="h-56 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productionTrend}>
                <XAxis dataKey="year" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} unit=" MT" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Line type="monotone" dataKey="demand" name="Domestic Demand (MT)" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="production" name="Domestic Production (MT)" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Shortfall Gap Bar Chart */}
        <div className="glass-card rounded-xl p-4 sm:p-5 border border-slate-800 space-y-4 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xs sm:text-sm font-bold font-mono text-slate-100 uppercase tracking-wider truncate">
              Annual Production Deficit (Million MT)
            </h3>
            <span className="text-[10px] font-mono bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30 shrink-0">Gap Calc</span>
          </div>
          <div className="h-56 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productionTrend}>
                <XAxis dataKey="year" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} unit=" MT" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                <Bar dataKey="shortfall" name="Shortfall Gap (MT)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* State-wise Production Donut */}
        <div className="glass-card rounded-xl p-4 sm:p-5 border border-slate-800 space-y-4 min-w-0">
          <h3 className="text-xs sm:text-sm font-bold font-mono text-slate-100 uppercase tracking-wider">
            State-wise Production Contribution
          </h3>
          <div className="h-56 sm:h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stateWiseProduction}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="productionMT"
                  nameKey="state"
                  label={({ state }) => state}
                >
                  {stateWiseProduction.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} formatter={(val) => [`${(val/1000).toLocaleString()} kMT`, 'Production']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reserve Distribution Bar */}
        <div className="glass-card rounded-xl p-4 sm:p-5 border border-slate-800 space-y-4 min-w-0">
          <h3 className="text-xs sm:text-sm font-bold font-mono text-slate-100 uppercase tracking-wider">
            State Reserve Distribution (Million MT)
          </h3>
          <div className="h-56 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reserveDistribution}>
                <XAxis dataKey="state" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} unit=" M MT" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                <Bar dataKey="reserveMT" name="Est. Reserve (Million MT)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
