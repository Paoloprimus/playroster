// File: components/AssembleaLega.tsx

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AssembleaLega({ userId, isPresident }) {
  const [proposte, setProposte] = useState([]);
  const [testo, setTesto] = useState('');

  useEffect(() => {
    fetchProposte();
  }, []);

  async function fetchProposte() {
    const { data } = await supabase.from('votazioni').select('*').order('created_at');
    setProposte(data);
  }

  async function creaProposta() {
    if (!testo.trim()) return;
    await supabase.from('votazioni').insert({ testo, creatore_id: userId });
    setTesto('');
    fetchProposte();
  }

  async function vota(propostaId, voto) {
    await supabase.from('voti').insert({ user_id: userId, proposta_id: propostaId, voto });
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Assemblea di Lega</h2>
      {isPresident && (
        <div className="mb-4">
          <textarea
            className="w-full border rounded p-2 mb-2"
            rows={3}
            placeholder="Scrivi una proposta..."
            value={testo}
            onChange={(e) => setTesto(e.target.value)}
          ></textarea>
          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={creaProposta}>
            Proponi
          </button>
        </div>
      )}
      <ul className="space-y-4">
        {proposte.map((p) => (
          <li key={p.id} className="border p-3 rounded">
            <p className="mb-2">{p.testo}</p>
            <div className="flex gap-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => vota(p.id, true)}>✔️ Sì</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => vota(p.id, false)}>❌ No</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
