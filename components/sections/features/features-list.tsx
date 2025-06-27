import { BaseSection } from '@/components/sections/base-section'
import { SectionProps } from '@/lib/types'

interface Feature {
  icon: string
  title: string
  description: string
  imageUrl: string
}

interface FeaturesListContent {
  title: string
  subtitle: string
  features: Feature[]
}

export function FeaturesList({ content, isEditing }: SectionProps) {
  const {
    title = "Powerful Features",
    subtitle = "Everything you need to create amazing landing pages.",
    features = [
      {
        icon: "🎨",
        title: "Drag & Drop Builder",
        description: "Build pages visually with our intuitive drag and drop interface. No coding required.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      },
      {
        icon: "📱",
        title: "Mobile Responsive",
        description: "All templates are fully responsive and look great on desktop, tablet, and mobile devices.",
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      },
      {
        icon: "⚡",
        title: "Fast Performance",
        description: "Optimized for speed with modern web technologies and best practices.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      }
    ]
  } = content as FeaturesListContent

  return (
    <BaseSection className="bg-white py-20" isEditing={isEditing}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600">
            {subtitle}
          </p>
        </div>

        <div className="space-y-20">
          {features.map((feature, index) => (
            <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
            }`}>
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600">
                  {feature.description}
                </p>
              </div>
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseSection>
  )
}