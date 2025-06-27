import { Menu, Eye, Edit3, Download, Undo, Redo, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePageStore } from '@/lib/page-store'
import { downloadHTML } from '@/lib/export'

interface BuilderToolbarProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
  isEditing: boolean
  onToggleEditing: () => void
}

export function BuilderToolbar({
  sidebarOpen,
  onToggleSidebar,
  isEditing,
  onToggleEditing
}: BuilderToolbarProps) {
  const { sections } = usePageStore()

  const handleExport = () => {
    downloadHTML(sections, {
      title: 'My Landing Page',
      description: 'Created with Marketing Site Builder',
      includeMeta: true,
      includeStyles: true
    })
  }

  const handleSave = () => {
    // Save to localStorage for now
    const pageData = {
      sections,
      savedAt: new Date().toISOString()
    }
    localStorage.setItem('marketing-site-builder-page', JSON.stringify(pageData))
    alert('Page saved successfully!')
  }

  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
        >
          <Menu className="h-4 w-4" />
        </Button>
        
        <div className="h-6 w-px bg-gray-300" />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleEditing}
        >
          {isEditing ? (
            <>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </>
          ) : (
            <>
              <Edit3 className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
        
        <Button variant="ghost" size="sm" disabled>
          <Undo className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="sm" disabled>
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  )
}