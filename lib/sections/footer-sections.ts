import { SectionDefinition } from '@/lib/types'
import { FooterSimple } from '@/components/sections/footer/footer-simple'

export const footerSections: SectionDefinition = {
  type: 'footer',
  name: 'Footer',
  icon: '📄',
  variations: [
    {
      id: 'footer-simple',
      name: 'Links + Social',
      description: 'Footer with links and social icons',
      component: FooterSimple
    }
  ]
}