export type SectionType = 
  | 'header'
  | 'hero'
  | 'features'
  | 'pricing'
  | 'testimonials'
  | 'cta'
  | 'footer'

export interface SectionVariation {
  id: string
  name: string
  description: string
  component: React.ComponentType<any>
}

export interface SectionDefinition {
  type: SectionType
  name: string
  icon: string
  variations: SectionVariation[]
}

export interface SectionInstance {
  id: string
  type: SectionType
  variationId: string
  content: Record<string, any>
  order: number
}

export interface Page {
  id: string
  name: string
  sections: SectionInstance[]
  createdAt: Date
  updatedAt: Date
}

export interface SectionProps {
  content: Record<string, any>
  isEditing?: boolean
  onContentChange?: (content: Record<string, any>) => void
}