import Link from 'next/link'
import Image from 'next/image'
import MarkupThreeNav from '@/components/MarkupThreeNav'
import CursorNetworkPanel from '@/components/CursorNetworkPanel'
import { megaMenuData } from '@/components/navMenuData'

const basePath = process.env.NODE_ENV === 'production' ? '/IDU-mock-up' : ''

const highlightCards = [
  {
    title: 'Forecast With Confidence',
    copy: 'Unify planning assumptions and move from monthly reporting to continuous decision support.',
  },
  {
    title: 'Operate With Accountability',
    copy: 'Give business leaders ownership through intuitive workflows and controlled financial guardrails.',
  },
  {
    title: 'Scale Across Regions',
    copy: 'Coordinate multi-entity and multi-currency planning in one connected operating model.',
  },
]

const capabilityPillars = [
  {
    label: 'Strategic Planning',
    title: 'Scenario Design',
    copy: 'Model multiple futures, test risk exposure, and commit to plans with stronger confidence.',
  },
  {
    label: 'Operational Planning',
    title: 'Department Alignment',
    copy: 'Link top-down targets with bottom-up execution so every team can contribute meaningfully.',
  },
  {
    label: 'Performance Insight',
    title: 'Live Visibility',
    copy: 'Track plan versus actual in real time and react before variance compounds into strategic drift.',
  },
]

const journeySteps = [
  'Set strategic priorities and guardrails.',
  'Translate targets into department plans.',
  'Monitor execution against live performance.',
  'Re-forecast with aligned assumptions.',
]

const proofStats = [
  { value: '40%', label: 'Faster planning cycles' },
  { value: '3x', label: 'Higher business participation' },
  { value: '99%', label: 'Decision traceability' },
]

const footerTopGroups = megaMenuData.filter((item) => item.label !== 'Solutions')
const solutionsItem = megaMenuData.find((item) => item.label === 'Solutions')
const solutionsLinks = solutionsItem ? solutionsItem.groups.flatMap((group) => group.links) : []

