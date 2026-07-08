import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { useStatus } from '../lib/status-store'

const SPIN = ['|', '/', '-', '\\']

// The fixed bottom status line — the product's real bottom bar
// (src/cli/bootstrap/status-line.ts), live-driven by the hero console.
export default function StatusBar() {
  const s = useStatus()
  const reduced = useReducedMotion()
  const [f, setF] = useState(0)

  useEffect(() => {
    if (reduced || !s.busy) return
    const id = window.setInterval(() => setF((v) => (v + 1) % SPIN.length), 120)
    return () => clearInterval(id)
  }, [reduced, s.busy])

  const Sep = () => <span className="text-line-hi">·</span>

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-void/80 backdrop-blur-xl">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="flex h-9 items-center gap-2 overflow-x-auto whitespace-nowrap font-mono text-[11.5px] [scrollbar-width:none]">
          <span className="text-pink">◆</span>
          <span className="text-pink">{s.provider}</span>
          <Sep />
          <span className="text-dim">{s.msg} msg</span>
          {s.think && (
            <>
              <Sep />
              <span className="text-cyan">think</span>
            </>
          )}
          {s.web && (
            <>
              <Sep />
              <span className="text-green">web</span>
            </>
          )}
          {s.ragChunks !== null && (
            <>
              <Sep />
              <span className="text-green">rag {s.ragChunks}c</span>
            </>
          )}
          <Sep />
          <span>
            <span className="text-dim">cwd:</span>
            <span className="text-cyan">{s.cwd}</span>
          </span>
          {s.busy && !reduced && (
            <span className="ml-auto shrink-0 text-amber">
              {SPIN[f]} <span className="text-faint">Продолжаю…</span>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
