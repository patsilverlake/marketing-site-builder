import { SectionDefinition } from '@/lib/types'
import { FeaturesGrid } from '@/components/sections/features/features-grid'
import { FeaturesList } from '@/components/sections/features/features-list'
import { FeaturesShowcase } from '@/components/sections/features/features-showcase'
import { FeaturesComparison } from '@/components/sections/features/features-comparison'
import { FeaturesCards } from '@/components/sections/features/features-cards'

export const featuresSections: SectionDefinition = {
  type: 'features',
  name: 'Features',
  icon: '✨',
  variations: [
    {
      id: 'features-grid',
      name: '3-Column Grid',
      description: '3-column feature grid with icons',
      component: FeaturesGrid
    },
    {
      id: 'features-list',
      name: 'Alternating List',
      description: 'Feature list with alternating image/text',
      component: FeaturesList
    },
    {
      id: 'features-showcase',
      name: 'Feature Showcase',
      description: 'Feature showcase with large image + bullet points',
      component: FeaturesShowcase
    },
    {
      id: 'features-comparison',
      name: 'Comparison Table',
      description: 'Feature comparison table',
      component: FeaturesComparison
    },
    {
      id: 'features-cards',
      name: 'Hover Cards',
      description: 'Feature cards with hover effects',
      component: FeaturesCards
    }
  ]
}