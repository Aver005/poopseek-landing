import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { rise, stagger, viewportOnce } from '../lib/anim'
import SectionKicker from './SectionKicker'

const HITS = [
  { path: 'src/agent/streaming-loop.ts:142', score: 0.91, bar: 10 },
  { path: 'src/providers/openai-compat.ts:88', score: 0.84, bar: 9 },
  { path: 'src/agent/loop.ts:64', score: 0.71, bar: 7 },
  { path: 'src/mcp/transport.ts:53', score: 0.63, bar: 6 },
]

export default function Rag() {
  const { t } = useTranslation()
  const points = t('rag.points', { returnObjects: true }) as string[]

  return (
    <section id="rag" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <SectionKicker kicker={t('rag.kicker')} title={t('rag.title')} lead={t('rag.lead')} />

          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-7 space-y-3"
          >
            {points.map((p, i) => (
              <motion.li key={i} variants={rise} className="flex gap-3 text-[14px] leading-relaxed text-soft">
                <span className="mt-1 shrink-0 font-mono text-xs text-green">✓</span>
                <span>{p}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-8 grid grid-cols-3 gap-3"
          >
            {[
              { v: '~120', u: 'МБ', c: t('rag.statModel'), tint: 'text-pink' },
              { v: '384', u: 'dim', c: t('rag.statDim'), tint: 'text-cyan' },
              { v: 'k=60', u: '', c: t('rag.statFusion'), tint: 'text-amber' },
            ].map((s) => (
              <motion.div key={s.c} variants={rise} className="pane rounded-lg p-3 text-center">
                <div className={`font-display text-2xl font-black ${s.tint}`}>
                  {s.v}
                  {s.u && <span className="ml-0.5 text-sm text-dim">{s.u}</span>}
                </div>
                <div className="mt-1 font-mono text-[10px] leading-tight text-faint">{s.c}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* search-result console */}
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="pane pane-glow min-w-0 rounded-xl lg:col-span-6"
        >
          <div className="flex items-center gap-2 border-b border-line px-4 py-2.5 font-mono text-[11px]">
            <span className="text-cyan">codebase.search</span>
            <span className="text-faint">·</span>
            <span className="text-dim">embeddings + BM25 → RRF</span>
          </div>
          <div className="px-4 py-4 font-mono text-[12px]">
            <div className="mb-3 break-words">
              <span className="text-pink">›</span> <span className="text-soft">codebase.search</span>{' '}
              <span className="text-amber">"rate-limit retry"</span>
            </div>
            <div className="space-y-2">
              {HITS.map((h, i) => (
                <div key={h.path} className="flex min-w-0 items-center gap-2">
                  <span className="w-4 shrink-0 text-right text-faint">{i + 1}</span>
                  <span className="min-w-0 grow truncate text-soft">{h.path}</span>
                  <span className="hidden shrink-0 text-green sm:inline" aria-hidden>
                    {'█'.repeat(h.bar)}
                    {'░'.repeat(10 - h.bar)}
                  </span>
                  <span className="w-10 shrink-0 text-right text-cyan tabular-nums">{h.score.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-line pt-3 text-[11px] text-faint">
              {t('rag.result')}: 4/8 · ~2 ms · full-scan, no ANN
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
