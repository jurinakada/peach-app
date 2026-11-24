import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AI_PARTNER_PROFILE } from '../mockData'
import Avatar from '../components/Avatar'
import CoinBadge from '../components/CoinBadge'
import Village3D from '../components/Village3D'
import VillageTalk from '../components/VillageTalk'
import ContactList from '../components/ContactList'

export default function Lobby() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('normal') // 'normal' | 'virtual'
  const [talkingTo, setTalkingTo] = useState(null)

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

      <div className="shop-tabs mode-tabs">
        <button
          className={'shop-tab' + (mode === 'normal' ? ' active' : '')}
          onClick={() => setMode('normal')}
        >
          💬 Normal
        </button>
        <button
          className={'shop-tab' + (mode === 'virtual' ? ' active' : '')}
          onClick={() => setMode('virtual')}
        >
          🌍 Virtual World
        </button>
      </div>

      {mode === 'virtual' ? (
        <>
          <p className="lobby-sub">Move around and talk to people, face to face</p>
          <Village3D onTalk={setTalkingTo}>
            {talkingTo && <VillageTalk userId={talkingTo} onClose={() => setTalkingTo(null)} />}
          </Village3D>
        </>
      ) : (
        <>
          <p className="lobby-sub">Tap someone to start chatting</p>
          <ContactList />
        </>
      )}
    </div>
  )
}
