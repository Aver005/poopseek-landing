import { motion } from 'motion/react'
import { rise, stagger, viewportOnce } from '../lib/anim'

// Editorial section header: a mono kicker, an oversized display title that can
// break the grid, and a body lead. Reused across every section for rhythm.
export default function SectionKicker({
  kicker,
  title,
  lead,
  align = 'left',
}: {
  kicker: string
  title: string
  lead?: string
  align?: 'left' | 'right'
}) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={`max-w-2xl ${align === 'right' ? 'ml-auto text-right' : ''}`}
    >
      <motion.p variants={rise} className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-pink">
        {kicker}
      </motion.p>
      <motion.h2
        variants={rise}
        className="font-display text-[clamp(1.9rem,4.4vw,3.1rem)] font-extrabold leading-[1.02] tracking-tight text-fg"
      >
        {title}
      </motion.h2>
      {lead && (
        <motion.p variants={rise} className="mt-4 text-[15px] leading-relaxed text-soft">
          {lead}
        </motion.p>
      )}
    </motion.div>
  )
}
