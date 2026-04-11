'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

interface ParticleNetworkProps {
  particleCount?: number
  speed?: number
  connectDistance?: number
  color?: string // RGB string
  bgColor?: string // hex
  mouseAttract?: boolean
}

export default function ParticleNetwork({
  particleCount = 100,
  speed = 0.8,
  connectDistance = 120,
  color = '99,179,237',
  bgColor = '#0a0f1e',
  mouseAttract = true
}: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const ptsRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -999, y: -999 })
  const cfgRef = useRef({ particleCount, speed, connectDistance, color, bgColor })

  // eslint-disable-next-line react-hooks/refs
  cfgRef.current = { particleCount, speed, connectDistance, color, bgColor }

  const mkParticles = useCallback(
    (n: number, w: number, h: number): Particle[] => {
      return Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed * 2,
        vy: (Math.random() - 0.5) * speed * 2,
        r: Math.random() * 1.5 + 0.8
      }))
    },
    [speed]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      ptsRef.current = mkParticles(cfgRef.current.particleCount, canvas.width, canvas.height)
    }

    const draw = () => {
      const { color, bgColor, connectDistance, speed } = cfgRef.current
      const W = canvas.width
      const H = canvas.height
      const pts = ptsRef.current
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, W, H)

      pts.forEach((p) => {
        if (mouseAttract) {
          const dx = mx - p.x
          const dy = my - p.y
          const md = Math.sqrt(dx * dx + dy * dy)
          if (md < 140 && md > 0) {
            p.vx += (dx / md) * 0.04
            p.vy += (dy / md) * 0.04
          }
        }

        const maxSpd = speed * 2
        const v = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (v > maxSpd) {
          p.vx = (p.vx / v) * maxSpd
          p.vy = (p.vy / v) * maxSpd
        }

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) {
          p.x = 0
          p.vx *= -1
        }
        if (p.x > W) {
          p.x = W
          p.vx *= -1
        }
        if (p.y < 0) {
          p.y = 0
          p.vy *= -1
        }
        if (p.y > H) {
          p.y = H
          p.vy *= -1
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},0.85)`
        ctx.fill()
      })

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < connectDistance) {
            const alpha = (1 - d / connectDistance) * 0.25
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(${color},${alpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [mkParticles, mouseAttract])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    ptsRef.current = mkParticles(particleCount, canvas.width || 800, canvas.height || 600)
  }, [particleCount, mkParticles])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
  }, [])

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -999, y: -999 }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className='block h-full w-full'
    />
  )
}
