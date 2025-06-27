import { usePageStore } from '@/lib/page-store'
import { sectionRegistry } from '@/lib/section-registry'
import { Button } from '@/components/ui/button'
import { X, Download } from 'lucide-react'
import { downloadHTML } from '@/lib/export'

interface PreviewModeProps {
  onClose: () => void
}

export function PreviewMode({ onClose }: PreviewModeProps) {
  const { sections } = usePageStore()

  const handleExport = () => {
    downloadHTML(sections, {
      title: 'My Landing Page',
      description: 'Created with Marketing Site Builder',
      includeMeta: true,
      includeStyles: true
    })
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Preview toolbar */}
      <div className="h-14 bg-gray-900 text-white flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <h2 className="font-semibold">Preview Mode</h2>
          <span className="text-sm text-gray-300">
            This is how your page will look to visitors
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export HTML
          </Button>
          
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:text-gray-300">
            <X className="h-4 w-4 mr-2" />
            Exit Preview
          </Button>
        </div>
      </div>

      {/* Preview content */}
      <div className="flex-1 overflow-auto bg-white">
        {sections.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-gray-500 text-lg mb-4">No sections added yet</p>
              <p className="text-gray-400 text-sm">Add some sections to see your page preview</p>
            </div>
          </div>
        ) : (
          <div>
            {sections
              .sort((a, b) => a.order - b.order)
              .map((section) => {
                const variation = sectionRegistry.getVariation(section.type, section.variationId)
                if (!variation) return null

                const Component = variation.component

                return (
                  <div key={section.id}>
                    <Component 
                      content={section.content}
                      isEditing={false}
                    />
                  </div>
                )
              })
            }
          </div>
        )}
      </div>
    </div>
  )
}