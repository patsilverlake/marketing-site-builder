import { BaseSection } from '@/components/sections/base-section'
import { SectionProps } from '@/lib/types'
import { Button } from '@/components/ui/button'

interface HeroBackgroundContent {
  title: string
  subtitle: string
  ctaText: string
  ctaHref: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
  backgroundImageUrl: string
  overlayOpacity: number
}

export function HeroBackground({ content, isEditing }: SectionProps) {
  const {
    title = "Build Beautiful Landing Pages",
    subtitle = "Create stunning marketing pages in minutes with our drag-and-drop builder. No coding required.",
    ctaText = "Get Started Free",
    ctaHref = "#",
    secondaryCtaText = "Watch Demo",
    secondaryCtaHref = "#",
    backgroundImageUrl = "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    overlayOpacity = 0.6
  } = content as HeroBackgroundContent

  return (
    <BaseSection className="relative" isEditing={isEditing}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      />
      
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Content */}
      <div className="relative py-32 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-200">
              {subtitle}
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button size="lg" asChild>
                <a href={ctaHref}>{ctaText}</a>
              </Button>
              {secondaryCtaText && (
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-gray-900" asChild>
                  <a href={secondaryCtaHref}>{secondaryCtaText}</a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </BaseSection>
  )
}