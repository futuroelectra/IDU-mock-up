'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type MenuColumn = {
  title: string
  links: string[]
}

type MenuItem = {
  label: string
  columns: MenuColumn[]
}

const basePath = process.env.NODE_ENV === 'production' ? '/IDU-mock-up' : ''

const menuItems: MenuItem[] = [
  {
    label: 'Solutions',
    columns: [
      { title: 'Plan', links: ['Budgeting', 'Forecasting', 'Scenario Modeling'] },
      { title: 'Optimize', links: ['Cash Flow', 'Workforce Planning', 'Capex Planning'] },
      { title: 'Coordinate', links: ['Department Alignment', 'Project Visibility', 'Risk Signals'] },
    ],
  },
  {
    label: 'Platform',
    columns: [
      { title: 'Core', links: ['Unified Data Model', 'Workflow Automation', 'Version Control'] },
      { title: 'Trust', links: ['Security Controls', 'Role Permissions', 'Audit Trails'] },
      { title: 'Connect', links: ['ERP Integrations', 'Data Connectors', 'Open APIs'] },
    ],
  },
  {
    label: 'Customers',
    columns: [
      { title: 'Industries', links: ['Financial Services', 'Healthcare', 'Manufacturing'] },
      { title: 'Stories', links: ['Transformation Journeys', 'Global Rollouts', 'Operational Wins'] },
      { title: 'Outcomes', links: ['Faster Planning Cycles', 'Higher Forecast Accuracy', 'Stronger Ownership'] },
    ],
  },
  {
    label: 'Resources',
    columns: [
      { title: 'Learn', links: ['Guides', 'Playbooks', 'Short Courses'] },
      { title: 'Explore', links: ['Webinars', 'Benchmark Reports', 'Use-Case Library'] },
      { title: 'Support', links: ['Documentation', 'Implementation Paths', 'Best Practices'] },
    ],
  },
  {
    label: 'Partners',
    columns: [
      { title: 'Network', links: ['Advisory Partners', 'Delivery Partners', 'Regional Specialists'] },
      { title: 'Programs', links: ['Partner Enablement', 'Co-Sell Motion', 'Certification'] },
      { title: 'Grow', links: ['Market Expansion', 'Joint Value Propositions', 'Success Planning'] },
    ],
  },
  {
    label: 'About',
    columns: [
      { title: 'Company', links: ['Vision', 'Leadership', 'Culture'] },
      { title: 'News', links: ['Announcements', 'Events', 'Press Resources'] },
      { title: 'Careers', links: ['Open Roles', 'Hiring Process', 'Life at IDU'] },
    ],
  },
]

function ChevronDown({ open, lightMode }: { open: boolean; lightMode: boolean }) {
  return (
    <svg
      className={`h-3 w-3 transition-transform duration-200 ${open ? 'rotate-180' : ''} ${
        lightMode ? 'text-[#204a92]/70' : 'text-white/70'
      }`}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4.22 5.97a.75.75 0 0 1 1.06 0L8 8.69l2.72-2.72a.75.75 0 0 1 1.06 1.06L8.53 10.28a.75.75 0 0 1-1.06 0L4.22 7.03a.75.75 0 0 1 0-1.06Z" />
    </svg>
  )
}

