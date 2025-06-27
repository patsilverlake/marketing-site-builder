import { SectionDefinition, SectionType } from './types'

class SectionRegistry {
  private sections: Map<SectionType, SectionDefinition> = new Map()

  register(definition: SectionDefinition) {
    this.sections.set(definition.type, definition)
  }

  get(type: SectionType): SectionDefinition | undefined {
    return this.sections.get(type)
  }

  getAll(): SectionDefinition[] {
    return Array.from(this.sections.values())
  }

  getVariation(type: SectionType, variationId: string) {
    const section = this.get(type)
    return section?.variations.find(v => v.id === variationId)
  }
}

export const sectionRegistry = new SectionRegistry()