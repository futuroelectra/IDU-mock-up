'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

type OrbState = {
  radius: number
  height: number
  depth: number
  phase: number
  seed: number
  size: number
  layer: number
  position: THREE.Vector3
  velocity: THREE.Vector3
}

const ORB_COUNT = 22
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

const membraneVertexShader = `
uniform float uTime;
uniform vec2 uPointer;
uniform float uVelocity;
varying vec2 vUv;
varying float vLift;

void main() {
  vUv = uv;
  vec3 p = position;
  float baseWave = sin((p.x * 0.8) + (uTime * 1.35)) * 0.12 + cos((p.y * 1.1) - (uTime * 1.1)) * 0.09;
  float pointerDist = distance(uv, uPointer);
  float dent = exp(-pointerDist * 18.0) * (0.72 + (uVelocity * 3.5));
  p.z += baseWave - (dent * 0.52);
  vLift = baseWave - (dent * 0.52);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`

const membraneFragmentShader = `
uniform float uTime;
varying vec2 vUv;
varying float vLift;

void main() {
  float pulse = 0.5 + 0.5 * sin((vUv.x * 8.0) + (vUv.y * 6.0) + (uTime * 0.45));
  vec3 colorA = vec3(0.91, 0.95, 1.0);
  vec3 colorB = vec3(0.72, 0.79, 0.93);
  vec3 color = mix(colorA, colorB, 0.25 + pulse * 0.3);
  float vignette = smoothstep(1.0, 0.22, distance(vUv, vec2(0.5)));
  float alpha = (0.11 + abs(vLift) * 0.45) * vignette;
  gl_FragColor = vec4(color, alpha);
}
`

