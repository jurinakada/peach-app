import { HashRouter, Route, Routes } from 'react-router-dom'
import { GameProvider } from './state/GameContext'
import BottomNav from './components/BottomNav'
import Lobby from './screens/Lobby'
import Chat from './screens/Chat'
import Battle from './screens/Battle'
import Shop from './screens/Shop'
import './App.css'

export default function App() {
  return (
    <GameProvider>
      <HashRouter>
        <div className="phone-frame">
          <div className="phone-screen">
            <Routes>
              <Route path="/" element={<Lobby />} />
              <Route path="/chat/:userId" element={<Chat />} />
              <Route path="/battle" element={<Battle />} />
              <Route path="/shop" element={<Shop />} />
            </Routes>
          </div>
          <BottomNav />
        </div>
      </HashRouter>
    </GameProvider>
  )
}
