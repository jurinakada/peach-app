import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { CONVERSATIONS, LOBBY_USERS, ME } from '../mockData'
import { detectSlang, explainText } from '../ai/explain'

const WORLD_HALF_X = 9
const WORLD_HALF_Z = 12
const SPEED = 7
const LABEL_HEIGHT = 2.05
const SPEECH_HEIGHT = 2.9
// How close you need to walk before you can start talking to someone — also
// keeps the zoomed-in "talking" camera framing guaranteed to fit both of you.
const TALK_RANGE = 4.5

const TREES = [
  { x: -8, z: -10 }, { x: 8, z: -10.5 }, { x: -8.5, z: 1 }, { x: 8.5, z: 0.5 },
  { x: 0, z: -11.5 }, { x: -8, z: 10.5 }, { x: 8.3, z: 10.8 },
]
const FLOWERS = [
  { x: -2.5, z: -5, color: '#f06292' }, { x: 3, z: 1, color: '#ffca28' },
  { x: -1, z: 6, color: '#ec407a' }, { x: -5, z: 4, color: '#ffca28' },
  { x: 5.5, z: -6.5, color: '#f06292' },
]

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function toWorld(user) {
  return [(user.x / 100 - 0.5) * WORLD_HALF_X * 2, (user.y / 100 - 0.5) * WORLD_HALF_Z * 2]
}

function isInRange(posRef, x, z) {
  return Math.hypot(x - posRef.current.x, z - posRef.current.z) <= TALK_RANGE
}

function useMoveInput() {
  const input = useRef({ up: false, down: false, left: false, right: false })
  useEffect(() => {
    const keyMap = {
      ArrowUp: 'up', w: 'up', W: 'up',
      ArrowDown: 'down', s: 'down', S: 'down',
      ArrowLeft: 'left', a: 'left', A: 'left',
      ArrowRight: 'right', d: 'right', D: 'right',
    }
    function onDown(e) {
      const dir = keyMap[e.key]
      if (dir) input.current[dir] = true
    }
    function onUp(e) {
      const dir = keyMap[e.key]
      if (dir) input.current[dir] = false
    }
    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
    }
  }, [])
  return input
}

function Character({ color }) {
  return (
    <>
      <mesh position={[0, 0.9, 0]}>
        <capsuleGeometry args={[0.5, 0.9, 4, 12]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.55, 16]} />
        <meshBasicMaterial color="black" transparent opacity={0.18} />
      </mesh>
    </>
  )
}

function Player({ input, posRef, frozen }) {
  const group = useRef()
  const [facing, setFacing] = useState(1)

  useFrame((_, delta) => {
    if (!frozen) {
      let dx = 0
      let dz = 0
      if (input.current.up) dz -= 1
      if (input.current.down) dz += 1
      if (input.current.left) dx -= 1
      if (input.current.right) dx += 1
      const len = Math.hypot(dx, dz)
      if (len > 0) {
        dx /= len
        dz /= len
        posRef.current.x = clamp(posRef.current.x + dx * SPEED * delta, -WORLD_HALF_X + 0.8, WORLD_HALF_X - 0.8)
        posRef.current.z = clamp(posRef.current.z + dz * SPEED * delta, -WORLD_HALF_Z + 0.8, WORLD_HALF_Z - 0.8)
        if (dx !== 0) setFacing(dx > 0 ? 1 : -1)
      }
    }
    if (group.current) {
      group.current.position.set(posRef.current.x, 0, posRef.current.z)
    }
  })

  return (
    <group ref={group}>
      <group scale={[facing, 1, 1]}>
        <Character color={ME.color} />
      </group>
    </group>
  )
}

function Villager({ user, onTalk, posRef }) {
  const [x, z] = toWorld(user)
  return (
    <group
      position={[x, 0, z]}
      onClick={() => {
        if (isInRange(posRef, x, z)) onTalk(user.id)
      }}
    >
      <Character color={user.color} />
    </group>
  )
}

