import MarkupThreeNav from '@/components/MarkupThreeNav'
import CursorNetworkPanel from '@/components/CursorNetworkPanel'

const SUBHEADLINE = 'Trusted by global enterprises across Africa, Europe, the Middle East, and North America.'

export default function Page3() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#060224] text-white">
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(circle at 15% 10%, rgba(29, 87, 178, 0.35) 0%, rgba(6, 2, 36, 0) 45%), radial-gradient(circle at 78% 48%, rgba(8, 112, 224, 0.35) 0%, rgba(6, 2, 36, 0) 38%), linear-gradient(180deg, #050222 0%, #070228 100%)',
        }}
      />

      <MarkupThreeNav />

      <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-36 md:grid-cols-[1.03fr_1fr] md:items-center md:gap-14 md:pt-44">
        <div>
          <h1 className="font-manrope text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-[3.55rem]">
            Africa&apos;s leading financial planning solution.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/72">{SUBHEADLINE}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl border border-amber-300/45 bg-[#f0a01f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#f4ab30]"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Book a Demo
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/12 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Explore IDU
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[560px]">
          <div className="aspect-[5/3] min-h-[270px] sm:min-h-[320px]">
            <CursorNetworkPanel />
          </div>
        </div>
      </section>
    </main>
  )
}
