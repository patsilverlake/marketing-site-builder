import { BaseSection } from '@/components/sections/base-section'
import { SectionProps } from '@/lib/types'
import { Button } from '@/components/ui/button'

interface HeroCenteredContent {
  title: string
  subtitle: string
  ctaText: string
  ctaHref: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
}

export function HeroCentered({ content, isEditing }: SectionProps) {
  const {
    title = "Build Beautiful Landing Pages",
    subtitle = "Create stunning marketing pages in minutes with our drag-and-drop builder. No coding required.",
    ctaText = "Get Started Free",
    ctaHref = "#",
    secondaryCtaText = "Watch Demo",
    secondaryCtaHref = "#"
  } = content as HeroCenteredContent

  return (
    <BaseSection className="bg-white py-20" isEditing={isEditing}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600">
            {subtitle}
          </p>
          <div className="mt-10 flex justify-center gap-4">
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
      </div>
    </BaseSection>
  )
}