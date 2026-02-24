import AnimationOptionLayout from '@/components/AnimationOptionLayout'
import AnimationPlanningMatrix from '@/components/AnimationPlanningMatrix'

export default function Page7() {
  return (
    <AnimationOptionLayout
      optionLabel="Markup 7: Planning Matrix Pulse"
      conceptTitle="A living planning grid where decisions propagate across teams."
      conceptCopy="This direction visualizes cross-functional planning as a structured matrix. Pulses travel through lanes, tiles light up as signals pass, and the cursor acts like an intervention lens, showing how one decision can ripple through the full organization."
      animation={<AnimationPlanningMatrix />}
      variant="matrix"
    />
  )
}
