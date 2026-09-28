import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import DisclaimerBanner from '../components/DisclaimerBanner';
import { FileText, Download, Printer, Plus, CheckCircle2, Eye, X } from 'lucide-react';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const fetchReports = async () => {
    try {
      const res = await api.get('/reports');
      if (res.data && res.data.data) setReports(res.data.data);
    } catch (err) {
      console.log('Report fetch fallback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleGenerateReport = async () => {
    setGenerating(true);
    try {
      const res = await api.post('/reports', {
        title: `National Manganese Executive Briefing - ${new Date().toLocaleDateString()}`,
        reportType: 'Executive Summary',
        targetRegion: 'Central India / Sausar Belt'
      });
      fetchReports();
      if (res.data && res.data.data) setSelectedReport(res.data.data);
    } catch (err) {
      console.error('Report generation error:', err);
    } finally {
      setGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 uppercase tracking-tight">
            Executive Intelligence Reports
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-400 font-mono mt-0.5">
            Automated Export & Briefing Documents for Geological Survey & Mining Authorities
          </p>
        </div>

        <button
          onClick={handleGenerateReport}
          disabled={generating}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50 shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span>{generating ? 'Generating Brief...' : 'Generate New Report'}</span>
        </button>
      </div>

      <DisclaimerBanner />

      {/* Reports Table */}
      <div className="glass-card rounded-xl border border-slate-800 overflow-hidden">
        <div className="p-3.5 sm:p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold font-mono text-xs sm:text-sm text-slate-100 uppercase tracking-wider flex items-center space-x-2">
            <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Generated Briefings & Assessment Records</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">Total: {reports.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono min-w-[650px]">
            <thead>
              <tr className="bg-slate-900 text-slate-400 border-b border-slate-800">
                <th className="p-3">Report Title</th>
                <th className="p-3">Type</th>
                <th className="p-3">Target Region</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {reports.map((r) => (
                <tr key={r._id} className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-slate-100 flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="truncate">{r.title}</span>
                  </td>
                  <td className="p-3 text-slate-300">{r.reportType}</td>
                  <td className="p-3 text-slate-400">{r.targetRegion}</td>
                  <td className="p-3 text-slate-400">{new Date(r.createdAt || Date.now()).toLocaleDateString()}</td>
                  <td className="p-3">
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded border border-emerald-500/30 whitespace-nowrap">
                      {r.status || 'GENERATED'}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedReport(r)}
                      className="bg-slate-800 hover:bg-slate-700 text-emerald-400 font-mono text-[11px] px-3 py-1 rounded border border-slate-700 flex items-center space-x-1 active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5 shrink-0" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="glass-panel w-full max-w-3xl rounded-2xl border border-slate-800 p-4 sm:p-8 space-y-4 sm:space-y-6 relative my-4 sm:my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedReport(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 print:hidden p-1 rounded-md hover:bg-slate-800"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Print & Download Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3 sm:pb-4 print:hidden pr-8">
              <div className="flex items-center space-x-2">
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] sm:text-xs font-mono px-2.5 py-1 rounded border border-emerald-500/30 font-bold uppercase">
                  Official Briefing Document
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrint}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs px-3.5 py-1.5 sm:py-2 rounded-lg border border-slate-700 flex items-center space-x-2 active:scale-95"
                >
                  <Printer className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Print / Export PDF</span>
                </button>
              </div>
            </div>

            {/* Printable Content Container */}
            <div className="space-y-4 sm:space-y-6 text-slate-200 font-sans print:text-slate-950">
              <div className="border-b border-slate-800 pb-3 space-y-1">
                <h2 className="text-lg sm:text-xl font-bold font-mono text-slate-100 uppercase">{selectedReport.title}</h2>
                <p className="text-[11px] sm:text-xs font-mono text-slate-400">Target Region: {selectedReport.targetRegion} • Date: {new Date(selectedReport.createdAt || Date.now()).toLocaleDateString()}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs sm:text-sm font-bold font-mono text-emerald-400 uppercase tracking-wider">1. Executive Summary</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-900/80 p-3 sm:p-4 rounded-xl border border-slate-800">
                  {selectedReport.executiveSummary}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs font-mono">
                <div className="bg-slate-900 p-3.5 sm:p-4 rounded-xl border border-slate-800 space-y-1">
                  <h4 className="font-bold text-slate-100 uppercase">Production Statistics</h4>
                  <p className="text-slate-400">Current Yield: <strong className="text-emerald-400">2.95 Million MT</strong></p>
                  <p className="text-slate-400">Top State: <strong className="text-slate-200">Madhya Pradesh (36.3%)</strong></p>
                </div>

                <div className="bg-slate-900 p-3.5 sm:p-4 rounded-xl border border-slate-800 space-y-1">
                  <h4 className="font-bold text-slate-100 uppercase">Shortfall Metrics</h4>
                  <p className="text-slate-400">Domestic Demand: <strong className="text-blue-400">4.05 Million MT</strong></p>
                  <p className="text-slate-400">Net Shortfall: <strong className="text-rose-400">1.10 Million MT (27.2%)</strong></p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs sm:text-sm font-bold font-mono text-cyan-400 uppercase tracking-wider">2. Exploration Target Recommendations</h3>
                <ul className="list-disc list-inside text-xs font-mono text-slate-300 space-y-1 bg-slate-900/80 p-3 sm:p-4 rounded-xl border border-slate-800">
                  <li>BHN-ZONE-001: Dongri-Chikla North Corridor (HIGH Priority - Gondite Strike)</li>
                  <li>BHN-ZONE-002: Tirodi Extension East (HIGH Priority - 1,850 Ha Target Block)</li>
                  <li>BHN-ZONE-005: Ukwa North Plateau (HIGH Priority - Stratigraphically Equivalent Horizon)</li>
                </ul>
              </div>

              {/* Mandatory Disclaimer */}
              <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg text-[10px] sm:text-[11px] font-mono text-amber-300 leading-relaxed">
                <strong>Notice:</strong> AI-generated exploration targets and reserve estimates in this report are prototype decision-support outputs and must be officially validated through field drilling and certified resource estimation.
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Reports;
