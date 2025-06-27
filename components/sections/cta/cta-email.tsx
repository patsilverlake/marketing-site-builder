import { BaseSection } from '@/components/sections/base-section'
import { SectionProps } from '@/lib/types'
import { Button } from '@/components/ui/button'

interface CtaEmailContent {
  title: string
  subtitle: string
  placeholder: string
  buttonText: string
  privacyText?: string
  features?: string[]
}

export function CtaEmail({ content, isEditing }: SectionProps) {
  const {
    title = "Ready to get started?",
    subtitle = "Join thousands of users who are already building amazing landing pages.",
    placeholder = "Enter your email address",
    buttonText = "Get Started Free",
    privacyText = "We respect your privacy. Unsubscribe at any time.",
    features = [
      "No credit card required",
      "14-day free trial",
      "Cancel anytime"
    ]
  } = content as CtaEmailContent

  return (
    <BaseSection className="bg-gradient-to-r from-blue-600 to-purple-600 py-20" isEditing={isEditing}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            {title}
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            {subtitle}
          </p>
          
          {/* Email signup form */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder={placeholder}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
              <Button size="lg" variant="secondary" className="sm:px-8">
                {buttonText}
              </Button>
            </div>
          </div>

          {/* Features */}
          {features && features.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center text-blue-100">
                  <span className="mr-2">✓</span>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* Privacy text */}
          {privacyText && (
            <p className="text-sm text-blue-200">
              {privacyText}
            </p>
          )}
        </div>
      </div>
    </BaseSection>
  )
}