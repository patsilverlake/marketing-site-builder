'use client'

import { useEffect, useState } from 'react'
import { BaseSection } from '../base-section'
import { SectionData } from '@/lib/types'
import { TrendingUp, Users, Globe, Award, Zap, Target } from 'lucide-react'

interface StatsCountersProps {
  data: SectionData
  onUpdate: (updates: Partial<SectionData>) => void
  isEditing?: boolean
}

export function StatsCounters({ data, onUpdate, isEditing }: StatsCountersProps) {
  const { content } = data
  const [isVisible, setIsVisible] = useState(false)

  const defaultContent = {
    title: 'Trusted by Industry Leaders',
    subtitle: 'Join thousands of companies that rely on our platform for their success',
    stats: [
      {
        number: '50000',
        suffix: '+',
        label: 'Happy Customers',
        icon: 'Users',
        color: 'blue'
      },
      {
        number: '99.9',
        suffix: '%',
        label: 'Uptime Guarantee',
        icon: 'TrendingUp',
        color: 'green'
      },
      {
        number: '150',
        suffix: '+',
        label: 'Countries Served',
        icon: 'Globe',
        color: 'purple'
      },
      {
        number: '24',
        suffix: '/7',
        label: 'Support Available',
        icon: 'Award',
        color: 'orange'
      }
    ],
    testimonial: {
      quote: 'This platform has transformed how we work. The results speak for themselves.',
      author: 'Sarah Johnson',
      position: 'CEO, TechCorp',
      company: 'TechCorp'
    }
  }

  const currentContent = { ...defaultContent, ...content }

  // Animated counter hook
  const useCounter = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (!isVisible) return

      let startTime: number
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(step)
        }
      }
      requestAnimationFrame(step)
    }, [end, duration, isVisible])

    return count
  }

  // Intersection observer to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('stats-section')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const handleContentChange = (field: string, value: any) => {
    onUpdate({
      content: {
        ...currentContent,
        [field]: value
      }
    })
  }

  const iconMap = {
    Users: Users,
    TrendingUp: TrendingUp,
    Globe: Globe,
    Award: Award,
    Zap: Zap,
    Target: Target
  }

  const colorMap = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  }

  return (
    <BaseSection id="stats-section" className="py-20 bg-gray-50">
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

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {currentContent.stats.map((stat: any, index: number) => {
            const IconComponent = iconMap[stat.icon as keyof typeof iconMap] || Users
            const colorClasses = colorMap[stat.color as keyof typeof colorMap] || colorMap.blue
            const animatedNumber = useCounter(parseInt(stat.number))

            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-8 text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-16 h-16 ${colorClasses} rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {isEditing ? (
                    <input
                      value={stat.number}
                      onChange={(e) => {
                        const updatedStats = [...currentContent.stats]
                        updatedStats[index] = { ...updatedStats[index], number: e.target.value }
                        handleContentChange('stats', updatedStats)
                      }}
                      className="text-center bg-transparent border border-gray-300 rounded p-1 w-16"
                    />
                  ) : (
                    <span>
                      {stat.number.includes('.') ? stat.number : animatedNumber}
                      {stat.suffix}
                    </span>
                  )}
                </div>

                {isEditing ? (
                  <input
                    value={stat.label}
                    onChange={(e) => {
                      const updatedStats = [...currentContent.stats]
                      updatedStats[index] = { ...updatedStats[index], label: e.target.value }
                      handleContentChange('stats', updatedStats)
                    }}
                    className="text-gray-600 bg-transparent border border-gray-300 rounded p-1 w-full"
                  />
                ) : (
                  <div className="text-gray-600">{stat.label}</div>
                )}
              </div>
            )
          })}
        </div>

        {/* Testimonial */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 md:p-12 text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {isEditing ? (
            <textarea
              value={currentContent.testimonial.quote}
              onChange={(e) => handleContentChange('testimonial', { ...currentContent.testimonial, quote: e.target.value })}
              className="text-xl md:text-2xl text-gray-900 italic bg-transparent border-2 border-dashed border-blue-300 rounded p-2 w-full resize-none mb-6"
              rows={3}
            />
          ) : (
            <blockquote className="text-xl md:text-2xl text-gray-900 italic mb-6">
              "{currentContent.testimonial.quote}"
            </blockquote>
          )}

          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-gray-600" />
            </div>
            <div className="text-left">
              {isEditing ? (
                <div className="space-y-1">
                  <input
                    value={currentContent.testimonial.author}
                    onChange={(e) => handleContentChange('testimonial', { ...currentContent.testimonial, author: e.target.value })}
                    className="font-semibold text-gray-900 bg-transparent border border-gray-300 rounded p-1"
                  />
                  <input
                    value={currentContent.testimonial.position}
                    onChange={(e) => handleContentChange('testimonial', { ...currentContent.testimonial, position: e.target.value })}
                    className="text-gray-600 bg-transparent border border-gray-300 rounded p-1 text-sm"
                  />
                </div>
              ) : (
                <>
                  <div className="font-semibold text-gray-900">{currentContent.testimonial.author}</div>
                  <div className="text-gray-600 text-sm">{currentContent.testimonial.position}</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 group cursor-pointer">
            <span className="font-medium">Join these industry leaders</span>
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