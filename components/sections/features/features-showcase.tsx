import { BaseSection } from '@/components/sections/base-section'
import { SectionProps } from '@/lib/types'

interface Feature {
  title: string
  description: string
}

interface FeaturesShowcaseContent {
  title: string
  subtitle: string
  imageUrl: string
  imageAlt: string
  features: Feature[]
}

export function FeaturesShowcase({ content, isEditing }: SectionProps) {
  const {
    title = "Powerful Features",
    subtitle = "Everything you need to create amazing landing pages.",
    imageUrl = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    imageAlt = "Feature showcase",
    features = [
      {
        title: "Drag & Drop Builder",
        description: "Build pages visually with our intuitive drag and drop interface."
      },
      {
        title: "Professional Templates",
        description: "Choose from dozens of professionally designed templates."
      },
      {
        title: "Mobile Responsive",
        description: "All pages look perfect on desktop, tablet, and mobile devices."
      },
      {
        title: "Fast Performance",
        description: "Optimized for speed with modern web technologies."
      },
      {
        title: "SEO Optimized",
        description: "Built-in SEO features to help your pages rank higher."
      },
      {
        title: "Custom Domains",
        description: "Use your own domain for a professional appearance."
      }
    ]
  } = content as FeaturesShowcaseContent

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-lg opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-100 rounded-lg opacity-60"></div>
          </div>

          {/* Features list */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseSection>
  )
}