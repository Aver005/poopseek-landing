import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { GITHUB_URL, INSTALL_PS, INSTALL_SH, rise, stagger, viewportOnce } from '../lib/anim'
import CopyLine from './CopyLine'
import Logo from './Logo'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="relative overflow-hidden px-4 pb-28 pt-16 sm:px-6 sm:pb-32">
      <div className="mx-auto max-w-[1240px]">
        {/* ethos quote — verbatim from the system prompt */}
        <motion.blockquote
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="border-l-2 border-pink pl-5 sm:pl-8"
        >
          <motion.p
            variants={rise}
            className="max-w-3xl font-display text-[clamp(1.6rem,4vw,2.8rem)] font-bold leading-tight text-fg"
          >
            «{t('footer.ethos')}»
          </motion.p>
          <motion.cite variants={rise} className="mt-3 block font-mono text-[12px] not-italic text-dim">
            {t('footer.ethosNote')}
          </motion.cite>
        </motion.blockquote>

        {/* install */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14"
        >
          <motion.h2 variants={rise} className="font-display text-2xl font-extrabold text-fg sm:text-3xl">
            {t('footer.installTitle')}
          </motion.h2>
          <motion.div variants={rise} className="mt-5 grid max-w-3xl gap-3">
            <CopyLine code={INSTALL_SH} label={t('footer.macos')} />
            <CopyLine code={INSTALL_PS} label={t('footer.windows')} />
          </motion.div>
        </motion.div>

        {/* colophon */}
        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <Logo />
            <span className="font-mono text-[12px] text-pink">{t('footer.sign')}</span>
            <span className="mt-1 font-mono text-[11px] text-faint">{t('footer.made')}</span>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <div className="flex items-center gap-4 font-mono text-[12px]">
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="text-soft transition-colors hover:text-pink">
                GitHub ↗
              </a>
              <a href="#top" className="text-soft transition-colors hover:text-pink">
                {t('footer.backTop')} ↑
              </a>
            </div>
            <span className="max-w-xs font-mono text-[10px] leading-relaxed text-faint sm:text-right">
              {t('footer.rights')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
