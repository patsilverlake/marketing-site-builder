'use client'

import { BaseSection } from '../base-section'
import { SectionData } from '@/lib/types'
import { Zap, Shield, Rocket, Heart, Users, Globe } from 'lucide-react'

interface FeaturesCardsProps {
  data: SectionData
  onUpdate: (updates: Partial<SectionData>) => void
  isEditing?: boolean
}

export function FeaturesCards({ data = { content: {} }, onUpdate, isEditing }: FeaturesCardsProps) {
  const { content = {} } = data || {}

  const defaultContent = {
    title: 'Powerful Features',
    subtitle: 'Everything you need to succeed, all in one place',
    features: [
      {
        icon: 'Zap',
        title: 'Lightning Fast',
        description: 'Optimized performance that delivers results in milliseconds, not minutes.'
      },
      {
        icon: 'Shield',
        title: 'Secure & Safe',
        description: 'Enterprise-grade security with end-to-end encryption and compliance.'
      },
      {
        icon: 'Rocket',
        title: 'Easy to Scale',
        description: 'Grow your business without limits. Our platform scales with you.'
      },
      {
        icon: 'Heart',
        title: '24/7 Support',
        description: 'Our dedicated team is here to help you succeed, around the clock.'
      },
      {
        icon: 'Users',
        title: 'Team Collaboration',
        description: 'Work together seamlessly with powerful collaboration tools.'
      },
      {
        icon: 'Globe',
        title: 'Global Reach',
        description: 'Connect with customers worldwide with our global infrastructure.'
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

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const updatedFeatures = [...currentContent.features]
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value }
    handleContentChange('features', updatedFeatures)
  }

  const iconMap = {
    Zap: Zap,
    Shield: Shield,
    Rocket: Rocket,
    Heart: Heart,
    Users: Users,
    Globe: Globe
  }

  return (
    <BaseSection className="py-20 bg-white">
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

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentContent.features.map((feature: any, index: number) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Zap

            return (
              <div
                key={index}
                className="group relative bg-white rounded-xl border border-gray-200 p-8 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300 transition-all duration-300 hover:-translate-y-2"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center mb-6 transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                  </div>

                  {/* Title */}
                  {isEditing ? (
                    <input
                      value={feature.title}
                      onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                      className="text-xl font-semibold text-gray-900 bg-transparent border border-gray-300 rounded p-1 w-full mb-3"
                    />
                  ) : (
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors duration-300">
                      {feature.title}
                    </h3>
                  )}

                  {/* Description */}
                  {isEditing ? (
                    <textarea
                      value={feature.description}
                      onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                      className="text-gray-600 bg-transparent border border-gray-300 rounded p-1 w-full resize-none"
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {feature.description}
                    </p>
                  )}

                  {/* Hover effect arrow */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                     style={{ padding: '1px' }}>
                  <div className="w-full h-full bg-white rounded-xl" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 group cursor-pointer">
            <span className="font-medium">Explore all features</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </BaseSection>
  )
}