export default function LiquidGlass() {
  return (
    <section className="px-4 pt-12 pb-28 flex justify-center">
      <div
        className="relative w-full max-w-5xl rounded-2xl overflow-hidden min-h-[320px] animate-glow-pulse bg-black"
        style={{
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="rounded-xl bg-black border border-white/10 m-1.5 min-h-[300px]" />
      </div>
    </section>
  )
}
