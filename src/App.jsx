import { useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { GameProvider } from './state/GameContext'
import BottomNav from './components/BottomNav'
import Onboarding from './screens/Onboarding'
import Lobby from './screens/Lobby'
import Chat from './screens/Chat'
import AIPartnerPicker from './screens/AIPartnerPicker'
import AIPartner from './screens/AIPartner'
import StudyPlan from './screens/StudyPlan'
import Battle from './screens/Battle'
import Shop from './screens/Shop'
import './App.css'

const ONBOARDED_KEY = 'peach-onboarded'

export default function App() {
  return (
    <GameProvider>
      <HashRouter>
        <AppShell />
      </HashRouter>
    </GameProvider>
  )
}

function AppShell() {
  const [onboarded, setOnboarded] = useState(() => localStorage.getItem(ONBOARDED_KEY) === 'true')

  function finishOnboarding() {
    localStorage.setItem(ONBOARDED_KEY, 'true')
    setOnboarded(true)
  }

  return (
    <div className="phone-frame">
      <div className="phone-screen">
        {onboarded ? (
          <Routes>
            <Route path="/" element={<Lobby />} />
            <Route path="/chat/:userId" element={<Chat />} />
            <Route path="/ai-partner" element={<AIPartnerPicker />} />
            <Route path="/ai-partner/:scenarioId" element={<AIPartner />} />
            <Route path="/study-plan" element={<StudyPlan />} />
            <Route path="/battle" element={<Battle />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        ) : (
          <Onboarding onFinish={finishOnboarding} />
        )}
      </div>
      {onboarded && <BottomNav />}
    </div>
  )
}
