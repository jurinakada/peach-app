import { useNavigate } from 'react-router-dom'
import { LOBBY_USERS } from '../mockData'
import Avatar from './Avatar'

// "Normal" mode — a plain HelloTalk-style contact list, no spatial world.
export default function ContactList() {
  const navigate = useNavigate()

  return (
    <div className="contact-list">
      {LOBBY_USERS.map((user) => (
        <button key={user.id} className="contact-row" onClick={() => navigate(`/chat/${user.id}`)}>
          <div className="contact-avatar-wrap">
            <Avatar emoji={user.emoji} color={user.color} size={48} />
            {user.status === 'online' && <span className="online-dot" />}
          </div>
          <div className="contact-info">
            <strong>
              {user.flag} {user.name}
            </strong>
            <span>{user.country}</span>
          </div>
          <span className="contact-chevron">›</span>
        </button>
      ))}
    </div>
  )
}
