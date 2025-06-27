import { SectionDefinition } from '@/lib/types'
import { PricingCards } from '@/components/sections/pricing/pricing-cards'
import { PricingSimple } from '@/components/sections/pricing/pricing-simple'
import { PricingToggle } from '@/components/sections/pricing/pricing-toggle'
import { PricingSingle } from '@/components/sections/pricing/pricing-single'

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
    },
    {
      id: 'pricing-toggle',
      name: 'Monthly/Yearly Toggle',
      description: 'Pricing with toggle (monthly/yearly)',
      component: PricingToggle
    },
    {
      id: 'pricing-single',
      name: 'Single Price',
      description: 'Single price with feature list',
      component: PricingSingle
    }
  ]
}