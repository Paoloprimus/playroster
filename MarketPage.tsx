// FASE 4: Funzionalità di mercato – PlayRoster
// 📦 Obiettivo: creare un sistema completo e realistico per la fase di mercato del fantacalcio
// 🛠️ Stack: React + TailwindCSS + Zustand (state) + Supabase (db + realtime)

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useMarketStore } from '@/stores/marketStore'

export default function MarketPage() {
  const [players, setPlayers] = useState([])
  const [filter, setFilter] = useState('')
  const [currentUser, setCurrentUser] = useState(null)

  const {
    budget,
    selectedPlayer,
    currentBid,
    draftQueue,
    placeBid,
    joinDraft,
    confirmDraftPick,
  } = useMarketStore()

  // FETCH GIOCATORI INIZIALI
  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase.from('players').select('*')
      if (data) setPlayers(data)
    }
    fetchPlayers()
  }, [])

  const filteredPlayers = players.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase()) ||
    p.role.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="p-4 max-w-screen-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Fase di Mercato</h1>

      {/* SALDO E RICERCA */}
      <div className="flex justify-between mb-4">
        <span className="text-lg font-semibold">💰 Saldo: {budget}M</span>
        <input
          type="text"
          className="border px-2 py-1 rounded"
          placeholder="Cerca giocatore o ruolo..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>

      {/* LISTA GIOCATORI */}
      <div className="grid grid-cols-1 gap-2">
        {filteredPlayers.map(p => (
          <div key={p.id} className="border p-2 rounded shadow flex justify-between">
            <div>
              <div className="font-bold">{p.name} ({p.role})</div>
              <div className="text-sm text-gray-600">Quotazione: {p.price}M</div>
            </div>
            <div>
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded"
                onClick={() => placeBid(p)}
              >Offri</button>
            </div>
          </div>
        ))}
      </div>

      {/* AREA DRAFT (semplificata) */}
      {draftQueue.length > 0 && (
        <div className="mt-6 p-4 border rounded bg-yellow-50">
          <h2 className="text-xl font-semibold mb-2">Draft in corso</h2>
          <ul className="list-disc pl-4">
            {draftQueue.map((user, idx) => (
              <li key={idx}>{user}</li>
            ))}
          </ul>
          <button
            onClick={confirmDraftPick}
            className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
          >Conferma scelta</button>
        </div>
      )}

      {/* STORICO OFFERTA (semplificato) */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-2">📜 Storico offerte</h2>
        {/* TODO: mostrare lista offerte salvate in Supabase */}
      </div>
    </div>
  )
}

/* 🔁 NOTE TECNICHE:
1. La funzione `placeBid` aggiorna Supabase con l’offerta e assegna il giocatore se è il miglior offerente al termine del timer.
2. La `draftQueue` è un array gestito da Zustand o derivato da Supabase.
3. Il saldo (budget) si aggiorna dinamicamente con ogni acquisto.
4. Supabase può inviare notifiche realtime su nuove offerte e assegnazioni.
5. Per l’esportazione, si può generare un CSV lato client con la rosa squadra.
*/
