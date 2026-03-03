import Link from 'next/link'
import MockupElevenNav from '@/components/MockupElevenNav'
import AnimationDepartmentFlowsSlate from '@/components/AnimationDepartmentFlowsSlate'
import IDULogoMark from '@/components/IDULogoMark'
import { megaMenuData } from '@/components/navMenuData'
import { ArrowRight, ArrowUpRight, Lightning, Sparkle } from '@phosphor-icons/react/dist/ssr'

const palette = {
  primary: '#1C1F5E',
  secondary: '#64748B',
  accent: '#FF4D00',
  surface: '#F8FAFC',
  detail: '#FFFFFF',
  ink: '#0F172A',
}

const pillarCards = [
  {
    title: 'Streamlined',
    copy: 'Run faster planning cycles with cleaner ownership and less operational drag.',
  },
  {
    title: 'Connected',
    copy: 'Bring finance, departments, and leadership into one governed planning rhythm.',
  },
  {
    title: 'Strategic',
    copy: 'Model decisions before they become commitments and align teams around tradeoffs.',
  },
  {
    title: 'Intelligent',
    copy: 'Assistive AI supports planning quality while humans remain accountable for outcomes.',
  },
]

const proofItems = ['Founded 1997', 'Founder-led', 'Four continents', 'Deploy in weeks']

export default function Page12() {
  return (
    <main style={{ backgroundColor: palette.surface, color: palette.ink }} className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.96]">
        <AnimationDepartmentFlowsSlate tone="white" cursorForce={0.32} trackGlobalPointer />
      </div>
      <MockupElevenNav />

      <div className="relative z-10">
        <section className="px-8 pb-20 pt-28 sm:px-12 xl:px-20">
          <div className="mx-auto flex min-h-[calc(100vh-11rem)] w-full max-w-[92rem] items-center">
            <div className="max-w-[42rem]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#64748B]">Mockup 12: Whole-Site Motion Field</p>
              <h1 className="mt-6 font-manrope text-[2.25rem] font-extrabold leading-[1.05] tracking-[-0.024em] text-[#1C1F5E] sm:text-[2.8rem] lg:text-[3.35rem]">
                Finance in Focus.
              </h1>
              <p className="mt-6 max-w-[38rem] text-[1.02rem] leading-relaxed text-[#475569]">
                Africa&apos;s leading financial planning solution. Trusted by global enterprises across Africa, Europe,
                the Middle East, and North America.
              </p>
              <p className="mt-4 max-w-[38rem] text-[1rem] leading-relaxed text-[#64748B]">
                Financial intelligence shouldn&apos;t be locked in Finance. IDU helps every manager understand the
                financial impact of decisions in one collaborative platform.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: palette.accent }}
                >
                  <Lightning size={16} weight="fill" />
                  Book a Demo
                </Link>
                <Link
                  href="/platform"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1f2937] px-5 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                >
                  <Sparkle size={16} weight="bold" />
                  Explore IDU
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-2.5">
                {proofItems.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#e2e8f0] bg-white/78 px-3.5 py-1.5 text-xs font-semibold text-[#334155] backdrop-blur-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 sm:px-10 xl:px-14">
          <div className="mx-auto max-w-[92rem] rounded-3xl border border-[#e2e8f0] bg-white/86 p-8 shadow-[0_20px_50px_-42px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:p-10">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#64748B]">How IDU Works</p>
              <h2 className="mt-3 font-manrope text-3xl font-semibold leading-tight text-[#1C1F5E] sm:text-4xl">
                A planning system designed for shared ownership, not siloed control.
              </h2>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-4">
              {pillarCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-[#e6ecf3] bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#64748B]">{card.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#475569]">{card.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-24 sm:px-10 xl:px-14">
          <div className="mx-auto max-w-[92rem] rounded-[2rem] px-8 py-10 text-white sm:px-10" style={{ backgroundColor: palette.primary }}>
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <IDULogoMark className="h-8 w-auto text-[#F8FAFC]" />
                <h3 className="mt-4 font-manrope text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  Built for managers, trusted by finance.
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/82">
                  The intelligent FP&A platform connecting finance standards to operational decision-making.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: palette.accent }}
                >
                  Schedule a Demo
                  <ArrowUpRight size={16} weight="bold" />
                </Link>
                <Link href="/platform" className="inline-flex items-center gap-2 rounded-xl bg-[#1f2937] px-5 py-3 text-sm font-medium text-white">
                  View Platform
                  <ArrowRight size={15} weight="bold" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-[#e2e8f0] bg-[#F8FAFC]/88 px-6 pb-10 pt-14 backdrop-blur-sm sm:px-10 xl:px-14">
          <div className="mx-auto max-w-[92rem]">
            <div className="flex flex-col gap-6 border-b border-[#e2e8f0] pb-10 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <IDULogoMark className="h-8 w-auto text-[#1C1F5E]" />
                <p className="mt-3 max-w-md text-sm leading-relaxed text-[#64748B]">
                  Finance in Focus. Shared clarity. Accountable performance.
                </p>
              </div>
              <Link
                href="/about/partners"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: palette.primary }}
              >
                Partner with IDU
                <ArrowUpRight size={14} weight="bold" />
              </Link>
            </div>

            <nav className="grid grid-cols-2 gap-x-8 gap-y-10 pb-10 pt-10 md:grid-cols-5" aria-label="Site map">
              {megaMenuData.map((item) => (
                <div key={item.label}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1C1F5E]">{item.label}</p>
                  <ul className="mt-4 space-y-4">
                    {item.groups.map((group) => (
                      <li key={group.title}>
                        <p className="mb-1.5 text-[11px] uppercase tracking-[0.16em] text-[#64748B]">{group.title}</p>
                        <ul className="space-y-1.5">
                          {group.links.map((link) => (
                            <li key={link.label}>
                              <Link href={link.href ?? '#'} className="text-sm text-[#334155] transition-colors hover:text-[#1C1F5E]">
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#e2e8f0] pt-6">
              <p className="text-xs text-[#64748B]">© {new Date().getFullYear()} IDU. All rights reserved.</p>
              <div className="flex items-center gap-6 text-sm text-[#64748B]">
                <Link href="#" className="transition-colors hover:text-[#1C1F5E]">
                  Privacy
                </Link>
                <Link href="#" className="transition-colors hover:text-[#1C1F5E]">
                  Terms
                </Link>
                <Link href="#" className="transition-colors hover:text-[#1C1F5E]">
                  Security
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
