import React from 'react';
import Layout from '../components/Layout';
import { Pickaxe, ShieldCheck, Cpu, Satellite, Layers, Rocket, CheckCircle } from 'lucide-react';

const About = () => {
  const futureScopeItems = [
    "Real-time satellite imagery streaming integration via Copernicus Open Access Hub.",
    "ISRO Bhuvan GIS WMS/WMTS live layer synchronization for National Mineral Maps.",
    "Deep learning 3D Convolutional Neural Networks (3D-CNN) for subsurface ore body inversion.",
    "Time-series multispectral alteration index change detection for active open pit mines.",
    "IoT telemetry sensor integration for real-time mine production & haulage tracking.",
    "Machine learning time-series ARIMA/LSTM production shortfall forecasting models.",
    "Digital Twin 3D visualization of underground mine shafts and reserve blocks."
  ];

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 uppercase tracking-tight">
            About Platform & Architecture
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-400 font-mono mt-0.5">
            Smart India Hackathon Problem Solution Architecture & Technical Roadmap
          </p>
        </div>
      </div>

      {/* Problem Statement Box */}
      <div className="glass-card rounded-xl p-4 sm:p-6 border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider">
          SIH Problem Statement
        </h3>
        <blockquote className="text-xs sm:text-sm font-mono text-slate-200 bg-slate-900/90 p-3.5 sm:p-4 rounded-xl border border-slate-800 italic leading-relaxed">
          "Using AI/ML, Space Technology, GIS and Data Analytics to identify manganese potential zones and help overcome manganese production shortfalls in India."
        </blockquote>
      </div>

      {/* Solution & Tech Stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="glass-card rounded-xl p-4 sm:p-6 border border-slate-800 space-y-3">
          <h3 className="text-xs sm:text-sm font-bold font-mono text-cyan-400 uppercase tracking-wider">
            Current Industry Challenge
          </h3>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            India faces an annual domestic manganese deficit of approximately <strong>1.10 Million Metric Tonnes (27.16%)</strong> due to rapid steel manufacturing expansion and battery sector demand. Conventional field exploration is time-consuming and expensive.
          </p>
        </div>

        <div className="glass-card rounded-xl p-4 sm:p-6 border border-slate-800 space-y-3">
          <h3 className="text-xs sm:text-sm font-bold font-mono text-emerald-400 uppercase tracking-wider">
            Our Solution Approach
          </h3>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            We combine spaceborne SWIR multispectral satellite proxies (MNI, IOI, CMI) with a Python FastAPI Machine Learning Random Forest classifier & reserve regressor, connected to an Express REST API & Leaflet GIS frontend.
          </p>
        </div>
      </div>

      {/* Future Scope Panel */}
      <div className="glass-card rounded-xl p-4 sm:p-6 border border-slate-800 space-y-4">
        <h3 className="text-xs sm:text-sm font-bold font-mono text-slate-100 uppercase tracking-wider flex items-center space-x-2">
          <Rocket className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Future Scope & Extension Roadmap</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs text-slate-300">
          {futureScopeItems.map((item, idx) => (
            <div key={idx} className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-snug text-[11px] sm:text-xs">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default About;
