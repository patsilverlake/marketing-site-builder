'use client'

import { useEffect } from 'react'
import { PageBuilder } from '@/components/page-builder/page-builder'
import { registerAllSections } from '@/lib/sections'
import { usePageStore } from '@/lib/page-store'

export default function Home() {
  const { sections, reorderSections } = usePageStore()

  useEffect(() => {
    // Register all sections when the app loads
    registerAllSections()
    
    // Try to load saved page from localStorage
    const savedData = localStorage.getItem('marketing-site-builder-page')
    if (savedData) {
      try {
        const pageData = JSON.parse(savedData)
        if (pageData.sections && Array.isArray(pageData.sections)) {
          reorderSections(pageData.sections)
        }
      } catch (error) {
        console.error('Failed to load saved page:', error)
      }
    }
  }, [reorderSections])

  return (
    <div className="h-screen">
      <PageBuilder />
    </div>
  )
}