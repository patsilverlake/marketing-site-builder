import { useState } from 'react'
import { usePageStore } from '@/lib/page-store'
import { sectionRegistry } from '@/lib/section-registry'
import { SectionType } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function SectionSidebar() {
  const { addSection } = usePageStore()
  const [selectedType, setSelectedType] = useState<SectionType | null>(null)
  
  const sections = sectionRegistry.getAll()

  const handleAddSection = (type: SectionType, variationId: string) => {
    addSection({
      type,
      variationId,
      content: {}
    })
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Add Sections</h2>
        <p className="text-sm text-gray-600">Choose a section to add to your page</p>
      </div>
      
      <div className="flex-1 overflow-auto">
        {sections.length === 0 ? (
          <div className="p-4">
            <p className="text-gray-500 text-sm">No sections available. Register some sections first.</p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {sections.map((section) => (
              <div key={section.type} className="space-y-2">
                <button
                  onClick={() => setSelectedType(selectedType === section.type ? null : section.type)}
                  className={cn(
                    "w-full text-left p-3 rounded-lg border transition-colors",
                    selectedType === section.type 
                      ? "border-blue-500 bg-blue-50" 
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{section.icon}</span>
                    <div>
                      <h3 className="font-medium">{section.name}</h3>
                      <p className="text-sm text-gray-600">{section.variations.length} variations</p>
                    </div>
                  </div>
                </button>
                
                {selectedType === section.type && (
                  <div className="ml-4 space-y-2">
                    {section.variations.map((variation) => (
                      <Button
                        key={variation.id}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => handleAddSection(section.type, variation.id)}
                      >
                        {variation.name}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}