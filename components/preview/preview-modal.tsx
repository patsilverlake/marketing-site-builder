'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X, ExternalLink, Download, Share } from 'lucide-react'
import { DevicePreview } from './device-preview'
import { usePageStore } from '@/lib/page-store'
import { sectionRegistry } from '@/lib/section-registry'

interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PreviewModal({ isOpen, onClose }: PreviewModalProps) {
  const { sections } = usePageStore()
  const [currentDevice, setCurrentDevice] = useState<any>(null)

  if (!isOpen) return null

  const handleExport = () => {
    // Placeholder for export functionality
    console.log('Export with device:', currentDevice)
  }

  const handleShare = () => {
    // Placeholder for share functionality
    console.log('Share preview')
  }

  const renderSections = () => {
    return sections
      .sort((a, b) => a.order - b.order)
      .map((section) => {
        const variation = sectionRegistry.getVariation(section.type, section.variationId)
        if (!variation) return null

        const Component = variation.component
        return (
          <div key={section.id} className="section-preview">
            <Component 
              data={{ content: section.content }}
              onUpdate={() => {}} // Read-only in preview
              isEditing={false}
            />
          </div>
        )
      })
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="flex h-full">
        {/* Main Preview Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-gray-900">Preview Mode</h2>
              {currentDevice && (
                <div className="text-sm text-gray-600">
                  {currentDevice.name} - {currentDevice.width}×{currentDevice.height}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
              >
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(window.location.href, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                New Tab
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Device Preview */}
          <div className="flex-1">
            <DevicePreview onDeviceChange={setCurrentDevice}>
              <div className="min-h-screen">
                {sections.length > 0 ? (
                  renderSections()
                ) : (
                  <div className="flex items-center justify-center h-screen">
                    <div className="text-center text-gray-500">
                      <div className="text-6xl mb-4">📱</div>
                      <h3 className="text-xl font-semibold mb-2">No Content Yet</h3>
                      <p>Add some sections to see your preview</p>
                    </div>
                  </div>
                )}
              </div>
            </DevicePreview>
          </div>
        </div>
      </div>
    </div>
  )
}