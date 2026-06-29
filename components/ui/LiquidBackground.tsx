'use client'

import { useEffect, useRef } from 'react'

export default function LiquidBackground() {
  const cvs = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = cvs.current
    if (!el) return
    const cx = el.getContext('2d')
    if (!cx) return

    // Respect system preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Capture as non-nullable so TypeScript trusts them inside closures
    const canvas: HTMLCanvasElement = el
    const ctx: CanvasRenderingContext2D = cx

    let raf: number
    let t = 0

    // Render at half resolution — CSS bilinear upscale adds natural softness
    const R = 0.5

    function setSize() {
      canvas.width  = Math.floor(window.innerWidth  * R)
      canvas.height = Math.floor(window.innerHeight * R)
    }
    setSize()
    window.addEventListener('resize', setSize)

    // ─── dual-frequency flow field ───────────────────────────────
    function fw(x: number, y: number, time: number): number {
      return (
        Math.sin(x * 0.0055 + time * 0.75) * Math.cos(y * 0.0048 + time * 0.58) +
        Math.sin(x * 0.0110 + y * 0.0082 + time * 0.46) * 0.45 +
        Math.cos(x * 0.0038 - y * 0.0090 + time * 0.32) * 0.30
      )
    }
    function fh(x: number, y: number, time: number): number {
      return (
        Math.cos(x * 0.0048 + time * 0.68) * Math.sin(y * 0.0058 + time * 0.62) +
        Math.cos(x * 0.0088 + y * 0.0072 + time * 0.38) * 0.40 +
        Math.sin(x * 0.0065 - y * 0.0042 + time * 0.42) * 0.35
      )
    }

    let lastTs = 0

    function draw(ts: number) {
      // Cap at ~30 fps for battery / performance
      if (ts - lastTs < 33) { raf = requestAnimationFrame(draw); return }
      lastTs = ts

      const W = canvas.width
      const H = canvas.height

      ctx.clearRect(0, 0, W, H)

      // ── base fill so light theme stays readable on JS load ────
      ctx.fillStyle = 'rgba(247, 250, 255, 0.88)'
      ctx.fillRect(0, 0, W, H)

      // ── liquid stream bands ───────────────────────────────────
      const STREAMS = 18
      for (let s = 0; s < STREAMS; s++) {
        const sx0 = ((s * 0.6180339) % 1) * W * 1.5 - W * 0.25
        const sy0 = ((s * 0.4142135) % 1) * H * 0.95

        ctx.beginPath()
        let px = sx0, py = sy0
        ctx.moveTo(px, py)

        for (let i = 0; i < 200; i++) {
          const spd = 3.2 * R
          const nx = fw(px / R, py / R, t + s * 0.41) * spd
          const ny = fh(px / R, py / R, t + s * 0.41) * spd + 0.35 * R
          px += nx
          py += ny
          ctx.lineTo(px, py)
        }

        const pulse = 0.5 + 0.5 * Math.sin(t * 0.38 + s * 0.62)
        const alpha = 0.032 + pulse * 0.022
        const hue   = 195 + s * 8.5 + Math.sin(t * 0.22 + s * 0.4) * 18
        const lit   = 42  + s * 2.6

        ctx.strokeStyle = `hsla(${hue}, 84%, ${lit}%, ${alpha})`
        ctx.lineWidth   = H * 0.095
        ctx.lineCap     = 'round'
        ctx.lineJoin    = 'round'
        ctx.stroke()
      }

      // ── thin highlight streamlines ─────────────────────────────
      const THIN = 8
      for (let s = 0; s < THIN; s++) {
        const sx0 = ((s * 0.7320508) % 1) * W * 1.2 - W * 0.1
        const sy0 = ((s * 0.5773502) % 1) * H

        ctx.beginPath()
        let px = sx0, py = sy0
        ctx.moveTo(px, py)

        for (let i = 0; i < 160; i++) {
          const spd = 2.5 * R
          px += fw(px / R, py / R, t * 1.2 + s * 0.55) * spd
          py += fh(px / R, py / R, t * 1.2 + s * 0.55) * spd + 0.2 * R
          ctx.lineTo(px, py)
        }

        const alpha = 0.05 + 0.03 * Math.abs(Math.sin(t * 0.5 + s * 0.9))
        ctx.strokeStyle = `hsla(${190 + s * 12}, 90%, 72%, ${alpha})`
        ctx.lineWidth   = H * 0.008
        ctx.lineCap     = 'round'
        ctx.stroke()
      }

      // ── plus / cross symbols swept by the flow ────────────────
      const GAP = Math.round(40 * R)
      for (let gx = 0; gx <= W + GAP; gx += GAP) {
        for (let gy = 0; gy <= H + GAP; gy += GAP) {
          const phase = gx * 0.058 + gy * 0.087

          // world-space coords for consistent flow sampling
          const wx = gx / R
          const wy = gy / R

          // carry the cross with the current
          const disp = 28 * R
          const dx = fw(wx, wy, t + phase * 0.07) * disp
          const dy = fh(wx, wy, t * 0.88 + phase * 0.07) * disp

          const x = gx + dx
          const y = gy + dy

          // rotate the cross to point along the flow
          const rot = Math.atan2(
            fh(wx, wy, t + phase * 0.07),
            fw(wx, wy, t + phase * 0.07)
          ) * 0.7

          // stretch arms in the flow direction
          const mag     = Math.hypot(fw(wx, wy, t), fh(wx, wy, t))
          const stretchY = 1 + mag * 1.2
          const stretchX = 1 / (1 + mag * 0.35)

          const sz     = 5.8 * R
          const alpha2 = 0.065 + 0.055 * Math.abs(Math.sin(t * 0.42 + phase * 0.5))
          const hue2   = 208 + fw(wx, wy, t * 0.3) * 24

          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(rot)
          ctx.scale(stretchX, stretchY)

          ctx.strokeStyle = `hsla(${hue2}, 92%, 56%, ${alpha2})`
          ctx.lineWidth   = 1.6 * R
          ctx.lineCap     = 'square'

          ctx.beginPath()
          ctx.moveTo(0, -sz)
          ctx.lineTo(0,  sz)
          ctx.moveTo(-sz, 0)
          ctx.lineTo( sz, 0)
          ctx.stroke()

          ctx.restore()
        }
      }

      t += 0.005
      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', setSize)
    }
  }, [])

  return (
    <canvas
      ref={cvs}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -10 }}
    />
  )
}