function LiquidGlassScene() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const membraneRef = useRef<THREE.ShaderMaterial>(null)
  const dustRef = useRef<THREE.Points>(null)
  const pointer = useRef(new THREE.Vector2(0, 0))
  const previousPointer = useRef(new THREE.Vector2(0, 0))
  const pointerSpeed = useRef(0)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const orbs = useMemo<OrbState[]>(
    () =>
      Array.from({ length: ORB_COUNT }, () => {
        const phase = Math.random() * Math.PI * 2
        const radius = 1.6 + Math.random() * 3.7
        const height = 1.1 + Math.random() * 2.5
        const depth = -0.4 + Math.random() * 2.3
        const size = 0.2 + Math.random() * 0.62
        const x = Math.cos(phase) * radius
        const y = Math.sin(phase * 1.2) * height
        const z = depth
        return {
          radius,
          height,
          depth,
          phase,
          seed: Math.random() * 10,
          size,
          layer: Math.random(),
          position: new THREE.Vector3(x, y, z),
          velocity: new THREE.Vector3(0, 0, 0),
        }
      }),
    []
  )

  const orbColors = useMemo(
    () =>
      orbs.map((orb) =>
        new THREE.Color().setHSL(0.58 + orb.layer * 0.03, 0.22 + orb.layer * 0.05, 0.85 + orb.layer * 0.1)
      ),
    [orbs]
  )

  const dustPositions = useMemo(() => {
    const count = 130
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 12
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7
      positions[i * 3 + 2] = -3.2 + Math.random() * 2.2
    }
    return positions
  }, [])

  const membraneUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uVelocity: { value: 0 },
    }),
    []
  )

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
    const mouseX = state.mouse.x * 5.8
    const mouseY = state.mouse.y * 3.3

    pointer.current.x = THREE.MathUtils.lerp(pointer.current.x, mouseX, 0.07)
    pointer.current.y = THREE.MathUtils.lerp(pointer.current.y, mouseY, 0.07)

    const deltaX = pointer.current.x - previousPointer.current.x
    const deltaY = pointer.current.y - previousPointer.current.y
    const velocity = Math.min(Math.hypot(deltaX, deltaY) * 2.8, 1.55)
    pointerSpeed.current = THREE.MathUtils.lerp(pointerSpeed.current, velocity, 0.18)
    previousPointer.current.copy(pointer.current)

    orbs.forEach((orb, index) => {
      const spin = elapsed * (0.16 + orb.layer * 0.11) + orb.phase
      const orbitScale = 0.8 + Math.sin(elapsed * 0.28 + orb.seed) * 0.2
      const targetX = Math.cos(spin) * orb.radius * orbitScale
      const targetY = Math.sin(spin * 1.12 + orb.seed) * orb.height + Math.sin(elapsed * 0.5 + orb.seed) * 0.24
      const targetZ = Math.sin(elapsed * 0.54 + orb.phase) * 1.05 + orb.depth

      const dx = orb.position.x - pointer.current.x
      const dy = orb.position.y - pointer.current.y
      const dist = Math.hypot(dx, dy)
      const influence = clamp(1 - dist / 3.2, 0, 1)

      if (influence > 0) {
        const invDist = 1 / (dist + 0.001)
        const push = influence * (0.008 + pointerSpeed.current * 0.016)
        const swirl = influence * (0.0026 + pointerSpeed.current * 0.0032)
        orb.velocity.x += dx * invDist * push - dy * swirl
        orb.velocity.y += dy * invDist * push + dx * swirl
        orb.velocity.z += (-2.4 - orb.position.z) * influence * (0.024 + pointerSpeed.current * 0.016)
      }

      orb.velocity.x += (targetX - orb.position.x) * 0.02
      orb.velocity.y += (targetY - orb.position.y) * 0.02
      orb.velocity.z += (targetZ - orb.position.z) * 0.018
      orb.velocity.multiplyScalar(0.91)
      orb.position.add(orb.velocity)

      if (orb.position.lengthSq() > 90) {
        orb.position.multiplyScalar(0.95)
      }

      const squash = 1 - influence * 0.24
      const stretch = 1 + influence * 0.18
      dummy.position.copy(orb.position)
      dummy.scale.set(orb.size * stretch, orb.size * squash, orb.size * squash)
      dummy.rotation.set(
        Math.sin(elapsed * 0.43 + orb.phase) * 0.24 + orb.velocity.y * 0.42,
        Math.cos(elapsed * 0.37 + orb.phase) * 0.18 + orb.velocity.x * 0.42,
        elapsed * 0.2 + orb.phase
      )
      dummy.updateMatrix()
      mesh.setMatrixAt(index, dummy.matrix)
    })

    mesh.instanceMatrix.needsUpdate = true

    const membrane = membraneRef.current
    if (membrane) {
      membrane.uniforms.uTime.value = elapsed
      membrane.uniforms.uPointer.value.set(state.mouse.x * 0.5 + 0.5, state.mouse.y * 0.5 + 0.5)
      membrane.uniforms.uVelocity.value = pointerSpeed.current
    }

    if (dustRef.current) {
      dustRef.current.rotation.z = elapsed * 0.04
      dustRef.current.position.x = Math.sin(elapsed * 0.34) * 0.18
    }
  })

  return (
    <>
      <ambientLight intensity={0.8} color="#dfe9ff" />
      <directionalLight position={[5, 6, 7]} intensity={1.95} color="#ffffff" />
      <directionalLight position={[-6, -3, 4]} intensity={1.1} color="#b6ccff" />
      <pointLight position={[0, 0, 6]} intensity={1.15} color="#edf5ff" />

      <mesh position={[0, -0.12, -2.4]} rotation={[-0.22, 0.06, 0]}>
        <planeGeometry args={[14, 8, 130, 96]} />
        <shaderMaterial
          ref={membraneRef}
          uniforms={membraneUniforms}
          vertexShader={membraneVertexShader}
          fragmentShader={membraneFragmentShader}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      <instancedMesh ref={meshRef} args={[undefined, undefined, ORB_COUNT]}>
        <sphereGeometry args={[1, 52, 52]} />
        <meshPhysicalMaterial
          vertexColors
          color="#eff5ff"
          roughness={0.17}
          metalness={0.04}
          transmission={0.95}
          thickness={1.55}
          ior={1.23}
          clearcoat={1}
          clearcoatRoughness={0.08}
          reflectivity={0.95}
          transparent
          opacity={0.95}
        />
      </instancedMesh>

      <points ref={dustRef} position={[0, 0, -1.6]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={dustPositions.length / 3} array={dustPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#f5f9ff" size={0.048} opacity={0.34} transparent depthWrite={false} sizeAttenuation />
      </points>
    </>
  )
}

export default function AnimationLiquidGlassField() {
  const edgeMask = 'radial-gradient(124% 96% at 50% 50%, black 56%, transparent 100%)'

  return (
    <div className="relative h-full w-full" style={{ WebkitMaskImage: edgeMask, maskImage: edgeMask }}>
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 11], fov: 40, near: 0.1, far: 50 }}
      >
        <LiquidGlassScene />
      </Canvas>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(234,242,255,0.1) 0%, rgba(5,2,33,0) 42%), radial-gradient(circle at 78% 80%, rgba(225,236,255,0.08) 0%, rgba(5,2,33,0) 45%)',
        }}
      />
    </div>
  )
}
