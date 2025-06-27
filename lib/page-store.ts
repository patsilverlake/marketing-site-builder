import { create } from 'zustand'
import { SectionInstance, Page } from './types'

interface PageStore {
  currentPage: Page | null
  sections: SectionInstance[]
  selectedSectionId: string | null
  isEditing: boolean
  
  // Actions
  setPage: (page: Page) => void
  addSection: (section: Omit<SectionInstance, 'id' | 'order'>) => void
  updateSection: (id: string, updates: Partial<SectionInstance>) => void
  deleteSection: (id: string) => void
  reorderSections: (sections: SectionInstance[]) => void
  selectSection: (id: string | null) => void
  setEditing: (editing: boolean) => void
  duplicateSection: (id: string) => void
}

export const usePageStore = create<PageStore>((set, get) => ({
  currentPage: null,
  sections: [],
  selectedSectionId: null,
  isEditing: false,

  setPage: (page) => {
    set({ 
      currentPage: page,
      sections: page.sections.sort((a, b) => a.order - b.order)
    })
  },

  addSection: (section) => {
    const { sections } = get()
    const newSection: SectionInstance = {
      ...section,
      id: crypto.randomUUID(),
      order: sections.length
    }
    set({ sections: [...sections, newSection] })
  },

  updateSection: (id, updates) => {
    const { sections } = get()
    set({
      sections: sections.map(section => 
        section.id === id ? { ...section, ...updates } : section
      )
    })
  },

  deleteSection: (id) => {
    const { sections } = get()
    const filtered = sections.filter(s => s.id !== id)
    const reordered = filtered.map((section, index) => ({
      ...section,
      order: index
    }))
    set({ 
      sections: reordered,
      selectedSectionId: null
    })
  },

  reorderSections: (newSections) => {
    const reordered = newSections.map((section, index) => ({
      ...section,
      order: index
    }))
    set({ sections: reordered })
  },

  selectSection: (id) => {
    set({ selectedSectionId: id })
  },

  setEditing: (editing) => {
    set({ isEditing: editing })
  },

  duplicateSection: (id) => {
    const { sections } = get()
    const section = sections.find(s => s.id === id)
    if (section) {
      const duplicate: SectionInstance = {
        ...section,
        id: crypto.randomUUID(),
        order: sections.length
      }
      set({ sections: [...sections, duplicate] })
    }
  }
}))