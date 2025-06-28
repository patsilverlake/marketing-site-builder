'use client'

import { BaseSection } from '../base-section'
import { SectionData } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Apple, Play, Star, Download } from 'lucide-react'

interface CtaDownloadProps {
  data: SectionData
  onUpdate: (updates: Partial<SectionData>) => void
  isEditing?: boolean
}

export function CtaDownload({ data = { content: {} }, onUpdate, isEditing }: CtaDownloadProps) {
  const { content = {} } = data || {}

  const defaultContent = {
    title: 'Get Our App Today',
    subtitle: 'Download our mobile app and take your productivity on the go. Available on all major platforms.',
    appStoreUrl: '#',
    googlePlayUrl: '#',
    rating: '4.8',
    downloads: '1M+',
    features: [
      'Sync across all devices',
      'Offline mode available',
      'Push notifications',
      'Secure & encrypted'
    ]
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
    <BaseSection className="py-20 bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white">
            {isEditing ? (
              <input
                value={currentContent.title}
                onChange={(e) => handleContentChange('title', e.target.value)}
                className="text-3xl md:text-4xl font-bold text-white bg-transparent border-2 border-dashed border-white/50 rounded p-2 w-full mb-6"
              />
            ) : (
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {currentContent.title}
              </h2>
            )}

            {isEditing ? (
              <textarea
                value={currentContent.subtitle}
                onChange={(e) => handleContentChange('subtitle', e.target.value)}
                className="text-lg text-white/90 bg-transparent border-2 border-dashed border-white/50 rounded p-2 w-full mb-8 resize-none"
                rows={3}
              />
            ) : (
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                {currentContent.subtitle}
              </p>
            )}

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* App Store Button */}
              <Button
                className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center gap-3 text-left"
                size="lg"
              >
                <Apple className="w-8 h-8" />
                <div>
                  <div className="text-xs">Download on the</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </Button>

              {/* Google Play Button */}
              <Button
                className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center gap-3 text-left"
                size="lg"
              >
                <Play className="w-8 h-8" />
                <div>
                  <div className="text-xs">Get it on</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </Button>
            </div>

            {/* App Stats */}
            <div className="flex items-center gap-8 mb-8">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-white/90">{currentContent.rating} rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-white/90" />
                <span className="text-white/90">{currentContent.downloads} downloads</span>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              {currentContent.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-white/90 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="relative flex justify-center">
            {/* Phone Frame */}
            <div className="relative">
              {/* Phone Outer Frame */}
              <div className="w-64 h-[520px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                {/* Phone Screen */}
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="bg-gray-100 h-8 flex items-center justify-between px-6 text-xs text-gray-800">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-2 border border-gray-400 rounded-sm">
                        <div className="w-3 h-1 bg-green-500 rounded-sm m-0.5"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* App Content */}
                  <div className="flex-1 bg-gradient-to-br from-blue-500 to-purple-600 p-6 flex flex-col">
                    {/* App Header */}
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-lg">A</span>
                        </div>
                      </div>
                      <h3 className="text-white font-bold text-lg">Your App</h3>
                      <p className="text-white/80 text-sm">Welcome back!</p>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                        <div className="w-8 h-8 bg-white/30 rounded-lg mx-auto mb-2"></div>
                        <span className="text-white text-xs">Projects</span>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                        <div className="w-8 h-8 bg-white/30 rounded-lg mx-auto mb-2"></div>
                        <span className="text-white text-xs">Tasks</span>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex-1">
                      <h4 className="text-white font-semibold text-sm mb-3">Recent Activity</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white/30 rounded-full"></div>
                          <div className="flex-1">
                            <div className="w-20 h-2 bg-white/30 rounded mb-1"></div>
                            <div className="w-16 h-1.5 bg-white/20 rounded"></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white/30 rounded-full"></div>
                          <div className="flex-1">
                            <div className="w-24 h-2 bg-white/30 rounded mb-1"></div>
                            <div className="w-12 h-1.5 bg-white/20 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-300 rounded-full"></div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -right-4 top-16 bg-green-500 text-white px-3 py-2 rounded-lg text-sm shadow-lg">
                <div className="font-medium">✓ Synced</div>
              </div>
              
              <div className="absolute -left-4 bottom-20 bg-yellow-500 text-white px-3 py-2 rounded-lg text-sm shadow-lg">
                <div className="font-medium">📱 Mobile Ready</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-2">Free Download</h3>
            <p className="text-white/80 text-sm">No subscription required for basic features</p>
          </div>
          <div className="text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-2">Highly Rated</h3>
            <p className="text-white/80 text-sm">Loved by users worldwide</p>
          </div>
          <div className="text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Apple className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-2">Cross Platform</h3>
            <p className="text-white/80 text-sm">Available on iOS and Android</p>
          </div>
        </div>
      </div>
    </BaseSection>
  )
}