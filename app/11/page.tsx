import Link from 'next/link'
import IDULogoMark from '@/components/IDULogoMark'
import AnimationDepartmentFlowsSlate from '@/components/AnimationDepartmentFlowsSlate'
import {
  ArrowRight,
  ArrowUpRight,
  ChartLineUp,
  CheckCircle,
  CompassTool,
  Cube,
  CurrencyCircleDollar,
  Gauge,
  Handshake,
  Lightning,
  LockKey,
  PresentationChart,
  Sparkle,
  SquaresFour,
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

const navItems = ['Solutions', 'Platform', 'Customers', 'Resources', 'Partners', 'About']

const stats = [
  { icon: Gauge, value: '40%', label: 'Faster planning cycles' },
  { icon: UsersThree, value: '3x', label: 'Higher business participation' },
  { icon: LockKey, value: '99%', label: 'Decision traceability' },
]

const featureCards = [
  {
    icon: PresentationChart,
    title: 'Planning Cockpit',
    copy: 'One operational view of strategy, ownership, and financial outcomes across teams.',
  },
  {
    icon: CompassTool,
    title: 'Scenario Modeling',
    copy: 'Design and compare pathways with clear risk, cost, and performance implications.',
  },
  {
    icon: Handshake,
    title: 'Cross-Team Alignment',
    copy: 'Finance and non-financial teams collaborate in one governed planning environment.',
  },
  {
    icon: CurrencyCircleDollar,
    title: 'Budget Precision',
    copy: 'Apply structured guardrails so budget ownership scales without control tradeoffs.',
  },
]

const workflow = [
  {
    icon: SquaresFour,
    title: 'Set Strategic Priorities',
    copy: 'Define outcomes, constraints, and risk tolerance at leadership level.',
  },
  {
    icon: UsersThree,
    title: 'Collect Team Inputs',
    copy: 'Capture departmental assumptions in a common model with role controls.',
  },
  {
    icon: ChartLineUp,
    title: 'Model Scenarios',
    copy: 'Test options and compare impacts before approvals are finalized.',
  },
  {
    icon: CheckCircle,
    title: 'Commit and Track',
    copy: 'Lock plans, monitor variance, and re-forecast without process restarts.',
  },
]

const productModules = [
  {
    tag: 'Finance Governance',
    title: 'Policy-aware approvals and full decision lineage.',
    copy: 'Keep enterprise governance in place while planning velocity improves.',
  },
  {
    tag: 'Operational Planning',
    title: 'Department plans with shared accountability.',
    copy: 'Assign ownership clearly and maintain synchronized assumptions.',
  },
  {
    tag: 'Executive Visibility',
    title: 'Snapshot-ready performance signal cards.',
    copy: 'Surface directional risk and momentum in leadership-friendly formats.',
  },
]

const trustRows = ['MTN Group', 'Absa', 'Nedbank', 'Sasol', 'Vodacom', 'Aspen', 'Axian', 'Astra Tech']

function MockImage({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(28,31,94,0.16)_0%,transparent_46%),radial-gradient(circle_at_83%_82%,rgba(100,116,139,0.16)_0%,transparent_46%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.86)_48%,rgba(255,255,255,0.1)_100%)]" />
      <div className="absolute bottom-3 left-3 rounded-full border border-[#e2e8f0] bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1C1F5E]">
        {label}
      </div>
    </div>
  )
}

