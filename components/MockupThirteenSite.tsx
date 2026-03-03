'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import IDULogoMark from '@/components/IDULogoMark'
import AnimationDepartmentFlowsSlate from '@/components/AnimationDepartmentFlowsSlate'
import MockupThirteenNav from '@/components/MockupThirteenNav'
import { megaMenuData } from '@/components/navMenuData'
import {
  ArrowRight,
  ArrowUpRight,
  Bank,
  Buildings,
  ChartBar,
  ChartLineUp,
  CheckCircle,
  CompassTool,
  Factory,
  GlobeHemisphereWest,
  GridFour,
  Lightning,
  Package,
  Robot,
  ShieldCheck,
  Sparkle,
  Storefront,
  UsersThree,
} from '@phosphor-icons/react/dist/ssr'

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
    icon: Factory,
    title: 'Mining Group',
    quote: 'Finance and operations finally worked from one planning language across departments.',
    impact: 'Shorter planning cycles with tighter accountability.',
  },
  {
    icon: UsersThree,
    title: 'Education Network',
    quote: 'Department heads could understand budget impact without waiting for specialist support.',
    impact: 'Better ownership from non-financial managers.',
  },
  {
    icon: ChartBar,
    title: 'Financial Services Enterprise',
    quote: 'Scenario planning became a practical weekly rhythm, not a quarterly scramble.',
    impact: 'Faster strategic decisions with consistent governance.',
  },
  {
    icon: ShieldCheck,
    title: 'Infrastructure Group',
    quote: 'Governance controls stayed intact while teams accelerated planning throughput.',
    impact: 'Cleaner approvals with less bottleneck risk.',
  },
  {
    icon: GlobeHemisphereWest,
    title: 'Global Multi-Entity',
    quote: 'Leadership got one coherent planning narrative across regions and departments.',
    impact: 'Stronger global visibility across cycles.',
  },
]

const whySignals = ['25 years', 'Enterprise Trusted', 'Global deployment']

