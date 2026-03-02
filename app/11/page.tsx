import Link from 'next/link'
import IDULogoMark from '@/components/IDULogoMark'
import AnimationDepartmentFlowsSlate from '@/components/AnimationDepartmentFlowsSlate'
import MockupElevenNav from '@/components/MockupElevenNav'
import { megaMenuData } from '@/components/navMenuData'
import {
  ArrowRight,
  ArrowUpRight,
  ChartLineUp,
  CheckCircle,
  CompassTool,
  Handshake,
  Lightning,
  Sparkle,
  UsersThree,
} from '@phosphor-icons/react/dist/ssr'

const palette = {
  primary: '#1C1F5E',
  secondary: '#64748B',
  accent: '#FF4D00',
  surface: '#F8FAFC',
  detail: '#FFFFFF',
  ink: '#0F172A',
}

const featureCards = [
  {
    icon: ChartLineUp,
    title: 'Scenario Clarity',
    copy: 'Compare strategic options with clean financial impact visibility.',
  },
  {
    icon: UsersThree,
    title: 'Shared Ownership',
    copy: 'Finance and business teams work in one aligned planning model.',
  },
  {
    icon: CompassTool,
    title: 'Cycle Control',
    copy: 'Move from assumptions to decisions without governance drift.',
  },
]

const workflow = [
  {
    icon: Sparkle,
    title: 'Set Direction',
    copy: 'Define strategic priorities and constraints once.',
  },
  {
    icon: Handshake,
    title: 'Capture Inputs',
    copy: 'Collect team planning signals in shared context.',
  },
  {
    icon: ChartLineUp,
    title: 'Model Tradeoffs',
    copy: 'Test options before locking cycle commitments.',
  },
  {
    icon: CheckCircle,
    title: 'Commit and Track',
    copy: 'Approve, monitor variance, and refine continuously.',
  },
]

const trustRows = ['MTN Group', 'Absa', 'Nedbank', 'Sasol', 'Vodacom', 'Aspen', 'Axian', 'Astra Tech']
const footerTopGroups = megaMenuData.filter((item) => item.label !== 'Solutions')
const solutionsItem = megaMenuData.find((item) => item.label === 'Solutions')
const solutionsLinks = solutionsItem ? solutionsItem.groups.flatMap((group) => group.links) : []

function MockImage({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_18%,rgba(28,31,94,0.14)_0%,transparent_48%),radial-gradient(circle_at_82%_82%,rgba(59,130,246,0.12)_0%,transparent_48%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.84)_48%,rgba(255,255,255,0.1)_100%)]" />
      <div className="absolute bottom-3 left-3 rounded-full border border-[#e2e8f0] bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1C1F5E]">
        {label}
      </div>
    </div>
  )
}

