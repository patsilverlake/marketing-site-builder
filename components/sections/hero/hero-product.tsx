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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              {isEditing ? (
                <textarea
                  value={currentContent.headline}
                  onChange={(e) => handleContentChange('headline', e.target.value)}
                  className="w-full text-4xl lg:text-5xl font-bold text-gray-900 bg-transparent border-2 border-dashed border-blue-300 rounded p-2 resize-none"
                  rows={2}
                />
              ) : (
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {currentContent.headline}
                </h1>
              )}
              
              {isEditing ? (
                <textarea
                  value={currentContent.subheadline}
                  onChange={(e) => handleContentChange('subheadline', e.target.value)}
                  className="w-full text-xl text-gray-600 bg-transparent border-2 border-dashed border-blue-300 rounded p-2 resize-none"
                  rows={3}
                />
              ) : (
                <p className="text-xl text-gray-600 leading-relaxed">
                  {currentContent.subheadline}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-3">
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
              
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Watch Demo
              </Button>
            </div>

            {/* Product Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div>
                <div className="text-2xl font-bold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">10k+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>

          {/* Product Screenshot */}
          <div className="relative">
            <div className="relative">
              {/* Browser mockup frame */}
              <div className="bg-gray-800 rounded-lg shadow-2xl p-2">
                <div className="bg-gray-700 rounded-t-md px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-gray-600 rounded px-3 py-1 mx-4">
                    <div className="text-xs text-gray-300">yourproduct.com</div>
                  </div>
                </div>
                
                {isEditing ? (
                  <div className="bg-gray-100 rounded-b-md p-4 min-h-[300px] flex items-center justify-center">
                    <input
                      value={currentContent.productImage}
                      onChange={(e) => handleContentChange('productImage', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-center"
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
              
              {/* Floating elements */}
              <div className="absolute -right-4 top-8 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                ✓ Live
              </div>
              
              <div className="absolute -left-4 bottom-8 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm shadow-lg">
                <div className="font-medium">Real-time Updates</div>
                <div className="text-xs opacity-90">Connected: 1,247 users</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseSection>
  )
}