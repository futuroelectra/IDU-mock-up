import Link from 'next/link'
import MarkupThreeNav from '@/components/MarkupThreeNav'
import CursorNetworkPanel from '@/components/CursorNetworkPanel'

const capabilityCards = [
  {
    title: 'Adaptive Forecasting',
    copy: 'Move from static annual cycles to rolling forecasts that update with live operational signals.',
  },
  {
    title: 'Cross-Team Ownership',
    copy: 'Give department leaders clear budget accountability without forcing finance-heavy workflows.',
  },
  {
    title: 'Decision Velocity',
    copy: 'Shorten planning cycles with aligned assumptions, structured approvals, and immediate visibility.',
  },
]

const pillars = [
  {
    label: 'PLAN',
    title: 'Design Resilient Scenarios',
    copy: 'Build plans around likely, upside, and stress conditions so leadership decisions are never single-path.',
  },
  {
    label: 'ALIGN',
    title: 'Coordinate Every Department',
    copy: 'Connect strategy, operations, and finance through one model that keeps teams synchronized.',
  },
  {
    label: 'EXECUTE',
    title: 'Track Impact in Real Time',
    copy: 'Watch performance against plan continuously and adjust before variance becomes risk.',
  },
]

const roleCards = [
  {
    title: 'For Finance Leaders',
    copy: 'Gain governance, auditability, and confidence in every model version without slowing teams down.',
    outcome: 'Outcome: stronger control with faster decisions.',
  },
  {
    title: 'For Operational Teams',
    copy: 'Work with clean, human-centered planning flows that remove spreadsheet sprawl and confusion.',
    outcome: 'Outcome: higher adoption and clearer accountability.',
  },
]

const executionFlow = [
  'Define strategic targets and constraints.',
  'Translate targets into department plans.',
  'Monitor live performance and variances.',
  'Run guided re-forecast cycles with confidence.',
]

export default function Page3() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#060224] text-white">
      <div
        className="fixed inset-0 -z-20"
        style={{
          background:
            'radial-gradient(circle at 16% 9%, rgba(36, 104, 210, 0.34) 0%, rgba(7, 2, 40, 0) 46%), radial-gradient(circle at 78% 36%, rgba(22, 126, 244, 0.3) 0%, rgba(7, 2, 40, 0) 42%), linear-gradient(180deg, #04011f 0%, #060224 38%, #091a45 68%, #dfeaf9 100%)',
        }}
      />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.04)_0%,transparent_30%)]" />

      <MarkupThreeNav />

      <section className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-6xl items-center px-6 pb-20 pt-36 sm:pt-40">
        <div className="grid w-full gap-10 md:grid-cols-[1.06fr_1fr] md:items-center">
          <div>
            <h1
              className="font-manrope text-[2.65rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-transparent sm:text-[3.35rem] lg:text-[4rem]"
              style={{
                backgroundImage:
                  'linear-gradient(100deg, #ffffff 0%, rgba(248,252,255,0.97) 35%, rgba(223,236,255,0.72) 65%, rgba(151,177,226,0.16) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}
            >
              Africa&apos;s leading financial planning solution.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-blue-50/78">
              Trusted by global enterprises across Africa, Europe, the Middle East, and North America.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3.5">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl border border-amber-300/45 bg-[#f0a01f] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f3ab30] hover:shadow-[0_16px_34px_-18px_rgba(255,181,66,0.95)]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Book a Demo
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/12 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Explore IDU
              </a>
            </div>
          </div>

          <div className="mx-auto h-[320px] w-full max-w-[620px] sm:h-[390px] lg:h-[440px]">
            <CursorNetworkPanel />
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 pt-12 text-white">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/16 bg-white/[0.045] p-8 backdrop-blur-xl sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-100/70">Planning Reinvented</p>
          <div className="mt-5 grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-end">
            <h2 className="font-manrope text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Replace financial drag with connected, high-velocity planning.
            </h2>
            <p className="text-base leading-relaxed text-blue-50/72">
              IDU helps enterprises unify budgeting, forecasting, and execution in one clear operating rhythm.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {capabilityCards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-white/16 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-100/40 hover:bg-white/[0.075]"
              >
                <h3 className="font-manrope text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-blue-100/74">{card.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f9ff] px-6 py-24 text-[#102a58]">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2b65bf]">Core Capabilities</p>
            <h2 className="mt-4 font-manrope text-3xl font-semibold leading-tight text-[#081c43] sm:text-4xl">
              A modern operating layer for finance and business teams.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-3xl border border-[#d7e6ff] bg-white p-7 shadow-[0_30px_50px_-40px_rgba(38,88,170,0.65)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_38px_70px_-42px_rgba(38,88,170,0.78)]"
              >
                <p className="text-[11px] font-bold tracking-[0.22em] text-[#2f6fd2]">{pillar.label}</p>
                <h3 className="mt-4 font-manrope text-xl font-semibold text-[#0b2354]">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#35528b]">{pillar.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 pb-24 text-[#102a58]">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {roleCards.map((role) => (
            <article
              key={role.title}
              className="rounded-[2rem] border border-[#d8e6ff] bg-gradient-to-br from-white to-[#f2f7ff] p-8 shadow-[0_24px_46px_-38px_rgba(30,89,180,0.65)]"
            >
              <h3 className="font-manrope text-2xl font-semibold text-[#0b2354]">{role.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-[#35528b]">{role.copy}</p>
              <p className="mt-6 border-t border-[#d7e4f9] pt-5 text-sm font-semibold text-[#0f377a]">{role.outcome}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#eef4ff] px-6 py-24 text-[#102a58]">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[2rem] border border-[#d3e3ff] bg-white p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2b65bf]">Execution Loop</p>
            <h2 className="mt-4 max-w-3xl font-manrope text-3xl font-semibold leading-tight text-[#081c43] sm:text-4xl">
              One planning rhythm from boardroom direction to day-to-day delivery.
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-4">
              {executionFlow.map((item, index) => (
                <div
                  key={item}
                  className="group rounded-2xl border border-[#dbe8ff] bg-[#f9fbff] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#9ec2ff] hover:bg-white"
                >
                  <p className="text-[11px] font-semibold tracking-[0.2em] text-[#2f6fd2]">STEP {index + 1}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#27467f]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 pb-24 text-[#102a58]">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#d8e6ff] bg-gradient-to-r from-[#071c45] via-[#11306b] to-[#1c4a98] p-9 text-white sm:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/72">Enterprise Feedback</p>
              <blockquote className="mt-4 max-w-3xl font-manrope text-2xl font-medium leading-snug text-white sm:text-[2rem]">
                “IDU helped us eliminate disconnected planning routines and gave every team one trusted view of the
                plan.”
              </blockquote>
              <p className="mt-4 text-sm text-white/78">Finance Director, Multi-Entity Services Group</p>
            </div>
            <Link
              href="#"
              className="inline-flex h-fit items-center rounded-full border border-white/35 bg-white/14 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/24"
            >
              Start Your Evaluation
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
