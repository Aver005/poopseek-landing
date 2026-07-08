import { useSyncExternalStore } from 'react'

// A tiny observable so the hero console can drive the fixed status-bar dock
// (msg count, think/web toggles, RAG chunks, active provider) without prop
// drilling. Mirrors the real bottom status line in src/cli/bootstrap/status-line.ts.
export interface Status {
  provider: string
  msg: number
  think: boolean
  web: boolean
  ragChunks: number | null
  cwd: string
  busy: boolean
}

const initial: Status = {
  provider: 'DeepSeek (web, бесплатно)',
  msg: 2,
  think: false,
  web: false,
  ragChunks: null,
  cwd: 'poopseek',
  busy: false,
}

let state: Status = initial
const listeners = new Set<() => void>()

function emit() {
  for (const l of listeners) l()
}

export function patchStatus(patch: Partial<Status>) {
  state = { ...state, ...patch }
  emit()
}

export function bumpMsg(by = 2) {
  state = { ...state, msg: state.msg + by }
  emit()
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

function getSnapshot() {
  return state
}

export function useStatus(): Status {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}
