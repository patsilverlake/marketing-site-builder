import { BaseSection } from '@/components/sections/base-section'
import { SectionProps } from '@/lib/types'

interface TestimonialsSingleContent {
  title?: string
  content: string
  name: string
  role: string
  company: string
  avatar: string
  rating: number
  logoUrl?: string
}

export function TestimonialsSingle({ content, isEditing }: SectionProps) {
  const {
    title,
    content: testimonialContent = "This platform has completely transformed how we approach landing page creation. The intuitive interface and powerful features have helped us increase our conversion rates by over 50%. It's not just a tool - it's a game-changer for our business.",
    name = "Sarah Johnson",
    role = "VP of Marketing",
    company = "TechCorp Inc.",
    avatar = "https://images.unsplash.com/photo-1494790108755-2616b612b4e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    rating = 5,
    logoUrl = "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  } = content as TestimonialsSingleContent

  return (
    <BaseSection className="bg-white py-20" isEditing={isEditing}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {title}
            </h2>
          </div>
        )}

        <div className="bg-gray-50 rounded-2xl p-8 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Left side - Large avatar */}
            <div className="text-center lg:text-left">
              <img
                src={avatar}
                alt={name}
                className="w-32 h-32 lg:w-48 lg:h-48 rounded-full mx-auto lg:mx-0 mb-6 shadow-lg"
              />
              
              {/* Company logo */}
              {logoUrl && (
                <div className="flex justify-center lg:justify-start">
                  <img
                    src={logoUrl}
                    alt={`${company} logo`}
                    className="h-8 w-auto opacity-60"
                  />
                </div>
              )}
            </div>

            {/* Right side - Testimonial content */}
            <div className="lg:col-span-2">
              {/* Stars */}
              <div className="flex justify-center lg:justify-start mb-6">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-3xl ${
                      i < rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ⭐
                  </span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-2xl lg:text-3xl text-gray-700 leading-relaxed mb-8 text-center lg:text-left">
                "{testimonialContent}"
              </blockquote>

              {/* Author info */}
              <div className="text-center lg:text-left">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {name}
                </h3>
                <p className="text-lg text-gray-600">
                  {role}
                </p>
                <p className="text-lg text-blue-600 font-medium">
                  {company}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom trust indicators */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Join thousands of satisfied customers
          </p>
          <div className="flex justify-center items-center space-x-6 opacity-40">
            <div className="w-12 h-12 bg-gray-200 rounded"></div>
            <div className="w-12 h-12 bg-gray-200 rounded"></div>
            <div className="w-12 h-12 bg-gray-200 rounded"></div>
            <div className="w-12 h-12 bg-gray-200 rounded"></div>
            <div className="w-12 h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </BaseSection>
  )
}