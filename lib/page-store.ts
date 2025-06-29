import { create } from 'zustand'
import { SectionInstance, Page } from './types'

interface HistoryState {
  sections: SectionInstance[]
  selectedSectionId: string | null
}

interface PageStore {
  currentPage: Page | null
  sections: SectionInstance[]
  selectedSectionId: string | null
  isEditing: boolean
  
  // History management
  history: HistoryState[]
  historyIndex: number
  maxHistorySize: number
  
  // Actions
  setPage: (page: Page) => void
  addSection: (section: Omit<SectionInstance, 'id' | 'order'>) => void
  updateSection: (id: string, updates: Partial<SectionInstance>) => void
  deleteSection: (id: string) => void
  reorderSections: (sections: SectionInstance[]) => void
  selectSection: (id: string | null) => void
  setEditing: (editing: boolean) => void
  duplicateSection: (id: string) => void
  clearAllSections: () => void
  
  // History actions
  undo: () => void
  redo: () => void
  canUndo: () => boolean
  canRedo: () => boolean
  saveToHistory: () => void
}

export const usePageStore = create<PageStore>((set, get) => ({
  currentPage: null,
  sections: [],
  selectedSectionId: null,
  isEditing: false,
  
  // History state
  history: [],
  historyIndex: -1,
  maxHistorySize: 50,

  setPage: (page) => {
    const sections = page.sections.sort((a, b) => a.order - b.order)
    set({ 
      currentPage: page,
      sections,
      history: [{
        sections: JSON.parse(JSON.stringify(sections)),
        selectedSectionId: null
      }],
      historyIndex: 0
    })
  },

  addSection: (section) => {
    const { sections, saveToHistory } = get()
    saveToHistory()
    const newSection: SectionInstance = {
      ...section,
      id: crypto.randomUUID(),
      order: sections.length
    }
    set({ sections: [...sections, newSection] })
  },

  updateSection: (id, updates) => {
    const { sections, saveToHistory } = get()
    saveToHistory()
    set({
      sections: sections.map(section => 
        section.id === id ? { ...section, ...updates } : section
      )
    })
  },

  deleteSection: (id) => {
    const { sections, saveToHistory } = get()
    saveToHistory()
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
    const { saveToHistory } = get()
    saveToHistory()
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
    const { sections, saveToHistory } = get()
    saveToHistory()
    const section = sections.find(s => s.id === id)
    if (section) {
      const duplicate: SectionInstance = {
        ...section,
        id: crypto.randomUUID(),
        order: sections.length
      }
      set({ sections: [...sections, duplicate] })
    }
  },

  clearAllSections: () => {
    const { saveToHistory } = get()
    saveToHistory()
    set({ 
      sections: [], 
      selectedSectionId: null 
    })
  },

  // History methods
  saveToHistory: () => {
    const { sections, selectedSectionId, history, historyIndex, maxHistorySize } = get()
    const newState: HistoryState = {
      sections: JSON.parse(JSON.stringify(sections)), // Deep clone
      selectedSectionId
    }
    
    // Remove any future history if we're not at the end
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newState)
    
    // Limit history size
    if (newHistory.length > maxHistorySize) {
      newHistory.shift()
    } else {
      set({ historyIndex: historyIndex + 1 })
    }
    
    set({ history: newHistory })
  },

  undo: () => {
    const { history, historyIndex } = get()
    if (historyIndex > 0) {
      const previousState = history[historyIndex - 1]
      set({
        sections: previousState.sections,
        selectedSectionId: previousState.selectedSectionId,
        historyIndex: historyIndex - 1
      })
    }
  },

  redo: () => {
    const { history, historyIndex } = get()
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1]
      set({
        sections: nextState.sections,
        selectedSectionId: nextState.selectedSectionId,
        historyIndex: historyIndex + 1
      })
    }
  },

  canUndo: () => {
    const { historyIndex } = get()
    return historyIndex > 0
  },

  canRedo: () => {
    const { history, historyIndex } = get()
    return historyIndex < history.length - 1
  }
}))