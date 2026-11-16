// Simple circular avatar used in the lobby, chat header and battle roster.
// `accessory` is an emoji overlay (e.g. an equipped shop item) shown top-right.
export default function Avatar({ emoji, color, size = 48, accessory, ring }) {
  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        background: color,
        boxShadow: ring ? `0 0 0 3px ${ring}` : undefined,
      }}
    >
      <span style={{ fontSize: size * 0.5 }}>{emoji}</span>
      {accessory && (
        <span className="avatar-accessory" style={{ fontSize: size * 0.4 }}>
          {accessory}
        </span>
      )}
    </div>
  )
}
