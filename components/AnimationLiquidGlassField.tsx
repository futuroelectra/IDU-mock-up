'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

type OrbState = {
  orbitRadius: number
  orbitHeight: number
  depth: number
  phase: number
  seed: number
  size: number
  layer: number
  position: THREE.Vector3
  velocity: THREE.Vector3
}

const ORB_COUNT = 18
const DUST_COUNT = 95
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

function LiquidGlassScene() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const sparkleRef = useRef<THREE.Points>(null)
  const pointer = useRef(new THREE.Vector2(0, 0))
  const previousPointer = useRef(new THREE.Vector2(0, 0))
  const pointerSpeed = useRef(0)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const orbs = useMemo<OrbState[]>(
    () =>
      Array.from({ length: ORB_COUNT }, () => {
        const phase = Math.random() * Math.PI * 2
        const orbitRadius = 1.2 + Math.random() * 3.5
        const orbitHeight = 0.8 + Math.random() * 2.3
        const depth = -1.6 + Math.random() * 3.6
        const size = 0.38 + Math.random() * 0.8
        const layer = Math.random()

        return {
          orbitRadius,
          orbitHeight,
          depth,
          phase,
          seed: Math.random() * 10,
          size,
          layer,
          position: new THREE.Vector3(
            Math.cos(phase) * orbitRadius,
            Math.sin(phase * 1.2) * orbitHeight,
            depth
          ),
          velocity: new THREE.Vector3(),
        }
      }),
    []
  )

  const orbColors = useMemo(
    () =>
      orbs.map((orb) =>
        new THREE.Color().setHSL(0.58 + orb.layer * 0.02, 0.2 + orb.layer * 0.04, 0.88 + orb.layer * 0.08)
      ),
    [orbs]
  )

  const sparklePositions = useMemo(() => {
    const positions = new Float32Array(DUST_COUNT * 3)
    for (let i = 0; i < DUST_COUNT; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 12
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7
      positions[i * 3 + 2] = -2.8 + Math.random() * 3.8
    }
    return positions
  }, [])

  useEffect(() => {
    const mesh = meshRef.current
    if (!mesh) {
      return
    }

    orbColors.forEach((color, index) => {
      mesh.setColorAt(index, color)
    })

    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true
    }
  }, [orbColors])

  useFrame((state) => {
    const mesh = meshRef.current
    if (!mesh) {
      return
    }

    const elapsed = state.clock.elapsedTime
    const targetX = state.mouse.x * 5.2
    const targetY = state.mouse.y * 3.1

    pointer.current.x = THREE.MathUtils.lerp(pointer.current.x, targetX, 0.06)
    pointer.current.y = THREE.MathUtils.lerp(pointer.current.y, targetY, 0.06)

    const deltaX = pointer.current.x - previousPointer.current.x
    const deltaY = pointer.current.y - previousPointer.current.y
    const velocity = Math.min(Math.hypot(deltaX, deltaY) * 2.2, 1.2)
    pointerSpeed.current = THREE.MathUtils.lerp(pointerSpeed.current, velocity, 0.15)
    previousPointer.current.copy(pointer.current)

    orbs.forEach((orb, index) => {
      const orbitTime = elapsed * (0.14 + orb.layer * 0.08) + orb.phase
      const drift = 0.78 + Math.sin(elapsed * 0.24 + orb.seed) * 0.24
      const targetOrbX = Math.cos(orbitTime) * orb.orbitRadius * drift
      const targetOrbY =
        Math.sin(orbitTime * 1.1 + orb.seed) * orb.orbitHeight +
        Math.sin(elapsed * 0.46 + orb.seed) * 0.28
      const targetOrbZ = Math.sin(elapsed * 0.6 + orb.phase) * 0.9 + orb.depth

      const dx = orb.position.x - pointer.current.x
      const dy = orb.position.y - pointer.current.y
      const dist = Math.hypot(dx, dy)
      const influence = clamp(1 - dist / 3.4, 0, 1)

      if (influence > 0) {
        const invDist = 1 / (dist + 0.001)
        const push = influence * (0.008 + pointerSpeed.current * 0.016)
        const swirl = influence * (0.002 + pointerSpeed.current * 0.003)
        orb.velocity.x += dx * invDist * push - dy * swirl
        orb.velocity.y += dy * invDist * push + dx * swirl
        orb.velocity.z += (-1.9 - orb.position.z) * influence * (0.011 + pointerSpeed.current * 0.01)
      }

      orb.velocity.x += (targetOrbX - orb.position.x) * 0.024
      orb.velocity.y += (targetOrbY - orb.position.y) * 0.024
      orb.velocity.z += (targetOrbZ - orb.position.z) * 0.02
      orb.velocity.multiplyScalar(0.915)
      orb.position.add(orb.velocity)

      const squash = 1 - influence * 0.14
      const stretch = 1 + influence * 0.12
      dummy.position.copy(orb.position)
      dummy.scale.set(orb.size * stretch, orb.size * squash, orb.size * squash)
      dummy.rotation.set(
        Math.sin(elapsed * 0.32 + orb.phase) * 0.2 + orb.velocity.y * 0.3,
        Math.cos(elapsed * 0.28 + orb.phase) * 0.16 + orb.velocity.x * 0.3,
        elapsed * 0.16 + orb.phase
      )
      dummy.updateMatrix()
      mesh.setMatrixAt(index, dummy.matrix)
    })

    mesh.instanceMatrix.needsUpdate = true

    if (sparkleRef.current) {
      sparkleRef.current.rotation.z = elapsed * 0.035
      sparkleRef.current.position.x = Math.sin(elapsed * 0.24) * 0.12
      sparkleRef.current.position.y = Math.cos(elapsed * 0.2) * 0.08
    }
  })

  return (
    <>
      <ambientLight intensity={0.95} color="#f2f7ff" />
      <directionalLight position={[6, 6, 9]} intensity={1.35} color="#ffffff" />
      <directionalLight position={[-5, -3, 4]} intensity={0.78} color="#d4e3ff" />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#e9f2ff" />

      <instancedMesh ref={meshRef} args={[undefined, undefined, ORB_COUNT]}>
        <sphereGeometry args={[1, 52, 52]} />
        <meshPhysicalMaterial
          vertexColors
          color="#edf4ff"
          roughness={0.12}
          metalness={0.03}
          transmission={0.24}
          thickness={1.2}
          ior={1.14}
          clearcoat={1}
          clearcoatRoughness={0.06}
          sheen={0.65}
          sheenColor="#f6fbff"
          emissive="#95add8"
          emissiveIntensity={0.16}
          transparent
          opacity={0.96}
        />
      </instancedMesh>

      <points ref={sparkleRef} position={[0, 0, -1.1]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={sparklePositions.length / 3} array={sparklePositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#f8fbff" size={0.05} opacity={0.25} transparent depthWrite={false} sizeAttenuation />
      </points>
    </>
  )
}

export default function AnimationLiquidGlassField() {
  const edgeMask = 'radial-gradient(122% 104% at 50% 50%, black 57%, transparent 100%)'

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ WebkitMaskImage: edgeMask, maskImage: edgeMask }}>
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 10.6], fov: 41, near: 0.1, far: 60 }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >
        <LiquidGlassScene />
      </Canvas>
    </div>
  )
}
