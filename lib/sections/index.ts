import { sectionRegistry } from '@/lib/section-registry'
import { headerSections } from './header-sections'
import { heroSections } from './hero-sections'
import { featuresSections } from './features-sections'
import { pricingSections } from './pricing-sections'
import { testimonialsSections } from './testimonials-sections'
import { ctaSections } from './cta-sections'
import { footerSections } from './footer-sections'
import { aboutSections } from './about-sections'
import { faqSections } from './faq-sections'
import { statsSections } from './stats-sections'
import { newsletterSections } from './newsletter-sections'

// Register all sections with the registry
export function registerAllSections() {
  sectionRegistry.register(headerSections)
  sectionRegistry.register(heroSections)
  sectionRegistry.register(featuresSections)
  sectionRegistry.register(pricingSections)
  sectionRegistry.register(testimonialsSections)
  sectionRegistry.register(ctaSections)
  sectionRegistry.register(aboutSections)
  sectionRegistry.register(faqSections)
  sectionRegistry.register(statsSections)
  sectionRegistry.register(newsletterSections)
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
  aboutSections,
  faqSections,
  statsSections,
  newsletterSections,
  footerSections
}