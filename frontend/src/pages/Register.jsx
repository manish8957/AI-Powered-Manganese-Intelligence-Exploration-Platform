import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Pickaxe, User, Mail, Lock } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Analyst');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/register', { name, email, password, role });
      if (res.data && res.data.token) {
        localStorage.setItem('sih_token', res.data.token);
        if (res.data.user) {
          localStorage.setItem('sih_user', JSON.stringify(res.data.user));
        }
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex items-center justify-center p-3 sm:p-6 font-sans selection:bg-emerald-500 selection:text-slate-950">
      <div className="glass-panel w-full max-w-md rounded-2xl border border-slate-800 p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 mx-auto">
            <Pickaxe className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 font-bold" />
          </div>
          <h2 className="font-bold text-lg sm:text-xl font-mono text-slate-100 uppercase tracking-tight">Create Analyst Account</h2>
          <p className="text-xs font-mono text-slate-400">National Manganese Intelligence Platform</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono p-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div>
            <label className="text-slate-400 block mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. Rajesh Sharma"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="r.sharma@gsi.gov.in"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Role Permission</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
            >
              <option value="Admin">Admin (Full Access & Upload)</option>
              <option value="Analyst">Analyst (ML Predictions & GIS)</option>
              <option value="Viewer">Viewer (Dashboard Only)</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            {loading ? 'Creating Account...' : 'Register User'}
          </button>
        </form>

        <div className="pt-2 text-center text-xs font-mono">
          <Link to="/login" className="text-slate-400 hover:text-slate-200">
            Already registered? Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
