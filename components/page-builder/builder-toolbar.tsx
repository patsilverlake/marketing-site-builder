import { Menu, Eye, Edit3, Download, Undo, Redo, Save, Monitor, Palette, Type, Move } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePageStore } from '@/lib/page-store'
import { downloadHTML } from '@/lib/export'
import { useState, useEffect } from 'react'
import { ColorPicker } from '@/components/theme/color-picker'
import { FontPicker } from '@/components/theme/font-picker'
import { SpacingControls } from '@/components/layout/spacing-controls'
import { useThemeStore, ColorTheme, FontOption } from '@/lib/theme-store'
import { motion, AnimatePresence } from 'framer-motion'

interface BuilderToolbarProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
  isEditing: boolean
  onToggleEditing: () => void
  onPreview: () => void
}

export function BuilderToolbar({
  sidebarOpen,
  onToggleSidebar,
  isEditing,
  onToggleEditing,
  onPreview
}: BuilderToolbarProps) {
  const { sections, undo, redo, canUndo, canRedo } = usePageStore()
  const { currentTheme, currentFont, setTheme, setFont } = useThemeStore()
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showFontPicker, setShowFontPicker] = useState(false)
  const [showSpacingControls, setShowSpacingControls] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault()
            if (e.shiftKey) {
              redo()
            } else {
              undo()
            }
            break
          case 'y':
            e.preventDefault()
            redo()
            break
          case 's':
            e.preventDefault()
            handleSave()
            break
          case 'e':
            e.preventDefault()
            onToggleEditing()
            break
          case 'p':
            e.preventDefault()
            onPreview()
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo, onToggleEditing, onPreview])

  const handleExport = () => {
    try {
      if (sections.length === 0) {
        alert('Please add some sections to your page before exporting.')
        return
      }
      
      downloadHTML(sections, {
        title: 'My Landing Page',
        description: 'Created with Marketing Site Builder',
        includeMeta: true,
        includeStyles: true
      })
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export page. Please try again.')
    }
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      // Simulate save delay for animation
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Save to localStorage for now
      const pageData = {
        sections,
        savedAt: new Date().toISOString()
      }
      localStorage.setItem('marketing-site-builder-page', JSON.stringify(pageData))
      
      // Show success feedback with animation
      setIsSaving(false)
    } catch (error) {
      console.error('Save failed:', error)
      setIsSaving(false)
      alert('Failed to save page. Please try again.')
    }
  }

  return (
    <motion.div 
      className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 backdrop-blur-sm"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="hover:bg-gray-100 transition-colors duration-200"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </motion.div>
        
        <motion.div 
          className="h-6 w-px bg-gray-300"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.1 }}
        />
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleEditing}
            className={`hover:bg-gray-100 transition-all duration-200 ${
              isEditing ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </motion.div>
              ) : (
                <motion.div
                  key="edit"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: canUndo() ? 1.05 : 1 }}
          whileTap={{ scale: canUndo() ? 0.95 : 1 }}
        >
          <Button 
            variant="ghost" 
            size="sm" 
            disabled={!canUndo()}
            onClick={undo}
            title="Undo (Ctrl+Z)"
            className={`hover:bg-gray-100 transition-all duration-200 ${
              !canUndo() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <motion.div
              animate={{ rotate: canUndo() ? 0 : -15 }}
              transition={{ duration: 0.2 }}
            >
              <Undo className="h-4 w-4" />
            </motion.div>
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: canRedo() ? 1.05 : 1 }}
          whileTap={{ scale: canRedo() ? 0.95 : 1 }}
        >
          <Button 
            variant="ghost" 
            size="sm" 
            disabled={!canRedo()}
            onClick={redo}
            title="Redo (Ctrl+Y)"
            className={`hover:bg-gray-100 transition-all duration-200 ${
              !canRedo() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <motion.div
              animate={{ rotate: canRedo() ? 0 : 15 }}
              transition={{ duration: 0.2 }}
            >
              <Redo className="h-4 w-4" />
            </motion.div>
          </Button>
        </motion.div>
        
        <motion.div 
          className="h-6 w-px bg-gray-300"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.2 }}
        />
        
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowColorPicker(!showColorPicker)}
              title="Theme Colors"
              className={`hover:bg-gray-100 transition-colors duration-200 ${
                showColorPicker ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <motion.div
                animate={{ rotate: showColorPicker ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Palette className="h-4 w-4" />
              </motion.div>
            </Button>
          </motion.div>
          
          <AnimatePresence>
            {showColorPicker && (
              <motion.div 
                className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ColorPicker
                  currentTheme={currentTheme.id}
                  onThemeSelect={(theme: ColorTheme) => {
                    setTheme(theme)
                    setShowColorPicker(false)
                  }}
                  onClose={() => setShowColorPicker(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFontPicker(!showFontPicker)}
              title="Typography"
              className={`hover:bg-gray-100 transition-colors duration-200 ${
                showFontPicker ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <motion.div
                animate={{ scale: showFontPicker ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <Type className="h-4 w-4" />
              </motion.div>
            </Button>
          </motion.div>
          
          <AnimatePresence>
            {showFontPicker && (
              <motion.div 
                className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <FontPicker
                  currentFont={currentFont.id}
                  onFontSelect={(font: FontOption) => {
                    setFont(font)
                    setShowFontPicker(false)
                  }}
                  onClose={() => setShowFontPicker(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSpacingControls(!showSpacingControls)}
              title="Spacing & Layout"
              className={`hover:bg-gray-100 transition-colors duration-200 ${
                showSpacingControls ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <motion.div
                animate={{ rotate: showSpacingControls ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Move className="h-4 w-4" />
              </motion.div>
            </Button>
          </motion.div>
          
          <AnimatePresence>
            {showSpacingControls && (
              <motion.div 
                className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <SpacingControls
                  onSpacingChange={(spacing) => {
                    console.log('Spacing changed:', spacing)
                    setShowSpacingControls(false)
                  }}
                  onClose={() => setShowSpacingControls(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.div 
        className="flex items-center gap-2"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleSave}
            disabled={isSaving}
            className="hover:bg-green-50 hover:text-green-600 transition-all duration-200"
          >
            <AnimatePresence mode="wait">
              {isSaving ? (
                <motion.div
                  key="saving"
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 180 }}
                  className="flex items-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Save className="h-4 w-4 mr-2" />
                  </motion.div>
                  Saving...
                </motion.div>
              ) : (
                <motion.div
                  key="save"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onPreview}
            className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
          >
            <Monitor className="h-4 w-4 mr-2" />
            Full Preview
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05, y: -1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExport}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}