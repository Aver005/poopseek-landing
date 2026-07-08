// Source-of-truth copy (English). Only TRANSLATABLE PROSE lives here.
// Real product strings — tool names, progress lines, the status bar, slash
// commands, install commands, the ethos quote — stay VERBATIM in components.
const en = {
  nav: {
    menu: 'menu',
    help: 'help',
    tools: 'tools',
    source: 'source',
    session: 'a live console. not a screenshot.',
  },

  hero: {
    eyebrow: 'CLI agent · 8 providers · MCP · ACP · RAG · Figma',
    titleA: 'It seeks.',
    titleB: 'It ships',
    titleC: 'premium-grade slop.',
    lead: 'PoopSeek is an interactive TUI agent in TypeScript + Bun. One prompt at the <k>›</k> and it reads your files, runs your shell, walks MCP servers, delegates to other agents and generates real Figma UI — planning every step on its own, up to 256 of them.',
    disclaimer: 'A seriously engineered agent wearing a gremlin costume. The pun is on DeepSeek.',
    install: 'install',
    copy: 'copy',
    copied: 'copied ✓',
    star: 'star on github',
    tryHint: 'your turn — type a request, or run a slash-command',
    replay: 'replay',
    placeholder: 'ask for anything…',
    runners: 'try one:',
  },

  providers: {
    kicker: '01 / backends',
    title: 'Eight brains behind one prompt',
    lead: 'Switch model mid-conversation with /switch. Start free on DeepSeek web, escalate to a frontier model only when the task earns it.',
    free: 'free',
    local: 'local',
    web: 'web',
    note: 'Auth per provider with /auth. The default is DeepSeek web — a hand-written client with proof-of-work, no key required.',
  },

  loop: {
    kicker: '02 / agent loop',
    title: 'Plans, acts, observes — repeat',
    lead: 'Every turn is an autonomous multi-step loop with streaming, AbortSignal and rate-limit retry. It keeps going until the job is done, not until a fixed step count runs out.',
    steps: [
      { k: 'plan', label: 'Plan', body: 'Reads the request, picks tools, drafts a todo list you can watch fill in real time.' },
      { k: 'act', label: 'Act', body: 'Fires up to 24 tool calls per step — read, write, shell, git, search, sub-agents.' },
      { k: 'observe', label: 'Observe', body: 'Feeds results back into context, refreshes ~every 64k tokens, corrects course.' },
    ],
    capA: 'up to',
    capB: 'steps per turn',
    capNote: 'raised from 10 → 256. context caps at 256 messages, then nudges /compact.',
  },

  tools: {
    kicker: '03 / toolbelt',
    title: '31+ tools, one static registry',
    lead: 'No plugin ceremony — one file per tool, wired into a single registry. The agent reaches for these the way you reach for muscle memory.',
    hover: 'every name below is a real tool id.',
  },

  rag: {
    kicker: '04 / codebase RAG',
    title: 'Stops crawling files through five greps',
    lead: 'Hybrid semantic search — dense embeddings fused with BM25 via Reciprocal Rank Fusion. The agent sees the relevant chunks at once instead of spelunking.',
    points: [
      'Runs offline and free — a ~120 MB multilingual model, downloaded once, shared across every project.',
      'Local SQLite store with FTS5. No ANN index: a full cosine scan over 384-dim vectors lands in milliseconds under ~50k chunks.',
      'Flip it any time with /rag on · /rag off. Index lives in ~/.poopseek/rag/.',
    ],
    statModel: 'model, once',
    statDim: 'dimensions',
    statFusion: 'RRF fusion',
    query: 'query',
    result: 'result',
  },

  proto: {
    kicker: '05 / wired in',
    title: 'It speaks the protocols your tools already speak',
    lead: 'PoopSeek is not an island. It plugs into your editors, your MCP servers, and your design canvas.',
    cards: [
      {
        name: 'MCP',
        tag: 'client',
        body: 'stdio + Streamable HTTP. Auto-discovers servers from Claude Desktop, VS Code, Cursor and Trae. A 5-minute status cache skips the broken ones.',
      },
      {
        name: 'ACP',
        tag: 'both roles',
        body: 'Runs as an ACP server for Zed / JetBrains / Neovim — and as a client that drives other agents like Claude Code and Gemini CLI.',
      },
      {
        name: 'Figma',
        tag: 'designer → builder → handyman',
        body: 'A local HTTP/SSE server turns a text brief into real Figma UI through a three-stage pipeline. Listens on port 7331.',
      },
    ],
  },

  palette: {
    kicker: '06 / command palette',
    title: 'Everything is one slash away',
    lead: 'Natural language for the work, slash-commands for the machinery. Two of them are hidden.',
    hint: 'hover a row',
    hiddenTag: 'hidden',
    desc: {
      '/help': 'list every command',
      '/clear': 'wipe history — fresh dialogue',
      '/compact': 'shrink history via an LLM summary',
      '/model': 'change model inside the provider',
      '/switch': 'quick provider switch',
      '/auth': 'manage provider tokens',
      '/mcp': 'MCP servers: list / tools / connect / reload',
      '/acp': 'ACP agents: add / connect / send / use',
      '/rag': 'semantic code search: status / init / on / off',
      '/skills': 'manage agent skills',
      '/role': 'switch the active role',
      '/think': 'toggle thinking mode',
      '/web': 'toggle web search',
      '/refactor': 'run the refactor pipeline',
      '/review': 'run the review pipeline',
      '/btw': 'background sidechat — no interruption',
      '/maestro': 'activate every skill at once',
      '/noob': 'reset skills back to zero',
    },
  },

  footer: {
    installTitle: 'One line. Then just poopseek.',
    macos: 'macOS / Linux',
    windows: 'Windows',
    ethos: 'A long answer is a sign of unclear thinking, not depth.',
    ethosNote: '— from the system prompt',
    sign: 'your personal CLI agent',
    made: 'Built on Bun · TypeScript strict · terminal-kit',
    backTop: 'back to top',
    rights: 'not affiliated with DeepSeek. the name is a joke. the agent is not.',
  },
}

export default en
