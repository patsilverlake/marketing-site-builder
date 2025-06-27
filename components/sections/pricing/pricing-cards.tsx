import { BaseSection } from '@/components/sections/base-section'
import { SectionProps } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

interface PricingPlan {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  ctaText: string
  ctaHref: string
  popular?: boolean
}

interface PricingCardsContent {
  title: string
  subtitle: string
  plans: PricingPlan[]
}

export function PricingCards({ content, isEditing }: SectionProps) {
  const {
    title = "Simple, transparent pricing",
    subtitle = "Choose the plan that's right for you",
    plans = [
      {
        name: "Starter",
        price: "$9",
        period: "per month",
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
        price: "$29",
        period: "per month",
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
        price: "$99",
        period: "per month",
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
  } = content as PricingCardsContent

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
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
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