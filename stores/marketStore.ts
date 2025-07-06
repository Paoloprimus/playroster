// File: stores/marketStore.ts

import { create } from 'zustand'

type MarketStore = {
  budget: number
  selectedPlayer: any
  currentBid: number | null
  draftQueue: string[]
  placeBid: (player: any) => void
  joinDraft: (user: string) => void
  confirmDraftPick: () => void
}

export const useMarketStore = create<MarketStore>((set, get) => ({
  budget: 500,
  selectedPlayer: null,
  currentBid: null,
  draftQueue: ['User A', 'User B', 'User C'],

  placeBid: (player) => {
    set({ selectedPlayer: player, currentBid: player.price })
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
