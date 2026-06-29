'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Sigma, Plus, Trash2, RotateCcw, History, ChevronDown } from 'lucide-react'

type Mode = 'scientific' | 'graphing'
const GRAPH_COLORS = ['#60a5fa', '#f472b6', '#4ade80', '#fb923c', '#a78bfa', '#fbbf24']

function toJS(expr: string): string {
  return expr
    .replace(/π/g, '(Math.PI)')
    .replace(/\be\b/g, '(Math.E)')
    .replace(/sin⁻¹\(/g, 'Math.asin(')
    .replace(/cos⁻¹\(/g, 'Math.acos(')
    .replace(/tan⁻¹\(/g, 'Math.atan(')
    .replace(/sin\(/g, 'Math.sin(')
    .replace(/cos\(/g, 'Math.cos(')
    .replace(/tan\(/g, 'Math.tan(')
    .replace(/log\(/g, 'Math.log10(')
    .replace(/ln\(/g, 'Math.log(')
    .replace(/√\(/g, 'Math.sqrt(')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/\^/g, '**')
    .replace(/%/g, '/100')
}

function evalCalc(expr: string): string {
  if (!expr.trim()) return ''
  try {
    // eslint-disable-next-line no-new-func
    const val = new Function('"use strict"; return (' + toJS(expr) + ')')()
    if (val === undefined || !isFinite(Number(val))) return 'Error'
    return String(Math.round(Number(val) * 1e10) / 1e10)
  } catch { return '' }
}

function niceStep(rough: number): number {
  if (rough <= 0) return 1
  const mag = Math.pow(10, Math.floor(Math.log10(Math.abs(rough))))
  const n = rough / mag
  if (n < 1.5) return mag
  if (n < 3.5) return 2 * mag
  if (n < 7.5) return 5 * mag
  return 10 * mag
}

function drawGraph(canvas: HTMLCanvasElement, eqs: string[], xMin: number, xMax: number): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const W = canvas.width, H = canvas.height
  const xRange = xMax - xMin

  const funcs = eqs.filter(e => e.trim()).map((expr) => {
    try {
      const js = toJS(expr)
      // eslint-disable-next-line no-new-func
      return new Function('x', `"use strict"; const {sin,cos,tan,asin,acos,atan,log,log10,sqrt,abs,ceil,floor,round,PI,E,pow,hypot,min,max,exp,sign,cbrt}=Math; return (${js});`) as (x: number) => number
    } catch { return null }
  })

  // Auto y-range
  const ys: number[] = []
  funcs.forEach((f) => {
    if (!f) return
    for (let px = 0; px <= W; px += 4) {
      try {
        const y = f(xMin + (px / W) * xRange)
        if (isFinite(y) && Math.abs(y) < 1e8) ys.push(y)
      } catch { /* skip */ }
    }
  })
  let yMin = -6, yMax = 6
  if (ys.length > 2) {
    const rawMin = Math.min(...ys), rawMax = Math.max(...ys)
    const pad = Math.max((rawMax - rawMin) * 0.12, 0.5)
    yMin = rawMin - pad; yMax = rawMax + pad
  }
  const yRange = yMax - yMin
  const cx = (x: number) => ((x - xMin) / xRange) * W
  const cy = (y: number) => H - ((y - yMin) / yRange) * H

  // Background
  ctx.fillStyle = '#0d1117'
  ctx.fillRect(0, 0, W, H)

  // Grid
  const xStep = niceStep(xRange / 8), yStep = niceStep(yRange / 6)
  ctx.strokeStyle = '#161d2a'; ctx.lineWidth = 1
  for (let gx = Math.ceil(xMin / xStep) * xStep; gx <= xMax; gx = Math.round((gx + xStep) * 1e9) / 1e9) {
    ctx.beginPath(); ctx.moveTo(cx(gx), 0); ctx.lineTo(cx(gx), H); ctx.stroke()
  }
  for (let gy = Math.ceil(yMin / yStep) * yStep; gy <= yMax; gy = Math.round((gy + yStep) * 1e9) / 1e9) {
    ctx.beginPath(); ctx.moveTo(0, cy(gy)); ctx.lineTo(W, cy(gy)); ctx.stroke()
  }

  // Axes
  ctx.strokeStyle = '#1d4ed840'; ctx.lineWidth = 1.5
  const ax = cx(0), ay = cy(0)
  if (ax >= 0 && ax <= W) { ctx.beginPath(); ctx.moveTo(ax, 0); ctx.lineTo(ax, H); ctx.stroke() }
  if (ay >= 0 && ay <= H) { ctx.beginPath(); ctx.moveTo(0, ay); ctx.lineTo(W, ay); ctx.stroke() }

  // Labels
  ctx.fillStyle = '#374e6a'; ctx.font = '10px monospace'
  for (let gx = Math.ceil(xMin / xStep) * xStep; gx <= xMax; gx = Math.round((gx + xStep) * 1e9) / 1e9) {
    if (Math.abs(gx) < xStep * 0.01) continue
    ctx.textAlign = 'center'
    ctx.fillText(String(Math.round(gx * 100) / 100), cx(gx), Math.min(ay >= 0 && ay <= H ? ay + 13 : H - 13, H - 3))
  }
  for (let gy = Math.ceil(yMin / yStep) * yStep; gy <= yMax; gy = Math.round((gy + yStep) * 1e9) / 1e9) {
    if (Math.abs(gy) < yStep * 0.01) continue
    ctx.textAlign = 'right'
    ctx.fillText(String(Math.round(gy * 100) / 100), Math.max(ax >= 0 && ax <= W ? ax - 4 : 28, 28), cy(gy) + 4)
  }

  // Curves
  let ci = 0
  funcs.forEach((f) => {
    if (!f) return
    const color = GRAPH_COLORS[ci++ % GRAPH_COLORS.length]
    ctx.strokeStyle = color; ctx.lineWidth = 2
    ctx.shadowColor = color; ctx.shadowBlur = 8
    ctx.beginPath()
    let drawing = false, prevPy = 0
    for (let px = 0; px <= W; px++) {
      const x = xMin + (px / W) * xRange
      try {
        const y = f(x)
        if (!isFinite(y) || Math.abs(y) > 1e7) { drawing = false; continue }
        const py = cy(y)
        if (drawing && Math.abs(py - prevPy) > H * 3) drawing = false
        if (!drawing) { ctx.moveTo(px, py); drawing = true } else ctx.lineTo(px, py)
        prevPy = py
      } catch { drawing = false }
    }
    ctx.stroke(); ctx.shadowBlur = 0
  })
}

type BtnDef = { label: string; action: string; value: string; wide?: boolean; cls?: string }

const FUNC_BTNS: BtnDef[] = [
  { label: 'sin(', action: 'append', value: 'sin(' },
  { label: 'cos(', action: 'append', value: 'cos(' },
  { label: 'tan(', action: 'append', value: 'tan(' },
  { label: '(', action: 'append', value: '(' },
  { label: ')', action: 'append', value: ')' },
  { label: 'sin⁻¹(', action: 'append', value: 'sin⁻¹(' },
  { label: 'cos⁻¹(', action: 'append', value: 'cos⁻¹(' },
  { label: 'tan⁻¹(', action: 'append', value: 'tan⁻¹(' },
  { label: 'xʸ', action: 'append', value: '^(' },
  { label: 'π', action: 'append', value: 'π' },
  { label: 'log(', action: 'append', value: 'log(' },
  { label: 'ln(', action: 'append', value: 'ln(' },
  { label: '√(', action: 'append', value: '√(' },
  { label: 'x²', action: 'append', value: '^2' },
  { label: 'e', action: 'append', value: 'e' },
]

const MEM_BTNS: BtnDef[] = [
  { label: 'MC', action: 'mem', value: 'mc', cls: 'text-teal-400' },
  { label: 'MR', action: 'mem', value: 'mr', cls: 'text-teal-400' },
  { label: 'M+', action: 'mem', value: 'm+', cls: 'text-teal-400' },
  { label: 'M−', action: 'mem', value: 'm-', cls: 'text-teal-400' },
  { label: '%', action: 'append', value: '%', cls: 'text-amber-400' },
]

const STD_BTNS: BtnDef[] = [
  { label: 'C',  action: 'clear',     value: '',  cls: 'bg-rose-600/80 hover:bg-rose-500 text-white' },
  { label: '±',  action: 'negate',    value: '',  cls: 'bg-slate-600 hover:bg-slate-500 text-white' },
  { label: '⌫',  action: 'backspace', value: '',  cls: 'bg-amber-600/80 hover:bg-amber-500 text-white' },
  { label: '÷',  action: 'append',    value: '÷', cls: 'bg-blue-700/80 hover:bg-blue-600 text-white' },
  { label: '7',  action: 'append',    value: '7' },
  { label: '8',  action: 'append',    value: '8' },
  { label: '9',  action: 'append',    value: '9' },
  { label: '×',  action: 'append',    value: '×', cls: 'bg-blue-700/80 hover:bg-blue-600 text-white' },
  { label: '4',  action: 'append',    value: '4' },
  { label: '5',  action: 'append',    value: '5' },
  { label: '6',  action: 'append',    value: '6' },
  { label: '−',  action: 'append',    value: '−', cls: 'bg-blue-700/80 hover:bg-blue-600 text-white' },
  { label: '1',  action: 'append',    value: '1' },
  { label: '2',  action: 'append',    value: '2' },
  { label: '3',  action: 'append',    value: '3' },
  { label: '+',  action: 'append',    value: '+', cls: 'bg-blue-700/80 hover:bg-blue-600 text-white' },
  { label: '0',  action: 'append',    value: '0', wide: true },
  { label: '.',  action: 'append',    value: '.' },
  { label: '=',  action: 'equals',    value: '',  cls: 'bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/30' },
]

export default function CalculatorPage() {
  const [mode, setMode]           = useState<Mode>('scientific')
  const [display, setDisplay]     = useState('')
  const [memory, setMemory]       = useState(0)
  const [justEvaled, setJustEvaled] = useState(false)
  const [history, setHistory]     = useState<{ expr: string; res: string }[]>([])
  const [showHistory, setShowHistory] = useState(false)

  const [eqInputs, setEqInputs] = useState(['sin(x)', 'x^2/10', 'cos(x)'])
  const [xMin, setXMin] = useState(-10)
  const [xMax, setXMax] = useState(10)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const result = evalCalc(display)

  const redraw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    drawGraph(canvas, eqInputs, xMin, xMax)
  }, [eqInputs, xMin, xMax])

  useEffect(() => {
    if (mode === 'graphing') redraw()
  }, [mode, redraw])

  function press(action: string, value: string) {
    if (action === 'append') {
      if (justEvaled && /^[\d.]/.test(value)) {
        setDisplay(value)
      } else if (justEvaled && /^[+×÷^−]/.test(value)) {
        setDisplay((result && result !== 'Error' ? result : '') + value)
      } else {
        setDisplay((d) => d + value)
      }
      setJustEvaled(false)
    } else if (action === 'clear') {
      setDisplay(''); setJustEvaled(false)
    } else if (action === 'backspace') {
      setDisplay((d) => {
        for (const t of ['sin⁻¹(', 'cos⁻¹(', 'tan⁻¹(', 'sin(', 'cos(', 'tan(', 'log(', 'ln(', '√(']) {
          if (d.endsWith(t)) return d.slice(0, -t.length)
        }
        return d.slice(0, -1)
      })
      setJustEvaled(false)
    } else if (action === 'negate') {
      setDisplay((d) => (d.startsWith('-') ? d.slice(1) : '-' + d)); setJustEvaled(false)
    } else if (action === 'equals') {
      if (!display) return
      const r = evalCalc(display)
      if (r && r !== 'Error') {
        setHistory((h) => [...h.slice(-9), { expr: display, res: r }])
        setDisplay(r); setJustEvaled(true)
      }
    } else if (action === 'mem') {
      const cur = parseFloat(result || '0')
      if (value === 'mc') setMemory(0)
      else if (value === 'mr') { setDisplay((d) => d + String(memory)); setJustEvaled(false) }
      else if (value === 'm+') setMemory((m) => m + (isFinite(cur) ? cur : 0))
      else if (value === 'm-') setMemory((m) => m - (isFinite(cur) ? cur : 0))
    }
  }

  const base    = 'flex items-center justify-center h-10 rounded-xl font-semibold text-sm transition-all duration-100 active:scale-95 select-none cursor-pointer'
  const numCls  = 'bg-slate-700/80 hover:bg-slate-600 text-white/90'
  const fnCls   = 'bg-violet-900/60 hover:bg-violet-700/70 text-violet-200 text-xs'
  const memBase = 'bg-slate-800/60 hover:bg-slate-700 text-xs'

  return (
    <div className="space-y-6 animate-fade-up max-w-xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold flex items-center gap-2">
          <Sigma className="w-6 h-6 text-blue-500" />
          <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Calculator</span>
        </h1>
        <p className="text-blue-400 text-sm mt-0.5 font-medium">Scientific &amp; graphing · RAD mode</p>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-2">
        {(['scientific', 'graphing'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${
              mode === m
                ? m === 'scientific'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-300/50'
                  : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-300/50'
                : 'glass text-gray-500 hover:text-gray-900'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {mode === 'scientific' && (
        <>
          {/* Calculator body */}
          <div className="rounded-2xl bg-[#0d1117] border border-white/8 overflow-hidden shadow-2xl">
            {/* Display */}
            <div className="px-5 pt-5 pb-3 min-h-[88px] flex flex-col justify-end border-b border-white/8">
              <div className="text-slate-400 text-sm font-mono break-all text-right leading-snug">
                {display || '0'}
              </div>
              <div className={`text-3xl font-bold font-mono mt-1 text-right ${result === 'Error' ? 'text-rose-400' : 'text-white'}`}>
                {result && !justEvaled ? (result === 'Error' ? 'Error' : '= ' + result) : ' '}
              </div>
              {memory !== 0 && (
                <div className="text-[10px] text-teal-400 font-mono text-right mt-0.5">M: {memory}</div>
              )}
            </div>

            {/* Function keys: 5 cols × 3 rows */}
            <div className="grid grid-cols-5 gap-1 p-2.5 border-b border-white/8">
              {FUNC_BTNS.map((b) => (
                <button key={b.label} onClick={() => press(b.action, b.value)} className={`${base} ${fnCls}`}>
                  {b.label}
                </button>
              ))}
            </div>

            {/* Memory keys */}
            <div className="grid grid-cols-5 gap-1 px-2.5 py-2 border-b border-white/8">
              {MEM_BTNS.map((b) => (
                <button key={b.label} onClick={() => press(b.action, b.value)} className={`${base} ${memBase} ${b.cls}`}>
                  {b.label}
                </button>
              ))}
            </div>

            {/* Numeric keys: 4 cols */}
            <div className="grid grid-cols-4 gap-1 p-2.5">
              {STD_BTNS.map((b, i) =>
                b.wide ? (
                  <button key={i} onClick={() => press(b.action, b.value)} className={`${base} col-span-2 ${b.cls || numCls}`}>
                    {b.label}
                  </button>
                ) : (
                  <button key={i} onClick={() => press(b.action, b.value)} className={`${base} ${b.cls || numCls}`}>
                    {b.label}
                  </button>
                )
              )}
            </div>
          </div>

          {/* History */}
          {history.length > 0 && (
            <div className="glass rounded-2xl overflow-hidden">
              <button
                onClick={() => setShowHistory((h) => !h)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-black/5 transition-colors"
              >
                <span className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                  <History className="w-4 h-4 text-blue-500" /> History
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
              </button>
              {showHistory && (
                <div className="px-4 pb-3 space-y-1">
                  {history.slice().reverse().map((h, i) => (
                    <button
                      key={i}
                      onClick={() => { setDisplay(h.res); setJustEvaled(true) }}
                      className="w-full text-right px-3 py-2 rounded-xl hover:bg-blue-50 transition-colors group"
                    >
                      <p className="text-xs text-gray-400 font-mono group-hover:text-blue-400 truncate">{h.expr}</p>
                      <p className="text-sm font-bold text-gray-800 font-mono">= {h.res}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {mode === 'graphing' && (
        <div className="space-y-4">
          {/* Equation inputs */}
          <div className="glass rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-gray-700">Functions of x</h3>
              <button
                onClick={() => eqInputs.length < 6 && setEqInputs((e) => [...e, ''])}
                className="flex items-center gap-1 text-xs font-semibold text-electric hover:text-electric-dark transition-colors disabled:opacity-40"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>

            {eqInputs.map((eq, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: GRAPH_COLORS[i % GRAPH_COLORS.length] }} />
                <span className="text-xs text-gray-400 font-mono shrink-0">f(x)=</span>
                <input
                  value={eq}
                  onChange={(e) => setEqInputs((arr) => arr.map((v, idx) => idx === i ? e.target.value : v))}
                  onKeyDown={(e) => e.key === 'Enter' && redraw()}
                  placeholder="e.g. sin(x), x^2, log(x)"
                  className="input-glass flex-1 px-3 py-1.5 rounded-xl text-sm font-mono"
                />
                <button
                  onClick={() => setEqInputs((arr) => arr.filter((_, idx) => idx !== i))}
                  className="text-gray-300 hover:text-rose-400 transition-colors shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <div className="flex items-center gap-3 flex-wrap pt-1">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>x :</span>
                <input type="number" value={xMin} onChange={(e) => setXMin(Number(e.target.value))} className="input-glass w-16 px-2 py-1 rounded-lg text-xs text-center" />
                <span>to</span>
                <input type="number" value={xMax} onChange={(e) => setXMax(Number(e.target.value))} className="input-glass w-16 px-2 py-1 rounded-lg text-xs text-center" />
              </div>
              <button onClick={redraw} className="ml-auto btn-electric text-white text-xs px-4 py-1.5 rounded-lg font-semibold">
                Plot
              </button>
              <button onClick={() => { setXMin(-10); setXMax(10) }} className="text-gray-400 hover:text-gray-600 transition-colors" title="Reset range">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0d1117]">
            <canvas ref={canvasRef} width={600} height={360} className="w-full h-auto block" />
          </div>

          {/* Legend */}
          {eqInputs.some((e) => e.trim()) && (
            <div className="glass rounded-xl px-4 py-2.5 flex flex-wrap gap-4">
              {eqInputs.filter((e) => e.trim()).map((eq, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs">
                  <div className="w-8 h-1.5 rounded-full" style={{ backgroundColor: GRAPH_COLORS[i % GRAPH_COLORS.length] }} />
                  <span className="font-mono text-gray-600">{eq}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
