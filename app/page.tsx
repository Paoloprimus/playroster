// File: app/page.tsx

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

    // Dopo signUp, salviamo i dati extra in tabella `users`
    const user = data.user;

    if (user) {
      await supabase.from('users').insert({
        id: user.id,
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
        <div className="w-full max-w-md text-center bg-white shadow p-6 roun
