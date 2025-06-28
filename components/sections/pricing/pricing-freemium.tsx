'use client'

import { BaseSection } from '../base-section'
import { SectionData } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Check, X, Star, Zap } from 'lucide-react'

interface PricingFreemiumProps {
  data: SectionData
  onUpdate: (updates: Partial<SectionData>) => void
  isEditing?: boolean
}

export function PricingFreemium({ data = { content: {} }, onUpdate, isEditing }: PricingFreemiumProps) {
  const { content = {} } = data || {}

  const defaultContent = {
    title: 'Choose Your Plan',
    subtitle: 'Start free, upgrade when you\'re ready to scale',
    plans: [
      {
        name: 'Free',
        price: '$0',
        period: 'forever',
        description: 'Perfect for getting started',
        features: [
          { text: '5 projects', included: true },
          { text: '10GB storage', included: true },
          { text: 'Basic templates', included: true },
          { text: 'Community support', included: true },
          { text: 'Custom domain', included: false },
          { text: 'Advanced analytics', included: false },
          { text: 'Priority support', included: false }
        ],
        buttonText: 'Get Started Free',
        popular: false,
        badge: ''
      },
      {
        name: 'Pro',
        price: '$19',
        period: '/month',
        description: 'For growing businesses',
        features: [
          { text: 'Unlimited projects', included: true },
          { text: '100GB storage', included: true },
          { text: 'Premium templates', included: true },
          { text: 'Email support', included: true },
          { text: 'Custom domain', included: true },
          { text: 'Advanced analytics', included: true },
          { text: 'Priority support', included: false }
        ],
        buttonText: 'Start Pro Trial',
        popular: true,
        badge: 'Most Popular'
      },
      {
        name: 'Enterprise',
        price: '$99',
        period: '/month',
        description: 'For large organizations',
        features: [
          { text: 'Unlimited everything', included: true },
          { text: 'Unlimited storage', included: true },
          { text: 'White-label solution', included: true },
          { text: 'Dedicated support', included: true },
          { text: 'Custom integrations', included: true },
          { text: 'Advanced security', included: true },
          { text: '24/7 phone support', included: true }
        ],
        buttonText: 'Contact Sales',
        popular: false,
        badge: 'Enterprise'
      }
    ]
  }

  const currentContent = { ...defaultContent, ...content }

  const handleContentChange = (field: string, value: any) => {
    if (onUpdate) {
      onUpdate({
        content: {
          ...currentContent,
          [field]: value
      }
        })
    }
  }

  return (
    <BaseSection className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {isEditing ? (
            <input
              value={currentContent.title}
              onChange={(e) => handleContentChange('title', e.target.value)}
              className="text-3xl md:text-4xl font-bold text-gray-900 bg-transparent border-2 border-dashed border-blue-300 rounded p-2 w-full max-w-2xl mx-auto text-center"
            />
          ) : (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {currentContent.title}
            </h2>
          )}
          
          {isEditing ? (
            <textarea
              value={currentContent.subtitle}
              onChange={(e) => handleContentChange('subtitle', e.target.value)}
              className="text-lg text-gray-600 bg-transparent border-2 border-dashed border-blue-300 rounded p-2 w-full max-w-2xl mx-auto resize-none"
              rows={2}
            />
          ) : (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {currentContent.subtitle}
            </p>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-4">
          {currentContent.plans.map((plan: any, index: number) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-blue-500 lg:transform lg:scale-105' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Name & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  {index === 0 && (
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Free Forever
                    </div>
                  )}
                  {index === 2 && (
                    <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      {plan.badge}
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </div>

                {/* CTA Button */}
                <Button 
                  className={`w-full mb-8 ${
                    plan.popular 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : index === 0 
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>

                {/* Features */}
                <div className="space-y-4">
                  <p className="font-semibold text-gray-900">What's included:</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature: any, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={feature.included ? 'text-gray-900' : 'text-gray-400'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Free Plan Special Footer */}
              {index === 0 && (
                <div className="bg-green-50 border-t border-green-200 px-8 py-4 rounded-b-2xl">
                  <p className="text-sm text-green-800 text-center font-medium">
                    No credit card required • Cancel anytime
                  </p>
                </div>
              )}

              {/* Pro Plan Special Footer */}
              {index === 1 && (
                <div className="bg-blue-50 border-t border-blue-200 px-8 py-4 rounded-b-2xl">
                  <p className="text-sm text-blue-800 text-center font-medium">
                    14-day free trial • No setup fees
                  </p>
                </div>
              )}

              {/* Enterprise Plan Special Footer */}
              {index === 2 && (
                <div className="bg-purple-50 border-t border-purple-200 px-8 py-4 rounded-b-2xl">
                  <p className="text-sm text-purple-800 text-center font-medium">
                    Custom pricing • Dedicated success manager
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom section with upgrade path */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Growing with you</h3>
            <p className="text-gray-600 mb-6">
              Start with our free plan and upgrade as your needs grow. No surprises, no hidden fees.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Easy upgrades</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Prorated billing</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Data migration included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseSection>
  )
}