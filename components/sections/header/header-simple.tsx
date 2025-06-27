import { BaseSection } from '@/components/sections/base-section'
import { SectionProps } from '@/lib/types'
import { Button } from '@/components/ui/button'

interface HeaderSimpleContent {
  logo: string
  logoText: string
  navItems: { label: string; href: string }[]
}

export function HeaderSimple({ content, isEditing }: SectionProps) {
  const {
    logo = "🚀",
    logoText = "Brand",
    navItems = [
      { label: "Home", href: "#" },
      { label: "About", href: "#" },
      { label: "Services", href: "#" },
      { label: "Contact", href: "#" }
    ]
  } = content as HeaderSimpleContent

  return (
    <BaseSection className="bg-white border-b border-gray-200" isEditing={isEditing}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl mr-2">{logo}</span>
            <span className="text-xl font-bold text-gray-900">{logoText}</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </BaseSection>
  )
}