import { useNavigate } from 'react-router-dom'
import { LOBBY_USERS, ME } from '../mockData'
import Avatar from '../components/Avatar'
import CoinBadge from '../components/CoinBadge'

// A simple 2D "shared space" — a peach-toned room with avatars scattered
// around it. Tapping another user's avatar opens a 1:1 chat with them.
export default function Lobby() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      <header className="screen-header">
        <h1 className="wordmark">🍑 PEACH</h1>
        <CoinBadge />
      </header>
      <p className="tagline">Learn a language, one bite at a time.</p>

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
          <Avatar emoji={ME.emoji} color={ME.color} size={54} ring="#fff" />
          <span className="room-name">You</span>
        </div>
      </div>
    </div>
  )
}
