import { SectionDefinition } from '@/lib/types'
import { HeaderSimple } from '@/components/sections/header/header-simple'
import { HeaderWithCta } from '@/components/sections/header/header-with-cta'

export const headerSections: SectionDefinition = {
  type: 'header',
  name: 'Header',
  icon: '🏠',
  variations: [
    {
      id: 'header-simple',
      name: 'Simple Navigation',
      description: 'Header with logo and navigation menu',
      component: HeaderSimple
    },
    {
      id: 'header-with-cta',
      name: 'Navigation with CTA',
      description: 'Header with logo, navigation menu, and call-to-action button',
      component: HeaderWithCta
    }
  ]
}