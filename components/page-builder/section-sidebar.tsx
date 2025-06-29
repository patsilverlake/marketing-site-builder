import { useState } from 'react'
import { usePageStore } from '@/lib/page-store'
import { sectionRegistry } from '@/lib/section-registry'
import { SectionType } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Plus } from 'lucide-react'

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
    <motion.div 
      className="h-full flex flex-col bg-gradient-to-b from-gray-50 to-white"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="p-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Add Sections
        </h2>
        <p className="text-sm text-gray-600">Choose a section to add to your page</p>
      </motion.div>
      
      <div className="flex-1 overflow-auto custom-scrollbar">
        {sections.length === 0 ? (
          <motion.div 
            className="p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-gray-500 text-sm">No sections available. Register some sections first.</p>
          </motion.div>
        ) : (
          <div className="p-4 space-y-3">
            {sections.map((section, index) => (
              <motion.div 
                key={section.type} 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <motion.button
                  onClick={() => setSelectedType(selectedType === section.type ? null : section.type)}
                  className={cn(
                    "w-full text-left p-3 rounded-xl border-2 transition-all duration-300 group",
                    selectedType === section.type 
                      ? "border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-md" 
                      : "border-gray-200 hover:border-blue-300 hover:bg-white hover:shadow-sm"
                  )}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.span 
                        className="text-xl"
                        animate={{ 
                          scale: selectedType === section.type ? 1.1 : 1,
                          rotate: selectedType === section.type ? 10 : 0 
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {section.icon}
                      </motion.span>
                      <div>
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {section.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {section.variations.length} variations
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ 
                        rotate: selectedType === section.type ? 180 : 0,
                        color: selectedType === section.type ? '#3b82f6' : '#6b7280'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </div>
                </motion.button>
                
                <AnimatePresence>
                  {selectedType === section.type && (
                    <motion.div 
                      className="ml-4 space-y-2 overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {section.variations.map((variation, vIndex) => (
                        <motion.div
                          key={variation.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: vIndex * 0.05 }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full justify-start bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-300 transition-all duration-300 group"
                              onClick={() => handleAddSection(section.type, variation.id)}
                            >
                              <Plus className="h-3 w-3 mr-2 text-gray-400 group-hover:text-blue-500 transition-colors" />
                              <span className="group-hover:text-blue-600 transition-colors">
                                {variation.name}
                              </span>
                            </Button>
                          </motion.div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}