export default function Page11() {
  return (
    <main style={{ backgroundColor: palette.surface, color: palette.ink }} className="min-h-screen overflow-x-hidden">
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <nav className="mx-auto flex h-16 w-full max-w-[90rem] items-center rounded-full border border-[#e2e8f0] bg-white/85 px-3 backdrop-blur-xl">
          <Link href="/" className="ml-2 flex items-center text-[#1C1F5E]">
            <IDULogoMark className="h-7 w-auto" />
          </Link>

          <div className="mx-auto hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                className="rounded-full px-3 py-2 text-sm font-medium text-[#1C1F5E]/85 transition-colors hover:bg-[#eef2f9] hover:text-[#0F172A]"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2 pr-1">
            <Link
              href="/4"
              className="hidden rounded-full border border-[#d5dcec] px-4 py-2 text-sm font-medium text-[#1C1F5E] transition-colors hover:bg-[#f1f4fa] sm:inline-flex"
            >
              Mockup 4
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors hover:opacity-95"
              style={{ backgroundColor: palette.primary }}
            >
              Book a Demo
              <ArrowUpRight size={16} weight="bold" />
            </Link>
          </div>
        </nav>
      </header>

      <section className="px-6 pb-20 pt-32 sm:px-8 sm:pt-36 xl:px-10">
        <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-[90rem] items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#64748B]">Mockup 11: Slate Flow System</p>
            <h1 className="mt-5 font-manrope text-[2.7rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-[#1C1F5E] sm:text-[3.5rem] lg:text-[4.1rem]">
              Enterprise planning that feels calm, elegant, and precise.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#64748B]">
              IDU connects finance and non-financial managers in a single coordinated model so strategy, budget, and execution move together.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
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

            <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map((item) => {
                const Icon = item.icon
                return (
                  <article
                    key={item.label}
                    className="rounded-xl border border-[#e2e8f0] bg-white p-4 shadow-[0_12px_28px_-22px_rgba(15,23,42,0.4)]"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-manrope text-2xl font-bold text-[#1C1F5E]">{item.value}</p>
                      <Icon size={16} weight="bold" className="text-[#64748B]" />
                    </div>
                    <p className="mt-1 text-xs text-[#64748B]">{item.label}</p>
                  </article>
                )
              })}
            </div>
          </div>

          <div className="relative h-[340px] sm:h-[430px] lg:h-[520px]">
            <div className="absolute inset-0 [mask-image:radial-gradient(122%_108%_at_50%_50%,black_56%,transparent_100%)] [-webkit-mask-image:radial-gradient(122%_108%_at_50%_50%,black_56%,transparent_100%)]">
              <AnimationDepartmentFlowsSlate />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_22%,rgba(28,31,94,0.13)_0%,transparent_45%),radial-gradient(circle_at_80%_80%,rgba(100,116,139,0.12)_0%,transparent_48%)]" />
          </div>
        </div>
      </section>

      <section className="px-6 py-14 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[90rem] rounded-3xl border border-[#e2e8f0] bg-white p-6 shadow-[0_30px_70px_-55px_rgba(15,23,42,0.45)] sm:p-8">
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

      <section className="px-6 py-16 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[90rem]">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#64748B]">Product Modules</p>
            <h2 className="mt-4 font-manrope text-3xl font-semibold leading-tight text-[#1C1F5E] sm:text-4xl">
              Designed for modern SaaS clarity with card-first information hierarchy.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-12">
            <article className="rounded-3xl border border-[#e2e8f0] bg-white p-7 lg:col-span-7">
              <div className="flex items-center justify-between">
                <h3 className="font-manrope text-xl font-semibold text-[#1C1F5E]">Planning Command Interface</h3>
                <Cube size={18} className="text-[#64748B]" weight="bold" />
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#64748B]">
                A single interface for scenario comparison, ownership review, and cycle-level decision governance.
              </p>
              <MockImage label="Platform Snapshot" className="mt-5 aspect-[16/9] border border-[#e4eaf3]" />
            </article>

            <article className="rounded-3xl border border-[#e2e8f0] bg-white p-7 lg:col-span-5">
              <h3 className="font-manrope text-xl font-semibold text-[#1C1F5E]">Planning Signals</h3>
              <div className="mt-5 space-y-3">
                {['Cycle progress', 'Risk pressure', 'Department completion', 'Executive readiness'].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-xl border border-[#e5ebf3] bg-[#f8fafc] px-4 py-3 text-sm text-[#334155]">
                    <span>{item}</span>
                    <ArrowRight size={14} className="text-[#64748B]" weight="bold" />
                  </div>
                ))}
              </div>
            </article>

            {featureCards.map((card) => {
              const Icon = card.icon
              return (
                <article key={card.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-6 lg:col-span-3">
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
      </section>

      <section className="px-6 py-16 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[90rem] rounded-3xl border border-[#e2e8f0] bg-white p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#64748B]">Workflow Rhythm</p>
              <h3 className="mt-2 font-manrope text-3xl font-semibold text-[#1C1F5E]">Horizontal planning stages built for leadership flow.</h3>
            </div>
            <Link href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1C1F5E]">
              See Implementation Plan
              <ArrowUpRight size={16} weight="bold" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-4">
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

      <section className="px-6 py-16 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[90rem]">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <article className="rounded-3xl border border-[#e2e8f0] bg-white p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#64748B]">Use Case Cards</p>
              <div className="mt-4 space-y-4">
                {productModules.map((module) => (
                  <div key={module.title} className="rounded-2xl border border-[#e6ecf3] bg-[#f8fafc] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748B]">{module.tag}</p>
                    <p className="mt-2 text-base font-semibold text-[#1C1F5E]">{module.title}</p>
                    <p className="mt-1.5 text-sm text-[#64748B]">{module.copy}</p>
                  </div>
                ))}
              </div>
            </article>

            <div className="grid gap-4 sm:grid-cols-2">
              <MockImage label="Case Study: Infrastructure" className="aspect-[5/4] border border-[#e4eaf3] bg-white" />
              <MockImage label="Case Study: Retail" className="aspect-[5/4] border border-[#e4eaf3] bg-white" />
              <MockImage label="Case Study: Services" className="aspect-[5/4] border border-[#e4eaf3] bg-white" />
              <article className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
                <p className="text-sm font-semibold text-[#1C1F5E]">Enterprise Impact</p>
                <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                  Teams adopting structured planning templates report faster cycle completion and cleaner financial governance.
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#1C1F5E]">
                  <Sparkle size={16} weight="bold" />
                  Read Customer Story
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 pt-12 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[90rem] rounded-[2rem] px-8 py-10 text-white sm:px-10" style={{ backgroundColor: palette.primary }}>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <IDULogoMark className="h-8 w-auto text-[#F8FAFC]" />
              <h3 className="mt-4 font-manrope text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Replace planning friction with one connected enterprise model.
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/78">
                Built for teams that need financial precision, cross-functional participation, and executive confidence in every cycle.
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

      <footer className="border-t border-[#e2e8f0] bg-[#F8FAFC] px-6 pb-10 pt-12 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[90rem]">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
            <div>
              <IDULogoMark className="h-8 w-auto text-[#1C1F5E]" />
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#64748B]">
                Finance in focus for teams that want strategic planning to feel simple, clear, and enterprise-ready.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-[#64748B]">
                <Cube size={15} weight="bold" />
                Built for modern planning teams
              </div>
            </div>

            {[['Platform', ['Forecasting', 'Scenario Design', 'Governance', 'Integrations']], ['Solutions', ['Enterprise Planning', 'Budgeting', 'Cash Flow', 'Workforce']], ['Company', ['About', 'Partners', 'Resources', 'Contact']]].map((group) => (
              <div key={group[0]}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1C1F5E]">{group[0]}</p>
                <ul className="mt-3 space-y-2 text-sm text-[#64748B]">
                  {(group[1] as string[]).map((link) => (
                    <li key={link}>
                      <a href="#" className="transition-colors hover:text-[#1C1F5E]">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#e2e8f0] pt-6 text-xs text-[#64748B]">
            <p>© {new Date().getFullYear()} IDU. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-[#1C1F5E]">Privacy</a>
              <a href="#" className="hover:text-[#1C1F5E]">Terms</a>
              <a href="#" className="hover:text-[#1C1F5E]">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
