import { BaseSection } from '@/components/sections/base-section'
import { SectionProps } from '@/lib/types'
import { Button } from '@/components/ui/button'

interface HeroSplitContent {
  title: string
  subtitle: string
  ctaText: string
  ctaHref: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
  imageUrl: string
  imageAlt: string
}

export function HeroSplit({ content, isEditing }: SectionProps) {
  const {
    title = "Build Beautiful Landing Pages",
    subtitle = "Create stunning marketing pages in minutes with our drag-and-drop builder. No coding required.",
    ctaText = "Get Started Free",
    ctaHref = "#",
    secondaryCtaText = "Watch Demo",
    secondaryCtaHref = "#",
    imageUrl = "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
    imageAlt = "Hero image"
  } = content as HeroSplitContent

  return (
    <BaseSection className="bg-white py-20" isEditing={isEditing}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              {subtitle}
            </p>
            <div className="mt-10 flex gap-4">
              <Button size="lg" asChild>
                <a href={ctaHref}>{ctaText}</a>
              </Button>
              {secondaryCtaText && (
                <Button variant="outline" size="lg" asChild>
                  <a href={secondaryCtaHref}>{secondaryCtaText}</a>
                </Button>
              )}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </BaseSection>
  )
}