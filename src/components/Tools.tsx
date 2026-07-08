import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { rise, stagger, viewportOnce } from '../lib/anim'
import { accentText } from '../lib/accents'
import { TOOL_GROUPS } from '../lib/console-data'
import SectionKicker from './SectionKicker'

export default function Tools() {
  const { t } = useTranslation()

  return (
    <section id="tools" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-[1240px]">
        <SectionKicker kicker={t('tools.kicker')} title={t('tools.title')} lead={t('tools.lead')} />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TOOL_GROUPS.map((g) => (
            <motion.div key={g.label} variants={rise} className="pane rounded-lg p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className={`font-mono text-[11px] uppercase tracking-wider ${accentText[g.accent]}`}>
                  {g.label}
                </span>
                <span className="h-px grow bg-line" />
                <span className="font-mono text-[10px] text-faint">{g.names.length}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {g.names.map((n) => (
                  <code
                    key={n}
                    className="rounded border border-line bg-panel-deep px-2 py-1 font-mono text-[11.5px] text-soft transition-colors hover:border-line-hi hover:text-fg"
                  >
                    {n}
                  </code>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-5 font-mono text-[12px] text-faint"
        >
          {t('tools.hover')}
        </motion.p>
      </div>
    </section>
  )
}
