import { SectionDefinition } from '@/lib/types'
import { CtaSimple } from '@/components/sections/cta/cta-simple'

export const ctaSections: SectionDefinition = {
  type: 'cta',
  name: 'Call to Action',
  icon: '🎯',
  variations: [
    {
      id: 'cta-simple',
      name: 'Simple CTA',
      description: 'Simple centered CTA with button',
      component: CtaSimple
    }
  ]
}