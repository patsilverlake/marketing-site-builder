'use client'

import { BaseSection } from '../base-section'
import { SectionData } from '@/lib/types'
import { Star } from 'lucide-react'

interface TestimonialsLogosProps {
  data: SectionData
  onUpdate: (updates: Partial<SectionData>) => void
  isEditing?: boolean
}

export function TestimonialsLogos({ data, onUpdate, isEditing }: TestimonialsLogosProps) {
  const { content } = data

  const defaultContent = {
    title: 'Trusted by Industry Leaders',
    subtitle: 'Join thousands of companies that trust us with their business',
    companies: [
      {
        name: 'TechCorp',
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjYwIiB5PSIyNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMzc0MTUxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5UZWNoQ29ycDwvdGV4dD4KPC9zdmc+',
        quote: 'This solution increased our productivity by 300%. Game-changing!',
        author: 'Sarah Johnson',
        position: 'CTO'
      },
      {
        name: 'InnovateLabs',
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjYwIiB5PSIyNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjMzc0MTUxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Jbm5vdmF0ZUxhYnM8L3RleHQ+Cjwvc3ZnPg==',
        quote: 'The best investment we\'ve made for our team. Highly recommend!',
        author: 'Michael Chen',
        position: 'CEO'
      },
      {
        name: 'GlobalTech',
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjYwIiB5PSIyNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjMzc0MTUxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5HbG9iYWxUZWNoPC90ZXh0Pgo8L3N2Zz4=',
        quote: 'Outstanding support and features. Exactly what we needed.',
        author: 'Emily Rodriguez',
        position: 'VP Engineering'
      },
      {
        name: 'StartupXYZ',
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjYwIiB5PSIyNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjMzc0MTUxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TdGFydHVwWFlaPC90ZXh0Pgo8L3N2Zz4=',
        quote: 'Helped us scale from 10 to 100 employees seamlessly.',
        author: 'David Kim',
        position: 'Founder'
      },
      {
        name: 'Enterprise Co',
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjYwIiB5PSIyNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSIjMzc0MTUxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5FbnRlcnByaXNlIENvPC90ZXh0Pgo8L3N2Zz4=',
        quote: 'Revolutionized our workflow. Can\'t imagine working without it.',
        author: 'Lisa Wang',
        position: 'Director of Operations'
      },
      {
        name: 'FutureSoft',
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjYwIiB5PSIyNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjMzc0MTUxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5GdXR1cmVTb2Z0PC90ZXh0Pgo8L3N2Zz4=',
        quote: 'The ROI was immediate. Best decision we made this year.',
        author: 'Alex Thompson',
        position: 'Product Manager'
      }
    ]
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

        {/* Company Logos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentContent.companies.map((company: any, index: number) => (
            <div
              key={index}
              className="group bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-all duration-300 hover:border-blue-300"
            >
              {/* Logo */}
              <div className="mb-6">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="h-10 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              {/* Quote */}
              <div className="mb-6">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                {isEditing ? (
                  <textarea
                    value={company.quote}
                    onChange={(e) => {
                      const updatedCompanies = [...currentContent.companies]
                      updatedCompanies[index] = { ...updatedCompanies[index], quote: e.target.value }
                      handleContentChange('companies', updatedCompanies)
                    }}
                    className="text-gray-700 italic bg-transparent border border-gray-300 rounded p-2 w-full resize-none"
                    rows={3}
                  />
                ) : (
                  <blockquote className="text-gray-700 italic leading-relaxed">
                    "{company.quote}"
                  </blockquote>
                )}
              </div>

              {/* Author */}
              <div className="border-t border-gray-100 pt-4">
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      value={company.author}
                      onChange={(e) => {
                        const updatedCompanies = [...currentContent.companies]
                        updatedCompanies[index] = { ...updatedCompanies[index], author: e.target.value }
                        handleContentChange('companies', updatedCompanies)
                      }}
                      className="font-semibold text-gray-900 bg-transparent border border-gray-300 rounded p-1 w-full"
                    />
                    <input
                      value={company.position}
                      onChange={(e) => {
                        const updatedCompanies = [...currentContent.companies]
                        updatedCompanies[index] = { ...updatedCompanies[index], position: e.target.value }
                        handleContentChange('companies', updatedCompanies)
                      }}
                      className="text-sm text-gray-600 bg-transparent border border-gray-300 rounded p-1 w-full"
                    />
                  </div>
                ) : (
                  <div>
                    <div className="font-semibold text-gray-900">{company.author}</div>
                    <div className="text-sm text-gray-600">{company.position}</div>
                    <div className="text-sm text-blue-600 font-medium">{company.name}</div>
                  </div>
                )}
              </div>

              {/* Hover effect indicator */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-16 bg-white rounded-xl border border-gray-200 p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">5,000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600">Countries</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Join these industry leaders and see why thousands trust our platform
          </p>
          <div className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 group cursor-pointer">
            <span className="font-medium">Read more customer stories</span>
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