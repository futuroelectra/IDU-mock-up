import Nav from '@/components/Nav'
import HeroSection from '@/components/HeroSection'
import LiquidGlass from '@/components/LiquidGlass'
import WhiteSection from '@/components/WhiteSection'

export default function Page2() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0a0e27' }}>
      <Nav />
      <HeroSection headline="Precision-engineered financial intelligence." />
      <LiquidGlass />
      <WhiteSection />
    </main>
  )
}
