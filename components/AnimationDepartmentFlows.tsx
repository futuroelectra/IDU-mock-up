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
const CURSOR_FORCE = 0.1

function makeLanes(): Lane[] {
  return [
    { yRatio: 0.25, phase: 0.3, amplitude: 0.085, speed: 0.72 },
    { yRatio: 0.39, phase: 1.5, amplitude: 0.07, speed: 0.67 },
    { yRatio: 0.52, phase: 2.2, amplitude: 0.076, speed: 0.8 },
    { yRatio: 0.64, phase: 3.4, amplitude: 0.08, speed: 0.74 },
    { yRatio: 0.76, phase: 4.3, amplitude: 0.068, speed: 0.63 },
  ]
}

function makeParticles(count: number, laneCount: number): RibbonParticle[] {
  return Array.from({ length: count }, () => ({
    laneIndex: Math.floor(Math.random() * laneCount),
    t: Math.random(),
    speed: 0.00045 + Math.random() * 0.0013,
    size: 3.2 + Math.random() * 5.8,
    offsetX: 0,
    offsetY: 0,
    vx: 0,
    vy: 0,
  }))
}

export default function AnimationDepartmentFlows() {
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
      const waveA = Math.sin(t * Math.PI * 2.1 + time * lane.speed + lane.phase) * lane.amplitude * height
      const waveB = Math.sin(t * Math.PI * 7.4 + time * (lane.speed + 0.4) + lane.phase) * lane.amplitude * height * 0.35
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

      const particleCount = clamp(Math.round((width * height) / 32000), 18, 36)
      particles = makeParticles(particleCount, lanes.length)
      pointer.x = width * 0.55
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

      const idleX = width * 0.5 + Math.cos(time * 0.5) * width * 0.08
      const idleY = height * 0.5 + Math.sin(time * 0.45) * height * 0.12
      const targetX = pointer.active ? pointer.x : idleX
      const targetY = pointer.active ? pointer.y : idleY
      const lastX = pointer.smoothX
      const lastY = pointer.smoothY
      pointer.smoothX += (targetX - pointer.smoothX) * 0.05
      pointer.smoothY += (targetY - pointer.smoothY) * 0.05
      pointer.vx = pointer.smoothX - lastX
      pointer.vy = pointer.smoothY - lastY
      const pointerSpeed = Math.hypot(pointer.vx, pointer.vy)

      lanes.forEach((lane, laneIndex) => {
        context.beginPath()
        for (let i = 0; i <= 84; i += 1) {
          const t = i / 84
          const point = lanePoint(lane, t, time)
          const influence = clamp(1 - Math.hypot(point.x - pointer.smoothX, point.y - pointer.smoothY) / 220, 0, 1)
          const warp = influence * CURSOR_FORCE * (7 + pointerSpeed * 22)
          const warpedY = point.y + Math.sin((t + time * 0.2 + lane.phase) * Math.PI * 6) * warp * 0.2
          if (i === 0) {
            context.moveTo(point.x, warpedY)
          } else {
            context.lineTo(point.x, warpedY)
          }
        }
        context.strokeStyle = `rgba(219, 233, 255, ${0.12 + laneIndex * 0.03})`
        context.lineWidth = 1.4
        context.stroke()
      })

      particles.forEach((particle) => {
        const lane = lanes[particle.laneIndex]
        particle.t += particle.speed + lane.speed * 0.00015
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
        const influence = clamp(1 - distance / 185, 0, 1)
        if (influence > 0) {
          const attract = (0.07 + pointerSpeed * 0.55) * influence * CURSOR_FORCE
          particle.vx += dx * attract * 0.0062
          particle.vy += dy * attract * 0.0062

          const swirl = (0.12 + pointerSpeed * 0.9) * influence * 0.007 * CURSOR_FORCE
          particle.vx += -dy * swirl * 0.008
          particle.vy += dx * swirl * 0.008
        }

        if (distance < 90) {
          const repel = (1 - distance / 90) * (0.34 + particle.size * 0.04) * CURSOR_FORCE
          const inv = 1 / (distance + 0.0001)
          particle.vx -= dx * inv * repel
          particle.vy -= dy * inv * repel
        }

        particle.vx *= 0.9
        particle.vy *= 0.9
        particle.offsetX += particle.vx
        particle.offsetY += particle.vy

        const x = base.x + particle.offsetX
        const y = base.y + particle.offsetY
        const radius = particle.size

        context.beginPath()
        context.fillStyle = `rgba(112, 130, 172, ${0.13 + radius * 0.012})`
        context.ellipse(x + radius * 0.25, y + radius * 0.46, radius * 0.9, radius * 0.56, 0, 0, Math.PI * 2)
        context.fill()

        const pearl = context.createRadialGradient(x - radius * 0.4, y - radius * 0.42, 0, x, y, radius * 1.2)
        pearl.addColorStop(0, 'rgba(255,255,255,0.98)')
        pearl.addColorStop(0.34, 'rgba(242,246,253,0.96)')
        pearl.addColorStop(0.72, 'rgba(205,216,236,0.9)')
        pearl.addColorStop(1, 'rgba(150,164,193,0.78)')
        context.beginPath()
        context.fillStyle = pearl
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.fill()
      })

      const edge = clamp(Math.min(width, height) * 0.21, 54, 150)
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