function Tree({ x, z }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.12, 0.16, 0.8, 6]} />
        <meshStandardMaterial color="#8a5a3b" />
      </mesh>
      <mesh position={[0, 1.15, 0]}>
        <coneGeometry args={[0.75, 1.5, 8]} />
        <meshStandardMaterial color="#4f9d5c" />
      </mesh>
    </group>
  )
}

function Flower({ x, z, color }) {
  return (
    <mesh position={[x, 0.04, z]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[0.22, 8]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

// Chases the player normally; when talkTargetRef has a world position, it
// instead zooms in to frame the player + whoever they're talking to.
function CameraRig({ posRef, talkTargetRef }) {
  useFrame(({ camera }) => {
    const talkTarget = talkTargetRef.current
    let targetX
    let targetZ
    let targetY
    let lookX
    let lookZ
    let lookY

    if (talkTarget) {
      const midX = (posRef.current.x + talkTarget.x) / 2
      const midZ = (posRef.current.z + talkTarget.z) / 2
      targetX = midX
      targetZ = midZ + 5
      targetY = 5.5
      lookX = midX
      lookZ = midZ
      lookY = 1.3
    } else {
      targetX = posRef.current.x
      targetZ = posRef.current.z + 15
      targetY = 15
      lookX = posRef.current.x
      lookZ = posRef.current.z
      lookY = 0.8
    }

    const dx = targetX - camera.position.x
    const dz = targetZ - camera.position.z
    const dy = targetY - camera.position.y
    // Snap once close enough so the camera settles to an exact, stable
    // value instead of an asymptotic lerp nudging by sub-pixel amounts
    // forever (which also kept the overlay projections below recomputing).
    camera.position.x = Math.abs(dx) > 0.01 ? camera.position.x + dx * 0.08 : targetX
    camera.position.z = Math.abs(dz) > 0.01 ? camera.position.z + dz * 0.08 : targetZ
    camera.position.y = Math.abs(dy) > 0.01 ? camera.position.y + dy * 0.08 : targetY
    camera.lookAt(lookX, lookY, lookZ)
  })
  return null
}

// Projects world positions to screen pixels every frame and writes them
// straight to each DOM node's style (via the ref maps passed in), bypassing
// React state so this costs nothing per frame. This also avoids drei's
// <Html>, which has a known bug where one of several simultaneous instances
// can silently fail to mount its DOM portal.
function SceneProjector({ posRef, labelRefs, talkTargetRef, speechRefs }) {
  const vec = useMemo(() => new Vector3(), [])

  useFrame(({ camera, size }) => {
    project(labelRefs.current.me, posRef.current.x, posRef.current.z, LABEL_HEIGHT, camera, size, vec)
    for (const user of LOBBY_USERS) {
      const [x, z] = toWorld(user)
      project(labelRefs.current[user.id], x, z, LABEL_HEIGHT, camera, size, vec)
      const label = labelRefs.current[user.id]
      if (label) label.classList.toggle('in-range', isInRange(posRef, x, z))
    }

    const talkTarget = talkTargetRef.current
    if (talkTarget) {
      // Clamped so a speech bubble near the edge of frame doesn't overflow
      // past the rounded, overflow-hidden canvas container and get clipped.
      project(speechRefs.current.me, posRef.current.x, posRef.current.z, SPEECH_HEIGHT, camera, size, vec, 95)
      project(speechRefs.current.them, talkTarget.x, talkTarget.z, SPEECH_HEIGHT, camera, size, vec, 95)
    }
  })

  return null
}

function project(el, x, z, height, camera, size, vec, horizontalMargin = 0) {
  if (!el) return
  vec.set(x, height, z)
  vec.project(camera)
  if (vec.z > 1) {
    el.style.display = 'none'
    return
  }
  el.style.display = ''
  let px = (vec.x * 0.5 + 0.5) * size.width
  const py = (-vec.y * 0.5 + 0.5) * size.height
  if (horizontalMargin) {
    px = clamp(px, horizontalMargin, size.width - horizontalMargin)
  }
  el.style.transform = `translate(-50%, -100%) translate(${px}px, ${py}px)`
}

function LabelOverlay({ labelRefs, onTalk, posRef }) {
  return (
    <div className="labels-overlay">
      <div ref={(el) => (labelRefs.current.me = el)} className="room-name label-chip">
        {ME.emoji} You
      </div>
      {LOBBY_USERS.map((user) => {
        const [x, z] = toWorld(user)
        return (
          <div
            key={user.id}
            ref={(el) => (labelRefs.current[user.id] = el)}
            className="room-name label-chip"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (isInRange(posRef, x, z)) onTalk(user.id)
            }}
          >
            {user.emoji} {user.flag} {user.name}
          </div>
        )
      })}
    </div>
  )
}

// Live, in-world dialogue: a speech bubble floats above whoever is
// "speaking" right now (positioned by SceneProjector) instead of a chat
// transcript panel. Their lines play on their own; yours wait for the mic.
function SpeechBubbles({ speechRefs, talkingUser, currentMessage }) {
  if (!talkingUser) return null
  const isThem = currentMessage?.from === 'them'
  return (
    <>
      <div ref={(el) => (speechRefs.current.me = el)} className="speech-bubble speech-bubble-me">
        {!isThem ? currentMessage?.text : ''}
      </div>
      <div ref={(el) => (speechRefs.current.them = el)} className="speech-bubble speech-bubble-them">
        {isThem ? currentMessage.text : ''}
      </div>
    </>
  )
}

function TouchPad({ input }) {
  function bind(key) {
    return {
      onPointerDown: (e) => {
        e.preventDefault()
        input.current[key] = true
      },
      onPointerUp: () => {
        input.current[key] = false
      },
      onPointerLeave: () => {
        input.current[key] = false
      },
      onPointerCancel: () => {
        input.current[key] = false
      },
    }
  }
  return (
    <div className="dpad">
      <button className="dpad-btn dpad-up" {...bind('up')}>
        ▲
      </button>
      <button className="dpad-btn dpad-left" {...bind('left')}>
        ◀
      </button>
      <button className="dpad-btn dpad-right" {...bind('right')}>
        ▶
      </button>
      <button className="dpad-btn dpad-down" {...bind('down')}>
        ▼
      </button>
    </div>
  )
}

function TalkHud({ user, topic, status, onMicTap, onClose, micDisabled, done, hasSlang, explanation, onExplain }) {
  return (
    <>
      <button className="talk-close-btn" onClick={onClose}>
        ✕
      </button>
      <div className="talk-hud">
        <p className="talk-status">
          {done ? `That's everything for now 🎉` : status}
        </p>
        {hasSlang && !explanation && (
          <button className="explain-chip" onClick={onExplain}>
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
        {!done && (
          <button className="mic-btn" onClick={onMicTap} disabled={micDisabled}>
            🎙️
          </button>
        )}
      </div>
    </>
  )
}

// A small 3D virtual world — move with WASD/arrow keys (desktop) or the
// on-screen D-pad (touch). Tap a villager (their body or name tag) to talk
// to them face to face: the camera zooms in and dialogue appears as speech
// bubbles above each of you, instead of opening a separate chat screen.
export default function Village3D() {
  const input = useMoveInput()
  const posRef = useRef({ x: 0, z: (ME.y / 100 - 0.5) * WORLD_HALF_Z * 2 })
  const labelRefs = useRef({})
  const speechRefs = useRef({})
  const talkTargetRef = useRef(null)

  const [talkingId, setTalkingId] = useState(null)
  const [revealedCount, setRevealedCount] = useState(0)
  const [explanations, setExplanations] = useState({})

  const talkingUser = talkingId ? LOBBY_USERS.find((u) => u.id === talkingId) : null
  const messages = talkingId ? CONVERSATIONS[talkingId]?.messages ?? [] : []
  const done = talkingId ? revealedCount >= messages.length : false
  const currentMessage = revealedCount > 0 ? messages[revealedCount - 1] : null
  const nextMessage = messages[revealedCount]
  const waitingOnThem = !done && nextMessage?.from === 'them'

  function startTalking(userId) {
    const [x, z] = toWorld(LOBBY_USERS.find((u) => u.id === userId))
    talkTargetRef.current = { x, z }
    setTalkingId(userId)
    setRevealedCount(Math.min(1, (CONVERSATIONS[userId]?.messages ?? []).length))
    setExplanations({})
  }

  function stopTalking() {
    talkTargetRef.current = null
    setTalkingId(null)
  }

  // Their lines play on their own, like someone actually talking to you;
  // yours wait for a mic tap. Cancels cleanly if the player taps ahead.
  useEffect(() => {
    if (!talkingId || done || nextMessage?.from !== 'them') return
    const t = setTimeout(() => setRevealedCount((c) => c + 1), 1100)
    return () => clearTimeout(t)
  }, [talkingId, revealedCount, done, nextMessage])

  function handleMicTap() {
    if (!talkingId || done) return
    setRevealedCount((c) => c + 1)
  }

  async function handleExplain() {
    if (!currentMessage) return
    const keys = detectSlang(currentMessage.text, currentMessage.slang)
    const key = keys[0]
    if (!key) return
    setExplanations((prev) => ({ ...prev, [revealedCount]: 'loading' }))
    const result = await explainText(currentMessage.text, key)
    setExplanations((prev) => ({ ...prev, [revealedCount]: result }))
  }

  const slangKeys = currentMessage?.from === 'them' ? detectSlang(currentMessage.text, currentMessage.slang) : []
  const hasSlang = slangKeys.length > 0

  return (
    <div className="village3d-wrap">
      {/* Canvas's own internal sizing divs use height:100%, which can fail to
          resolve against a `flex: 1` parent (a well-known CSS gotcha). An
          absolutely-positioned inset:0 wrapper sizes against the nearest
          positioned ancestor directly instead, sidestepping that entirely. */}
      <div className="village3d-canvas-box">
        <Canvas shadows camera={{ position: [0, 15, 15], fov: 60 }} dpr={[1, 1.5]}>
          <color attach="background" args={['#cdeedd']} />
          <fog attach="fog" args={['#cdeedd', 24, 55]} />
          <ambientLight intensity={0.8} />
          <directionalLight position={[6, 10, 4]} intensity={0.9} />

          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[WORLD_HALF_X * 2 + 4, WORLD_HALF_Z * 2 + 4]} />
            <meshStandardMaterial color="#9ed98a" />
          </mesh>
          <mesh position={[-6, 0.03, 8]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[2.2, 24]} />
            <meshStandardMaterial color="#8fd0e6" />
          </mesh>

          {TREES.map((t, i) => (
            <Tree key={i} {...t} />
          ))}
          {FLOWERS.map((f, i) => (
            <Flower key={i} {...f} />
          ))}

          {LOBBY_USERS.map((user) => (
            <Villager key={user.id} user={user} onTalk={startTalking} posRef={posRef} />
          ))}
          <Player input={input} posRef={posRef} frozen={!!talkingId} />
          <CameraRig posRef={posRef} talkTargetRef={talkTargetRef} />
          <SceneProjector posRef={posRef} labelRefs={labelRefs} talkTargetRef={talkTargetRef} speechRefs={speechRefs} />
        </Canvas>
        <LabelOverlay labelRefs={labelRefs} onTalk={startTalking} posRef={posRef} />
        <SpeechBubbles speechRefs={speechRefs} talkingUser={talkingUser} currentMessage={currentMessage} />
      </div>
      {!talkingId && <TouchPad input={input} />}
      {talkingUser && (
        <TalkHud
          user={talkingUser}
          topic={CONVERSATIONS[talkingId]?.topic}
          status={waitingOnThem ? `${talkingUser.name} is talking…` : 'Hold to talk'}
          onMicTap={handleMicTap}
          onClose={stopTalking}
          micDisabled={waitingOnThem}
          done={done}
          hasSlang={hasSlang}
          explanation={explanations[revealedCount]}
          onExplain={handleExplain}
        />
      )}
    </div>
  )
}
