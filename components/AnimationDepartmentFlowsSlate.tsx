'use client'

import { useEffect, useRef } from 'react'

type Lane = {
  yRatio: number
  phase: number
  amplitude: number
  speed: number
}

type RibbonParticle = {
  laneIndex: number
  t: number
  speed: number
  size: number
  offsetX: number
  offsetY: number
  vx: number
  vy: number
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

type AnimationDepartmentFlowsSlateProps = {
  tone?: 'blue' | 'white' | 'dark'
  cursorForce?: number
  trackGlobalPointer?: boolean
}

function makeLanes(): Lane[] {
  return [
    { yRatio: 0.24, phase: 0.2, amplitude: 0.084, speed: 0.7 },
    { yRatio: 0.37, phase: 1.3, amplitude: 0.069, speed: 0.65 },
    { yRatio: 0.5, phase: 2.1, amplitude: 0.075, speed: 0.78 },
    { yRatio: 0.63, phase: 3.25, amplitude: 0.078, speed: 0.72 },
    { yRatio: 0.76, phase: 4.2, amplitude: 0.066, speed: 0.62 },
  ]
}

function makeParticles(count: number, laneCount: number): RibbonParticle[] {
  return Array.from({ length: count }, () => ({
    laneIndex: Math.floor(Math.random() * laneCount),
    t: Math.random(),
    speed: 0.00042 + Math.random() * 0.0012,
    size: 4 + Math.random() * 6,
    offsetX: 0,
    offsetY: 0,
    vx: 0,
    vy: 0,
  }))
}

export default function AnimationDepartmentFlowsSlate({
  tone = 'blue',
  cursorForce = 0.3,
  trackGlobalPointer = false,
}: AnimationDepartmentFlowsSlateProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) {
      return
    }

    const context = canvas.getContext('2d', { alpha: true })
    if (!context) {
      return
    }

    let frame = 0
    let width = 0
    let height = 0
    const lanes = makeLanes()
    let particles: RibbonParticle[] = []

    const pointer = {
      active: false,
      x: 0,
      y: 0,
      smoothX: 0,
      smoothY: 0,
      vx: 0,
      vy: 0,
    }

    const lanePoint = (lane: Lane, t: number, time: number) => {
      const x = t * width
      const waveA = Math.sin(t * Math.PI * 2.2 + time * lane.speed + lane.phase) * lane.amplitude * height
      const waveB = Math.sin(t * Math.PI * 7.2 + time * (lane.speed + 0.35) + lane.phase) * lane.amplitude * height * 0.34
      const y = lane.yRatio * height + waveA + waveB
      return { x, y }
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

      const particleCount = clamp(Math.round((width * height) / 29000), 22, 38)
      particles = makeParticles(particleCount, lanes.length)
      pointer.x = width * 0.55
      pointer.y = height * 0.5
      pointer.smoothX = pointer.x
      pointer.smoothY = pointer.y
      pointer.vx = 0
      pointer.vy = 0
    }

    const onPointerMove = (event: PointerEvent) => {
      pointer.active = true
      if (trackGlobalPointer) {
        const rect = wrapper.getBoundingClientRect()
        pointer.x = event.clientX - rect.left
        pointer.y = event.clientY - rect.top
      } else {
        const rect = wrapper.getBoundingClientRect()
        pointer.x = event.clientX - rect.left
        pointer.y = event.clientY - rect.top
      }
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

      const idleX = width * 0.52 + Math.cos(time * 0.45) * width * 0.08
      const idleY = height * 0.52 + Math.sin(time * 0.42) * height * 0.12
      const targetX = pointer.active ? pointer.x : idleX
      const targetY = pointer.active ? pointer.y : idleY
      const lastX = pointer.smoothX
      const lastY = pointer.smoothY
      pointer.smoothX += (targetX - pointer.smoothX) * 0.078
      pointer.smoothY += (targetY - pointer.smoothY) * 0.078
      pointer.vx = pointer.smoothX - lastX
      pointer.vy = pointer.smoothY - lastY
      const pointerSpeed = Math.hypot(pointer.vx, pointer.vy)

      lanes.forEach((lane, laneIndex) => {
        context.beginPath()
        for (let i = 0; i <= 84; i += 1) {
          const t = i / 84
          const point = lanePoint(lane, t, time)
          const influence = clamp(1 - Math.hypot(point.x - pointer.smoothX, point.y - pointer.smoothY) / 224, 0, 1)
          const warp = influence * cursorForce * (8 + pointerSpeed * 22)
          const warpedY = point.y + Math.sin((t + time * 0.2 + lane.phase) * Math.PI * 6) * warp * 0.17
          if (i === 0) {
            context.moveTo(point.x, warpedY)
          } else {
            context.lineTo(point.x, warpedY)
          }
        }
        if (tone === 'white') {
          const alpha = 0.24 + laneIndex * 0.06
          context.strokeStyle = `rgba(15,23,42,${alpha * 0.18})`
          context.lineWidth = 2.4
          context.stroke()
          context.beginPath()
          for (let i = 0; i <= 84; i += 1) {
            const t = i / 84
            const point = lanePoint(lane, t, time)
            const influence = clamp(1 - Math.hypot(point.x - pointer.smoothX, point.y - pointer.smoothY) / 224, 0, 1)
            const warp = influence * cursorForce * (8 + pointerSpeed * 22)
            const warpedY = point.y + Math.sin((t + time * 0.2 + lane.phase) * Math.PI * 6) * warp * 0.17
            if (i === 0) {
              context.moveTo(point.x, warpedY)
            } else {
              context.lineTo(point.x, warpedY)
            }
          }
          context.strokeStyle = `rgba(255,255,255,${alpha})`
          context.lineWidth = 1.25
        } else if (tone === 'dark') {
          const alpha = 0.28 + laneIndex * 0.08
          context.strokeStyle = `rgba(255,255,255,${alpha})`
          context.lineWidth = 1.35
        } else {
          context.strokeStyle = `rgba(59, 130, 246, ${0.14 + laneIndex * 0.06})`
          context.lineWidth = 1.35
        }
        context.stroke()
      })

      particles.forEach((particle) => {
        const lane = lanes[particle.laneIndex]
        particle.t += particle.speed + lane.speed * 0.00014
        if (particle.t > 1.02) {
          particle.t = -0.02
          particle.offsetX = 0
          particle.offsetY = 0
          particle.vx = 0
          particle.vy = 0
        }

        const base = lanePoint(lane, particle.t, time)
        const px = base.x + particle.offsetX
        const py = base.y + particle.offsetY
        const dx = pointer.smoothX - px
        const dy = pointer.smoothY - py
        const distance = Math.hypot(dx, dy)
        const influence = clamp(1 - distance / 196, 0, 1)

        if (influence > 0) {
          const attract = (0.09 + pointerSpeed * 0.66) * influence * cursorForce
          particle.vx += dx * attract * 0.0068
          particle.vy += dy * attract * 0.0068

          const swirl = (0.13 + pointerSpeed * 0.92) * influence * cursorForce
          particle.vx += -dy * swirl * 0.0054
          particle.vy += dx * swirl * 0.0054
        }

        if (distance < 92) {
          const repel = (1 - distance / 92) * (0.27 + particle.size * 0.034) * cursorForce
          const inv = 1 / (distance + 0.0001)
          particle.vx -= dx * inv * repel
          particle.vy -= dy * inv * repel
        }

        particle.vx *= 0.895
        particle.vy *= 0.895
        particle.offsetX += particle.vx
        particle.offsetY += particle.vy

        const x = base.x + particle.offsetX
        const y = base.y + particle.offsetY
        const radius = particle.size

        const glow = context.createRadialGradient(x, y, 0, x, y, radius * 2.1)
        if (tone === 'white') {
          glow.addColorStop(0, 'rgba(255,255,255,0.56)')
          glow.addColorStop(1, 'rgba(255,255,255,0)')
        } else if (tone === 'dark') {
          glow.addColorStop(0, 'rgba(186,230,253,0.24)')
          glow.addColorStop(0.6, 'rgba(224,242,254,0.12)')
          glow.addColorStop(1, 'rgba(255,255,255,0)')
        } else {
          glow.addColorStop(0, 'rgba(96,165,250,0.28)')
          glow.addColorStop(1, 'rgba(96,165,250,0)')
        }
        context.beginPath()
        context.fillStyle = glow
        context.arc(x, y, radius * 2.1, 0, Math.PI * 2)
        context.fill()

        const pearl = context.createRadialGradient(x - radius * 0.34, y - radius * 0.36, 0, x, y, radius * 1.25)
        if (tone === 'white') {
          pearl.addColorStop(0, 'rgba(255,255,255,1)')
          pearl.addColorStop(0.45, 'rgba(255,255,255,0.98)')
          pearl.addColorStop(1, 'rgba(255,255,255,0.92)')
        } else if (tone === 'dark') {
          pearl.addColorStop(0, 'rgba(223,232,252,0.78)')
          pearl.addColorStop(0.5, 'rgba(170,189,230,0.66)')
          pearl.addColorStop(1, 'rgba(126,146,198,0.58)')
        } else {
          pearl.addColorStop(0, 'rgba(255,255,255,0.99)')
          pearl.addColorStop(0.35, 'rgba(232,243,255,0.97)')
          pearl.addColorStop(0.74, 'rgba(173,212,255,0.92)')
          pearl.addColorStop(1, 'rgba(95,165,245,0.85)')
        }

        context.beginPath()
        context.fillStyle = pearl
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.fill()

        if (tone === 'dark') {
          const texture = context.createRadialGradient(x + radius * 0.2, y + radius * 0.2, radius * 0.15, x, y, radius * 1.1)
          texture.addColorStop(0, 'rgba(81,99,148,0.18)')
          texture.addColorStop(1, 'rgba(26,36,75,0.28)')
          context.beginPath()
          context.fillStyle = texture
          context.arc(x, y, radius, 0, Math.PI * 2)
          context.fill()
        }

        if (tone === 'white') {
          context.beginPath()
          context.fillStyle = 'rgba(15,23,42,0.17)'
          context.arc(x, y, radius + 1.3, 0, Math.PI * 2)
          context.fill()

          context.beginPath()
          context.fillStyle = 'rgba(255,255,255,1)'
          context.arc(x, y, radius, 0, Math.PI * 2)
          context.fill()
        }

        context.beginPath()
        context.strokeStyle =
          tone === 'white' ? 'rgba(255,255,255,0.88)' : tone === 'dark' ? 'rgba(219,233,255,0.5)' : 'rgba(255,255,255,0.7)'
        context.lineWidth = 1
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.stroke()
      })

      const edge = clamp(Math.min(width, height) * 0.21, 52, 150)
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

    if (trackGlobalPointer) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('pointerleave', onPointerLeave)
      window.addEventListener('pointerdown', onPointerMove, { passive: true })
    } else {
      wrapper.addEventListener('pointermove', onPointerMove)
      wrapper.addEventListener('pointerenter', onPointerEnter)
      wrapper.addEventListener('pointerleave', onPointerLeave)
    }

    return () => {
      window.cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      if (trackGlobalPointer) {
        window.removeEventListener('pointermove', onPointerMove)
        window.removeEventListener('pointerleave', onPointerLeave)
        window.removeEventListener('pointerdown', onPointerMove)
      } else {
        wrapper.removeEventListener('pointermove', onPointerMove)
        wrapper.removeEventListener('pointerenter', onPointerEnter)
        wrapper.removeEventListener('pointerleave', onPointerLeave)
      }
    }
  }, [tone, cursorForce, trackGlobalPointer])

  return (
    <div ref={wrapperRef} className="relative h-full w-full">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
