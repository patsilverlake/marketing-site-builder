import { sectionRegistry } from '@/lib/section-registry'
import { headerSections } from './header-sections'
import { heroSections } from './hero-sections'
import { featuresSections } from './features-sections'
import { pricingSections } from './pricing-sections'
import { testimonialsSections } from './testimonials-sections'
import { ctaSections } from './cta-sections'
import { footerSections } from './footer-sections'

// Register all sections with the registry
export function registerAllSections() {
  sectionRegistry.register(headerSections)
  sectionRegistry.register(heroSections)
  sectionRegistry.register(featuresSections)
  sectionRegistry.register(pricingSections)
  sectionRegistry.register(testimonialsSections)
  sectionRegistry.register(ctaSections)
  sectionRegistry.register(footerSections)
}

// Export all section definitions for easy access
export {
  headerSections,
  heroSections,
  featuresSections,
  pricingSections,
  testimonialsSections,
  ctaSections,
  footerSections
}