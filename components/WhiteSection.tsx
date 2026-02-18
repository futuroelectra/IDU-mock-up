import Link from 'next/link'
import Image from 'next/image'
import { megaMenuData } from './navMenuData'

const basePath = process.env.NODE_ENV === 'production' ? '/IDU-mock-up' : ''

const solutionCards = [
  {
    title: 'Adaptive Financial Resilience',
    desc: 'Turn static budgets into living strategies that respond to market shifts in real-time.',
    gradient: 'linear-gradient(270deg, rgba(34,197,94,0.4), rgba(16,185,129,0.25), rgba(6,182,212,0.2), rgba(34,197,94,0.4))',
  },
  {
    title: 'Real-Time Strategic Visibility',
    desc: 'Move beyond historical reporting to a forward-looking view of organizational health.',
    gradient: 'linear-gradient(270deg, rgba(99,102,241,0.4), rgba(139,92,246,0.25), rgba(59,130,246,0.2), rgba(99,102,241,0.4))',
  },
  {
    title: 'Borderless Financial Connectivity',
    desc: 'Scale effortlessly across the UK, UAE, and Canada with multi-currency, multi-entity consolidation.',
    gradient: 'linear-gradient(270deg, rgba(6,182,212,0.4), rgba(14,165,233,0.25), rgba(34,197,94,0.2), rgba(6,182,212,0.4))',
  },
]

const logoCloud = ['Enterprise A', 'Global Co', 'Finance Group', 'Strategy Corp', 'Peak Ltd']

