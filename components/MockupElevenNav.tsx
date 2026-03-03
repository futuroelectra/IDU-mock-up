'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, CaretDown } from '@phosphor-icons/react'
import IDULogoMark from './IDULogoMark'
import { megaMenuData } from './navMenuData'

export default function MockupElevenNav() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const menuItems = megaMenuData

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6" onMouseLeave={() => setOpenIndex(null)}>
      <nav className="mx-auto grid h-16 w-full max-w-[92rem] grid-cols-[1fr_auto_1fr] items-center rounded-full border border-[#d9e2f3] bg-white/86 px-3 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.45)] backdrop-blur-xl">
        <Link href="/" className="ml-2 flex items-center justify-self-start text-[#1C1F5E]">
          <IDULogoMark className="h-7 w-auto" />
        </Link>

        <div className="relative hidden items-center justify-self-center gap-1 lg:flex">
          {menuItems.map((item, index) => {
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
                  <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                    <div className="max-h-[70vh] max-w-[94vw] overflow-auto rounded-3xl border border-[#dce6f6] bg-white p-5 shadow-[0_28px_70px_-44px_rgba(15,23,42,0.4)]">
                      <div className="grid w-max grid-flow-col auto-cols-[minmax(14rem,max-content)] gap-3">
                        {item.groups.map((group) => (
                          <div key={group.title} className="rounded-2xl border border-[#e5ecf7] bg-[#f8fafc] p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#64748B]">{group.title}</p>
                            <ul className="mt-3 space-y-1.5">
                              {group.links.map((link) => (
                                <li key={link.label}>
                                  <Link
                                    href={link.href ?? '#'}
                                    className="block rounded-lg px-2 py-1.5 text-sm leading-relaxed text-[#1C1F5E] transition-colors hover:bg-white hover:text-[#0F172A]"
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

        <div className="flex items-center justify-self-end pr-1">
          <Link
            href="/demo"
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
