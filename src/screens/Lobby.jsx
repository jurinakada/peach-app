import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AI_PARTNER_PROFILE, LOBBY_USERS, ME } from '../mockData'
import Avatar from '../components/Avatar'
import CoinBadge from '../components/CoinBadge'

const TREES = [
  { x: 8, y: 12 }, { x: 92, y: 10 }, { x: 10, y: 50 }, { x: 93, y: 48 },
  { x: 50, y: 6 }, { x: 6, y: 88 }, { x: 94, y: 90 },
]
const FLOWERS = [
  { x: 35, y: 34, emoji: '🌸' }, { x: 63, y: 58, emoji: '🌼' }, { x: 42, y: 80, emoji: '🌷' },
  { x: 18, y: 65, emoji: '🌼' }, { x: 85, y: 30, emoji: '🌸' },
]

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

// A small walkable village (Animal Crossing-flavored, not a literal copy):
// grass, a winding path, a pond, trees and flowers. Tap the ground (or use
// arrow keys/WASD) to walk your character around; tap another avatar to
// open a chat with them.
export default function Lobby() {
  const navigate = useNavigate()
  const villageRef = useRef(null)
  const [player, setPlayer] = useState({ x: ME.x, y: ME.y, facing: 'right' })

  useEffect(() => {
    function handleKey(e) {
      const step = 5
      let dx = 0
      let dy = 0
      if (e.key === 'ArrowLeft' || e.key === 'a') dx = -step
      else if (e.key === 'ArrowRight' || e.key === 'd') dx = step
      else if (e.key === 'ArrowUp' || e.key === 'w') dy = -step
      else if (e.key === 'ArrowDown' || e.key === 's') dy = step
      else return
      setPlayer((prev) => ({
        x: clamp(prev.x + dx, 8, 92),
        y: clamp(prev.y + dy, 10, 92),
        facing: dx < 0 ? 'left' : dx > 0 ? 'right' : prev.facing,
      }))
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  function handleVillageClick(e) {
    const rect = villageRef.current.getBoundingClientRect()
    const x = clamp(((e.clientX - rect.left) / rect.width) * 100, 8, 92)
    const y = clamp(((e.clientY - rect.top) / rect.height) * 100, 10, 92)
    setPlayer((prev) => ({ x, y, facing: x < prev.x ? 'left' : x > prev.x ? 'right' : prev.facing }))
  }

  return (
    <div className="screen">
      <header className="screen-header">
        <h1 className="wordmark">🍑 PEACH</h1>
        <CoinBadge />
      </header>

      <button className="ai-partner-card" onClick={() => navigate('/ai-partner')}>
        <Avatar emoji={AI_PARTNER_PROFILE.emoji} color={AI_PARTNER_PROFILE.color} size={40} />
        <div className="ai-partner-card-text">
          <strong>Talk with your AI Partner</strong>
          <span>Practice Spanish or English any time, at your own speed</span>
        </div>
        <span className="ai-partner-card-arrow">›</span>
      </button>

      <button className="ai-partner-card" onClick={() => navigate('/study-plan')}>
        <span className="study-plan-icon">📋</span>
        <div className="ai-partner-card-text">
          <strong>Your Study Plan</strong>
          <span>Lessons fit your level and goals</span>
        </div>
        <span className="ai-partner-card-arrow">›</span>
      </button>

      <p className="lobby-sub">Walk around, or tap someone to start chatting</p>

      <div className="village" ref={villageRef} onClick={handleVillageClick}>
        <svg className="village-ground" viewBox="0 0 400 600" preserveAspectRatio="none">
          <rect width="400" height="600" fill="#a8d98a" />
          <ellipse cx="70" cy="520" rx="52" ry="30" fill="#aee3f0" stroke="#7fc3da" strokeWidth="4" />
          <path
            d="M200,10 C120,110 280,150 200,240 C140,310 260,350 200,440 C160,490 240,510 200,590"
            fill="none"
            stroke="#e3cf9c"
            strokeWidth="38"
            strokeLinecap="round"
          />
          <path
            d="M200,10 C120,110 280,150 200,240 C140,310 260,350 200,440 C160,490 240,510 200,590"
            fill="none"
            stroke="#eedcb2"
            strokeWidth="26"
            strokeLinecap="round"
          />
        </svg>

        {TREES.map((t, i) => (
          <span key={i} className="village-decor" style={{ left: `${t.x}%`, top: `${t.y}%`, fontSize: 28 }}>
            🌳
          </span>
        ))}
        {FLOWERS.map((f, i) => (
          <span key={i} className="village-decor" style={{ left: `${f.x}%`, top: `${f.y}%`, fontSize: 16 }}>
            {f.emoji}
          </span>
        ))}

        {LOBBY_USERS.map((user) => (
          <button
            key={user.id}
            className="room-avatar-btn"
            style={{ left: `${user.x}%`, top: `${user.y}%` }}
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/chat/${user.id}`)
            }}
          >
            <span className="villager-shadow" />
            <Avatar emoji={user.emoji} color={user.color} size={54} />
            {user.status === 'online' && <span className="online-dot" />}
            <span className="room-name">
              {user.flag} {user.name}
            </span>
          </button>
        ))}

        <div
          className="room-avatar-btn room-me"
          style={{ left: `${player.x}%`, top: `${player.y}%` }}
        >
          <span className="villager-shadow" />
          <div style={{ transform: player.facing === 'left' ? 'scaleX(-1)' : 'none' }}>
            <Avatar emoji={ME.emoji} color={ME.color} size={54} ring="#fff" />
          </div>
          <span className="room-name">You</span>
        </div>
      </div>
    </div>
  )
}
