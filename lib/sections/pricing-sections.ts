import { SectionDefinition } from '@/lib/types'
import { PricingCards } from '@/components/sections/pricing/pricing-cards'
import { PricingSimple } from '@/components/sections/pricing/pricing-simple'

export const pricingSections: SectionDefinition = {
  type: 'pricing',
  name: 'Pricing',
  icon: '💰',
  variations: [
    {
      id: 'pricing-cards',
      name: '3-Tier Cards',
      description: '3-tier pricing cards',
      component: PricingCards
    },
    {
      id: 'pricing-simple',
      name: 'Simple Table',
      description: 'Simple pricing table',
      component: PricingSimple
    }
  ]
}