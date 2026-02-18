type HeroSectionProps = {
  headline: string
  subheadline?: string
}

const SUBHEADLINE = 'Trusted by global enterprises across Africa, Europe, the Middle East, and North America.'

export default function HeroSection({ headline, subheadline = SUBHEADLINE }: HeroSectionProps) {
  return (
    <section className="pt-40 pb-28 px-6 text-center">
      <h1
        className="font-panchang font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl mx-auto leading-snug pb-2 bg-clip-text text-transparent"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.92) 20%, rgba(255,255,255,0.78) 45%, rgba(255,255,255,0.55) 70%, rgba(255,255,255,0.4) 100%)',
        }}
      >
        {headline}
      </h1>
      <p className="text-white/70 text-sm sm:text-base mt-10 max-w-4xl mx-auto font-manrope sm:whitespace-nowrap">
        {subheadline}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 mt-14">
        <a
          href="#"
          className="inline-flex items-center gap-2 bg-cta-blue text-white font-medium px-6 py-3.5 rounded-lg hover:bg-blue-600 transition border border-white/20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Book a Demo
        </a>
        <a
          href="#"
          className="inline-flex items-center gap-2 bg-transparent border border-white text-white font-medium px-6 py-3.5 rounded-lg hover:bg-white/10 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Explore IDU
        </a>
      </div>
    </section>
  )
}
