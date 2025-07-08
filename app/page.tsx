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

  // ▶️ REGISTRAZIONE
  const handleRegister = async () => {
    setLoading(true);
    setError(null);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from('users').insert({
        id: data.user.id,
        email: form.email,
        name: form.name,
        role: form.role,
        team_id: null,
      });
    }

    setLoading(false);
    alert('Registrazione completata! Controlla l’email per confermare l’account.');
    setStep('login');
  };

  // ▶️ LOGIN
  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    if (!data.user?.email_confirmed_at) {
      setError('Devi confermare l’email prima di accedere.');
      setLoading(false);
      return;
    }

    setLoading(false);
    setStep('dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border border-gray-200">
        {/* 🏟️ WELCOME */}
        {step === 'welcome' && (
          <>
            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl mr-2">🏟️</span>
              <h1 className="text-3xl font-bold text-gray-800">PlayRoster</h1>
            </div>
            <p className="text-gray-600 text-sm mb-6 text-center">
              Gestisci il tuo fantacalcio come una vera squadra di Serie A.<br />
              Ruoli realistici: Presidenti, DS, Allenatori e Viceallenatori.
            </p>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mb-3"
              onClick={() => setStep('login')}
            >
              Login
            </button>
            <button
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded"
              onClick={() => setStep('register')}
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

        {/* 📊 DASHBOARD (placeholder) */}
        {step === 'dashboard' && (
          <>
            <h2 className="text-xl font-bold mb-4">Dashboard</h2>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Crea una nuova lega</h3>
              <input
                placeholder="Nome lega"
                className="mb-2 w-full border px-3 py-2 rounded"
                value={leagueName}
                onChange={(e) => setLeagueName(e.target.value)}
              />
              <button className="bg-green-600 text-white py-2 px-4 rounded">Crea Lega</button>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Crea una nuova squadra</h3>
              <input
                placeholder="Nome squadra"
                className="mb-2 w-full border px-3 py-2 rounded"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
              <button className="bg-green-600 text-white py-2 px-4 rounded">Crea Squadra</button>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Assegna ruoli</h3>
              <p className="text-sm text-gray-600 mb-2">Funzionalità in sviluppo…</p>
            </div>

            <button
              onClick={() => setStep('login')}
              className="mt-6 w-full border border-gray-400 py-2 rounded text-sm"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
