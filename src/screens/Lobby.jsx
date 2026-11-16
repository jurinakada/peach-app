import { useNavigate } from 'react-router-dom'
import { LOBBY_USERS, ME, SHOP_ITEMS } from '../mockData'
import Avatar from '../components/Avatar'
import CoinBadge from '../components/CoinBadge'
import { useGame } from '../state/GameContext'

// A simple 2D "shared space" — a peach-toned room with avatars scattered
// around it. Tapping another user's avatar opens a 1:1 chat with them.
export default function Lobby() {
  const navigate = useNavigate()
  const { equipped } = useGame()
  const hatItem = SHOP_ITEMS.find((item) => item.id === equipped.Hat)
  const myAccessory = hatItem?.emoji ?? null

  return (
    <div className="screen">
      <header className="screen-header">
        <h1>PEACH 🍑</h1>
        <CoinBadge />
      </header>

      <p className="lobby-sub">Tap someone to start chatting</p>

      <div className="room">
        <div className="room-floor" />
        {LOBBY_USERS.map((user) => (
          <button
            key={user.id}
            className="room-avatar-btn"
            style={{ left: `${user.x}%`, top: `${user.y}%` }}
            onClick={() => navigate(`/chat/${user.id}`)}
          >
            <Avatar emoji={user.emoji} color={user.color} size={54} />
            {user.status === 'online' && <span className="online-dot" />}
            <span className="room-name">
              {user.flag} {user.name}
            </span>
          </button>
        ))}

        <div
          className="room-avatar-btn room-me"
          style={{ left: `${ME.x}%`, top: `${ME.y}%` }}
        >
          <Avatar emoji={ME.emoji} color={ME.color} size={54} accessory={myAccessory} ring="#fff" />
          <span className="room-name">You</span>
        </div>
      </div>
    </div>
  )
}
