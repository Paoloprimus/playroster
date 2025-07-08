'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Home() {
  const [step, setStep] = useState<'welcome' | 'login' | 'register' | 'dashboard'>('welcome');
  const [form, setForm] = useState({ email: '', password: '', name: '', role: 'allenatore' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [leagueName, setLeagueName] = useState('');
  const [teamName, setTeamName] = useState('');

  const handleRegister = async () => { /* stessa tua logica */ };
  const handleLogin = async () => { /* stessa tua logica */ };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 px-4 font-sans">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border border-gray-200">
        {/* 👋 WELCOME */}
        {step === 'welcome' && (
          <>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🏟️</span>
              <h1 className="text-2xl font-bold text-gray-800">PlayRoster</h1>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Gestisci il tuo fantacalcio come una vera squadra di Serie A.<br />
              Ruoli realistici: Presidenti, DS, Allenatori e Viceallenatori.
            </p>
            <button
              onClick={() => setStep('login')}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded mb-3"
            >
              Login
            </button>
            <button
              onClick={() => setStep('register')}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded"
            >
              Registrati
            </button>
          </>
        )}

        {/* 🔐 LOGIN */}
        {step === 'login' && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Accedi al tuo account</h2>
            <input
              type="email"
              placeholder="Email"
              className="mb-3 w-full border px-3 py-2 rounded"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="mb-3 w-full border px-3 py-2 rounded"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mb-3"
              disabled={loading}
            >
              {loading ? 'Accesso...' : 'Accedi'}
            </button>
            <button
              onClick={() => setStep('welcome')}
              className="text-sm text-gray-500 hover:underline"
            >
              ← Torna alla home
            </button>
          </>
        )}

        {/* 🧾 REGISTRAZIONE */}
        {step === 'register' && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Registrazione</h2>
            <input
              placeholder="Nome"
              className="mb-3 w-full border px-3 py-2 rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="mb-3 w-full border px-3 py-2 rounded"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="mb-3 w-full border px-3 py-2 rounded"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <select
              className="mb-3 w-full border px-3 py-2 rounded bg-white"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="admin">Admin globale</option>
              <option value="admin_lega">Admin di lega</option>
              <option value="presidente">Presidente</option>
              <option value="ds">Direttore Sportivo</option>
              <option value="allenatore">Allenatore</option>
              <option value="viceallenatore">Viceallenatore</option>
            </select>
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            <button
              onClick={handleRegister}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded mb-3"
              disabled={loading}
            >
              {loading ? 'Registrazione...' : 'Registrati'}
            </button>
            <button
              onClick={() => setStep('welcome')}
              className="text-sm text-gray-500 hover:underline"
            >
              ← Torna alla home
            </button>
          </>
        )}
      </div>
    </div>
  );
}
