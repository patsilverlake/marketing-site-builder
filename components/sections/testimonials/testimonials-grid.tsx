import { BaseSection } from '@/components/sections/base-section'
import { SectionProps } from '@/lib/types'

interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  avatar: string
}

interface TestimonialsGridContent {
  title: string
  subtitle: string
  testimonials: Testimonial[]
}

export function TestimonialsGrid({ content, isEditing }: SectionProps) {
  const {
    title = "What our customers say",
    subtitle = "Don't just take our word for it - see what our customers have to say about us.",
    testimonials = [
      {
        name: "Sarah Johnson",
        role: "Marketing Director",
        company: "TechCorp",
        content: "This platform has revolutionized how we create landing pages. The drag-and-drop interface is incredibly intuitive.",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
      },
      {
        name: "Michael Chen",
        role: "Startup Founder",
        company: "InnovateLab",
        content: "We went from concept to live landing page in under an hour. The templates are beautiful and professional.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
      },
      {
        name: "Emily Rodriguez",
        role: "Product Manager",
        company: "DesignStudio",
        content: "The best landing page builder we've used. Clean, fast, and the results speak for themselves.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
      }
    ]
  } = content as TestimonialsGridContent

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="mb-4">
                <p className="text-gray-700 text-lg leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseSection>
  )
}