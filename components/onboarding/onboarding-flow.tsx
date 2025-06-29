'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Layout, 
  Mouse, 
  Palette, 
  Download,
  Eye,
  Sparkles
} from 'lucide-react'

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  targetSelector?: string
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Marketing Site Builder!',
    description: 'Let\'s take a quick tour to get you started with building beautiful landing pages.',
    icon: <Sparkles className="w-6 h-6" />,
    position: 'center'
  },
  {
    id: 'sections',
    title: 'Add Sections',
    description: 'Click on any section type in the sidebar to expand and see available variations. Then click a variation to add it to your page.',
    icon: <Layout className="w-6 h-6" />,
    targetSelector: '[data-onboarding="sections-sidebar"]',
    position: 'right'
  },
  {
    id: 'drag-drop',
    title: 'Reorder Sections',
    description: 'Drag and drop sections to reorder them on your page. Hover over a section to see the drag handle.',
    icon: <Mouse className="w-6 h-6" />,
    targetSelector: '[data-onboarding="page-content"]',
    position: 'left'
  },
  {
    id: 'customize',
    title: 'Customize Appearance',
    description: 'Use the toolbar to change colors, fonts, and spacing. Click the palette icon to choose a theme.',
    icon: <Palette className="w-6 h-6" />,
    targetSelector: '[data-onboarding="toolbar"]',
    position: 'bottom'
  },
  {
    id: 'preview',
    title: 'Preview Your Page',
    description: 'Click the preview button to see how your page looks to visitors. You can also test on different device sizes.',
    icon: <Eye className="w-6 h-6" />,
    targetSelector: '[data-onboarding="preview-button"]',
    position: 'bottom'
  },
  {
    id: 'export',
    title: 'Export When Ready',
    description: 'When you\'re happy with your page, click Export to download the HTML files you can host anywhere.',
    icon: <Download className="w-6 h-6" />,
    targetSelector: '[data-onboarding="export-button"]',
    position: 'bottom'
  }
]

interface OnboardingFlowProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

export function OnboardingFlow({ isOpen, onClose, onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen && onboardingSteps[currentStep]?.targetSelector) {
      const element = document.querySelector(onboardingSteps[currentStep].targetSelector!) as HTMLElement
      setHighlightedElement(element)
    } else {
      setHighlightedElement(null)
    }
  }, [currentStep, isOpen])

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skipTour = () => {
    onClose()
  }

  if (!isOpen) return null

  const step = onboardingSteps[currentStep]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Highlight spotlight */}
          {highlightedElement && (
            <motion.div
              className="fixed z-50 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                left: highlightedElement.offsetLeft - 4,
                top: highlightedElement.offsetTop - 4,
                width: highlightedElement.offsetWidth + 8,
                height: highlightedElement.offsetHeight + 8,
                boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
                borderRadius: '12px'
              }}
            />
          )}

          {/* Onboarding Card */}
          <motion.div
            className={cn(
              'fixed z-50 bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full',
              step.position === 'center' && 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
              step.position === 'top' && 'top-4 left-1/2 transform -translate-x-1/2',
              step.position === 'bottom' && 'bottom-4 left-1/2 transform -translate-x-1/2',
              step.position === 'left' && 'left-4 top-1/2 transform -translate-y-1/2',
              step.position === 'right' && 'right-4 top-1/2 transform -translate-y-1/2'
            )}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <motion.div
                  className="p-2 bg-blue-100 rounded-lg text-blue-600"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {step.icon}
                </motion.div>
                <div>
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-500">
                    Step {currentStep + 1} of {onboardingSteps.length}
                  </p>
                </div>
              </div>
              <motion.button
                onClick={skipTour}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <motion.div
                className="bg-blue-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Content */}
            <motion.p 
              className="text-gray-700 mb-6 leading-relaxed"
              key={step.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {step.description}
            </motion.p>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <motion.button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                  currentStep === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
                whileHover={currentStep > 0 ? { scale: 1.02 } : {}}
                whileTap={currentStep > 0 ? { scale: 0.98 } : {}}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </motion.button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={skipTour}
                  className="text-gray-600"
                >
                  Skip Tour
                </Button>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={nextStep}
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    {currentStep === onboardingSteps.length - 1 ? (
                      'Get Started'
                    ) : (
                      <>
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Hook to manage onboarding state
export function useOnboarding() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)

  useEffect(() => {
    // Check if user has completed onboarding
    const completed = localStorage.getItem('onboarding-completed')
    if (!completed) {
      // Show onboarding after a short delay for first-time users
      setTimeout(() => {
        setIsOnboardingOpen(true)
      }, 1000)
    } else {
      setHasCompletedOnboarding(true)
    }
  }, [])

  const startOnboarding = () => {
    setIsOnboardingOpen(true)
  }

  const closeOnboarding = () => {
    setIsOnboardingOpen(false)
  }

  const completeOnboarding = () => {
    setIsOnboardingOpen(false)
    setHasCompletedOnboarding(true)
    localStorage.setItem('onboarding-completed', 'true')
  }

  return {
    isOnboardingOpen,
    hasCompletedOnboarding,
    startOnboarding,
    closeOnboarding,
    completeOnboarding
  }
}