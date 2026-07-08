import { motion } from 'motion/react'
import { Trans, useTranslation } from 'react-i18next'
import { GITHUB_URL, INSTALL_SH } from '../lib/anim'
import Console from './Console'
import CopyLine from './CopyLine'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section id="top" className="relative overflow-hidden px-4 pt-24 sm:px-6 sm:pt-28 lg:pt-32">
      {/* oversized caret watermark — grid-breaking atmosphere */}
      <div
        className="pointer-events-none absolute -right-10 -top-6 select-none font-display text-[36vw] leading-none text-pink/[0.04] sm:text-[26vw] lg:text-[20vw]"
        aria-hidden
      >
        ›
      </div>

      <div className="mx-auto grid max-w-[1240px] items-end gap-y-10 lg:grid-cols-12 lg:gap-x-10">
        {/* headline column */}
        <div className="lg:col-span-6 lg:pb-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-dim"
          >
            <span className="text-pink">◆</span> {t('hero.eyebrow')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-[clamp(2.1rem,7.6vw,4.9rem)] font-extrabold leading-[0.96] tracking-tight [overflow-wrap:break-word]"
          >
            <span className="block text-fg">{t('hero.titleA')}</span>
            <span className="block text-fg">{t('hero.titleB')}</span>
            <span className="bloom-pink block text-pink">{t('hero.titleC')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-soft"
          >
            <Trans
              i18nKey="hero.lead"
              components={{
                k: <code className="rounded bg-pink/15 px-1.5 py-0.5 font-mono text-[13px] text-pink" />,
              }}
            />
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-3 max-w-xl font-mono text-[12px] text-faint"
          >
            {t('hero.disclaimer')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-7 flex max-w-xl flex-col gap-3"
          >
            <CopyLine code={INSTALL_SH} label={t('hero.install')} />
            <div className="flex items-center gap-3">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-line bg-panel-hi px-4 py-2 font-mono text-[12px] text-soft transition-colors hover:border-line-hi hover:text-fg"
              >
                ★ {t('hero.star')}
              </a>
              <span className="font-mono text-[11px] text-faint">{t('hero.tryHint')} →</span>
            </div>
          </motion.div>
        </div>

        {/* console column */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0 lg:col-span-6"
        >
          <Console />
        </motion.div>
      </div>
    </section>
  )
}
