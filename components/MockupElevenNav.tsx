'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, CaretDown } from '@phosphor-icons/react'
import IDULogoMark from './IDULogoMark'
import { megaMenuData } from './navMenuData'

export default function MockupElevenNav() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6" onMouseLeave={() => setOpenIndex(null)}>
      <nav className="mx-auto flex h-16 w-full max-w-[92rem] items-center rounded-full border border-[#e2e8f0] bg-white/88 px-3 backdrop-blur-xl">
        <Link href="/" className="ml-2 flex items-center text-[#1C1F5E]">
          <IDULogoMark className="h-7 w-auto" />
        </Link>

        <div className="relative mx-auto hidden items-center gap-1 lg:flex">
          {megaMenuData.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={item.label} className="relative" onMouseEnter={() => setOpenIndex(index)}>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-[#1C1F5E]/85 transition-colors hover:bg-[#eef2f9] hover:text-[#0F172A]"
                >
                  {item.label}
                  <CaretDown size={12} weight="bold" className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="absolute left-1/2 top-full w-[min(95vw,980px)] -translate-x-1/2 pt-3">
                    <div className="rounded-3xl border border-[#dce6f6] bg-white p-4 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.38)]">
                      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {item.groups.map((group) => (
                          <div key={group.title} className="rounded-2xl border border-[#e5ecf7] bg-[#f8fafc] p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#64748B]">{group.title}</p>
                            <ul className="mt-3 space-y-1.5">
                              {group.links.map((link) => (
                                <li key={link.label}>
                                  <Link
                                    href={link.href ?? '#'}
                                    className="block rounded-lg px-2 py-1.5 text-sm text-[#1C1F5E] transition-colors hover:bg-white hover:text-[#0F172A]"
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
            )
          })}
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
            className="inline-flex items-center gap-1.5 rounded-full bg-[#1C1F5E] px-4 py-2 text-sm font-semibold text-white transition-colors hover:opacity-95"
          >
            Book a Demo
            <ArrowUpRight size={14} weight="bold" />
          </Link>
        </div>
      </nav>
    </header>
  )
}
