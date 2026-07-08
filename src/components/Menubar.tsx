import { useTranslation } from 'react-i18next'
import { LANGS } from '../i18n'
import { GITHUB_URL } from '../lib/anim'
import Logo from './Logo'

const NAV = [
  { href: '#providers', key: '01' },
  { href: '#loop', key: '02' },
  { href: '#rag', key: '04' },
  { href: '#proto', key: '05' },
]

export default function Menubar() {
  const { i18n } = useTranslation()
  const active = i18n.resolvedLanguage ?? 'en'

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="border-b border-line/80 bg-void/70 backdrop-blur-xl">
        <div className="mx-auto flex h-12 max-w-[1240px] items-center gap-3 px-4 sm:px-6">
          {/* window dots — this is app chrome, not a web navbar */}
          <div className="pane-dots hidden items-center gap-1.5 sm:flex" aria-hidden>
            <span style={{ background: '#f87171' }} />
            <span style={{ background: '#fcd34d' }} />
            <span style={{ background: '#4ade80' }} />
          </div>
          <a href="#top" className="flex items-center gap-2">
            <Logo />
          </a>
          <span className="hidden font-mono text-[11px] text-faint md:inline">v1.2.0</span>

          <nav className="ml-auto hidden items-center gap-1 font-mono text-[12px] text-dim lg:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="rounded px-2 py-1 tabular-nums transition-colors hover:bg-panel-hi hover:text-fg"
              >
                <span className="text-faint">{n.key}</span>
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1 lg:ml-3">
            {/* language toggle */}
            <div className="flex items-center rounded-md border border-line bg-panel-deep p-0.5 font-mono text-[11px]">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => void i18n.changeLanguage(l.code)}
                  className={`rounded px-2 py-1 transition-colors ${
                    active === l.code ? 'bg-pink/20 text-pink' : 'text-dim hover:text-fg'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-md border border-line bg-panel-deep px-2.5 py-1.5 font-mono text-[12px] text-soft transition-colors hover:border-line-hi hover:text-fg"
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
