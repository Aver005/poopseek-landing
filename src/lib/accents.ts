// Static maps — Tailwind's scanner can't see `text-${accent}`, so every class
// must appear as a literal somewhere. These keep accent colours consistent.
export type Accent = 'pink' | 'cyan' | 'amber' | 'green' | 'blue' | 'orange'

export const accentText: Record<Accent, string> = {
  pink: 'text-pink',
  cyan: 'text-cyan',
  amber: 'text-amber',
  green: 'text-green',
  blue: 'text-blue',
  orange: 'text-orange',
}

export const accentBorderHover: Record<Accent, string> = {
  pink: 'hover:border-pink/50',
  cyan: 'hover:border-cyan/50',
  amber: 'hover:border-amber/50',
  green: 'hover:border-green/50',
  blue: 'hover:border-blue/50',
  orange: 'hover:border-orange/50',
}

export const accentDot: Record<Accent, string> = {
  pink: 'bg-pink',
  cyan: 'bg-cyan',
  amber: 'bg-amber',
  green: 'bg-green',
  blue: 'bg-blue',
  orange: 'bg-orange',
}
