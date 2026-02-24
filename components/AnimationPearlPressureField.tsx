'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

type PearlState = {
  base: THREE.Vector3
  position: THREE.Vector3
  velocity: THREE.Vector3
  size: number
  seed: number
}

const GRID_X = 6
const GRID_Y = 4
const PEARL_COUNT = GRID_X * GRID_Y
const GRAIN_COUNT = 85
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

function PearlPressureScene() {
  const pearlsRef = useRef<THREE.InstancedMesh>(null)
  const grainsRef = useRef<THREE.Points>(null)
  const pointer = useRef(new THREE.Vector2(0, 0))
  const previousPointer = useRef(new THREE.Vector2(0, 0))
  const pointerSpeed = useRef(0)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const pearls = useMemo<PearlState[]>(() => {
    const spacingX = 1.95
    const spacingY = 1.65
    const startX = -((GRID_X - 1) * spacingX) / 2
    const startY = -((GRID_Y - 1) * spacingY) / 2

    return Array.from({ length: PEARL_COUNT }, (_, i) => {
      const col = i % GRID_X
      const row = Math.floor(i / GRID_X)
      const base = new THREE.Vector3(startX + col * spacingX, startY + row * spacingY, -0.4)
      const size = 0.42 + Math.random() * 0.5
      return {
        base,
        position: base.clone().add(new THREE.Vector3((Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.2, Math.random() * 0.35)),
        velocity: new THREE.Vector3(),
        size,
        seed: Math.random() * 15,
      }
    })
  }, [])

  const pearlColors = useMemo(
    () => pearls.map((pearl) => new THREE.Color().setHSL(0.58, 0.05 + (pearl.seed % 2) * 0.015, 0.95 + ((pearl.seed * 11) % 8) * 0.004)),
    [pearls]
  )

  const grainPositions = useMemo(() => {
    const positions = new Float32Array(GRAIN_COUNT * 3)
    for (let i = 0; i < GRAIN_COUNT; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 13
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = -2.8 + Math.random() * 2.8
    }
    return positions
  }, [])

  useEffect(() => {
    const pearlsMesh = pearlsRef.current
    if (!pearlsMesh) {
      return
    }

    pearlColors.forEach((color, index) => pearlsMesh.setColorAt(index, color))
    if (pearlsMesh.instanceColor) {
      pearlsMesh.instanceColor.needsUpdate = true
    }
  }, [pearlColors])

  useFrame((state) => {
    const pearlsMesh = pearlsRef.current
    if (!pearlsMesh) {
      return
    }

    const elapsed = state.clock.elapsedTime
    const targetX = state.mouse.x * 5.1
    const targetY = state.mouse.y * 3.1

    pointer.current.x = THREE.MathUtils.lerp(pointer.current.x, targetX, 0.065)
    pointer.current.y = THREE.MathUtils.lerp(pointer.current.y, targetY, 0.065)

    const deltaX = pointer.current.x - previousPointer.current.x
    const deltaY = pointer.current.y - previousPointer.current.y
    pointerSpeed.current = THREE.MathUtils.lerp(pointerSpeed.current, Math.min(Math.hypot(deltaX, deltaY) * 2, 1.3), 0.16)
    previousPointer.current.copy(pointer.current)

    pearls.forEach((pearl, index) => {
      const waveX = Math.sin(elapsed * 0.6 + pearl.seed) * 0.12
      const waveY = Math.cos(elapsed * 0.42 + pearl.seed) * 0.1
      const targetBaseX = pearl.base.x + waveX
      const targetBaseY = pearl.base.y + waveY
      const targetBaseZ = pearl.base.z + Math.sin(elapsed * 0.8 + pearl.seed) * 0.25

      const dx = pearl.position.x - pointer.current.x
      const dy = pearl.position.y - pointer.current.y
      const dist = Math.hypot(dx, dy)
      const influence = clamp(1 - dist / 2.7, 0, 1)

      if (influence > 0) {
        const inv = 1 / (dist + 0.0001)
        const pressure = influence * (0.018 + pointerSpeed.current * 0.03)
        pearl.velocity.x += dx * inv * pressure
        pearl.velocity.y += dy * inv * pressure
        pearl.velocity.z += influence * (0.02 + pointerSpeed.current * 0.018)
      }

      pearl.velocity.x += (targetBaseX - pearl.position.x) * 0.038
      pearl.velocity.y += (targetBaseY - pearl.position.y) * 0.038
      pearl.velocity.z += (targetBaseZ - pearl.position.z) * 0.03
      pearl.velocity.multiplyScalar(0.9)
      pearl.position.add(pearl.velocity)

      const pulse = 1 + Math.sin(elapsed * 1.1 + pearl.seed) * 0.04
      const stretch = 1 + influence * 0.09
      const squash = 1 - influence * 0.07

      dummy.position.copy(pearl.position)
      dummy.scale.set(pearl.size * stretch * pulse, pearl.size * squash * pulse, pearl.size * squash)
      dummy.rotation.set(Math.sin(elapsed * 0.24 + pearl.seed) * 0.18, Math.cos(elapsed * 0.3 + pearl.seed) * 0.14, elapsed * 0.06)
      dummy.updateMatrix()
      pearlsMesh.setMatrixAt(index, dummy.matrix)
    })

    pearlsMesh.instanceMatrix.needsUpdate = true

    if (grainsRef.current) {
      grainsRef.current.rotation.z = elapsed * 0.03
      grainsRef.current.position.x = Math.sin(elapsed * 0.22) * 0.14
    }
  })

  return (
    <>
      <ambientLight intensity={1.05} color="#ffffff" />
      <directionalLight position={[6, 6, 8]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-6, -2, 4]} intensity={0.84} color="#f3f8ff" />
      <pointLight position={[0, 0, 4]} intensity={0.58} color="#ffffff" />

      <instancedMesh ref={pearlsRef} args={[undefined, undefined, PEARL_COUNT]}>
        <sphereGeometry args={[1, 52, 52]} />
        <meshPhysicalMaterial
          vertexColors
          color="#ffffff"
          roughness={0.09}
          metalness={0.02}
          transmission={0.12}
          thickness={1.02}
          ior={1.14}
          clearcoat={1}
          clearcoatRoughness={0.05}
          sheen={0.72}
          sheenColor="#ffffff"
          emissive="#d8e6ff"
          emissiveIntensity={0.24}
          transparent
          opacity={0.96}
        />
      </instancedMesh>

      <points ref={grainsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={grainPositions.length / 3} array={grainPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#ffffff" size={0.05} opacity={0.22} transparent depthWrite={false} sizeAttenuation />
      </points>
    </>
  )
}

export default function AnimationPearlPressureField() {
  const edgeMask =
    'radial-gradient(136% 124% at 50% 50%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.93) 52%, rgba(0,0,0,0.6) 74%, rgba(0,0,0,0.16) 90%, rgba(0,0,0,0) 100%)'

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ WebkitMaskImage: edgeMask, maskImage: edgeMask }}>
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 11], fov: 40, near: 0.1, far: 60 }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <PearlPressureScene />
      </Canvas>
    </div>
  )
}
