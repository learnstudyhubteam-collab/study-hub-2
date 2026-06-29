'use client'

import { useState, useRef } from 'react'
import { Sigma, Maximize2, Minimize2 } from 'lucide-react'

type Mode = 'scientific' | 'graphing'

export default function CalculatorPage() {
  const [mode, setMode] = useState<Mode>('graphing')
  const [fullscreen, setFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  function toggleFullscreen() {
    if (!fullscreen) {
      containerRef.current?.requestFullscreen?.().catch(() => {})
    } else {
      document.exitFullscreen?.().catch(() => {})
    }
    setFullscreen((f) => !f)
  }

  const src = mode === 'graphing'
    ? 'https://www.desmos.com/calculator'
    : 'https://www.desmos.com/scientific'

  return (
    <div className="flex flex-col h-full animate-fade-up">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-electric-gradient flex items-center justify-center shadow-electric">
              <Sigma className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Calculator</h1>
              <p className="text-orange-400 text-sm font-medium">Powered by Desmos</p>
            </div>
          </div>

          {/* Mode tabs */}
          <div className="inline-flex rounded-xl bg-black/5 p-1 gap-1">
            <button
              onClick={() => setMode('graphing')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                mode === 'graphing'
                  ? 'bg-white shadow text-violet-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Graphing
            </button>
            <button
              onClick={() => setMode('scientific')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                mode === 'scientific'
                  ? 'bg-white shadow text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Scientific
            </button>
          </div>
        </div>

        {/* Fullscreen button */}
        <button
          onClick={toggleFullscreen}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/60 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-white/80 transition-all shadow-sm"
          title={fullscreen ? 'Exit fullscreen' : 'Full screen'}
        >
          {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          {fullscreen ? 'Exit fullscreen' : 'Full screen'}
        </button>
      </div>

      {/* Desmos embed */}
      <div
        ref={containerRef}
        className="glass rounded-3xl overflow-hidden shadow-glass flex-1 min-h-[600px] bg-white"
      >
        <iframe
          key={mode}
          src={src}
          className="w-full h-full min-h-[600px] border-0"
          title={mode === 'graphing' ? 'Desmos Graphing Calculator' : 'Desmos Scientific Calculator'}
          allow="fullscreen"
        />
      </div>
    </div>
  )
}
