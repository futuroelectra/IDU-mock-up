'use client'

import { useEffect, useRef } from 'react'

type Cell = {
  x: number
  y: number
  w: number
  h: number
  energy: number
}

type Point = { x: number; y: number }

type Pulse = {
  routeIndex: number
  segment: number
  progress: number
  speed: number
  size: number
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

const roundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + w - radius, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius)
  ctx.lineTo(x + w, y + h - radius)
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h)
  ctx.lineTo(x + radius, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}

export default function AnimationPlanningMatrix() {
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
    let cells: Cell[] = []
    let routes: Point[][] = []
    let pulses: Pulse[] = []

    const pointer = {
      active: false,
      x: 0,
      y: 0,
      smoothX: 0,
      smoothY: 0,
      vx: 0,
      vy: 0,
    }

    const makeGrid = () => {
      const cols = 7
      const rows = 4
      const gridW = width * 0.8
      const gridH = height * 0.62
      const startX = (width - gridW) * 0.5
      const startY = (height - gridH) * 0.5
      const stepX = gridW / (cols - 1)
      const stepY = gridH / (rows - 1)
      const tileW = clamp(stepX * 0.58, 40, 92)
      const tileH = clamp(stepY * 0.36, 24, 40)

      const newCells: Cell[] = []
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          newCells.push({
            x: startX + col * stepX,
            y: startY + row * stepY,
            w: tileW,
            h: tileH,
            energy: 0,
          })
        }
      }
      cells = newCells

      const byRow = (row: number): Point[] =>
        Array.from({ length: cols }, (_, col) => ({
          x: startX + col * stepX,
          y: startY + row * stepY,
        }))

      routes = [
        byRow(0),
        byRow(1),
        byRow(2),
        byRow(3),
        [
          { x: startX + stepX * 0, y: startY + stepY * 0.7 },
          { x: startX + stepX * 1.5, y: startY + stepY * 1.2 },
          { x: startX + stepX * 3.1, y: startY + stepY * 1.8 },
          { x: startX + stepX * 4.5, y: startY + stepY * 1.2 },
          { x: startX + stepX * 6, y: startY + stepY * 2.8 },
        ],
        [
          { x: startX + stepX * 0.4, y: startY + stepY * 2.9 },
          { x: startX + stepX * 2.0, y: startY + stepY * 2.3 },
          { x: startX + stepX * 3.4, y: startY + stepY * 2.7 },
          { x: startX + stepX * 5.2, y: startY + stepY * 2.0 },
          { x: startX + stepX * 6.4, y: startY + stepY * 0.5 },
        ],
      ]

      pulses = Array.from({ length: 16 }, () => ({
        routeIndex: Math.floor(Math.random() * routes.length),
        segment: 0,
        progress: Math.random(),
        speed: 0.007 + Math.random() * 0.012,
        size: 2.8 + Math.random() * 4.8,
      }))
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
      makeGrid()

      pointer.x = width * 0.56
      pointer.y = height * 0.52
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

      const idleX = width * 0.52 + Math.cos(time * 0.52) * width * 0.07
      const idleY = height * 0.54 + Math.sin(time * 0.45) * height * 0.1
      const targetX = pointer.active ? pointer.x : idleX
      const targetY = pointer.active ? pointer.y : idleY
      const lastX = pointer.smoothX
      const lastY = pointer.smoothY
      pointer.smoothX += (targetX - pointer.smoothX) * 0.1
      pointer.smoothY += (targetY - pointer.smoothY) * 0.1
      pointer.vx = pointer.smoothX - lastX
      pointer.vy = pointer.smoothY - lastY
      const pointerSpeed = Math.hypot(pointer.vx, pointer.vy)

      cells.forEach((cell) => {
        cell.energy *= 0.9
        const influence = clamp(1 - Math.hypot(cell.x - pointer.smoothX, cell.y - pointer.smoothY) / 210, 0, 1)
        cell.energy += influence * 0.11
      })

      routes.forEach((route) => {
        context.beginPath()
        route.forEach((point, index) => {
          const wobble = Math.sin(time * 1.2 + point.x * 0.005 + point.y * 0.003) * 4
          if (index === 0) {
            context.moveTo(point.x, point.y + wobble)
          } else {
            context.lineTo(point.x, point.y + wobble)
          }
        })
        context.strokeStyle = 'rgba(224, 237, 255, 0.14)'
        context.lineWidth = 1
        context.stroke()
      })

      pulses.forEach((pulse) => {
        const route = routes[pulse.routeIndex]
        pulse.progress += pulse.speed * (1 + pointerSpeed * 0.6)
        if (pulse.progress > 1) {
          pulse.progress = 0
          pulse.segment += 1
          if (pulse.segment >= route.length - 1) {
            pulse.routeIndex = Math.floor(Math.random() * routes.length)
            pulse.segment = 0
            pulse.speed = 0.007 + Math.random() * 0.012
          }
        }

        const activeRoute = routes[pulse.routeIndex]
        const start = activeRoute[pulse.segment]
        const end = activeRoute[pulse.segment + 1]
        const x = start.x + (end.x - start.x) * pulse.progress
        const y = start.y + (end.y - start.y) * pulse.progress
        const dx = pointer.smoothX - x
        const dy = pointer.smoothY - y
        const dist = Math.hypot(dx, dy)
        const influence = clamp(1 - dist / 170, 0, 1)
        const size = pulse.size * (1 + influence * 0.45)

        context.beginPath()
        context.fillStyle = `rgba(255,255,255,${0.72 + influence * 0.2})`
        context.arc(x, y, size, 0, Math.PI * 2)
        context.fill()

        cells.forEach((cell) => {
          const d = Math.hypot(cell.x - x, cell.y - y)
          if (d < 72) {
            cell.energy += (1 - d / 72) * 0.25
          }
        })
      })

      cells.forEach((cell) => {
        const energy = clamp(cell.energy, 0, 1.2)
        const dx = pointer.smoothX - cell.x
        const dy = pointer.smoothY - cell.y
        const dist = Math.hypot(dx, dy)
        const pull = clamp(1 - dist / 220, 0, 1)
        const shiftX = dx * pull * 0.08
        const shiftY = dy * pull * 0.08
        const scale = 1 + energy * 0.12
        const w = cell.w * scale
        const h = cell.h * scale
        const x = cell.x - w / 2 + shiftX
        const y = cell.y - h / 2 + shiftY

        roundedRect(context, x + 1.5, y + h * 0.16, w, h, 9)
        context.fillStyle = `rgba(110, 130, 168, ${0.1 + energy * 0.12})`
        context.fill()

        const fill = context.createLinearGradient(x, y, x + w, y + h)
        fill.addColorStop(0, `rgba(255,255,255,${0.74 + energy * 0.14})`)
        fill.addColorStop(1, `rgba(212,224,245,${0.62 + energy * 0.15})`)
        roundedRect(context, x, y, w, h, 9)
        context.fillStyle = fill
        context.fill()

        roundedRect(context, x, y, w, h, 9)
        context.strokeStyle = `rgba(235,242,255,${0.28 + energy * 0.2})`
        context.lineWidth = 1
        context.stroke()
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
