import { useState, useEffect } from 'react'
import { usePageStore } from '@/lib/page-store'
import { sectionRegistry } from '@/lib/section-registry'
import { Button } from '@/components/ui/button'
import { X, Upload } from 'lucide-react'
import { ImageUpload } from '@/components/image-manager/image-upload'

export function ContentEditor() {
  const { selectedSectionId, selectSection, sections, updateSection } = usePageStore()
  const [editingContent, setEditingContent] = useState<Record<string, any>>({})
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [currentImageField, setCurrentImageField] = useState<string | null>(null)

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
    try {
      // Basic validation
      if (editingContent.title && editingContent.title.length > 200) {
        alert('Title is too long. Please keep it under 200 characters.')
        return
      }
      
      if (editingContent.imageUrl && editingContent.imageUrl.trim() && !isValidUrl(editingContent.imageUrl)) {
        alert('Please enter a valid image URL.')
        return
      }
      
      updateSection(selectedSection.id, { content: editingContent })
      selectSection(null)
    } catch (error) {
      console.error('Save failed:', error)
      alert('Failed to save changes. Please try again.')
    }
  }

  const isValidUrl = (string: string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
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

  const openImageUpload = (field: string) => {
    setCurrentImageField(field)
    setShowImageUpload(true)
  }

  const handleImageSelect = (imageUrl: string) => {
    if (currentImageField) {
      updateField(currentImageField, imageUrl)
    }
    setShowImageUpload(false)
    setCurrentImageField(null)
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
        
        {/* Image fields */}
        {Object.keys(editingContent).filter(key => 
          key.includes('image') || key.includes('Image') || key.includes('photo') || key.includes('avatar')
        ).map(imageField => (
          <div key={imageField}>
            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
              {imageField.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <div className="space-y-2">
              {editingContent[imageField] && (
                <img
                  src={editingContent[imageField]}
                  alt="Preview"
                  className="w-full h-32 object-cover border border-gray-200 rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDIwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik05MCA1MEw3MCA2MEgxMTBMOTAgNTBaIiBmaWxsPSIjOUNBM0FGIi8+CjxjaXJjbGUgY3g9IjgwIiBjeT0iNDAiIHI9IjgiIGZpbGw9IiM5Q0EzQUYiLz4KPHRleHQgeD0iMTAwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOUNBM0FGIj5JbWFnZSBFcnJvcjwvdGV4dD4KPC9zdmc+'
                  }}
                />
              )}
              <div className="flex gap-2">
                <input
                  type="url"
                  value={editingContent[imageField] || ''}
                  onChange={(e) => updateField(imageField, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => openImageUpload(imageField)}
                >
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
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

      {/* Image Upload Modal */}
      {showImageUpload && (
        <ImageUpload
          currentImage={currentImageField ? editingContent[currentImageField] : undefined}
          onImageSelect={handleImageSelect}
          onClose={() => {
            setShowImageUpload(false)
            setCurrentImageField(null)
          }}
        />
      )}
    </div>
  )
}