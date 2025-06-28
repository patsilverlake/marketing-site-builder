'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Monitor, Tablet, Smartphone, Laptop, RotateCcw } from 'lucide-react'

interface DevicePreset {
  id: string
  name: string
  width: number
  height: number
  icon: React.ReactNode
  category: 'desktop' | 'tablet' | 'mobile'
  userAgent?: string
}

const devicePresets: DevicePreset[] = [
  // Desktop
  {
    id: 'desktop-hd',
    name: 'Desktop HD',
    width: 1920,
    height: 1080,
    icon: <Monitor className="w-4 h-4" />,
    category: 'desktop'
  },
  {
    id: 'desktop-standard',
    name: 'Desktop',
    width: 1440,
    height: 900,
    icon: <Monitor className="w-4 h-4" />,
    category: 'desktop'
  },
  {
    id: 'laptop',
    name: 'Laptop',
    width: 1366,
    height: 768,
    icon: <Laptop className="w-4 h-4" />,
    category: 'desktop'
  },
  
  // Tablet
  {
    id: 'ipad-pro',
    name: 'iPad Pro',
    width: 1024,
    height: 1366,
    icon: <Tablet className="w-4 h-4" />,
    category: 'tablet',
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    id: 'ipad',
    name: 'iPad',
    width: 768,
    height: 1024,
    icon: <Tablet className="w-4 h-4" />,
    category: 'tablet',
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    id: 'tablet-landscape',
    name: 'Tablet (Landscape)',
    width: 1024,
    height: 768,
    icon: <Tablet className="w-4 h-4" />,
    category: 'tablet'
  },
  
  // Mobile
  {
    id: 'iphone-14-pro',
    name: 'iPhone 14 Pro',
    width: 393,
    height: 852,
    icon: <Smartphone className="w-4 h-4" />,
    category: 'mobile',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    id: 'iphone-se',
    name: 'iPhone SE',
    width: 375,
    height: 667,
    icon: <Smartphone className="w-4 h-4" />,
    category: 'mobile',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    id: 'android-pixel',
    name: 'Pixel 7',
    width: 412,
    height: 915,
    icon: <Smartphone className="w-4 h-4" />,
    category: 'mobile',
    userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36'
  }
]

interface DevicePreviewProps {
  children: React.ReactNode
  onDeviceChange?: (device: DevicePreset) => void
}

