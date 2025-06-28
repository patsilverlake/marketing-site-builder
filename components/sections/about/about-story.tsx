'use client'

import { BaseSection } from '../base-section'
import { SectionData } from '@/lib/types'
import { Target, Users, Award, TrendingUp } from 'lucide-react'

interface AboutStoryProps {
  data: SectionData
  onUpdate: (updates: Partial<SectionData>) => void
  isEditing?: boolean
}

export function AboutStory({ data = { content: {} }, onUpdate, isEditing }: AboutStoryProps) {
  const { content = {} } = data || {}

  const defaultContent = {
    title: 'Our Story',
    subtitle: 'Building the future of productivity, one innovation at a time',
    story: 'Founded in 2020, we started with a simple mission: make work more efficient and enjoyable for everyone. What began as a small team of passionate engineers has grown into a global company serving thousands of customers worldwide.',
    mission: 'To empower teams with tools that unlock their full potential and drive meaningful results.',
    values: [
      {
        icon: 'Target',
        title: 'Focus on Impact',
        description: 'Everything we build is designed to create meaningful value for our users.'
      },
      {
        icon: 'Users',
        title: 'Customer First',
        description: 'Our customers\' success is our success. We listen, learn, and deliver.'
      },
      {
        icon: 'Award',
        title: 'Excellence',
        description: 'We hold ourselves to the highest standards in everything we do.'
      },
      {
        icon: 'TrendingUp',
        title: 'Growth Mindset',
        description: 'We embrace challenges and continuously evolve to stay ahead.'
      }
    ],
    stats: [
      { number: '50K+', label: 'Happy Customers' },
      { number: '150+', label: 'Countries Served' },
      { number: '99.9%', label: 'Uptime' },
      { number: '24/7', label: 'Support' }
    ],
    companyImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjEwMCIgeT0iMTAwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzlDQTNBRiIvPgo8dGV4dCB4PSIzMDAiIHk9IjIwOCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q29tcGFueSBQaG90bzwvdGV4dD4KPC9zdmc+'
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

  const iconMap = {
    Target: Target,
    Users: Users,
    Award: Award,
    TrendingUp: TrendingUp
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

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Text Content */}
          <div>
            {isEditing ? (
              <textarea
                value={currentContent.story}
                onChange={(e) => handleContentChange('story', e.target.value)}
                className="text-lg text-gray-700 leading-relaxed bg-transparent border-2 border-dashed border-blue-300 rounded p-2 w-full resize-none mb-8"
                rows={6}
              />
            ) : (
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {currentContent.story}
              </p>
            )}

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Our Mission</h3>
              {isEditing ? (
                <textarea
                  value={currentContent.mission}
                  onChange={(e) => handleContentChange('mission', e.target.value)}
                  className="text-gray-700 bg-transparent border border-gray-300 rounded p-2 w-full resize-none"
                  rows={3}
                />
              ) : (
                <p className="text-gray-700 italic">
                  {currentContent.mission}
                </p>
              )}
            </div>
          </div>

          {/* Company Image */}
          <div className="relative">
            {isEditing ? (
              <div className="bg-gray-100 rounded-xl p-8 min-h-[300px] flex items-center justify-center">
                <input
                  value={currentContent.companyImage}
                  onChange={(e) => handleContentChange('companyImage', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-center"
                  placeholder="Company image URL"
                />
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src={currentContent.companyImage}
                  alt="Company"
                  className="w-full h-auto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjEwMCIgeT0iMTAwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzlDQTNBRiIvPgo8dGV4dCB4PSIzMDAiIHk9IjIwOCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q29tcGFueSBQaG90bzwvdGV4dD4KPC9zdmc+'
                  }}
                />
                
                {/* Overlay with stats */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="text-white p-6">
                    <p className="text-sm opacity-90">Established 2020</p>
                    <p className="font-semibold">Empowering teams worldwide</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">Our Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentContent.values.map((value: any, index: number) => {
              const IconComponent = iconMap[value.icon as keyof typeof iconMap] || Target

              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-blue-100 group-hover:bg-blue-200 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  
                  {isEditing ? (
                    <input
                      value={value.title}
                      onChange={(e) => {
                        const updatedValues = [...currentContent.values]
                        updatedValues[index] = { ...updatedValues[index], title: e.target.value }
                        handleContentChange('values', updatedValues)
                      }}
                      className="font-semibold text-gray-900 bg-transparent border border-gray-300 rounded p-1 w-full mb-2"
                    />
                  ) : (
                    <h4 className="font-semibold text-gray-900 mb-2">{value.title}</h4>
                  )}

                  {isEditing ? (
                    <textarea
                      value={value.description}
                      onChange={(e) => {
                        const updatedValues = [...currentContent.values]
                        updatedValues[index] = { ...updatedValues[index], description: e.target.value }
                        handleContentChange('values', updatedValues)
                      }}
                      className="text-gray-600 bg-transparent border border-gray-300 rounded p-2 w-full resize-none"
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {currentContent.stats.map((stat: any, index: number) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Join Our Journey?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Be part of a company that's committed to making a positive impact on how teams work together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
              Get Started Today
            </button>
            <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200">
              Learn More About Us
            </button>
          </div>
        </div>
      </div>
    </BaseSection>
  )
}