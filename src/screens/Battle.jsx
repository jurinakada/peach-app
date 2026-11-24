import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BATTLE_ROUNDS,
  BATTLE_TEAMMATES,
  BATTLE_WIN_BONUS,
  BATTLE_WIN_THRESHOLD,
  CULTURE_ITEMS,
  LOBBY_USERS,
  ME,
  OPPONENT_SCORE_GAINS,
  OPPONENT_TEAM_NAME,
  SECONDS_PER_ROUND,
} from '../mockData'
import Avatar from '../components/Avatar'
import { useGame } from '../state/GameContext'

const OPPONENT_BASE_SCORE = 60

function getTeammate(teammateId) {
  const roster = BATTLE_TEAMMATES.find((t) => t.id === teammateId)
  const user = LOBBY_USERS.find((u) => u.id === teammateId)
  return { ...roster, emoji: user.emoji, color: user.color }
}

// phase: 'intro' | 'playing' | 'feedback' | 'result'
export default function Battle() {
  const navigate = useNavigate()
  const { earnCoins, collectItem } = useGame()

  const [phase, setPhase] = useState('intro')
  const [roundIndex, setRoundIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(SECONDS_PER_ROUND)
  const [myScore, setMyScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(OPPONENT_BASE_SCORE)
  const [correctCount, setCorrectCount] = useState(0)
  const [selectedId, setSelectedId] = useState(null)
  const [wonItems, setWonItems] = useState([])
  const timerRef = useRef(null)

  const round = BATTLE_ROUNDS[roundIndex]
  const hintTeammate = round ? getTeammate(round.hint.teammateId) : null

  useEffect(() => {
    if (phase !== 'playing') return
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current)
          handleAnswer(null)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, roundIndex])

  function startBattle() {
    setRoundIndex(0)
    setMyScore(0)
    setOpponentScore(OPPONENT_BASE_SCORE)
    setCorrectCount(0)
    setWonItems([])
    setSecondsLeft(SECONDS_PER_ROUND)
    setSelectedId(null)
    setPhase('playing')
  }

  function handleAnswer(choiceId) {
    clearInterval(timerRef.current)
    setSelectedId(choiceId)
    const isCorrect = choiceId === round.answerId
    setOpponentScore((s) => s + OPPONENT_SCORE_GAINS[roundIndex])
    if (isCorrect) {
      setCorrectCount((c) => c + 1)
      setMyScore((s) => s + round.reward.coins)
      earnCoins(round.reward.coins)
      collectItem(round.reward.item)
      setWonItems((items) => [...items, round.reward.item])
    }
    setPhase('feedback')
  }

  function nextRound() {
    const next = roundIndex + 1
    if (next >= BATTLE_ROUNDS.length) {
      if (correctCount >= BATTLE_WIN_THRESHOLD) {
        earnCoins(BATTLE_WIN_BONUS)
        setMyScore((s) => s + BATTLE_WIN_BONUS)
      }
      setPhase('result')
      return
    }
    setRoundIndex(next)
    setSecondsLeft(SECONDS_PER_ROUND)
    setSelectedId(null)
    setPhase('playing')
  }

  if (phase === 'intro') {
    return (
      <div className="screen">
        <header className="screen-header">
          <h1>Team Battle ⚔️</h1>
        </header>
        <p className="lobby-sub">
          Team up and complete missions before time runs out — your teammates' language
          becomes your hint.
        </p>
        <div className="team-row">
          <TeammateCard name={ME.name} flag={ME.flag} emoji={ME.emoji} color={ME.color} lang={ME.lang} isMe />
          {BATTLE_TEAMMATES.map((t) => (
            <TeammateCard key={t.id} flag={t.flag} {...getTeammate(t.id)} />
          ))}
        </div>
        <button className="primary-btn" onClick={startBattle}>
          Start Battle
        </button>
      </div>
    )
  }

  if (phase === 'result') {
    const won = correctCount >= BATTLE_WIN_THRESHOLD
    return (
      <div className="screen result-screen">
        <h1>{won ? '🏆 Victory!' : '😅 So Close!'}</h1>
        <p className="lobby-sub">
          {correctCount} / {BATTLE_ROUNDS.length} missions complete
        </p>
        <div className="coins-earned">+{myScore} 🍑</div>
        {wonItems.length > 0 && (
          <div className="won-items-row">
            {wonItems.map((id) => {
              const item = CULTURE_ITEMS.find((i) => i.id === id)
              if (!item) return null
              return (
                <div key={id} className="won-item-chip" title={`${item.name} · ${item.country}`}>
                  {item.emoji}
                </div>
              )
            })}
          </div>
        )}
        <div className="result-actions">
          <button className="primary-btn" onClick={startBattle}>
            Play Again
          </button>
          <button className="secondary-btn" onClick={() => navigate('/shop')}>
            Collect the World
          </button>
          <button className="secondary-btn" onClick={() => navigate('/')}>
            Back to Lobby
          </button>
        </div>
      </div>
    )
  }

  // playing or feedback
  return (
    <div className="screen">
      <header className="screen-header">
        <span className="progress-label">Team Battle · Round {roundIndex + 1}</span>
        <div className={`timer ${secondsLeft <= 5 ? 'urgent' : ''}`}>{formatTime(secondsLeft)}</div>
      </header>

      <div className="vs-row">
        <div className="vs-card mine">
          <span className="label-caps">Team Peach</span>
          <strong>{myScore}</strong>
        </div>
        <span className="vs-label">VS</span>
        <div className="vs-card theirs">
          <span className="label-caps">{OPPONENT_TEAM_NAME}</span>
          <strong>{opponentScore}</strong>
        </div>
      </div>

      <div className="roster-row">
        <RosterChip name="You" lang={ME.lang} emoji={ME.emoji} color={ME.color} />
        {BATTLE_TEAMMATES.map((t) => (
          <RosterChip key={t.id} {...getTeammate(t.id)} />
        ))}
      </div>

      <div className="mission-card">
        <span className="label-caps">Mission</span>
        <p>{round.mission}</p>
      </div>

      <div className="hint-card">
        <Avatar emoji={hintTeammate.emoji} color={hintTeammate.color} size={32} />
        <div>
          <span className="label-caps accent">
            Hint from {hintTeammate.name} · {hintTeammate.lang}
          </span>
          <p className="hint-text">"{round.hint.text}"</p>
          <p className="hint-translation">{round.hint.translation}</p>
        </div>
      </div>

      <h2 className="question-prompt">{round.question}</h2>

      <div className="choice-list">
        {round.choices.map((choice) => {
          let cls = 'choice-row'
          if (phase === 'feedback') {
            if (choice.id === round.answerId) cls += ' correct'
            else if (choice.id === selectedId) cls += ' wrong'
          }
          return (
            <button
              key={choice.id}
              className={cls}
              disabled={phase === 'feedback'}
              onClick={() => handleAnswer(choice.id)}
            >
              <span className="choice-swatch" style={{ background: choice.color }} />
              {choice.label}
              {phase === 'feedback' && choice.id === round.answerId && (
                <span className="choice-check">✓</span>
              )}
            </button>
          )
        })}
      </div>

      {phase === 'feedback' && selectedId === round.answerId && (
        <div className="reward-toast">
          🍑 +{round.reward.coins} coins · New item:{' '}
          {CULTURE_ITEMS.find((i) => i.id === round.reward.item)?.name} from{' '}
          {CULTURE_ITEMS.find((i) => i.id === round.reward.item)?.country}
        </div>
      )}

      {phase === 'feedback' && (
        <button className="primary-btn" onClick={nextRound}>
          {roundIndex + 1 >= BATTLE_ROUNDS.length ? 'See Results' : 'Next Round'}
        </button>
      )}
    </div>
  )
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `⏱ ${m}:${String(s).padStart(2, '0')}`
}

function TeammateCard({ name, flag, emoji, color, lang, isMe }) {
  return (
    <div className="teammate-card">
      <Avatar emoji={emoji} color={color} size={48} />
      <strong>{isMe ? 'You' : name}</strong>
      <span>
        {flag} {lang}
      </span>
    </div>
  )
}

function RosterChip({ name, lang, emoji, color }) {
  return (
    <div className="roster-chip">
      <div className="roster-pill" style={{ background: color }}>
        <span>{emoji}</span>
        <strong>{name}</strong>
      </div>
      <span className="roster-lang">{lang}</span>
    </div>
  )
}
