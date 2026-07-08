import type { Status } from './status-store'

// ─────────────────────────────────────────────────────────────────────────
// VERBATIM product data. Everything here is copied from the real PoopSeek
// source and must stay word-for-word — it is the product, not marketing copy.
//   progress lines  → src/cli/tool-progress-messages.ts
//   tool ids        → src/tools/defs/*  (export const name)
//   slash commands  → README.md table + src/commands/defs/*
//   providers       → src/providers/defaults.ts
// The scenarios below are shaped like a real agent turn (turn-runner.ts).
// ─────────────────────────────────────────────────────────────────────────

export interface TodoItem {
  status: 'done' | 'in_progress' | 'todo'
  content: string
}

export type Line =
  | { kind: 'user'; text: string }
  | { kind: 'tool'; tool: string; detail?: string }
  | { kind: 'progress'; text: string }
  | { kind: 'done'; text: string }
  | { kind: 'say'; text: string }
  | { kind: 'todo'; items: TodoItem[] }
  | { kind: 'note'; text: string }
  | { kind: 'commands' }

export interface Scenario {
  id: string
  input: string
  lines: Line[]
  patch?: Partial<Status>
}

// ── the 8 real providers (src/providers/defaults.ts) ──────────────────────
export interface Provider {
  id: string
  name: string
  label: string
  kind: 'free' | 'web' | 'local'
  accent: 'pink' | 'cyan' | 'amber' | 'green' | 'blue' | 'orange'
}
export const PROVIDERS: Provider[] = [
  { id: 'deepseek-web', name: 'DeepSeek', label: 'web, бесплатно', kind: 'free', accent: 'pink' },
  { id: 'openai', name: 'OpenAI', label: 'gpt-*', kind: 'web', accent: 'green' },
  { id: 'openrouter', name: 'OpenRouter', label: 'any model', kind: 'web', accent: 'cyan' },
  { id: 'huggingface', name: 'HuggingFace', label: 'inference', kind: 'web', accent: 'amber' },
  { id: 'anthropic', name: 'Claude', label: 'claude-*', kind: 'web', accent: 'orange' },
  { id: 'gemini', name: 'Gemini', label: 'gemini-*', kind: 'web', accent: 'blue' },
  { id: 'ollama', name: 'Ollama', label: 'localhost', kind: 'local', accent: 'cyan' },
  { id: 'lmstudio', name: 'LM Studio', label: 'localhost', kind: 'local', accent: 'green' },
]

// ── the tool registry, grouped (src/tools/defs/*) ─────────────────────────
export interface ToolGroup {
  label: string
  accent: 'pink' | 'cyan' | 'amber' | 'green' | 'blue' | 'orange'
  names: string[]
}
export const TOOL_GROUPS: ToolGroup[] = [
  { label: 'files', accent: 'pink', names: ['file.read', 'file.write', 'file.edit', 'file.find', 'file.list', 'file.remove'] },
  { label: 'shell', accent: 'amber', names: ['bash', 'powershell'] },
  { label: 'vcs', accent: 'orange', names: ['git', 'git.edit'] },
  { label: 'search', accent: 'cyan', names: ['grep', 'codebase.index', 'codebase.search', 'thesvg.search'] },
  { label: 'agent', accent: 'green', names: ['agent.ask', 'agent.parallel'] },
  { label: 'plan', accent: 'blue', names: ['todo.write', 'todo.read'] },
  { label: 'memory', accent: 'pink', names: ['memory.save', 'memory.read', 'memory.list'] },
  { label: 'ask', accent: 'amber', names: ['user.ask', 'user.choice', 'user.confirm'] },
  { label: 'meta', accent: 'cyan', names: ['tools.list', 'skill.read', 'role.save'] },
  { label: 'protocol', accent: 'blue', names: ['mcp.describe', 'mcp.read', 'web.search', 'web.fetch'] },
]

// ── slash commands (README.md:100-127). desc lives in i18n palette.desc ───
export interface Command {
  name: string
  hidden?: boolean
}
export const COMMANDS: Command[] = [
  { name: '/help' },
  { name: '/clear' },
  { name: '/compact' },
  { name: '/model' },
  { name: '/switch' },
  { name: '/auth' },
  { name: '/mcp' },
  { name: '/acp' },
  { name: '/rag' },
  { name: '/skills' },
  { name: '/role' },
  { name: '/think' },
  { name: '/web' },
  { name: '/refactor' },
  { name: '/review' },
  { name: '/btw' },
  { name: '/maestro', hidden: true },
  { name: '/noob', hidden: true },
]

// ── scenarios the playable console can run ─────────────────────────────────
const t = (tool: string, detail: string): Line => ({ kind: 'tool', tool, detail })
const p = (text: string): Line => ({ kind: 'progress', text })
const ok = (text: string): Line => ({ kind: 'done', text })

