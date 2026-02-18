'use client'

import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingGeometry({ position, rotationSpeed, initialY }: { position: [number, number, number], rotationSpeed: [number, number, number], initialY: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed[0] * delta
      meshRef.current.rotation.y += rotationSpeed[1] * delta
      meshRef.current.rotation.z += rotationSpeed[2] * delta
      
      // Subtle floating animation
      meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime + position[0]) * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshPhysicalMaterial
        transmission={0.95}
        thickness={0.8}
        roughness={0.1}
        metalness={0.0}
        clearcoat={1.0}
        clearcoatRoughness={0.05}
        color="#0145B3"
        opacity={0.4}
        transparent
      />
    </mesh>
  )
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (mouseRef.current.x * 0.1 - groupRef.current.rotation.y) * 0.05
      groupRef.current.rotation.x += (mouseRef.current.y * 0.1 - groupRef.current.rotation.x) * 0.05
    }
  })

  const geometries = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => {
      const y = (Math.random() - 0.5) * 8
      return {
        position: [
          (Math.random() - 0.5) * 10,
          y,
          (Math.random() - 0.5) * 10,
        ] as [number, number, number],
        initialY: y,
        rotationSpeed: [
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
        ] as [number, number, number],
      }
    }), []
  )

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      {geometries.map((geo, i) => (
        <FloatingGeometry
          key={i}
          position={geo.position}
          rotationSpeed={geo.rotationSpeed}
          initialY={geo.initialY}
        />
      ))}
    </group>
  )
}

export default function HeroCanvas() {
  return (
    <div className="w-full h-full" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: false }}
        style={{ width: '100%', height: '100%', display: 'block' }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
