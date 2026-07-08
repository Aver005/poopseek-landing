import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { rise, stagger, viewportOnce } from '../lib/anim'
import SectionKicker from './SectionKicker'

// verbatim per-card detail (not translated — these are product facts)
const DETAILS: Record<string, { chips: string[]; cmd?: string; accent: string }> = {
  MCP: { chips: ['Claude Desktop', 'VS Code', 'Cursor', 'Trae', 'TTL 5 min'], accent: 'text-cyan' },
  ACP: { chips: ['Zed', 'JetBrains', 'Neovim', 'Claude Code', 'Gemini CLI'], cmd: 'poopseek --acp', accent: 'text-green' },
  Figma: { chips: ['designer', 'builder', 'handyman', ':7331'], cmd: 'poopseek --figma', accent: 'text-blue' },
}

export default function Protocols() {
  const { t } = useTranslation()
  const cards = t('proto.cards', { returnObjects: true }) as { name: string; tag: string; body: string }[]

  return (
    <section id="proto" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-[1240px]">
        <SectionKicker kicker={t('proto.kicker')} title={t('proto.title')} lead={t('proto.lead')} align="right" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-10 grid gap-4 md:grid-cols-3"
        >
          {cards.map((c) => {
            const d = DETAILS[c.name]!
            return (
              <motion.div key={c.name} variants={rise} className="pane flex flex-col rounded-xl p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className={`font-display text-3xl font-black ${d.accent}`}>{c.name}</h3>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-faint">{c.tag}</span>
                </div>
                <p className="mt-4 grow text-[13.5px] leading-relaxed text-dim">{c.body}</p>

                {d.cmd && (
                  <code className="mt-4 block rounded-md border border-line bg-panel-deep px-3 py-2 font-mono text-[11.5px] text-soft">
                    <span className="text-green">$</span> {d.cmd}
                  </code>
                )}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {d.chips.map((chip) => (
                    <span key={chip} className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint">
                      {chip}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