export default function Page11() {
  return (
    <main style={{ backgroundColor: palette.surface, color: palette.ink }} className="min-h-screen overflow-x-hidden">
      <MockupElevenNav />

      <section className="px-8 pb-30 pt-40 sm:px-12 sm:pt-44 xl:px-20">
        <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-[94rem] items-center gap-14 lg:grid-cols-[1.04fr_0.96fr] xl:gap-18">
          <div className="relative h-[340px] sm:h-[440px] lg:h-[540px]">
            <div className="absolute inset-0 [mask-image:radial-gradient(128%_112%_at_50%_50%,black_60%,transparent_100%)] [-webkit-mask-image:radial-gradient(128%_112%_at_50%_50%,black_60%,transparent_100%)]">
              <AnimationDepartmentFlowsSlate />
            </div>
          </div>

          <div className="max-w-[40rem]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#64748B]">Mockup 11: Slate Flow System</p>
            <h1 className="mt-6 max-w-[38rem] font-manrope text-[2.15rem] font-extrabold leading-[1.07] tracking-[-0.024em] text-[#1C1F5E] sm:text-[2.65rem] lg:text-[3.1rem]">
              Finance in Focus for teams that plan in motion.
            </h1>
            <p className="mt-7 max-w-[36rem] text-[1.02rem] leading-relaxed text-[#64748B]">
              Africa&apos;s leading financial planning solution. Trusted by global enterprises across Africa, Europe,
              the Middle East, and North America.
            </p>

            <div className="mt-11 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: palette.accent }}
              >
                <Lightning size={16} weight="fill" />
                Start Planning Review
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl bg-[#1f2937] px-5 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                <Sparkle size={16} weight="bold" />
                Explore IDU
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-10 xl:px-14">
        <div className="mx-auto max-w-[92rem] rounded-3xl border border-[#e2e8f0] bg-white p-7 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#64748B]">Trusted By Planning Teams</p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {trustRows.map((name) => (
              <div key={name} className="rounded-xl border border-[#e5ebf3] bg-[#f8fafc] px-3 py-2 text-center text-xs font-semibold text-[#1C1F5E]/88">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 xl:px-14">
        <div className="mx-auto max-w-[92rem]">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#64748B]">Product Surface</p>
            <h2 className="mt-4 font-manrope text-3xl font-semibold leading-tight text-[#1C1F5E] sm:text-4xl">
              Less visual clutter. More decision confidence.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.06fr_0.94fr]">
            <article className="rounded-3xl border border-[#e2e8f0] bg-white p-7">
              <h3 className="font-manrope text-xl font-semibold text-[#1C1F5E]">Unified Planning Interface</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#64748B]">
                Keep assumptions, ownership, and approvals in one environment built for enterprise planning cadence.
              </p>
              <MockImage label="Platform Snapshot" className="mt-6 aspect-[16/9] border border-[#e4eaf3]" />
            </article>

            <div className="grid gap-4">
              {featureCards.map((card) => {
                const Icon = card.icon
                return (
                  <article key={card.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef2ff] text-[#1C1F5E]">
                      <Icon size={18} weight="bold" />
                    </div>
                    <h4 className="mt-4 font-manrope text-lg font-semibold text-[#1C1F5E]">{card.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{card.copy}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 xl:px-14">
        <div className="mx-auto max-w-[92rem] rounded-3xl border border-[#e2e8f0] bg-white p-8 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#64748B]">Workflow Rhythm</p>
              <h3 className="mt-2 font-manrope text-3xl font-semibold text-[#1C1F5E]">A cleaner horizontal planning motion.</h3>
            </div>
            <Link href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1C1F5E]">
              See Implementation Plan
              <ArrowUpRight size={16} weight="bold" />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {workflow.map((step, index) => {
              const Icon = step.icon
              return (
                <article key={step.title} className="rounded-2xl border border-[#e6ecf3] bg-[#f8fafc] p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748B]">Step {index + 1}</span>
                    <Icon size={18} weight="bold" className="text-[#1C1F5E]" />
                  </div>
                  <p className="mt-3 text-base font-semibold text-[#1C1F5E]">{step.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{step.copy}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 pt-10 sm:px-10 xl:px-14">
        <div className="mx-auto max-w-[92rem] rounded-[2rem] px-8 py-10 text-white sm:px-10" style={{ backgroundColor: palette.primary }}>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <IDULogoMark className="h-8 w-auto text-[#F8FAFC]" />
              <h3 className="mt-4 font-manrope text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Planning software for teams that need elegant control.
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/78">
                Built for modern finance leaders who want less noise and higher decision quality.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: palette.accent }}
              >
                Book a Demo
                <ArrowUpRight size={16} weight="bold" />
              </a>
              <a href="#" className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-5 py-3 text-sm font-medium text-white hover:bg-white/10">
                View Platform
                <ArrowRight size={15} weight="bold" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e2e8f0] bg-[#F8FAFC] px-6 pb-10 pt-14 sm:px-10 xl:px-14">
        <div className="mx-auto max-w-[92rem]">
          <div className="flex flex-col gap-6 border-b border-[#e2e8f0] pb-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <IDULogoMark className="h-8 w-auto text-[#1C1F5E]" />
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[#64748B]">
                Finance in Focus for teams that want strategic planning to feel clear, fast, and controlled.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: palette.primary }}
              >
                Partner with IDU
                <ArrowUpRight size={14} weight="bold" />
              </a>
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-x-8 gap-y-10 pb-10 pt-10 md:grid-cols-4" aria-label="Site map">
            {footerTopGroups.map((item) => (
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

          {solutionsItem && (
            <section className="border-t border-[#e2e8f0] pb-10 pt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1C1F5E]">{solutionsItem.label}</p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {solutionsLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href ?? '#'}
                    className="rounded-full border border-[#e2e8f0] bg-white px-3.5 py-1.5 text-sm text-[#334155] transition-colors hover:border-[#c5d0e8] hover:text-[#1C1F5E]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#e2e8f0] pt-6">
            <p className="text-xs text-[#64748B]">© {new Date().getFullYear()} IDU. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm text-[#64748B]">
              <a href="#" className="transition-colors hover:text-[#1C1F5E]">Privacy</a>
              <a href="#" className="transition-colors hover:text-[#1C1F5E]">Terms</a>
              <a href="#" className="transition-colors hover:text-[#1C1F5E]">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
