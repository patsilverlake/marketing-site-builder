import { SectionDefinition } from '@/lib/types'
import { HeroCentered } from '@/components/sections/hero/hero-centered'
import { HeroSplit } from '@/components/sections/hero/hero-split'

export const heroSections: SectionDefinition = {
  type: 'hero',
  name: 'Hero',
  icon: '🎯',
  variations: [
    {
      id: 'hero-centered',
      name: 'Centered Hero',
      description: 'Hero with centered text and CTA button',
      component: HeroCentered
    },
    {
      id: 'hero-split',
      name: 'Split Hero',
      description: 'Hero with left text and right image',
      component: HeroSplit
    }
  ]
}