export default function MockupThirteenSite() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('en')

  const theme = useMemo(
    () =>
      darkMode
        ? {
            surface: '#1C1F5E',
            primary: '#F8FAFC',
            ink: '#E6EBFF',
            muted: '#B5C0DF',
            secondaryText: '#D6DDF5',
            cardBorder: 'rgba(203,213,225,0.24)',
            cardBg: 'linear-gradient(160deg,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0.05)_100%)',
            softCardBg: 'linear-gradient(160deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.04)_100%)',
            shadow: '0 34px 70px -52px rgba(2,6,23,0.95)',
            chipBorder: 'rgba(203,213,225,0.22)',
            chipBg: 'rgba(255,255,255,0.07)',
            chipText: '#d7def6',
            ctaPrimary: '#FF4D00',
            ctaSecondary: '#334155',
            footerBg: '#141A56',
            footerBorder: 'rgba(203,213,225,0.18)',
          }
        : {
            surface: '#F8FAFC',
            primary: '#1C1F5E',
            ink: '#0F172A',
            muted: '#64748B',
            secondaryText: '#475569',
            cardBorder: '#dfe7f4',
            cardBg: 'linear-gradient(160deg,rgba(255,255,255,0.96)_0%,rgba(248,250,252,0.96)_100%)',
            softCardBg: 'linear-gradient(165deg,#ffffff_0%,#f8fafc_100%)',
            shadow: '0 34px 70px -52px rgba(28,31,94,0.32)',
            chipBorder: '#e2e8f0',
            chipBg: 'linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)',
            chipText: '#334155',
            ctaPrimary: '#FF4D00',
            ctaSecondary: '#1f2937',
            footerBg: '#F8FAFC',
            footerBorder: '#e2e8f0',
          },
    [darkMode]
  )

  return (
    <main style={{ backgroundColor: theme.surface, color: theme.ink }} className="min-h-screen overflow-x-hidden">
      <MockupThirteenNav darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} />

      <section className="px-8 pb-20 pt-28 sm:px-12 xl:px-20">
        <div className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-[94rem] items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] xl:gap-16">
          <div className="relative h-[300px] sm:h-[390px] lg:h-[500px]">
            <div className="absolute inset-0 [mask-image:radial-gradient(126%_112%_at_50%_50%,black_62%,transparent_100%)] [-webkit-mask-image:radial-gradient(126%_112%_at_50%_50%,black_62%,transparent_100%)]">
              <AnimationDepartmentFlowsSlate tone={darkMode ? 'dark' : 'blue'} />
            </div>
          </div>

          <div className="mx-auto w-full max-w-[34rem] lg:mx-0">
            <p className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: theme.muted }}>
              Finance in flow
            </p>
            <h1 className="mt-5 font-manrope text-[1.95rem] font-extrabold leading-[1.08] tracking-[-0.024em] sm:text-[2.35rem] lg:text-[2.75rem]" style={{ color: theme.primary }}>
              Financial intelligence shouldn&apos;t be locked in Finance.
            </h1>
            <p className="mt-6 text-[1rem] leading-relaxed" style={{ color: theme.secondaryText }}>
              Built for managers, loved by CFOs. IDU helps teams understand the impact of decisions before they
              become expensive.
            </p>

            <p className="mt-5 text-[0.92rem] font-semibold leading-relaxed" style={{ color: darkMode ? '#d8e0fc' : '#334155' }}>
              Trusted by global enterprises across Africa, Europe, the Middle East, and North America.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: theme.ctaPrimary }}
              >
                <Lightning size={16} weight="fill" />
                Book a Demo
              </Link>
              <Link
                href="/platform"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: theme.ctaSecondary }}
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
                          className="logo-wordmark flex min-w-[8.8rem] flex-col items-center text-sm font-semibold uppercase tracking-[0.16em]"
                          style={{ color: darkMode ? '#c7d1ed' : '#64748B' }}
                        >
                          <span
                            className="logo-mark mb-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full border text-[#64748B]"
                            style={{
                              borderColor: darkMode ? 'rgba(203,213,225,0.24)' : '#dce3ef',
                              backgroundColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.85)',
                              color: darkMode ? '#d8e0fc' : '#64748B',
                            }}
                          >
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
                          className="logo-wordmark flex min-w-[8.8rem] flex-col items-center text-sm font-semibold uppercase tracking-[0.16em]"
                          style={{ color: darkMode ? '#c7d1ed' : '#64748B' }}
                        >
                          <span
                            className="logo-mark mb-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full border"
                            style={{
                              borderColor: darkMode ? 'rgba(203,213,225,0.24)' : '#dce3ef',
                              backgroundColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.85)',
                              color: darkMode ? '#d8e0fc' : '#64748B',
                            }}
                          >
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
        <div className="mx-auto max-w-[92rem]">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: theme.muted }}>Why IDU</p>
            <h2 className="mt-4 font-manrope text-3xl font-semibold leading-tight sm:text-4xl" style={{ color: theme.primary }}>
              Shared clarity creates accountable performance.
            </h2>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: theme.secondaryText }}>
              Your ERP stores the truth. IDU makes sure the right people can understand it, shape it, and act on it.
              The result is distributed ownership with finance-grade control.
            </p>
            <div className="mx-auto mt-7 h-px w-40" style={{ backgroundColor: theme.cardBorder }} />
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-3xl border p-7 text-center sm:p-9" style={{ borderColor: theme.cardBorder, background: theme.cardBg, boxShadow: theme.shadow }}>
            <h3 className="font-manrope text-2xl font-semibold leading-tight sm:text-3xl" style={{ color: theme.primary }}>
              Africa&apos;s leading financial planning solution.
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed sm:text-[0.96rem]" style={{ color: theme.muted }}>
              Connect finance standards with operational reality in one governed planning platform. Teams can model
              tradeoffs faster, align decisions earlier, and execute with clearer accountability.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2.5">
              {whySignals.map((item) => (
                <span
                  key={item}
                  className="rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em]"
                  style={{ borderColor: theme.chipBorder, background: theme.chipBg, color: theme.chipText }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="pointer-events-none mx-auto mt-9 h-[10.5rem] max-w-5xl [mask-image:radial-gradient(122%_108%_at_50%_50%,black_58%,transparent_100%)] [-webkit-mask-image:radial-gradient(122%_108%_at_50%_50%,black_58%,transparent_100%)] sm:h-[11.5rem]">
            <AnimationDepartmentFlowsSlate tone={darkMode ? 'dark' : 'blue'} cursorForce={0.19} trackGlobalPointer />
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 xl:px-14">
        <div className="mx-auto max-w-[92rem]">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: theme.muted }}>How It Works</p>
            <h3 className="mt-4 font-manrope text-3xl font-semibold leading-tight sm:text-4xl" style={{ color: theme.primary }}>
              Four pillars that turn planning into execution.
            </h3>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <article
                  key={pillar.title}
                  className="group rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ borderColor: theme.cardBorder, background: theme.cardBg, boxShadow: theme.shadow }}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: darkMode ? 'rgba(255,255,255,0.12)' : 'linear-gradient(145deg,#f8faff_0%,#eef2ff_100%)', color: theme.primary }}
                  >
                    <Icon size={18} weight="bold" />
                  </div>
                  <h4 className="mt-4 font-manrope text-lg font-semibold" style={{ color: theme.primary }}>{pillar.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: theme.muted }}>{pillar.copy}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 xl:px-14">
        <div className="mx-auto max-w-[92rem] rounded-3xl border p-8 sm:p-10" style={{ borderColor: theme.cardBorder, background: theme.cardBg, boxShadow: theme.shadow }}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: theme.muted }}>Platform Detail</p>
              <h3 className="mt-2 font-manrope text-3xl font-semibold sm:text-4xl" style={{ color: theme.primary }}>
                Practical capability depth for evaluation-stage buyers.
              </h3>
            </div>
            <Link href="/platform" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: theme.primary }}>
              Explore Full Platform
              <ArrowUpRight size={16} weight="bold" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {capabilityTracks.map((track) => (
              <article key={track.title} className="rounded-2xl border p-6" style={{ borderColor: theme.cardBorder, background: theme.softCardBg }}>
                <h4 className="font-manrope text-lg font-semibold" style={{ color: theme.primary }}>{track.title}</h4>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: theme.muted }}>{track.body}</p>
                <ul className="mt-4 space-y-2">
                  {track.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm" style={{ color: darkMode ? '#d6def7' : '#334155' }}>
                      <CheckCircle size={15} weight="fill" className="mt-0.5" style={{ color: theme.primary }} />
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
            <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: theme.muted }}>Customer Outcomes</p>
            <h3 className="mt-4 font-manrope text-3xl font-semibold leading-tight sm:text-4xl" style={{ color: theme.primary }}>
              Evidence from teams balancing financial control and operational ownership.
            </h3>
          </div>

          <div className="mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="outcome-marquee-track">
              {[0, 1].map((setIndex) => (
                <div key={`outcomes-${setIndex}`} className="outcome-marquee-set">
                  {socialProofCards.map((card, idx) => {
                    const Icon = card.icon
                    return (
                      <article
                        key={`${card.title}-${setIndex}-${idx}`}
                        className="w-[21rem] shrink-0 rounded-2xl border p-6"
                        style={{ borderColor: theme.cardBorder, background: theme.cardBg, boxShadow: theme.shadow }}
                      >
                        <div
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                          style={{ background: darkMode ? 'rgba(255,255,255,0.12)' : 'linear-gradient(145deg,#f8faff_0%,#eef2ff_100%)', color: theme.primary }}
                        >
                          <Icon size={18} weight="bold" />
                        </div>
                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: theme.muted }}>
                          {card.title}
                        </p>
                        <p className="mt-3 text-base leading-relaxed" style={{ color: theme.primary }}>
                          {card.quote}
                        </p>
                        <p className="mt-4 text-sm" style={{ color: theme.secondaryText }}>
                          {card.impact}
                        </p>
                      </article>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 pt-10 sm:px-10 xl:px-14">
        <div
          className="mx-auto max-w-[92rem] rounded-[2rem] px-8 py-10 text-white sm:px-10"
          style={{
            background: darkMode ? 'linear-gradient(145deg,#374151_0%,#4b5563_100%)' : '#1C1F5E',
            border: darkMode ? '1px solid rgba(203,213,225,0.2)' : '1px solid rgba(255,255,255,0.08)',
            boxShadow: darkMode ? '0 34px 74px -56px rgba(2,6,23,0.82)' : undefined,
          }}
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <IDULogoMark className="h-8 w-auto text-[#F8FAFC]" />
              <h3 className="mt-4 font-manrope text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Believe in shared financial ownership. Prove it with IDU.
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed" style={{ color: darkMode ? 'rgba(241,245,249,0.86)' : 'rgba(255,255,255,0.82)' }}>
                The intelligent FP&A platform connecting finance teams with the managers who drive results.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#FF4D00' }}
              >
                Schedule a Demo
                <ArrowUpRight size={16} weight="bold" />
              </Link>
              <Link
                href="/platform"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white"
                style={{ backgroundColor: darkMode ? '#0f172a' : '#1f2937' }}
              >
                View Platform
                <ArrowRight size={15} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t px-6 pb-10 pt-14 sm:px-10 xl:px-14" style={{ borderColor: theme.footerBorder, backgroundColor: theme.footerBg }}>
        <div className="mx-auto max-w-[92rem]">
          <div className="flex flex-col gap-6 border-b pb-10 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: theme.footerBorder }}>
            <div>
              <IDULogoMark className="h-8 w-auto" style={{ color: darkMode ? '#F8FAFC' : '#1C1F5E' }} />
              <p className="mt-3 max-w-md text-sm leading-relaxed" style={{ color: theme.muted }}>
                Finance in flow. Built for managers, trusted by finance.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/about/partners"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: darkMode ? '#334155' : '#1C1F5E' }}
              >
                Partner with IDU
                <ArrowUpRight size={14} weight="bold" />
              </Link>
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-x-8 gap-y-10 pb-10 pt-10 md:grid-cols-5" aria-label="Site map">
            {megaMenuData.map((item) => (
              <div key={item.label}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: theme.primary }}>{item.label}</p>
                <ul className="mt-4 space-y-4">
                  {item.groups.map((group) => (
                    <li key={group.title}>
                      <p className="mb-1.5 text-[11px] uppercase tracking-[0.16em]" style={{ color: theme.muted }}>{group.title}</p>
                      <ul className="space-y-1.5">
                        {group.links.map((link) => (
                          <li key={link.label}>
                            <Link href={link.href ?? '#'} className="text-sm transition-colors" style={{ color: darkMode ? '#d6def7' : '#334155' }}>
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

          <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-6" style={{ borderColor: theme.footerBorder }}>
            <p className="text-xs" style={{ color: theme.muted }}>© {new Date().getFullYear()} IDU. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm" style={{ color: theme.muted }}>
              <Link href="#" className="transition-colors hover:opacity-80">
                Privacy
              </Link>
              <Link href="#" className="transition-colors hover:opacity-80">
                Terms
              </Link>
              <Link href="#" className="transition-colors hover:opacity-80">
                Security
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
