import { useEffect, useState } from 'react'
import { CONVERSATIONS, LOBBY_USERS } from '../mockData'
import { detectSlang, explainText } from '../ai/explain'
import Avatar from './Avatar'

// In-world "live" conversation — talking to a villager face to face inside
// the Virtual World, instead of opening a separate chat screen. Their lines
// play out on their own (like someone actually talking); yours wait for you
// to tap the mic, same "speak to advance" feel as the AI Partner.
export default function VillageTalk({ userId, onClose }) {
  const user = LOBBY_USERS.find((u) => u.id === userId)
  const conversation = CONVERSATIONS[userId]
  const messages = conversation?.messages ?? []

  const [revealedCount, setRevealedCount] = useState(Math.min(1, messages.length))
  const [explanations, setExplanations] = useState({}) // index -> result | 'loading'

  const done = revealedCount >= messages.length
  const next = messages[revealedCount]
  const waitingOnThem = !done && next.from === 'them'

  // Auto-advance their lines, like someone actually talking to you; yours
  // wait for a mic tap. Cancels cleanly if the player taps ahead manually.
  useEffect(() => {
    if (done || next.from !== 'them') return
    const t = setTimeout(() => setRevealedCount((c) => c + 1), 1100)
    return () => clearTimeout(t)
  }, [revealedCount, done, next])

  if (!user) return null

  function handleMicTap() {
    if (done) return
    setRevealedCount((c) => c + 1)
  }

  async function handleExplain(index, message) {
    const keys = detectSlang(message.text, message.slang)
    const key = keys[0]
    if (!key) return
    setExplanations((prev) => ({ ...prev, [index]: 'loading' }))
    const result = await explainText(message.text, key)
    setExplanations((prev) => ({ ...prev, [index]: result }))
  }

  return (
    <div className="village-talk">
      <div className="screen-header chat-header">
        <Avatar emoji={user.emoji} color={user.color} size={34} />
        <div className="chat-header-text">
          <strong>
            {user.flag} {user.name}
          </strong>
          <span className="label-caps">Topic · {conversation?.topic}</span>
        </div>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="chat-messages">
        {messages.slice(0, revealedCount).map((message, index) => {
          const slangKeys = detectSlang(message.text, message.slang)
          const hasSlang = slangKeys.length > 0
          const explanation = explanations[index]
          return (
            <div key={index} className={`bubble-row ${message.from}`}>
              <div className={`bubble ${message.from}`}>{message.text}</div>
              {hasSlang && !explanation && (
                <button className="explain-chip" onClick={() => handleExplain(index, message)}>
                  ✨ AI explains
                </button>
              )}
              {explanation === 'loading' && <div className="explain-bubble loading">Thinking…</div>}
              {explanation && explanation !== 'loading' && (
                <div className="explain-bubble">
                  <span className="label-caps accent">AI culture note · slang</span>
                  <strong>{explanation.term}</strong>
                  <p>{explanation.explanation}</p>
                </div>
              )}
            </div>
          )
        })}
        {waitingOnThem && <div className="listening-indicator">{user.name} is talking…</div>}
      </div>

      <div className="mic-area">
        {done ? (
          <p className="lobby-sub center">That's everything for now 🎉</p>
        ) : (
          <button className="mic-btn" onClick={handleMicTap} disabled={waitingOnThem}>
            🎙️
          </button>
        )}
        {!done && <p className="mic-label">{waitingOnThem ? 'Listening…' : 'Hold to talk'}</p>}
      </div>
    </div>
  )
}
