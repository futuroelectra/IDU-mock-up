export default function LiquidGlass() {
  return (
    <section className="px-4 pt-12 pb-28 flex justify-center">
      <div
        className="relative w-full max-w-5xl rounded-2xl overflow-hidden animate-glow-pulse bg-black aspect-[4/3] min-h-[420px] sm:min-h-[520px] md:min-h-[600px]"
        style={{
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="absolute inset-0 rounded-xl bg-black border border-white/10 m-1.5" />
      </div>
    </section>
  )
}
