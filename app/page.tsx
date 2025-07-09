'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Home() {
  const [step, setStep] = useState('welcome');
  const [form, setForm] = useState({ email: '', password: '', name: '', role: 'allenatore' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    alert('Registrazione completata! Controlla l’email per confermare.');
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

    const user = data.user;

    if (!user?.email_confirmed_at) {
      setError('Devi confermare l’email prima di accedere.');
      setLoading(false);
      return;
    }

    // Aggiorna verified = true nella tabella users
    await supabase.from('users')
      .update({ verified: true })
      .eq('id', user.id);

    // Legge il ruolo dell’utente per reindirizzare alla dashboard giusta
    const { data: userRow } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    const role = userRow?.role || 'allenatore';

    if (role === 'admin_lega') {
      window.location.href = '/dashboard-admin';
    } else {
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8 border border-gray-200 font-sans">
        {step === 'welcome' && (
          <>
            <div className="flex items-center justify-center mb-6">
              <span className="text-4xl mr-2">🏟️</span>
              <h1 className="text-3xl font-bold text-gray-800">PlayRoster</h1>
            </div>
            <p className="text-gray-600 text-center mb-6 text-sm">
              CREA E GESTISCI LA TUA ROSA!
            </p>
            <button
              onClick={() => setStep('login')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mb-3"
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

        {step === 'login' && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Login</h2>
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
            {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mb-3"
              disabled={loading}
            >
              {loading ? 'Accesso...' : 'Accedi'}
            </button>
            <button
              onClick={() => setStep('welcome')}
              className="text-sm text-gray-500 hover:underline w-full text-center"
            >
              ← Torna alla home
            </button>
          </>
        )}

        {step === 'register' && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Registrazione</h2>
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
              <option value="admin_lega">Admin di lega</option>
              <option value="allenatore">Allenatore</option>
            </select>
            {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
            <button
              onClick={handleRegister}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded mb-3"
              disabled={loading}
            >
              {loading ? 'Registrazione...' : 'Registrati'}
            </button>
            <button
              onClick={() => setStep('welcome')}
              className="text-sm text-gray-500 hover:underline w-full text-center"
            >
              ← Torna alla home
            </button>
          </>
        )}
      </div>
    </div>
  );
}
