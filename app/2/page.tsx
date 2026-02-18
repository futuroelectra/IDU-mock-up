import Nav from '@/components/Nav'
import HeroSection from '@/components/HeroSection'
import LiquidGlass from '@/components/LiquidGlass'
import WhiteSection from '@/components/WhiteSection'

export default function Page2() {
  return (
    <main className="min-h-screen bg-black">
      <Nav />
      <HeroSection headline="Precision-engineered financial intelligence." />
      <LiquidGlass />
      <WhiteSection />
    </main>
  )
}
