import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Pickaxe, ShieldCheck, Lock, Mail, UserPlus, LogIn, ArrowRight } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data && res.data.token) {
        localStorage.setItem('sih_token', res.data.token);
        if (res.data.user) {
          localStorage.setItem('sih_user', JSON.stringify(res.data.user));
        }
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed. Please check your credentials or register a new account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex items-center justify-center p-3 sm:p-6 font-sans selection:bg-emerald-500 selection:text-slate-950">
      <div className="glass-panel w-full max-w-md rounded-2xl border border-slate-800 p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center space-y-2">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 mx-auto">
            <Pickaxe className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 font-bold" />
          </div>
          <h2 className="font-bold text-lg sm:text-xl font-mono text-slate-100 uppercase tracking-tight">National Control Center</h2>
          <p className="text-xs font-mono text-slate-400">Manganese Intelligence & Exploration Platform</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono p-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div>
            <label className="text-slate-400 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="analyst@gsi.gov.in"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2.5 text-slate-100 focus:border-emerald-500 focus:outline-none"
              />
            </div>
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
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2.5 text-slate-100 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold font-mono py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center justify-center space-x-2"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
          </button>
        </form>

        <div className="border-t border-slate-800/80 pt-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Don't have an account?</span>
            <Link to="/register" className="text-emerald-400 font-bold hover:underline flex items-center space-x-1">
              <UserPlus className="w-3.5 h-3.5 inline mr-1" />
              <span>Register Account</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
