import { BaseSection } from '@/components/sections/base-section'
import { SectionProps } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'

interface PricingFeature {
  name: string
  starter: boolean | string
  pro: boolean | string
  enterprise: boolean | string
}

interface PricingSimpleContent {
  title: string
  subtitle: string
  starterPrice: string
  proPrice: string
  enterprisePrice: string
  features: PricingFeature[]
}

export function PricingSimple({ content, isEditing }: SectionProps) {
  const {
    title = "Choose your plan",
    subtitle = "Select the perfect plan for your needs",
    starterPrice = "$9",
    proPrice = "$29", 
    enterprisePrice = "$99",
    features = [
      { name: "Pages", starter: "5", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Templates", starter: "Basic", pro: "Premium", enterprise: "Premium" },
      { name: "Custom Domain", starter: false, pro: true, enterprise: true },
      { name: "Analytics", starter: false, pro: true, enterprise: true },
      { name: "A/B Testing", starter: false, pro: false, enterprise: true },
      { name: "Priority Support", starter: false, pro: false, enterprise: true },
      { name: "White Label", starter: false, pro: false, enterprise: true }
    ]
  } = content as PricingSimpleContent

  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-5 w-5 text-green-500" />
      ) : (
        <X className="h-5 w-5 text-gray-300" />
      )
    }
    return <span className="text-gray-900">{value}</span>
  }

  return (
    <BaseSection className="bg-white py-20" isEditing={isEditing}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            {subtitle}
          </p>
        </div>

        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Features
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                  <div>
                    <div className="text-lg font-bold text-gray-900">Starter</div>
                    <div className="text-2xl font-bold text-gray-900">{starterPrice}</div>
                    <div className="text-sm text-gray-500">per month</div>
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider bg-blue-50">
                  <div>
                    <div className="text-lg font-bold text-gray-900">Professional</div>
                    <div className="text-2xl font-bold text-gray-900">{proPrice}</div>
                    <div className="text-sm text-gray-500">per month</div>
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                  <div>
                    <div className="text-lg font-bold text-gray-900">Enterprise</div>
                    <div className="text-2xl font-bold text-gray-900">{enterprisePrice}</div>
                    <div className="text-sm text-gray-500">per month</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {features.map((feature, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {feature.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    {renderFeatureValue(feature.starter)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center bg-blue-50">
                    {renderFeatureValue(feature.pro)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    {renderFeatureValue(feature.enterprise)}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4 text-center">
                  <Button variant="outline" size="sm">
                    Get Started
                  </Button>
                </td>
                <td className="px-6 py-4 text-center bg-blue-50">
                  <Button size="sm">
                    Start Free Trial
                  </Button>
                </td>
                <td className="px-6 py-4 text-center">
                  <Button variant="outline" size="sm">
                    Contact Sales
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </BaseSection>
  )
}