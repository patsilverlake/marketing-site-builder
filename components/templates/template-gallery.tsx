'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { usePageStore } from '@/lib/page-store'
import { cn } from '@/lib/utils'
import { 
  X, 
  Eye, 
  Download, 
  Star, 
  Search,
  Filter,
  Briefcase,
  Heart,
  Zap,
  Users,
  Smartphone,
  Globe
} from 'lucide-react'

interface Template {
  id: string
  name: string
  description: string
  category: 'saas' | 'portfolio' | 'ecommerce' | 'blog' | 'agency' | 'startup'
  preview: string
  rating: number
  downloads: number
  isPremium: boolean
  sections: Array<{ type: string; variationId: string }>
  colors: string[]
}

const templates: Template[] = [
  {
    id: 'saas-modern',
    name: 'Modern SaaS',
    description: 'Clean, modern design perfect for SaaS products and tech startups',
    category: 'saas',
    preview: '/api/placeholder/400/300',
    rating: 4.8,
    downloads: 1234,
    isPremium: false,
    colors: ['#3B82F6', '#10B981', '#F59E0B'],
    sections: [
      { type: 'header', variationId: 'nav-cta' },
      { type: 'hero', variationId: 'animated' },
      { type: 'features', variationId: 'cards' },
      { type: 'pricing', variationId: 'freemium' },
      { type: 'testimonials', variationId: 'carousel' },
      { type: 'cta', variationId: 'email' },
      { type: 'footer', variationId: 'newsletter' }
    ]
  },
  {
    id: 'portfolio-creative',
    name: 'Creative Portfolio',
    description: 'Showcase your work with this stunning portfolio template',
    category: 'portfolio',
    preview: '/api/placeholder/400/300',
    rating: 4.9,
    downloads: 856,
    isPremium: true,
    colors: ['#8B5CF6', '#EC4899', '#F97316'],
    sections: [
      { type: 'header', variationId: 'simple' },
      { type: 'hero', variationId: 'split' },
      { type: 'about', variationId: 'story' },
      { type: 'features', variationId: 'showcase' },
      { type: 'testimonials', variationId: 'single' },
      { type: 'cta', variationId: 'contact' },
      { type: 'footer', variationId: 'simple' }
    ]
  },
  {
    id: 'ecommerce-store',
    name: 'E-commerce Store',
    description: 'Perfect for online stores and product launches',
    category: 'ecommerce',
    preview: '/api/placeholder/400/300',
    rating: 4.7,
    downloads: 2156,
    isPremium: false,
    colors: ['#EF4444', '#F59E0B', '#84CC16'],
    sections: [
      { type: 'header', variationId: 'nav-cta' },
      { type: 'hero', variationId: 'product' },
      { type: 'features', variationId: 'comparison' },
      { type: 'pricing', variationId: 'simple' },
      { type: 'testimonials', variationId: 'grid' },
      { type: 'cta', variationId: 'download' },
      { type: 'footer', variationId: 'newsletter' }
    ]
  },
  {
    id: 'agency-corporate',
    name: 'Corporate Agency',
    description: 'Professional template for agencies and consulting firms',
    category: 'agency',
    preview: '/api/placeholder/400/300',
    rating: 4.6,
    downloads: 743,
    isPremium: true,
    colors: ['#1F2937', '#3B82F6', '#10B981'],
    sections: [
      { type: 'header', variationId: 'simple' },
      { type: 'hero', variationId: 'centered' },
      { type: 'about', variationId: 'team' },
      { type: 'features', variationId: 'grid' },
      { type: 'testimonials', variationId: 'logos' },
      { type: 'cta', variationId: 'simple' },
      { type: 'footer', variationId: 'simple' }
    ]
  },
  {
    id: 'startup-launch',
    name: 'Startup Launch',
    description: 'High-converting template for startup product launches',
    category: 'startup',
    preview: '/api/placeholder/400/300',
    rating: 4.9,
    downloads: 1678,
    isPremium: false,
    colors: ['#7C3AED', '#EF4444', '#F59E0B'],
    sections: [
      { type: 'header', variationId: 'nav-cta' },
      { type: 'hero', variationId: 'animated' },
      { type: 'stats', variationId: 'counters' },
      { type: 'features', variationId: 'showcase' },
      { type: 'pricing', variationId: 'toggle' },
      { type: 'testimonials', variationId: 'carousel' },
      { type: 'cta', variationId: 'social-proof' },
      { type: 'footer', variationId: 'newsletter' }
    ]
  },
  {
    id: 'blog-minimal',
    name: 'Minimal Blog',
    description: 'Clean and simple design for blogs and content creators',
    category: 'blog',
    preview: '/api/placeholder/400/300',
    rating: 4.5,
    downloads: 567,
    isPremium: false,
    colors: ['#374151', '#6B7280', '#9CA3AF'],
    sections: [
      { type: 'header', variationId: 'simple' },
      { type: 'hero', variationId: 'centered' },
      { type: 'about', variationId: 'story' },
      { type: 'newsletter', variationId: 'simple' },
      { type: 'footer', variationId: 'simple' }
    ]
  }
]

const categories = [
  { id: 'all', name: 'All Templates', icon: <Globe className="w-4 h-4" /> },
  { id: 'saas', name: 'SaaS', icon: <Zap className="w-4 h-4" /> },
  { id: 'portfolio', name: 'Portfolio', icon: <Heart className="w-4 h-4" /> },
  { id: 'ecommerce', name: 'E-commerce', icon: <Smartphone className="w-4 h-4" /> },
  { id: 'agency', name: 'Agency', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'startup', name: 'Startup', icon: <Zap className="w-4 h-4" /> },
  { id: 'blog', name: 'Blog', icon: <Users className="w-4 h-4" /> }
]

interface TemplateGalleryProps {
  isOpen: boolean
  onClose: () => void
}

export function TemplateGallery({ isOpen, onClose }: TemplateGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  // const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null) // TODO: Implement preview functionality
  const { setSections } = usePageStore()

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const applyTemplate = (template: Template) => {
    setSections(template.sections.map((section, index) => ({
      id: `section-${index}`,
      type: section.type,
      variationId: section.variationId,
      content: {}
    })))
    onClose()
  }

  const previewTemplate = (template: Template) => {
    // TODO: Implement template preview functionality
    console.log('Preview template:', template.name)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[80vh] flex flex-col"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Template Gallery</h2>
                <p className="text-gray-600">Choose a template to get started quickly</p>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm',
                      selectedCategory === category.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {category.icon}
                    {category.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="flex-1 overflow-auto p-6">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              layout
            >
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  {/* Template Preview */}
                  <div className="relative">
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5Q0EzQUYiPlRlbXBsYXRlIFByZXZpZXc8L3RleHQ+Cjwvc3ZnPg=='
                      }}
                    />
                    {template.isPremium && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Premium
                      </div>
                    )}
                    
                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <motion.button
                        onClick={() => previewTemplate(template)}
                        className="bg-white text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        onClick={() => applyTemplate(template)}
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Download className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{template.name}</h3>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm text-gray-600">{template.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    
                    {/* Color Palette */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-gray-500">Colors:</span>
                      <div className="flex gap-1">
                        {template.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-gray-200"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => previewTemplate(template)}
                        className="flex-1"
                      >
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => applyTemplate(template)}
                        className="flex-1"
                      >
                        Use Template
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {filteredTemplates.length === 0 && (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}