// Atmosphere, not a grid. Warm aurora light-leaks (pink → amber, a whisper of
// cyan) bleeding from the corners, over an espresso-black void, plus a drifting
// film-grain layer. All motion dies under prefers-reduced-motion (index.css).
export default function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-void" />

      {/* pink leak, top-left */}
      <div
        className="animate-drift absolute -left-[15%] -top-[20%] h-[70vmax] w-[70vmax] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.20), transparent 62%)' }}
      />
      {/* amber leak, bottom-right — the 💩 warmth */}
      <div
        className="animate-drift-slow absolute -bottom-[25%] -right-[12%] h-[65vmax] w-[65vmax] rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(252,211,77,0.14), transparent 60%)' }}
      />
      {/* cyan whisper, center-right */}
      <div
        className="animate-drift absolute right-[20%] top-[30%] h-[42vmax] w-[42vmax] rounded-full blur-[140px]"
        style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.10), transparent 65%)' }}
      />

      {/* vignette to seat the panes in the dark */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(120% 90% at 50% 30%, transparent 40%, rgba(6,3,6,0.55) 100%)' }}
      />

      <div className="grain-layer" />
    </div>
  )
}
