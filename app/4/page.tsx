import AnimationOptionLayout from '@/components/AnimationOptionLayout'
import AnimationDepartmentFlows from '@/components/AnimationDepartmentFlows'

export default function Page4() {
  return (
    <AnimationOptionLayout
      optionLabel="Markup 4: Department Flow Field"
      conceptTitle="Flowing streams that converge into one coordinated planning rhythm."
      conceptCopy="This concept visualizes different departments as living planning streams. Cursor interaction bends, combines, and accelerates these streams to reflect how non-financial managers can enter the same process without friction, while finance still keeps structure."
      animation={<AnimationDepartmentFlows />}
    />
  )
}
