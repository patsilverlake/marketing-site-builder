'use client'

import { useState, useEffect } from 'react'
import { usePageStore } from '@/lib/page-store'
import { SortablePage } from './sortable-page'
import { SectionSidebar } from './section-sidebar'
import { BuilderToolbar } from './builder-toolbar'
import { ContentEditor } from './content-editor'
import { PreviewMode } from './preview-mode'
import { cn } from '@/lib/utils'

interface PageBuilderProps {
  className?: string
}

export function PageBuilder({ className }: PageBuilderProps) {
  const { isEditing, setEditing, selectedSectionId, undo, redo, canUndo, canRedo } = usePageStore()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [previewMode, setPreviewMode] = useState(false)

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z' && !e.shiftKey && canUndo()) {
          e.preventDefault()
          undo()
        } else if ((e.key === 'y' || (e.key === 'z' && e.shiftKey)) && canRedo()) {
          e.preventDefault()
          redo()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo, canUndo, canRedo])

  if (previewMode) {
    return <PreviewMode onClose={() => setPreviewMode(false)} />
  }

  return (
    <div className={cn("flex h-screen bg-gray-50", className)}>
      {/* Sidebar */}
      <div className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300",
        sidebarOpen ? "w-80" : "w-0 overflow-hidden"
      )}>
        <SectionSidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <BuilderToolbar 
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          isEditing={isEditing}
          onToggleEditing={() => setEditing(!isEditing)}
          onPreview={() => setPreviewMode(true)}
        />

        {/* Preview area */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <SortablePage />
          </div>
        </div>
      </div>

      {/* Content Editor Modal */}
      {selectedSectionId && <ContentEditor />}
    </div>
  )
}