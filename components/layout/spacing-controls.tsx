'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Move, RotateCcw, Plus, Minus } from 'lucide-react'

interface SpacingOption {
  id: string
  label: string
  value: string
  description: string
}

const paddingOptions: SpacingOption[] = [
  { id: 'py-4', label: 'Small', value: 'py-4', description: '1rem top/bottom' },
  { id: 'py-8', label: 'Medium', value: 'py-8', description: '2rem top/bottom' },
  { id: 'py-12', label: 'Large', value: 'py-12', description: '3rem top/bottom' },
  { id: 'py-16', label: 'X-Large', value: 'py-16', description: '4rem top/bottom' },
  { id: 'py-20', label: 'XX-Large', value: 'py-20', description: '5rem top/bottom' },
  { id: 'py-24', label: 'XXX-Large', value: 'py-24', description: '6rem top/bottom' }
]

const marginOptions: SpacingOption[] = [
  { id: 'my-0', label: 'None', value: 'my-0', description: 'No margin' },
  { id: 'my-4', label: 'Small', value: 'my-4', description: '1rem top/bottom' },
  { id: 'my-8', label: 'Medium', value: 'my-8', description: '2rem top/bottom' },
  { id: 'my-12', label: 'Large', value: 'my-12', description: '3rem top/bottom' },
  { id: 'my-16', label: 'X-Large', value: 'my-16', description: '4rem top/bottom' }
]

const containerOptions: SpacingOption[] = [
  { id: 'max-w-4xl', label: 'Small', value: 'max-w-4xl', description: '896px max width' },
  { id: 'max-w-5xl', label: 'Medium', value: 'max-w-5xl', description: '1024px max width' },
  { id: 'max-w-6xl', label: 'Large', value: 'max-w-6xl', description: '1152px max width' },
  { id: 'max-w-7xl', label: 'X-Large', value: 'max-w-7xl', description: '1280px max width' },
  { id: 'max-w-full', label: 'Full Width', value: 'max-w-full', description: 'No max width' }
]

interface SpacingControlsProps {
  currentPadding?: string
  currentMargin?: string
  currentContainer?: string
  onSpacingChange: (spacing: { padding?: string; margin?: string; container?: string }) => void
  onClose?: () => void
}

export function SpacingControls({ 
  currentPadding = 'py-20', 
  currentMargin = 'my-0', 
  currentContainer = 'max-w-7xl',
  onSpacingChange, 
  onClose 
}: SpacingControlsProps) {
  const [selectedPadding, setSelectedPadding] = useState(currentPadding)
  const [selectedMargin, setSelectedMargin] = useState(currentMargin)
  const [selectedContainer, setSelectedContainer] = useState(currentContainer)

  const handlePaddingChange = (padding: string) => {
    setSelectedPadding(padding)
    onSpacingChange({ padding, margin: selectedMargin, container: selectedContainer })
  }

  const handleMarginChange = (margin: string) => {
    setSelectedMargin(margin)
    onSpacingChange({ padding: selectedPadding, margin, container: selectedContainer })
  }

  const handleContainerChange = (container: string) => {
    setSelectedContainer(container)
    onSpacingChange({ padding: selectedPadding, margin: selectedMargin, container })
  }

  const resetToDefaults = () => {
    const defaultPadding = 'py-20'
    const defaultMargin = 'my-0'
    const defaultContainer = 'max-w-7xl'
    
    setSelectedPadding(defaultPadding)
    setSelectedMargin(defaultMargin)
    setSelectedContainer(defaultContainer)
    onSpacingChange({ 
      padding: defaultPadding, 
      margin: defaultMargin, 
      container: defaultContainer 
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Move className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Spacing & Layout</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetToDefaults}
          title="Reset to defaults"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Container Width */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Container Width</h4>
        <div className="grid grid-cols-1 gap-2">
          {containerOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleContainerChange(option.value)}
              className={`p-3 rounded-lg border text-left transition-all hover:shadow-sm ${
                selectedContainer === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900">{option.label}</div>
                  <div className="text-sm text-gray-500">{option.description}</div>
                </div>
                {selectedContainer === option.value && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Padding (Internal Spacing) */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Internal Padding</h4>
        <div className="grid grid-cols-2 gap-2">
          {paddingOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handlePaddingChange(option.value)}
              className={`p-3 rounded-lg border text-left transition-all hover:shadow-sm ${
                selectedPadding === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium text-gray-900">{option.label}</div>
              <div className="text-xs text-gray-500">{option.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Margin (External Spacing) */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">External Margin</h4>
        <div className="grid grid-cols-2 gap-2">
          {marginOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleMarginChange(option.value)}
              className={`p-3 rounded-lg border text-left transition-all hover:shadow-sm ${
                selectedMargin === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium text-gray-900">{option.label}</div>
              <div className="text-xs text-gray-500">{option.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Controls */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Fine-tune Spacing</h4>
        <div className="space-y-4">
          {/* Padding Fine Control */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">Padding (Top/Bottom)</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Decrease padding
                  const currentIndex = paddingOptions.findIndex(p => p.value === selectedPadding)
                  if (currentIndex > 0) {
                    handlePaddingChange(paddingOptions[currentIndex - 1].value)
                  }
                }}
                disabled={paddingOptions.findIndex(p => p.value === selectedPadding) === 0}
              >
                <Minus className="w-3 h-3" />
              </Button>
              
              <div className="flex-1 text-center text-sm font-medium text-gray-700">
                {paddingOptions.find(p => p.value === selectedPadding)?.label || 'Custom'}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Increase padding
                  const currentIndex = paddingOptions.findIndex(p => p.value === selectedPadding)
                  if (currentIndex < paddingOptions.length - 1) {
                    handlePaddingChange(paddingOptions[currentIndex + 1].value)
                  }
                }}
                disabled={paddingOptions.findIndex(p => p.value === selectedPadding) === paddingOptions.length - 1}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Margin Fine Control */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">Margin (Top/Bottom)</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Decrease margin
                  const currentIndex = marginOptions.findIndex(m => m.value === selectedMargin)
                  if (currentIndex > 0) {
                    handleMarginChange(marginOptions[currentIndex - 1].value)
                  }
                }}
                disabled={marginOptions.findIndex(m => m.value === selectedMargin) === 0}
              >
                <Minus className="w-3 h-3" />
              </Button>
              
              <div className="flex-1 text-center text-sm font-medium text-gray-700">
                {marginOptions.find(m => m.value === selectedMargin)?.label || 'Custom'}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Increase margin
                  const currentIndex = marginOptions.findIndex(m => m.value === selectedMargin)
                  if (currentIndex < marginOptions.length - 1) {
                    handleMarginChange(marginOptions[currentIndex + 1].value)
                  }
                }}
                disabled={marginOptions.findIndex(m => m.value === selectedMargin) === marginOptions.length - 1}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Preview</h4>
        <div className="bg-gray-100 p-2 rounded">
          {/* Container representation */}
          <div 
            className={`bg-blue-100 border-2 border-dashed border-blue-300 mx-auto rounded ${selectedContainer}`}
            style={{ minHeight: '60px' }}
          >
            {/* Padding representation */}
            <div 
              className={`bg-green-100 border border-green-300 rounded-sm ${selectedPadding} ${selectedMargin}`}
            >
              <div className="bg-white rounded text-center py-2 text-xs text-gray-600">
                Section Content
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          <span className="text-blue-600">Blue</span> = Container, {' '}
          <span className="text-green-600">Green</span> = Padding, {' '}
          <span className="text-gray-800">White</span> = Content
        </div>
      </div>
    </div>
  )
}