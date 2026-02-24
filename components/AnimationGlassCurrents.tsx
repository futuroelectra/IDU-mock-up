'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

type CapsuleState = {
  orbitRadius: number
  orbitHeight: number
  depth: number
  phase: number
  size: number
  elongation: number
  seed: number
  position: THREE.Vector3
  velocity: THREE.Vector3
  rotation: THREE.Euler
  angularVelocity: THREE.Vector3
}

const CAPSULE_COUNT = 14
const STAR_COUNT = 70
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

function GlassCurrentsScene() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const starsRef = useRef<THREE.Points>(null)
  const pointer = useRef(new THREE.Vector2(0, 0))
  const previousPointer = useRef(new THREE.Vector2(0, 0))
  const pointerSpeed = useRef(0)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const capsules = useMemo<CapsuleState[]>(
    () =>
      Array.from({ length: CAPSULE_COUNT }, () => {
        const phase = Math.random() * Math.PI * 2
        const orbitRadius = 1.1 + Math.random() * 3.4
        const orbitHeight = 0.9 + Math.random() * 2.2
        const depth = -2 + Math.random() * 3.8
        const size = 0.42 + Math.random() * 0.54
        const elongation = 1.18 + Math.random() * 1.05

        return {
          orbitRadius,
          orbitHeight,
          depth,
          phase,
          size,
          elongation,
          seed: Math.random() * 12,
          position: new THREE.Vector3(Math.cos(phase) * orbitRadius, Math.sin(phase * 1.1) * orbitHeight, depth),
          velocity: new THREE.Vector3(),
          rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
          angularVelocity: new THREE.Vector3(),
        }
      }),
    []
  )

  const capsuleColors = useMemo(
    () =>
      capsules.map((capsule) =>
        new THREE.Color().setHSL(0.58 + (capsule.seed % 3) * 0.01, 0.2, 0.86 + ((capsule.seed * 13) % 9) * 0.01)
      ),
    [capsules]
  )

  const starPositions = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3)
    for (let i = 0; i < STAR_COUNT; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 12
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7
      positions[i * 3 + 2] = -3 + Math.random() * 4
    }
    return positions
  }, [])

  useEffect(() => {
    const mesh = meshRef.current
    if (!mesh) {
      return
    }

    capsuleColors.forEach((color, index) => mesh.setColorAt(index, color))
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true
    }
  }, [capsuleColors])

  useFrame((state) => {
    const mesh = meshRef.current
    if (!mesh) {
      return
    }

    const elapsed = state.clock.elapsedTime
    const targetX = state.mouse.x * 4.8
    const targetY = state.mouse.y * 2.9

    pointer.current.x = THREE.MathUtils.lerp(pointer.current.x, targetX, 0.058)
    pointer.current.y = THREE.MathUtils.lerp(pointer.current.y, targetY, 0.058)

    const deltaX = pointer.current.x - previousPointer.current.x
    const deltaY = pointer.current.y - previousPointer.current.y
    pointerSpeed.current = THREE.MathUtils.lerp(pointerSpeed.current, Math.min(Math.hypot(deltaX, deltaY) * 2.1, 1.2), 0.16)
    previousPointer.current.copy(pointer.current)

    capsules.forEach((capsule, index) => {
      const t = elapsed * (0.16 + ((index % 5) + 1) * 0.015) + capsule.phase
      const targetXPos = Math.cos(t) * capsule.orbitRadius + Math.sin(elapsed * 0.27 + capsule.seed) * 0.24
      const targetYPos = Math.sin(t * 1.14 + capsule.seed) * capsule.orbitHeight + Math.cos(elapsed * 0.34 + capsule.seed) * 0.2
      const targetZPos = Math.sin(elapsed * 0.5 + capsule.phase) * 0.8 + capsule.depth

      const dx = capsule.position.x - pointer.current.x
      const dy = capsule.position.y - pointer.current.y
      const dist = Math.hypot(dx, dy)
      const influence = clamp(1 - dist / 3.5, 0, 1)

      if (influence > 0) {
        const inv = 1 / (dist + 0.0001)
        const push = influence * (0.009 + pointerSpeed.current * 0.014)
        const swirl = influence * (0.0022 + pointerSpeed.current * 0.0028)
        capsule.velocity.x += dx * inv * push - dy * swirl
        capsule.velocity.y += dy * inv * push + dx * swirl
        capsule.velocity.z += (-1.2 - capsule.position.z) * influence * (0.01 + pointerSpeed.current * 0.008)
        capsule.angularVelocity.x += dy * influence * 0.00065
        capsule.angularVelocity.y += dx * influence * 0.00065
      }

      capsule.velocity.x += (targetXPos - capsule.position.x) * 0.024
      capsule.velocity.y += (targetYPos - capsule.position.y) * 0.024
      capsule.velocity.z += (targetZPos - capsule.position.z) * 0.02
      capsule.velocity.multiplyScalar(0.91)
      capsule.position.add(capsule.velocity)

      capsule.angularVelocity.multiplyScalar(0.86)
      capsule.rotation.x += 0.01 + capsule.angularVelocity.x
      capsule.rotation.y += 0.012 + capsule.angularVelocity.y
      capsule.rotation.z += 0.006 + Math.sin(elapsed * 0.4 + capsule.seed) * 0.002

      dummy.position.copy(capsule.position)
      dummy.rotation.copy(capsule.rotation)
      dummy.scale.set(capsule.size, capsule.size * capsule.elongation, capsule.size)
      dummy.updateMatrix()
      mesh.setMatrixAt(index, dummy.matrix)
    })

    mesh.instanceMatrix.needsUpdate = true

    if (starsRef.current) {
      starsRef.current.rotation.y = elapsed * 0.04
      starsRef.current.rotation.z = elapsed * 0.03
      starsRef.current.position.x = Math.sin(elapsed * 0.26) * 0.12
    }
  })

  return (
    <>
      <ambientLight intensity={0.9} color="#eff6ff" />
      <directionalLight position={[6, 5, 7]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-5, -2, 4]} intensity={0.74} color="#d8e8ff" />
      <pointLight position={[0, 0, 5]} intensity={0.45} color="#dce8ff" />

      <instancedMesh ref={meshRef} args={[undefined, undefined, CAPSULE_COUNT]}>
        <capsuleGeometry args={[1, 1.2, 18, 34]} />
        <meshPhysicalMaterial
          vertexColors
          color="#eaf2ff"
          roughness={0.16}
          metalness={0.04}
          transmission={0.22}
          thickness={1.25}
          ior={1.16}
          clearcoat={1}
          clearcoatRoughness={0.08}
          emissive="#90abd8"
          emissiveIntensity={0.14}
          iridescence={0.18}
          iridescenceIOR={1.12}
          iridescenceThicknessRange={[100, 300]}
          transparent
          opacity={0.96}
        />
      </instancedMesh>

      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={starPositions.length / 3} array={starPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#f6faff" size={0.05} opacity={0.2} transparent depthWrite={false} sizeAttenuation />
      </points>
    </>
  )
}

export default function AnimationGlassCurrents() {
  const edgeMask = 'radial-gradient(122% 104% at 50% 50%, black 57%, transparent 100%)'

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ WebkitMaskImage: edgeMask, maskImage: edgeMask }}>
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 10.8], fov: 40, near: 0.1, far: 60 }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <GlassCurrentsScene />
      </Canvas>
    </div>
  )
}
