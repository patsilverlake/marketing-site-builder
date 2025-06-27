import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SectionInstance } from '@/lib/types'
import { usePageStore } from '@/lib/page-store'
import { cn } from '@/lib/utils'

interface SortableSectionProps {
  section: SectionInstance
  children: React.ReactNode
}

export function SortableSection({ section, children }: SortableSectionProps) {
  const { selectedSectionId, selectSection, isEditing } = usePageStore()
  const isSelected = selectedSectionId === section.id

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative group",
        isDragging && "z-50 opacity-50",
        isSelected && isEditing && "ring-2 ring-blue-500"
      )}
      onClick={() => isEditing && selectSection(section.id)}
    >
      {isEditing && (
        <div className="absolute -top-2 -left-2 z-10 flex gap-1">
          <button
            {...attributes}
            {...listeners}
            className="bg-blue-500 text-white p-1 rounded cursor-move hover:bg-blue-600"
            title="Drag to reorder"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <circle cx="3" cy="3" r="1"/>
              <circle cx="9" cy="3" r="1"/>
              <circle cx="3" cy="9" r="1"/>
              <circle cx="9" cy="9" r="1"/>
            </svg>
          </button>
        </div>
      )}
      {children}
    </div>
  )
}