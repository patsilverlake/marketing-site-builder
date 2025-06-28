import { SectionDefinition } from '@/lib/types'
import { StatsCounters } from '@/components/sections/stats/stats-counters'

export const statsSections: SectionDefinition = {
  type: 'stats',
  name: 'Social Proof & Stats',
  icon: '📊',
  variations: [
    {
      id: 'stats-counters',
      name: 'Animated Counters',
      description: 'Social proof with animated counter stats',
      component: StatsCounters
    }
  ]
}