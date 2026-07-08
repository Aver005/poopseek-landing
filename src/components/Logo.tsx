export default function Logo({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  const lg = size === 'lg'
  return (
    <span className={`inline-flex items-baseline gap-1.5 font-mono font-semibold tracking-tight ${lg ? 'text-2xl' : 'text-[15px]'}`}>
      <span className="text-pink">Poop</span>
      <span className="text-fg -ml-1.5">Seek</span>
      <span className={lg ? 'text-xl' : 'text-sm'} aria-hidden>
        💩
      </span>
    </span>
  )
}
