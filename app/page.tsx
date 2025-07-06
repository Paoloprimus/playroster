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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      {step === 'welcome' && (
        <div className="w-full max-w-md text-center bg-white shadow p-6 rounded">
          <h1 className="text-2xl font-bold mb-4">Benvenuto su PlayRoster</h1>
          <p className="mb-4 text-gray-600">
            Gestisci il tuo fantacalcio come una vera squadra di Serie A: Presidenti, DS, Allenatori e Viceallenatori.
          </p>
          <button className="w-full bg-blue-600 text-white py-2 rounded mb-2" onClick={() => setStep('login')}>
            Login
          </button>
          <button className="w-full border border-gray-400 py-2 rounded" onClick={() => setStep('register')}>
            Registrati
          </button>
        </div>
      )}

      {step === 'login' && (
        <div className="w-full max-w-md bg-white shadow p-6 rounded">
          <h2 className="text-xl font-semibold mb-4">Login</h2>
          <input
            placeholder="Email"
            type="email"
            className="mb-3 w-full border px-3 py-2 rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            placeholder="Password"
            type="password"
            className="mb-3 w-full border px-3 py-2 rounded"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
          <button className="w-full bg-blue-600 text-white py-2 rounded mb-2" onClick={handleLogin} disabled={loading}>
            {loading ? 'Accesso...' : 'Entra'}
          </button>
          <button className="w-full border border-gray-400 py-2 rounded" onClick={() => setStep('welcome')}>
            Indietro
          </button>
        </div>
      )}

      {step === 'register' && (
        <div className="w-full max-w-md bg-white shadow p-6 rounded">
          <h2 className="text-xl font-semibold mb-4">Registrazione</h2>
          <input
            placeholder="Nome"
            className="mb-3 w-full border px-3 py-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Email"
            type="email"
            className="mb-3 w-full border px-3 py-2 rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            placeholder="Password"
            type="password"
            className="mb-3 w-full border px-3 py-2 rounded"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <select
            className="mb-3 w-full border px-3 py-2 rounded"
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
          <button className="w-full bg-green-600 text-white py-2 rounded mb-2" onClick={handleRegister} disabled={loading}>
            {loading ? 'Registrazione...' : 'Registrati'}
          </button>
          <button className="w-full border border-gray-400 py-2 rounded" onClick={() => setStep('welcome')}>
            Indietro
          </button>
        </div>
      )}

      {step === 'dashboard' && (
        <div className="w-full max-w-lg bg-white shadow p-6 rounded">
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
            <p className="text-sm text-gray-600 mb-2">Funzionalità in sviluppo...</p>
          </div>

          <button className="mt-6 w-full border border-gray-400 py-2 rounded" onClick={() => setStep('login')}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
