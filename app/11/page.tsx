import Link from 'next/link'
import IDULogoMark from '@/components/IDULogoMark'
import AnimationDepartmentFlowsSlate from '@/components/AnimationDepartmentFlowsSlate'
import MockupElevenNav from '@/components/MockupElevenNav'
import { megaMenuData } from '@/components/navMenuData'
import {
  Bank,
  Buildings,
  ChartBar,
  ChartLineUp,
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  CompassTool,
  Factory,
  GlobeHemisphereWest,
  GridFour,
  Handshake,
  Lightning,
  Package,
  Robot,
  ShieldCheck,
  Sparkle,
  Storefront,
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

const logoBeltA = [
  { name: 'MTN Group', icon: GlobeHemisphereWest },
  { name: 'Absa', icon: Bank },
  { name: 'Nedbank', icon: Buildings },
  { name: 'Sasol', icon: Factory },
  { name: 'Vodacom', icon: GlobeHemisphereWest },
  { name: 'Aspen', icon: Package },
  { name: 'Axian', icon: GridFour },
  { name: 'Astra Tech', icon: ChartLineUp },
]

const logoBeltB = [
  { name: 'Sage', icon: Storefront },
  { name: 'Oracle', icon: ShieldCheck },
  { name: 'SAP', icon: Buildings },
  { name: 'Microsoft', icon: GridFour },
  { name: 'Workday', icon: ChartBar },
  { name: 'Infor', icon: CompassTool },
  { name: 'NetSuite', icon: Bank },
  { name: 'AWS', icon: GlobeHemisphereWest },
]

const pillars = [
  {
    icon: Lightning,
    title: 'Streamlined',
    copy: 'Launch planning cycles faster with structured workflows your teams can actually maintain.',
  },
  {
    icon: UsersThree,
    title: 'Connected',
    copy: 'Link finance truth with operational ownership so every manager can plan with confidence.',
  },
  {
    icon: CompassTool,
    title: 'Strategic',
    copy: 'Model scenarios and tradeoffs before committing budgets, assumptions, and resources.',
  },
  {
    icon: Robot,
    title: 'Intelligent',
    copy: 'Use AI Help Agent and Insight Agent to assist decisions without replacing accountability.',
  },
]

const capabilityTracks = [
  {
    title: 'Platform Foundation',
    body: 'A governed FP&A platform built for both finance leaders and operational managers.',
    bullets: ['Budgeting and forecasting', 'Management reporting', 'Financial modelling', 'Variance analytics'],
  },
  {
    title: 'Deployment and Ownership',
    body: 'Own your platform without long consulting dependency and still meet enterprise controls.',
    bullets: ['Cloud, on-premise, or hybrid', 'ERP agnostic integrations', 'Role-based governance', 'Implementation in weeks'],
  },
  {
    title: 'Assistive AI Layer',
    body: 'AI features are practical collaborators for teams that need faster answers and cleaner cycles.',
    bullets: ['AI Help Agent for in-platform guidance', 'Insight Agent for trend signals', 'Prompted what-if support', 'Human-led approvals'],
  },
]

const socialProofCards = [
  {
    title: 'Mining Group',
    quote: 'Finance and operations finally worked from one planning language across departments.',
    impact: 'Shorter planning cycles with tighter accountability.',
  },
  {
    title: 'Education Network',
    quote: 'Department heads could understand budget impact without waiting for specialist support.',
    impact: 'Better ownership from non-financial managers.',
  },
  {
    title: 'Financial Services Enterprise',
    quote: 'Scenario planning became a practical weekly rhythm, not a quarterly scramble.',
    impact: 'Faster strategic decisions with consistent governance.',
  },
]

const resourceCards = [
  {
    title: 'Collaborative Budgeting Guide',
    copy: 'How to move from finance-only planning to distributed ownership at enterprise scale.',
  },
  {
    title: 'FP&A Software Evaluation Framework',
    copy: 'A practical checklist for platform fit, deployment risk, and long-term maintainability.',
  },
  {
    title: 'AI in FP&A: Assistive vs Autonomous',
    copy: 'A decision framework for finance leaders adopting AI safely and responsibly.',
  },
]

function MockImage({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(28,31,94,0.16)_0%,transparent_52%),radial-gradient(circle_at_78%_84%,rgba(59,130,246,0.14)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(122deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.86)_48%,rgba(255,255,255,0.18)_100%)]" />
      <div className="absolute bottom-3 left-3 rounded-full border border-[#e2e8f0] bg-white/92 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1C1F5E]">
        {label}
      </div>
    </div>
  )
}

