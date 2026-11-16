import { NavLink } from 'react-router-dom'

const TABS = [
  { to: '/', label: 'Lobby', icon: '🏠', end: true },
  { to: '/battle', label: 'Battle', icon: '⚔️' },
  { to: '/shop', label: 'Shop', icon: '🛍️' },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) => 'nav-tab' + (isActive ? ' active' : '')}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
