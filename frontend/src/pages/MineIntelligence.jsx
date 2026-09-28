import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import { Pickaxe, Search, Filter, Eye, MapPin, X } from 'lucide-react';

const MineIntelligence = () => {
  const [mines, setMines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedMine, setSelectedMine] = useState(null);

  useEffect(() => {
    const fetchMines = async () => {
      try {
        const res = await api.get('/mines');
        if (res.data && res.data.data) setMines(res.data.data);
      } catch (err) {
        console.log('Mine fetch fallback');
      }
    };
    fetchMines();
  }, []);

  const filteredMines = mines.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === 'ALL' || m.state === selectedState;
    const matchesType = selectedType === 'ALL' || m.mineType === selectedType;
    return matchesSearch && matchesState && matchesType;
  });

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 uppercase tracking-tight">
            National Mine Intelligence Registry
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-400 font-mono mt-0.5">
            Database of Active MOIL & State Mining Leases, Ore Grades, Depths & Reserves
          </p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="glass-card rounded-xl p-3.5 sm:p-4 border border-slate-800 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search mine name, district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs font-mono text-slate-100 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto text-xs font-mono">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-300 rounded-lg px-2.5 sm:px-3 py-2 focus:border-emerald-500 focus:outline-none flex-1 sm:flex-none"
          >
            <option value="ALL">All States</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Odisha">Odisha</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-300 rounded-lg px-2.5 sm:px-3 py-2 focus:border-emerald-500 focus:outline-none flex-1 sm:flex-none"
          >
            <option value="ALL">All Mine Types</option>
            <option value="Underground">Underground</option>
            <option value="Open Cast">Open Cast</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>
      </div>

      {/* Mine Table */}
      <div className="glass-card rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono min-w-[800px]">
            <thead>
              <tr className="bg-slate-900/80 text-slate-400 border-b border-slate-800">
                <th className="p-3">Mine Name</th>
                <th className="p-3">State</th>
                <th className="p-3">District</th>
                <th className="p-3">Coordinates</th>
                <th className="p-3">Annual Yield (MT)</th>
                <th className="p-3">Mn Grade %</th>
                <th className="p-3">Reserve (MT)</th>
                <th className="p-3">Type</th>
                <th className="p-3">Depth (m)</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredMines.map((m) => (
                <tr key={m._id || m.name} className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-slate-100 flex items-center space-x-2">
                    <Pickaxe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{m.name}</span>
                  </td>
                  <td className="p-3 text-slate-300">{m.state}</td>
                  <td className="p-3 text-slate-400">{m.district}</td>
                  <td className="p-3 text-slate-400 text-[11px]">{m.latitude.toFixed(4)}, {m.longitude.toFixed(4)}</td>
                  <td className="p-3 font-bold text-emerald-400">{m.annualProductionMT ? m.annualProductionMT.toLocaleString() : 'N/A'}</td>
                  <td className="p-3 font-bold text-cyan-400">{m.mnGradePercent}%</td>
                  <td className="p-3 text-slate-300">{m.estimatedReserveMT ? (m.estimatedReserveMT / 1000000).toFixed(2) + ' M' : 'N/A'}</td>
                  <td className="p-3 text-slate-300">{m.mineType}</td>
                  <td className="p-3 text-slate-400">{m.depthMeters}m</td>
                  <td className="p-3">
                    <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-500/30 whitespace-nowrap">
                      {m.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedMine(m)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-1.5 rounded border border-slate-700 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mine Profile Modal */}
      {selectedMine && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="glass-panel w-full max-w-lg rounded-2xl border border-slate-800 p-4 sm:p-6 space-y-4 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedMine(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 p-1 rounded-md hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 border-b border-slate-800 pb-3 pr-8">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Pickaxe className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold font-mono text-base sm:text-lg text-slate-100 truncate">{selectedMine.name}</h3>
                <p className="text-xs font-mono text-slate-400 truncate">{selectedMine.operator} • {selectedMine.district}, {selectedMine.state}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 text-xs font-mono">
              <div className="bg-slate-900 p-2.5 sm:p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Annual Yield</span>
                <span className="text-emerald-400 font-bold text-xs sm:text-sm">{selectedMine.annualProductionMT ? selectedMine.annualProductionMT.toLocaleString() : 0} MT/yr</span>
              </div>
              <div className="bg-slate-900 p-2.5 sm:p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Ore Grade (Mn %)</span>
                <span className="text-cyan-400 font-bold text-xs sm:text-sm">{selectedMine.mnGradePercent}%</span>
              </div>
              <div className="bg-slate-900 p-2.5 sm:p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Est. Reserve</span>
                <span className="text-slate-100 font-bold text-xs sm:text-sm">{selectedMine.estimatedReserveMT ? (selectedMine.estimatedReserveMT / 1000000).toFixed(2) : 0} Million MT</span>
              </div>
              <div className="bg-slate-900 p-2.5 sm:p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Depth & Method</span>
                <span className="text-slate-100 font-bold text-xs sm:text-sm">{selectedMine.mineType} ({selectedMine.depthMeters}m)</span>
              </div>
            </div>

            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs font-mono space-y-1">
              <p className="text-slate-400"><strong className="text-slate-300">Geochemical Breakdown:</strong> Fe: {selectedMine.feGradePercent || 8.0}% | SiO2: {selectedMine.sio2GradePercent || 12.0}% | P: {selectedMine.pGradePercent || 0.18}%</p>
              <p className="text-slate-400"><strong className="text-slate-300">Coordinates:</strong> {selectedMine.latitude}, {selectedMine.longitude}</p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MineIntelligence;
