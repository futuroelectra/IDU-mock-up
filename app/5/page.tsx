import AnimationOptionLayout from '@/components/AnimationOptionLayout'
import AnimationConsensusOrbs from '@/components/AnimationConsensusOrbs'

export default function Page5() {
  return (
    <AnimationOptionLayout
      optionLabel="Mockup 5: Consensus Orb Field"
      conceptTitle="Larger adaptive objects that rebalance around user intent."
      conceptCopy="This direction uses fewer, larger planning objects to represent teams, priorities, and budgets finding equilibrium. Cursor movement creates strong push, pull, and swirl responses so the experience feels deliberate, premium, and less like a generic network graph."
      animation={<AnimationConsensusOrbs />}
      variant="orbs"
    />
  )
}
