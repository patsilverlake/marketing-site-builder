'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Type, Check, RotateCcw } from 'lucide-react'

interface FontOption {
  id: string
  name: string
  family: string
  category: 'serif' | 'sans-serif' | 'monospace' | 'display' | 'handwriting'
  weights: string[]
  fallback: string
  googleFont?: boolean
}

const fontOptions: FontOption[] = [
  {
    id: 'inter',
    name: 'Inter',
    family: 'Inter',
    category: 'sans-serif',
    weights: ['400', '500', '600', '700'],
    fallback: 'system-ui, sans-serif',
    googleFont: true
  },
  {
    id: 'roboto',
    name: 'Roboto',
    family: 'Roboto',
    category: 'sans-serif',
    weights: ['300', '400', '500', '700'],
    fallback: 'system-ui, sans-serif',
    googleFont: true
  },
  {
    id: 'poppins',
    name: 'Poppins',
    family: 'Poppins',
    category: 'sans-serif',
    weights: ['400', '500', '600', '700'],
    fallback: 'system-ui, sans-serif',
    googleFont: true
  },
  {
    id: 'montserrat',
    name: 'Montserrat',
    family: 'Montserrat',
    category: 'sans-serif',
    weights: ['400', '500', '600', '700'],
    fallback: 'system-ui, sans-serif',
    googleFont: true
  },
  {
    id: 'playfair',
    name: 'Playfair Display',
    family: 'Playfair Display',
    category: 'serif',
    weights: ['400', '500', '600', '700'],
    fallback: 'serif',
    googleFont: true
  },
  {
    id: 'merriweather',
    name: 'Merriweather',
    family: 'Merriweather',
    category: 'serif',
    weights: ['300', '400', '700'],
    fallback: 'serif',
    googleFont: true
  },
  {
    id: 'lora',
    name: 'Lora',
    family: 'Lora',
    category: 'serif',
    weights: ['400', '500', '600', '700'],
    fallback: 'serif',
    googleFont: true
  },
  {
    id: 'source-code-pro',
    name: 'Source Code Pro',
    family: 'Source Code Pro',
    category: 'monospace',
    weights: ['400', '500', '600'],
    fallback: 'monospace',
    googleFont: true
  },
  {
    id: 'dancing-script',
    name: 'Dancing Script',
    family: 'Dancing Script',
    category: 'handwriting',
    weights: ['400', '500', '600', '700'],
    fallback: 'cursive',
    googleFont: true
  },
  {
    id: 'system',
    name: 'System Default',
    family: 'system-ui',
    category: 'sans-serif',
    weights: ['400', '500', '600', '700'],
    fallback: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    googleFont: false
  }
]

interface FontPicker {
  currentFont?: string
  onFontSelect: (font: FontOption) => void
  onClose?: () => void
}

export function FontPicker({ currentFont = 'inter', onFontSelect, onClose }: FontPicker) {
  const [selectedFont, setSelectedFont] = useState(currentFont)
  const [filter, setFilter] = useState<string>('all')

  const filteredFonts = fontOptions.filter(font => 
    filter === 'all' || font.category === filter
  )

  const handleFontSelect = (font: FontOption) => {
    setSelectedFont(font.id)
    onFontSelect(font)
    
    // Load Google Font if needed
    if (font.googleFont && font.id !== 'system') {
      loadGoogleFont(font)
    }
  }

  const loadGoogleFont = (font: FontOption) => {
    const existingLink = document.querySelector(`link[href*="${font.family}"]`)
    if (existingLink) return

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?family=${font.family.replace(' ', '+')}:wght@${font.weights.join(';')}&display=swap`
    document.head.appendChild(link)
  }

  const resetToDefault = () => {
    const defaultFont = fontOptions[0]
    setSelectedFont(defaultFont.id)
    onFontSelect(defaultFont)
  }

  const categories = [
    { id: 'all', label: 'All Fonts' },
    { id: 'sans-serif', label: 'Sans Serif' },
    { id: 'serif', label: 'Serif' },
    { id: 'monospace', label: 'Monospace' },
    { id: 'display', label: 'Display' },
    { id: 'handwriting', label: 'Handwriting' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Type className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Typography</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetToDefault}
          title="Reset to default"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Font Category</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={filter === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Font Options */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Select Font</h4>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {filteredFonts.map((font) => (
            <button
              key={font.id}
              onClick={() => handleFontSelect(font)}
              className={`w-full p-3 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                selectedFont === font.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              style={{
                fontFamily: font.googleFont ? `${font.family}, ${font.fallback}` : font.fallback
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{font.name}</div>
                  <div className="text-sm text-gray-500 capitalize">{font.category}</div>
                  <div className="text-lg mt-1" style={{ fontFamily: font.googleFont ? `${font.family}, ${font.fallback}` : font.fallback }}>
                    The quick brown fox jumps over the lazy dog
                  </div>
                </div>
                
                {selectedFont === font.id && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center ml-3">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Font Preview */}
      {selectedFont && (
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Preview</h4>
          <div 
            className="space-y-3"
            style={{
              fontFamily: fontOptions.find(f => f.id === selectedFont)?.googleFont 
                ? `${fontOptions.find(f => f.id === selectedFont)?.family}, ${fontOptions.find(f => f.id === selectedFont)?.fallback}`
                : fontOptions.find(f => f.id === selectedFont)?.fallback
            }}
          >
            <h1 className="text-3xl font-bold text-gray-900">
              Main Heading
            </h1>
            <h2 className="text-xl font-semibold text-gray-800">
              Secondary Heading
            </h2>
            <p className="text-base text-gray-700">
              This is how your regular paragraph text will look with the selected font. 
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p className="text-sm text-gray-600">
              Small text and captions will appear like this.
            </p>
          </div>
        </div>
      )}

      {/* Font Weights Info */}
      {selectedFont && (
        <div className="text-xs text-gray-500">
          <strong>Available weights:</strong> {fontOptions.find(f => f.id === selectedFont)?.weights.join(', ')}
          {fontOptions.find(f => f.id === selectedFont)?.googleFont && (
            <span className="block mt-1">
              <strong>Source:</strong> Google Fonts
            </span>
          )}
        </div>
      )}
    </div>
  )
}