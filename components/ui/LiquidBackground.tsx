'use client'

import { useEffect, useRef } from 'react'

export default function LiquidBackground() {
  const cvs = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = cvs.current
    if (!el) return
    const cx = el.getContext('2d')
    if (!cx) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas: HTMLCanvasElement = el
    const ctx: CanvasRenderingContext2D = cx

    let raf: number
    let t = 0
    const R = 0.5 // render at half-res; bilinear upscale softens everything naturally

    function setSize() {
      canvas.width  = Math.floor(window.innerWidth  * R)
      canvas.height = Math.floor(window.innerHeight * R)
    }
    setSize()
    window.addEventListener('resize', setSize)

    // ─── flow field ─────────────────────────────────────────────
    // 3-term sin/cos superposition gives complex, non-repeating swirls
    function fw(x: number, y: number, time: number): number {
      return (
        Math.sin(x * 0.007 + time * 1.1) * Math.cos(y * 0.005 + time * 0.8) +
        Math.sin(x * 0.014 + y * 0.010 + time * 0.65) * 0.55 +
        Math.cos(x * 0.004 - y * 0.012 + time * 0.48) * 0.40
      )
    }
    function fh(x: number, y: number, time: number): number {
      return (
        Math.cos(x * 0.005 + time * 0.9) * Math.sin(y * 0.007 + time * 0.75) +
        Math.cos(x * 0.010 + y * 0.008 + time * 0.55) * 0.50 +
        Math.sin(x * 0.006 - y * 0.005 + time * 0.52) * 0.38
      )
    }

    // Build a flow-field path starting at (sx, sy) in canvas-space
    function buildPath(sx: number, sy: number, seed: number, steps: number) {
      ctx.beginPath()
      let px = sx, py = sy
      ctx.moveTo(px, py)
      for (let i = 0; i < steps; i++) {
        const spd = 3.6 * R
        px += fw(px / R, py / R, t + seed) * spd
        py += fh(px / R, py / R, t + seed) * spd + 0.3 * R
        ctx.lineTo(px, py)
      }
    }

    let lastTs = 0

    function draw(ts: number) {
      if (ts - lastTs < 33) { raf = requestAnimationFrame(draw); return }
      lastTs = ts

      const W = canvas.width
      const H = canvas.height

      // ── dark background ──────────────────────────────────────
      ctx.fillStyle = '#03060f'
      ctx.fillRect(0, 0, W, H)

      // ── stream hue palette ───────────────────────────────────
      // 16 streams cycling through blue → cyan → teal → indigo
      const STREAMS = 16
      const hues = [200, 205, 192, 210, 185, 215, 195, 188, 220, 178, 202, 208, 183, 225, 196, 172]

      // PASS 1 — wide atmospheric glow (additive blending blooms overlaps)
      ctx.globalCompositeOperation = 'lighter'
      ctx.lineCap  = 'round'
      ctx.lineJoin = 'round'

      for (let s = 0; s < STREAMS; s++) {
        const sx0 = ((s * 0.6180339) % 1) * W * 1.5 - W * 0.25
        const sy0 = ((s * 0.4142135) % 1) * H
        buildPath(sx0, sy0, s * 0.42, 220)
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.4 + s * 0.65)
        const hue   = hues[s]
        ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${0.028 + pulse * 0.018})`
        ctx.lineWidth   = H * 0.22
        ctx.stroke()
      }

      // PASS 2 — mid-width glow
      for (let s = 0; s < STREAMS; s++) {
        const sx0 = ((s * 0.6180339) % 1) * W * 1.5 - W * 0.25
        const sy0 = ((s * 0.4142135) % 1) * H
        buildPath(sx0, sy0, s * 0.42, 220)
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.4 + s * 0.65)
        const hue   = hues[s]
        const sat   = s % 3 === 0 ? 80 : 100 // some green-shifted streams
        const lit   = 60 + (s % 4) * 5
        ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${lit}%, ${0.08 + pulse * 0.045})`
        ctx.lineWidth   = H * 0.055
        ctx.stroke()
      }

      // PASS 3 — bright neon core lines
      ctx.shadowBlur = 0
      for (let s = 0; s < STREAMS; s++) {
        const sx0 = ((s * 0.6180339) % 1) * W * 1.5 - W * 0.25
        const sy0 = ((s * 0.4142135) % 1) * H
        buildPath(sx0, sy0, s * 0.42, 220)
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.4 + s * 0.65)
        const hue   = hues[s]
        const lit   = 78 + pulse * 12

        ctx.shadowBlur  = 18 * R
        ctx.shadowColor = `hsla(${hue}, 100%, 70%, 0.9)`
        ctx.strokeStyle = `hsla(${hue}, 100%, ${lit}%, ${0.22 + pulse * 0.12})`
        ctx.lineWidth   = H * 0.007
        ctx.stroke()
      }
      ctx.shadowBlur = 0

      // ── extra-bright highlight traces ─────────────────────────
      const HIGHLIGHTS = 5
      for (let s = 0; s < HIGHLIGHTS; s++) {
        const sx0 = ((s * 0.7320508) % 1) * W * 1.3 - W * 0.15
        const sy0 = ((s * 0.5773502) % 1) * H * 0.8
        buildPath(sx0, sy0, s * 0.61 + 1.2, 150)
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.55 + s * 0.9)
        const hue   = 185 + s * 14

        ctx.shadowBlur  = 25 * R
        ctx.shadowColor = `hsla(${hue}, 100%, 80%, 1)`
        ctx.strokeStyle = `hsla(${hue}, 100%, 90%, ${0.18 + pulse * 0.1})`
        ctx.lineWidth   = H * 0.004
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      ctx.globalCompositeOperation = 'source-over'

      // ── cross / plus symbols flowing in the field ─────────────
      const GAP = Math.round(38 * R)
      for (let gx = 0; gx <= W + GAP; gx += GAP) {
        for (let gy = 0; gy <= H + GAP; gy += GAP) {
          const phase = gx * 0.06 + gy * 0.09
          const wx = gx / R, wy = gy / R

          // displace with the current
          const disp = 30 * R
          const dx = fw(wx, wy, t + phase * 0.07) * disp
          const dy = fh(wx, wy, t * 0.88 + phase * 0.07) * disp
          const x = gx + dx, y = gy + dy

          // rotate to align with flow direction
          const rot = Math.atan2(
            fh(wx, wy, t + phase * 0.07),
            fw(wx, wy, t + phase * 0.07)
          ) * 0.75

          // stretch arm length proportional to current speed
          const mag = Math.hypot(fw(wx, wy, t), fh(wx, wy, t))
          const stretchY = 1 + mag * 1.4
          const stretchX = 1 / (1 + mag * 0.4)

          const sz     = 5.6 * R
          const pulse  = 0.5 + 0.5 * Math.abs(Math.sin(t * 0.5 + phase * 0.45))
          const alpha  = 0.10 + pulse * 0.12
          const hue    = 195 + fw(wx, wy, t * 0.3) * 28

          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(rot)
          ctx.scale(stretchX, stretchY)

          ctx.shadowBlur  = 9 * R
          ctx.shadowColor = `hsla(${hue}, 100%, 70%, 0.95)`
          ctx.strokeStyle = `hsla(${hue}, 100%, 72%, ${alpha})`
          ctx.lineWidth   = 1.7 * R
          ctx.lineCap     = 'square'

          ctx.beginPath()
          ctx.moveTo(0, -sz)
          ctx.lineTo(0,  sz)
          ctx.moveTo(-sz, 0)
          ctx.lineTo( sz, 0)
          ctx.stroke()

          ctx.shadowBlur = 0
          ctx.restore()
        }
      }

      t += 0.005
      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', setSize) }
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
