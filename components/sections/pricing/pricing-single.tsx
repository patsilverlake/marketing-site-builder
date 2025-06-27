import { BaseSection } from '@/components/sections/base-section'
import { SectionProps } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

interface PricingSingleContent {
  title: string
  subtitle: string
  price: string
  period: string
  description: string
  features: string[]
  ctaText: string
  ctaHref: string
  guaranteeText?: string
}

export function PricingSingle({ content, isEditing }: SectionProps) {
  const {
    title = "Simple Pricing",
    subtitle = "One plan that includes everything you need",
    price = "$29",
    period = "per month",
    description = "Perfect for businesses of all sizes",
    features = [
      "Unlimited pages and sections",
      "All premium templates",
      "Custom domain support",
      "Priority email support",
      "Analytics dashboard",
      "A/B testing tools",
      "White-label options",
      "API access",
      "Team collaboration",
      "Advanced integrations"
    ],
    ctaText = "Start Free Trial",
    ctaHref = "#",
    guaranteeText = "30-day money-back guarantee"
  } = content as PricingSingleContent

  return (
    <BaseSection className="bg-white py-20" isEditing={isEditing}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600">
            {subtitle}
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Price and description */}
            <div className="text-center lg:text-left">
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">{price}</span>
                <span className="text-xl text-gray-600 ml-2">{period}</span>
              </div>
              <p className="text-lg text-gray-700 mb-8">{description}</p>
              
              <div className="space-y-4">
                <Button size="lg" className="w-full lg:w-auto" asChild>
                  <a href={ctaHref}>{ctaText}</a>
                </Button>
                
                {guaranteeText && (
                  <p className="text-sm text-gray-600 flex items-center justify-center lg:justify-start">
                    <span className="mr-2">🛡️</span>
                    {guaranteeText}
                  </p>
                )}
              </div>
            </div>

            {/* Right side - Features */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center lg:text-left">
                Everything included:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">Trusted by 10,000+ businesses worldwide</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <span className="text-2xl">🏢</span>
            <span className="text-2xl">🚀</span>
            <span className="text-2xl">💼</span>
            <span className="text-2xl">🌟</span>
            <span className="text-2xl">🎯</span>
          </div>
        </div>
      </div>
    </BaseSection>
  )
}