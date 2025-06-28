'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Palette, Check, RotateCcw } from 'lucide-react'

interface ColorTheme {
  id: string
  name: string
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
  muted: string
}

const colorThemes: ColorTheme[] = [
  {
    id: 'default',
    name: 'Default Blue',
    primary: '#3b82f6',
    secondary: '#1e40af',
    accent: '#06b6d4',
    background: '#ffffff',
    text: '#111827',
    muted: '#6b7280'
  },
  {
    id: 'purple',
    name: 'Purple Passion',
    primary: '#8b5cf6',
    secondary: '#7c3aed',
    accent: '#a855f7',
    background: '#ffffff',
    text: '#111827',
    muted: '#6b7280'
  },
  {
    id: 'green',
    name: 'Nature Green',
    primary: '#10b981',
    secondary: '#059669',
    accent: '#34d399',
    background: '#ffffff',
    text: '#111827',
    muted: '#6b7280'
  },
  {
    id: 'orange',
    name: 'Sunset Orange',
    primary: '#f59e0b',
    secondary: '#d97706',
    accent: '#fbbf24',
    background: '#ffffff',
    text: '#111827',
    muted: '#6b7280'
  },
  {
    id: 'red',
    name: 'Bold Red',
    primary: '#ef4444',
    secondary: '#dc2626',
    accent: '#f87171',
    background: '#ffffff',
    text: '#111827',
    muted: '#6b7280'
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    primary: '#3b82f6',
    secondary: '#1e40af',
    accent: '#06b6d4',
    background: '#111827',
    text: '#f9fafb',
    muted: '#9ca3af'
  },
  {
    id: 'minimal',
    name: 'Minimal Gray',
    primary: '#374151',
    secondary: '#1f2937',
    accent: '#6b7280',
    background: '#ffffff',
    text: '#111827',
    muted: '#9ca3af'
  },
  {
    id: 'gradient',
    name: 'Gradient Magic',
    primary: '#8b5cf6',
    secondary: '#3b82f6',
    accent: '#06b6d4',
    background: '#ffffff',
    text: '#111827',
    muted: '#6b7280'
  }
]

interface ColorPickerProps {
  currentTheme?: string
  onThemeSelect: (theme: ColorTheme) => void
  onClose?: () => void
}

export function ColorPicker({ currentTheme = 'default', onThemeSelect, onClose }: ColorPickerProps) {
  const [selectedTheme, setSelectedTheme] = useState(currentTheme)
  const [customColors, setCustomColors] = useState<Partial<ColorTheme>>({})
  const [showCustom, setShowCustom] = useState(false)

  const handleThemeSelect = (theme: ColorTheme) => {
    setSelectedTheme(theme.id)
    onThemeSelect(theme)
  }

  const handleCustomColorChange = (property: keyof ColorTheme, color: string) => {
    setCustomColors(prev => ({
      ...prev,
      [property]: color
    }))
  }

  const applyCustomTheme = () => {
    const currentThemeData = colorThemes.find(t => t.id === selectedTheme) || colorThemes[0]
    const customTheme: ColorTheme = {
      ...currentThemeData,
      id: 'custom',
      name: 'Custom Theme',
      ...customColors
    }
    onThemeSelect(customTheme)
  }

  const resetToDefault = () => {
    const defaultTheme = colorThemes[0]
    setSelectedTheme(defaultTheme.id)
    setCustomColors({})
    onThemeSelect(defaultTheme)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Color Theme</h3>
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

      {/* Preset Themes */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Preset Themes</h4>
        <div className="grid grid-cols-2 gap-3">
          {colorThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeSelect(theme)}
              className={`relative p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                selectedTheme === theme.id
                  ? 'border-blue-500 shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Theme Preview */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-left">{theme.name}</div>
                <div className="flex gap-1">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: theme.primary }}
                    title="Primary"
                  />
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: theme.secondary }}
                    title="Secondary"
                  />
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: theme.accent }}
                    title="Accent"
                  />
                  <div
                    className="w-4 h-4 rounded border border-gray-300"
                    style={{ backgroundColor: theme.background }}
                    title="Background"
                  />
                </div>
              </div>
              
              {/* Selected Indicator */}
              {selectedTheme === theme.id && (
                <div className="absolute top-1 right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Colors Toggle */}
      <div>
        <Button
          variant="outline"
          onClick={() => setShowCustom(!showCustom)}
          className="w-full"
        >
          {showCustom ? 'Hide' : 'Show'} Custom Colors
        </Button>
      </div>

      {/* Custom Color Controls */}
      {showCustom && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700">Custom Colors</h4>
          
          {[
            { key: 'primary', label: 'Primary Color', description: 'Main brand color' },
            { key: 'secondary', label: 'Secondary Color', description: 'Supporting brand color' },
            { key: 'accent', label: 'Accent Color', description: 'Highlight color' },
            { key: 'background', label: 'Background Color', description: 'Main background' },
            { key: 'text', label: 'Text Color', description: 'Primary text' },
            { key: 'muted', label: 'Muted Color', description: 'Secondary text' }
          ].map(({ key, label, description }) => {
            const currentThemeData = colorThemes.find(t => t.id === selectedTheme) || colorThemes[0]
            const currentValue = customColors[key as keyof ColorTheme] || currentThemeData[key as keyof ColorTheme]
            
            return (
              <div key={key} className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700">{label}</label>
                  <p className="text-xs text-gray-500">{description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentValue}
                    onChange={(e) => handleCustomColorChange(key as keyof ColorTheme, e.target.value)}
                    className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={currentValue}
                    onChange={(e) => handleCustomColorChange(key as keyof ColorTheme, e.target.value)}
                    className="w-20 px-2 py-1 text-xs border border-gray-300 rounded"
                    placeholder="#000000"
                  />
                </div>
              </div>
            )
          })}
          
          <Button
            onClick={applyCustomTheme}
            className="w-full mt-4"
            size="sm"
          >
            Apply Custom Theme
          </Button>
        </div>
      )}

      {/* Theme Preview */}
      {selectedTheme && (
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Preview</h4>
          <div 
            className="p-4 rounded-lg"
            style={{ 
              backgroundColor: customColors.background || colorThemes.find(t => t.id === selectedTheme)?.background,
              color: customColors.text || colorThemes.find(t => t.id === selectedTheme)?.text
            }}
          >
            <h5 className="font-semibold mb-2">Sample Content</h5>
            <p className="text-sm mb-3" style={{ color: customColors.muted || colorThemes.find(t => t.id === selectedTheme)?.muted }}>
              This is how your content will look with the selected theme.
            </p>
            <div className="flex gap-2">
              <div 
                className="px-3 py-1 rounded text-white text-sm"
                style={{ backgroundColor: customColors.primary || colorThemes.find(t => t.id === selectedTheme)?.primary }}
              >
                Primary Button
              </div>
              <div 
                className="px-3 py-1 rounded text-white text-sm"
                style={{ backgroundColor: customColors.secondary || colorThemes.find(t => t.id === selectedTheme)?.secondary }}
              >
                Secondary Button
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}