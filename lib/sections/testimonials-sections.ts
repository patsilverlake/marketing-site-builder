import { SectionDefinition } from '@/lib/types'
import { TestimonialsGrid } from '@/components/sections/testimonials/testimonials-grid'

export const testimonialsSections: SectionDefinition = {
  type: 'testimonials',
  name: 'Testimonials',
  icon: '💬',
  variations: [
    {
      id: 'testimonials-grid',
      name: 'Grid of Cards',
      description: 'Grid of testimonial cards',
      component: TestimonialsGrid
    }
  ]
}