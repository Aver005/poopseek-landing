import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function CopyLine({ code, label }: { code: string; label?: string }) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const copy = () => {
    void navigator.clipboard?.writeText(code).then(() => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    })
  }

  return (
    <div className="pane flex min-w-0 items-center gap-3 rounded-lg px-3.5 py-2.5">
      {label && <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-wider text-faint sm:inline">{label}</span>}
      <code className="min-w-0 grow truncate font-mono text-[12.5px] text-soft">
        <span className="text-green">$</span> {code}
      </code>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 rounded-md border border-line px-2.5 py-1 font-mono text-[11px] text-cyan transition-colors hover:border-cyan/50 hover:bg-cyan/10"
      >
        {copied ? t('hero.copied') : t('hero.copy')}
      </button>
    </div>
  )
}
