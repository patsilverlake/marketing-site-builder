'use client'

import { BaseSection } from '../base-section'
import { SectionData } from '@/lib/types'
import { HelpCircle, MessageCircle, BookOpen, Users } from 'lucide-react'

interface FaqGridProps {
  data: SectionData
  onUpdate: (updates: Partial<SectionData>) => void
  isEditing?: boolean
}

export function FaqGrid({ data = { content: {} }, onUpdate, isEditing }: FaqGridProps) {
  const { content = {} } = data || {}

  const defaultContent = {
    title: 'How can we help you?',
    subtitle: 'Everything you need to know about our product and services',
    categories: [
      {
        title: 'Getting Started',
        icon: 'BookOpen',
        color: 'blue',
        faqs: [
          {
            question: 'How do I create my first project?',
            answer: 'Click the "New Project" button in your dashboard and follow our step-by-step guide.'
          },
          {
            question: 'What are the system requirements?',
            answer: 'Our platform works on any modern web browser. No downloads required!'
          },
          {
            question: 'Is there a mobile app?',
            answer: 'Yes! Download our mobile app from the App Store or Google Play.'
          }
        ]
      },
      {
        title: 'Account & Billing',
        icon: 'Users',
        color: 'green',
        faqs: [
          {
            question: 'How do I upgrade my plan?',
            answer: 'Go to Account Settings > Billing and select your desired plan.'
          },
          {
            question: 'Can I change my billing cycle?',
            answer: 'Yes, you can switch between monthly and annual billing anytime.'
          },
          {
            question: 'Do you offer refunds?',
            answer: 'We offer a 30-day money-back guarantee for all paid plans.'
          }
        ]
      },
      {
        title: 'Features & Usage',
        icon: 'HelpCircle',
        color: 'purple',
        faqs: [
          {
            question: 'What\'s included in the free plan?',
            answer: 'The free plan includes up to 3 projects and basic features.'
          },
          {
            question: 'Can I collaborate with my team?',
            answer: 'Yes! Pro and Enterprise plans include team collaboration features.'
          },
          {
            question: 'Is there an API available?',
            answer: 'Yes, we provide a RESTful API for Enterprise customers.'
          }
        ]
      },
      {
        title: 'Support & Contact',
        icon: 'MessageCircle',
        color: 'orange',
        faqs: [
          {
            question: 'How can I contact support?',
            answer: 'Use our live chat, email us, or check our knowledge base.'
          },
          {
            question: 'What are your support hours?',
            answer: 'We provide 24/7 support for all customers.'
          },
          {
            question: 'Do you offer training?',
            answer: 'Yes! We offer free onboarding sessions and training materials.'
          }
        ]
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

  const iconMap = {
    BookOpen: BookOpen,
    Users: Users,
    HelpCircle: HelpCircle,
    MessageCircle: MessageCircle
  }

  const colorMap = {
    blue: 'bg-blue-100 text-blue-600 border-blue-200',
    green: 'bg-green-100 text-green-600 border-green-200',
    purple: 'bg-purple-100 text-purple-600 border-purple-200',
    orange: 'bg-orange-100 text-orange-600 border-orange-200'
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

        {/* FAQ Categories Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {currentContent.categories.map((category: any, categoryIndex: number) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap] || HelpCircle
            const colorClasses = colorMap[category.color as keyof typeof colorMap] || colorMap.blue

            return (
              <div key={categoryIndex} className="bg-gray-50 rounded-xl p-8">
                {/* Category Header */}
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${colorClasses}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  {isEditing ? (
                    <input
                      value={category.title}
                      onChange={(e) => {
                        const updatedCategories = [...currentContent.categories]
                        updatedCategories[categoryIndex] = { ...updatedCategories[categoryIndex], title: e.target.value }
                        handleContentChange('categories', updatedCategories)
                      }}
                      className="text-xl font-semibold text-gray-900 bg-transparent border border-gray-300 rounded p-1 flex-1"
                    />
                  ) : (
                    <h3 className="text-xl font-semibold text-gray-900">
                      {category.title}
                    </h3>
                  )}
                </div>

                {/* FAQs List */}
                <div className="space-y-6">
                  {category.faqs.map((faq: any, faqIndex: number) => (
                    <div key={faqIndex}>
                      {isEditing ? (
                        <input
                          value={faq.question}
                          onChange={(e) => {
                            const updatedCategories = [...currentContent.categories]
                            const updatedFaqs = [...updatedCategories[categoryIndex].faqs]
                            updatedFaqs[faqIndex] = { ...updatedFaqs[faqIndex], question: e.target.value }
                            updatedCategories[categoryIndex] = { ...updatedCategories[categoryIndex], faqs: updatedFaqs }
                            handleContentChange('categories', updatedCategories)
                          }}
                          className="font-medium text-gray-900 bg-transparent border border-gray-300 rounded p-1 w-full mb-2"
                        />
                      ) : (
                        <h4 className="font-medium text-gray-900 mb-2">
                          {faq.question}
                        </h4>
                      )}

                      {isEditing ? (
                        <textarea
                          value={faq.answer}
                          onChange={(e) => {
                            const updatedCategories = [...currentContent.categories]
                            const updatedFaqs = [...updatedCategories[categoryIndex].faqs]
                            updatedFaqs[faqIndex] = { ...updatedFaqs[faqIndex], answer: e.target.value }
                            updatedCategories[categoryIndex] = { ...updatedCategories[categoryIndex], faqs: updatedFaqs }
                            handleContentChange('categories', updatedCategories)
                          }}
                          className="text-gray-600 bg-transparent border border-gray-300 rounded p-2 w-full resize-none"
                          rows={2}
                        />
                      ) : (
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* View More Link */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200">
                    View all {category.title.toLowerCase()} questions →
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Didn't find what you're looking for?
            </h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help. Get in touch and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                Contact Support
              </button>
              <button className="border border-blue-300 hover:border-blue-400 text-blue-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                Browse Knowledge Base
              </button>
            </div>
          </div>
        </div>
      </div>
    </BaseSection>
  )
}