export const AUTO_SCENARIO: Scenario = {
  id: 'refactor',
  input: 'отрефактори src/agent/loop.ts',
  lines: [
    { kind: 'user', text: 'отрефактори src/agent/loop.ts' },
    t('file.read', 'src/agent/loop.ts'),
    p('Проверяю, что ты там накодил ночью 🌙'),
    ok('84 строки прочитано'),
    t('file.edit', 'loop.ts'),
    p('Меняю кусок кода и молюсь линтеру 🙏'),
    ok('применено'),
    { kind: 'say', text: 'Готово. Вынес планирование в planStep(), срезал два лишних прохода по контексту. 84 → 71 строка.' },
  ],
  patch: { think: true },
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'create',
    input: 'создай файл test.txt с текстом "Hello World"',
    lines: [
      { kind: 'user', text: 'создай файл test.txt с текстом "Hello World"' },
      t('file.write', 'test.txt'),
      p('Генерирую говнокод премиум-класса 💩'),
      ok('Файл test.txt создан'),
      { kind: 'say', text: 'Готово. Внутри ровно «Hello World» — без BOM, LF в конце.' },
    ],
  },
  {
    id: 'tidy',
    input: 'наведи порядок в src/ и почини импорты',
    lines: [
      { kind: 'user', text: 'наведи порядок в src/ и почини импорты' },
      { kind: 'todo', items: [
        { status: 'in_progress', content: 'просканировать src/' },
        { status: 'todo', content: 'найти относительные импорты' },
        { status: 'todo', content: 'переписать на @/-алиасы' },
      ] },
      t('file.list', 'src'),
      p('Инвентаризирую хаос в директории 📦'),
      ok('37 файлов'),
      { kind: 'todo', items: [
        { status: 'done', content: 'просканировать src/' },
        { status: 'in_progress', content: 'найти относительные импорты' },
        { status: 'todo', content: 'переписать на @/-алиасы' },
      ] },
      t('grep', 'from "\\.\\.'),
      p('Кручу внутренние шестерёнки агента ⚙️'),
      ok('12 совпадений'),
      { kind: 'todo', items: [
        { status: 'done', content: 'просканировать src/' },
        { status: 'done', content: 'найти относительные импорты' },
        { status: 'in_progress', content: 'переписать на @/-алиасы' },
      ] },
      t('file.edit', '6 файлов'),
      p('Меняю кусок кода и молюсь линтеру 🙏'),
      ok('6 файлов обновлено'),
      { kind: 'todo', items: [
        { status: 'done', content: 'просканировать src/' },
        { status: 'done', content: 'найти относительные импорты' },
        { status: 'done', content: 'переписать на @/-алиасы' },
      ] },
      { kind: 'say', text: 'Порядок. 6 относительных импортов переведены на @/-алиасы, циклических зависимостей не осталось.' },
    ],
  },
  {
    id: 'rag',
    input: 'где обрабатывается rate-limit retry?',
    lines: [
      { kind: 'user', text: 'где обрабатывается rate-limit retry?' },
      t('codebase.search', 'rate-limit retry'),
      p('Кручу внутренние шестерёнки агента ⚙️'),
      ok('8 фрагментов · RRF k=60'),
      { kind: 'say', text: 'src/agent/streaming-loop.ts — ловит 429 и ждёт по заголовку Retry-After, экспоненциальный backoff. Плюс упоминание в providers/openai-compat.ts.' },
    ],
    patch: { ragChunks: 3421 },
  },
  {
    id: 'help',
    input: '/help',
    lines: [
      { kind: 'note', text: 'Доступные команды:' },
      { kind: 'commands' },
    ],
  },
  {
    id: 'switch',
    input: '/switch',
    lines: [
      { kind: 'note', text: 'Провайдер переключён' },
      { kind: 'say', text: '◇ DeepSeek (web, бесплатно)  →  Claude · claude-sonnet-4' },
    ],
    patch: { provider: 'Claude · claude-sonnet-4' },
  },
  {
    id: 'think',
    input: '/think',
    lines: [{ kind: 'note', text: 'think: on — модель начнёт рассуждать вслух перед ответом' }],
    patch: { think: true },
  },
]

// Free input the visitor types → a generic, in-character turn.
const IMPROV_PROGRESS = [
  'Подсматриваю в файлы и делаю вид, что это аудит кода 🔍',
  'Декодирую древние руны TypeScript 🗿',
  'Проверяю, что ты там накодил ночью 🌙',
  'Кручу внутренние шестерёнки агента ⚙️',
]

export function improvScenario(input: string, seed: number): Scenario {
  const prog = IMPROV_PROGRESS[seed % IMPROV_PROGRESS.length]!
  const firstWord = input.trim().split(/\s+/)[0]?.slice(0, 24) || 'src'
  return {
    id: `improv-${seed}`,
    input,
    lines: [
      { kind: 'user', text: input },
      t('grep', firstWord),
      p(prog),
      ok(`${(seed % 7) + 2} совпадения`),
      { kind: 'say', text: 'Глянул. Криминала нет — но вон то место живёт на честном слове, я бы переписал. 🙂' },
    ],
  }
}
