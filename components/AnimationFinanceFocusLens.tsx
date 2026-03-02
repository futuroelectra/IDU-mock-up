'use client'

import { useEffect, useMemo, useRef } from 'react'

type ServiceNodeInput = {
  id: string
  label: string
  detail: string
  xRatio: number
  yRatio: number
  radius: number
}

type ServiceNodeState = ServiceNodeInput & {
  x: number
  y: number
  vx: number
  vy: number
  pulsePhase: number
}

type AnimationFinanceFocusLensProps = {
  nodes?: ServiceNodeInput[]
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

const DEFAULT_NODES: ServiceNodeInput[] = [
  { id: 'scenario', label: 'Scenario Design', detail: '40% faster cycle planning', xRatio: 0.18, yRatio: 0.34, radius: 26 },
  { id: 'workforce', label: 'Workforce Model', detail: '3x business participation', xRatio: 0.37, yRatio: 0.58, radius: 22 },
  { id: 'cashflow', label: 'Cash Flow', detail: 'Live liquidity visibility', xRatio: 0.62, yRatio: 0.28, radius: 24 },
  { id: 'capex', label: 'Capex Control', detail: 'Governed investment decisions', xRatio: 0.73, yRatio: 0.63, radius: 23 },
  { id: 'alignment', label: 'Team Alignment', detail: 'Shared planning accountability', xRatio: 0.47, yRatio: 0.43, radius: 20 },
]

export default function AnimationFinanceFocusLens({ nodes = DEFAULT_NODES }: AnimationFinanceFocusLensProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const nodeBlueprints = useMemo(() => nodes, [nodes])

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

    let frame = 0
    let width = 0
    let height = 0
    let dpr = 1

    let stateNodes: ServiceNodeState[] = []
    let hoveredNodeId: string | null = null
    let pinnedNodeId: string | null = null

    const pointer = {
      active: false,
      x: 0,
      y: 0,
      smoothX: 0,
      smoothY: 0,
      vx: 0,
      vy: 0,
    }

    const lensRadius = () => clamp(Math.min(width, height) * 0.2, 90, 150)

    const initializeNodes = () => {
      stateNodes = nodeBlueprints.map((node, index) => ({
        ...node,
        x: node.xRatio * width,
        y: node.yRatio * height,
        vx: 0,
        vy: 0,
        pulsePhase: (index * Math.PI) / 3,
      }))
    }

    const resize = () => {
      const rect = wrapper.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      pointer.x = width * 0.52
      pointer.y = height * 0.48
      pointer.smoothX = pointer.x
      pointer.smoothY = pointer.y
      pointer.vx = 0
      pointer.vy = 0

      initializeNodes()
    }

    const pickHoveredNode = (x: number, y: number) => {
      let closest: { id: string; dist: number } | null = null
      stateNodes.forEach((node) => {
        const dist = Math.hypot(node.x - x, node.y - y)
        if (dist <= node.radius + 12) {
          if (!closest || dist < closest.dist) {
            closest = { id: node.id, dist }
          }
        }
      })
      hoveredNodeId = closest ? closest.id : null
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect()
      pointer.active = true
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pickHoveredNode(pointer.x, pointer.y)
    }

    const onPointerEnter = (event: PointerEvent) => {
      onPointerMove(event)
      pointer.active = true
    }

    const onPointerLeave = () => {
      pointer.active = false
      hoveredNodeId = null
    }

    const onPointerDown = () => {
      if (hoveredNodeId) {
        pinnedNodeId = hoveredNodeId
        return
      }
      pinnedNodeId = null
    }

    const drawConnectionLines = (alphaBoost = 1) => {
      for (let i = 0; i < stateNodes.length; i += 1) {
        for (let j = i + 1; j < stateNodes.length; j += 1) {
          const a = stateNodes[i]
          const b = stateNodes[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist > 300) {
            continue
          }
          const strength = 1 - dist / 300
          context.beginPath()
          context.strokeStyle = `rgba(59,130,246,${(0.08 + strength * 0.22) * alphaBoost})`
          context.lineWidth = 1 + strength * 0.8
          context.moveTo(a.x, a.y)
          context.lineTo(b.x, b.y)
          context.stroke()
        }
      }
    }

    const drawNode = (node: ServiceNodeState, time: number, alphaBoost = 1, focused = false) => {
      const isHovered = node.id === hoveredNodeId || node.id === pinnedNodeId
      const pulse = 1 + Math.sin(time * 1.1 + node.pulsePhase) * 0.03
      const hoverScale = isHovered ? 1.11 : 1
      const radius = node.radius * pulse * hoverScale

      const glow = context.createRadialGradient(node.x, node.y, radius * 0.2, node.x, node.y, radius * 2.3)
      glow.addColorStop(0, `rgba(96,165,250,${(isHovered ? 0.35 : 0.23) * alphaBoost})`)
      glow.addColorStop(1, 'rgba(96,165,250,0)')
      context.beginPath()
      context.fillStyle = glow
      context.arc(node.x, node.y, radius * 2.3, 0, Math.PI * 2)
      context.fill()

      if (focused && isHovered) {
        const accentGlow = context.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 1.8)
        accentGlow.addColorStop(0, 'rgba(255,77,0,0.14)')
        accentGlow.addColorStop(1, 'rgba(255,77,0,0)')
        context.beginPath()
        context.fillStyle = accentGlow
        context.arc(node.x, node.y, radius * 1.8, 0, Math.PI * 2)
        context.fill()
      }

      const fill = context.createRadialGradient(node.x - radius * 0.35, node.y - radius * 0.4, 0, node.x, node.y, radius)
      fill.addColorStop(0, `rgba(255,255,255,${0.98 * alphaBoost})`)
      fill.addColorStop(0.45, `rgba(222,236,255,${0.92 * alphaBoost})`)
      fill.addColorStop(1, `rgba(137,181,245,${0.88 * alphaBoost})`)
      context.beginPath()
      context.fillStyle = fill
      context.arc(node.x, node.y, radius, 0, Math.PI * 2)
      context.fill()

      context.beginPath()
      context.strokeStyle = `rgba(255,255,255,${(isHovered ? 0.85 : 0.62) * alphaBoost})`
      context.lineWidth = isHovered ? 1.8 : 1.2
      context.arc(node.x, node.y, radius, 0, Math.PI * 2)
      context.stroke()
    }

    const drawScene = (time: number, alphaBoost = 1, focused = false) => {
      drawConnectionLines(alphaBoost)
      stateNodes.forEach((node) => drawNode(node, time, alphaBoost, focused))
    }

    const drawLens = () => {
      const r = lensRadius()
      const cx = pointer.smoothX
      const cy = pointer.smoothY

      context.beginPath()
      context.strokeStyle = 'rgba(28,31,94,0.34)'
      context.lineWidth = 1.6
      context.arc(cx, cy, r, 0, Math.PI * 2)
      context.stroke()

      context.beginPath()
      context.strokeStyle = 'rgba(255,255,255,0.72)'
      context.lineWidth = 1
      context.arc(cx, cy, r - 4, 0, Math.PI * 2)
      context.stroke()

      context.beginPath()
      context.strokeStyle = 'rgba(28,31,94,0.42)'
      context.lineWidth = 2
      context.lineCap = 'round'
      context.moveTo(cx + r * 0.58, cy + r * 0.58)
      context.lineTo(cx + r * 0.92, cy + r * 0.92)
      context.stroke()
    }

    const drawTooltip = (time: number) => {
      const activeId = pinnedNodeId ?? hoveredNodeId
      if (!activeId) {
        return
      }

      const node = stateNodes.find((item) => item.id === activeId)
      if (!node) {
        return
      }

      const cardW = 198
      const cardH = 68
      const pad = 14
      let x = node.x + node.radius + 16
      let y = node.y - cardH * 0.5
      if (x + cardW > width - pad) {
        x = node.x - cardW - node.radius - 16
      }
      y = clamp(y, pad, height - cardH - pad)

      const pop = 1 + Math.sin(time * 4.2) * 0.015
      const w = cardW * pop
      const h = cardH * pop

      const shadow = context.createLinearGradient(x, y, x, y + h)
      shadow.addColorStop(0, 'rgba(15,23,42,0.2)')
      shadow.addColorStop(1, 'rgba(15,23,42,0.08)')

      context.beginPath()
      context.fillStyle = shadow
      context.roundRect(x + 1.5, y + 2.5, w, h, 14)
      context.fill()

      const bg = context.createLinearGradient(x, y, x + w, y + h)
      bg.addColorStop(0, 'rgba(255,255,255,0.98)')
      bg.addColorStop(1, 'rgba(248,250,252,0.98)')
      context.beginPath()
      context.fillStyle = bg
      context.roundRect(x, y, w, h, 14)
      context.fill()

      context.beginPath()
      context.strokeStyle = 'rgba(205,219,242,0.95)'
      context.lineWidth = 1
      context.roundRect(x, y, w, h, 14)
      context.stroke()

      context.fillStyle = '#1C1F5E'
      context.font = '600 13px Manrope, system-ui, sans-serif'
      context.fillText(node.label, x + 12, y + 27)

      context.fillStyle = '#64748B'
      context.font = '500 11px Manrope, system-ui, sans-serif'
      context.fillText(node.detail, x + 12, y + 47)
    }

    const draw = (timeMs: number) => {
      frame = window.requestAnimationFrame(draw)
      const time = timeMs * 0.001
      context.clearRect(0, 0, width, height)

      const idleX = width * 0.5 + Math.cos(time * 0.45) * width * 0.1
      const idleY = height * 0.5 + Math.sin(time * 0.38) * height * 0.12
      const targetX = pointer.active ? pointer.x : idleX
      const targetY = pointer.active ? pointer.y : idleY

      const lastX = pointer.smoothX
      const lastY = pointer.smoothY
      pointer.smoothX += (targetX - pointer.smoothX) * 0.11
      pointer.smoothY += (targetY - pointer.smoothY) * 0.11
      pointer.vx = pointer.smoothX - lastX
      pointer.vy = pointer.smoothY - lastY
      const pointerSpeed = Math.hypot(pointer.vx, pointer.vy)

      stateNodes.forEach((node) => {
        const anchorX = node.xRatio * width
        const anchorY = node.yRatio * height

        const dx = node.x - pointer.smoothX
        const dy = node.y - pointer.smoothY
        const dist = Math.hypot(dx, dy)
        const influence = clamp(1 - dist / 210, 0, 1)

        if (influence > 0) {
          const inv = 1 / (dist + 0.001)
          const push = influence * (0.07 + pointerSpeed * 0.5)
          const swirl = influence * (0.03 + pointerSpeed * 0.24)
          node.vx += dx * inv * push - dy * swirl
          node.vy += dy * inv * push + dx * swirl
        }

        node.vx += (anchorX - node.x) * 0.022
        node.vy += (anchorY - node.y) * 0.022
        node.vx *= 0.9
        node.vy *= 0.9
        node.x += node.vx
        node.y += node.vy
      })

      drawScene(time, 1, false)

      context.fillStyle = 'rgba(248,250,252,0.42)'
      context.fillRect(0, 0, width, height)

      const r = lensRadius()
      context.save()
      context.beginPath()
      context.arc(pointer.smoothX, pointer.smoothY, r, 0, Math.PI * 2)
      context.clip()
      drawScene(time, 1.08, true)
      context.restore()

      drawLens()
      drawTooltip(time)
    }

    resize()
    frame = window.requestAnimationFrame(draw)

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(wrapper)

    wrapper.addEventListener('pointermove', onPointerMove)
    wrapper.addEventListener('pointerenter', onPointerEnter)
    wrapper.addEventListener('pointerleave', onPointerLeave)
    wrapper.addEventListener('pointerdown', onPointerDown)

    return () => {
      window.cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      wrapper.removeEventListener('pointermove', onPointerMove)
      wrapper.removeEventListener('pointerenter', onPointerEnter)
      wrapper.removeEventListener('pointerleave', onPointerLeave)
      wrapper.removeEventListener('pointerdown', onPointerDown)
    }
  }, [nodeBlueprints])

  return (
    <div ref={wrapperRef} className="relative h-full w-full">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
