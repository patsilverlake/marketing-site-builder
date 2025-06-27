import { useState } from 'react'
import { BaseSection } from '@/components/sections/base-section'
import { SectionProps } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  avatar: string
  rating: number
}

interface TestimonialsCarouselContent {
  title: string
  subtitle: string
  testimonials: Testimonial[]
}

export function TestimonialsCarousel({ content, isEditing }: SectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const {
    title = "What our customers say",
    subtitle = "Don't just take our word for it - see what our customers have to say about us.",
    testimonials = [
      {
        name: "Sarah Johnson",
        role: "Marketing Director",
        company: "TechCorp",
        content: "This platform has revolutionized how we create landing pages. The drag-and-drop interface is incredibly intuitive, and we've seen a 40% increase in conversions since switching.",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        rating: 5
      },
      {
        name: "Michael Chen",
        role: "Startup Founder",
        company: "InnovateLab",
        content: "We went from concept to live landing page in under an hour. The templates are beautiful and professional. Our team loves how easy it is to make updates without needing developers.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        rating: 5
      },
      {
        name: "Emily Rodriguez",
        role: "Product Manager",
        company: "DesignStudio",
        content: "The best landing page builder we've used. Clean, fast, and the results speak for themselves. Our client satisfaction has improved dramatically since we started using this tool.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        rating: 5
      }
    ]
  } = content as TestimonialsCarouselContent

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <BaseSection className="bg-gray-50 py-20" isEditing={isEditing}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600">
            {subtitle}
          </p>
        </div>

        {testimonials.length > 0 && (
          <div className="relative">
            {/* Main testimonial */}
            <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12 text-center">
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-2xl ${
                      i < currentTestimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ⭐
                  </span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8">
                "{currentTestimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center">
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 text-lg">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-gray-600">
                    {currentTestimonial.role} at {currentTestimonial.company}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            {testimonials.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevTestimonial}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 rounded-full w-12 h-12 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextTestimonial}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 rounded-full w-12 h-12 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Dots indicator */}
            {testimonials.length > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </BaseSection>
  )
}