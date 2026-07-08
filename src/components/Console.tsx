import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import {
  AUTO_SCENARIO,
  COMMANDS,
  improvScenario,
  SCENARIOS,
  type Line,
  type Scenario,
} from '../lib/console-data'
import { bumpMsg, patchStatus } from '../lib/status-store'

const MAX_LINES = 46
const SPIN = ['|', '/', '-', '\\']

function delayFor(kind: Line['kind']): number {
  switch (kind) {
    case 'user':
      return 360
    case 'tool':
      return 300
    case 'progress':
      return 640
    case 'done':
      return 360
    case 'say':
      return 560
    case 'todo':
      return 480
    case 'note':
      return 300
    case 'commands':
      return 220
  }
}

// consecutive todo blocks replace in place → the list "fills" live
function append(prev: Line[], next: Line): Line[] {
  let out: Line[]
  if (next.kind === 'todo' && prev.length > 0 && prev[prev.length - 1]!.kind === 'todo') {
    out = [...prev.slice(0, -1), next]
  } else {
    out = [...prev, next]
  }
  return out.length > MAX_LINES ? out.slice(out.length - MAX_LINES) : out
}

function pickScenario(raw: string, seed: number): Scenario {
  const s = raw.trim().toLowerCase()
  if (!s) return AUTO_SCENARIO
  const by = (id: string) => SCENARIOS.find((x) => x.id === id)!
  if (s.startsWith('/help')) return by('help')
  if (s.startsWith('/switch')) return by('switch')
  if (s.startsWith('/think')) return by('think')
  if (s.startsWith('/rag')) return by('rag')
  if (s.includes('рефактор') || s.includes('loop.ts')) return AUTO_SCENARIO
  if (s.includes('test.txt') || s.includes('созда')) return by('create')
  if (s.includes('порядок') || s.includes('импорт')) return by('tidy')
  if (s.includes('retry') || s.includes('rate') || s.includes('где')) return by('rag')
  return improvScenario(raw.trim(), seed)
}

const CHIPS = ['create', 'tidy', 'rag', 'help', 'think', 'switch'] as const

export default function Console() {
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const [printed, setPrinted] = useState<Line[]>(reduced ? flush(AUTO_SCENARIO) : [])
  const [queue, setQueue] = useState<Line[]>([])
  const [value, setValue] = useState('')
  const patchRef = useRef<Scenario['patch']>(reduced ? AUTO_SCENARIO.patch : undefined)
  const hasUserRef = useRef(false)
  const seedRef = useRef(1)
  const scrollRef = useRef<HTMLDivElement>(null)
  const startedRef = useRef(false)

  const busy = queue.length > 0

  const finalize = useCallback(() => {
    if (patchRef.current) patchStatus(patchRef.current)
    if (hasUserRef.current) bumpMsg(2)
    patchStatus({ busy: false })
  }, [])

  const play = useCallback(
    (sc: Scenario) => {
      patchRef.current = sc.patch
      hasUserRef.current = sc.lines.some((l) => l.kind === 'user')
      if (reduced) {
        setPrinted((prev) => [...prev, ...sc.lines].slice(-MAX_LINES))
        if (sc.patch) patchStatus(sc.patch)
        if (hasUserRef.current) bumpMsg(2)
        return
      }
      patchStatus({ busy: true })
      setQueue(sc.lines)
    },
    [reduced],
  )

  // kick off the auto scenario once
  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true
    if (reduced) {
      if (AUTO_SCENARIO.patch) patchStatus(AUTO_SCENARIO.patch)
      return
    }
    const id = window.setTimeout(() => play(AUTO_SCENARIO), 550)
    return () => clearTimeout(id)
  }, [reduced, play])

  // drain the queue, one line at a time
  useEffect(() => {
    if (reduced || queue.length === 0) return
    const next = queue[0]!
    const id = window.setTimeout(() => {
      setPrinted((prev) => append(prev, next))
      setQueue((prev) => {
        const rest = prev.slice(1)
        if (rest.length === 0) finalize()
        return rest
      })
    }, delayFor(next.kind))
    return () => clearTimeout(id)
  }, [queue, reduced, finalize])

  // keep the transcript pinned to the newest line
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [printed, busy])

  const submit = useCallback(
    (raw: string) => {
      if (busy) return
      const text = raw.trim()
      if (!text) return
      seedRef.current += 1
      play(pickScenario(text, seedRef.current))
      setValue('')
    },
    [busy, play],
  )

  const spinLabel = queue[0]?.kind === 'say' ? 'Генерация ответа...' : 'Продолжаю...'

  return (
    <div className="pane pane-glow flex min-w-0 flex-col rounded-xl">
      {/* titlebar */}
      <div className="flex items-center gap-2 border-b border-line px-3.5 py-2.5">
        <div className="pane-dots flex items-center gap-1.5" aria-hidden>
          <span style={{ background: '#f87171' }} />
          <span style={{ background: '#fcd34d' }} />
          <span style={{ background: '#4ade80' }} />
        </div>
        <span className="ml-1 font-mono text-[11px] text-dim">
          <span className="text-green">PoopSeek CLI</span> <span aria-hidden>💩</span>{' '}
          <span className="text-faint">| v1.2.0 — poopseek@bash</span>
        </span>
        <span className="ml-auto hidden font-mono text-[10px] text-faint sm:inline">{t('nav.session')}</span>
      </div>

      {/* transcript */}
      <div
        ref={scrollRef}
        className="min-w-0 grow overflow-y-auto overflow-x-hidden px-3.5 py-3 font-mono text-[12.5px] leading-relaxed sm:text-[13px]"
        style={{ height: 'clamp(320px, 42vh, 430px)' }}
      >
        <div className="space-y-1.5">
          {printed.map((line, i) => (
            <LineView key={i} line={line} />
          ))}
          {busy && !reduced && <Spinner label={spinLabel} />}
        </div>
      </div>

      {/* chips */}
      <div className="flex flex-wrap items-center gap-1.5 border-t border-line px-3.5 pt-3">
        <span className="mr-0.5 font-mono text-[10px] uppercase tracking-wider text-faint">
          {t('hero.runners')}
        </span>
        {CHIPS.map((id) => {
          const sc = SCENARIOS.find((x) => x.id === id)!
          return (
            <button
              key={id}
              type="button"
              disabled={busy}
              onClick={() => play(sc)}
              className="rounded-md border border-line bg-panel-deep px-2 py-1 font-mono text-[11px] text-soft transition-colors hover:border-pink/50 hover:text-pink disabled:opacity-40"
            >
              {sc.input.length > 22 ? `${sc.input.slice(0, 22)}…` : sc.input}
            </button>
          )
        })}
      </div>

      {/* input */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit(value)
        }}
        className="flex items-center gap-2 px-3.5 py-3"
      >
        <span className="font-mono text-[15px] text-pink">›</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={t('hero.placeholder')}
          aria-label="prompt"
          spellCheck={false}
          className="min-w-0 grow bg-transparent font-mono text-[13px] text-fg outline-none placeholder:text-faint"
        />
        {!value && <span className="animate-blink font-mono text-pink" aria-hidden>▋</span>}
        <button
          type="submit"
          disabled={busy}
          className="rounded-md border border-pink/40 bg-pink/15 px-2.5 py-1 font-mono text-[11px] text-pink transition-colors hover:bg-pink/25 disabled:opacity-40"
        >
          ⏎ run
        </button>
      </form>
    </div>
  )
}

