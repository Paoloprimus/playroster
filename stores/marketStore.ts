// File: stores/marketStore.ts

import { create } from 'zustand'

export const useMarketStore = create((set, get) => ({
  budget: 500, // Budget iniziale fittizio in milioni

  selectedPlayer: null,
  currentBid: null,

  draftQueue: ['User A', 'User B', 'User C'], // Simulazione di utenti in coda

  placeBid: (player) => {
    set({ selectedPlayer: player, currentBid: player.price })
    // In uno step successivo: inviare offerta su Supabase
  },

  joinDraft: (user) => {
    const queue = get().draftQueue
    if (!queue.includes(user)) {
      set({ draftQueue: [...queue, user] })
    }
  },

  confirmDraftPick: () => {
    const queue = get().draftQueue
    if (queue.length > 0) {
      const nextQueue = [...queue]
      nextQueue.shift()
      set({ draftQueue: nextQueue })
    }
  }
}))
