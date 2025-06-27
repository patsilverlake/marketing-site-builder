import { BaseSection } from '@/components/sections/base-section'
import { SectionProps } from '@/lib/types'
import { Button } from '@/components/ui/button'

interface CtaContactContent {
  title: string
  subtitle: string
  nameLabel: string
  emailLabel: string
  messageLabel: string
  buttonText: string
  contactInfo?: {
    phone?: string
    email?: string
    address?: string
  }
}

export function CtaContact({ content, isEditing }: SectionProps) {
  const {
    title = "Get in touch",
    subtitle = "Ready to take your business to the next level? Let's talk about how we can help you succeed.",
    nameLabel = "Full Name",
    emailLabel = "Email Address", 
    messageLabel = "Message",
    buttonText = "Send Message",
    contactInfo = {
      phone: "+1 (555) 123-4567",
      email: "hello@company.com",
      address: "123 Business St, Suite 100, City, ST 12345"
    }
  } = content as CtaContactContent

  return (
    <BaseSection className="bg-gray-50 py-20" isEditing={isEditing}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {nameLabel}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {emailLabel}
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {messageLabel}
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your project..."
                  />
                </div>
                
                <Button size="lg" className="w-full">
                  {buttonText}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact information */}
          <div className="lg:col-span-1">
            <div className="bg-blue-600 text-white rounded-lg p-8 h-full">
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                {contactInfo?.phone && (
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">📞</span>
                    <div>
                      <h4 className="font-medium mb-1">Phone</h4>
                      <p className="text-blue-100">{contactInfo.phone}</p>
                    </div>
                  </div>
                )}
                
                {contactInfo?.email && (
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">✉️</span>
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <p className="text-blue-100">{contactInfo.email}</p>
                    </div>
                  </div>
                )}
                
                {contactInfo?.address && (
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">📍</span>
                    <div>
                      <h4 className="font-medium mb-1">Address</h4>
                      <p className="text-blue-100">{contactInfo.address}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Additional contact methods */}
              <div className="mt-8 pt-8 border-t border-blue-500">
                <h4 className="font-medium mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">📘</span>
                  <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">🐦</span>
                  <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">💼</span>
                  <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">📷</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseSection>
  )
}