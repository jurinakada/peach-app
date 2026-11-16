import { useState } from 'react'
import { SHOP_ITEMS } from '../mockData'
import CoinBadge from '../components/CoinBadge'
import { useGame } from '../state/GameContext'

const TABS = ['All', 'Hat', 'Face', 'Pet', 'Background']

export default function Shop() {
  const { coins, owned, equipped, buyItem, equipItem } = useGame()
  const [tab, setTab] = useState('All')

  const items = tab === 'All' ? SHOP_ITEMS : SHOP_ITEMS.filter((i) => i.category === tab)

  return (
    <div className="screen">
      <header className="screen-header">
        <h1>Shop 🛍️</h1>
        <CoinBadge />
      </header>

      <div className="shop-tabs">
        {TABS.map((t) => (
          <button
            key={t}
            className={'shop-tab' + (tab === t ? ' active' : '')}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="shop-grid">
        {items.map((item) => {
          const isOwned = owned.includes(item.id)
          const isEquipped = equipped[item.category] === item.id
          const canAfford = coins >= item.price

          return (
            <div key={item.id} className="shop-card">
              <div className="shop-item-emoji">{item.emoji}</div>
              <div className="shop-item-name">{item.name}</div>
              <div className="shop-item-category">{item.category}</div>
              {isOwned ? (
                <button
                  className={'shop-btn' + (isEquipped ? ' owned' : '')}
                  disabled={isEquipped}
                  onClick={() => equipItem(item)}
                >
                  {isEquipped ? 'Equipped ✓' : 'Equip'}
                </button>
              ) : (
                <button
                  className="shop-btn"
                  disabled={!canAfford}
                  onClick={() => buyItem(item)}
                >
                  🍑 {item.price}
                </button>
              )}
            </div>
          )
        })}
      </div>

      <h2 className="collection-title">My Collection</h2>
      {owned.length === 0 ? (
        <p className="lobby-sub">You don't own anything yet — win battles to earn coins!</p>
      ) : (
        <div className="collection-row">
          {owned.map((id) => {
            const item = SHOP_ITEMS.find((i) => i.id === id)
            if (!item) return null
            return (
              <div key={id} className="collection-chip">
                {item.emoji}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
