import { useNavigate } from 'react-router-dom'
import { AI_PARTNER_PROFILE, AI_PARTNER_SCENARIOS } from '../mockData'
import Avatar from '../components/Avatar'
import { useGame } from '../state/GameContext'

// "Talk with an AI partner any time" — free access to any scenario,
// regardless of Study Plan progress. Real-life practice topics live here.
export default function AIPartnerPicker() {
  const navigate = useNavigate()
  const { completedScenarios } = useGame()

  return (
    <div className="screen">
      <header className="screen-header chat-header">
        <Avatar emoji={AI_PARTNER_PROFILE.emoji} color={AI_PARTNER_PROFILE.color} size={36} />
        <div className="chat-header-text">
          <strong>{AI_PARTNER_PROFILE.lang} · AI Partner</strong>
          <span className="label-caps">Real-life practice</span>
        </div>
        <button className="close-btn" onClick={() => navigate('/')}>
          ✕
        </button>
      </header>
      <p className="lobby-sub">Pick a topic — practice any time, at your own speed.</p>

      <div className="scenario-list">
        {AI_PARTNER_SCENARIOS.map((scenario) => (
          <button
            key={scenario.id}
            className="scenario-card"
            onClick={() => navigate(`/ai-partner/${scenario.id}`)}
          >
            <span className="scenario-icon">{scenario.icon}</span>
            <div className="scenario-card-text">
              <strong>{scenario.title}</strong>
              <span>{scenario.topic}</span>
            </div>
            {completedScenarios.includes(scenario.id) && <span className="scenario-done">✓</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
