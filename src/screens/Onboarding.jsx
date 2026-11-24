import { useEffect, useRef, useState } from 'react'
import {
  CULTURE_ITEMS,
  ONBOARDING_BONUS_COINS,
  ONBOARDING_SLIDES,
  ONBOARDING_STARTER_ITEM,
} from '../mockData'
import { useGame } from '../state/GameContext'

// Shown once, before the first Lobby visit: a splash carousel, then a
// one-time welcome reward. `onFinish` flips the app into the real router.
export default function Onboarding({ onFinish }) {
  const [step, setStep] = useState('splash') // 'splash' | 'reward'

  if (step === 'splash') {
    return <Splash onContinue={() => setStep('reward')} />
  }
  return <Reward onContinue={onFinish} />
}

function Splash({ onContinue }) {
  return (
    <div className="screen onboarding-screen">
      <div className="onboarding-bubbles">
        {ONBOARDING_SLIDES.map((slide, i) => (
          <span key={i} className="speech-bubble" style={{ background: slide.color }}>
            {slide.bubble}
          </span>
        ))}
      </div>
      <div className="onboarding-peach">🍑</div>
      <div className="dot-row">
        <span className="dot active" />
        <span className="dot" />
        <span className="dot" />
      </div>
      <button className="primary-btn" onClick={onContinue}>
        Get Started
      </button>
    </div>
  )
}

function Reward({ onContinue }) {
  const { earnCoins, collectItem } = useGame()
  const item = CULTURE_ITEMS.find((i) => i.id === ONBOARDING_STARTER_ITEM)
  const granted = useRef(false)

  useEffect(() => {
    // Guards against React StrictMode's dev-only double effect invocation —
    // without it the coin bonus would be granted twice in development.
    if (granted.current) return
    granted.current = true
    earnCoins(ONBOARDING_BONUS_COINS)
    collectItem(ONBOARDING_STARTER_ITEM)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="screen onboarding-screen reward-screen">
      <div className="confetti">🎉</div>
      <div className="onboarding-peach">🍑</div>
      <h1 className="reward-heading">Start Your New Language Journey!</h1>
      <div className="reward-card">
        <div className="reward-coins">🍑 +{ONBOARDING_BONUS_COINS} coins</div>
        <div className="reward-item">
          <span className="reward-item-emoji">{item.emoji}</span>
          <span>
            New item: {item.name} from {item.country}
          </span>
        </div>
      </div>
      <button className="primary-btn" onClick={onContinue}>
        Continue
      </button>
    </div>
  )
}
