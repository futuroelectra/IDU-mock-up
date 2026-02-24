import type { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MockupThreeNav from './MockupThreeNav'
import { megaMenuData } from './navMenuData'

const basePath = process.env.NODE_ENV === 'production' ? '/IDU-mock-up' : ''
const footerTopGroups = megaMenuData.filter((item) => item.label !== 'Solutions')
const solutionsItem = megaMenuData.find((item) => item.label === 'Solutions')
const solutionsLinks = solutionsItem ? solutionsItem.groups.flatMap((group) => group.links) : []

const proofStats = [
  { value: '40%', label: 'Faster planning cycles' },
  { value: '3x', label: 'Higher business participation' },
  { value: '99%', label: 'Decision traceability' },
]

export type PostHeroTemplateKey =
  | 'bentoProof'
  | 'alternatingShowcase'
  | 'workflowBoard'
  | 'mosaicNarrative'
  | 'benchmarkSplit'
  | 'storyPanels'
  | 'commandCenter'

type AnimationOptionLayoutProps = {
  optionLabel: string
  conceptTitle: string
  conceptCopy: string
  animation: ReactNode
  swapSides?: boolean
  postHeroTemplate: PostHeroTemplateKey
}

function VisualPlaceholder({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-[#d6e5ff] bg-gradient-to-br from-white to-[#eef5ff] ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(75,129,224,0.2)_0%,transparent_44%),radial-gradient(circle_at_80%_82%,rgba(79,142,236,0.18)_0%,transparent_42%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.78)_45%,transparent_75%)]" />
      <p className="absolute bottom-3 left-3 rounded-full border border-[#d4e3fb] bg-white/88 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2f5ea8]">
        {label}
      </p>
    </div>
  )
}

function ProofBand({ quote, source }: { quote: string; source: string }) {
  return (
    <section className="bg-[#071d49] px-6 py-20 text-white sm:px-8 xl:px-10">
      <div className="mx-auto max-w-[94rem]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-100/72">Enterprise Proof</p>
        <blockquote className="mt-4 max-w-4xl font-manrope text-2xl font-medium leading-snug sm:text-3xl">{quote}</blockquote>
        <p className="mt-4 text-sm text-blue-100/72">{source}</p>
      </div>
    </section>
  )
}

function TemplateBentoProof({ conceptTitle, conceptCopy }: { conceptTitle: string; conceptCopy: string }) {
  return (
    <>
      <section id="nav-light-start" className="bg-white px-6 pb-20 pt-0 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[94rem]">
          <div className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <article className="rounded-[2rem] border border-[#d7e4fb] bg-gradient-to-br from-white via-[#f8fbff] to-[#f2f8ff] p-8 shadow-[0_24px_56px_-48px_rgba(28,76,152,0.48)] sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2f6cc6]">Template Signal</p>
              <h2 className="mt-4 font-manrope text-3xl font-semibold leading-tight text-[#07275f] sm:text-4xl">{conceptTitle}</h2>
              <p className="mt-5 text-base leading-relaxed text-[#35558d]">{conceptCopy}</p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {['Bento Modules', 'Image-Led Cards', 'Metric Anchors'].map((item) => (
                  <span key={item} className="rounded-full border border-[#d8e6ff] bg-[#f7fbff] px-3 py-1 text-xs font-medium text-[#2a4f88]">
                    {item}
                  </span>
                ))}
              </div>
            </article>

            <article className="rounded-[2rem] border border-[#dae8ff] bg-white p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2f6cc6]">Trusted By Planning Teams</p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {['MTN Group', 'Absa', 'Nedbank', 'Astra Tech', 'Vodacom', 'Aspen', 'Sasol', 'Axian'].map((logo) => (
                  <div key={logo} className="rounded-xl border border-[#d8e6ff] bg-[#f8fbff] px-3 py-2 text-center text-xs font-medium text-[#35558d]">
                    {logo}
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-12">
            <article className="rounded-2xl border border-[#d8e6ff] bg-white p-6 lg:col-span-5">
              <p className="text-sm font-semibold text-[#12396f]">Planning Cockpit</p>
              <p className="mt-2 text-sm leading-relaxed text-[#47679f]">A consolidated view for budget health, ownership, and strategic risk.</p>
              <VisualPlaceholder label="Dashboard Snapshot" className="mt-4 aspect-[6/4]" />
            </article>

            <article className="rounded-2xl border border-[#d8e6ff] bg-white p-6 lg:col-span-4">
              <p className="text-sm font-semibold text-[#12396f]">Decision Velocity</p>
              <div className="mt-3 grid gap-2">
                {['Executive approvals', 'Scenario cycles', 'Variance containment'].map((item) => (
                  <div key={item} className="rounded-lg border border-[#dbe8ff] bg-[#f8fbff] px-3 py-2 text-xs text-[#3f6198]">
                    {item}
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-[#d8e6ff] bg-gradient-to-br from-[#f5f9ff] to-white p-6 lg:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2f6cc6]">Cycle Lift</p>
              <p className="mt-3 font-manrope text-4xl font-semibold text-[#0f2f68]">+28%</p>
              <p className="mt-1 text-sm text-[#47679f]">faster re-forecast turnaround</p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8ff] px-6 py-24 sm:px-8 xl:px-10">
        <div className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-3">
          {[
            ['Cross-Functional Cards', 'Teams contribute in structured cards rather than fragmented sheets.'],
            ['Screenshot-Led Proof', 'Key modules are shown visually to reduce abstract copy overload.'],
            ['Short Heading Hierarchy', 'Large headline, small support line, then clear next action.'],
          ].map(([title, copy]) => (
            <article key={title} className="rounded-2xl border border-[#d8e6ff] bg-white p-7">
              <h3 className="font-manrope text-xl font-semibold text-[#0f2f68]">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#3e6098]">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <ProofBand
        quote="We adopted this layout because stakeholders can scan the value proposition in seconds and then dive into visual proof modules."
        source="VP Strategy & Finance, Pan-African Group"
      />
    </>
  )
}

function TemplateAlternatingShowcase() {
  return (
    <>
      <section id="nav-light-start" className="bg-white px-6 pb-20 pt-0 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[94rem]">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2f6cc6]">Alternating Product Showcase</p>
            <h2 className="mt-4 font-manrope text-3xl font-semibold leading-tight text-[#07275f] sm:text-4xl">
              Image-first feature storytelling with clear left-right rhythm.
            </h2>
          </div>

          <div className="mt-10 space-y-7">
            <article className="grid gap-6 rounded-[2rem] border border-[#d8e6ff] bg-gradient-to-r from-white to-[#f4f9ff] p-6 lg:grid-cols-[1.04fr_0.96fr] lg:p-8">
              <VisualPlaceholder label="Scenario Builder" className="aspect-[16/10]" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2f6cc6]">Module 01</p>
                <h3 className="mt-3 font-manrope text-2xl font-semibold text-[#0f2f68]">Scenario comparisons without spreadsheet drift.</h3>
                <ul className="mt-4 space-y-2 text-sm text-[#45679f]">
                  <li>Linked assumptions across entities</li>
                  <li>Side-by-side forecast outcomes</li>
                  <li>Audit-ready scenario history</li>
                </ul>
              </div>
            </article>

            <article className="grid gap-6 rounded-[2rem] border border-[#d8e6ff] bg-gradient-to-r from-[#f7fbff] to-white p-6 lg:grid-cols-[0.96fr_1.04fr] lg:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2f6cc6]">Module 02</p>
                <h3 className="mt-3 font-manrope text-2xl font-semibold text-[#0f2f68]">Department plans mapped to finance guardrails.</h3>
                <ul className="mt-4 space-y-2 text-sm text-[#45679f]">
                  <li>Ownership-level contribution paths</li>
                  <li>Role-based workflow approvals</li>
                  <li>Live variance thresholds</li>
                </ul>
              </div>
              <VisualPlaceholder label="Workflow Control" className="aspect-[16/10]" />
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8ff] px-6 py-24 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[94rem]">
          <h3 className="font-manrope text-3xl font-semibold text-[#07275f]">Plan Tiers Framed As Operating Modes</h3>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['Core', 'Single-model planning for focused teams.', '#e9f2ff'],
              ['Scale', 'Cross-entity planning with approvals and controls.', '#dfeeff'],
              ['Enterprise', 'Global planning governance and integration depth.', '#d4e8ff'],
            ].map(([title, copy, tone]) => (
              <article key={title} className="rounded-2xl border border-[#d8e6ff] bg-white p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2f6cc6]">{title}</p>
                <p className="mt-3 text-sm text-[#45679f]">{copy}</p>
                <div className="mt-5 h-2 rounded-full" style={{ backgroundColor: tone }} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProofBand
        quote="Alternating screenshot sections consistently made the product easier to understand for non-financial leadership teams."
        source="Chief Transformation Officer, Regional Enterprise"
      />
    </>
  )
}

function TemplateWorkflowBoard() {
  return (
    <>
      <section id="nav-light-start" className="bg-white px-6 pb-20 pt-0 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[94rem]">
          <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
            <article className="rounded-[2rem] border border-[#d8e6ff] bg-white p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2f6cc6]">Workflow Timeline</p>
              <h2 className="mt-4 font-manrope text-3xl font-semibold text-[#07275f] sm:text-4xl">Horizontal step architecture for planning cycles.</h2>
              <div className="mt-8 grid gap-3 md:grid-cols-4">
                {['Set Targets', 'Collect Inputs', 'Review Risks', 'Finalize Plan'].map((step, index) => (
                  <div key={step} className="rounded-xl border border-[#d8e6ff] bg-[#f8fbff] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2f6cc6]">Step {index + 1}</p>
                    <p className="mt-2 text-sm font-medium text-[#12396f]">{step}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[2rem] border border-[#d8e6ff] bg-gradient-to-br from-white to-[#f3f8ff] p-8">
              <VisualPlaceholder label="Workflow Canvas" className="aspect-[5/4]" />
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8ff] px-6 py-24 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[94rem] grid gap-4 lg:grid-cols-3">
          {[
            ['Finance Lane', ['Policy controls', 'Approval matrix', 'Audit records']],
            ['Operations Lane', ['Department input forms', 'Ownership tracking', 'Action deadlines']],
            ['Leadership Lane', ['Scenario decisions', 'Trade-off dashboard', 'Commitment checkpoints']],
          ].map(([title, items]) => (
            <article key={title} className="rounded-2xl border border-[#d8e6ff] bg-white p-6">
              <p className="text-lg font-semibold text-[#12396f]">{title}</p>
              <div className="mt-4 space-y-2">
                {(items as string[]).map((item) => (
                  <div key={item} className="rounded-lg border border-[#dbe8ff] bg-[#f8fbff] px-3 py-2 text-sm text-[#3f6198]">
                    {item}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-24 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[94rem] rounded-[2rem] border border-[#d8e6ff] bg-gradient-to-r from-white to-[#f4f9ff] p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <VisualPlaceholder label="Cross-Team Dependency Map" className="aspect-[16/10]" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2f6cc6]">Dependency Clarity</p>
              <h3 className="mt-4 font-manrope text-3xl font-semibold text-[#0f2f68]">See how one decision affects downstream execution.</h3>
              <p className="mt-4 text-sm leading-relaxed text-[#3f6198]">
                Structured workflow templates reduce ambiguity, accelerate handoffs, and keep each approval stage visible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ProofBand
        quote="The workflow-board format made ownership obvious for finance and operations in the same planning cycle."
        source="Regional CFO, Infrastructure Group"
      />
    </>
  )
}

function TemplateMosaicNarrative() {
  return (
    <>
      <section id="nav-light-start" className="bg-white px-6 pb-20 pt-0 sm:px-8 xl:px-10">
        <div className="mx-auto grid max-w-[94rem] gap-5 lg:grid-cols-12">
          <article className="rounded-[2rem] border border-[#d8e6ff] bg-gradient-to-br from-white via-[#f7fbff] to-[#eef6ff] p-8 lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2f6cc6]">Mosaic Story Layout</p>
            <h2 className="mt-4 font-manrope text-3xl font-semibold text-[#07275f] sm:text-4xl">Card-led storytelling with mixed visual density.</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#3f6198]">
              This structure mirrors modern SaaS galleries: large image anchor, secondary feature cards, then social proof.
            </p>
          </article>

          <VisualPlaceholder label="Main Product Surface" className="lg:col-span-7 aspect-[16/9]" />

          <VisualPlaceholder label="Automation Rules" className="lg:col-span-4 aspect-[4/3]" />
          <article className="rounded-2xl border border-[#d8e6ff] bg-white p-6 lg:col-span-4">
            <p className="text-sm font-semibold text-[#12396f]">Planning Decisions</p>
            <p className="mt-2 text-sm text-[#45679f]">Versioned approvals, ownership links, and dependency alerts in one model.</p>
          </article>
          <VisualPlaceholder label="Executive Snapshot" className="lg:col-span-4 aspect-[4/3]" />
        </div>
      </section>

      <section className="bg-[#f4f8ff] px-6 py-24 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[94rem]">
          <h3 className="font-manrope text-3xl font-semibold text-[#07275f]">Customer Story Cards</h3>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {['Retail Group', 'Industrial Holding', 'Financial Services'].map((name) => (
              <article key={name} className="rounded-2xl border border-[#d8e6ff] bg-white p-5">
                <VisualPlaceholder label={`${name} Visual`} className="aspect-[6/4]" />
                <p className="mt-4 text-sm font-semibold text-[#12396f]">{name}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#45679f]">Reduced planning turnaround with cleaner accountability across departments.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProofBand
        quote="Mosaic sections helped us balance high-level narrative with enough visual detail to build confidence quickly."
        source="Head of Strategic Finance, Multi-Region Operator"
      />
    </>
  )
}

function TemplateBenchmarkSplit() {
  return (
    <>
      <section id="nav-light-start" className="bg-white px-6 pb-20 pt-0 sm:px-8 xl:px-10">
        <div className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.96fr_1.04fr]">
          <article className="rounded-[2rem] border border-[#d8e6ff] bg-white p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2f6cc6]">Benchmark Split</p>
            <h2 className="mt-4 font-manrope text-3xl font-semibold text-[#07275f] sm:text-4xl">Long-form explanation paired with a persistent product visual.</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#3f6198]">
              A common SaaS pattern for complex products: keep one stable screenshot while value points stack alongside.
            </p>
            <div className="mt-6 space-y-2">
              {['Fewer context switches', 'Faster executive validation', 'Clearer contributor paths'].map((item) => (
                <div key={item} className="rounded-lg border border-[#dbe8ff] bg-[#f8fbff] px-3 py-2 text-sm text-[#3f6198]">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <VisualPlaceholder label="Persistent Platform View" className="aspect-[5/4]" />
        </div>
      </section>

      <section className="bg-[#f4f8ff] px-6 py-24 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[94rem]">
          <h3 className="font-manrope text-3xl font-semibold text-[#07275f]">Capability Benchmark</h3>
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#d8e6ff] bg-white">
            <div className="grid grid-cols-[1.25fr_1fr_1fr_1fr] border-b border-[#e2edff] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#2f6cc6]">
              <p>Capability</p>
              <p>Core</p>
              <p>Scale</p>
              <p>Enterprise</p>
            </div>
            {[
              ['Department ownership', 'Basic', 'Advanced', 'Advanced'],
              ['Scenario planning', 'Basic', 'Advanced', 'Advanced'],
              ['Global governance', 'No', 'Limited', 'Full'],
            ].map((row) => (
              <div key={row[0]} className="grid grid-cols-[1.25fr_1fr_1fr_1fr] border-b border-[#edf3ff] px-5 py-4 text-sm text-[#3f6198] last:border-b-0">
                {row.map((cell) => (
                  <p key={cell}>{cell}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[94rem] grid gap-4 md:grid-cols-2">
          {[
            ['How fast can implementation start?', 'Initial model activation can begin in weeks with guided rollout patterns.'],
            ['Can non-financial teams contribute?', 'Yes. Contribution is role-structured and controlled by finance guardrails.'],
            ['How is governance handled?', 'Every key action is versioned, permissioned, and traceable.'],
            ['What about multi-entity complexity?', 'Templates are designed for region, entity, and currency-level planning.'],
          ].map(([q, a]) => (
            <article key={q} className="rounded-2xl border border-[#d8e6ff] bg-gradient-to-br from-white to-[#f7fbff] p-6">
              <p className="font-semibold text-[#12396f]">{q}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#45679f]">{a}</p>
            </article>
          ))}
        </div>
      </section>

      <ProofBand
        quote="The benchmark split gave our buyers both strategic context and concrete proof without forcing long reads."
        source="Director of Enterprise Planning Programs"
      />
    </>
  )
}

function TemplateStoryPanels() {
  return (
    <>
      <section id="nav-light-start" className="bg-white px-6 pb-20 pt-0 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[94rem] grid gap-7 lg:grid-cols-[0.92fr_1.08fr]">
          <article className="rounded-[2rem] border border-[#d8e6ff] bg-gradient-to-b from-white to-[#f5f9ff] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2f6cc6]">Editorial Story Panels</p>
            <h2 className="mt-4 font-manrope text-3xl font-semibold text-[#07275f] sm:text-4xl">Narrative-led layout for longer buying cycles.</h2>
            <div className="mt-8 space-y-4">
              {[
                ['01', 'Align strategy and operating targets'],
                ['02', 'Coordinate department-level execution'],
                ['03', 'Re-forecast with shared assumptions'],
              ].map(([index, step]) => (
                <div key={index} className="flex items-center gap-3 rounded-xl border border-[#d8e6ff] bg-white px-4 py-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#113f84] text-xs font-semibold text-white">{index}</span>
                  <p className="text-sm text-[#34588f]">{step}</p>
                </div>
              ))}
            </div>
          </article>

          <div className="space-y-4">
            <VisualPlaceholder label="Leadership Panel" className="aspect-[16/8]" />
            <div className="grid gap-4 sm:grid-cols-2">
              <VisualPlaceholder label="Operations Panel" className="aspect-[5/4]" />
              <VisualPlaceholder label="Finance Panel" className="aspect-[5/4]" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8ff] px-6 py-24 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[94rem]">
          <h3 className="font-manrope text-3xl font-semibold text-[#07275f]">Role-Based Cards</h3>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              ['Finance', 'Policy controls and scenario logic'],
              ['Operations', 'Execution assumptions and ownership'],
              ['Leadership', 'Trade-off decisions and commitments'],
              ['PMO', 'Cadence management and risk watchlists'],
            ].map(([role, copy]) => (
              <article key={role} className="rounded-xl border border-[#d8e6ff] bg-white p-5">
                <p className="text-sm font-semibold text-[#12396f]">{role}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#45679f]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[94rem]">
          <h3 className="font-manrope text-3xl font-semibold text-[#07275f]">Resource Cards</h3>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {['Playbook', 'Implementation Guide', 'Benchmark Report'].map((item) => (
              <article key={item} className="rounded-2xl border border-[#d8e6ff] bg-gradient-to-br from-white to-[#f4f9ff] p-6">
                <VisualPlaceholder label={item} className="aspect-[7/5]" />
                <p className="mt-4 text-base font-semibold text-[#12396f]">{item}</p>
                <p className="mt-2 text-sm text-[#45679f]">Placeholder section to compare card hierarchy and content density.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProofBand
        quote="This panel-based composition worked well for multi-stakeholder reviews because each audience sees itself in the flow."
        source="Head of Program Office, Enterprise Group"
      />
    </>
  )
}

function TemplateCommandCenter() {
  return (
    <>
      <section id="nav-light-start" className="bg-white px-6 pb-20 pt-0 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[94rem]">
          <article className="rounded-[2rem] border border-[#d8e6ff] bg-gradient-to-br from-white via-[#f7fbff] to-[#eef5ff] p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2f6cc6]">Command Center Layout</p>
            <div className="mt-4 grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
              <h2 className="font-manrope text-3xl font-semibold text-[#07275f] sm:text-4xl">A dashboard-first pattern used by modern product-led SaaS pages.</h2>
              <p className="text-sm leading-relaxed text-[#45679f]">
                Prioritize one high-impact product visual, then support it with compact KPI cards and quick validation blocks.
              </p>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-[1.14fr_0.86fr]">
              <VisualPlaceholder label="Unified Planning Dashboard" className="aspect-[16/9]" />
              <div className="grid gap-4">
                {[
                  ['42%', 'Planning cycle compression'],
                  ['97%', 'Traceable decision records'],
                  ['3.2x', 'Increase in cross-team inputs'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-xl border border-[#d8e6ff] bg-white p-4">
                    <p className="font-manrope text-3xl font-semibold text-[#0f2f68]">{value}</p>
                    <p className="mt-1 text-xs text-[#45679f]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-[#f4f8ff] px-6 py-24 sm:px-8 xl:px-10">
        <div className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2rem] border border-[#d8e6ff] bg-white p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2f6cc6]">Integration Architecture</p>
            <p className="mt-4 text-sm leading-relaxed text-[#45679f]">
              Cards represent source systems, planning models, and downstream reporting channels in one orchestration map.
            </p>
            <div className="mt-6 grid gap-2 text-sm text-[#35578d]">
              <div className="rounded-lg border border-[#dbe8ff] bg-[#f8fbff] px-3 py-2">ERP + Finance Systems</div>
              <div className="rounded-lg border border-[#dbe8ff] bg-[#f8fbff] px-3 py-2">Department Input Layer</div>
              <div className="rounded-lg border border-[#dbe8ff] bg-[#f8fbff] px-3 py-2">Scenario Engine + Governance</div>
              <div className="rounded-lg border border-[#dbe8ff] bg-[#f8fbff] px-3 py-2">Board Reporting + KPI Streams</div>
            </div>
          </article>

          <article className="rounded-[2rem] border border-[#d8e6ff] bg-[#0f2f68] p-8 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100/80">Planning API Style Block</p>
            <pre className="mt-4 overflow-auto rounded-xl border border-white/20 bg-[#0a2450] p-4 text-xs leading-relaxed text-blue-100/90">{`POST /planning/scenarios\n{\n  \"cycle\": \"FY27-Q1\",\n  \"model\": \"enterprise\",\n  \"departments\": [\"operations\", \"sales\", \"supply\"],\n  \"governance\": true\n}`}</pre>
          </article>
        </div>
      </section>

      <section className="bg-white px-6 py-24 sm:px-8 xl:px-10">
        <div className="mx-auto max-w-[94rem] grid gap-5 lg:grid-cols-3">
          <article className="rounded-2xl border border-[#d8e6ff] bg-gradient-to-br from-white to-[#f4f9ff] p-6 lg:col-span-2">
            <h3 className="font-manrope text-2xl font-semibold text-[#0f2f68]">Modern SaaS CTA block with layered trust signals.</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#45679f]">
              Large heading, concise supporting copy, supporting stats, and one clear action remains a dominant B2B SaaS pattern.
            </p>
          </article>
          <article className="rounded-2xl border border-[#d8e6ff] bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2f6cc6]">Action</p>
            <p className="mt-2 text-sm text-[#45679f]">Book discovery workshop</p>
          </article>
        </div>
      </section>

      <ProofBand
        quote="The command-center pattern gave us the strongest executive response because value and product depth were both obvious above the fold and below it."
        source="Group Planning Lead, Enterprise Services"
      />
    </>
  )
}

function PostHeroTemplates({
  template,
  conceptTitle,
  conceptCopy,
}: {
  template: PostHeroTemplateKey
  conceptTitle: string
  conceptCopy: string
}) {
  if (template === 'bentoProof') {
    return <TemplateBentoProof conceptTitle={conceptTitle} conceptCopy={conceptCopy} />
  }
  if (template === 'alternatingShowcase') {
    return <TemplateAlternatingShowcase />
  }
  if (template === 'workflowBoard') {
    return <TemplateWorkflowBoard />
  }
  if (template === 'mosaicNarrative') {
    return <TemplateMosaicNarrative />
  }
  if (template === 'benchmarkSplit') {
    return <TemplateBenchmarkSplit />
  }
  if (template === 'storyPanels') {
    return <TemplateStoryPanels />
  }
  return <TemplateCommandCenter />
}

function FullFooter() {
  return (
    <footer className="border-t border-[#d7e5fd] bg-white px-6 pb-10 pt-14 sm:px-8 xl:px-10">
      <div className="mx-auto max-w-[94rem]">
        <div className="flex flex-col gap-6 border-b border-[#deebff] pb-10 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="w-fit">
            <Image src={`${basePath}/idu-inverted-logo.png`} alt="IDU" width={120} height={49} className="h-8 w-auto" unoptimized />
          </Link>
          <Link
            href="#"
            className="inline-flex w-fit items-center rounded-full border border-[#1d4f97] bg-[#113d7f] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0f356f]"
          >
            Partner with IDU
          </Link>
        </div>

        <nav className="grid grid-cols-2 gap-x-8 gap-y-10 pb-10 pt-10 md:grid-cols-4" aria-label="Site map">
          {footerTopGroups.map((item) => (
            <div key={item.label}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f2f68]">{item.label}</p>
              <ul className="mt-4 space-y-4">
                {item.groups.map((group) => (
                  <li key={group.title}>
                    <p className="mb-1.5 text-[11px] uppercase tracking-[0.16em] text-[#5a78ad]">{group.title}</p>
                    <ul className="space-y-1.5">
                      {group.links.map((link) => (
                        <li key={link.label}>
                          <Link href={link.href ?? '#'} className="text-sm text-[#2d4e86] transition-colors hover:text-[#0f2f68]">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {solutionsItem && (
          <section className="border-t border-[#e5efff] pb-10 pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f2f68]">{solutionsItem.label}</p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {solutionsLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href ?? '#'}
                  className="rounded-full border border-[#d7e6ff] bg-[#f7faff] px-3.5 py-1.5 text-sm text-[#2d4e86] transition-colors hover:border-[#abc8f8] hover:text-[#0f2f68]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#e5efff] pt-6">
          <p className="text-xs text-[#5a78ad]">© {new Date().getFullYear()} IDU. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-[#5a78ad] hover:text-[#0f2f68]">Privacy</Link>
            <Link href="#" className="text-xs text-[#5a78ad] hover:text-[#0f2f68]">Terms</Link>
            <Link href="#" className="text-xs text-[#5a78ad] hover:text-[#0f2f68]">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function AnimationOptionLayout({
  optionLabel,
  conceptTitle,
  conceptCopy,
  animation,
  swapSides = false,
  postHeroTemplate,
}: AnimationOptionLayoutProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#0f2f68]">
      <MockupThreeNav />

      <section className="relative min-h-screen overflow-hidden bg-[#050221] pt-32 text-white sm:pt-36">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 8% 20%, rgba(58,120,226,0.26) 0%, rgba(5,2,33,0) 42%), radial-gradient(circle at 78% 22%, rgba(24,102,209,0.29) 0%, rgba(5,2,33,0) 44%), linear-gradient(180deg, #04011d 0%, #07022d 100%)',
          }}
        />

        <div className="relative mx-auto grid min-h-[calc(100vh-9.5rem)] max-w-[94rem] items-center gap-14 px-6 pb-16 sm:px-8 sm:pb-20 lg:grid-cols-[1.2fr_0.96fr] xl:px-10">
          <div className={`h-[340px] w-full sm:h-[440px] lg:h-[520px] ${swapSides ? 'lg:order-2' : ''}`}>{animation}</div>

          <div className={swapSides ? 'lg:order-1' : ''}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-200/82">{optionLabel}</p>
            <h1
              className="mt-5 font-manrope text-[2.7rem] font-extrabold leading-[1.01] tracking-[-0.03em] text-transparent sm:text-[3.55rem] lg:text-[4.2rem]"
              style={{
                backgroundImage:
                  'linear-gradient(100deg, #ffffff 0%, rgba(247,250,255,0.97) 38%, rgba(213,228,255,0.65) 72%, rgba(120,150,210,0.18) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}
            >
              Africa&apos;s leading financial planning solution.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-blue-50/80">
              Trusted by global enterprises across Africa, Europe, the Middle East, and North America.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3.5">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl border border-[#f5be68]/35 bg-[#f0a01f] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f4ae32]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Book a Demo
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl bg-[#232833] px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1d222c]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Explore IDU
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              {proofStats.map((item) => (
                <div key={item.label} className="rounded-xl border border-white/14 bg-white/[0.04] p-3">
                  <p className="font-manrope text-2xl font-bold text-white">{item.value}</p>
                  <p className="mt-1 text-xs text-blue-100/72">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-[38vh] min-h-[230px] overflow-hidden bg-[#050221]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(140% 120% at 50% -4%, rgba(126,169,238,0.32) 0%, rgba(126,169,238,0) 52%), linear-gradient(180deg, rgba(5,2,33,1) 0%, rgba(14,31,77,0.72) 42%, rgba(177,201,239,0.58) 72%, rgba(255,255,255,1) 100%)',
          }}
        />
      </section>

      <PostHeroTemplates template={postHeroTemplate} conceptTitle={conceptTitle} conceptCopy={conceptCopy} />
      <FullFooter />
    </main>
  )
}
