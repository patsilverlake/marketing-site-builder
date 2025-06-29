'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton'
  text?: string
  className?: string
}

export function Loading({ size = 'md', variant = 'spinner', text, className }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  }

  if (variant === 'spinner') {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <motion.div
          className={cn(
            'border-2 border-gray-200 border-t-blue-500 rounded-full',
            sizeClasses[size]
          )}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        {text && (
          <motion.span 
            className="ml-2 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {text}
          </motion.span>
        )}
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex items-center justify-center space-x-1', className)}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={cn(
              'bg-blue-500 rounded-full',
              size === 'sm' ? 'w-1.5 h-1.5' : size === 'md' ? 'w-2 h-2' : 'w-3 h-3'
            )}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
        {text && (
          <motion.span 
            className="ml-3 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {text}
          </motion.span>
        )}
      </div>
    )
  }

  if (variant === 'pulse') {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <motion.div
          className={cn(
            'bg-blue-500 rounded-full',
            sizeClasses[size]
          )}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        {text && (
          <motion.span 
            className="ml-2 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {text}
          </motion.span>
        )}
      </div>
    )
  }

  if (variant === 'skeleton') {
    return (
      <div className={cn('space-y-3', className)}>
        <motion.div
          className="h-4 bg-gray-200 rounded animate-pulse"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="h-4 bg-gray-200 rounded animate-pulse w-3/4"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="h-4 bg-gray-200 rounded animate-pulse w-1/2"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    )
  }

  return null
}

// Page Loading Component
export function PageLoading() {
  return (
    <motion.div 
      className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        <motion.div
          className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full mb-4 mx-auto"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.h3 
          className="text-lg font-semibold text-gray-900 mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Loading...
        </motion.h3>
        <motion.p 
          className="text-gray-600"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Please wait while we prepare your page
        </motion.p>
      </div>
    </motion.div>
  )
}

// Section Loading Component
export function SectionLoading({ className }: { className?: string }) {
  return (
    <motion.div 
      className={cn('p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200', className)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
        <div className="flex space-x-2">
          <div className="h-8 w-24 bg-gray-200 rounded"></div>
          <div className="h-8 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    </motion.div>
  )
}

// Button Loading Component  
interface ButtonLoadingProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  isLoading?: boolean
}

export function ButtonLoading({ children, isLoading = false, ...props }: ButtonLoadingProps) {
  return (
    <motion.button
      {...props}
      disabled={isLoading || props.disabled}
      className={cn(
        props.className,
        isLoading && 'cursor-not-allowed opacity-70'
      )}
      whileHover={!isLoading ? { scale: 1.02 } : {}}
      whileTap={!isLoading ? { scale: 0.98 } : {}}
    >
      <motion.div 
        className="flex items-center justify-center"
        layout
      >
        {isLoading && (
          <motion.div
            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
            animate={{ rotate: 360, scale: 1 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            initial={{ scale: 0 }}
            exit={{ scale: 0 }}
          />
        )}
        <motion.span
          animate={{ x: isLoading ? 0 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>
      </motion.div>
    </motion.button>
  )
}