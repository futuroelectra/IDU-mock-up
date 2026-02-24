import AnimationOptionLayout from '@/components/AnimationOptionLayout'
import AnimationGlassCurrents from '@/components/AnimationGlassCurrents'

export default function Page9() {
  return (
    <AnimationOptionLayout
      optionLabel="Mockup 9: Glass Currents"
      conceptTitle="Sculpted capsule forms that glide like connected planning momentum."
      conceptCopy="This concept trades node-graphs for elegant glass currents that feel deliberate and premium. Cursor movement steers the field like pressure on a fluid stream, expressing cross-functional planning alignment without visual clutter."
      animation={<AnimationGlassCurrents />}
      swapSides
      postHeroTemplate="storyPanels"
    />
  )
}
