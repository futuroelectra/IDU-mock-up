import Link from 'next/link'
import Image from 'next/image'

const basePath = process.env.NODE_ENV === 'production' ? '/IDU-mock-up' : ''

const navItems = ['Solutions', 'Platform', 'Customers', 'Resources', 'Partners', 'About']

function ChevronDown() {
  return (
    <svg className="h-3 w-3 text-white/70" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M4.22 5.97a.75.75 0 0 1 1.06 0L8 8.69l2.72-2.72a.75.75 0 0 1 1.06 1.06L8.53 10.28a.75.75 0 0 1-1.06 0L4.22 7.03a.75.75 0 0 1 0-1.06Z" />
    </svg>
  )
}

export default function MarkupThreeNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 pt-5">
      <nav className="mx-auto max-w-6xl">
        <div
          className="relative flex h-16 items-center rounded-full border border-white/20 px-3 sm:px-4 backdrop-blur-2xl"
          style={{
            background:
              'linear-gradient(120deg, rgba(255,255,255,0.12) 0%, rgba(112,167,255,0.09) 30%, rgba(255,255,255,0.05) 65%, rgba(255,255,255,0.1) 100%)',
            boxShadow:
              '0 28px 60px -40px rgba(45,145,255,0.75), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(255,255,255,0.14)',
          }}
        >
          <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/75 to-transparent" />

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

          <div className="mx-auto hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                className="flex items-center gap-0.5 rounded-full px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <span>{item}</span>
                <ChevronDown />
              </button>
            ))}
          </div>

          <Link
            href="#"
            className="ml-auto inline-flex shrink-0 items-center rounded-full border border-black/10 bg-white px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-white/90"
          >
            CTA
          </Link>
        </div>
      </nav>
    </header>
  )
}
