import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { usePageStore } from '@/lib/page-store'
import { SortableSection } from '@/components/sections/sortable-section'
import { sectionRegistry } from '@/lib/section-registry'

export function SortablePage() {
  const { sections, reorderSections, isEditing } = usePageStore()
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = sections.findIndex(section => section.id === active.id)
      const newIndex = sections.findIndex(section => section.id === over?.id)
      
      const newSections = arrayMove(sections, oldIndex, newIndex)
      reorderSections(newSections)
    }
  }

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={sections.map(s => s.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="min-h-screen">
          {sections.map((section) => {
            const variation = sectionRegistry.getVariation(section.type, section.variationId)
            if (!variation) return null

            const Component = variation.component

            return (
              <SortableSection key={section.id} section={section}>
                <Component 
                  content={section.content}
                  isEditing={isEditing}
                  onContentChange={(content) => {
                    // Handle content updates
                  }}
                />
              </SortableSection>
            )
          })}
          
          {sections.length === 0 && (
            <div className="flex items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">Start building your page by adding sections</p>
            </div>
          )}
        </div>
      </SortableContext>
    </DndContext>
  )
}