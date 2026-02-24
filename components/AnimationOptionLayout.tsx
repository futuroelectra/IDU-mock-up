import type { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MockupThreeNav from './MockupThreeNav'
import { megaMenuData } from './navMenuData'

const basePath = process.env.NODE_ENV === 'production' ? '/IDU-mock-up' : ''
const footerTopGroups = megaMenuData.filter((item) => item.label !== 'Solutions')
const solutionsItem = megaMenuData.find((item) => item.label === 'Solutions')
const solutionsLinks = solutionsItem ? solutionsItem.groups.flatMap((group) => group.links) : []

const proofStats = [
  { value: '40%', label: 'Faster planning cycles' },
  { value: '3x', label: 'Higher business participation' },
  { value: '99%', label: 'Decision traceability' },
]

type VariantKey = 'flow' | 'orbs' | 'rings' | 'matrix' | 'liquid'

type AnimationOptionLayoutProps = {
  optionLabel: string
  conceptTitle: string
  conceptCopy: string
  animation: ReactNode
  swapSides?: boolean
  variant: VariantKey
}

const variantCards: Record<VariantKey, Array<{ title: string; copy: string }>> = {
  flow: [
    { title: 'Department Streams', copy: 'Translate strategy into connected planning lanes business teams can follow.' },
    { title: 'Finance Guardrails', copy: 'Keep governance embedded while every team participates in cycle planning.' },
    { title: 'Rapid Reforecasting', copy: 'Adjust plans quickly without rebuilding process structure each quarter.' },
  ],
  orbs: [
    { title: 'Shared Accountability', copy: 'Model interdependent ownership across planning decisions and operational outcomes.' },
    { title: 'Balanced Priorities', copy: 'Reweight plans as business context shifts, without losing financial discipline.' },
    { title: 'Human-Centered Inputs', copy: 'Make non-financial engagement straightforward in every planning cycle.' },
  ],
  rings: [
    { title: 'Allocation Orbit', copy: 'Visualize how budgets circulate through teams with controlled rebalancing.' },
    { title: 'Rolling Decisions', copy: 'Keep strategic and operational decisions in one connected cadence.' },
    { title: 'Stability Under Change', copy: 'Absorb volatility while preserving planning rhythm and confidence.' },
  ],
  matrix: [
    { title: 'Structured Planning Grid', copy: 'Coordinate teams with clear lanes, dependencies, and decision paths.' },
    { title: 'Signal Propagation', copy: 'See how one decision ripples through budget, resourcing, and execution.' },
    { title: 'Execution Clarity', copy: 'Move from static spreadsheets to a transparent operational planning model.' },
  ],
  liquid: [
    { title: 'Liquid Decision Surface', copy: 'Surface planning pressure in real time while preserving financial guardrails.' },
    { title: '3D Participation Model', copy: 'Represent every business input as a live object in one controlled planning field.' },
    { title: 'Calm Under Volatility', copy: 'Absorb rapid change without turning enterprise planning into noise.' },
  ],
}

const variantQuotes: Record<VariantKey, string> = {
  flow: '“The process finally feels connected. Our business units can contribute without finance losing control.”',
  orbs: '“We now make planning decisions with confidence because tradeoffs are visible and ownership is clear.”',
  rings: '“The model stays stable even when priorities shift. That changed how we run planning leadership meetings.”',
  matrix: '“Everyone can see how one decision impacts the rest of the organization. Execution improved immediately.”',
  liquid: '“This experience finally makes planning feel modern. Complex decisions are visible, shared, and actionable.”',
}

const variantAuthors: Record<VariantKey, string> = {
  flow: 'Group FP&A Lead',
  orbs: 'Regional Finance Director',
  rings: 'Enterprise Planning Manager',
  matrix: 'Chief Operating Officer',
  liquid: 'Global Head of Planning Transformation',
}

function SectionOne({ variant, conceptTitle, conceptCopy }: { variant: VariantKey; conceptTitle: string; conceptCopy: string }) {
  const cards = variantCards[variant]
  return (
    <section id="nav-light-start" className="bg-white px-6 pb-24 pt-0 sm:px-8 xl:px-10">
      <div className="mx-auto max-w-[94rem]">
        <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-[#d7e4fb] bg-gradient-to-r from-white via-[#f8fbff] to-[#f6faff] p-8 shadow-[0_28px_60px_-52px_rgba(28,76,152,0.45)] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2f6cc6]">Animation Rationale</p>
            <h2 className="mt-4 font-manrope text-3xl font-semibold leading-tight text-[#07275f] sm:text-4xl">{conceptTitle}</h2>
            <p className="mt-5 max-w-4xl text-base leading-relaxed text-[#35558d]">{conceptCopy}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {cards.map((card) => (
                <span
                  key={card.title}
                  className="rounded-full border border-[#d8e6ff] bg-[#f7fbff] px-3.5 py-1.5 text-xs font-medium text-[#2a4f88]"
                >
                  {card.title}
                </span>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-[#dae8ff] bg-white p-6 shadow-[0_26px_54px_-48px_rgba(28,76,152,0.44)] sm:p-8">
            <div className="aspect-[16/10] rounded-2xl border border-[#d8e7ff] bg-gradient-to-br from-[#f7fbff] via-white to-[#edf4ff] p-5">
              <div className="grid h-full gap-3 sm:grid-cols-2">
                {cards.map((card) => (
                  <div key={card.title} className="rounded-xl border border-[#d8e6ff] bg-white p-4">
                    <p className="text-sm font-semibold text-[#12396f]">{card.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-[#47679f]">{card.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function SectionTwo({ variant }: { variant: VariantKey }) {
  if (variant === 'flow') {
    return (
      <section className="bg-[#f4f8ff] px-6 py-24 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[94rem]">
          <h3 className="font-manrope text-3xl font-semibold text-[#07275f] sm:text-4xl">Flow-Led Planning Loop</h3>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {['Strategic Inputs', 'Department Plans', 'Finance Review', 'Live Reforecast'].map((step, index) => (
              <article key={step} className="rounded-2xl border border-[#d8e6ff] bg-white p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2f6cc6]">Step {index + 1}</p>
                <p className="mt-2 text-sm font-medium text-[#12396f]">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'orbs') {
    return (
      <section className="bg-[#f4f8ff] px-6 py-24 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[94rem] grid gap-6 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-[2rem] border border-[#d8e6ff] bg-white p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2f6cc6]">For Finance</p>
            <p className="mt-4 text-2xl font-semibold text-[#0d2f67]">Control and confidence without process drag.</p>
          </article>
          <article className="rounded-[2rem] border border-[#d8e6ff] bg-white p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2f6cc6]">For Operations</p>
            <p className="mt-4 text-2xl font-semibold text-[#0d2f67]">Clear ownership and simpler participation in planning.</p>
          </article>
        </div>
      </section>
    )
  }

  if (variant === 'rings') {
    return (
      <section className="bg-[#f4f8ff] px-6 py-24 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[94rem] grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[2rem] border border-[#d8e6ff] bg-white p-8">
            <h3 className="font-manrope text-3xl font-semibold text-[#07275f]">Allocation Strategy Board</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {['Workforce', 'Projects', 'Regional Growth'].map((name) => (
                <div key={name} className="rounded-xl border border-[#d8e6ff] bg-[#f8fbff] p-4">
                  <p className="text-sm font-semibold text-[#12396f]">{name}</p>
                  <p className="mt-1 text-xs text-[#47679f]">Placeholder module</p>
                </div>
              ))}
            </div>
          </article>
          <article className="rounded-[2rem] border border-[#d8e6ff] bg-white p-8">
            <div className="aspect-[4/3] rounded-2xl border border-[#d8e6ff] bg-gradient-to-br from-[#f7fbff] to-[#eef5ff]" />
          </article>
        </div>
      </section>
    )
  }

  if (variant === 'liquid') {
    return (
      <section className="bg-[#f4f8ff] px-6 py-24 sm:px-8 xl:px-10">
        <div className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[2rem] border border-[#d8e6ff] bg-white p-8 shadow-[0_28px_56px_-48px_rgba(31,80,155,0.4)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2f6cc6]">Interactive Planning Layer</p>
            <h3 className="mt-4 font-manrope text-3xl font-semibold text-[#07275f]">One workspace where business input and finance logic stay in sync.</h3>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {['Strategic Priorities', 'Operating Inputs', 'Capital Decisions'].map((item) => (
                <div key={item} className="rounded-xl border border-[#d8e6ff] bg-[#f8fbff] p-4">
                  <p className="text-sm font-semibold text-[#12396f]">{item}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#47679f]">Placeholder module</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-[#d8e6ff] bg-white p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2f6cc6]">Design Signal</p>
            <div className="mt-4 grid gap-3">
              <div className="h-12 rounded-xl border border-[#d8e6ff] bg-gradient-to-r from-[#f7fbff] to-[#ecf5ff]" />
              <div className="h-12 rounded-xl border border-[#d8e6ff] bg-gradient-to-r from-[#f6faff] to-white" />
              <div className="h-28 rounded-2xl border border-[#d8e6ff] bg-[#f7fbff]" />
            </div>
          </article>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#f4f8ff] px-6 py-24 sm:px-8 xl:px-10">
      <div className="mx-auto max-w-[94rem]">
        <h3 className="font-manrope text-3xl font-semibold text-[#07275f] sm:text-4xl">Planning Matrix Modules</h3>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-[#d8e6ff] bg-white p-6 md:col-span-2">
            <p className="text-lg font-semibold text-[#12396f]">Decision Dependencies</p>
            <div className="mt-4 aspect-[16/7] rounded-xl border border-[#d8e6ff] bg-[#f8fbff]" />
          </article>
          <article className="rounded-2xl border border-[#d8e6ff] bg-white p-6">
            <p className="text-lg font-semibold text-[#12396f]">Risk Signals</p>
            <div className="mt-4 space-y-3">
              <div className="h-10 rounded-lg border border-[#d8e6ff] bg-[#f8fbff]" />
              <div className="h-10 rounded-lg border border-[#d8e6ff] bg-[#f8fbff]" />
              <div className="h-10 rounded-lg border border-[#d8e6ff] bg-[#f8fbff]" />
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function SectionThree({ variant }: { variant: VariantKey }) {
  return (
    <section className="bg-white px-6 py-24 sm:px-8 xl:px-10">
      <div className="mx-auto max-w-[94rem] grid gap-6 md:grid-cols-3">
        {variantCards[variant].map((card) => (
          <article key={card.title} className="rounded-2xl border border-[#d8e6ff] bg-gradient-to-br from-white to-[#f4f8ff] p-7">
            <h4 className="font-manrope text-xl font-semibold text-[#0d2f67]">{card.title}</h4>
            <p className="mt-3 text-sm leading-relaxed text-[#3d5f95]">{card.copy}</p>
            <div className="mt-5 h-28 rounded-xl border border-[#d8e6ff] bg-[#f7fbff]" />
          </article>
        ))}
      </div>
    </section>
  )
}

function SectionFour({ variant }: { variant: VariantKey }) {
  return (
    <section className="bg-[#071d49] px-6 py-20 text-white sm:px-8 xl:px-10">
      <div className="mx-auto max-w-[94rem]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-100/72">Enterprise Proof</p>
        <blockquote className="mt-4 max-w-4xl font-manrope text-2xl font-medium leading-snug sm:text-3xl">{variantQuotes[variant]}</blockquote>
        <p className="mt-4 text-sm text-blue-100/72">{variantAuthors[variant]}</p>
      </div>
    </section>
  )
}

function FullFooter() {
  return (
    <footer className="border-t border-[#d7e5fd] bg-white px-6 pb-10 pt-14 sm:px-8 xl:px-10">
      <div className="mx-auto max-w-[94rem]">
        <div className="flex flex-col gap-6 border-b border-[#deebff] pb-10 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="w-fit">
            <Image src={`${basePath}/idu-inverted-logo.png`} alt="IDU" width={120} height={49} className="h-8 w-auto" unoptimized />
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
            <Link href="#" className="text-xs text-[#5a78ad] hover:text-[#0f2f68]">Privacy</Link>
            <Link href="#" className="text-xs text-[#5a78ad] hover:text-[#0f2f68]">Terms</Link>
            <Link href="#" className="text-xs text-[#5a78ad] hover:text-[#0f2f68]">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function AnimationOptionLayout({
  optionLabel,
  conceptTitle,
  conceptCopy,
  animation,
  swapSides = false,
  variant,
}: AnimationOptionLayoutProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#0f2f68]">
      <MockupThreeNav />

      <section className="relative min-h-screen overflow-hidden bg-[#050221] pt-32 text-white sm:pt-36">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 8% 20%, rgba(58,120,226,0.26) 0%, rgba(5,2,33,0) 42%), radial-gradient(circle at 78% 22%, rgba(24,102,209,0.29) 0%, rgba(5,2,33,0) 44%), linear-gradient(180deg, #04011d 0%, #07022d 100%)',
          }}
        />

        <div className="relative mx-auto grid min-h-[calc(100vh-9.5rem)] max-w-[94rem] items-center gap-14 px-6 pb-16 sm:px-8 sm:pb-20 lg:grid-cols-[1.2fr_0.96fr] xl:px-10">
          <div className={`h-[340px] w-full sm:h-[440px] lg:h-[520px] ${swapSides ? 'lg:order-2' : ''}`}>{animation}</div>

          <div className={swapSides ? 'lg:order-1' : ''}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-200/82">{optionLabel}</p>
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
                className="inline-flex items-center gap-2 rounded-xl bg-[#232833] px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1d222c]"
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

      <SectionOne variant={variant} conceptTitle={conceptTitle} conceptCopy={conceptCopy} />
      <SectionTwo variant={variant} />
      <SectionThree variant={variant} />
      <SectionFour variant={variant} />
      <FullFooter />
    </main>
  )
}
