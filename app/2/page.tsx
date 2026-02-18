import Nav from '@/components/Nav'
import HeroSection from '@/components/HeroSection'
import LiquidGlass from '@/components/LiquidGlass'

export default function Page2() {
  return (
    <main className="min-h-screen bg-black">
      <Nav />
      <HeroSection headline="Precision-engineered financial intelligence." />
      <LiquidGlass />
    </main>
  )
}
