'use client'

import { useEffect } from 'react'
import { PageBuilder } from '@/components/page-builder/page-builder'
import { registerAllSections } from '@/lib/sections'
import { usePageStore } from '@/lib/page-store'

export default function Home() {
  const { reorderSections } = usePageStore()

  useEffect(() => {
    // Register all sections when the app loads
    registerAllSections()
    
    // Try to load saved page from localStorage
    try {
      const savedData = localStorage.getItem('marketing-site-builder-page')
      if (savedData) {
        const pageData = JSON.parse(savedData)
        if (pageData.sections && Array.isArray(pageData.sections)) {
          // Validate that all sections have required properties
          const validSections = pageData.sections.filter((section: { id?: string; type?: string; variationId?: string; content?: unknown }) => 
            section.id && section.type && section.variationId && section.content !== undefined
          )
          if (validSections.length > 0) {
            reorderSections(validSections)
          }
        }
      }
    } catch (error) {
      console.error('Failed to load saved page:', error)
      // Clear corrupted data
      localStorage.removeItem('marketing-site-builder-page')
    }
  }, [reorderSections])

  return (
    <div className="h-screen">
      <PageBuilder />
    </div>
  )
}