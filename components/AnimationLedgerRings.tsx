'use client'

import { useEffect, useRef } from 'react'

type Ring = {
  rx: number
  ry: number
  phase: number
  speed: number
  offsetX: number
  offsetY: number
  vx: number
  vy: number
  width: number
}

type Token = {
  ringIndex: number
  angle: number
  speed: number
  size: number
  offsetX: number
  offsetY: number
  vx: number
  vy: number
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))
const CURSOR_FORCE = 0.05

export default function AnimationLedgerRings() {
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
    let frame = 0
    let rings: Ring[] = []
    let tokens: Token[] = []

    const pointer = {
      active: false,
      x: 0,
      y: 0,
      smoothX: 0,
      smoothY: 0,
      vx: 0,
      vy: 0,
    }

    const makeRings = (): Ring[] =>
      Array.from({ length: 5 }, (_, i) => ({
        rx: width * (0.16 + i * 0.08),
        ry: height * (0.13 + i * 0.06),
        phase: Math.random() * Math.PI * 2,
        speed: 0.23 + i * 0.06,
        offsetX: 0,
        offsetY: 0,
        vx: 0,
        vy: 0,
        width: 1 + i * 0.28,
      }))

    const makeTokens = (): Token[] =>
      Array.from({ length: 22 }, () => ({
        ringIndex: Math.floor(Math.random() * 5),
        angle: Math.random() * Math.PI * 2,
        speed: 0.002 + Math.random() * 0.006,
        size: 3.6 + Math.random() * 5.4,
        offsetX: 0,
        offsetY: 0,
        vx: 0,
        vy: 0,
      }))

    const resize = () => {
      const rect = wrapper.getBoundingClientRect()
      width = rect.width
      height = rect.height

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      rings = makeRings()
      tokens = makeTokens()

      pointer.x = width * 0.53
      pointer.y = height * 0.5
      pointer.smoothX = pointer.x
      pointer.smoothY = pointer.y
      pointer.vx = 0
      pointer.vy = 0
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect()
      pointer.active = true
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
    }

    const onPointerEnter = (event: PointerEvent) => {
      onPointerMove(event)
      pointer.active = true
    }

    const onPointerLeave = () => {
      pointer.active = false
    }

    const draw = (timeMs: number) => {
      frame = window.requestAnimationFrame(draw)
      const time = timeMs * 0.001
      context.clearRect(0, 0, width, height)

      const idleX = width * 0.52 + Math.cos(time * 0.4) * width * 0.08
      const idleY = height * 0.5 + Math.sin(time * 0.52) * height * 0.1
      const targetX = pointer.active ? pointer.x : idleX
      const targetY = pointer.active ? pointer.y : idleY
      const lastX = pointer.smoothX
      const lastY = pointer.smoothY
      pointer.smoothX += (targetX - pointer.smoothX) * 0.05
      pointer.smoothY += (targetY - pointer.smoothY) * 0.05
      pointer.vx = pointer.smoothX - lastX
      pointer.vy = pointer.smoothY - lastY
      const pointerSpeed = Math.hypot(pointer.vx, pointer.vy)

      const centerX = width * 0.5
      const centerY = height * 0.52

      rings.forEach((ring, index) => {
        const depthFactor = 1 - index / rings.length
        const desiredX = (pointer.smoothX - centerX) * 0.08 * depthFactor * CURSOR_FORCE + Math.cos(time * (0.45 + index * 0.12) + ring.phase) * 4
        const desiredY = (pointer.smoothY - centerY) * 0.05 * depthFactor * CURSOR_FORCE + Math.sin(time * (0.42 + index * 0.1) + ring.phase) * 3
        ring.vx += (desiredX - ring.offsetX) * 0.032
        ring.vy += (desiredY - ring.offsetY) * 0.032
        ring.vx *= 0.86
        ring.vy *= 0.86
        ring.offsetX += ring.vx
        ring.offsetY += ring.vy

        context.beginPath()
        context.strokeStyle = `rgba(224, 236, 255, ${0.11 + index * 0.035})`
        context.lineWidth = ring.width
        context.ellipse(centerX + ring.offsetX, centerY + ring.offsetY, ring.rx, ring.ry, 0, 0, Math.PI * 2)
        context.stroke()
      })

      tokens.forEach((token) => {
        const ring = rings[token.ringIndex]
        token.angle += token.speed + ring.speed * 0.0012
        const baseX = centerX + ring.offsetX + Math.cos(token.angle + ring.phase) * ring.rx
        const baseY = centerY + ring.offsetY + Math.sin(token.angle + ring.phase) * ring.ry
        const dx = pointer.smoothX - (baseX + token.offsetX)
        const dy = pointer.smoothY - (baseY + token.offsetY)
        const dist = Math.hypot(dx, dy)
        const influence = clamp(1 - dist / 200, 0, 1)
        if (influence > 0) {
          const pull = (0.05 + pointerSpeed * 0.42) * influence * CURSOR_FORCE
          token.vx += dx * pull * 0.0052
          token.vy += dy * pull * 0.0052

          const swirl = (0.055 + pointerSpeed * 0.5) * influence * CURSOR_FORCE
          token.vx += -dy * swirl * 0.0046
          token.vy += dx * swirl * 0.0046
        }
        if (dist < 98) {
          const repel = (1 - dist / 98) * (0.24 + token.size * 0.026) * CURSOR_FORCE
          const inv = 1 / (dist + 0.0001)
          token.vx -= dx * inv * repel
          token.vy -= dy * inv * repel
        }

        token.vx *= 0.9
        token.vy *= 0.9
        token.offsetX += token.vx
        token.offsetY += token.vy

        const x = baseX + token.offsetX
        const y = baseY + token.offsetY
        const radius = token.size

        context.beginPath()
        context.fillStyle = 'rgba(125, 140, 176, 0.16)'
        context.ellipse(x + radius * 0.2, y + radius * 0.35, radius * 0.86, radius * 0.54, 0, 0, Math.PI * 2)
        context.fill()

        const gradient = context.createRadialGradient(x - radius * 0.4, y - radius * 0.4, 0, x, y, radius * 1.2)
        gradient.addColorStop(0, 'rgba(255,255,255,0.98)')
        gradient.addColorStop(0.34, 'rgba(243,247,253,0.95)')
        gradient.addColorStop(0.74, 'rgba(209,220,237,0.9)')
        gradient.addColorStop(1, 'rgba(153,169,198,0.82)')
        context.beginPath()
        context.fillStyle = gradient
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.fill()
      })

      const edge = clamp(Math.min(width, height) * 0.21, 56, 150)
      const edgeX = edge / width
      const edgeY = edge / height
      context.globalCompositeOperation = 'destination-in'

      const horizontalMask = context.createLinearGradient(0, 0, width, 0)
      horizontalMask.addColorStop(0, 'rgba(0,0,0,0)')
      horizontalMask.addColorStop(edgeX, 'rgba(0,0,0,1)')
      horizontalMask.addColorStop(1 - edgeX, 'rgba(0,0,0,1)')
      horizontalMask.addColorStop(1, 'rgba(0,0,0,0)')
      context.fillStyle = horizontalMask
      context.fillRect(0, 0, width, height)

      const verticalMask = context.createLinearGradient(0, 0, 0, height)
      verticalMask.addColorStop(0, 'rgba(0,0,0,0)')
      verticalMask.addColorStop(edgeY, 'rgba(0,0,0,1)')
      verticalMask.addColorStop(1 - edgeY, 'rgba(0,0,0,1)')
      verticalMask.addColorStop(1, 'rgba(0,0,0,0)')
      context.fillStyle = verticalMask
      context.fillRect(0, 0, width, height)

      context.globalCompositeOperation = 'source-over'
    }

    resize()
    frame = window.requestAnimationFrame(draw)
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(wrapper)
    wrapper.addEventListener('pointermove', onPointerMove)
    wrapper.addEventListener('pointerenter', onPointerEnter)
    wrapper.addEventListener('pointerleave', onPointerLeave)

    return () => {
      window.cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      wrapper.removeEventListener('pointermove', onPointerMove)
      wrapper.removeEventListener('pointerenter', onPointerEnter)
      wrapper.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return (
    <div ref={wrapperRef} className="relative h-full w-full">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
