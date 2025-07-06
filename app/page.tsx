'use client';

import { useState } from 'react';

export default function Home() {
  const [step, setStep] = useState<'welcome' | 'login' | 'dashboard'>('welcome');
  const [form, setForm] = useState({ email: '', password: '' });
  const [leagueName, setLeagueName] = useState('');
  const [teamName, setTeamName] = useState('');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      {step === 'welcome' && (
        <div className="w-full max-w-md text-center bg-white shadow p-6 rounded">
          <h1 className="text-2xl font-bold mb-4">Benvenuto su PlayRoster</h1>
          <p className="mb-4 text-gray-600">
            Gestisci il tuo fantacalcio come una vera squadra di Serie A: Presidenti, DS e Allenatori.
          </p>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded"
            onClick={() => setStep('login')}
          >
            Inizia
          </button>
        </div>
      )}

      {step === 'login' && (
        <div className="w-full max-w-md bg-white shadow p-6 rounded">
          <h2 className="text-xl font-semibold mb-4">Accedi o Registrati</h2>
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
            className="mb-6 w-full border px-3 py-2 rounded"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            className="w-full bg-blue-600 text-white py-2 rounded mb-2"
            onClick={() => setStep('dashboard')}
          >
            Entra
          </button>
          <button
            className="w-full border border-gray-400 py-2 rounded"
            onClick={() => setStep('welcome')}
          >
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

          <button
            className="mt-6 w-full border border-gray-400 py-2 rounded"
            onClick={() => setStep('login')}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
