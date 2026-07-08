# PoopSeek — landing 💩

The landing page for [**PoopSeek**](https://github.com/Aver005/poopseek), an
interactive TUI AI-agent in TypeScript + Bun. The conceit: the page **is** the
product. It's a lush, playable rendering of the PoopSeek terminal — a real
agent-loop console you can type into, a live `◆` status bar, and every string
lifted verbatim from the actual CLI.

> «Длинный ответ — признак неясного мышления, а не глубины.»

## What's on the page

- **A playable console** (the hero) — auto-plays a real agent turn on load, then
  runs whatever you type or pick: tool calls stream (`🔨 file.edit` → a deadpan
  progress line → `✓`), todo lists fill in place, and the bottom status bar
  updates live (`◆ DeepSeek (web, бесплатно) · 6 msg · think · cwd:poopseek`).
- **8 providers**, **31+ tools**, the **256**-step agent loop, hybrid **RAG**
  (`codebase.search`, ~120 МБ model, 384-dim, RRF k=60), and the **MCP / ACP /
  Figma** wiring — each section its own visual device, every number real.

## Quick start

```bash
bun install
bun run dev       # → http://localhost:5173/poopseek/
```

Other scripts:

```bash
bun run lint      # oxlint
bun run build     # tsc -b && vite build → dist/
bun run preview   # serve the production build
```

> Bun only. `bun.lock` is the lockfile; npm/pnpm/yarn will break it.

## Deploy

Push to **`main`**. `.github/workflows/demo.yml` calls the host's reusable
`site-release` workflow, which builds and publishes `dist/` to a rolling release;
`aaaver.ru` serves it at **/poopseek/**. Requires the `poopseek` slug registered
in the host's `sites.config.json`. Manual fallback: `deploy-site.bat poopseek
<path>\dist`.

## Design system

| Token | Role |
|---|---|
| **Bricolage Grotesque** | oversized editorial display / numerals |
| **Hanken Grotesk** | translatable body prose |
| **JetBrains Mono** | all console / TUI content |
| pink `#f472b6` | the PoopSeek mark, model label, primary accent |
| amber `#fcd34d` | the 💩 signature, warnings |
| cyan `#38bdf8` | commands / interactive |
| green `#4ade80` | ✓ success |
| void `#0d080c` | warm espresso-black base |

Colours and fonts are the product's real ANSI theme
(`poopseek/src/cli/colors.ts`), on warm plum-black with aurora light-leaks and
film grain — deliberately a different universe from any sibling landing.
Direction: **operator console, вульгарный люкс** — serious engineering in a
gremlin costume.

Bilingual (en default + ru) via i18next; the Russian is the product's native
voice. Real product strings are verbatim; only prose is translated. Everything
respects `prefers-reduced-motion` and never scrolls horizontally.

See [`CLAUDE.md`](./CLAUDE.md) for the invariants and file map before editing.

---

Not affiliated with DeepSeek. The name is a joke. The agent is not.
