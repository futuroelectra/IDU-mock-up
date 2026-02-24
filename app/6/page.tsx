import AnimationOptionLayout from '@/components/AnimationOptionLayout'
import AnimationLedgerRings from '@/components/AnimationLedgerRings'

export default function Page6() {
  return (
    <AnimationOptionLayout
      optionLabel="Mockup 6: Ledger Orbit"
      conceptTitle="A dynamic allocation orbit where priorities circulate and rebalance."
      conceptCopy="This concept treats planning inputs like moving allocations in orbital tracks. Cursor movement bends orbital centers and reweights flow, expressing how finance can absorb changing business priorities while staying coherent."
      animation={<AnimationLedgerRings />}
      swapSides
      variant="rings"
    />
  )
}
