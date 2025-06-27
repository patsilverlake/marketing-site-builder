import { SectionDefinition } from '@/lib/types'
import { FooterSimple } from '@/components/sections/footer/footer-simple'
import { FooterNewsletter } from '@/components/sections/footer/footer-newsletter'

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
    },
    {
      id: 'footer-newsletter',
      name: 'Newsletter + Links',
      description: 'Footer with newsletter signup + links',
      component: FooterNewsletter
    }
  ]
}