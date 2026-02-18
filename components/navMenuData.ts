export type NavLink = { label: string; href?: string }
export type NavGroup = { title: string; links: NavLink[] }
export type MegaMenuItem = {
  label: string
  groups: NavGroup[]
}

export const megaMenuData: MegaMenuItem[] = [
  {
    label: 'Company',
    groups: [
      {
        title: 'Our Identity',
        links: [
          { label: 'Our Vision', href: '#' },
          { label: 'The IDU Team', href: '#' },
          { label: 'Global Partner Network', href: '#' },
          { label: 'Careers', href: '#' },
        ],
      },
    ],
  },
  {
    label: 'Knowledge Center',
    groups: [
      {
        title: 'Resource Center',
        links: [
          { label: 'Financial Literacy Hub', href: '#' },
          { label: 'EPM Trends and Digital Guides', href: '#' },
          { label: 'Global Webinars', href: '#' },
        ],
      },
    ],
  },
  {
    label: 'Global Success',
    groups: [
      {
        title: 'Social Proof',
        links: [
          { label: 'Industry Expertise', href: '#' },
          { label: 'Enterprise Case Studies', href: '#' },
          { label: 'Global Ratings and Reviews', href: '#' },
        ],
      },
    ],
  },
  {
    label: 'Platform',
    groups: [
      {
        title: 'The Architecture',
        links: [
          { label: 'Cloud Architecture', href: '#' },
          { label: 'Security and Compliance', href: '#' },
          { label: 'Integration Ecosystem', href: '#' },
          { label: 'Pricing and FAQs', href: '#' },
        ],
      },
    ],
  },
  {
    label: 'Solutions',
    groups: [
      {
        title: 'By Role',
        links: [
          { label: 'The Strategic CFO: Governance and Risk', href: '#' },
          { label: 'The Operational Manager: Ownership and Literacy', href: '#' },
        ],
      },
      {
        title: 'Budgeting and Adaptive Forecasting',
        links: [
          { label: 'Budgeting and Forecasting', href: '#' },
          { label: 'Modelling and Scenario Planning', href: '#' },
          { label: 'Capex Planning', href: '#' },
          { label: 'Cash Flow Planning', href: '#' },
          { label: 'Project Planning', href: '#' },
          { label: 'Workforce Planning', href: '#' },
        ],
      },
      {
        title: 'Financial Intelligence and Reporting',
        links: [
          { label: 'Analytics and Reporting', href: '#' },
          { label: 'Dashboards', href: '#' },
        ],
      },
      {
        title: 'Unified Sales and Operational Planning',
        links: [
          { label: 'Sales and Operational Planning', href: '#' },
          { label: 'Sales and Operational Reporting', href: '#' },
        ],
      },
      {
        title: 'Fixed Asset Management',
        links: [{ label: 'Fixed Asset Management', href: '#' }],
      },
    ],
  },
]
