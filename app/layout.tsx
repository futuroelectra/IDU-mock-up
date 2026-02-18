import type { Metadata } from 'next'
import { Panchang, Manrope } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'IDU - Finance in Focus',
  description: 'One platform. Every department. Total clarity.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${Panchang.variable} ${Manrope.variable}`}>
      <body className="font-manrope antialiased">{children}</body>
    </html>
  )
}
