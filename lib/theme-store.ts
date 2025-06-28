import { create } from 'zustand'

interface ColorTheme {
  id: string
  name: string
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
  muted: string
}

interface FontOption {
  id: string
  name: string
  family: string
  category: 'serif' | 'sans-serif' | 'monospace' | 'display' | 'handwriting'
  weights: string[]
  fallback: string
  googleFont?: boolean
}

interface ThemeState {
  currentTheme: ColorTheme
  currentFont: FontOption
  setTheme: (theme: ColorTheme) => void
  setFont: (font: FontOption) => void
  resetTheme: () => void
  resetFont: () => void
  applyThemeToElement: (elementId?: string) => void
}

const defaultTheme: ColorTheme = {
  id: 'default',
  name: 'Default Blue',
  primary: '#3b82f6',
  secondary: '#1e40af',
  accent: '#06b6d4',
  background: '#ffffff',
  text: '#111827',
  muted: '#6b7280'
}

const defaultFont: FontOption = {
  id: 'inter',
  name: 'Inter',
  family: 'Inter',
  category: 'sans-serif',
  weights: ['400', '500', '600', '700'],
  fallback: 'system-ui, sans-serif',
  googleFont: true
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  currentTheme: defaultTheme,
  currentFont: defaultFont,
  
  setTheme: (theme) => {
    set({ currentTheme: theme })
    get().applyThemeToElement()
  },
  
  setFont: (font) => {
    set({ currentFont: font })
    get().applyThemeToElement()
  },
  
  resetTheme: () => {
    set({ currentTheme: defaultTheme })
    get().applyThemeToElement()
  },
  
  resetFont: () => {
    set({ currentFont: defaultFont })
    get().applyThemeToElement()
  },
  
  applyThemeToElement: (elementId = 'preview-container') => {
    const { currentTheme, currentFont } = get()
    const element = document.getElementById(elementId) || document.documentElement
    
    // Apply CSS custom properties for colors
    element.style.setProperty('--theme-primary', currentTheme.primary)
    element.style.setProperty('--theme-secondary', currentTheme.secondary)
    element.style.setProperty('--theme-accent', currentTheme.accent)
    element.style.setProperty('--theme-background', currentTheme.background)
    element.style.setProperty('--theme-text', currentTheme.text)
    element.style.setProperty('--theme-muted', currentTheme.muted)
    
    // Apply CSS custom properties for fonts
    const fontFamily = currentFont.googleFont 
      ? `${currentFont.family}, ${currentFont.fallback}`
      : currentFont.fallback
    element.style.setProperty('--theme-font-family', fontFamily)
    
    // Apply to specific Tailwind classes via data attributes
    element.setAttribute('data-theme', currentTheme.id)
    element.setAttribute('data-font', currentFont.id)
  }
}))

export type { ColorTheme, FontOption }