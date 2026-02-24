'use client'

import { useEffect, useRef } from 'react'

type NetworkNode = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  phase: number
  energy: number
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

const createNodes = (width: number, height: number, count: number): NetworkNode[] =>
  Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.48,
    vy: (Math.random() - 0.5) * 0.48,
    radius: 1.2 + Math.random() * 1.6,
    phase: Math.random() * Math.PI * 2,
    energy: 0,
  }))

export default function CursorNetworkPanel() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const canvas = canvasRef.current
    if (!wrapper || !canvas) {
      return
    }

    const context = canvas.getContext('2d', { alpha: true })
    if (!context) {
      return
    }

    let width = 0
    let height = 0
    let frameId = 0
    let nodes: NetworkNode[] = []

    const pointer = {
      active: false,
      x: 0,
      y: 0,
      smoothX: 0,
      smoothY: 0,
    }

    const resize = () => {
      const bounds = wrapper.getBoundingClientRect()
      width = bounds.width
      height = bounds.height

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const nodeCount = clamp(Math.round((width * height) / 12000), 34, 78)
      nodes = createNodes(width, height, nodeCount)

      pointer.x = width * 0.72
      pointer.y = height * 0.45
      pointer.smoothX = pointer.x
      pointer.smoothY = pointer.y
    }

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = wrapper.getBoundingClientRect()
      pointer.active = true
      pointer.x = event.clientX - bounds.left
      pointer.y = event.clientY - bounds.top
    }

    const handlePointerEnter = (event: PointerEvent) => {
      handlePointerMove(event)
      pointer.active = true
    }

    const handlePointerLeave = () => {
      pointer.active = false
    }

    const draw = (timeMs: number) => {
      const time = timeMs * 0.001
      frameId = window.requestAnimationFrame(draw)
      context.clearRect(0, 0, width, height)

      const idleX = width * 0.75 + Math.cos(time * 0.6) * width * 0.06
      const idleY = height * 0.44 + Math.sin(time * 0.7) * height * 0.08
      const targetX = pointer.active ? pointer.x : idleX
      const targetY = pointer.active ? pointer.y : idleY
      pointer.smoothX += (targetX - pointer.smoothX) * 0.1
      pointer.smoothY += (targetY - pointer.smoothY) * 0.1

      const aura = context.createRadialGradient(
        pointer.smoothX,
        pointer.smoothY,
        0,
        pointer.smoothX,
        pointer.smoothY,
        Math.max(width, height) * 0.58
      )
      aura.addColorStop(0, 'rgba(62, 205, 255, 0.16)')
      aura.addColorStop(0.38, 'rgba(35, 142, 255, 0.07)')
      aura.addColorStop(1, 'rgba(0, 52, 133, 0)')
      context.fillStyle = aura
      context.fillRect(0, 0, width, height)

      const maxDistance = Math.max(96, Math.min(148, width * 0.24))

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i]

        node.x += node.vx + Math.cos(time * 0.6 + node.phase) * 0.08
        node.y += node.vy + Math.sin(time * 0.7 + node.phase) * 0.08

        if (node.x < 0 || node.x > width) {
          node.vx *= -1
          node.x = clamp(node.x, 0, width)
        }
        if (node.y < 0 || node.y > height) {
          node.vy *= -1
          node.y = clamp(node.y, 0, height)
        }

        const toPointerX = pointer.smoothX - node.x
        const toPointerY = pointer.smoothY - node.y
        const pointerDistance = Math.hypot(toPointerX, toPointerY)
        const pull = clamp(1 - pointerDistance / 180, 0, 1)
        if (pull > 0) {
          node.x += toPointerX * 0.0032 * pull
          node.y += toPointerY * 0.0032 * pull
          node.energy = clamp(node.energy + pull * 0.08, 0, 1)
        } else {
          node.energy *= 0.95
        }
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const nodeA = nodes[i]

        for (let j = i + 1; j < nodes.length; j += 1) {
          const nodeB = nodes[j]
          const dx = nodeA.x - nodeB.x
          const dy = nodeA.y - nodeB.y
          const distance = Math.hypot(dx, dy)
          if (distance >= maxDistance) {
            continue
          }

          const strength = 1 - distance / maxDistance
          const sparkle = 0.35 + ((Math.sin(time * 2.2 + nodeA.phase + nodeB.phase) + 1) * 0.5) * 0.65
          const energyBoost = Math.max(nodeA.energy, nodeB.energy) * 0.5
          const alpha = strength * (0.2 + sparkle * 0.3 + energyBoost)

          context.strokeStyle = `rgba(127, 212, 255, ${alpha})`
          context.lineWidth = 0.8 + strength * 1.2
          context.beginPath()
          context.moveTo(nodeA.x, nodeA.y)
          context.lineTo(nodeB.x, nodeB.y)
          context.stroke()
        }
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i]
        const distanceToPointer = Math.hypot(pointer.smoothX - node.x, pointer.smoothY - node.y)
        if (distanceToPointer > 170) {
          continue
        }

        const alpha = clamp(1 - distanceToPointer / 170, 0, 1) * 0.55
        context.strokeStyle = `rgba(183, 236, 255, ${alpha})`
        context.lineWidth = 1
        context.beginPath()
        context.moveTo(pointer.smoothX, pointer.smoothY)
        context.lineTo(node.x, node.y)
        context.stroke()
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i]
        const glow = node.radius + node.energy * 1.6
        context.beginPath()
        context.fillStyle = `rgba(202, 241, 255, ${0.42 + node.energy * 0.44})`
        context.arc(node.x, node.y, glow, 0, Math.PI * 2)
        context.fill()
      }

      context.beginPath()
      context.strokeStyle = 'rgba(230, 249, 255, 0.52)'
      context.lineWidth = 1.4
      context.arc(pointer.smoothX, pointer.smoothY, 16, 0, Math.PI * 2)
      context.stroke()

      context.beginPath()
      context.fillStyle = 'rgba(238, 252, 255, 0.76)'
      context.arc(pointer.smoothX, pointer.smoothY, 3.8, 0, Math.PI * 2)
      context.fill()
    }

    resize()
    frameId = window.requestAnimationFrame(draw)

    const resizeObserver = new ResizeObserver(() => resize())
    resizeObserver.observe(wrapper)

    wrapper.addEventListener('pointermove', handlePointerMove)
    wrapper.addEventListener('pointerenter', handlePointerEnter)
    wrapper.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      window.cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      wrapper.removeEventListener('pointermove', handlePointerMove)
      wrapper.removeEventListener('pointerenter', handlePointerEnter)
      wrapper.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="relative h-full w-full overflow-hidden"
      style={{
        maskImage:
          'radial-gradient(110% 90% at 50% 54%, rgba(0,0,0,1) 56%, rgba(0,0,0,0.32) 82%, transparent 100%)',
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 16% 16%, rgba(188,241,255,0.12) 0%, rgba(188,241,255,0) 42%), linear-gradient(150deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 40%)',
        }}
      />
    </div>
  )
}
