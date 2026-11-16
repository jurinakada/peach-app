import { createContext, useContext, useEffect, useState } from 'react'
import { STARTING_COINS } from '../mockData'

const STORAGE_KEY = 'peach-game-state-v1'

const GameContext = createContext(null)

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore corrupt storage, fall back to defaults
  }
  return { coins: STARTING_COINS, owned: [], equipped: {} }
}

export function GameProvider({ children }) {
  const [state, setState] = useState(loadInitialState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // storage can be unavailable (e.g. private mode) — safe to ignore
    }
  }, [state])

  function earnCoins(amount) {
    setState((prev) => ({ ...prev, coins: prev.coins + amount }))
  }

  function buyItem(item) {
    setState((prev) => {
      if (prev.owned.includes(item.id) || prev.coins < item.price) return prev
      return {
        ...prev,
        coins: prev.coins - item.price,
        owned: [...prev.owned, item.id],
        equipped: { ...prev.equipped, [item.category]: item.id },
      }
    })
  }

  function equipItem(item) {
    setState((prev) => ({
      ...prev,
      equipped: { ...prev.equipped, [item.category]: item.id },
    }))
  }

  const value = { ...state, earnCoins, buyItem, equipItem }
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used inside GameProvider')
  return ctx
}
