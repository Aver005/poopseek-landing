# PoopSeek landing — agent guide

This is the landing page for **PoopSeek** (`github.com/Aver005/poopseek`) — an
interactive TUI AI-agent in TypeScript + Bun (8 LLM providers, 31+ tools, MCP,
ACP, RAG, Figma). Read this before touching anything so you improve the site
without dissolving its identity.

## The one principle: the page IS the product

PoopSeek's native surface is a **terminal / TUI operator console**. So the whole
page is that console rendered lush — the chrome is the app's chrome (window
dots, a live `◆` bottom status bar), the hero is a **real, playable agent-loop
console**, and every string that appears in the actual product is quoted
verbatim. This is not "a website about a CLI"; it is the CLI, wearing a landing
page. When you add a section, ask: *what part of the real PoopSeek TUI is this?*

Aesthetic direction = **"operator console, вульгарный люкс"**: warm espresso-black
void, hot-pink + amber-gold dominance (the 💩 warmth), aurora light-leaks and
film grain (never a flat grid), editorial grid-breaking display type. The tone
is the product's own: serious engineering in a gremlin costume, the DeepSeek pun.

## Stack & commands

Bun · Vite · React 19 · TypeScript strict · Tailwind v4 (CSS-first `@theme`, no
config file) · Motion (`motion/react`) · i18next (en+ru) · oxlint. **Bun only —
never npm/pnpm/yarn.**

```bash
bun install
bun run dev       # dev server at localhost:5173/poopseek/
bun run lint      # oxlint — must be clean
bun run build     # tsc -b && vite build — must be green
bun run preview   # serves dist at localhost:4173/poopseek/ (may bump port if busy)
```

## Invariants — do not break these

1. **`base: '/poopseek/'` in `vite.config.ts` must equal the deploy slug.** The
   site is served from `aaaver-app` at `aaaver.ru/poopseek/`; dev/preview live
   under that base, bare `/` 404s. If you rename the slug, change base, the
   host's `sites.config.json`, and the favicon href in `index.html` together.