function flush(sc: Scenario): Line[] {
  return sc.lines.slice(-MAX_LINES)
}

function Spinner({ label }: { label: string }) {
  const [f, setF] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => setF((v) => (v + 1) % SPIN.length), 120)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="font-mono text-[12px] text-dim">
      <span className="text-cyan">[gen]</span> {SPIN[f]} {label}
    </div>
  )
}

function LineView({ line }: { line: Line }) {
  switch (line.kind) {
    case 'user':
      return (
        <div className="break-words pt-1.5">
          <span className="text-pink">›</span> <span className="text-fg">{line.text}</span>
        </div>
      )
    case 'tool':
      return (
        <div className="break-words">
          <span aria-hidden>🔨</span> <span className="text-cyan">{line.tool}</span>
          {line.detail && <span className="text-faint">  {line.detail}</span>}
        </div>
      )
    case 'progress':
      return <div className="break-words pl-4 text-amber/90 italic">{line.text}</div>
    case 'done':
      return (
        <div className="break-words pl-4">
          <span className="text-green">✓</span> <span className="text-soft">{line.text}</span>
        </div>
      )
    case 'say':
      return <div className="break-words py-0.5 text-soft">{line.text}</div>
    case 'note':
      return <div className="break-words text-dim">{line.text}</div>
    case 'todo':
      return (
        <div className="my-1 space-y-0.5 border-l-2 border-line-hi pl-3">
          {line.items.map((it, i) => {
            const icon = it.status === 'done' ? '[x]' : it.status === 'in_progress' ? '[~]' : '[ ]'
            const cls =
              it.status === 'done' ? 'text-green' : it.status === 'in_progress' ? 'text-amber' : 'text-faint'
            return (
              <div key={i} className="break-words">
                <span className={cls}>{icon}</span>{' '}
                <span className={it.status === 'todo' ? 'text-dim' : 'text-soft'}>{it.content}</span>
                {it.status === 'in_progress' && <span className="text-amber">  ← сейчас</span>}
              </div>
            )
          })}
        </div>
      )
    case 'commands':
      return (
        <div className="my-1 grid grid-cols-2 gap-x-4 gap-y-0.5 sm:grid-cols-3">
          {COMMANDS.filter((c) => !c.hidden).map((c) => (
            <span key={c.name} className="text-cyan">
              {c.name}
            </span>
          ))}
        </div>
      )
  }
}
