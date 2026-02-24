'use client'

import { useEffect, useRef } from 'react'

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  depth: number
  radius: number
  phase: number
  drift: number
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

const createNodes = (width: number, height: number, count: number): Node[] =>
  Array.from({ length: count }, () => {
    const depth = Math.random()
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * (0.28 + depth * 0.34),
      vy: (Math.random() - 0.5) * (0.24 + depth * 0.4),
      depth,
      radius: 2.4 + depth * 8.4,
      phase: Math.random() * Math.PI * 2,
      drift: 0.35 + Math.random() * 0.9,
    }
  })

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
    let animationFrame = 0
    let nodes: Node[] = []

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

      const nodeCount = clamp(Math.round((width * height) / 9300), 56, 120)
      nodes = createNodes(width, height, nodeCount)

      pointer.x = width * 0.62
      pointer.y = height * 0.44
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
      animationFrame = window.requestAnimationFrame(draw)
      const time = timeMs * 0.001
      context.clearRect(0, 0, width, height)

      const idleX = width * 0.52 + Math.cos(time * 0.48) * width * 0.06
      const idleY = height * 0.5 + Math.sin(time * 0.52) * height * 0.08
      const targetX = pointer.active ? pointer.x : idleX
      const targetY = pointer.active ? pointer.y : idleY
      pointer.smoothX += (targetX - pointer.smoothX) * 0.07
      pointer.smoothY += (targetY - pointer.smoothY) * 0.07

      const maxDistance = clamp(width * 0.2, 92, 148)

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i]
        const streamDriftX = Math.cos(time * node.drift + node.phase) * 0.2
        const streamDriftY = Math.sin(time * (node.drift + 0.2) + node.phase) * 0.22
        node.x += node.vx + streamDriftX
        node.y += node.vy + streamDriftY

        const dx = pointer.smoothX - node.x
        const dy = pointer.smoothY - node.y
        const pointerDistance = Math.hypot(dx, dy)
        const influence = clamp(1 - pointerDistance / 250, 0, 1)
        if (influence > 0) {
          const tension = (node.depth * 0.0034 + 0.0018) * influence
          node.x += dx * tension
          node.y += dy * tension
        }

        if (node.x < -40) node.x = width + 40
        if (node.x > width + 40) node.x = -40
        if (node.y < -40) node.y = height + 40
        if (node.y > height + 40) node.y = -40
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.hypot(dx, dy)
          if (distance > maxDistance) {
            continue
          }

          const strength = 1 - distance / maxDistance
          const alpha = (0.08 + ((a.depth + b.depth) * 0.5) * 0.14) * strength
          context.beginPath()
          context.strokeStyle = `rgba(241, 245, 252, ${alpha})`
          context.lineWidth = 0.7 + strength * 1.25
          context.moveTo(a.x, a.y)
          context.lineTo(b.x, b.y)
          context.stroke()
        }
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i]
        const radius = node.radius

        context.beginPath()
        context.fillStyle = `rgba(120,128,145,${0.06 + node.depth * 0.07})`
        context.ellipse(node.x + radius * 0.22, node.y + radius * 0.4, radius * 0.86, radius * 0.56, 0, 0, Math.PI * 2)
        context.fill()

        const pearl = context.createRadialGradient(
          node.x - radius * 0.38,
          node.y - radius * 0.46,
          0,
          node.x,
          node.y,
          radius * 1.12
        )
        pearl.addColorStop(0, 'rgba(255,255,255,0.98)')
        pearl.addColorStop(0.32, 'rgba(245,247,250,0.95)')
        pearl.addColorStop(0.72, 'rgba(216,221,229,0.9)')
        pearl.addColorStop(1, 'rgba(173,179,190,0.84)')

        context.beginPath()
        context.fillStyle = pearl
        context.arc(node.x, node.y, radius, 0, Math.PI * 2)
        context.fill()

        context.beginPath()
        context.fillStyle = `rgba(255,255,255,${0.16 + node.depth * 0.18})`
        context.arc(node.x - radius * 0.35, node.y - radius * 0.32, Math.max(1.1, radius * 0.24), 0, Math.PI * 2)
        context.fill()
      }

      const edgeFade = clamp(Math.min(width, height) * 0.2, 56, 140)
      const edgePctX = edgeFade / width
      const edgePctY = edgeFade / height

      context.globalCompositeOperation = 'destination-in'

      const horizontalFade = context.createLinearGradient(0, 0, width, 0)
      horizontalFade.addColorStop(0, 'rgba(0,0,0,0)')
      horizontalFade.addColorStop(edgePctX, 'rgba(0,0,0,1)')
      horizontalFade.addColorStop(1 - edgePctX, 'rgba(0,0,0,1)')
      horizontalFade.addColorStop(1, 'rgba(0,0,0,0)')
      context.fillStyle = horizontalFade
      context.fillRect(0, 0, width, height)

      const verticalFade = context.createLinearGradient(0, 0, 0, height)
      verticalFade.addColorStop(0, 'rgba(0,0,0,0)')
      verticalFade.addColorStop(edgePctY, 'rgba(0,0,0,1)')
      verticalFade.addColorStop(1 - edgePctY, 'rgba(0,0,0,1)')
      verticalFade.addColorStop(1, 'rgba(0,0,0,0)')
      context.fillStyle = verticalFade
      context.fillRect(0, 0, width, height)

      context.globalCompositeOperation = 'source-over'

    }

    resize()
    animationFrame = window.requestAnimationFrame(draw)
    const resizeObserver = new ResizeObserver(() => resize())
    resizeObserver.observe(wrapper)

    wrapper.addEventListener('pointermove', handlePointerMove)
    wrapper.addEventListener('pointerenter', handlePointerEnter)
    wrapper.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      wrapper.removeEventListener('pointermove', handlePointerMove)
      wrapper.removeEventListener('pointerenter', handlePointerEnter)
      wrapper.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  return (
    <div ref={wrapperRef} className="relative h-full w-full">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
