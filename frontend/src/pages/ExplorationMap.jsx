import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import MapComponent from '../components/MapComponent';
import DisclaimerBanner from '../components/DisclaimerBanner';
import { MapPin, Layers, Filter, CheckCircle2 } from 'lucide-react';

const ExplorationMap = () => {
  const [mines, setMines] = useState([]);
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('candidateZones');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mineRes, zoneRes] = await Promise.all([
          api.get('/mines'),
          api.get('/exploration/zones')
        ]);
        if (mineRes.data && mineRes.data.data) setMines(mineRes.data.data);
        if (zoneRes.data && zoneRes.data.data) setZones(zoneRes.data.data);
      } catch (err) {
        console.log('Map data fetch fallback triggered');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 uppercase tracking-tight">
              GIS Exploration Target Map
            </h1>
            <span className="bg-emerald-500/20 text-emerald-300 font-mono text-xs px-2.5 py-0.5 rounded border border-emerald-500/30">
              Interactive Spatial Engine
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-400 font-mono mt-1">
            Central India / Bhandara Syncline Satellite Potential Indicators & Mine Locations
          </p>
        </div>

        <div className="flex items-center space-x-2.5 text-xs font-mono shrink-0">
          <span className="flex items-center space-x-1.5 bg-slate-900/90 border border-slate-800 px-2.5 sm:px-3 py-1.5 rounded-lg text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span>Mines: <strong className="text-emerald-400">{mines.length || 10}</strong></span>
          </span>
          <span className="flex items-center space-x-1.5 bg-slate-900/90 border border-slate-800 px-2.5 sm:px-3 py-1.5 rounded-lg text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span>Targets: <strong className="text-cyan-400">{zones.length || 8}</strong></span>
          </span>
        </div>
      </div>

      <DisclaimerBanner />

      {/* Map Viewport Container */}
      <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-2 sm:p-2.5 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1 py-1">
          <div className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none max-w-full">
            <button
              onClick={() => setActiveTab('candidateZones')}
              className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono font-medium transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'candidateZones'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              🎯 Landsat ML Candidate Map
            </button>
            <button
              onClick={() => setActiveTab('htmlMap')}
              className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono font-medium transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'htmlMap'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              🗺️ Bhandara GIS Overview
            </button>
            <button
              onClick={() => setActiveTab('reactMap')}
              className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono font-medium transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'reactMap'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              📡 Live React Spatial Engine
            </button>
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 hidden md:inline">
            💡 Scroll / Pinch to zoom • Drag to pan • Click markers for details
          </span>
        </div>

        <div className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] w-full rounded-lg overflow-hidden border border-slate-800/80 bg-slate-950 shadow-inner">
          {activeTab === 'candidateZones' ? (
            <iframe
              src="/candidate_zones_map.html"
              title="Manganese Prospectivity - Bhandara Real Landsat ML Candidate Zones Map"
              className="w-full h-full border-0"
              allowFullScreen
            />
          ) : activeTab === 'htmlMap' ? (
            <iframe
              src="/bhandara_manganese_map.html"
              title="Bhandara Manganese Exploration Interactive Map"
              className="w-full h-full border-0"
              allowFullScreen
            />
          ) : (
            <MapComponent mines={mines} candidateZones={zones} />
          )}
        </div>
      </div>

      {/* Quick Target Summary Table */}
      <div className="glass-card rounded-xl p-4 sm:p-5 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-xs sm:text-sm font-bold font-mono text-slate-100 uppercase tracking-wider flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Candidate Exploration Zones Summary (Bhandara Corridor)</span>
          </h3>
          <span className="text-[11px] font-mono text-slate-400">CARTO + SWIR Spectral Anomaly Layer</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono min-w-[650px]">
            <thead>
              <tr className="bg-slate-900/80 text-slate-400 border-b border-slate-800">
                <th className="p-3">Zone ID</th>
                <th className="p-3">Target Name</th>
                <th className="p-3">Location</th>
                <th className="p-3">Area (Ha)</th>
                <th className="p-3">MNI Index</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Exploration Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {zones.map((z) => (
                <tr key={z.zone_id || z.zoneId} className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-emerald-400">{z.zone_id || z.zoneId}</td>
                  <td className="p-3 text-slate-200">{z.name}</td>
                  <td className="p-3 text-slate-400">{z.location}</td>
                  <td className="p-3 text-slate-300">{z.area_hectares || z.areaHectares}</td>
                  <td className="p-3 text-cyan-400 font-bold">{z.mean_mni || z.meanMNI}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${z.priority === 'HIGH' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      (z.priority === 'MEDIUM' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30')
                      }`}>
                      {z.priority}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300 max-w-xs truncate">{z.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default ExplorationMap;
