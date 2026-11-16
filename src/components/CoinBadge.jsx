import { useGame } from '../state/GameContext'

export default function CoinBadge() {
  const { coins } = useGame()
  return (
    <div className="coin-badge">
      <span>🍑</span>
      <span>{coins}</span>
    </div>
  )
}
