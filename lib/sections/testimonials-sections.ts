import { SectionDefinition } from '@/lib/types'
import { TestimonialsGrid } from '@/components/sections/testimonials/testimonials-grid'
import { TestimonialsCarousel } from '@/components/sections/testimonials/testimonials-carousel'
import { TestimonialsSingle } from '@/components/sections/testimonials/testimonials-single'
import { TestimonialsLogos } from '@/components/sections/testimonials/testimonials-logos'

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
    },
    {
      id: 'testimonials-carousel',
      name: 'Testimonial Carousel',
      description: 'Customer testimonial carousel',
      component: TestimonialsCarousel
    },
    {
      id: 'testimonials-single',
      name: 'Single Large Testimonial',
      description: 'Single large testimonial with customer photo',
      component: TestimonialsSingle
    },
    {
      id: 'testimonials-logos',
      name: 'Logo Wall with Quotes',
      description: 'Logo wall with customer quotes',
      component: TestimonialsLogos
    }
  ]
}