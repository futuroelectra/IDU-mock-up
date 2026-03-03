'use client'

import { useEffect, useRef } from 'react'

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

export default function AnimationWholeSiteSurface() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const context = canvas.getContext('2d', { alpha: true })
    if (!context) {
      return
    }

    let frame = 0
    let width = 0
    let height = 0
    let nodes: Node[] = []

    const pointer = {
      active: false,
      x: 0,
      y: 0,
      smoothX: 0,
      smoothY: 0,
    }

    const makeNodes = (count: number) =>
      Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        radius: 2.4 + Math.random() * 4.6,
      }))

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const nodeCount = clamp(Math.round((width * height) / 32000), 34, 66)
      nodes = makeNodes(nodeCount)
      pointer.x = width * 0.5
      pointer.y = height * 0.5
      pointer.smoothX = pointer.x
      pointer.smoothY = pointer.y
    }

    const onPointerMove = (event: PointerEvent) => {
      pointer.active = true
      pointer.x = event.clientX
      pointer.y = event.clientY
    }

    const onPointerLeave = () => {
      pointer.active = false
    }

    const draw = (timeMs: number) => {
      frame = window.requestAnimationFrame(draw)
      const time = timeMs * 0.001
      context.clearRect(0, 0, width, height)

      const idleX = width * 0.5 + Math.cos(time * 0.32) * width * 0.18
      const idleY = height * 0.5 + Math.sin(time * 0.36) * height * 0.2
      const targetX = pointer.active ? pointer.x : idleX
      const targetY = pointer.active ? pointer.y : idleY
      pointer.smoothX += (targetX - pointer.smoothX) * 0.068
      pointer.smoothY += (targetY - pointer.smoothY) * 0.068

      for (let i = 0; i < nodes.length; i += 1) {
        const nodeA = nodes[i]

        for (let j = i + 1; j < nodes.length; j += 1) {
          const nodeB = nodes[j]
          const dx = nodeA.x - nodeB.x
          const dy = nodeA.y - nodeB.y
          const dist = Math.hypot(dx, dy)
          if (dist < 260) {
            const alpha = (1 - dist / 260) * 0.42
            // Shadow stroke under pure-white line for contrast on light surface.
            context.strokeStyle = `rgba(15,23,42,${alpha * 0.24})`
            context.lineWidth = 2.4
            context.beginPath()
            context.moveTo(nodeA.x, nodeA.y)
            context.lineTo(nodeB.x, nodeB.y)
            context.stroke()

            context.strokeStyle = `rgba(255,255,255,${alpha})`
            context.lineWidth = 1.2
            context.beginPath()
            context.moveTo(nodeA.x, nodeA.y)
            context.lineTo(nodeB.x, nodeB.y)
            context.stroke()
          }
        }
      }

      nodes.forEach((node, index) => {
        const drift = 0.0025
        node.vx += Math.sin(time * 0.45 + index * 1.8) * drift
        node.vy += Math.cos(time * 0.42 + index * 1.4) * drift

        const dx = pointer.smoothX - node.x
        const dy = pointer.smoothY - node.y
        const dist = Math.hypot(dx, dy)
        if (dist < 280) {
          const influence = 1 - dist / 280
          const attraction = 0.028 * influence
          const inv = 1 / (dist + 0.0001)
          node.vx += dx * inv * attraction
          node.vy += dy * inv * attraction

          const swirl = 0.017 * influence
          node.vx += -dy * inv * swirl
          node.vy += dx * inv * swirl
        }

        node.vx *= 0.965
        node.vy *= 0.965
        node.x += node.vx
        node.y += node.vy

        if (node.x < -24) node.x = width + 24
        if (node.x > width + 24) node.x = -24
        if (node.y < -24) node.y = height + 24
        if (node.y > height + 24) node.y = -24

        const glow = context.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 3.8)
        glow.addColorStop(0, 'rgba(255,255,255,0.74)')
        glow.addColorStop(1, 'rgba(255,255,255,0)')
        context.beginPath()
        context.fillStyle = glow
        context.arc(node.x, node.y, node.radius * 3.8, 0, Math.PI * 2)
        context.fill()

        // Matte shadow beneath each white node to keep shape visible on surface.
        context.beginPath()
        context.fillStyle = 'rgba(15,23,42,0.2)'
        context.arc(node.x, node.y, node.radius + 1.6, 0, Math.PI * 2)
        context.fill()

        context.beginPath()
        context.fillStyle = 'rgba(255,255,255,1)'
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        context.fill()
      })
    }

    resize()
    frame = window.requestAnimationFrame(draw)

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.96]" suppressHydrationWarning>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
