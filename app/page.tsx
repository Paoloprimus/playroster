'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function Home() {
  const [step, setStep] = useState<'welcome' | 'login' | 'dashboard'>('welcome');
  const [form, setForm] = useState({ email: '', password: '' });
  const [leagueName, setLeagueName] = useState('');
  const [teamName, setTeamName] = useState('');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      {step === 'welcome' && (
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-4">Benvenuto su PlayRoster</h1>
            <p className="mb-4 text-gray-600">
              Gestisci il tuo fantacalcio come una vera squadra di Serie A: Presidenti, DS e Allenatori.
            </p>
            <Button className="w-full" onClick={() => setStep('login')}>
              Inizia
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 'login' && (
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Accedi o Registrati</h2>
            <Input
              placeholder="Email"
              type="email"
              className="mb-3"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              placeholder="Password"
              type="password"
              className="mb-6"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Button className="w-full mb-2" onClick={() => setStep('dashboard')}>
              Entra
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => setStep('welcome')}>
              Indietro
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 'dashboard' && (
        <Card className="w-full max-w-lg">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Dashboard</h2>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Crea una nuova lega</h3>
              <Input
                placeholder="Nome lega"
                className="mb-2"
                value={leagueName}
                onChange={(e) => setLeagueName(e.target.value)}
              />
              <Button>Crea Lega</Button>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Crea una nuova squadra</h3>
              <Input
                placeholder="Nome squadra"
                className="mb-2"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
              <Button>Crea Squadra</Button>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Assegna ruoli</h3>
              <p className="text-sm text-gray-600 mb-2">Funzionalità in sviluppo...</p>
            </div>

            <Button variant="ghost" className="mt-6" onClick={() => setStep('login')}>
              Logout
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
