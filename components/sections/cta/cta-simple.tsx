import { BaseSection } from '@/components/sections/base-section'
import { SectionProps } from '@/lib/types'
import { Button } from '@/components/ui/button'

interface CtaSimpleContent {
  title: string
  subtitle: string
  ctaText: string
  ctaHref: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
}

export function CtaSimple({ content, isEditing }: SectionProps) {
  const {
    title = "Ready to get started?",
    subtitle = "Join thousands of users who are already building amazing landing pages.",
    ctaText = "Start Building Today",
    ctaHref = "#",
    secondaryCtaText = "Contact Sales",
    secondaryCtaHref = "#"
  } = content as CtaSimpleContent

  return (
    <BaseSection className="bg-blue-600 py-20" isEditing={isEditing}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-blue-100">
            {subtitle}
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <a href={ctaHref}>{ctaText}</a>
            </Button>
            {secondaryCtaText && (
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600" asChild>
                <a href={secondaryCtaHref}>{secondaryCtaText}</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </BaseSection>
  )
}