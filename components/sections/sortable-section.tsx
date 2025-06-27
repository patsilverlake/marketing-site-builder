import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SectionInstance } from '@/lib/types'
import { usePageStore } from '@/lib/page-store'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { GripVertical, Edit, Copy, Trash2 } from 'lucide-react'

interface SortableSectionProps {
  section: SectionInstance
  children: React.ReactNode
}

export function SortableSection({ section, children }: SortableSectionProps) {
  const { selectedSectionId, selectSection, isEditing, deleteSection, duplicateSection } = usePageStore()
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

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    selectSection(section.id)
  }

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation()
    duplicateSection(section.id)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('Are you sure you want to delete this section?')) {
      deleteSection(section.id)
    }
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
        <div className="absolute -top-2 -right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0"
            onClick={handleEdit}
            title="Edit section"
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0"
            onClick={handleDuplicate}
            title="Duplicate section"
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="h-8 w-8 p-0"
            onClick={handleDelete}
            title="Delete section"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}
      
      {isEditing && (
        <div className="absolute -top-2 -left-2 z-10">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 cursor-move"
            {...attributes}
            {...listeners}
            title="Drag to reorder"
          >
            <GripVertical className="h-3 w-3" />
          </Button>
        </div>
      )}
      {children}
    </div>
  )
}