import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { rise, stagger, viewportOnce } from '../lib/anim'
import SectionKicker from './SectionKicker'

export default function Loop() {
  const { t } = useTranslation()
  const steps = t('loop.steps', { returnObjects: true }) as { k: string; label: string; body: string }[]

  return (
    <section id="loop" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-[1240px]">
        <SectionKicker kicker={t('loop.kicker')} title={t('loop.title')} lead={t('loop.lead')} />

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* the 256 numeral */}
          <motion.div
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="pane pane-glow flex flex-col items-center justify-center rounded-2xl p-8 lg:col-span-4"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-dim">{t('loop.capA')}</span>
            <span className="bloom-amber font-display text-[clamp(4.5rem,12vw,8rem)] font-black leading-none text-amber">
              256
            </span>
            <span className="mt-1 font-mono text-[13px] text-soft">{t('loop.capB')}</span>
            <span className="mt-4 max-w-[22ch] text-center font-mono text-[11px] leading-relaxed text-faint">
              {t('loop.capNote')}
            </span>
          </motion.div>

          {/* plan → act → observe → ↺ */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-4 sm:grid-cols-3 lg:col-span-8"
          >
            {steps.map((s, i) => (
              <motion.div key={s.k} variants={rise} className="pane relative flex flex-col rounded-xl p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-cyan">{s.k}()</span>
                  <span className="font-display text-2xl font-black text-line-hi">{i + 1}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-fg">{s.label}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-dim">{s.body}</p>
                <span
                  className="pointer-events-none absolute -right-3 top-1/2 hidden -translate-y-1/2 font-mono text-lg text-pink sm:block"
                  aria-hidden
                >
                  {i < steps.length - 1 ? '→' : '↺'}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
