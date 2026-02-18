import Nav from '@/components/Nav'
import HeroSection from '@/components/HeroSection'
import LiquidGlass from '@/components/LiquidGlass'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Nav />
      <HeroSection headline="Africa's leading financial planning solution." />
      <LiquidGlass />
    </main>
  )
}