export function DevicePreview({ children, onDeviceChange }: DevicePreviewProps) {
  const [selectedDevice, setSelectedDevice] = useState<DevicePreset>(devicePresets[1]) // Desktop default
  const [isRotated, setIsRotated] = useState(false)
  const [showRuler, setShowRuler] = useState(false)

  const handleDeviceSelect = (device: DevicePreset) => {
    setSelectedDevice(device)
    setIsRotated(false) // Reset rotation when changing devices
    onDeviceChange?.(device)
  }

  const toggleRotation = () => {
    setIsRotated(!isRotated)
  }

  const getPreviewDimensions = () => {
    const baseWidth = isRotated ? selectedDevice.height : selectedDevice.width
    const baseHeight = isRotated ? selectedDevice.width : selectedDevice.height
    
    // Scale down for preview if needed
    const maxWidth = 1200
    const maxHeight = 800
    
    const scaleX = baseWidth > maxWidth ? maxWidth / baseWidth : 1
    const scaleY = baseHeight > maxHeight ? maxHeight / baseHeight : 1
    const scale = Math.min(scaleX, scaleY, 1)
    
    return {
      width: Math.round(baseWidth * scale),
      height: Math.round(baseHeight * scale),
      scale,
      originalWidth: baseWidth,
      originalHeight: baseHeight
    }
  }

  const dimensions = getPreviewDimensions()

  const categories = [
    { id: 'desktop', label: 'Desktop', icon: <Monitor className="w-4 h-4" /> },
    { id: 'tablet', label: 'Tablet', icon: <Tablet className="w-4 h-4" /> },
    { id: 'mobile', label: 'Mobile', icon: <Smartphone className="w-4 h-4" /> }
  ]

  return (
    <div className="h-full flex flex-col">
      {/* Device Controls */}
      <div className="flex-shrink-0 p-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Device Preview</h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleRotation}
              disabled={selectedDevice.category === 'desktop'}
              title="Rotate device"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRuler(!showRuler)}
              title="Toggle ruler"
            >
              📏
            </Button>
          </div>
        </div>

        {/* Device Categories */}
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id}>
              <div className="flex items-center gap-2 mb-2">
                {category.icon}
                <span className="text-sm font-medium text-gray-700">{category.label}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {devicePresets
                  .filter(device => device.category === category.id)
                  .map((device) => (
                    <button
                      key={device.id}
                      onClick={() => handleDeviceSelect(device)}
                      className={`p-2 rounded-lg border text-left transition-all hover:shadow-sm ${
                        selectedDevice.id === device.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {device.icon}
                        <div>
                          <div className="text-xs font-medium text-gray-900">{device.name}</div>
                          <div className="text-xs text-gray-500">
                            {device.width} × {device.height}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-gray-100 p-8 overflow-auto">
        <div className="flex flex-col items-center justify-center min-h-full">
          {/* Device Info */}
          <div className="mb-4 text-center">
            <div className="text-sm font-medium text-gray-900">
              {selectedDevice.name} {isRotated && '(Rotated)'}
            </div>
            <div className="text-xs text-gray-500">
              {dimensions.originalWidth} × {dimensions.originalHeight}
              {dimensions.scale < 1 && (
                <span className="ml-1">
                  (scaled to {Math.round(dimensions.scale * 100)}%)
                </span>
              )}
            </div>
          </div>

          {/* Device Frame */}
          <div className="relative">
            {/* Ruler (if enabled) */}
            {showRuler && (
              <>
                {/* Horizontal ruler */}
                <div 
                  className="absolute -top-6 left-0 h-4 border-t border-l border-r border-gray-300 bg-white text-xs"
                  style={{ width: dimensions.width }}
                >
                  <div className="flex justify-between px-1 text-gray-600">
                    <span>0</span>
                    <span>{dimensions.originalWidth}px</span>
                  </div>
                </div>
                
                {/* Vertical ruler */}
                <div 
                  className="absolute -left-6 top-0 w-4 border-t border-l border-b border-gray-300 bg-white text-xs flex flex-col justify-between items-center"
                  style={{ height: dimensions.height, writingMode: 'vertical-lr' }}
                >
                  <span className="text-gray-600 transform rotate-180">0</span>
                  <span className="text-gray-600 transform rotate-180">{dimensions.originalHeight}px</span>
                </div>
              </>
            )}

            {/* Device mockup frame for mobile/tablet */}
            {selectedDevice.category !== 'desktop' && (
              <div
                className="relative bg-gray-800 rounded-lg p-1 shadow-2xl"
                style={{
                  width: dimensions.width + 16,
                  height: dimensions.height + 16
                }}
              >
                {/* Status bar for mobile */}
                {selectedDevice.category === 'mobile' && (
                  <div className="absolute top-2 left-2 right-2 h-6 bg-black rounded-t-lg flex items-center justify-between px-4 text-white text-xs">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-2 border border-white rounded-sm">
                        <div className="w-3 h-1 bg-white rounded-sm m-0.5"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Preview Content */}
            <div
              className={`${selectedDevice.category !== 'desktop' ? 'absolute top-2 left-2' : ''} bg-white shadow-lg overflow-hidden ${
                selectedDevice.category === 'mobile' ? 'rounded-lg' : 
                selectedDevice.category === 'tablet' ? 'rounded-xl' : 
                'border border-gray-300'
              }`}
              style={{
                width: dimensions.width,
                height: dimensions.height,
                transform: `scale(${dimensions.scale})`,
                transformOrigin: 'top left'
              }}
            >
              <div className="w-full h-full overflow-auto">
                {children}
              </div>
            </div>
          </div>

          {/* Device Controls Footer */}
          <div className="mt-6 flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Responsive</span>
            </div>
            {selectedDevice.userAgent && (
              <div title={selectedDevice.userAgent}>
                <span>Custom UA</span>
              </div>
            )}
            <div>
              <span>Viewport: {dimensions.originalWidth}×{dimensions.originalHeight}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}