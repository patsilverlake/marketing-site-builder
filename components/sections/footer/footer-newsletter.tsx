import { BaseSection } from '@/components/sections/base-section'
import { SectionProps } from '@/lib/types'
import { Button } from '@/components/ui/button'

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface SocialLink {
  name: string
  href: string
  icon: string
}

interface FooterNewsletterContent {
  logo: string
  logoText: string
  description: string
  sections: FooterSection[]
  socialLinks: SocialLink[]
  copyright: string
  newsletterTitle: string
  newsletterDescription: string
  emailPlaceholder: string
  subscribeButtonText: string
}

export function FooterNewsletter({ content, isEditing }: SectionProps) {
  const {
    logo = "🚀",
    logoText = "Brand",
    description = "Building amazing landing pages made simple.",
    sections = [
      {
        title: "Product",
        links: [
          { label: "Features", href: "#" },
          { label: "Pricing", href: "#" },
          { label: "Templates", href: "#" }
        ]
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "#" },
          { label: "Blog", href: "#" },
          { label: "Careers", href: "#" }
        ]
      },
      {
        title: "Support",
        links: [
          { label: "Help Center", href: "#" },
          { label: "Documentation", href: "#" },
          { label: "Contact", href: "#" }
        ]
      }
    ],
    socialLinks = [
      { name: "Twitter", href: "#", icon: "🐦" },
      { name: "Facebook", href: "#", icon: "📘" },
      { name: "LinkedIn", href: "#", icon: "💼" },
      { name: "Instagram", href: "#", icon: "📷" }
    ],
    copyright = "© 2024 Brand. All rights reserved.",
    newsletterTitle = "Stay updated",
    newsletterDescription = "Get the latest news and updates delivered to your inbox.",
    emailPlaceholder = "Enter your email",
    subscribeButtonText = "Subscribe"
  } = content as FooterNewsletterContent

  return (
    <BaseSection className="bg-gray-900 text-white py-16" isEditing={isEditing}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter section */}
        <div className="bg-gray-800 rounded-lg p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">{newsletterTitle}</h3>
              <p className="text-gray-300">{newsletterDescription}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder={emailPlaceholder}
                className="flex-1 px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button variant="secondary" size="lg" className="sm:px-8">
                {subscribeButtonText}
              </Button>
            </div>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">{logo}</span>
              <span className="text-xl font-bold">{logoText}</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">{description}</p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors text-xl"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link sections */}
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">{copyright}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </BaseSection>
  )
}