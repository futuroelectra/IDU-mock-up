import AnimationOptionLayout from '@/components/AnimationOptionLayout'
import AnimationLiquidGlassField from '@/components/AnimationLiquidGlassField'

export default function Page8() {
  return (
    <AnimationOptionLayout
      optionLabel="Mockup 8: Liquid Glass Field"
      conceptTitle="A crafted 3D planning field with pressure-reactive glass dynamics."
      conceptCopy="This direction moves beyond common node visuals into a premium liquid-glass system. Cursor pressure compresses and displaces floating objects across a shared membrane to represent collaborative planning forces that stay elegant, controlled, and finance-led."
      animation={<AnimationLiquidGlassField />}
      swapSides
      postHeroTemplate="benchmarkSplit"
    />
  )
}
