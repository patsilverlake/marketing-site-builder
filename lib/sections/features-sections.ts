import { SectionDefinition } from '@/lib/types'
import { FeaturesGrid } from '@/components/sections/features/features-grid'
import { FeaturesList } from '@/components/sections/features/features-list'

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
    }
  ]
}