export default function MarkupThreeNav() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [isHidden, setIsHidden] = useState(false)
  const [lightMode, setLightMode] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY

      if (currentY < 20) {
        setIsHidden(false)
      } else if (currentY > lastScrollY.current && currentY > 72) {
        setIsHidden(true)
      } else if (currentY < lastScrollY.current) {
        setIsHidden(false)
      }

      const lightStart = document.getElementById('nav-light-start')
      if (lightStart) {
        setLightMode(lightStart.getBoundingClientRect().top <= 104)
      } else {
        setLightMode(currentY > window.innerHeight * 0.7)
      }

      setOpenIndex(null)
      lastScrollY.current = currentY
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const logoSrc = lightMode ? `${basePath}/idu-inverted-logo.png` : `${basePath}/idu-logo.png`

  const navGlassStyle = lightMode
    ? {
        background:
          'linear-gradient(112deg, rgba(255,255,255,0.92) 0%, rgba(242,247,255,0.9) 35%, rgba(236,244,255,0.9) 100%)',
        boxShadow:
          '0 24px 52px -40px rgba(37,87,170,0.42), inset 0 1px 0 rgba(255,255,255,0.88), inset 0 -1px 0 rgba(141,176,236,0.34)',
      }
    : {
        background:
          'linear-gradient(110deg, rgba(255,255,255,0.16) 0%, rgba(127,179,255,0.11) 25%, rgba(83,137,232,0.08) 55%, rgba(255,255,255,0.14) 100%)',
        boxShadow:
          '0 24px 56px -38px rgba(45,145,255,0.9), inset 0 1px 0 rgba(255,255,255,0.58), inset 0 -1px 0 rgba(255,255,255,0.15)',
      }

  const dropdownStyle = lightMode
    ? {
        background:
          'linear-gradient(125deg, rgba(255,255,255,0.97) 0%, rgba(245,250,255,0.97) 55%, rgba(250,252,255,0.98) 100%)',
        boxShadow:
          '0 28px 55px -36px rgba(31,78,153,0.35), inset 0 1px 0 rgba(255,255,255,0.92), inset 0 -1px 0 rgba(189,211,247,0.45)',
      }
    : {
        background:
          'linear-gradient(125deg, rgba(8,18,54,0.92) 0%, rgba(10,30,74,0.9) 45%, rgba(7,18,47,0.95) 100%)',
        boxShadow: '0 30px 60px -30px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.22)',
      }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-all duration-500 sm:px-6 ${
        isHidden ? '-translate-y-24 opacity-0' : 'translate-y-0 opacity-100'
      }`}
      onMouseLeave={() => setOpenIndex(null)}
    >
      <nav className="mx-auto max-w-[88rem]">
        <div
          className={`relative flex h-16 items-center rounded-full border px-2 backdrop-blur-2xl ${
            lightMode ? 'border-[#bdd4f5]' : 'border-white/20'
          }`}
          style={navGlassStyle}
        >
          <div
            className={`pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${
              lightMode ? 'via-[#ffffff]' : 'via-white/85'
            }`}
          />

          <div className="flex h-full w-44 items-center pl-2">
            <Link href="/" className="relative z-10 flex shrink-0 items-center">
              <Image src={logoSrc} alt="IDU" width={120} height={49} className="h-8 w-auto" unoptimized />
            </Link>
          </div>

          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 lg:flex">
            {menuItems.map((item, index) => {
              const isOpen = openIndex === index
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenIndex(index)}
                  onFocus={() => setOpenIndex(index)}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1 rounded-full px-3 py-2 text-sm transition-all duration-200 ${
                      lightMode
                        ? 'text-[#153771]/85 hover:bg-[#e7f0ff] hover:text-[#0d2a5e]'
                        : 'text-white/85 hover:bg-white/12 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown open={isOpen} lightMode={lightMode} />
                  </button>

                  {isOpen && (
                    <div className="absolute left-1/2 top-full w-[min(96vw,920px)] -translate-x-1/2 pt-3">
                      <div
                        className={`rounded-3xl border p-4 backdrop-blur-2xl ${
                          lightMode ? 'border-[#d4e3fb]' : 'border-white/24'
                        }`}
                        style={dropdownStyle}
                      >
                        <div className="grid grid-cols-3 gap-3">
                          {item.columns.map((column) => (
                            <div
                              key={column.title}
                              className={`rounded-2xl border p-4 ${
                                lightMode ? 'border-[#d8e6fd] bg-[#f6faff]' : 'border-white/14 bg-[#0d2255]/72'
                              }`}
                            >
                              <p
                                className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
                                  lightMode ? 'text-[#2f5ea8]' : 'text-blue-100/92'
                                }`}
                              >
                                {column.title}
                              </p>
                              <ul className="mt-3 space-y-1.5">
                                {column.links.map((link) => (
                                  <li key={link}>
                                    <Link
                                      href="#"
                                      className={`block rounded-lg px-2 py-1.5 text-sm transition-colors ${
                                        lightMode
                                          ? 'text-[#1d3e75] hover:bg-[#e8f2ff]'
                                          : 'text-white/90 hover:bg-white/12 hover:text-white'
                                      }`}
                                    >
                                      {link}
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

          <div className="ml-auto flex h-full w-44 items-center justify-end pr-2">
            <Link
              href="#"
              className={`inline-flex shrink-0 items-center rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                lightMode
                  ? 'border border-[#19498f] bg-[#123f84] text-white hover:bg-[#0f3876]'
                  : 'border border-black/15 bg-white text-[#0f2f68] hover:bg-white/92'
              }`}
            >
              CTA
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
