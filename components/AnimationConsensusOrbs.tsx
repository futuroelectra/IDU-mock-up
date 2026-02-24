'use client'

import { useEffect, useRef } from 'react'

type Orb = {
  x: number
  y: number
  vx: number
  vy: number
  anchorX: number
  anchorY: number
  rx: number
  ry: number
  angle: number
  spin: number
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

export default function AnimationConsensusOrbs() {
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
    let orbs: Orb[] = []

    const pointer = {
      active: false,
      x: 0,
      y: 0,
      smoothX: 0,
      smoothY: 0,
      vx: 0,
      vy: 0,
    }

    const createOrbs = (count: number): Orb[] => {
      const cols = Math.ceil(Math.sqrt(count))
      const rows = Math.ceil(count / cols)
      const gridW = width * 0.7
      const gridH = height * 0.62
      const startX = (width - gridW) * 0.5
      const startY = (height - gridH) * 0.5

      return Array.from({ length: count }, (_, i) => {
        const col = i % cols
        const row = Math.floor(i / cols)
        const anchorX = startX + (col / Math.max(cols - 1, 1)) * gridW + (Math.random() - 0.5) * 40
        const anchorY = startY + (row / Math.max(rows - 1, 1)) * gridH + (Math.random() - 0.5) * 34
        const scale = 0.7 + Math.random() * 1.2

        return {
          x: anchorX + (Math.random() - 0.5) * 26,
          y: anchorY + (Math.random() - 0.5) * 26,
          vx: 0,
          vy: 0,
          anchorX,
          anchorY,
          rx: 9 * scale,
          ry: 7 * scale,
          angle: Math.random() * Math.PI,
          spin: (Math.random() - 0.5) * 0.012,
        }
      })
    }

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

      const count = clamp(Math.round((width * height) / 33000), 12, 26)
      orbs = createOrbs(count)

      pointer.x = width * 0.56
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

      const idleX = width * 0.55 + Math.cos(time * 0.42) * width * 0.07
      const idleY = height * 0.5 + Math.sin(time * 0.5) * height * 0.1
      const targetX = pointer.active ? pointer.x : idleX
      const targetY = pointer.active ? pointer.y : idleY
      const lastX = pointer.smoothX
      const lastY = pointer.smoothY
      pointer.smoothX += (targetX - pointer.smoothX) * 0.11
      pointer.smoothY += (targetY - pointer.smoothY) * 0.11
      pointer.vx = pointer.smoothX - lastX
      pointer.vy = pointer.smoothY - lastY
      const pointerSpeed = Math.hypot(pointer.vx, pointer.vy)

      for (let i = 0; i < orbs.length; i += 1) {
        const a = orbs[i]
        for (let j = i + 1; j < orbs.length; j += 1) {
          const b = orbs[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          const minDist = (a.rx + b.rx) * 0.9
          if (dist < minDist) {
            const push = (minDist - dist) * 0.014
            const nx = dx / (dist + 0.0001)
            const ny = dy / (dist + 0.0001)
            a.vx += nx * push
            a.vy += ny * push
            b.vx -= nx * push
            b.vy -= ny * push
          }
        }
      }

      orbs.forEach((orb) => {
        const springX = (orb.anchorX - orb.x) * 0.016
        const springY = (orb.anchorY - orb.y) * 0.016
        orb.vx += springX
        orb.vy += springY

        const dx = orb.x - pointer.smoothX
        const dy = orb.y - pointer.smoothY
        const dist = Math.hypot(dx, dy)
        const influence = clamp(1 - dist / 260, 0, 1)
        if (influence > 0) {
          const swirl = (0.14 + pointerSpeed * 3.4) * influence
          orb.vx += -dy * swirl * 0.01
          orb.vy += dx * swirl * 0.01

          const pull = (0.18 + pointerSpeed * 2.8) * influence
          orb.vx += (pointer.smoothX - orb.x) * pull * 0.006
          orb.vy += (pointer.smoothY - orb.y) * pull * 0.006
        }

        if (dist < 150) {
          const repel = (1 - dist / 150) * (0.85 + pointerSpeed * 1.6)
          const inv = 1 / (dist + 0.0001)
          orb.vx += dx * inv * repel
          orb.vy += dy * inv * repel
        }

        orb.vx *= 0.92
        orb.vy *= 0.92
        orb.x += orb.vx
        orb.y += orb.vy
        orb.angle += orb.spin
      })

      for (let i = 0; i < orbs.length; i += 1) {
        const a = orbs[i]
        for (let j = i + 1; j < orbs.length; j += 1) {
          const b = orbs[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist > 190) {
            continue
          }
          const strength = 1 - dist / 190
          context.beginPath()
          context.strokeStyle = `rgba(230, 239, 255, ${0.06 + strength * 0.1})`
          context.lineWidth = 0.8 + strength * 0.8
          context.moveTo(a.x, a.y)
          context.lineTo(b.x, b.y)
          context.stroke()
        }
      }

      orbs.forEach((orb) => {
        context.save()
        context.translate(orb.x, orb.y)
        context.rotate(orb.angle)

        context.beginPath()
        context.fillStyle = 'rgba(121, 134, 170, 0.14)'
        context.ellipse(orb.rx * 0.24, orb.ry * 0.5, orb.rx * 0.9, orb.ry * 0.62, 0, 0, Math.PI * 2)
        context.fill()

        const gloss = context.createRadialGradient(-orb.rx * 0.45, -orb.ry * 0.48, 0, 0, 0, orb.rx * 1.2)
        gloss.addColorStop(0, 'rgba(255,255,255,0.98)')
        gloss.addColorStop(0.36, 'rgba(244,247,253,0.95)')
        gloss.addColorStop(0.74, 'rgba(211,220,236,0.9)')
        gloss.addColorStop(1, 'rgba(157,171,199,0.82)')

        context.beginPath()
        context.fillStyle = gloss
        context.ellipse(0, 0, orb.rx, orb.ry, 0, 0, Math.PI * 2)
        context.fill()

        context.beginPath()
        context.fillStyle = 'rgba(255,255,255,0.38)'
        context.ellipse(-orb.rx * 0.32, -orb.ry * 0.36, Math.max(1.6, orb.rx * 0.25), Math.max(1.4, orb.ry * 0.22), 0, 0, Math.PI * 2)
        context.fill()

        context.restore()
      })

      const edge = clamp(Math.min(width, height) * 0.22, 52, 150)
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
