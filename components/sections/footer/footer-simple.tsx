import { BaseSection } from '@/components/sections/base-section'
import { SectionProps } from '@/lib/types'

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

interface FooterSimpleContent {
  logo: string
  logoText: string
  description: string
  sections: FooterSection[]
  socialLinks: SocialLink[]
  copyright: string
}

export function FooterSimple({ content, isEditing }: SectionProps) {
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
          { label: "Templates", href: "#" },
          { label: "Integrations", href: "#" }
        ]
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "#" },
          { label: "Blog", href: "#" },
          { label: "Careers", href: "#" },
          { label: "Contact", href: "#" }
        ]
      },
      {
        title: "Support",
        links: [
          { label: "Help Center", href: "#" },
          { label: "Documentation", href: "#" },
          { label: "Community", href: "#" },
          { label: "Status", href: "#" }
        ]
      }
    ],
    socialLinks = [
      { name: "Twitter", href: "#", icon: "🐦" },
      { name: "Facebook", href: "#", icon: "📘" },
      { name: "LinkedIn", href: "#", icon: "💼" },
      { name: "Instagram", href: "#", icon: "📷" }
    ],
    copyright = "© 2024 Brand. All rights reserved."
  } = content as FooterSimpleContent

  return (
    <BaseSection className="bg-gray-900 text-white py-16" isEditing={isEditing}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">{logo}</span>
              <span className="text-xl font-bold">{logoText}</span>
            </div>
            <p className="text-gray-400 mb-6">{description}</p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <span className="text-xl">{social.icon}</span>
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
          <p className="text-center text-gray-400">{copyright}</p>
        </div>
      </div>
    </BaseSection>
  )
}