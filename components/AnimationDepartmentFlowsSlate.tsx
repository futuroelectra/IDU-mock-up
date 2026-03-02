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
const CURSOR_FORCE = 0.18

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

export default function AnimationDepartmentFlowsSlate() {
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

      const idleX = width * 0.52 + Math.cos(time * 0.45) * width * 0.08
      const idleY = height * 0.52 + Math.sin(time * 0.42) * height * 0.12
      const targetX = pointer.active ? pointer.x : idleX
      const targetY = pointer.active ? pointer.y : idleY
      const lastX = pointer.smoothX
      const lastY = pointer.smoothY
      pointer.smoothX += (targetX - pointer.smoothX) * 0.052
      pointer.smoothY += (targetY - pointer.smoothY) * 0.052
      pointer.vx = pointer.smoothX - lastX
      pointer.vy = pointer.smoothY - lastY
      const pointerSpeed = Math.hypot(pointer.vx, pointer.vy)

      lanes.forEach((lane, laneIndex) => {
        context.beginPath()
        for (let i = 0; i <= 84; i += 1) {
          const t = i / 84
          const point = lanePoint(lane, t, time)
          const influence = clamp(1 - Math.hypot(point.x - pointer.smoothX, point.y - pointer.smoothY) / 210, 0, 1)
          const warp = influence * CURSOR_FORCE * (7 + pointerSpeed * 18)
          const warpedY = point.y + Math.sin((t + time * 0.2 + lane.phase) * Math.PI * 6) * warp * 0.17
          if (i === 0) {
            context.moveTo(point.x, warpedY)
          } else {
            context.lineTo(point.x, warpedY)
          }
        }
        context.strokeStyle = `rgba(28, 31, 94, ${0.1 + laneIndex * 0.05})`
        context.lineWidth = 1.25
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
        const influence = clamp(1 - distance / 182, 0, 1)

        if (influence > 0) {
          const attract = (0.07 + pointerSpeed * 0.52) * influence * CURSOR_FORCE
          particle.vx += dx * attract * 0.006
          particle.vy += dy * attract * 0.006

          const swirl = (0.11 + pointerSpeed * 0.78) * influence * CURSOR_FORCE
          particle.vx += -dy * swirl * 0.0048
          particle.vy += dx * swirl * 0.0048
        }

        if (distance < 92) {
          const repel = (1 - distance / 92) * (0.23 + particle.size * 0.03) * CURSOR_FORCE
          const inv = 1 / (distance + 0.0001)
          particle.vx -= dx * inv * repel
          particle.vy -= dy * inv * repel
        }

        particle.vx *= 0.905
        particle.vy *= 0.905
        particle.offsetX += particle.vx
        particle.offsetY += particle.vy

        const x = base.x + particle.offsetX
        const y = base.y + particle.offsetY
        const radius = particle.size

        context.beginPath()
        context.fillStyle = `rgba(100, 116, 139, ${0.12 + radius * 0.01})`
        context.ellipse(x + radius * 0.26, y + radius * 0.46, radius * 0.88, radius * 0.56, 0, 0, Math.PI * 2)
        context.fill()

        const pearl = context.createRadialGradient(x - radius * 0.36, y - radius * 0.38, 0, x, y, radius * 1.2)
        pearl.addColorStop(0, 'rgba(255,255,255,0.99)')
        pearl.addColorStop(0.33, 'rgba(248,250,252,0.97)')
        pearl.addColorStop(0.72, 'rgba(225,232,241,0.9)')
        pearl.addColorStop(1, 'rgba(175,188,205,0.8)')

        context.beginPath()
        context.fillStyle = pearl
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.fill()

        if ((particle.laneIndex + Math.floor(time * 2)) % 5 === 0) {
          context.beginPath()
          context.fillStyle = 'rgba(255,77,0,0.18)'
          context.arc(x - radius * 0.18, y - radius * 0.22, Math.max(1.2, radius * 0.22), 0, Math.PI * 2)
          context.fill()
        }
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
