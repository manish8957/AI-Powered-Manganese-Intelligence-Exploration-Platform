import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import { TrendingUp, Pickaxe, Award, BarChart2, Layers } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const ProductionAnalytics = () => {
  const [productionData, setProductionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/production');
        const list = Array.isArray(res.data) ? res.data : (res.data?.data || []);
        if (list.length > 0) setProductionData(list);
      } catch (err) {
        console.log('Production fetch fallback triggered');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fallbackProduction = [
    { year: 2020, productionMT: 2350000 },
    { year: 2021, productionMT: 2480000 },
    { year: 2022, productionMT: 2620000 },
    { year: 2023, productionMT: 2750000 },
    { year: 2024, productionMT: 2840000 },
    { year: 2025, productionMT: 2950000 }
  ];

  const rawList = (productionData && productionData.length > 0) ? productionData : fallbackProduction;

  const formattedChartData = rawList.map((item) => {
    const rawVal = item.productionMT ?? item.production ?? 2500000;
    const millions = rawVal > 10000 ? rawVal / 1000000 : rawVal;
    return {
      year: item.year,
      productionMT: rawVal > 10000 ? rawVal : rawVal * 1000000,
      productionM: Number(Number(millions).toFixed(2))
    };
  });

  const mineWiseProduction = [
    { mine: "Balaghat Mine", productionMT: 850000, state: "Madhya Pradesh" },
    { mine: "Barjamda Mine", productionMT: 620000, state: "Odisha" },
    { mine: "Tirodi Mine", productionMT: 520000, state: "Madhya Pradesh" },
    { mine: "Sandur Mine", productionMT: 480000, state: "Karnataka" },
    { mine: "Dongri Buzurg", productionMT: 450000, state: "Maharashtra" },
    { mine: "Ukwa Mine", productionMT: 390000, state: "Madhya Pradesh" },
    { mine: "Kandri Mine", productionMT: 310000, state: "Maharashtra" },
    { mine: "Chikla Mine", productionMT: 280000, state: "Maharashtra" }
  ];

  const stateShareData = [
    { name: "Madhya Pradesh", value: 1.07, color: "#10b981" },
    { name: "Maharashtra", value: 0.88, color: "#06b6d4" },
    { name: "Odisha", value: 0.62, color: "#3b82f6" },
    { name: "Karnataka", value: 0.25, color: "#f59e0b" },
    { name: "Others", value: 0.13, color: "#8b5cf6" }
  ];

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 uppercase tracking-tight">
            National Production Analytics
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-400 font-mono mt-0.5">
            Historical Yields, Mine-wise Yield Breakdown, State Share, and Ore Grade Analytics
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard title="2025 Annual Production" value="2.95 Million MT" subtext="All Operating Belts" icon={TrendingUp} color="emerald" />
        <StatCard title="5-Year CAGR Growth" value="+4.6% per annum" subtext="2.35 MT to 2.95 MT" icon={BarChart2} color="cyan" />
        <StatCard title="Average Ore Grade" value="40.18% Mn" subtext="Ferro-grade Standard" icon={Award} color="amber" />
        <StatCard title="Top Producing State" value="Madhya Pradesh" subtext="1.07 MT (36.3% Share)" icon={Pickaxe} color="blue" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Year-wise Line Chart */}
        <div className="glass-card rounded-xl p-4 sm:p-5 border border-slate-800 space-y-4 min-w-0">
          <h3 className="text-xs sm:text-sm font-bold font-mono text-slate-100 uppercase tracking-wider">
            Year-wise Production Growth (2020 - 2025)
          </h3>
          <div className="h-56 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formattedChartData}>
                <XAxis dataKey="year" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} unit=" M MT" domain={['auto', 'auto']} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                  formatter={(val) => [`${val} Million MT`, 'Annual Production']}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Line
                  type="monotone"
                  dataKey="productionM"
                  name="Annual Yield (Million MT)"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#10b981' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mine-wise Bar Chart */}
        <div className="glass-card rounded-xl p-4 sm:p-5 border border-slate-800 space-y-4 min-w-0">
          <h3 className="text-xs sm:text-sm font-bold font-mono text-slate-100 uppercase tracking-wider">
            Top Mine Annual Production Output
          </h3>
          <div className="h-56 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={mineWiseProduction} margin={{ left: 10, right: 15 }}>
                <XAxis type="number" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="mine" stroke="#94a3b8" tick={{ fontSize: 10 }} width={90} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} formatter={(val) => [`${(val / 1000).toLocaleString()} kMT`, 'Yield']} />
                <Bar dataKey="productionMT" fill="#06b6d4" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* State Production Share */}
        <div className="glass-card rounded-xl p-4 sm:p-5 border border-slate-800 space-y-4 lg:col-span-2 min-w-0">
          <h3 className="text-xs sm:text-sm font-bold font-mono text-slate-100 uppercase tracking-wider">
            State-wise Manganese Production Contribution (Million MT / Year)
          </h3>
          <div className="h-56 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateShareData}>
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} unit=" M" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} formatter={(val) => [`${val} Million MT`, 'State Output']} />
                <Bar dataKey="value" name="Annual Output (M MT)" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductionAnalytics;
