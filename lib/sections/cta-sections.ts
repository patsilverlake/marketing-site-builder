import { SectionDefinition } from '@/lib/types'
import { CtaSimple } from '@/components/sections/cta/cta-simple'
import { CtaEmail } from '@/components/sections/cta/cta-email'
import { CtaContact } from '@/components/sections/cta/cta-contact'

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
    },
    {
      id: 'cta-email',
      name: 'Email Signup',
      description: 'CTA with email signup form',
      component: CtaEmail
    },
    {
      id: 'cta-contact',
      name: 'Contact Form',
      description: 'CTA with contact form',
      component: CtaContact
    }
  ]
}