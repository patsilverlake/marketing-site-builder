'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TooltipProps {
  content: string
  children: React.ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  className?: string
  contentClassName?: string
}

export function Tooltip({ 
  content, 
  children, 
  side = 'top', 
  delay = 500,
  className,
  contentClassName 
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
      updatePosition()
    }, delay)
  }

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const scrollX = window.pageXOffset
      const scrollY = window.pageYOffset

      let x = 0
      let y = 0

      switch (side) {
        case 'top':
          x = rect.left + scrollX + rect.width / 2
          y = rect.top + scrollY - 8
          break
        case 'bottom':
          x = rect.left + scrollX + rect.width / 2
          y = rect.bottom + scrollY + 8
          break
        case 'left':
          x = rect.left + scrollX - 8
          y = rect.top + scrollY + rect.height / 2
          break
        case 'right':
          x = rect.right + scrollX + 8
          y = rect.top + scrollY + rect.height / 2
          break
      }

      setPosition({ x, y })
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const getTooltipClasses = () => {
    const baseClasses = 'fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg pointer-events-none'
    
    switch (side) {
      case 'top':
        return cn(baseClasses, 'transform -translate-x-1/2 -translate-y-full')
      case 'bottom':
        return cn(baseClasses, 'transform -translate-x-1/2')
      case 'left':
        return cn(baseClasses, 'transform -translate-x-full -translate-y-1/2')
      case 'right':
        return cn(baseClasses, 'transform -translate-y-1/2')
      default:
        return baseClasses
    }
  }

  const getArrowClasses = () => {
    const baseClasses = 'absolute w-0 h-0'
    
    switch (side) {
      case 'top':
        return cn(baseClasses, 'top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900')
      case 'bottom':
        return cn(baseClasses, 'bottom-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900')
      case 'left':
        return cn(baseClasses, 'left-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-900')
      case 'right':
        return cn(baseClasses, 'right-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900')
      default:
        return baseClasses
    }
  }

  const variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: side === 'top' ? 5 : side === 'bottom' ? -5 : 0,
      x: side === 'left' ? 5 : side === 'right' ? -5 : 0
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      x: 0
    }
  }

  return (
    <>
      <div
        ref={triggerRef}
        className={cn('inline-block', className)}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={cn(getTooltipClasses(), contentClassName)}
            style={{
              left: position.x,
              top: position.y
            }}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.15 }}
          >
            {content}
            <div className={getArrowClasses()} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Help Text Component for forms and inputs
export function HelpText({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.p 
      className={cn('text-sm text-gray-600 mt-1', className)}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.p>
  )
}

// Info Tooltip with icon
export function InfoTooltip({ content, className }: { content: string, className?: string }) {
  return (
    <Tooltip content={content} className={className}>
      <motion.div 
        className="inline-flex items-center justify-center w-4 h-4 text-xs text-gray-400 bg-gray-100 rounded-full cursor-help hover:bg-gray-200 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ?
      </motion.div>
    </Tooltip>
  )
}