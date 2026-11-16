import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BATTLE_QUESTIONS,
  BATTLE_TEAMMATES,
  BATTLE_WIN_BONUS,
  BATTLE_WIN_THRESHOLD,
  COINS_PER_CORRECT_ANSWER,
  LOBBY_USERS,
  ME,
  SECONDS_PER_QUESTION,
} from '../mockData'
import Avatar from '../components/Avatar'
import CoinBadge from '../components/CoinBadge'
import { useGame } from '../state/GameContext'

// phase: 'intro' | 'playing' | 'feedback' | 'result'
export default function Battle() {
  const navigate = useNavigate()
  const { earnCoins } = useGame()

  const [phase, setPhase] = useState('intro')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(SECONDS_PER_QUESTION)
  const [correctCount, setCorrectCount] = useState(0)
  const [selected, setSelected] = useState(null)
  const timerRef = useRef(null)

  const question = BATTLE_QUESTIONS[questionIndex]

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
  }, [phase, questionIndex])

  function startBattle() {
    setQuestionIndex(0)
    setCorrectCount(0)
    setSecondsLeft(SECONDS_PER_QUESTION)
    setSelected(null)
    setPhase('playing')
  }

  function handleAnswer(choice) {
    clearInterval(timerRef.current)
    setSelected(choice)
    const isCorrect = choice === question.answer
    if (isCorrect) setCorrectCount((c) => c + 1)
    setPhase('feedback')
  }

  function nextQuestion() {
    const next = questionIndex + 1
    if (next >= BATTLE_QUESTIONS.length) {
      finishBattle()
      return
    }
    setQuestionIndex(next)
    setSecondsLeft(SECONDS_PER_QUESTION)
    setSelected(null)
    setPhase('playing')
  }

  function finishBattle() {
    const coinsEarned =
      correctCount * COINS_PER_CORRECT_ANSWER +
      (correctCount >= BATTLE_WIN_THRESHOLD ? BATTLE_WIN_BONUS : 0)
    earnCoins(coinsEarned)
    setPhase('result')
  }

  if (phase === 'intro') {
    return (
      <div className="screen">
        <header className="screen-header">
          <h1>Co-op Battle ⚔️</h1>
          <CoinBadge />
        </header>
        <p className="lobby-sub">Team up and answer vocab questions before time runs out!</p>
        <div className="team-row">
          <TeammateCard name={ME.name} flag={ME.flag} emoji={ME.emoji} color={ME.color} lang={ME.lang} isMe />
          {BATTLE_TEAMMATES.map((t) => {
            const user = LOBBY_USERS.find((u) => u.id === t.id)
            return <TeammateCard key={t.id} name={t.name} flag={t.flag} lang={t.lang} emoji={user.emoji} color={user.color} />
          })}
        </div>
        <button className="primary-btn" onClick={startBattle}>
          Start Battle
        </button>
      </div>
    )
  }

  if (phase === 'result') {
    const won = correctCount >= BATTLE_WIN_THRESHOLD
    const coinsEarned =
      correctCount * COINS_PER_CORRECT_ANSWER + (won ? BATTLE_WIN_BONUS : 0)
    return (
      <div className="screen result-screen">
        <h1>{won ? '🏆 Victory!' : '😅 So Close!'}</h1>
        <p className="lobby-sub">
          {correctCount} / {BATTLE_QUESTIONS.length} correct
        </p>
        <div className="coins-earned">+{coinsEarned} 🍑</div>
        <div className="result-actions">
          <button className="primary-btn" onClick={startBattle}>
            Play Again
          </button>
          <button className="secondary-btn" onClick={() => navigate('/shop')}>
            Go to Shop
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
        <span className="progress-label">
          Q{questionIndex + 1}/{BATTLE_QUESTIONS.length}
        </span>
        <div className={`timer ${secondsLeft <= 3 ? 'urgent' : ''}`}>⏱ {secondsLeft}s</div>
        <CoinBadge />
      </header>

      <div className="hints-row">
        {question.hints.map((hint) => {
          const teammate = BATTLE_TEAMMATES.find((t) => t.id === hint.teammateId)
          const user = LOBBY_USERS.find((u) => u.id === hint.teammateId)
          return (
            <div key={hint.teammateId} className="hint-card">
              <Avatar emoji={user.emoji} color={user.color} size={28} />
              <div>
                <div className="hint-lang">{teammate.flag} {teammate.lang}</div>
                <div className="hint-word">{hint.word}</div>
              </div>
            </div>
          )
        })}
      </div>

      <h2 className="question-prompt">{question.prompt}</h2>

      <div className="choices-grid">
        {question.choices.map((choice) => {
          let cls = 'choice-btn'
          if (phase === 'feedback') {
            if (choice === question.answer) cls += ' correct'
            else if (choice === selected) cls += ' wrong'
          }
          return (
            <button
              key={choice}
              className={cls}
              disabled={phase === 'feedback'}
              onClick={() => handleAnswer(choice)}
            >
              {choice}
            </button>
          )
        })}
      </div>

      {phase === 'feedback' && (
        <button className="primary-btn" onClick={nextQuestion}>
          {questionIndex + 1 >= BATTLE_QUESTIONS.length ? 'See Results' : 'Next Question'}
        </button>
      )}
    </div>
  )
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
