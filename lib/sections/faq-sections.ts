import { SectionDefinition } from '@/lib/types'
import { FaqAccordion } from '@/components/sections/faq/faq-accordion'
import { FaqGrid } from '@/components/sections/faq/faq-grid'

export const faqSections: SectionDefinition = {
  type: 'faq',
  name: 'FAQ',
  icon: '❓',
  variations: [
    {
      id: 'faq-accordion',
      name: 'Accordion Style',
      description: 'Expandable FAQ accordion',
      component: FaqAccordion
    },
    {
      id: 'faq-grid',
      name: 'Categorized Grid',
      description: 'FAQ organized by categories',
      component: FaqGrid
    }
  ]
}