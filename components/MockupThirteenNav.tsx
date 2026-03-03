'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, CaretDown, Check, Moon, Sun } from '@phosphor-icons/react'
import IDULogoMark from './IDULogoMark'
import { megaMenuData } from './navMenuData'

type MockupThirteenNavProps = {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
  language: string
  setLanguage: (value: string) => void
}

const languages = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'French' },
  { code: 'pt', label: 'Portuguese' },
]

export default function MockupThirteenNav({
  darkMode,
  setDarkMode,
  language,
  setLanguage,
}: MockupThirteenNavProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [accessOpen, setAccessOpen] = useState(false)
  const [navHidden, setNavHidden] = useState(false)
  const accessRef = useRef<HTMLDivElement>(null)
  const lastScrollYRef = useRef(0)
  const menuItems = megaMenuData

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (accessRef.current && !accessRef.current.contains(event.target as Node)) {
        setAccessOpen(false)
      }
    }
    window.addEventListener('mousedown', onPointerDown)
    return () => window.removeEventListener('mousedown', onPointerDown)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      const previousY = lastScrollYRef.current

      if (currentY > previousY + 4 && currentY > 80) {
        setNavHidden(true)
        setOpenIndex(null)
        setAccessOpen(false)
      } else if (currentY < previousY - 4 || currentY <= 24) {
        setNavHidden(false)
      }

      lastScrollYRef.current = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-transform duration-300 sm:px-6 ${navHidden ? '-translate-y-[130%]' : 'translate-y-0'}`}
      onMouseLeave={() => setOpenIndex(null)}
    >
      <nav
        className="relative mx-auto grid h-16 w-full max-w-[92rem] grid-cols-[1fr_auto_1fr] items-center rounded-full border px-3 backdrop-blur-2xl"
        style={{
          borderColor: darkMode ? 'rgba(226,232,240,0.28)' : 'rgba(203,213,225,0.7)',
          backgroundColor: darkMode ? 'rgba(15,23,42,0.44)' : 'rgba(255,255,255,0.52)',
          boxShadow: darkMode
            ? '0 20px 46px -36px rgba(2,6,23,0.88), inset 0 1px 0 rgba(255,255,255,0.12)'
            : '0 20px 46px -36px rgba(15,23,42,0.36), inset 0 1px 0 rgba(255,255,255,0.7)',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-full"
          style={{
            background: darkMode
              ? 'linear-gradient(125deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 46%, rgba(255,255,255,0.1) 100%)'
              : 'linear-gradient(125deg, rgba(255,255,255,0.76) 0%, rgba(255,255,255,0.16) 46%, rgba(255,255,255,0.62) 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-5 top-0 z-0 h-px"
          style={{ backgroundColor: darkMode ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.9)' }}
        />

        <Link href="/" className="relative z-10 ml-2 flex items-center justify-self-start" style={{ color: darkMode ? '#F8FAFC' : '#1C1F5E' }}>
          <IDULogoMark className="h-7 w-auto" />
        </Link>

        <div className="relative z-10 hidden items-center justify-self-center gap-1 lg:flex">
          {menuItems.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={item.label} className="relative" onMouseEnter={() => setOpenIndex(index)}>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors"
                  style={{
                    color: darkMode ? 'rgba(226,232,240,0.92)' : 'rgba(28,31,94,0.85)',
                    backgroundColor: isOpen ? (darkMode ? 'rgba(255,255,255,0.08)' : '#eef2f9') : 'transparent',
                  }}
                >
                  {item.label}
                  <CaretDown size={12} weight="bold" className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                    <div
                      className="max-h-[70vh] max-w-[94vw] overflow-auto rounded-3xl border p-5"
                      style={{
                        borderColor: darkMode ? 'rgba(203,213,225,0.2)' : '#dce6f6',
                        backgroundColor: darkMode ? 'rgba(15,23,42,0.92)' : '#ffffff',
                        boxShadow: darkMode
                          ? '0 28px 70px -44px rgba(2,6,23,0.92)'
                          : '0 28px 70px -44px rgba(15,23,42,0.4)',
                      }}
                    >
                      <div className="grid w-max grid-flow-col auto-cols-[minmax(14rem,max-content)] gap-3">
                        {item.groups.map((group) => (
                          <div
                            key={group.title}
                            className="rounded-2xl border p-4"
                            style={{
                              borderColor: darkMode ? 'rgba(203,213,225,0.16)' : '#e5ecf7',
                              backgroundColor: darkMode ? 'rgba(255,255,255,0.04)' : '#f8fafc',
                            }}
                          >
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: darkMode ? '#94a3b8' : '#64748B' }}>
                              {group.title}
                            </p>
                            <ul className="mt-3 space-y-1.5">
                              {group.links.map((link) => (
                                <li key={link.label}>
                                  <Link
                                    href={link.href ?? '#'}
                                    className="block rounded-lg px-2 py-1.5 text-sm leading-relaxed transition-colors"
                                    style={{ color: darkMode ? '#e2e8f0' : '#1C1F5E' }}
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

        <div className="relative z-10 flex items-center justify-self-end gap-2 pr-1">
          <div className="relative" ref={accessRef}>
            <button
              type="button"
              onClick={() => setAccessOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-1 py-2 text-sm font-medium transition-opacity hover:opacity-80"
              style={{
                color: darkMode ? '#e2e8f0' : '#1C1F5E',
                backgroundColor: 'transparent',
              }}
            >
              Accessibility
              <CaretDown size={12} weight="bold" className={`transition-transform duration-200 ${accessOpen ? 'rotate-180' : ''}`} />
            </button>

            {accessOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-[17rem] rounded-2xl border p-3 shadow-2xl"
                style={{
                  borderColor: darkMode ? 'rgba(203,213,225,0.2)' : '#dce6f6',
                  backgroundColor: darkMode ? 'rgba(15,23,42,0.97)' : '#ffffff',
                }}
              >
                <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: darkMode ? '#94a3b8' : '#64748B' }}>
                  Language
                </p>
                <div className="mt-2 space-y-1">
                  {languages.map((item) => (
                    <button
                      type="button"
                      key={item.code}
                      onClick={() => setLanguage(item.code)}
                      className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm transition-colors"
                      style={{
                        color: darkMode ? '#e2e8f0' : '#1C1F5E',
                        backgroundColor:
                          language === item.code ? (darkMode ? 'rgba(255,255,255,0.09)' : '#eef2f9') : 'transparent',
                      }}
                    >
                      <span>{item.label}</span>
                      {language === item.code && <Check size={14} weight="bold" />}
                    </button>
                  ))}
                </div>

                <div className="my-2 h-px" style={{ backgroundColor: darkMode ? 'rgba(203,213,225,0.16)' : '#e5ecf7' }} />

                <button
                  type="button"
                  onClick={() => setDarkMode(!darkMode)}
                  className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm transition-colors"
                  style={{
                    color: darkMode ? '#e2e8f0' : '#1C1F5E',
                    backgroundColor: darkMode ? 'rgba(255,255,255,0.09)' : '#f8fafc',
                  }}
                >
                  <span>{darkMode ? 'Switch to light mode' : 'Switch to dark mode'}</span>
                  {darkMode ? <Sun size={15} weight="bold" /> : <Moon size={15} weight="bold" />}
                </button>
              </div>
            )}
          </div>

          <Link
            href="/demo"
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors hover:opacity-95"
            style={{ backgroundColor: darkMode ? '#334155' : '#1C1F5E' }}
          >
            Book a Demo
            <ArrowUpRight size={14} weight="bold" />
          </Link>
        </div>
      </nav>
    </header>
  )
}
