import { BaseSection } from '@/components/sections/base-section'
import { SectionProps } from '@/lib/types'
import { Button } from '@/components/ui/button'

interface HeroAnimatedContent {
  title: string
  subtitle: string
  ctaText: string
  ctaHref: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
}

export function HeroAnimated({ content, isEditing }: SectionProps) {
  const {
    title = "Build Beautiful Landing Pages",
    subtitle = "Create stunning marketing pages in minutes with our drag-and-drop builder. No coding required.",
    ctaText = "Get Started Free",
    ctaHref = "#",
    secondaryCtaText = "Watch Demo",
    secondaryCtaHref = "#"
  } = content as HeroAnimatedContent

  return (
    <BaseSection className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 overflow-hidden" isEditing={isEditing}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center relative">
          {/* Animated background elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-60 animate-bounce"></div>
            <div className="absolute top-32 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-40 animate-pulse"></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-200 rounded-full opacity-50 animate-ping"></div>
            <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-yellow-200 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '1s' }}></div>
          </div>
          
          {/* Content with fade-in animation */}
          <div className="relative z-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl animate-fade-in">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {subtitle}
            </p>
            <div className="mt-10 flex justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button size="lg" className="transform hover:scale-105 transition-transform" asChild>
                <a href={ctaHref}>{ctaText}</a>
              </Button>
              {secondaryCtaText && (
                <Button variant="outline" size="lg" className="transform hover:scale-105 transition-transform" asChild>
                  <a href={secondaryCtaHref}>{secondaryCtaText}</a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </BaseSection>
  )
}