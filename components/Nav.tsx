'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { megaMenuData } from './navMenuData'

const basePath = process.env.NODE_ENV === 'production' ? '/IDU-mock-up' : ''

const menuGlowStyles: Record<string, { background: string; boxShadow: string }> = {
  Company: {
    background: 'linear-gradient(135deg, rgba(251,191,36,0.38) 0%, rgba(245,158,11,0.22) 40%, rgba(251,191,36,0.08) 100%)',
    boxShadow: 'inset -40px 0 80px -20px rgba(251,191,36,0.35)',
  },
  'Knowledge Center': {
    background: 'linear-gradient(135deg, rgba(59,130,246,0.35) 0%, rgba(99,102,241,0.2) 50%, rgba(59,130,246,0.06) 100%)',
    boxShadow: 'inset -40px 0 80px -20px rgba(59,130,246,0.3)',
  },
  'Global Success': {
    background: 'linear-gradient(135deg, rgba(34,197,94,0.35) 0%, rgba(16,185,129,0.2) 50%, rgba(34,197,94,0.06) 100%)',
    boxShadow: 'inset -40px 0 80px -20px rgba(34,197,94,0.3)',
  },
  Platform: {
    background: 'linear-gradient(135deg, rgba(168,85,247,0.38) 0%, rgba(139,92,246,0.22) 50%, rgba(168,85,247,0.08) 100%)',
    boxShadow: 'inset -40px 0 80px -20px rgba(168,85,247,0.35)',
  },
  Solutions: {
    background: 'linear-gradient(135deg, rgba(6,182,212,0.35) 0%, rgba(14,165,233,0.2) 50%, rgba(6,182,212,0.06) 100%)',
    boxShadow: 'inset -40px 0 80px -20px rgba(6,182,212,0.3)',
  },
}

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
          {[...megaMenuData].reverse().map((item, index) => (
            <div
              key={item.label}
              className="relative"
onMouseEnter={() => setOpenIndex(megaMenuData.length - 1 - index)}
                >
                  <button
                    type="button"
                    className="flex items-center shrink-0 whitespace-nowrap px-4 py-2 rounded-lg text-white/90 text-sm font-manrope hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {item.label}
                    <Chevron open={openIndex === megaMenuData.length - 1 - index} />
                  </button>

              {openIndex === megaMenuData.length - 1 - index && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-2 min-w-[640px]"
                  onMouseEnter={() => setOpenIndex(megaMenuData.length - 1 - index)}
                >
                  <div
                    className="rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black/60 overflow-hidden backdrop-blur-xl"
                    style={{
                      boxShadow:
                        '0 25px 50px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
                    }}
                  >
                    <div className="flex min-h-[280px]">
                      <div className="flex flex-wrap gap-x-10 gap-y-6 p-8 flex-1">
                        {item.groups.map((group) => (
                          <div key={group.title} className="min-w-[180px]">
                            <p className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3 font-manrope">
                              {group.title}
                            </p>
                            <ul className="space-y-2">
                              {group.links.map((link) => (
                                <li key={link.label}>
                                  <Link
                                    href={link.href ?? '#'}
                                    className="block text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg py-1.5 px-2 -mx-2 transition-colors font-manrope"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div
                        className="w-56 shrink-0 border-l border-white/5 animate-menu-glow"
                        style={menuGlowStyles[item.label]}
                      />
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
            Markup 3
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
