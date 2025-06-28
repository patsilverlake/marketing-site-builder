import { BaseSection } from '@/components/sections/base-section'
import { SectionProps } from '@/lib/types'
import { Check, X } from 'lucide-react'

interface ComparisonFeature {
  name: string
  basic: boolean | string
  pro: boolean | string
  enterprise: boolean | string
}

interface FeaturesComparisonContent {
  title: string
  subtitle: string
  basicTitle: string
  proTitle: string
  enterpriseTitle: string
  features: ComparisonFeature[]
}

export function FeaturesComparison({ content, isEditing }: SectionProps) {
  const {
    title = "Compare Features",
    subtitle = "Choose the plan that's right for your needs",
    basicTitle = "Basic",
    proTitle = "Professional", 
    enterpriseTitle = "Enterprise",
    features = [
      { name: "Pages", basic: "5", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Templates", basic: "10", pro: "50+", enterprise: "100+" },
      { name: "Custom Domain", basic: false, pro: true, enterprise: true },
      { name: "Analytics", basic: false, pro: true, enterprise: true },
      { name: "A/B Testing", basic: false, pro: false, enterprise: true },
      { name: "Priority Support", basic: false, pro: true, enterprise: true },
      { name: "White Label", basic: false, pro: false, enterprise: true },
      { name: "API Access", basic: false, pro: false, enterprise: true },
      { name: "Team Collaboration", basic: false, pro: "3 users", enterprise: "Unlimited" },
      { name: "Advanced Integrations", basic: false, pro: false, enterprise: true }
    ]
  } = content as FeaturesComparisonContent

  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-5 w-5 text-green-500 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-gray-300 mx-auto" />
      )
    }
    return <span className="text-gray-900 font-medium">{value}</span>
  }

  return (
    <BaseSection className="bg-gray-50 py-20" isEditing={isEditing}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            {subtitle}
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hidden md:block">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Features
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-center text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {basicTitle}
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-center text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider bg-blue-50">
                    {proTitle}
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-center text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {enterpriseTitle}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {features.map((feature, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {feature.name}
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-sm text-center">
                      {renderFeatureValue(feature.basic)}
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-sm text-center bg-blue-50">
                      {renderFeatureValue(feature.pro)}
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-sm text-center">
                      {renderFeatureValue(feature.enterprise)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-6">
          <div className="grid gap-4">
            {/* Plan Headers */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="font-medium text-gray-900">{basicTitle}</div>
                <div className="font-medium text-blue-600 bg-blue-50 rounded-lg py-2">{proTitle}</div>
                <div className="font-medium text-gray-900">{enterpriseTitle}</div>
              </div>
            </div>

            {/* Feature Cards */}
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-4">
                <div className="font-medium text-gray-900 mb-3 text-center">{feature.name}</div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex justify-center items-center">
                    {renderFeatureValue(feature.basic)}
                  </div>
                  <div className="flex justify-center items-center bg-blue-50 rounded-lg py-2">
                    {renderFeatureValue(feature.pro)}
                  </div>
                  <div className="flex justify-center items-center">
                    {renderFeatureValue(feature.enterprise)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseSection>
  )
}