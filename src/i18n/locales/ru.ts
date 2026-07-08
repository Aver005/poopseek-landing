import type en from './en'

// Russian is the product's native voice. Pinned to `typeof en`: a new key in
// en.ts fails the build until it is translated here.
const ru: typeof en = {
  nav: {
    menu: 'меню',
    help: 'помощь',
    tools: 'инструменты',
    source: 'исходники',
    session: 'живая консоль. не скриншот.',
  },

  hero: {
    eyebrow: 'CLI-агент · 8 провайдеров · MCP · ACP · RAG · Figma',
    titleA: 'Он ищет.',
    titleB: 'Он катит',
    titleC: 'говнокод премиум-класса.',
    lead: 'PoopSeek — интерактивный TUI-агент на TypeScript + Bun. Один запрос в <k>›</k> — и он читает файлы, дёргает shell, ходит в MCP-серверы, делегирует другим агентам и рисует UI прямо в Figma, планируя каждый шаг сам. До 256 штук.',
    disclaimer: 'Серьёзно спроектированный агент в костюме гремлина. Название — каламбур на DeepSeek.',
    install: 'установка',
    copy: 'копировать',
    copied: 'скопировано ✓',
    star: 'звезда на github',
    tryHint: 'твой ход — введи запрос или запусти slash-команду',
    replay: 'заново',
    placeholder: 'проси что угодно…',
    runners: 'попробуй:',
  },

  providers: {
    kicker: '01 / бэкенды',
    title: 'Восемь мозгов за одним запросом',
    lead: 'Меняй модель прямо в диалоге через /switch. Начни бесплатно на DeepSeek web, эскалируй к фронтир-модели только когда задача этого заслужила.',
    free: 'бесплатно',
    local: 'локально',
    web: 'веб',
    note: 'Токены — на каждый провайдер через /auth. По умолчанию DeepSeek web: рукописный клиент с proof-of-work, ключ не нужен.',
  },

  loop: {
    kicker: '02 / agent loop',
    title: 'Планирует, действует, наблюдает — и по кругу',
    lead: 'Каждый turn — автономный многошаговый цикл со streaming, AbortSignal и retry на rate-limit. Идёт, пока задача не сделана, а не пока не кончится счётчик шагов.',
    steps: [
      { k: 'plan', label: 'План', body: 'Читает запрос, выбирает инструменты, набрасывает todo-лист, который заполняется на глазах.' },
      { k: 'act', label: 'Действие', body: 'До 24 вызовов инструментов за шаг — read, write, shell, git, поиск, суб-агенты.' },
      { k: 'observe', label: 'Наблюдение', body: 'Возвращает результат в контекст, рефрешит ~каждые 64k токенов, корректирует курс.' },
    ],
    capA: 'до',
    capB: 'шагов на turn',
    capNote: 'подняли с 10 → 256. контекст упирается в 256 сообщений и намекает на /compact.',
  },

  tools: {
    kicker: '03 / арсенал',
    title: '31+ инструмент, один статический реестр',
    lead: 'Никакой возни с плагинами — один файл на инструмент, всё в едином реестре. Агент тянется к ним как к мышечной памяти.',
    hover: 'каждое имя ниже — реальный id инструмента.',
  },

  rag: {
    kicker: '04 / RAG по кодбазе',
    title: 'Перестаёт ползать по файлам через пять grep’ов',
    lead: 'Гибридный семантический поиск — плотные embeddings, слитые с BM25 через Reciprocal Rank Fusion. Агент сразу видит релевантные куски вместо раскопок.',
    points: [
      'Работает офлайн и бесплатно — мультиязычная модель ~120 МБ, качается один раз, общая для всех проектов.',
      'Локальный SQLite с FTS5. Без ANN-индекса: полный косинусный проход по 384-мерным векторам укладывается в миллисекунды при ~50k чанков.',
      'Включай в любой момент через /rag on · /rag off. Индекс живёт в ~/.poopseek/rag/.',
    ],
    statModel: 'модель, один раз',
    statDim: 'измерений',
    statFusion: 'RRF fusion',
    query: 'запрос',
    result: 'результат',
  },

  proto: {
    kicker: '05 / подключён',
    title: 'Говорит на протоколах, на которых уже говорят твои тулы',
    lead: 'PoopSeek — не остров. Он втыкается в редакторы, в MCP-серверы и в твой дизайн-холст.',
    cards: [
      {
        name: 'MCP',
        tag: 'клиент',
        body: 'stdio + Streamable HTTP. Авто-discovery серверов из Claude Desktop, VS Code, Cursor и Trae. Статус-кэш на 5 минут пропускает сломанные.',
      },
      {
        name: 'ACP',
        tag: 'обе роли',
        body: 'Работает как ACP-сервер для Zed / JetBrains / Neovim — и как клиент, управляющий другими агентами: Claude Code, Gemini CLI.',
      },
      {
        name: 'Figma',
        tag: 'designer → builder → handyman',
        body: 'Локальный HTTP/SSE-сервер превращает текстовый бриф в настоящий UI Figma через трёхступенчатый pipeline. Слушает порт 7331.',
      },
    ],
  },

  palette: {
    kicker: '06 / палитра команд',
    title: 'Всё в одном слэше',
    lead: 'Естественный язык — для работы, slash-команды — для механики. Две из них спрятаны.',
    hint: 'наведи на строку',
    hiddenTag: 'скрыто',
    desc: {
      '/help': 'список всех команд',
      '/clear': 'очистить историю — новый диалог',
      '/compact': 'сжать историю через LLM-резюме',
      '/model': 'сменить модель внутри провайдера',
      '/switch': 'быстрое переключение провайдера',
      '/auth': 'управление токенами',
      '/mcp': 'MCP-серверы: list / tools / connect / reload',
      '/acp': 'ACP-агенты: add / connect / send / use',
      '/rag': 'семантический поиск: status / init / on / off',
      '/skills': 'управление навыками',
      '/role': 'сменить активную роль',
      '/think': 'toggle thinking-режима',
      '/web': 'toggle web search',
      '/refactor': 'запустить refactor pipeline',
      '/review': 'запустить review pipeline',
      '/btw': 'фоновый sidechat без прерывания',
      '/maestro': 'активировать все навыки разом',
      '/noob': 'сбросить навыки в ноль',
    },
  },

  footer: {
    installTitle: 'Одна строка. Дальше просто poopseek.',
    macos: 'macOS / Linux',
    windows: 'Windows',
    ethos: 'Длинный ответ — признак неясного мышления, а не глубины.',
    ethosNote: '— из системного промпта',
    sign: 'твой персональный CLI-агент',
    made: 'На Bun · TypeScript strict · terminal-kit',
    backTop: 'наверх',
    rights: 'не аффилирован с DeepSeek. название — шутка. агент — нет.',
  },
}

export default ru
