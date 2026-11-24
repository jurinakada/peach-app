import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CONVERSATIONS, LOBBY_USERS } from '../mockData'
import { detectSlang, explainText } from '../ai/explain'
import Avatar from '../components/Avatar'

// HelloTalk-style text chat with a real human contact.
export default function Chat() {
  const { userId } = useParams()
  const navigate = useNavigate()
  const user = LOBBY_USERS.find((u) => u.id === userId)
  const conversation = CONVERSATIONS[userId]

  const [messages, setMessages] = useState(conversation?.messages ?? [])
  const [draft, setDraft] = useState('')
  const [explanations, setExplanations] = useState({}) // messageIndex -> { term, explanation } | 'loading'

  if (!user) {
    return (
      <div className="screen">
        <p>Unknown user.</p>
        <button onClick={() => navigate('/')}>Back to lobby</button>
      </div>
    )
  }

  function handleSend() {
    const text = draft.trim()
    if (!text) return
    setMessages((prev) => [...prev, { from: 'me', text, slang: [] }])
    setDraft('')
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
    <div className="screen chat-screen">
      <header className="screen-header chat-header">
        <Avatar emoji={user.emoji} color={user.color} size={36} />
        <div className="chat-header-text">
          <strong>
            {user.flag} {user.name}
          </strong>
          <span className="label-caps">Topic · {conversation?.topic}</span>
        </div>
        <button className="close-btn" onClick={() => navigate('/')}>
          ✕
        </button>
      </header>

      <div className="chat-messages">
        {messages.map((message, index) => {
          const slangKeys = detectSlang(message.text, message.slang)
          const hasSlang = slangKeys.length > 0
          const explanation = explanations[index]
          return (
            <div key={index} className={`bubble-row ${message.from}`}>
              <div className={`bubble ${message.from}`}>{message.text}</div>
              {hasSlang && !explanation && (
                <button
                  className="explain-chip"
                  onClick={() => handleExplain(index, message)}
                >
                  ✨ AI explains
                </button>
              )}
              {explanation === 'loading' && (
                <div className="explain-bubble loading">Thinking…</div>
              )}
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
      </div>

      <div className="chat-input-row">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`Message ${user.name}…`}
        />
        <button className="send-btn" onClick={handleSend}>
          ➤
        </button>
      </div>
    </div>
  )
}
