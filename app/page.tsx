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

  const handleRegister = async () => { /* ... tua logica invariata ... */ };
  const handleLogin = async () => { /* ... tua logica invariata ... */ };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {step === 'welcome' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-gray-800 mb-3">🎯 PlayRoster</h1>
            <p className="text-gray-600 mb-6 text-sm">
              Gestisci il tuo fantacalcio come una vera squadra di Serie A. Ruoli realistici: Presidenti, DS, Allenatori e Viceallenatori.
            </p>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mb-3"
              onClick={() => setStep('login')}
            >
              Login
            </button>
            <button
              className="w-full border border-gray-400 hover:bg-gray-50 py-2 rounded font-medium"
              onClick={() => setStep('register')}
            >
              Registrati
            </button>
          </div>
        )}

        {step === 'login' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Accesso</h2>
            <input
              type="email"
              placeholder="Email"
              className="mb-3 w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="mb-3 w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold mb-3"
              disabled={loading}
            >
              {loading ? 'Accesso...' : 'Accedi'}
            </button>
            <button
              onClick={() => setStep('welcome')}
              className="w-full text-sm text-gray-500 hover:underline"
            >
              ← Torna alla Home
            </button>
          </div>
        )}

        {step === 'register' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Registrazione</h2>
            <input
              type="text"
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
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold mb-3"
              disabled={loading}
            >
              {loading ? 'Registrazione...' : 'Registrati'}
            </button>
            <button
              onClick={() => setStep('welcome')}
              className="w-full text-sm text-gray-500 hover:underline"
            >
              ← Torna alla Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
