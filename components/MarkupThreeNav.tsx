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
  teaserTitle: string
  teaserCopy: string
}

const basePath = process.env.NODE_ENV === 'production' ? '/IDU-mock-up' : ''

const menuItems: MenuItem[] = [
  {
    label: 'Solutions',
    columns: [
      {
        title: 'Plan',
        links: ['Budgeting', 'Forecasting', 'Scenario Modeling'],
      },
      {
        title: 'Optimize',
        links: ['Cash Flow', 'Workforce Planning', 'Capex Planning'],
      },
      {
        title: 'Coordinate',
        links: ['Department Alignment', 'Project Visibility', 'Risk Signals'],
      },
    ],
    teaserTitle: 'Make Every Number Actionable',
    teaserCopy: 'Move from annual budgets to continuous planning with fast, trusted decision loops.',
  },
  {
    label: 'Platform',
    columns: [
      {
        title: 'Core',
        links: ['Unified Data Model', 'Workflow Automation', 'Version Control'],
      },
      {
        title: 'Trust',
        links: ['Security Controls', 'Role Permissions', 'Audit Trails'],
      },
      {
        title: 'Connect',
        links: ['ERP Integrations', 'Data Connectors', 'Open APIs'],
      },
    ],
    teaserTitle: 'Enterprise Foundation',
    teaserCopy: 'Built for multi-entity complexity without sacrificing speed, clarity, or adoption.',
  },
  {
    label: 'Customers',
    columns: [
      {
        title: 'Industries',
        links: ['Financial Services', 'Healthcare', 'Manufacturing'],
      },
      {
        title: 'Stories',
        links: ['Transformation Journeys', 'Global Rollouts', 'Operational Wins'],
      },
      {
        title: 'Outcomes',
        links: ['Faster Planning Cycles', 'Higher Forecast Accuracy', 'Stronger Ownership'],
      },
    ],
    teaserTitle: 'Proven in Real Operations',
    teaserCopy: 'Teams across regions and business units run cleaner planning with less friction.',
  },
  {
    label: 'Resources',
    columns: [
      {
        title: 'Learn',
        links: ['Guides', 'Playbooks', 'Short Courses'],
      },
      {
        title: 'Explore',
        links: ['Webinars', 'Benchmark Reports', 'Use-Case Library'],
      },
      {
        title: 'Support',
        links: ['Documentation', 'Implementation Paths', 'Best Practices'],
      },
    ],
    teaserTitle: 'Knowledge for Finance Leaders',
    teaserCopy: 'Practical frameworks and templates your teams can apply immediately.',
  },
  {
    label: 'Partners',
    columns: [
      {
        title: 'Network',
        links: ['Advisory Partners', 'Delivery Partners', 'Regional Specialists'],
      },
      {
        title: 'Programs',
        links: ['Partner Enablement', 'Co-Sell Motion', 'Certification'],
      },
      {
        title: 'Grow',
        links: ['Market Expansion', 'Joint Value Propositions', 'Success Planning'],
      },
    ],
    teaserTitle: 'Built for Collaboration',
    teaserCopy: 'Work with a partner ecosystem designed to scale adoption and business impact.',
  },
  {
    label: 'About',
    columns: [
      {
        title: 'Company',
        links: ['Vision', 'Leadership', 'Culture'],
      },
      {
        title: 'News',
        links: ['Announcements', 'Events', 'Press Resources'],
      },
      {
        title: 'Careers',
        links: ['Open Roles', 'Hiring Process', 'Life at IDU'],
      },
    ],
    teaserTitle: 'People Behind the Product',
    teaserCopy: 'A team focused on helping organizations build confidence in every planning decision.',
  },
]

const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    className={`h-3 w-3 text-white/70 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M4.22 5.97a.75.75 0 0 1 1.06 0L8 8.69l2.72-2.72a.75.75 0 0 1 1.06 1.06L8.53 10.28a.75.75 0 0 1-1.06 0L4.22 7.03a.75.75 0 0 1 0-1.06Z" />
  </svg>
)

export default function MarkupThreeNav() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [isHidden, setIsHidden] = useState(false)
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
      lastScrollY.current = currentY
      setOpenIndex(null)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-all duration-500 sm:px-6 ${
        isHidden ? '-translate-y-24 opacity-0' : 'translate-y-0 opacity-100'
      }`}
      onMouseLeave={() => setOpenIndex(null)}
    >
      <nav className="mx-auto max-w-6xl">
        <div
          className="relative flex h-16 items-center rounded-full border border-white/20 px-2 backdrop-blur-2xl"
          style={{
            background:
              'linear-gradient(110deg, rgba(255,255,255,0.16) 0%, rgba(127,179,255,0.11) 25%, rgba(83,137,232,0.08) 55%, rgba(255,255,255,0.14) 100%)',
            boxShadow:
              '0 24px 56px -38px rgba(45,145,255,0.9), inset 0 1px 0 rgba(255,255,255,0.58), inset 0 -1px 0 rgba(255,255,255,0.15)',
          }}
        >
          <div className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-white/85 to-transparent" />

          <div className="flex h-full w-40 items-center pl-2">
            <Link href="/" className="relative z-10 flex shrink-0 items-center">
              <Image
                src={`${basePath}/idu-logo.png`}
                alt="IDU"
                width={120}
                height={49}
                className="h-8 w-auto"
                unoptimized
              />
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
                    className="flex items-center gap-1 rounded-full px-3 py-2 text-sm text-white/85 transition-all duration-200 hover:bg-white/12 hover:text-white"
                  >
                    <span>{item.label}</span>
                    <ChevronDown open={isOpen} />
                  </button>

                  {isOpen && (
                    <div className="absolute left-1/2 top-full w-[min(96vw,1020px)] -translate-x-1/2 pt-3">
                      <div
                        className="rounded-3xl border border-white/16 p-4 backdrop-blur-2xl"
                        style={{
                          background:
                            'linear-gradient(125deg, rgba(8,18,54,0.92) 0%, rgba(10,30,74,0.9) 45%, rgba(7,18,47,0.95) 100%)',
                          boxShadow:
                            '0 30px 60px -30px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.22)',
                        }}
                      >
                        <div className="grid grid-cols-[1fr_1fr_1fr_320px] gap-3">
                          {item.columns.map((column) => (
                            <div key={column.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-200/80">
                                {column.title}
                              </p>
                              <ul className="mt-3 space-y-1.5">
                                {column.links.map((link) => (
                                  <li key={link}>
                                    <Link
                                      href="#"
                                      className="block rounded-lg px-2 py-1.5 text-sm text-white/84 transition-colors hover:bg-white/10 hover:text-white"
                                    >
                                      {link}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          <aside className="flex h-full flex-col justify-between rounded-2xl border border-white/12 bg-gradient-to-br from-sky-300/18 via-white/8 to-white/[0.02] p-5">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-100/75">Overview</p>
                              <h3 className="mt-3 font-manrope text-xl font-semibold leading-tight text-white">
                                {item.teaserTitle}
                              </h3>
                              <p className="mt-3 text-sm leading-relaxed text-white/72">{item.teaserCopy}</p>
                            </div>
                            <Link
                              href="#"
                              className="mt-5 inline-flex w-fit items-center rounded-full border border-white/30 bg-white/12 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
                            >
                              Explore
                            </Link>
                          </aside>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="ml-auto flex h-full w-40 items-center justify-end pr-2">
            <Link
              href="#"
              className="inline-flex shrink-0 items-center rounded-full border border-black/10 bg-white px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-white/90"
            >
              CTA
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
