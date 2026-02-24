import type { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MarkupThreeNav from './MarkupThreeNav'

const basePath = process.env.NODE_ENV === 'production' ? '/IDU-mock-up' : ''

const proofStats = [
  { value: '40%', label: 'Faster planning cycles' },
  { value: '3x', label: 'Higher business participation' },
  { value: '99%', label: 'Decision traceability' },
]

type AnimationOptionLayoutProps = {
  optionLabel: string
  conceptTitle: string
  conceptCopy: string
  animation: ReactNode
  swapSides?: boolean
}

export default function AnimationOptionLayout({
  optionLabel,
  conceptTitle,
  conceptCopy,
  animation,
  swapSides = false,
}: AnimationOptionLayoutProps) {
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

      <section id="nav-light-start" className="bg-white px-6 pb-20 pt-0 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[94rem] rounded-[2rem] border border-[#d7e4fb] bg-gradient-to-r from-white via-[#f8fbff] to-[#f6faff] p-8 shadow-[0_28px_60px_-52px_rgba(28,76,152,0.45)] sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2f6cc6]">Animation Rationale</p>
          <h2 className="mt-4 font-manrope text-3xl font-semibold leading-tight text-[#07275f] sm:text-4xl">
            {conceptTitle}
          </h2>
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-[#35558d]">{conceptCopy}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/3"
              className="rounded-full border border-[#d4e4ff] bg-white px-4 py-2 text-sm text-[#224a87] transition-colors hover:border-[#abc8f8] hover:text-[#12366f]"
            >
              Compare with Markup 3
            </Link>
            <Link
              href="/4"
              className="rounded-full border border-[#d4e4ff] bg-white px-4 py-2 text-sm text-[#224a87] transition-colors hover:border-[#abc8f8] hover:text-[#12366f]"
            >
              Open Markup 4
            </Link>
            <Link
              href="/5"
              className="rounded-full border border-[#d4e4ff] bg-white px-4 py-2 text-sm text-[#224a87] transition-colors hover:border-[#abc8f8] hover:text-[#12366f]"
            >
              Open Markup 5
            </Link>
            <Link
              href="/6"
              className="rounded-full border border-[#d4e4ff] bg-white px-4 py-2 text-sm text-[#224a87] transition-colors hover:border-[#abc8f8] hover:text-[#12366f]"
            >
              Open Markup 6
            </Link>
            <Link
              href="/7"
              className="rounded-full border border-[#d4e4ff] bg-white px-4 py-2 text-sm text-[#224a87] transition-colors hover:border-[#abc8f8] hover:text-[#12366f]"
            >
              Open Markup 7
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#d7e5fd] bg-white px-6 pb-10 pt-12 sm:px-8 xl:px-10">
        <div className="mx-auto flex max-w-[94rem] items-center justify-between gap-6">
          <Image
            src={`${basePath}/idu-inverted-logo.png`}
            alt="IDU"
            width={120}
            height={49}
            className="h-8 w-auto"
            unoptimized
          />
          <Link
            href="#"
            className="inline-flex items-center rounded-full border border-[#1d4f97] bg-[#113d7f] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0f356f]"
          >
            Partner with IDU
          </Link>
        </div>
      </footer>
    </main>
  )
}
