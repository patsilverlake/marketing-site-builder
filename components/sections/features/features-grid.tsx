import { BaseSection } from '@/components/sections/base-section'
import { SectionProps } from '@/lib/types'

interface Feature {
  icon: string
  title: string
  description: string
}

interface FeaturesGridContent {
  title: string
  subtitle: string
  features: Feature[]
}

export function FeaturesGrid({ content, isEditing }: SectionProps) {
  const {
    title = "Everything you need",
    subtitle = "Our platform provides all the tools you need to build amazing landing pages.",
    features = [
      {
        icon: "⚡",
        title: "Lightning Fast",
        description: "Built for speed with modern technologies and optimized performance."
      },
      {
        icon: "🎨",
        title: "Beautiful Design",
        description: "Stunning pre-built components that look great on any device."
      },
      {
        icon: "🔧",
        title: "Easy to Use",
        description: "Drag and drop interface makes building pages simple and intuitive."
      },
      {
        icon: "📱",
        title: "Mobile Ready",
        description: "All components are fully responsive and mobile-optimized."
      },
      {
        icon: "🔒",
        title: "Secure",
        description: "Built with security best practices and regular updates."
      },
      {
        icon: "💰",
        title: "Great Value",
        description: "Affordable pricing with no hidden fees or surprise charges."
      }
    ]
  } = content as FeaturesGridContent

  return (
    <BaseSection className="bg-gray-50 py-20" isEditing={isEditing}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </BaseSection>
  )
}