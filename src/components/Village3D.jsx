import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { LOBBY_USERS, ME } from '../mockData'

const WORLD_HALF_X = 9
const WORLD_HALF_Z = 12
const SPEED = 7
const LABEL_HEIGHT = 2.05

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

function Player({ input, posRef }) {
  const group = useRef()
  const [facing, setFacing] = useState(1)

  useFrame((_, delta) => {
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

function Villager({ user, onTalk }) {
  const [x, z] = toWorld(user)
  return (
    <group position={[x, 0, z]} onClick={() => onTalk(user.id)}>
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

function CameraRig({ posRef }) {
  useFrame(({ camera }) => {
    const targetX = posRef.current.x
    const targetZ = posRef.current.z + 15
    const dx = targetX - camera.position.x
    const dz = targetZ - camera.position.z
    // Snap once close enough so the camera settles to an exact, stable
    // value instead of an asymptotic lerp nudging by sub-pixel amounts
    // forever (which also kept the label overlay below recomputing).
    camera.position.x = Math.abs(dx) > 0.01 ? camera.position.x + dx * 0.08 : targetX
    camera.position.z = Math.abs(dz) > 0.01 ? camera.position.z + dz * 0.08 : targetZ
    camera.position.y = 15
    camera.lookAt(posRef.current.x, 0.8, posRef.current.z)
  })
  return null
}

// Projects each character's world position to screen pixels every frame and
// writes it straight to the label <div>'s style (via labelRefs), bypassing
// React state so this costs nothing per frame. Avoids drei's <Html>, which
// has a known bug where one of several simultaneous instances can silently
// fail to mount its DOM portal.
function LabelProjector({ posRef, labelRefs }) {
  const vec = useMemo(() => new Vector3(), [])

  useFrame(({ camera, size }) => {
    project(labelRefs.current.me, posRef.current.x, posRef.current.z, camera, size, vec)
    for (const user of LOBBY_USERS) {
      const [x, z] = toWorld(user)
      project(labelRefs.current[user.id], x, z, camera, size, vec)
    }
  })

  return null
}

function project(el, x, z, camera, size, vec) {
  if (!el) return
  vec.set(x, LABEL_HEIGHT, z)
  vec.project(camera)
  if (vec.z > 1) {
    el.style.display = 'none'
    return
  }
  el.style.display = ''
  const px = (vec.x * 0.5 + 0.5) * size.width
  const py = (-vec.y * 0.5 + 0.5) * size.height
  el.style.transform = `translate(-50%, -50%) translate(${px}px, ${py}px)`
}

function LabelOverlay({ labelRefs, onTalk }) {
  return (
    <div className="labels-overlay">
      <div ref={(el) => (labelRefs.current.me = el)} className="room-name label-chip">
        {ME.emoji} You
      </div>
      {LOBBY_USERS.map((user) => (
        <div
          key={user.id}
          ref={(el) => (labelRefs.current[user.id] = el)}
          className="room-name label-chip"
          style={{ cursor: 'pointer' }}
          onClick={() => onTalk(user.id)}
        >
          {user.emoji} {user.flag} {user.name}
        </div>
      ))}
    </div>
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

// A small 3D virtual world — move with WASD/arrow keys (desktop) or the
// on-screen D-pad (touch), and tap an NPC (their body or name tag) to talk
// to them. `onTalk(userId)` is left to the caller — in Virtual mode that
// opens an in-world conversation overlay rather than leaving the scene.
export default function Village3D({ onTalk, children }) {
  const input = useMoveInput()
  const posRef = useRef({ x: 0, z: (ME.y / 100 - 0.5) * WORLD_HALF_Z * 2 })
  const labelRefs = useRef({})

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
            <Villager key={user.id} user={user} onTalk={onTalk} />
          ))}
          <Player input={input} posRef={posRef} />
          <CameraRig posRef={posRef} />
          <LabelProjector posRef={posRef} labelRefs={labelRefs} />
        </Canvas>
        <LabelOverlay labelRefs={labelRefs} onTalk={onTalk} />
      </div>
      <TouchPad input={input} />
      {children}
    </div>
  )
}
