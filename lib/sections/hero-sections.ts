import { SectionDefinition } from '@/lib/types'
import { HeroCentered } from '@/components/sections/hero/hero-centered'
import { HeroSplit } from '@/components/sections/hero/hero-split'
import { HeroBackground } from '@/components/sections/hero/hero-background'
import { HeroAnimated } from '@/components/sections/hero/hero-animated'
import { HeroProduct } from '@/components/sections/hero/hero-product'

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
    },
    {
      id: 'hero-background',
      name: 'Background Image',
      description: 'Hero with background image and overlay',
      component: HeroBackground
    },
    {
      id: 'hero-animated',
      name: 'Animated Hero',
      description: 'Hero with animated elements',
      component: HeroAnimated
    },
    {
      id: 'hero-product',
      name: 'Product Showcase',
      description: 'Hero with product screenshot/mockup',
      component: HeroProduct
    }
  ]
}