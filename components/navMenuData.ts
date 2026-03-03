export type NavLink = { label: string; href?: string }
export type NavGroup = { title: string; links: NavLink[] }
export type MegaMenuItem = {
  label: string
  groups: NavGroup[]
}

export const megaMenuData: MegaMenuItem[] = [
  {
    label: 'Solutions',
    groups: [
      {
        title: 'Budgeting & Forecasting',
        links: [
          { label: 'Overview', href: '/solutions/budgeting-and-forecasting' },
          { label: 'Capex Planning', href: '/solutions/budgeting-and-forecasting/capex-planning' },
          { label: 'Cash Flow Planning', href: '/solutions/budgeting-and-forecasting/cash-flow-planning' },
          { label: 'Project Planning', href: '/solutions/budgeting-and-forecasting/project-planning' },
          { label: 'Workforce Planning', href: '/solutions/budgeting-and-forecasting/workforce-planning' },
          { label: 'Modelling & Scenario Planning', href: '/solutions/budgeting-and-forecasting/modelling-and-scenario-planning' },
        ],
      },
      {
        title: 'Intelligence & Reporting',
        links: [
          { label: 'Overview', href: '/solutions/intelligence-and-reporting' },
          { label: 'Analytics & Reporting', href: '/solutions/intelligence-and-reporting/analytics-and-reporting' },
          { label: 'Dashboards', href: '/solutions/intelligence-and-reporting/dashboards' },
        ],
      },
      {
        title: 'Sales & Operational Planning',
        links: [
          { label: 'Overview', href: '/solutions/sales-and-operational-planning' },
          { label: 'Planning', href: '/solutions/sales-and-operational-planning/planning' },
          { label: 'Reporting', href: '/solutions/sales-and-operational-planning/reporting' },
        ],
      },
      {
        title: 'Fixed Asset Management',
        links: [{ label: 'Overview', href: '/solutions/fixed-asset-management' }],
      },
    ],
  },
  {
    label: 'Platform',
    groups: [
      {
        title: 'Platform',
        links: [
          { label: 'How It Works', href: '/platform/how-it-works' },
          { label: 'AI Capabilities', href: '/platform/ai-capabilities' },
          { label: 'Integrations', href: '/platform/integrations' },
          { label: 'Deployment & Security', href: '/platform/deployment-and-security' },
          { label: 'Pricing & FAQs', href: '/platform/pricing-and-faqs' },
        ],
      },
      {
        title: 'By Role',
        links: [
          { label: 'For Finance Leaders', href: '/platform/for-finance-leaders' },
          { label: 'For Operational Managers', href: '/platform/for-operational-managers' },
        ],
      },
    ],
  },
  {
    label: 'Global Success',
    groups: [
      {
        title: 'Global Success',
        links: [
          { label: 'Industry Expertise', href: '/global-success/industry-expertise' },
          { label: 'Case Studies', href: '/global-success/case-studies' },
          { label: 'Reviews', href: '/global-success/reviews' },
        ],
      },
    ],
  },
  {
    label: 'Resources',
    groups: [
      {
        title: 'Resources',
        links: [
          { label: 'Blog', href: '/learn/blog' },
          { label: 'Webinars', href: '/learn/webinars' },
          { label: 'Guides', href: '/learn/guides' },
        ],
      },
    ],
  },
  {
    label: 'Company',
    groups: [
      {
        title: 'Company',
        links: [
          { label: 'Vision', href: '/company/vision' },
          { label: 'Partners', href: '/company/partners' },
          { label: 'Contact', href: '/company/contact' },
        ],
      },
    ],
  },
]
