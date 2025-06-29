'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, Image as ImageIcon, X, Link, Check } from 'lucide-react'

interface ImageUploadProps {
  onImageSelect: (imageUrl: string) => void
  onClose?: () => void
  currentImage?: string
}

export function ImageUpload({ onImageSelect, onClose, currentImage }: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [urlInput, setUrlInput] = useState(currentImage || '')
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Image size must be less than 5MB')
      return
    }

    setUploading(true)
    
    try {
      // Convert to base64 for demo purposes (in production, upload to cloud storage)
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPreviewUrl(result)
        onImageSelect(result)
        setUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Failed to upload image')
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleUrlSubmit = () => {
    if (urlInput && isValidUrl(urlInput)) {
      setPreviewUrl(urlInput)
      onImageSelect(urlInput)
    } else {
      alert('Please enter a valid image URL')
    }
  }

  const isValidUrl = (string: string) => {
    try {
      new URL(string)
      return true
    } catch {
      return false
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Select Image</h2>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Current/Preview Image */}
        {previewUrl && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
            <div className="relative inline-block">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-full h-40 object-contain border border-gray-200 rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDIwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik05MCA1MEw3MCA2MEgxMTBMOTAgNTBaIiBmaWxsPSIjOUNBM0FGIi8+CjxjaXJjbGUgY3g9IjgwIiBjeT0iNDAiIHI9IjgiIGZpbGw9IiM5Q0EzQUYiLz4KPHRleHQgeD0iMTAwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOUNBM0FGIj5JbWFnZSBFcnJvcjwvdGV4dD4KPC9zdmc+'
                }}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-1 right-1 bg-white/80 hover:bg-white"
                onClick={() => setPreviewUrl(null)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Upload by File */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Upload from Device</h3>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragOver 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault()
                setDragOver(true)
              }}
              onDragLeave={() => setDragOver(false)}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
              
              {uploading ? (
                <div className="space-y-2">
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-sm text-gray-600">Uploading...</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                  <p className="text-sm text-gray-600">
                    Drop an image here or{' '}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      browse files
                    </button>
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Upload by URL */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Or use an Image URL</h3>
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Button 
                onClick={handleUrlSubmit}
                disabled={!urlInput.trim()}
                variant="outline"
              >
                <Link className="w-4 h-4 mr-2" />
                Use URL
              </Button>
            </div>
          </div>

          {/* Stock Images (Placeholder) */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Stock Images</h3>
            <div className="grid grid-cols-4 gap-2">
              {[
                'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=150&fit=crop',
                'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=150&fit=crop',
                'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=150&fit=crop',
                'https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=150&fit=crop',
                'https://images.unsplash.com/photo-1515378791036-0648a814c963?w=200&h=150&fit=crop',
                'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=150&fit=crop',
                'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=200&h=150&fit=crop',
                'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=150&fit=crop'
              ].map((url, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setPreviewUrl(url)
                    onImageSelect(url)
                  }}
                  className="relative group rounded overflow-hidden border-2 border-transparent hover:border-blue-400 transition-colors"
                >
                  <img
                    src={url}
                    alt={`Stock ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <Check className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-6 pt-6 border-t border-gray-200">
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}
          <Button 
            onClick={() => previewUrl && onImageSelect(previewUrl)}
            disabled={!previewUrl}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Use This Image
          </Button>
        </div>
      </div>
    </div>
  )
}