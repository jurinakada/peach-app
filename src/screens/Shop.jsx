import { CULTURE_ITEMS } from '../mockData'
import CoinBadge from '../components/CoinBadge'
import { useGame } from '../state/GameContext'

export default function Shop() {
  const { coins, owned, buyItem } = useGame()

  return (
    <div className="screen">
      <header className="screen-header">
        <span className="label-caps accent">Collect the World</span>
        <CoinBadge />
      </header>
      <h1 className="collect-heading">Win coins and collect items from different cultures</h1>

      <div className="shop-grid">
        {CULTURE_ITEMS.map((item) => {
          const isOwned = owned.includes(item.id)
          const canAfford = coins >= item.price

          return (
            <div key={item.id} className="shop-card">
              <div className="shop-item-emoji">{item.emoji}</div>
              <div className="shop-item-name">{item.name}</div>
              <div className="shop-item-category">{item.country}</div>
              {isOwned ? (
                <span className="shop-owned-badge">Owned ✓</span>
              ) : (
                <button className="shop-btn" disabled={!canAfford} onClick={() => buyItem(item)}>
                  🍑 {item.price}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
