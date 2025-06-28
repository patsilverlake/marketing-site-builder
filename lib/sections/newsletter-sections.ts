import { SectionDefinition } from '@/lib/types'
import { NewsletterSimple } from '@/components/sections/newsletter/newsletter-simple'

export const newsletterSections: SectionDefinition = {
  type: 'newsletter',
  name: 'Newsletter',
  icon: '📧',
  variations: [
    {
      id: 'newsletter-simple',
      name: 'Newsletter Signup',
      description: 'Newsletter signup with benefits',
      component: NewsletterSimple
    }
  ]
}