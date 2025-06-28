'use client'

import { BaseSection } from '../base-section'
import { SectionData } from '@/lib/types'
import { Button } from '@/components/ui/button'

interface HeroProductProps {
  data: SectionData
  onUpdate: (updates: Partial<SectionData>) => void
  isEditing?: boolean
}

export function HeroProduct({ data = { content: {} }, onUpdate, isEditing }: HeroProductProps) {
  const { content = {} } = data || {}

  const defaultContent = {
    headline: 'Transform Your Business with Our Product',
    subheadline: 'See how our innovative solution can help you achieve your goals faster and more efficiently than ever before.',
    buttonText: 'Try Free Demo',
    buttonUrl: '#demo',
    productImage: '/api/placeholder/600/400',
    productAlt: 'Product Screenshot'
  }

  const currentContent = { ...defaultContent, ...content }

  const handleContentChange = (field: string, value: string) => {
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
    <BaseSection className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              {isEditing ? (
                <textarea
                  value={currentContent.headline}
                  onChange={(e) => handleContentChange('headline', e.target.value)}
                  className="w-full text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 bg-transparent border-2 border-dashed border-blue-300 rounded p-2 resize-none"
                  rows={2}
                />
              ) : (
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                  {currentContent.headline}
                </h1>
              )}
              
              {isEditing ? (
                <textarea
                  value={currentContent.subheadline}
                  onChange={(e) => handleContentChange('subheadline', e.target.value)}
                  className="w-full text-lg sm:text-xl text-gray-600 bg-transparent border-2 border-dashed border-blue-300 rounded p-2 resize-none"
                  rows={3}
                />
              ) : (
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                  {currentContent.subheadline}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" className="w-full sm:w-auto text-lg px-6 sm:px-8 py-3">
                {isEditing ? (
                  <input
                    value={currentContent.buttonText}
                    onChange={(e) => handleContentChange('buttonText', e.target.value)}
                    className="bg-transparent border-none outline-none text-white placeholder-white/70 w-full text-center"
                    placeholder="Button Text"
                  />
                ) : (
                  currentContent.buttonText
                )}
              </Button>
              
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-6 sm:px-8 py-3">
                Watch Demo
              </Button>
            </div>

            {/* Product Stats - Responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 lg:pt-8 border-t border-gray-200">
              <div className="text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">10k+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>

          {/* Product Screenshot */}
          <div className="relative order-1 lg:order-2">
            <div className="relative max-w-lg mx-auto lg:max-w-none">
              {/* Browser mockup frame - responsive sizing */}
              <div className="bg-gray-800 rounded-lg shadow-2xl p-1 sm:p-2">
                <div className="bg-gray-700 rounded-t-md px-2 sm:px-4 py-1 sm:py-2 flex items-center gap-1 sm:gap-2">
                  <div className="flex gap-1 sm:gap-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-gray-600 rounded px-2 sm:px-3 py-0.5 sm:py-1 mx-2 sm:mx-4">
                    <div className="text-xs text-gray-300">yourproduct.com</div>
                  </div>
                </div>
                
                {isEditing ? (
                  <div className="bg-gray-100 rounded-b-md p-4 min-h-[200px] sm:min-h-[300px] flex items-center justify-center">
                    <input
                      value={currentContent.productImage}
                      onChange={(e) => handleContentChange('productImage', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-center text-sm"
                      placeholder="Product image URL"
                    />
                  </div>
                ) : (
                  <div className="bg-white rounded-b-md overflow-hidden">
                    <img
                      src={currentContent.productImage}
                      alt={currentContent.productAlt}
                      className="w-full h-auto"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yODggMjAwTDI0MCAyNDBIMzM2TDI4OCAyMDBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yNzIgMTg0SDE2MEwyNDAgMjQwSDI4OEwyNzIgMTg0WiIgZmlsbD0iIzlDQTNBRiIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxNjAiIHI9IjI0IiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjMwMCIgeT0iMjA4IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5Q0EzQUYiPlByb2R1Y3QgU2NyZWVuc2hvdDwvdGV4dD4KPC9zdmc+'
                      }}
                    />
                  </div>
                )}
              </div>
              
              {/* Floating elements - hidden on small screens to prevent overlap */}
              <div className="hidden sm:block absolute -right-2 lg:-right-4 top-4 lg:top-8 bg-green-500 text-white px-2 lg:px-3 py-0.5 lg:py-1 rounded-full text-xs lg:text-sm font-medium shadow-lg">
                ✓ Live
              </div>
              
              <div className="hidden sm:block absolute -left-2 lg:-left-4 bottom-4 lg:bottom-8 bg-blue-500 text-white px-2 lg:px-3 py-1 lg:py-2 rounded-lg text-xs lg:text-sm shadow-lg max-w-32 lg:max-w-none">
                <div className="font-medium">Real-time Updates</div>
                <div className="text-xs opacity-90 hidden lg:block">Connected: 1,247 users</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseSection>
  )
}