import { useNavigate } from 'react-router-dom'
import { AI_PARTNER_PROFILE } from '../mockData'
import Avatar from '../components/Avatar'
import CoinBadge from '../components/CoinBadge'
import Village3D from '../components/Village3D'

export default function Lobby() {
  const navigate = useNavigate()

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

      <p className="lobby-sub">Move around, or tap someone to start chatting</p>

      <Village3D />
    </div>
  )
}
