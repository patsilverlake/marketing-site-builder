'use client'

import { useState } from 'react'
import { BaseSection } from '../base-section'
import { SectionData } from '@/lib/types'
import { ChevronDown, Plus, Minus } from 'lucide-react'

interface FaqAccordionProps {
  data: SectionData
  onUpdate: (updates: Partial<SectionData>) => void
  isEditing?: boolean
}

export function FaqAccordion({ data = { content: {} }, onUpdate, isEditing }: FaqAccordionProps) {
  const { content = {} } = data || {}
  const [openItems, setOpenItems] = useState<number[]>([0])

  const defaultContent = {
    title: 'Frequently Asked Questions',
    subtitle: 'Find answers to common questions about our product and services',
    faqs: [
      {
        question: 'How do I get started?',
        answer: 'Getting started is easy! Simply sign up for a free account, and you\'ll be guided through our onboarding process. You can start using basic features immediately, and upgrade to premium features when you\'re ready.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers. All payments are processed securely through our encrypted payment system.'
      },
      {
        question: 'Can I cancel my subscription anytime?',
        answer: 'Yes, you can cancel your subscription at any time from your account settings. There are no cancellation fees, and you\'ll continue to have access to premium features until the end of your current billing period.'
      },
      {
        question: 'Do you offer customer support?',
        answer: 'We offer 24/7 customer support through multiple channels including email, live chat, and phone support for premium customers. Our support team is knowledgeable and responsive, typically responding within a few hours.'
      },
      {
        question: 'Is my data secure?',
        answer: 'Absolutely! We take data security very seriously. All data is encrypted in transit and at rest, we\'re SOC 2 compliant, and we undergo regular security audits. Your data is never shared with third parties without your explicit consent.'
      },
      {
        question: 'Can I integrate with other tools?',
        answer: 'Yes, we offer integrations with over 100 popular tools including Slack, Google Workspace, Microsoft 365, Salesforce, and many more. We also provide a robust API for custom integrations.'
      }
    ],
    contactInfo: {
      title: "Still have questions?",
      description: "Can't find the answer you're looking for? Please chat to our friendly team.",
      buttonText: "Get in touch"
    }
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

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <BaseSection className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* FAQ Accordion */}
        <div className="space-y-4 mb-16">
          {currentContent.faqs.map((faq: any, index: number) => {
            const isOpen = openItems.includes(index)
            
            return (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        value={faq.question}
                        onChange={(e) => {
                          const updatedFaqs = [...currentContent.faqs]
                          updatedFaqs[index] = { ...updatedFaqs[index], question: e.target.value }
                          handleContentChange('faqs', updatedFaqs)
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="font-semibold text-gray-900 bg-transparent border border-gray-300 rounded p-1 w-full"
                      />
                    ) : (
                      <h3 className="font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                    )}
                  </div>
                  
                  <div className="flex-shrink-0">
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5">
                    <div className="border-t border-gray-100 pt-4">
                      {isEditing ? (
                        <textarea
                          value={faq.answer}
                          onChange={(e) => {
                            const updatedFaqs = [...currentContent.faqs]
                            updatedFaqs[index] = { ...updatedFaqs[index], answer: e.target.value }
                            handleContentChange('faqs', updatedFaqs)
                          }}
                          className="text-gray-700 leading-relaxed bg-transparent border border-gray-300 rounded p-2 w-full resize-none"
                          rows={4}
                        />
                      ) : (
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          {isEditing ? (
            <input
              value={currentContent.contactInfo.title}
              onChange={(e) => handleContentChange('contactInfo', { ...currentContent.contactInfo, title: e.target.value })}
              className="text-xl font-semibold text-gray-900 bg-transparent border border-gray-300 rounded p-1 w-full mb-4"
            />
          ) : (
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {currentContent.contactInfo.title}
            </h3>
          )}

          {isEditing ? (
            <textarea
              value={currentContent.contactInfo.description}
              onChange={(e) => handleContentChange('contactInfo', { ...currentContent.contactInfo, description: e.target.value })}
              className="text-gray-600 bg-transparent border border-gray-300 rounded p-2 w-full mb-6 resize-none"
              rows={2}
            />
          ) : (
            <p className="text-gray-600 mb-6">
              {currentContent.contactInfo.description}
            </p>
          )}

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
            {isEditing ? (
              <input
                value={currentContent.contactInfo.buttonText}
                onChange={(e) => handleContentChange('contactInfo', { ...currentContent.contactInfo, buttonText: e.target.value })}
                className="bg-transparent border-none outline-none text-white placeholder-white/70"
                placeholder="Button Text"
              />
            ) : (
              currentContent.contactInfo.buttonText
            )}
          </button>
        </div>
      </div>
    </BaseSection>
  )
}