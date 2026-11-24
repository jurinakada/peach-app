import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AI_PARTNER_LANGUAGES, AI_PARTNER_PROFILE, AI_PARTNER_SCENARIOS } from '../mockData'
import Avatar from '../components/Avatar'
import { useGame } from '../state/GameContext'

// "Talk with an AI partner any time" — free access to any scenario in any
// language, regardless of Study Plan progress. Real-life practice lives here.
export default function AIPartnerPicker() {
  const navigate = useNavigate()
  const { completedScenarios } = useGame()
  const [langCode, setLangCode] = useState(AI_PARTNER_LANGUAGES[0].code)
  const scenarios = AI_PARTNER_SCENARIOS[langCode]

  return (
    <div className="screen">
      <header className="screen-header chat-header">
        <Avatar emoji={AI_PARTNER_PROFILE.emoji} color={AI_PARTNER_PROFILE.color} size={36} />
        <div className="chat-header-text">
          <strong>AI Partner</strong>
          <span className="label-caps">Real-life practice</span>
        </div>
        <button className="close-btn" onClick={() => navigate('/')}>
          ✕
        </button>
      </header>

      <div className="shop-tabs">
        {AI_PARTNER_LANGUAGES.map((language) => (
          <button
            key={language.code}
            className={'shop-tab' + (langCode === language.code ? ' active' : '')}
            onClick={() => setLangCode(language.code)}
          >
            {language.flag} {language.lang}
          </button>
        ))}
      </div>

      <p className="lobby-sub">Pick a topic — practice any time, at your own speed.</p>

      <div className="scenario-list">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            className="scenario-card"
            onClick={() => navigate(`/ai-partner/${langCode}/${scenario.id}`)}
          >
            <span className="scenario-icon">{scenario.icon}</span>
            <div className="scenario-card-text">
              <strong>{scenario.title}</strong>
              <span>{scenario.topic}</span>
            </div>
            {completedScenarios.includes(`${langCode}:${scenario.id}`) && (
              <span className="scenario-done">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
