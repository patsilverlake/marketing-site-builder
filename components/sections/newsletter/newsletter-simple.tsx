'use client'

import { useState } from 'react'
import { BaseSection } from '../base-section'
import { SectionData } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Mail, CheckCircle, Users, Bell } from 'lucide-react'

interface NewsletterSimpleProps {
  data: SectionData
  onUpdate: (updates: Partial<SectionData>) => void
  isEditing?: boolean
}

export function NewsletterSimple({ data, onUpdate, isEditing }: NewsletterSimpleProps) {
  const { content } = data
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const defaultContent = {
    title: 'Stay in the Loop',
    subtitle: 'Get the latest updates, insights, and exclusive content delivered straight to your inbox.',
    placeholder: 'Enter your email address',
    buttonText: 'Subscribe Now',
    privacyText: 'We respect your privacy. No spam, ever.',
    benefits: [
      'Weekly industry insights',
      'Product updates & new features',
      'Exclusive tips and tutorials',
      'Early access to beta features'
    ],
    stats: {
      subscribers: '25,000+',
      frequency: 'Weekly'
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      // Here you would typically send the email to your newsletter service
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <BaseSection className="py-20 bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            {/* Icon */}
            <div className="w-16 h-16 bg-blue-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>

            {/* Title */}
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

            {/* Subtitle */}
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

          {/* Subscription Form */}
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={currentContent.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="whitespace-nowrap">
                  {isEditing ? (
                    <input
                      value={currentContent.buttonText}
                      onChange={(e) => handleContentChange('buttonText', e.target.value)}
                      className="bg-transparent border-none outline-none text-white placeholder-white/70"
                      placeholder="Button Text"
                    />
                  ) : (
                    currentContent.buttonText
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">You're all set!</h3>
              <p className="text-gray-600">Thank you for subscribing. Check your email for confirmation.</p>
            </div>
          )}

          {/* Privacy Text */}
          <div className="text-center mb-8">
            {isEditing ? (
              <input
                value={currentContent.privacyText}
                onChange={(e) => handleContentChange('privacyText', e.target.value)}
                className="text-sm text-gray-500 bg-transparent border border-gray-300 rounded p-1 w-full max-w-md mx-auto"
              />
            ) : (
              <p className="text-sm text-gray-500">
                {currentContent.privacyText}
              </p>
            )}
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">What you'll get:</h3>
              <ul className="space-y-3">
                {currentContent.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    {isEditing ? (
                      <input
                        value={benefit}
                        onChange={(e) => {
                          const updatedBenefits = [...currentContent.benefits]
                          updatedBenefits[index] = e.target.value
                          handleContentChange('benefits', updatedBenefits)
                        }}
                        className="text-gray-600 bg-transparent border border-gray-300 rounded p-1 flex-1"
                      />
                    ) : (
                      <span className="text-gray-600">{benefit}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Newsletter stats:</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium text-gray-900">{currentContent.stats.subscribers} subscribers</div>
                    <div className="text-sm text-gray-600">Join our growing community</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-purple-500" />
                  <div>
                    <div className="font-medium text-gray-900">{currentContent.stats.frequency} delivery</div>
                    <div className="text-sm text-gray-600">Just the right amount of content</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">Trusted by professionals at:</p>
            <div className="flex justify-center items-center gap-6 opacity-60">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-8 bg-gray-200 rounded flex items-center justify-center px-4">
                  <span className="text-gray-400 text-xs font-medium">Company {index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BaseSection>
  )
}