import { SectionDefinition } from '@/lib/types'
import { CtaSimple } from '@/components/sections/cta/cta-simple'
import { CtaEmail } from '@/components/sections/cta/cta-email'
import { CtaContact } from '@/components/sections/cta/cta-contact'
import { CtaDownload } from '@/components/sections/cta/cta-download'
import { CtaSocialProof } from '@/components/sections/cta/cta-social-proof'

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
    },
    {
      id: 'cta-download',
      name: 'App Download',
      description: 'CTA with app download buttons',
      component: CtaDownload
    },
    {
      id: 'cta-social-proof',
      name: 'Social Proof',
      description: 'CTA with social proof numbers',
      component: CtaSocialProof
    }
  ]
}