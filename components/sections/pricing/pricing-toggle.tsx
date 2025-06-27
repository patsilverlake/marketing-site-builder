import { useState } from 'react'
import { BaseSection } from '@/components/sections/base-section'
import { SectionProps } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

interface PricingPlan {
  name: string
  monthlyPrice: string
  yearlyPrice: string
  description: string
  features: string[]
  ctaText: string
  ctaHref: string
  popular?: boolean
}

interface PricingToggleContent {
  title: string
  subtitle: string
  plans: PricingPlan[]
}

export function PricingToggle({ content, isEditing }: SectionProps) {
  const [isYearly, setIsYearly] = useState(false)
  
  const {
    title = "Simple, transparent pricing",
    subtitle = "Choose the plan that's right for you",
    plans = [
      {
        name: "Starter",
        monthlyPrice: "$9",
        yearlyPrice: "$90",
        description: "Perfect for individuals and small projects",
        features: [
          "Up to 5 pages",
          "Basic templates",
          "Email support",
          "SSL certificate"
        ],
        ctaText: "Get Started",
        ctaHref: "#"
      },
      {
        name: "Professional",
        monthlyPrice: "$29",
        yearlyPrice: "$290",
        description: "Best for growing businesses",
        features: [
          "Unlimited pages",
          "Premium templates",
          "Priority support",
          "Custom domain",
          "Analytics dashboard",
          "A/B testing"
        ],
        ctaText: "Start Free Trial",
        ctaHref: "#",
        popular: true
      },
      {
        name: "Enterprise",
        monthlyPrice: "$99",
        yearlyPrice: "$990",
        description: "For large organizations",
        features: [
          "Everything in Professional",
          "White-label solution",
          "Dedicated support",
          "Custom integrations",
          "Advanced analytics",
          "Team collaboration"
        ],
        ctaText: "Contact Sales",
        ctaHref: "#"
      }
    ]
  } = content as PricingToggleContent

  return (
    <BaseSection className="bg-gray-50 py-20" isEditing={isEditing}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600">
            {subtitle}
          </p>
          
          {/* Toggle */}
          <div className="mt-8 flex justify-center">
            <div className="bg-white p-1 rounded-lg shadow-sm border">
              <div className="flex">
                <button
                  onClick={() => setIsYearly(false)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    !isYearly 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsYearly(true)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isYearly 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Yearly
                  <span className="ml-1 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
                    Save 17%
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-lg shadow-sm p-6 ${
                plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-600 ml-1">
                    {isYearly ? '/year' : '/month'}
                  </span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
                asChild
              >
                <a href={plan.ctaHref}>{plan.ctaText}</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </BaseSection>
  )
}