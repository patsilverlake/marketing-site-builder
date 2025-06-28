import { SectionDefinition } from '@/lib/types'
import { AboutTeam } from '@/components/sections/about/about-team'
import { AboutStory } from '@/components/sections/about/about-story'

export const aboutSections: SectionDefinition = {
  type: 'about',
  name: 'About',
  icon: '👥',
  variations: [
    {
      id: 'about-team',
      name: 'Team Grid',
      description: 'Team member grid with photos and bios',
      component: AboutTeam
    },
    {
      id: 'about-story',
      name: 'Company Story',
      description: 'Company story with mission and values',
      component: AboutStory
    }
  ]
}