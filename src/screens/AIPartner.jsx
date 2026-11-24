import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AI_PARTNER_PROFILE, AI_PARTNER_SCENARIOS } from '../mockData'
import { detectSlang, explainText } from '../ai/explain'
import Avatar from '../components/Avatar'
import { useGame } from '../state/GameContext'

// Your one AI conversation partner, running a scripted voice-practice
// session for whichever scenario was picked. Tapping the mic "speaks" your
// next line (with a pronunciation score), then the partner replies in turn.
// This mirrors a voice conversation without needing real speech recognition
// — swap handleMicTap's timeouts for a real STT/LLM round trip later.
export default function AIPartner() {
  const { scenarioId } = useParams()
  const navigate = useNavigate()
  const { completeScenario } = useGame()
  const scenario = AI_PARTNER_SCENARIOS.find((s) => s.id === scenarioId)
  const turns = scenario?.turns ?? []

  const [revealedCount, setRevealedCount] = useState(Math.min(1, turns.length))
  const [status, setStatus] = useState('idle') // 'idle' | 'listening'
  const [explanations, setExplanations] = useState({}) // turnIndex -> result | 'loading'
  const micTimeouts = useRef([])
  const completed = useRef(false)

  useEffect(() => () => micTimeouts.current.forEach(clearTimeout), [])

  const done = turns.length > 0 && revealedCount >= turns.length

  useEffect(() => {
    if (done && !completed.current) {
      completed.current = true
      completeScenario(scenario.id)
    }
  }, [done, scenario, completeScenario])

  if (!scenario) {
    return (
      <div className="screen">
        <p>Unknown scenario.</p>
        <button onClick={() => navigate('/ai-partner')}>Back to practice topics</button>
      </div>
    )
  }

  function handleMicTap() {
    if (status === 'listening' || done) return
    const turnIndex = revealedCount
    setStatus('listening')
    const t1 = setTimeout(() => {
      setStatus('idle')
      setRevealedCount(turnIndex + 1)
      const next = turns[turnIndex + 1]
      if (next && next.from === 'ai') {
        const t2 = setTimeout(() => setRevealedCount(turnIndex + 2), 700)
        micTimeouts.current.push(t2)
      }
    }, 900)
    micTimeouts.current.push(t1)
  }

  async function handleExplain(index, turn) {
    const keys = detectSlang(turn.text, turn.slang)
    const key = keys[0]
    if (!key) return
    setExplanations((prev) => ({ ...prev, [index]: 'loading' }))
    const result = await explainText(turn.text, key)
    setExplanations((prev) => ({ ...prev, [index]: result }))
  }

  return (
    <div className="screen chat-screen">
      <header className="screen-header chat-header">
        <Avatar emoji={AI_PARTNER_PROFILE.emoji} color={AI_PARTNER_PROFILE.color} size={36} />
        <div className="chat-header-text">
          <strong>{AI_PARTNER_PROFILE.lang} · AI Partner</strong>
          <span className="label-caps">Topic · {scenario.topic}</span>
        </div>
        <button className="close-btn" onClick={() => navigate('/ai-partner')}>
          ✕
        </button>
      </header>

      <div className="chat-messages">
        {turns.slice(0, revealedCount).map((turn, index) => {
          if (turn.from === 'ai') {
            const slangKeys = detectSlang(turn.text, turn.slang)
            const hasSlang = slangKeys.length > 0
            const explanation = explanations[index]
            return (
              <div key={index} className="bubble-row them">
                <div className="bubble them">
                  <div>{turn.text}</div>
                  <div className="bubble-translation">{turn.translation}</div>
                </div>
                {hasSlang && !explanation && (
                  <button className="explain-chip" onClick={() => handleExplain(index, turn)}>
                    ✨ Smart Chat
                  </button>
                )}
                {explanation === 'loading' && <div className="explain-bubble loading">Thinking…</div>}
                {explanation && explanation !== 'loading' && (
                  <div className="explain-bubble">
                    <span className="label-caps accent">Smart Chat · AI culture note</span>
                    <strong>{explanation.term}</strong>
                    <p>{explanation.explanation}</p>
                  </div>
                )}
              </div>
            )
          }

          return (
            <div key={index} className="bubble-row me">
              <div className="bubble me voice-bubble">
                <span className="waveform">▂▅▇▃▆▂▄</span>
                <span>{turn.text}</span>
              </div>
              <div className="pronunciation-card">
                <span className="label-caps pronunciation-label">✅ Pronunciation Coach</span>
                <p>
                  Score {turn.pronunciation.score}/100 — {turn.pronunciation.tip}.
                </p>
              </div>
            </div>
          )
        })}
        {status === 'listening' && <div className="listening-indicator">Listening…</div>}
      </div>

      <div className="mic-area">
        {done ? (
          <p className="lobby-sub center">Conversation complete 🎉</p>
        ) : (
          <button className="mic-btn" onClick={handleMicTap} disabled={status === 'listening'}>
            🎙️
          </button>
        )}
        {!done && <p className="mic-label">Hold to talk</p>}
      </div>
    </div>
  )
}
