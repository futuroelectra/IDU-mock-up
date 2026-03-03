'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { megaMenuData } from './navMenuData'

const basePath = process.env.NODE_ENV === 'production' ? '/IDU-mock-up' : ''

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    className={`w-3.5 h-3.5 ml-0.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
      clipRule="evenodd"
    />
  </svg>
)

export default function Nav() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-md"
      onMouseLeave={() => setOpenIndex(null)}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">
        <Link href="/" className="flex items-center shrink-0 z-10">
          <Image
            src={`${basePath}/idu-logo.png`}
            alt="IDU"
            width={120}
            height={49}
            className="h-8 w-auto"
            unoptimized
          />
        </Link>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 shrink-0">
          {megaMenuData.map((item, index) => (
            <div
              key={item.label}
              className="relative"
onMouseEnter={() => setOpenIndex(index)}
                >
                  <button
                    type="button"
                    className="flex items-center shrink-0 whitespace-nowrap px-4 py-2 rounded-lg text-white/90 text-sm font-manrope hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {item.label}
                    <Chevron open={openIndex === index} />
                  </button>

              {openIndex === index && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-2"
                  onMouseEnter={() => setOpenIndex(index)}
                >
                  <div
                    className="max-w-[94vw] rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-2xl shadow-black/60 backdrop-blur-xl"
                    style={{
                      boxShadow:
                        '0 25px 50px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
                    }}
                  >
                    <div className="grid w-max grid-flow-col auto-cols-[minmax(180px,max-content)] gap-x-8 gap-y-6">
                      {item.groups.map((group) => (
                        <div key={group.title}>
                          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50 font-manrope">
                            {group.title}
                          </p>
                          <ul className="space-y-2">
                            {group.links.map((link) => (
                              <li key={link.label}>
                                <Link
                                  href={link.href ?? '#'}
                                  className="block rounded-lg py-1.5 px-2 -mx-2 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors font-manrope"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="z-10 flex items-center gap-2">
          <Link
            href="/3"
            className="hidden shrink-0 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white sm:inline-flex"
          >
            Mockup 3
          </Link>
          <Link
            href="/8"
            className="hidden shrink-0 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white sm:inline-flex"
          >
            Mockup 8
          </Link>
          <Link
            href="/9"
            className="hidden shrink-0 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white lg:inline-flex"
          >
            Mockup 9
          </Link>
          <Link
            href="/10"
            className="hidden shrink-0 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white xl:inline-flex"
          >
            Mockup 10
          </Link>
          <Link
            href="/11"
            className="hidden shrink-0 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white 2xl:inline-flex"
          >
            Mockup 11
          </Link>
          <Link
            href="#"
            className="shrink-0 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Call us
          </Link>
        </div>
      </nav>
    </header>
  )
}