2. **Palette = brand truth, from the real product.** Every colour is a `@theme`
   token in `src/index.css`, copied verbatim from PoopSeek's ANSI theme
   (`src/cli/colors.ts`, dark): pink `#f472b6` (the PoopSeek mark / model
   label), amber `#fcd34d` (💩 signature / warnings), cyan `#38bdf8` (commands),
   green `#4ade80` (✓ success), red `#f87171`, blue `#60a5fa` (figma), orange
   `#fb923c`. Surfaces are warm plum-black (`void/ink/panel/panel-deep/line`).
   Reuse tokens; never invent a hex. `src/lib/accents.ts` holds the static
   accent→class maps (Tailwind can't see `text-${x}`).
3. **Fonts are fixed, self-hosted via `@fontsource-variable` (offline):**
   - `--font-display` **Bricolage Grotesque Variable** — oversized editorial
     headlines / numerals only.
   - `--font-sans` **Hanken Grotesk Variable** — translatable body prose.
   - `--font-mono` **JetBrains Mono Variable** — all console/TUI content (most
     of the page). Emoji fall back to system colour-emoji fonts (appended to
     each stack) — do not remove that fallback or 🪚/🗿-type glyphs turn to tofu.
   - Never Inter / Roboto / system-ui / Space Grotesk.
4. **Perf numbers are REAL — quote, don't invent.** Sources: 8 providers, 31+
   tools, **256** steps/turn, 24 tools/step, 49+ skill dirs (README.md); RAG
   model **~120 МБ** `Xenova/multilingual-e5-small` **384**-dim, RRF **k=60**,
   full-scan-no-ANN ~ms under ~50k chunks (README + CHANGELOG + poopseek
   `CLAUDE.md`); MCP TTL **5 min**; context refresh ~64k tokens; Figma port
   **7331**. If unsure, re-read the poopseek repo — do not round or embellish.
5. **Verbatim product strings vs translatable prose.** Real product strings
   (tool ids, the funny tool-progress lines, status-bar segments, slash
   commands, install commands, the ethos quote, provider labels) stay
   **hard-coded** — they live in `src/lib/console-data.ts` and inline in
   components, copied word-for-word from the poopseek source. Only marketing
   prose lives in `src/i18n/locales/{en,ru}.ts`; `ru` is typed `typeof en`, so a
   new `en` key fails the build until translated. English is the default (detect
   order is `['localStorage']` only — never navigator).
6. **Every JS-timer animation respects reduced motion.** `MotionConfig
   reducedMotion="user"` in `main.tsx` covers `motion.*`. Every `setTimeout`/
   `setInterval` (the console engine, the two spinners, the status-bar spinner)
   guards with `useReducedMotion()`: seed the meaningful final frame and start
   no timer when reduced. CSS backdrop/keyframe animations are killed in the
   `prefers-reduced-motion` block at the tail of `index.css`.
7. **No horizontal overflow, ever** (the #1 regression). Mono content in flex/
   grid tracks needs `min-w-0` (+ `truncate` or `overflow-x-auto` on the
   container). The status bar and console transcript scroll *inside themselves*,
   never the page. Verify `scrollWidth > clientWidth === false` at 390px.

## src/ map

- `main.tsx` — entry; `MotionConfig reducedMotion="user"`, imports css + i18n.
- `App.tsx` — single-page composition & section order.
- `index.css` — all theming: `@theme` tokens, fonts, keyframes, `.pane`/`.grain`
  /`.bloom-*` utilities, reduced-motion tail.
- `i18n/` — `index.ts` (init, `poopseek-lang` key), `i18next.d.ts` (typed keys),
  `locales/{en,ru}.ts` (prose only).
- `lib/anim.ts` — shared `rise`/`stagger`/`viewportOnce` variants + `GITHUB_URL`
  + `INSTALL_SH`/`INSTALL_PS`.
- `lib/status-store.ts` — tiny observable (useSyncExternalStore) so the console
  drives the live status bar (msg count, think, rag chunks, provider).
- `lib/console-data.ts` — **all verbatim product data**: providers, tool groups,
  slash commands, and the console **scenarios** (each shaped like a real agent
  turn). Progress lines are copied from `poopseek/src/cli/tool-progress-messages.ts`.
- `lib/accents.ts` — accent→Tailwind-class maps.
- `components/`
  - `Backdrop.tsx` — aurora light-leaks + grain (atmosphere, not a grid).
  - `Menubar.tsx` — fixed top app chrome (window dots, logo, lang toggle, GitHub).
  - `Hero.tsx` — 3-line display headline + install CTA + **the WOW console**.
  - **`Console.tsx` — the WOW centre.** A playable agent-loop engine: auto-plays
    `AUTO_SCENARIO` on load; visitors type or click a chip → `pickScenario()`
    routes to a real scenario (or `improvScenario`) → lines stream one at a time
    (`🔨 tool → progress → ✓`, todo blocks fill in place, `[gen]` spinner) and
    the status store updates. **To edit the demo, edit scenarios in
    `console-data.ts`**, not the engine. Reduced motion flushes the final frame.
  - `CopyLine.tsx` — `$ …` command with copy button (hero + footer).
  - `SectionKicker.tsx` — editorial kicker + oversized title + lead (shared).
  - `Providers.tsx` (01) — 8-provider wall, DeepSeek highlighted free.
  - `Loop.tsx` (02) — the big `256` numeral + plan→act→observe→↺.
  - `Tools.tsx` (03) — the tool registry as grouped mono chips.
  - `Rag.tsx` (04) — `codebase.search` result panel with ranked hits + stats.
  - `Protocols.tsx` (05) — MCP / ACP / Figma cards (right-aligned header).
  - `Palette.tsx` (06) — the slash-command list as a `/help` palette.
  - `Footer.tsx` — ethos quote, install lines, colophon.
  - `StatusBar.tsx` — fixed bottom `◆ …` line, live-driven by the console.
  - `Logo.tsx` — the wordmark (there is no image logo; wordmark + 💩 IS the logo).

## Verifying changes

No tests. Gate = `bun run lint` (clean) + `bun run build` (green). Then
`bun run preview` and drive it with a browser MCP (Playwright / chrome-devtools)
at **desktop 1440×900** and **mobile 390×844**: probe
`document.documentElement.scrollWidth > clientWidth === false` at several scroll
points, and screenshot each section (reveal-on-scroll only fires after a real
scroll — scroll to the section first). Confirm the console still auto-plays and
a chip click updates the bottom status bar. No browser tool → say so and do a
careful static pass.

## Deploying

CI: `.github/workflows/demo.yml` triggers on push to **`main`** and calls the
host's reusable `Aver005/aaaver-app/.github/workflows/site-release.yml@master`,
which runs `bun install --frozen-lockfile && bun run build`, tars `dist/` and
publishes the rolling `latest` release; the server's `sites-updater` pulls it.
One-time host prereq: `poopseek` registered in `aaaver-app/sites.config.json`
(`"poopseek": { "repo": "github:Aver005/poopseek-landing" }`). Manual fallback:
`deploy-site.bat poopseek <path>\dist`. **Don't deploy unless asked** — a push
to `main` publishes automatically. Don't auto-commit.
