'use client'

import { BaseSection } from '../base-section'
import { SectionData } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Users, Star, Globe, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react'

interface CtaSocialProofProps {
  data: SectionData
  onUpdate: (updates: Partial<SectionData>) => void
  isEditing?: boolean
}

export function CtaSocialProof({ data, onUpdate, isEditing }: CtaSocialProofProps) {
  const { content } = data

  const defaultContent = {
    title: 'Join 50,000+ Companies Already Using Our Platform',
    subtitle: 'See why industry leaders choose us to transform their business operations.',
    buttonText: 'Start Your Free Trial',
    buttonUrl: '#signup',
    stats: [
      { number: '50,000+', label: 'Companies Trust Us', icon: 'Users' },
      { number: '4.9/5', label: 'Average Rating', icon: 'Star' },
      { number: '150+', label: 'Countries Served', icon: 'Globe' },
      { number: '99.9%', label: 'Uptime Guarantee', icon: 'TrendingUp' }
    ],
    benefits: [
      'Setup in under 5 minutes',
      'No credit card required',
      '14-day free trial',
      'Cancel anytime'
    ],
    testimonial: {
      quote: 'This platform helped us increase our productivity by 300% in just 3 months.',
      author: 'Sarah Johnson',
      position: 'CEO at TechCorp',
      avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB4PSIxMiIgeT0iMTIiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMTIgMTJDMTQuNDg1MyAxMiAxNi41IDkuOTg1MjggMTYuNSA3LjVDMTYuNSA1LjAxNDcyIDE0LjQ4NTMgMyAxMiAzQzkuNTE0NzIgMyA3LjUgNS4wMTQ3MiA3LjUgNy41QzcuNSA5Ljk4NTI4IDkuNTE0NzIgMTIgMTIgMTJaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0xMiAxNEM3LjAyOTQ0IDE0IDMgMTguMDI5NCAzIDIzSDIxQzIxIDE4LjAyOTQgMTYuOTcwNiAxNCAxMiAxNFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+Cjwvc3ZnPgo='
    }
  }

  const currentContent = { ...defaultContent, ...content }

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
    Star: Star,
    Globe: Globe,
    TrendingUp: TrendingUp
  }

  return (
    <BaseSection className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="text-center mb-16">
          {isEditing ? (
            <input
              value={currentContent.title}
              onChange={(e) => handleContentChange('title', e.target.value)}
              className="text-3xl md:text-4xl font-bold text-gray-900 bg-transparent border-2 border-dashed border-blue-300 rounded p-2 w-full max-w-4xl mx-auto text-center mb-6"
            />
          ) : (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {currentContent.title}
            </h2>
          )}

          {isEditing ? (
            <textarea
              value={currentContent.subtitle}
              onChange={(e) => handleContentChange('subtitle', e.target.value)}
              className="text-lg text-gray-600 bg-transparent border-2 border-dashed border-blue-300 rounded p-2 w-full max-w-2xl mx-auto resize-none mb-8"
              rows={2}
            />
          ) : (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              {currentContent.subtitle}
            </p>
          )}

          {/* Primary CTA */}
          <div className="mb-12">
            <Button size="lg" className="text-lg px-8 py-4 mr-4">
              {isEditing ? (
                <input
                  value={currentContent.buttonText}
                  onChange={(e) => handleContentChange('buttonText', e.target.value)}
                  className="bg-transparent border-none outline-none text-white placeholder-white/70"
                  placeholder="Button Text"
                />
              ) : (
                <>
                  {currentContent.buttonText}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Watch Demo
            </Button>
          </div>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-12">
            {currentContent.benefits.map((benefit: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {currentContent.stats.map((stat: any, index: number) => {
            const IconComponent = iconMap[stat.icon as keyof typeof iconMap] || Users

            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-blue-100 group-hover:bg-blue-200 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-colors duration-300">
                  <IconComponent className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Featured Testimonial */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center mb-16">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
          </div>
          
          {isEditing ? (
            <textarea
              value={currentContent.testimonial.quote}
              onChange={(e) => handleContentChange('testimonial', { ...currentContent.testimonial, quote: e.target.value })}
              className="text-xl md:text-2xl text-gray-900 italic bg-transparent border-2 border-dashed border-blue-300 rounded p-2 w-full max-w-3xl mx-auto resize-none mb-6"
              rows={3}
            />
          ) : (
            <blockquote className="text-xl md:text-2xl text-gray-900 italic mb-6 max-w-3xl mx-auto">
              "{currentContent.testimonial.quote}"
            </blockquote>
          )}

          <div className="flex items-center justify-center gap-4">
            <img
              src={currentContent.testimonial.avatar}
              alt={currentContent.testimonial.author}
              className="w-12 h-12 rounded-full"
            />
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

        {/* Company Logos */}
        <div className="text-center">
          <p className="text-gray-600 mb-8">Trusted by leading companies worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-12 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-400 font-medium">Logo {index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA with Urgency */}
        <div className="mt-16 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 text-blue-700 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Limited Time Offer</span>
            </div>
            <p className="text-sm text-blue-600">
              Start your free trial today and get 3 months of premium features at no cost
            </p>
          </div>
        </div>
      </div>
    </BaseSection>
  )
}