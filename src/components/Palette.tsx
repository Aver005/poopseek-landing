import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { rise, stagger, viewportOnce } from '../lib/anim'
import { COMMANDS } from '../lib/console-data'
import SectionKicker from './SectionKicker'

export default function Palette() {
  const { t } = useTranslation()
  const desc = t('palette.desc', { returnObjects: true }) as Record<string, string>

  return (
    <section id="palette" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-[1240px]">
        <SectionKicker kicker={t('palette.kicker')} title={t('palette.title')} lead={t('palette.lead')} />

        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="pane pane-glow mx-auto mt-10 max-w-3xl rounded-xl"
        >
          {/* fake command input */}
          <div className="flex items-center gap-2 border-b border-line px-4 py-3 font-mono text-[13px]">
            <span className="text-pink">/</span>
            <span className="text-dim">Доступные команды:</span>
            <span className="ml-auto animate-blink text-pink" aria-hidden>▋</span>
          </div>

          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="divide-y divide-line/60"
          >
            {COMMANDS.map((c) => (
              <motion.li
                key={c.name}
                variants={rise}
                className="group flex items-center gap-3 px-4 py-2.5 font-mono text-[12.5px] transition-colors hover:bg-panel-hi"
              >
                <span className={`shrink-0 ${c.hidden ? 'text-faint group-hover:text-amber' : 'text-cyan'}`}>
                  {c.name}
                </span>
                {c.hidden && (
                  <span className="shrink-0 rounded border border-line px-1 py-0.5 text-[9px] uppercase tracking-wide text-amber/80">
                    {t('palette.hiddenTag')}
                  </span>
                )}
                <span className="leader mx-1 hidden h-3 grow self-end sm:block" aria-hidden />
                <span className="min-w-0 grow truncate text-right text-dim sm:grow-0">{desc[c.name]}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.p
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-4 text-center font-mono text-[11px] text-faint"
        >
          {t('palette.hint')}
        </motion.p>
      </div>
    </section>
  )
}
