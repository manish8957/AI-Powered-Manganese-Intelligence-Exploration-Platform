import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import { Upload, FileText, CheckCircle2, AlertCircle, Database, Eye } from 'lucide-react';

const DataUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchUploadedFiles = async () => {
    try {
      const res = await api.get('/upload');
      if (res.data && res.data.data) setUploadedFiles(res.data.data);
    } catch (err) {
      console.log('Fetch upload files error');
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setErrorMsg('');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setErrorMsg('Please select a CSV, JSON, or Excel file first.');
      return;
    }

    setUploading(true);
    setErrorMsg('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploadResult(res.data.data);
      setFile(null);
      fetchUploadedFiles();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'File upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 uppercase tracking-tight">
            Data Upload & CSV Pipeline Ingestion
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-400 font-mono mt-0.5">
            Upload Geochemical Assay Datasets, Borehole Drilling Logs, and Mine Statistics (CSV, JSON, XLSX)
          </p>
        </div>
      </div>

      {/* Upload Dropzone */}
      <div className="glass-card rounded-2xl p-4 sm:p-8 border border-slate-800 space-y-6 text-center max-w-3xl mx-auto">
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-xl p-6 sm:p-8 transition-colors bg-slate-900/50 flex flex-col items-center justify-center space-y-3 cursor-pointer">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Upload className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <h3 className="font-bold font-mono text-xs sm:text-sm text-slate-200">
                {file ? file.name : 'Select or drag & drop CSV / Excel dataset file'}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 font-mono mt-1">
                Supports .CSV, .JSON, .XLSX files up to 10MB
              </p>
            </div>
            <input
              type="file"
              accept=".csv,.json,.xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload-input"
            />
            <label
              htmlFor="file-upload-input"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono px-4 py-2 rounded-lg cursor-pointer border border-slate-700 transition-all active:scale-95"
            >
              Browse Computer
            </label>
          </div>

          {errorMsg && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono p-3 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={uploading || !file}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono py-3 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 disabled:opacity-50 shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <Upload className="w-4 h-4 shrink-0" />
            <span>{uploading ? 'Processing File Ingestion...' : 'Upload & Parse File'}</span>
          </button>
        </form>
      </div>

      {/* Parsed Preview Result */}
      {uploadResult && (
        <div className="glass-card rounded-xl p-4 sm:p-6 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <h3 className="font-bold font-mono text-xs sm:text-sm text-emerald-400 uppercase tracking-wider flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>File Ingested & Parsed: {uploadResult.originalname}</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">Rows: {uploadResult.rowCount} | Cols: {uploadResult.columns?.length}</span>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono font-semibold text-slate-300">Detected Columns:</h4>
            <div className="flex flex-wrap gap-1.5 font-mono text-[10px] sm:text-[11px]">
              {uploadResult.columns?.map((col, i) => (
                <span key={i} className="bg-slate-900 text-cyan-400 border border-slate-800 px-2 py-1 rounded">
                  {col}
                </span>
              ))}
            </div>
          </div>

          {/* Preview Table */}
          {uploadResult.previewRows && uploadResult.previewRows.length > 0 && (
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-mono font-semibold text-slate-300">Sample Row Preview (First 5 Rows):</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[11px] font-mono min-w-[500px]">
                  <thead>
                    <tr className="bg-slate-900 text-slate-400 border-b border-slate-800">
                      {uploadResult.columns?.map((col, i) => (
                        <th key={i} className="p-2">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {uploadResult.previewRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40">
                        {uploadResult.columns?.map((col, cIdx) => (
                          <td key={cIdx} className="p-2 text-slate-200">{row[col] !== undefined ? String(row[col]) : ''}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Upload History List */}
      <div className="glass-card rounded-xl p-4 sm:p-5 border border-slate-800 space-y-4">
        <h3 className="text-xs sm:text-sm font-bold font-mono text-slate-100 uppercase tracking-wider flex items-center space-x-2">
          <Database className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Dataset Ingestion History</span>
        </h3>

        {uploadedFiles.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono min-w-[600px]">
              <thead>
                <tr className="bg-slate-900 text-slate-400 border-b border-slate-800">
                  <th className="p-3">File Name</th>
                  <th className="p-3">File Size</th>
                  <th className="p-3">Rows</th>
                  <th className="p-3">Columns</th>
                  <th className="p-3">Uploaded Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {uploadedFiles.map((f) => (
                  <tr key={f._id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-slate-200 flex items-center space-x-2">
                      <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{f.originalname}</span>
                    </td>
                    <td className="p-3 text-slate-400">{(f.size / 1024).toFixed(1)} KB</td>
                    <td className="p-3 text-emerald-400 font-bold">{f.rowCount}</td>
                    <td className="p-3 text-slate-300">{f.columns?.length || 0}</td>
                    <td className="p-3 text-slate-400">{new Date(f.createdAt).toLocaleDateString()}</td>
                    <td className="p-3">
                      <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded border border-emerald-500/30 whitespace-nowrap">
                        {f.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-slate-400 font-mono py-4 text-center">No uploaded files recorded yet.</p>
        )}
      </div>
    </Layout>
  );
};

export default DataUpload;
