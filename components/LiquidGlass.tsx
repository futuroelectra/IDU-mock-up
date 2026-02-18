export default function LiquidGlass() {
  return (
    <section className="px-4 pt-12 pb-28 flex justify-center">
      <div
        className="relative w-full max-w-5xl rounded-2xl overflow-hidden min-h-[320px] animate-glow-pulse"
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(59, 130, 246, 0.06) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 m-1.5 min-h-[300px]" />
      </div>
    </section>
  )
}