export default function Page11() {
  return (
    <main style={{ backgroundColor: palette.surface, color: palette.ink }} className="min-h-screen overflow-x-hidden">
      <MockupElevenNav />

      <section className="px-8 pb-20 pt-28 sm:px-12 xl:px-20">
        <div className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-[94rem] items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] xl:gap-16">
          <div className="relative h-[300px] sm:h-[390px] lg:h-[500px]">
            <div className="absolute inset-0 [mask-image:radial-gradient(126%_112%_at_50%_50%,black_62%,transparent_100%)] [-webkit-mask-image:radial-gradient(126%_112%_at_50%_50%,black_62%,transparent_100%)]">
              <AnimationDepartmentFlowsSlate />
            </div>
          </div>

          <div className="mx-auto w-full max-w-[34rem] lg:mx-0">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#64748B]">Finance in flow</p>
            <h1 className="mt-5 font-manrope text-[1.95rem] font-extrabold leading-[1.08] tracking-[-0.024em] text-[#1C1F5E] sm:text-[2.35rem] lg:text-[2.75rem]">
              Financial intelligence shouldn&apos;t be locked in Finance.
            </h1>
            <p className="mt-6 text-[1rem] leading-relaxed text-[#475569]">
              Built for managers, loved by CFOs. IDU helps teams understand the impact of decisions before they
              become expensive.
            </p>

            <p className="mt-5 text-[0.92rem] font-semibold leading-relaxed text-[#334155]">
              Africa&apos;s leading financial planning solution. Trusted by global enterprises across Africa, Europe, the
              Middle East, and North America.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
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
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-10 xl:px-14">
        <div className="mx-auto max-w-[96rem]">
          <div className="space-y-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="logo-belt-shell py-2">
              <div className="logo-belt-track-forward">
                {[0, 1].map((setIndex) => (
                  <div key={`a-set-${setIndex}`} className="logo-belt-set">
                    {[...logoBeltA, ...logoBeltA].map((item, idx) => {
                      const Icon = item.icon
                      return (
                        <span
                          key={`belt-a-${setIndex}-${item.name}-${idx}`}
                          className="logo-wordmark flex min-w-[8.8rem] flex-col items-center text-sm font-semibold uppercase tracking-[0.16em] text-[#64748B]"
                        >
                          <span className="logo-mark mb-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#dce3ef] bg-white/85 text-[#64748B]">
                            <Icon size={14} weight="bold" />
                          </span>
                          {item.name}
                        </span>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="logo-belt-shell py-2">
              <div className="logo-belt-track-reverse">
                {[0, 1].map((setIndex) => (
                  <div key={`b-set-${setIndex}`} className="logo-belt-set">
                    {[...logoBeltB, ...logoBeltB].map((item, idx) => {
                      const Icon = item.icon
                      return (
                        <span
                          key={`belt-b-${setIndex}-${item.name}-${idx}`}
                          className="logo-wordmark flex min-w-[8.8rem] flex-col items-center text-sm font-semibold uppercase tracking-[0.16em] text-[#64748B]"
                        >
                          <span className="logo-mark mb-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#dce3ef] bg-white/85 text-[#64748B]">
                            <Icon size={14} weight="bold" />
                          </span>
                          {item.name}
                        </span>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 xl:px-14">
        <div className="mx-auto grid max-w-[92rem] gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#64748B]">Why IDU</p>
            <h2 className="mt-4 font-manrope text-3xl font-semibold leading-tight text-[#1C1F5E] sm:text-4xl">
              Shared clarity creates accountable performance.
            </h2>
          </div>
          <div className="rounded-3xl border border-[#dfe7f4] bg-[linear-gradient(155deg,rgba(255,255,255,0.96)_0%,rgba(248,250,252,0.96)_100%)] p-7 shadow-[0_30px_60px_-46px_rgba(28,31,94,0.3)]">
            <p className="text-sm leading-relaxed text-[#475569]">
              Your ERP stores the truth. IDU makes sure the right people can understand it, shape it, and act on it.
              The result is distributed ownership with finance-grade control.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#64748B]">
              This is the model we have refined since 1997: connect the finance team&apos;s standards with operational
              manager reality in one governed planning environment.
            </p>
            <div className="mt-6 h-px w-full bg-[#e2e8f0]" />
            <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
              <span>25+ years</span>
              <span>Founder-led</span>
              <span>Global deployment</span>
              <span>Enterprise proven</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 xl:px-14">
        <div className="mx-auto max-w-[92rem]">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#64748B]">How It Works</p>
            <h3 className="mt-4 font-manrope text-3xl font-semibold leading-tight text-[#1C1F5E] sm:text-4xl">
              Four pillars that turn planning into execution.
            </h3>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <article key={pillar.title} className="group rounded-2xl border border-[#dfe7f4] bg-[linear-gradient(165deg,rgba(255,255,255,0.96)_0%,rgba(248,250,252,0.94)_100%)] p-6 shadow-[0_24px_44px_-38px_rgba(28,31,94,0.34)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_54px_-34px_rgba(28,31,94,0.4)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(145deg,#f8faff_0%,#eef2ff_100%)] text-[#1C1F5E]">
                    <Icon size={18} weight="bold" />
                  </div>
                  <h4 className="mt-4 font-manrope text-lg font-semibold text-[#1C1F5E]">{pillar.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{pillar.copy}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 xl:px-14">
        <div className="mx-auto max-w-[92rem] rounded-3xl border border-[#dfe7f4] bg-[linear-gradient(160deg,rgba(255,255,255,0.97)_0%,rgba(248,250,252,0.96)_100%)] p-8 shadow-[0_36px_74px_-52px_rgba(28,31,94,0.3)] sm:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#64748B]">Platform Detail</p>
              <h3 className="mt-2 font-manrope text-3xl font-semibold text-[#1C1F5E] sm:text-4xl">
                Practical capability depth for evaluation-stage buyers.
              </h3>
            </div>
            <Link href="/platform" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1C1F5E]">
              Explore Full Platform
              <ArrowUpRight size={16} weight="bold" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {capabilityTracks.map((track) => (
              <article key={track.title} className="rounded-2xl border border-[#e1e8f4] bg-[linear-gradient(165deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[0_18px_34px_-30px_rgba(15,23,42,0.35)]">
                <h4 className="font-manrope text-lg font-semibold text-[#1C1F5E]">{track.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{track.body}</p>
                <ul className="mt-4 space-y-2">
                  {track.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-[#334155]">
                      <CheckCircle size={15} weight="fill" className="mt-0.5 text-[#1C1F5E]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 xl:px-14">
        <div className="mx-auto max-w-[92rem]">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#64748B]">Customer Outcomes</p>
            <h3 className="mt-4 font-manrope text-3xl font-semibold leading-tight text-[#1C1F5E] sm:text-4xl">
              Evidence from teams balancing financial control and operational ownership.
            </h3>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {socialProofCards.map((card) => (
              <article key={card.title} className="rounded-2xl border border-[#dfe7f4] bg-[linear-gradient(165deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[0_20px_34px_-30px_rgba(15,23,42,0.34)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748B]">{card.title}</p>
                <p className="mt-3 text-base leading-relaxed text-[#1C1F5E]">{card.quote}</p>
                <p className="mt-4 text-sm text-[#475569]">{card.impact}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 xl:px-14">
        <div className="mx-auto max-w-[92rem] rounded-3xl border border-[#dfe7f4] bg-[linear-gradient(160deg,rgba(255,255,255,0.97)_0%,rgba(248,250,252,0.96)_100%)] p-8 shadow-[0_36px_74px_-52px_rgba(28,31,94,0.3)] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#64748B]">Resources</p>
              <h3 className="mt-2 font-manrope text-3xl font-semibold text-[#1C1F5E] sm:text-4xl">
                Answer-first content for modern finance and operations teams.
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#64748B]">
                Publish practical guidance that buyers can trust and AI engines can cite: direct definitions, clear
                frameworks, and current product facts.
              </p>
              <div className="mt-6 rounded-2xl border border-[#e6ecf3] bg-[linear-gradient(165deg,#ffffff_0%,#f8fafc_100%)] p-4 shadow-[0_16px_30px_-26px_rgba(15,23,42,0.36)]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">Freshness Signal</p>
                <p className="mt-2 text-sm text-[#334155]">Last updated: March 2026</p>
              </div>
            </div>

            <div className="space-y-4">
              {resourceCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-[#e6ecf3] bg-[linear-gradient(165deg,#ffffff_0%,#f8fafc_100%)] p-5 shadow-[0_16px_30px_-26px_rgba(15,23,42,0.35)]">
                  <h4 className="font-manrope text-lg font-semibold text-[#1C1F5E]">{card.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{card.copy}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <article className="rounded-2xl border border-[#e6ecf3] bg-[linear-gradient(165deg,#ffffff_0%,#f8fafc_100%)] p-5 shadow-[0_16px_30px_-26px_rgba(15,23,42,0.35)]">
              <h4 className="font-manrope text-lg font-semibold text-[#1C1F5E]">Governed Collaboration Surface</h4>
              <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                Structured planning workspaces with role clarity and approval control.
              </p>
              <MockImage label="Planning Workspace" className="mt-4 aspect-[16/9] border border-[#e4eaf3]" />
            </article>
            <article className="rounded-2xl border border-[#e6ecf3] bg-[linear-gradient(165deg,#ffffff_0%,#f8fafc_100%)] p-5 shadow-[0_16px_30px_-26px_rgba(15,23,42,0.35)]">
              <h4 className="font-manrope text-lg font-semibold text-[#1C1F5E]">Operational Alignment Snapshot</h4>
              <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                Shared views that keep finance and department managers aligned to one source of truth.
              </p>
              <MockImage label="Alignment Dashboard" className="mt-4 aspect-[16/9] border border-[#e4eaf3]" />
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 pt-10 sm:px-10 xl:px-14">
        <div
          className="mx-auto max-w-[92rem] rounded-[2rem] px-8 py-10 text-white sm:px-10"
          style={{ backgroundColor: palette.primary }}
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <IDULogoMark className="h-8 w-auto text-[#F8FAFC]" />
              <h3 className="mt-4 font-manrope text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Believe in shared financial ownership. Prove it with IDU.
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/82">
                The intelligent FP&A platform connecting finance teams with the managers who drive results.
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

      <footer className="border-t border-[#e2e8f0] bg-[#F8FAFC] px-6 pb-10 pt-14 sm:px-10 xl:px-14">
        <div className="mx-auto max-w-[92rem]">
          <div className="flex flex-col gap-6 border-b border-[#e2e8f0] pb-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <IDULogoMark className="h-8 w-auto text-[#1C1F5E]" />
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[#64748B]">
                Finance in flow. Built for managers, trusted by finance.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/about/partners"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: palette.primary }}
              >
                Partner with IDU
                <ArrowUpRight size={14} weight="bold" />
              </Link>
            </div>
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
    </main>
  )
}
