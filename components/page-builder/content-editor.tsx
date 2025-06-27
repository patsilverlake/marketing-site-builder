import { useState, useEffect } from 'react'
import { usePageStore } from '@/lib/page-store'
import { sectionRegistry } from '@/lib/section-registry'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export function ContentEditor() {
  const { selectedSectionId, selectSection, sections, updateSection } = usePageStore()
  const [editingContent, setEditingContent] = useState<Record<string, any>>({})

  const selectedSection = sections.find(s => s.id === selectedSectionId)
  const variation = selectedSection ? sectionRegistry.getVariation(selectedSection.type, selectedSection.variationId) : null

  useEffect(() => {
    if (selectedSection) {
      setEditingContent(selectedSection.content)
    }
  }, [selectedSection])

  if (!selectedSection || !variation) {
    return null
  }

  const handleSave = () => {
    updateSection(selectedSection.id, { content: editingContent })
    selectSection(null)
  }

  const handleCancel = () => {
    setEditingContent(selectedSection.content)
    selectSection(null)
  }

  const updateField = (field: string, value: any) => {
    setEditingContent(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const renderEditor = () => {
    // Generic editor for common fields
    const commonFields = ['title', 'subtitle', 'description', 'ctaText', 'ctaHref']
    
    return (
      <div className="space-y-4">
        {commonFields.map(field => {
          const currentValue = editingContent[field] || ''
          if (typeof currentValue !== 'string') return null

          return (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {field.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              {field.includes('title') || field.includes('subtitle') ? (
                <input
                  type="text"
                  value={currentValue}
                  onChange={(e) => updateField(field, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <textarea
                  value={currentValue}
                  onChange={(e) => updateField(field, e.target.value)}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}
            </div>
          )
        })}
        
        {/* Image URL field if present */}
        {editingContent.imageUrl !== undefined && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={editingContent.imageUrl || ''}
              onChange={(e) => updateField('imageUrl', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit {variation.name}</h2>
          <Button variant="ghost" size="sm" onClick={handleCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {renderEditor()}
        
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}