export default function WhiteSection() {
  return (
    <>
      {/* Section 2: The Strategic Pivot */}
      <section className="bg-white text-gray-900 rounded-t-[2rem] sm:rounded-t-[3rem] pt-[130px] pb-24 px-6 -mt-px">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-panchang font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight">
            Where Strategy Meets Reality.
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mt-8 font-manrope leading-relaxed">
            Most planning tools are built by accountants, for accountants. IDU is built for the entire business. We bridge the gap between complex financial data and the people who actually spend the budget, ensuring every decision is backed by clarity.
          </p>
        </div>
      </section>

      {/* Section 3: Dual-Value Proposition — split layout */}
      <section className="bg-zinc-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-gray-200/80 shadow-xl shadow-gray-200/50">
            <div className="relative p-10 sm:p-14 bg-white">
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-90"
                style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, transparent 70%)', boxShadow: 'inset 0 0 60px -20px rgba(59,130,246,0.2)' }}
              />
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 font-manrope">For the Strategic CFO</span>
              <h3 className="font-panchang font-bold text-2xl sm:text-3xl mt-3 text-gray-900">Total Governance.</h3>
              <p className="text-gray-600 mt-4 font-manrope">
                Eliminate &quot;shadow accounting&quot; with a single version of the truth and enterprise-grade controls.
              </p>
              <p className="mt-6 font-panchang font-bold text-gray-900">Outcome: Absolute Certainty.</p>
            </div>
            <div className="relative p-10 sm:p-14 bg-white border-t md:border-t-0 md:border-l border-gray-200/80">
              <div
                className="absolute top-0 left-0 w-32 h-32 rounded-br-full opacity-90 md:rounded-bl-none md:rounded-r-full"
                style={{ background: 'linear-gradient(225deg, rgba(34,197,94,0.2) 0%, transparent 70%)', boxShadow: 'inset 0 0 60px -20px rgba(34,197,94,0.2)' }}
              />
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 font-manrope">For the Operational Manager</span>
              <h3 className="font-panchang font-bold text-2xl sm:text-3xl mt-3 text-gray-900">Total Ownership.</h3>
              <p className="text-gray-600 mt-4 font-manrope">
                Replace intimidating spreadsheets with an intuitive, jargon-free interface designed for humans.
              </p>
              <p className="mt-6 font-panchang font-bold text-gray-900">Outcome: Financial Literacy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Strategic Solutions — cards with gradient placeholders */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-panchang font-bold text-3xl sm:text-4xl text-center text-gray-900 mb-4">
            Built for the Pace of Modern Enterprise.
          </h2>
          <div className="grid sm:grid-cols-3 gap-8 mt-16">
            {solutionCards.map((card) => (
              <div
                key={card.title}
                className="group rounded-2xl border-2 border-gray-200 bg-white overflow-hidden hover:border-gray-300 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300"
              >
                <div
                  className="aspect-[4/3] rounded-t-2xl animate-gradient-drift"
                  style={{ background: card.gradient }}
                />
                <div className="p-6">
                  <h3 className="font-panchang font-bold text-xl text-gray-900">{card.title}</h3>
                  <p className="text-gray-600 mt-3 font-manrope text-sm leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Global Proof — logo cloud + quote */}
      <section className="bg-zinc-100 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 font-manrope mb-10">
            Proven in Complexity. Scaled for the World.
          </p>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-16 opacity-60 grayscale">
            {logoCloud.map((name) => (
              <span key={name} className="font-panchang font-bold text-lg text-gray-700">{name}</span>
            ))}
          </div>
          <blockquote className="text-2xl sm:text-3xl font-manrope font-medium text-gray-800 leading-snug">
            &quot;If it works in the world&apos;s most volatile emerging markets, it&apos;s ready for anything. IDU gives us a level of departmental accountability we couldn&apos;t find in legacy EPMs.&quot;
          </blockquote>
          <cite className="block mt-6 text-gray-500 font-manrope not-italic">— Global Finance Director</cite>
        </div>
      </section>

      {/* Section 6: Final CTA — black + glowing button */}
      <section className="py-24 px-6 relative overflow-hidden bg-black">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="font-panchang font-bold text-3xl sm:text-4xl md:text-5xl text-white">
            Simplify the complex.
          </h2>
          <p className="font-panchang font-bold text-2xl sm:text-3xl md:text-4xl text-white/90 mt-2">
            Empower your managers. Protect your margin. Lead with certainty.
          </p>
          <div className="mt-12 inline-block">
            <span className="relative inline-block animate-button-glow rounded-2xl p-1">
              <Link
                href="#"
                className="relative z-10 inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-8 py-4 rounded-xl border border-white/20 backdrop-blur-md hover:bg-white/15 transition font-manrope"
              >
                Book Your Strategic Preview
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </span>
          </div>
        </div>
      </section>

      {/* Footer: white, main logo, black Partner button, clean sitemap */}
      <footer className="bg-white border-t border-gray-200 pt-14 pb-10 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Top row: logo + Partner CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 pb-10 border-b border-gray-200">
            <Link href="/" className="block w-fit">
              <Image
                src={`${basePath}/idu-inverted-logo.png`}
                alt="IDU"
                width={120}
                height={49}
                className="h-8 w-auto"
                unoptimized
              />
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-1.5 w-fit bg-black text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-800 transition font-manrope"
            >
              Partner with IDU
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Sitemap: clear columns */}
          <nav className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-10 pt-10 pb-10" aria-label="Site map">
            {[...megaMenuData].reverse().map((item) => (
              <div key={item.label}>
                <p className="font-panchang font-bold text-xs uppercase tracking-wider text-gray-900 mb-4">
                  {item.label}
                </p>
                <ul className="space-y-3">
                  {item.groups.flatMap((group) => [
                    <li key={group.title} className="mt-2 first:mt-0">
                      <span className="text-[11px] uppercase tracking-wider text-gray-400 font-manrope block mb-1.5">
                        {group.title}
                      </span>
                      <ul className="space-y-1">
                        {group.links.map((link) => (
                          <li key={link.label}>
                            <Link
                              href={link.href ?? '#'}
                              className="text-sm text-gray-600 hover:text-gray-900 font-manrope"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>,
                  ])}
                </ul>
              </div>
            ))}
          </nav>

          {/* Bottom bar */}
          <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 font-manrope">
              © {new Date().getFullYear()} IDU. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-xs text-gray-500 hover:text-gray-900 font-manrope">Privacy</Link>
              <Link href="#" className="text-xs text-gray-500 hover:text-gray-900 font-manrope">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
