import AnimationOptionLayout from '@/components/AnimationOptionLayout'
import AnimationPearlPressureField from '@/components/AnimationPearlPressureField'

export default function Page10() {
  return (
    <AnimationOptionLayout
      optionLabel="Mockup 10: Pearl Pressure Field"
      conceptTitle="A tactile matrix of premium forms that respond like a living planning surface."
      conceptCopy="This direction uses fewer, larger pearl forms in a controlled pressure field. The cursor creates focused displacement and recovery, presenting enterprise planning as calm, crafted, and deeply interactive instead of noisy or generic."
      animation={<AnimationPearlPressureField />}
      postHeroTemplate="commandCenter"
    />
  )
}
