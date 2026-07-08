import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { rise, stagger, viewportOnce } from '../lib/anim'
import { accentBorderHover, accentDot, accentText } from '../lib/accents'
import { PROVIDERS } from '../lib/console-data'
import SectionKicker from './SectionKicker'

export default function Providers() {
  const { t } = useTranslation()

  const kindLabel: Record<string, string> = {
    free: t('providers.free'),
    web: t('providers.web'),
    local: t('providers.local'),
  }

  return (
    <section id="providers" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-[1240px]">
        <SectionKicker kicker={t('providers.kicker')} title={t('providers.title')} lead={t('providers.lead')} />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
        >
          {PROVIDERS.map((p) => (
            <motion.div
              key={p.id}
              variants={rise}
              className={`pane group relative flex min-w-0 flex-col gap-2 rounded-lg p-4 transition-colors ${accentBorderHover[p.accent]} ${
                p.kind === 'free' ? 'pane-glow' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 shrink-0 rounded-full ${accentDot[p.accent]}`} aria-hidden />
                <span className="min-w-0 truncate font-display text-lg font-bold text-fg">{p.name}</span>
              </div>
              <span className="font-mono text-[11px] text-dim">{p.label}</span>
              <span
                className={`mt-1 inline-flex w-fit rounded border border-line px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${accentText[p.accent]}`}
              >
                {kindLabel[p.kind]}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[12px] text-faint"
        >
          <span className="rounded bg-panel-hi px-2 py-1 text-cyan">/switch</span>
          <span className="rounded bg-panel-hi px-2 py-1 text-cyan">/auth</span>
          <span>{t('providers.note')}</span>
        </motion.p>
      </div>
    </section>
  )
}