export default function Page3() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#0f2f68]">
      <MarkupThreeNav />

      <section className="relative min-h-screen overflow-hidden bg-[#050221] pt-32 text-white sm:pt-36">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 8% 20%, rgba(58,120,226,0.26) 0%, rgba(5,2,33,0) 42%), radial-gradient(circle at 78% 22%, rgba(24,102,209,0.29) 0%, rgba(5,2,33,0) 44%), linear-gradient(180deg, #04011d 0%, #07022d 100%)',
          }}
        />

        <div className="relative mx-auto grid min-h-[calc(100vh-9.5rem)] max-w-[94rem] items-center gap-14 px-6 pb-16 sm:px-8 sm:pb-20 lg:grid-cols-[1.2fr_0.96fr] xl:px-10">
          <div className="h-[340px] w-full sm:h-[440px] lg:h-[520px]">
            <CursorNetworkPanel />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-200/82">Enterprise Planning Platform</p>
            <h1
              className="mt-5 font-manrope text-[2.7rem] font-extrabold leading-[1.01] tracking-[-0.03em] text-transparent sm:text-[3.55rem] lg:text-[4.2rem]"
              style={{
                backgroundImage:
                  'linear-gradient(100deg, #ffffff 0%, rgba(247,250,255,0.97) 38%, rgba(213,228,255,0.65) 72%, rgba(120,150,210,0.18) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}
            >
              Africa&apos;s leading financial planning solution.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-blue-50/80">
              Trusted by global enterprises across Africa, Europe, the Middle East, and North America.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3.5">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl border border-[#f5be68]/35 bg-[#f0a01f] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f4ae32]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Book a Demo
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl border border-[#4f6692] bg-[#31466e] px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#283d64]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Explore IDU
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              {proofStats.map((item) => (
                <div key={item.label} className="rounded-xl border border-white/14 bg-white/[0.04] p-3">
                  <p className="font-manrope text-2xl font-bold text-white">{item.value}</p>
                  <p className="mt-1 text-xs text-blue-100/72">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      <section className="relative h-[38vh] min-h-[230px] overflow-hidden bg-[#050221]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(140% 120% at 50% -4%, rgba(126,169,238,0.32) 0%, rgba(126,169,238,0) 52%), linear-gradient(180deg, rgba(5,2,33,1) 0%, rgba(14,31,77,0.72) 42%, rgba(177,201,239,0.58) 72%, rgba(255,255,255,1) 100%)',
          }}
        />
      </section>

      <section id="nav-light-start" className="bg-white px-6 pb-24 pt-0 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[94rem] rounded-[2.1rem] border border-[#d7e4fb] bg-gradient-to-r from-white via-[#f8fbff] to-[#f6faff] p-8 shadow-[0_34px_70px_-56px_rgba(28,76,152,0.45)] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.06fr_1fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2f6cc6]">Planning Reinvented</p>
              <h2 className="mt-4 font-manrope text-3xl font-semibold leading-tight text-[#07275f] sm:text-4xl">
                Replace planning friction with a model your whole business can trust.
              </h2>
            </div>
            <p className="text-base leading-relaxed text-[#35558d]">
              IDU gives finance and operational teams one coordinated workflow from strategy to execution, with
              governance built in from day one.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {highlightCards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-[#dbe8ff] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#9ec2ff]"
              >
                <h3 className="font-manrope text-xl font-semibold text-[#0b2d67]">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#3c5b92]">{card.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8ff] px-6 py-24 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[94rem]">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2f6cc6]">Core Capabilities</p>
            <h2 className="mt-4 font-manrope text-3xl font-semibold leading-tight text-[#07275f] sm:text-4xl">
              Built for modern finance teams that need speed and strategic control.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {capabilityPillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-[1.8rem] border border-[#d8e6ff] bg-white p-7 shadow-[0_35px_60px_-50px_rgba(31,79,156,0.58)] transition-all duration-300 hover:-translate-y-1"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2f6cc6]">{pillar.label}</p>
                <h3 className="mt-4 font-manrope text-xl font-semibold text-[#0a2c67]">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#3b5b91]">{pillar.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[94rem] rounded-[2rem] border border-[#dae7ff] bg-gradient-to-r from-[#ffffff] via-[#f9fbff] to-[#f5f9ff] p-8 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2f6cc6]">Operating Rhythm</p>
              <h2 className="mt-4 font-manrope text-3xl font-semibold leading-tight text-[#07275f] sm:text-4xl">
                One connected loop from board-level direction to daily decisions.
              </h2>
            </div>
            <div className="grid gap-3">
              {journeySteps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-start gap-4 rounded-xl border border-[#dfeaff] bg-white p-4 transition-colors hover:border-[#9ec2ff]"
                >
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0f3f88] text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-[#2f4f86]">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#071d49] px-6 py-20 text-white sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[94rem]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-100/72">Enterprise Proof</p>
            <blockquote className="mt-4 max-w-4xl font-manrope text-2xl font-medium leading-snug sm:text-3xl">
              “IDU gave us one planning language across finance and operations, with cleaner accountability and faster
              decisions.”
            </blockquote>
            <p className="mt-4 text-sm text-blue-100/72">Finance Director, Multi-Entity Services Group</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#d7e5fd] bg-white px-6 pb-10 pt-14 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[94rem]">
          <div className="flex flex-col gap-6 border-b border-[#deebff] pb-10 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="w-fit">
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
              className="inline-flex w-fit items-center rounded-full border border-[#1d4f97] bg-[#113d7f] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0f356f]"
            >
              Partner with IDU
            </Link>
          </div>

          <nav className="grid grid-cols-2 gap-x-8 gap-y-10 pb-10 pt-10 md:grid-cols-4" aria-label="Site map">
            {footerTopGroups.map((item) => (
              <div key={item.label}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f2f68]">{item.label}</p>
                <ul className="mt-4 space-y-4">
                  {item.groups.map((group) => (
                    <li key={group.title}>
                      <p className="mb-1.5 text-[11px] uppercase tracking-[0.16em] text-[#5a78ad]">{group.title}</p>
                      <ul className="space-y-1.5">
                        {group.links.map((link) => (
                          <li key={link.label}>
                            <Link href={link.href ?? '#'} className="text-sm text-[#2d4e86] transition-colors hover:text-[#0f2f68]">
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
            <section className="border-t border-[#e5efff] pb-10 pt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f2f68]">{solutionsItem.label}</p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {solutionsLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href ?? '#'}
                    className="rounded-full border border-[#d7e6ff] bg-[#f7faff] px-3.5 py-1.5 text-sm text-[#2d4e86] transition-colors hover:border-[#abc8f8] hover:text-[#0f2f68]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#e5efff] pt-6">
            <p className="text-xs text-[#5a78ad]">© {new Date().getFullYear()} IDU. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-xs text-[#5a78ad] hover:text-[#0f2f68]">
                Privacy
              </Link>
              <Link href="#" className="text-xs text-[#5a78ad] hover:text-[#0f2f68]">
                Terms
              </Link>
              <Link href="#" className="text-xs text-[#5a78ad] hover:text-[#0f2f68]">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
